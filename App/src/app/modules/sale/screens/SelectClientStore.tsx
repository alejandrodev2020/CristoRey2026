import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, TextInput, Dimensions, StatusBar} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerParamList} from '../../MainRoutes';
import LinearGradient from 'react-native-linear-gradient';
import {clientService} from '../../clients/services/ClientService';
import {Client} from '../../clients/models/client_model';
import {styles} from './SelectClientStoreStyle';
import {removeItemByKey,  saveSelectedClient} from '../context/saveSelectedClientStorage';
import EyeClose from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
import SearchIcon from '../../../../assets/icons/tabler/svg/outline/search.svg';
import IconClose from '../../../../assets/icons/tabler/svg/outline/x.svg';
import IconCheck from '../../../../assets/icons/tabler/svg/outline/user-check.svg';
import {useTheme} from '../../../core/themes/useTheme';
import Svg, {Path} from 'react-native-svg';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = DrawerScreenProps<DrawerParamList, 'SelectClientSaleStore'>;
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default function SelectClientSaleStoreScreen({
  route,
  navigation,
}: Props) {
  const {warehouseId} = route.params;
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [planId, setPlanId] = useState<number | null>(null);
  const [currentWarehouseId, setCurrentWarehouseId] = useState<number>(0);
  const LIMIT = 10;
  const theme = useTheme();

  useEffect(() => {
    const init = async () => {
      await removeItemByKey('selectedClient');
      await loadClients();
      setCurrentWarehouseId(warehouseId);
    };
    init();
  }, []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredClients(clients);
    } else {
      const lower = searchText.toLowerCase();
      const filtered = clients.filter(
        client =>
          (client.firstName?.toLowerCase() ?? '').includes(lower) ||
          (client.lastName?.toLowerCase() ?? '').includes(lower) ||
          (client.company?.toLowerCase() ?? '').includes(lower) ||
          client.id.toString().includes(lower),
      );
      setFilteredClients(filtered);
    }
  }, [searchText, clients]);

  const refreshClients = async () => {
    setRefreshing(true);
    setPage(0);
    setHasMore(true);

    try {
      const query = `?Limit=${LIMIT}&Page=0`;
      const response = await clientService.getListClients(query);

      if (response && response.data.listClients.length > 0) {
        setClients(response.data.listClients);
        setFilteredClients(response.data.listClients);
        setPage(1);
        setHasMore(response.data.listClients.length >= LIMIT);
      } else {
        setClients([]);
        setFilteredClients([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error refrescando clientes:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const loadClients = async () => {
    if (loading || !hasMore || searchText.trim() !== '') return;

    setLoading(true);
    try {
      const query = `?Limit=${LIMIT}&Page=${page}&warehouseId=${warehouseId}`;
      const response = await clientService.getListClients(query);

      if (response && response.data.listClients.length > 0) {
        const newClients = [...clients, ...response.data.listClients];
        setClients(newClients);
        setFilteredClients(newClients);
        setPage(prev => prev + 1);

        if (response.data.listClients.length < LIMIT) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error cargando clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSelectClient = async (client: Client) => {
    await saveSelectedClient(client);
    console.log(currentWarehouseId, 'WARE');
    navigation.navigate('SaleStoreProduct', {
      warehouseId: currentWarehouseId,
      clientId: client.id,
    });
  };

  if (loading && page === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  const clearSearch = () => {
    setSearchText('');
  };

  const WaveDivider = () => (
    <Svg
      height={100}
      width="100%"
      viewBox="0 0 1440 320"
      style={{position: 'absolute', top: screenHeight * 0.15}}>
      <Path
        fill="#ffffffff"
        d="M0,192L80,165.3C160,139,320,85,480,106.7C640,128,800,224,960,240C1120,256,1280,192,1360,160L1440,128V320H0Z"
      />
    </Svg>
  );

  const renderItem = ({item}: any) => {
    const photoUri =
      item.photo && item.photo.length > 0
        ? `data:image/png;base64,${item.photo}`
        : 'https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg'; // Imagen por defecto

    return (
      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => onSelectClient(item)}>
        <Image source={{uri: photoUri}} style={styles.contactPhoto} />
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.contactNumber}>{item.phone}</Text>
          {item.debt && <Text style={styles.contactDebt}>{item.debt}</Text>}
        </View>
        <IconCheck color="#969696ff" />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#325284'}}
        edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          <StatusBar backgroundColor={'#325284'} barStyle="light-content" />
          <LinearGradient
            colors={['#325284', '#00317aff']}
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradientContainer} // estilo que abarque todo
          >
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => {
                  if (planId !== null && planId <= 4) {
                    // 🔥 volver al home, romper navegación previa
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Home'}], // O el nombre de tu Drawer principal
                    });
                  } else {
                    navigation.goBack();
                  }
                }}>
                <EyeClose
                  width={50}
                  height={50}
                  style={{margin: 0}}
                  color={'#c5c5c6ff'}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.header}>Seleccionar Cliente</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <SearchIcon color="#bbb" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Buscar por nombre.."
                  placeholderTextColor="#bbb"
                />
                {searchText.length > 0 && (
                  <TouchableOpacity onPress={clearSearch}>
                    <IconClose color="#bbb" style={styles.icon} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </LinearGradient>
          <WaveDivider />

          <View style={{paddingHorizontal: 15, marginTop: -20}}>
            {/* <Text>Total: 12</Text> */}
            <View style={{marginBottom: 10}}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 18,
                  color: '#6b6b6bff',
                }}>
                Clientes:
              </Text>
            </View>
            <FlatList
              data={filteredClients}
              keyExtractor={item => item.id.toString()}
              onEndReached={loadClients}
              onEndReachedThreshold={0.5}
              refreshing={refreshing}
              onRefresh={refreshClients}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                loading ? (
                  <ActivityIndicator
                    size="large"
                    color="#293e61ff"
                    style={{marginVertical: 16}}
                  />
                ) : null
              }
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
