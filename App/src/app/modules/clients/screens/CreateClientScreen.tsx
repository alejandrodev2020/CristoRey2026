import React, {useEffect, useMemo, useRef, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Platform, PermissionsAndroid, LayoutAnimation, UIManager, ActivityIndicator, Dimensions, KeyboardAvoidingView} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region, LatLng} from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {styles} from './CreateClientStyle';
import IconCamera from '../../../../assets/icons/tabler/svg/outline/camera.svg';
import {clientService} from '../services/ClientService';
import EyeClose from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
import {StackActions, useNavigation} from '@react-navigation/native';
import Svg, {Path, Rect} from 'react-native-svg';
import {showMessage} from 'react-native-flash-message';
import {SafeAreaView} from 'react-native-safe-area-context';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ClientForm = {
  firstName: string;
  lastName: string;
  phone: string;
  ci: string;
  nit: string;
  photo: string; // base64 sin prefijo
  ubication: string;
  clientZoneId: number | string;
  clientRateId: number | string;
  clientTypeId: number | string;
  clientDiscountId: number | string;
  percentageDiscountValue: number | string;
  company: string;
  latitude: number | string;
  longitude: number | string;
  reference: string;
  link: string;
};

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const DEFAULT_FALLBACK: LatLng = {
  latitude: -17.7836996,
  longitude: -63.1826825,
};

function toNumber(val: any, fallback = 0) {
  const n = Number(val);
  return Number.isFinite(n) ? n : fallback;
}

function buildMapsLink(lat: number, lng: number) {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Permiso de ubicación',
      message: 'Necesitamos tu ubicación para ubicar al cliente en el mapa.',
      buttonNeutral: 'Luego',
      buttonNegative: 'No',
      buttonPositive: 'Aceptar',
    },
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

async function requestCameraPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

export default function CreateClientScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState<ClientForm>({
    firstName: '',
    lastName: '',
    phone: '',
    ci: '',
    nit: '',
    photo: '',
    ubication: '',
    clientZoneId: 1,
    clientRateId: 1,
    clientTypeId: 1,
    clientDiscountId: 1,
    percentageDiscountValue: 0,
    company: '',
    latitude: 0,
    longitude: 0,
    reference: '',
    link: '',
  });

  const [saving, setSaving] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const userAlreadyMovedMarkerRef = useRef(false);

  const updateField = (key: keyof ClientForm, value: any) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const WaveDivider = () => (
    <Svg
      viewBox="0 0 900 600"
      style={{position: 'absolute', top: screenHeight * 0.125}}
      width="100%"
      height={120}
      preserveAspectRatio="none">
      <Rect x="0" y="0" width="900" height="600" fill="#ffffffff" />
      <Path
        d="M0 93L15 101.2C30 109.3 60 125.7 90 129.8C120 134 150 126 180 139.7C210 153.3 240 188.7 270 194C300 199.3 330 174.7 360 171.5C390 168.3 420 186.7 450 178.3C480 170 510 135 540 129C570 123 600 146 630 153.5C660 161 690 153 720 134.3C750 115.7 780 86.3 810 92C840 97.7 870 138.3 885 158.7L900 179L900 0L885 0C870 0 840 0 810 0C780 0 750 0 720 0C690 0 660 0 630 0C600 0 570 0 540 0C510 0 480 0 450 0C420 0 390 0 360 0C330 0 300 0 270 0C240 0 210 0 180 0C150 0 120 0 90 0C60 0 30 0 15 0L0 0Z"
        fill="#00317aff"
      />
    </Svg>
  );

  const pickPhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.4,
      maxWidth: 600,
      maxHeight: 600,
    });

    if (result.assets?.length) {
      updateField('photo', result.assets[0].base64 ?? '');
    }
  };

  const setCoords = (coords: LatLng) => {
    const lat = coords.latitude;
    const lng = coords.longitude;
    updateField('latitude', lat);
    updateField('longitude', lng);
    updateField('link', buildMapsLink(lat, lng));
  };

  const getCurrentLocationAndInitMarker = async () => {
    const ok = await requestLocationPermission();
    if (!ok) {
      const currentLat = toNumber(form.latitude, 0);
      const currentLng = toNumber(form.longitude, 0);
      if (currentLat !== 0 && currentLng !== 0) {
        setCoords({latitude: currentLat, longitude: currentLng});
      } else {
        setCoords(DEFAULT_FALLBACK);
      }
      return;
    }

    setGettingLocation(true);

    Geolocation.getCurrentPosition(
      (position: any) => {
        const coords: LatLng = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCoords(coords);
        setGettingLocation(false);
      },
      (error: any) => {
        console.warn('Error al obtener ubicación:', error);
        // fallback seguro
        const currentLat = toNumber(form.latitude, 0);
        const currentLng = toNumber(form.longitude, 0);
        if (currentLat !== 0 && currentLng !== 0) {
          setCoords({latitude: currentLat, longitude: currentLng});
        } else {
          setCoords(DEFAULT_FALLBACK);
        }
        setGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 10000,
      },
    );
  };

  useEffect(() => {
    getCurrentLocationAndInitMarker();
  }, []);

  const region: Region = useMemo(() => {
    const lat = toNumber(form.latitude, DEFAULT_FALLBACK.latitude);
    const lng = toNumber(form.longitude, DEFAULT_FALLBACK.longitude);

    return {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
  }, [form.latitude, form.longitude]);

  const onMarkerDragEnd = (coord: LatLng) => {
    userAlreadyMovedMarkerRef.current = true;
    setCoords(coord);
  };

  const toggleMapPanel = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMapOpen(prev => !prev);
    const lat = toNumber(form.latitude, 0);
    const lng = toNumber(form.longitude, 0);
    if ((!lat || !lng) && !gettingLocation) {
      getCurrentLocationAndInitMarker();
    }
  };

  const pickFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.4,
      maxWidth: 600,
      maxHeight: 600,
    });

    if (result.assets?.length) {
      updateField('photo', result.assets[0].base64 ?? '');
    }
  };

  const saveClient = async () => {
    if (saving) return;

    if (!form.firstName || !form.phone) {
      console.warn('Nombre y teléfono son obligatorios');
      return;
    }

    const payload = {
      ...form,
      photo: form.photo ? `data:image/jpeg;base64,${form.photo}` : null,
      clientZoneId: toNumber(form.clientZoneId, 1),
      clientRateId: toNumber(form.clientRateId, 1),
      clientTypeId: toNumber(form.clientTypeId, 1),
      clientDiscountId: toNumber(form.clientDiscountId, 1),
      percentageDiscountValue: toNumber(form.percentageDiscountValue, 0),
      latitude: toNumber(form.latitude, DEFAULT_FALLBACK.latitude),
      longitude: toNumber(form.longitude, DEFAULT_FALLBACK.longitude),
      link:
        form.link?.trim() ||
        buildMapsLink(
          toNumber(form.latitude, DEFAULT_FALLBACK.latitude),
          toNumber(form.longitude, DEFAULT_FALLBACK.longitude),
        ),
    };

    try {
      setSaving(true);
      console.log('CLIENTE A ENVIAR:', payload);

      const response = await clientService.CreateClient(payload);
      console.log('CLIENTE CREADO:', response);

      showMessage({
        message: 'Cliente registrado',
        description: 'El cliente se registró correctamente.',
        type: 'success',
        backgroundColor: '#4CAF50',
        color: '#fff',
        duration: 2500,
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        'Ocurrió un error al registrar el cliente';

      showMessage({
        message: 'Error al registrar',
        description: message,
        type: 'danger',
        backgroundColor: '#D32F2F',
        color: '#fff',
        duration: 3000,
      });
    } finally {
      setSaving(false);
      navigation.dispatch(StackActions.replace('ListClient'));
    }
  };

  const hasLink = !!form.link?.trim();

  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#325284'}}
        edges={['top', 'left', 'right']}>
        <LinearGradient
          colors={['#325284', '#00317aff']}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 20,
            height: screenHeight * 0.08,
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 20,
                color: '#fff',
              }}>
              Nuevo Cliente
            </Text>
            <Text style={{fontSize: 12, color: '#fff'}}>
              Registro de cliente
            </Text>
          </View>
        </LinearGradient>

        <WaveDivider />
        <View style={{height: screenHeight * 0.06}} />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EyeClose width={50} height={50} color={'#325284'} />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <Text style={styles.headerText}>Registro Cliente</Text>
          </View>
        </View>
        <KeyboardAvoidingView
          style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 20}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            contentContainerStyle={{paddingBottom: 40, backgroundColor: '#fff'}}
            keyboardShouldPersistTaps="handled">
            <View style={{height: 20}} />
            <View style={{alignItems: 'center', marginBottom: 16}}>
              <TouchableOpacity style={styles.avatarSquare} onPress={pickPhoto}>
                {form.photo ? (
                  <Image
                    source={{uri: `data:image/jpeg;base64,${form.photo}`}}
                    style={styles.avatarImage}
                  />
                ) : (
                  <IconCamera width={40} height={40} color="#999" />
                )}
              </TouchableOpacity>

              {/* BOTONES FOTO */}
              <View style={styles.avatarActions}>
                <TouchableOpacity style={styles.avatarBtn} onPress={pickPhoto}>
                  <Text style={styles.avatarBtnText}>Cámara</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.avatarBtn}
                  onPress={pickFromGallery}>
                  <Text style={styles.avatarBtnText}>Galería</Text>
                </TouchableOpacity>

                {form.photo ? (
                  <TouchableOpacity
                    style={[styles.avatarBtn, {backgroundColor: '#e74c3c'}]}
                    onPress={() => updateField('photo', '')}>
                    <Text style={styles.avatarBtnText}>Borrar</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>

            {/* ================= DATOS PERSONALES ================= */}
            <TextInput
              style={styles.input}
              placeholder="Nombres"
              value={form.firstName}
              onChangeText={v => updateField('firstName', v)}
            />

            <TextInput
              style={styles.input}
              placeholder="Apellidos"
              value={form.lastName}
              onChangeText={v => updateField('lastName', v)}
            />

            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={v => updateField('phone', v)}
            />

            <TextInput
              style={styles.input}
              placeholder="CI"
              value={form.ci}
              onChangeText={v => updateField('ci', v)}
            />

            <TextInput
              style={styles.input}
              placeholder="NIT"
              value={form.nit}
              onChangeText={v => updateField('nit', v)}
            />

            <TextInput
              style={styles.input}
              placeholder="Empresa"
              value={form.company}
              onChangeText={v => updateField('company', v)}
            />

            <TextInput
              style={styles.input}
              placeholder="Ubicación"
              value={form.ubication}
              onChangeText={v => updateField('ubication', v)}
            />

            {/* ================= “PANEL” COORDENADAS (igual mat-expansion-panel) ================= */}
            <TouchableOpacity
              onPress={toggleMapPanel}
              style={{
                marginTop: 14,
                padding: 14,
                borderRadius: 12,
                backgroundColor: '#ccd1d1', // similar a tu panel
              }}>
              <Text style={{fontWeight: '800', color: '#000'}}>
                ¿Desea {true ? 'agregar' : 'editar'} las coordenadas?
              </Text>
              <Text style={{marginTop: 6, fontWeight: '700', color: '#000'}}>
                Aquí podrás seleccionar la ubicación de tu cliente!
              </Text>

              {gettingLocation ? (
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator />
                  <Text style={{marginLeft: 8}}>Obteniendo ubicación…</Text>
                </View>
              ) : null}
            </TouchableOpacity>

            {mapOpen ? (
              <View
                style={{
                  marginTop: 10,
                  borderRadius: 12,
                  overflow: 'hidden',
                }}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{width: '100%', height: 260}}
                  initialRegion={region}
                  region={
                    // Si el usuario ya movió el marker, no “peleamos” con el mapa en cada render
                    userAlreadyMovedMarkerRef.current ? undefined : region
                  }
                  onPress={(e: any) => {
                    // Opcional (UX pro): si el usuario toca el mapa, movemos el marker allí
                    // Esto imita “seleccionar punto” además de arrastrar
                    const coord = e.nativeEvent.coordinate;
                    onMarkerDragEnd(coord);
                  }}>
                  <Marker
                    draggable
                    coordinate={{
                      latitude: toNumber(
                        form.latitude,
                        DEFAULT_FALLBACK.latitude,
                      ),
                      longitude: toNumber(
                        form.longitude,
                        DEFAULT_FALLBACK.longitude,
                      ),
                    }}
                    onDragEnd={(e: any) =>
                      onMarkerDragEnd(e.nativeEvent.coordinate)
                    }
                  />
                </MapView>

                <TextInput
                  style={[styles.input, {marginTop: 10}]}
                  placeholder="Referencia (Casa de dos pisos, portón negro...)"
                  value={form.reference}
                  onChangeText={v => updateField('reference', v)}
                  multiline
                />
              </View>
            ) : null}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveClient}
              disabled={saving}>
              <Text style={styles.saveButtonText}>
                {saving ? 'GUARDANDO...' : 'GUARDAR CLIENTE'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* ------------------FIN------------------- */}
      </SafeAreaView>
    </>
  );
}
