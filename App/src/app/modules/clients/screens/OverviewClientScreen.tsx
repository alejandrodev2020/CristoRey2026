import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StatusBar, TouchableOpacity, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { clientService } from '../../clients/services/ClientService';
import { styles } from './OverviewClientScreenStyle';
import { ClientStackParamList } from '../routes/ClientStackRoutes';
import EyeClose from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';

type RouteProps = RouteProp<ClientStackParamList, 'OverviewClient'>;

export default function OverviewClientScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const { id } = route.params;
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClient();
  }, []);

  const loadClient = async () => {
    try {
      const response = await clientService.getClientById(id);
      setClient(response ?? null);

    } catch (error) {
      console.error('Error cargando cliente:', error);
    } finally {
      setLoading(false);
    }
  };

  const getClientPhoto = (base64?: string) => {
    if (!base64) {
      return 'https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg';
    }
    return `data:image/jpeg;base64,${base64}`;
  };

  // ============================
  // LOADING
  // ============================
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#325284" />
      </View>
    );
  }

  if (!client) {
    return (
      <View style={styles.loader}>
        <Text>No se pudo cargar el cliente</Text>
      </View>
    );
  }

  // ============================
  // RENDER
  // ============================
  return (
<>
  <StatusBar backgroundColor="#325284" barStyle="light-content" />

  <ScrollView style={styles.container}>

    {/* ================= PORTADA ================= */}
    <View style={styles.headerWrapper}>
      <Image
        source={{ uri: getClientPhoto(client.photo) }}
        style={styles.headerImage}
      />

    <LinearGradient
    colors={['#325284', 'rgba(50,82,132,0.0)']}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 0.3 }}
    style={styles.headerGradient}
    />
    <LinearGradient
    colors={['rgba(0,0,0,0)', '#325284']}
    start={{ x: 0.5, y: 0.5 }}
    end={{ x: 0.5, y: 1 }}
    style={[styles.headerGradient, { height: '60%', bottom: 0 }]}
    />

    </View>

    {/* ================= HEADER FLOTANTE ================= */}
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <EyeClose width={40} height={40} color="#325284" />
      </TouchableOpacity>

      <View style={styles.headerRight}>
        <Text style={styles.headerText}>DETALLE DEL CLIENTE</Text>
      </View>

    </View>

    {/* ================= CARD INFO ================= */}
    <View style={styles.card}>

      <Text style={styles.clientName}>
        {client.firstName} {client.lastName}
      </Text>

      <Text style={styles.clientCompany}>
        {client.company || 'Sin empresa'}
      </Text>

      <View style={{ height: 20 }} />

      <View style={styles.infoRow}>
        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.value}>{client.phone || '-'}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Correo</Text>
        <Text style={styles.value}>{client.email || '-'}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Dirección</Text>
        <Text style={styles.value}>{client.address || '-'}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Empresa</Text>
        <Text style={styles.value}>{client.company || '-'}</Text>
      </View>

      {/* BOTÓN MAPS */}
      {client.latitude && client.longitude && (
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() =>
            Linking.openURL(
              `https://www.google.com/maps?q=${client.latitude},${client.longitude}`
            )
          }
        >
          <Text style={styles.mapButtonText}>📍 Navegar a ubicación</Text>
        </TouchableOpacity>
      )}

    </View>

  </ScrollView>
</>


  );
}
