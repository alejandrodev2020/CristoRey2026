import React, {useEffect, useMemo, useRef, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Platform, PermissionsAndroid, LayoutAnimation, UIManager, ActivityIndicator, Dimensions, StatusBar} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region, LatLng } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {styles} from './CreateClientStyle';
import IconCamera from '../../../../assets/icons/tabler/svg/outline/camera.svg';
import EyeClose from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import Svg, {Path, Rect} from 'react-native-svg';
import {showMessage} from 'react-native-flash-message';
import {clientService} from '../services/ClientService';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/* ================= TYPES ================= */

type ClientForm = {
  firstName: string;
  lastName: string;
  phone: string;
  ci: string;
  nit: string;
  photo: string;
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

/* ================= CONSTS ================= */

const {height: screenHeight} = Dimensions.get('window');

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
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

/* ================= SCREEN ================= */

export default function UpdateClientScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const {id} = route.params;

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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  const userAlreadyMovedMarkerRef = useRef(false);

  const updateField = (key: keyof ClientForm, value: any) => {
    setForm(prev => ({...prev, [key]: value}));
  };

  /* ================= WAVE ================= */

  const WaveDivider = () => (
    <Svg
      viewBox="0 0 900 600"
      style={{position: 'absolute', top: screenHeight * 0.09}}
      width="100%"
      height={150}
      preserveAspectRatio="none">
      <Rect x="0" y="0" width="900" height="600" fill="#fff" />
      <Path
        d="M0 93L15 101.2C30 109.3 60 125.7 90 129.8C120 134 150 126 180 139.7C210 153.3 240 188.7 270 194C300 199.3 330 174.7 360 171.5C390 168.3 420 186.7 450 178.3C480 170 510 135 540 129C570 123 600 146 630 153.5C660 161 690 153 720 134.3C750 115.7 780 86.3 810 92C840 97.7 870 138.3 885 158.7L900 179L900 0Z"
        fill="#00317aff"
      />
    </Svg>
  );

  /* ================= MAP INIT (CLAVE) ================= */

  const setCoords = (coords: LatLng) => {
    updateField('latitude', coords.latitude);
    updateField('longitude', coords.longitude);
    updateField('link', buildMapsLink(coords.latitude, coords.longitude));
  };

  const getCurrentLocationAndInitMarker = async () => {
    const ok = await requestLocationPermission();

    if (!ok) {
      setCoords(DEFAULT_FALLBACK);
      return;
    }

    setGettingLocation(true);

    Geolocation.getCurrentPosition(
      position => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setGettingLocation(false);
      },
      () => {
        setCoords(DEFAULT_FALLBACK);
        setGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 10000,
      },
    );
  };

  /* ================= LOAD CLIENT ================= */

  const loadClient = async () => {
    try {
      setLoading(true);

      const c = await clientService.getClientById(id);

      setForm({
        firstName: c.firstName ?? '',
        lastName: c.lastName ?? '',
        phone: c.phone ?? '',
        ci: c.ci ?? '',
        nit: c.nit ?? '',
        photo: c.photo
          ? c.photo.replace('data:image/jpeg;base64,', '')
          : '',
        ubication: c.ubication ?? '',
        clientZoneId: c.clientZoneId ?? 1,
        clientRateId: c.clientRateId ?? 1,
        clientTypeId: c.clientTypeId ?? 1,
        clientDiscountId: c.clientDiscountId ?? 1,
        percentageDiscountValue: c.percentageDiscountValue ?? 0,
        company: c.company ?? '',
        latitude: c.latitude ?? 0,
        longitude: c.longitude ?? 0,
        reference: c.reference ?? '',
        link:
          c.link ??
          buildMapsLink(
            c.latitude ?? DEFAULT_FALLBACK.latitude,
            c.longitude ?? DEFAULT_FALLBACK.longitude,
          ),
      });

      if (!c.latitude || !c.longitude) {
        getCurrentLocationAndInitMarker();
      }
    } catch {
      showMessage({
        message: 'Error',
        description: 'No se pudo cargar el cliente',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClient();
  }, [id]);

  /* ================= MAP ================= */

  const region: Region = useMemo(() => ({
    latitude: toNumber(form.latitude, DEFAULT_FALLBACK.latitude),
    longitude: toNumber(form.longitude, DEFAULT_FALLBACK.longitude),
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  }), [form.latitude, form.longitude]);

  const onMarkerDragEnd = (coord: LatLng) => {
    userAlreadyMovedMarkerRef.current = true;
    setCoords(coord);
  };

  const toggleMapPanel = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMapOpen(prev => !prev);

    const lat = toNumber(form.latitude);
    const lng = toNumber(form.longitude);

    if ((!lat || !lng) && !gettingLocation) {
      getCurrentLocationAndInitMarker();
    }
  };

  /* ================= IMAGE ================= */

  const pickPhoto = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.4,
    });
    if (result.assets?.length) {
      updateField('photo', result.assets[0].base64 ?? '');
    }
  };

  const pickFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.4,
    });
    if (result.assets?.length) {
      updateField('photo', result.assets[0].base64 ?? '');
    }
  };

  /* ================= UPDATE ================= */

  const updateClient = async () => {
    if (saving) return;

    try {
      setSaving(true);

      const payload = {
        ...form,
        photo: form.photo
          ? `data:image/jpeg;base64,${form.photo}`
          : null,
      };

      await clientService.UpdateClient(id, payload);

      showMessage({
        message: 'Cliente actualizado',
        description: 'Cambios guardados correctamente',
        type: 'success',
      });

      navigation.dispatch(StackActions.replace('ListClient'));
    } catch {
      showMessage({
        message: 'Error',
        description: 'No se pudo actualizar el cliente',
        type: 'danger',
      });
    } finally {
      setSaving(false);
    }
  };

  /* ================= LOADER ================= */

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
        <Text>Cargando cliente...</Text>
      </View>
    );
  }

  /* ================= RENDER ================= */

  return (
    <>
      <StatusBar backgroundColor="#325284" barStyle="light-content" />

      <LinearGradient
        colors={['#325284', '#00317aff']}
        style={{height: screenHeight * 0.09}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
            Editar Cliente
          </Text>
        </View>
      </LinearGradient>

      <WaveDivider />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EyeClose width={50} height={50} color="#325284" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Editar Cliente</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={{alignItems: 'center'}}>
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

          <View style={styles.avatarActions}>
            <TouchableOpacity style={styles.avatarBtn} onPress={pickPhoto}>
              <Text style={styles.avatarBtnText}>Cámara</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.avatarBtn}
              onPress={pickFromGallery}>
              <Text style={styles.avatarBtnText}>Galería</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          style={styles.input}
          value={form.firstName}
          onChangeText={v => updateField('firstName', v)}
        />
        <TextInput
          style={styles.input}
          value={form.lastName}
          onChangeText={v => updateField('lastName', v)}
        />
        <TextInput
          style={styles.input}
          value={form.phone}
          onChangeText={v => updateField('phone', v)}
        />

        {/* PANEL MAPA */}
        <TouchableOpacity
          onPress={toggleMapPanel}
          style={{
            marginTop: 14,
            padding: 14,
            borderRadius: 12,
            backgroundColor: '#ccd1d1',
          }}>
          <Text style={{fontWeight: '800'}}>Editar ubicación</Text>
        </TouchableOpacity>

        {mapOpen && (
          <View style={{marginTop: 10, borderRadius: 12, overflow: 'hidden'}}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{width: '100%', height: 260}}
              initialRegion={region}
              region={
                userAlreadyMovedMarkerRef.current ? undefined : region
              }
              onPress={e =>
                onMarkerDragEnd(e.nativeEvent.coordinate)
              }>
              <Marker
                draggable
                coordinate={{
                  latitude: toNumber(form.latitude, DEFAULT_FALLBACK.latitude),
                  longitude: toNumber(
                    form.longitude,
                    DEFAULT_FALLBACK.longitude,
                  ),
                }}
                onDragEnd={e =>
                  onMarkerDragEnd(e.nativeEvent.coordinate)
                }
              />
            </MapView>

            <TextInput
              style={[styles.input, {marginTop: 10}]}
              placeholder="Referencia"
              value={form.reference}
              onChangeText={v => updateField('reference', v)}
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={updateClient}>
          <Text style={styles.saveButtonText}>
            {saving ? 'ACTUALIZANDO...' : 'ACTUALIZAR CLIENTE'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
