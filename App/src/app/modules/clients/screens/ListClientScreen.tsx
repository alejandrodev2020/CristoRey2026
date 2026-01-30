import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, Dimensions, Image, FlatList, ActivityIndicator, TextInput, Linking } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path} from 'react-native-svg';
import SearchIcon from '../../../../assets/icons/tabler/svg/outline/search.svg';
import IconClose from '../../../../assets/icons/tabler/svg/outline/x.svg';
import {styles} from './ListClientScreenStyle';
import {Client} from '../models/client_model';
import {clientService} from '../../clients/services/ClientService';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {ClientStackParamList} from '../routes/ClientStackRoutes';
import {IconPlus} from '../../../../assets/icons/tabler/svg';
import EyeClose from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';

const {height: screenHeight} = Dimensions.get('window');
type Props = DrawerScreenProps<ClientStackParamList, 'ListClient'>;

export default function ListClientScreen({navigation}: Props) {
  const [searchText, setSearchText] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const LIMIT = 10;

  const WaveDivider = () => (
    <Svg
      height={100}
      width="100%"
      viewBox="0 0 1440 320"
      style={{position: 'absolute', top: screenHeight * 0.1}}>
      <Path
        fill="#ffffffff"
        d="M0,192L80,165.3C160,139,320,85,480,106.7C640,128,800,224,960,240C1120,256,1280,192,1360,160L1440,128V320H0Z"
      />
    </Svg>
  );

  const goToCreateClient = () => {
    navigation.navigate('CreateClient');
  };

  // ============================================================
  // 🚀 CARGA INICIAL
  // ============================================================
  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredClients(clients);
      return;
    }

    setSearchLoading(true);
    setFilteredClients([]);

    const delay = setTimeout(() => {
      searchClients(searchText);
    }, 400);

    return () => clearTimeout(delay);
  }, [searchText, clients]);

  const loadClients = async () => {
    if (loading || !hasMore || searchText.trim() !== '') return;

    setLoading(true);
    try {
      const query = `?Limit=${LIMIT}&Page=${page}`;
      const response = await clientService.getListClients(query);
      const list = response?.data?.listClients ?? [];

      if (list.length > 0) {
        setClients(prev => {
          const merged = [...prev, ...list];
          setFilteredClients(merged); // 👈 la UI siempre se alimenta de aquí
          return merged;
        });

        setPage(prev => prev + 1);
        if (list.length < LIMIT) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error cargando clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // 🔎 BUSQUEDA POR NOMBRE (IGUAL QUE ANGULAR)
  // ============================================================
  const searchClients = async (text: string) => {
    try {
      const query = `?Name=${encodeURIComponent(text)}&Limit=${LIMIT}&Page=0`;
      const response = await clientService.getListClients(query);
      const list = response?.data?.listClients ?? [];
      setFilteredClients(list);
    } catch (error) {
      console.error('Error buscando clientes:', error);
    } finally {
      setSearchLoading(false);
    }
  };
  // ============================================================
  // 🔄 REFRESH
  // ============================================================
  const refreshClients = async () => {
    setRefreshing(true);
    setPage(0);
    setHasMore(true);

    try {
      const query = `?Limit=${LIMIT}&Page=0`;
      const response = await clientService.getListClients(query);
      const list = response?.data?.listClients ?? [];

      setClients(list);
      setFilteredClients(list);
      setPage(1);
      setHasMore(list.length >= LIMIT);
    } catch (error) {
      console.error('Error refrescando clientes:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({item}: {item: Client}) => {
    const photoUri =
      item.photo && item.photo.length > 0
        ? `data:image/png;base64,${item.photo}`
        : 'https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg';

    const openMaps = () => {
      if (!item.latitude || !item.longitude) return;
      Linking.openURL(
        `https://www.google.com/maps?q=${item.latitude},${item.longitude}`,
      );
    };

    const goToOverview = () => {
      navigation.navigate('OverviewClient', {id: item.id});
    };

    return (
      <TouchableOpacity
        style={{marginLeft: 5, marginRight: 5}}
        activeOpacity={0.85}
        onPress={goToOverview}>
        <View style={styles.clientCardSoft}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Image source={{uri: photoUri}} style={styles.clientPhotoSoft} />
            </View>

            <View style={{flex: 8, paddingLeft: 10}}>
              <Text style={styles.clientNameSoft}>
                {item.firstName} {item.lastName}
              </Text>

              <Text style={styles.clientPhoneSoft}>{item.phone}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  style={[
                    styles.actionBase,
                    styles.actionEdit,
                    {marginRight: 8},
                  ]}
                  onPress={() =>
                    navigation.navigate('UpdateClient', {id: item.id})
                  }>
                  <Text style={styles.actionEditText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBase, styles.actionMap]}
                  onPress={openMaps}>
                  <Text style={styles.actionMapText}>Maps</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#325284'}}
        edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#325284', '#00317a']}
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradientContainer}>
            <Text style={styles.header}>Listado de Clientes</Text>

            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <SearchIcon color="#bbb" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Buscar por nombre..."
                  placeholderTextColor="#bbb"
                />
                {searchText.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchText('')}>
                    <IconClose color="#bbb" style={styles.icon} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </LinearGradient>

          <WaveDivider />

          <View
            style={{
              backgroundColor: '#ffffff',
            }}>
            <View style={styles.header2}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <EyeClose width={50} height={50} color={'#325284'} />
              </TouchableOpacity>
              <View style={styles.headerRight}>
                <Text style={styles.headerText}>CLIENTES</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: 'transparent',
              marginTop: 10,
              marginHorizontal: 25,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.18,
              shadowRadius: 6,
              elevation: 6,
            }}
          />

          {/* <View style={{paddingHorizontal: 15, marginTop: -20}}> */}
          <View
            style={{
              paddingHorizontal: 15,
              paddingTop: 0,
              backgroundColor: '#fff',
            }}>
            <FlatList
              data={filteredClients}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              onEndReached={loadClients}
              onEndReachedThreshold={0.5}
              refreshing={refreshing}
              onRefresh={refreshClients}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 12, // 👈 baja el primer registro
                paddingBottom: 24, // opcional, da aire al final
              }}
              ListFooterComponent={
                loading || searchLoading ? (
                  <ActivityIndicator
                    size="large"
                    color="#293e61ff"
                    style={{marginVertical: 16}}
                  />
                ) : null
              }
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={goToCreateClient}
          activeOpacity={0.85}
          style={styles.fab}>
          <IconPlus width={28} height={28} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
