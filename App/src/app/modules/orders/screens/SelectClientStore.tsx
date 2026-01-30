import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, TextInput, Dimensions, StatusBar } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../../MainRoutes';
import LinearGradient from 'react-native-linear-gradient';
import { clientService } from '../../clients/services/ClientService';
import { Client } from '../../clients/models/client_model';
import { styles } from './SelectClientStoreStyle';
import EyeClose from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
import SearchIcon from '../../../../assets/icons/tabler/svg/outline/search.svg';
import IconClose from '../../../../assets/icons/tabler/svg/outline/x.svg';
import IconCheck from '../../../../assets/icons/tabler/svg/outline/user-check.svg';
import Svg, { Path } from 'react-native-svg';
import { removeItemByKey, saveSelectedClient } from '../context/saveSelectedClientStorage';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = DrawerScreenProps<DrawerParamList, 'SelectClientOrdersStore'>;
const { height: screenHeight } = Dimensions.get('window');

export default function SelectClientOrdersStoreScreen({ route, navigation }: Props) {
    const { warehouseId } = route.params;
    const [clients, setClients] = useState<Client[]>([]);
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);
    
    // Estados de carga
    const [loading, setLoading] = useState<boolean>(false);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const LIMIT = 10;

    useEffect(() => {
        const init = async () => {
            await removeItemByKey('selectedClient');
            loadClients();
        };
        init();
    }, []);

    // Lógica de Búsqueda con Activity Indicator dinámico
    useEffect(() => {
        if (searchText.trim() === '') {
            setFilteredClients(clients);
            setSearchLoading(false); // Apagar si se limpia el texto
            return;
        }

        // 1. Encendemos el loader de búsqueda apenas el usuario empieza a escribir
        setSearchLoading(true);

        const delay = setTimeout(() => {
            searchClients(searchText);
        }, 600); // Un poco más de tiempo para no saturar mientras escribe rápido

        return () => clearTimeout(delay);
    }, [searchText, clients]);

    const loadClients = async () => {
        if (loading || !hasMore || searchText.trim() !== '') return;
        setLoading(true);
        try {
            const query = `?Limit=${LIMIT}&Page=${page}&warehouseId=${warehouseId}`;
            const response = await clientService.getListClients(query);
            const list = response?.data?.listClients ?? [];

            if (list.length > 0) {
                const merged = [...clients, ...list];
                setClients(merged);
                setFilteredClients(merged);
                setPage(prev => prev + 1);
                if (list.length < LIMIT) setHasMore(false);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error cargando:', error);
        } finally {
            setLoading(false);
        }
    };

    const searchClients = async (text: string) => {
        try {
            const query = `?Name=${encodeURIComponent(text)}&Limit=${LIMIT}&Page=0&warehouseId=${warehouseId}`;
            const response = await clientService.getListClients(query);
            const list = response?.data?.listClients ?? [];
            setFilteredClients(list);
        } catch (error) {
            console.error('Error buscando:', error);
        } finally {
            // 2. Apagamos el loader una vez recibimos respuesta del backend
            setSearchLoading(false);
        }
    };

    const refreshClients = async () => {
        setRefreshing(true);
        setPage(0);
        setHasMore(true);
        setSearchText('');
        try {
            const query = `?Limit=${LIMIT}&Page=0&warehouseId=${warehouseId}`;
            const response = await clientService.getListClients(query);
            const list = response?.data?.listClients ?? [];
            setClients(list);
            setFilteredClients(list);
            setPage(1);
        } finally {
            setRefreshing(false);
        }
    };

    const onSelectClient = async (client: Client) => {
        await saveSelectedClient(client);
        navigation.navigate('OrdersStoreProduct', {
            warehouseId: warehouseId,
            clientId: client.id,
        });
    };

    // Loader de pantalla completa (Solo al entrar)
    if (loading && page === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <ActivityIndicator size="large" color="#325284" />
                <Text style={{ marginTop: 15, color: '#325284', fontFamily: 'Poppins-Medium' }}>Cargando Clientes...</Text>
            </View>
        );
    }

    const WaveDivider = () => (
        <Svg height={100} width="100%" viewBox="0 0 1440 320" style={{ position: 'absolute', top: screenHeight * 0.15 }}>
            <Path fill="#ffffffff" d="M0,192L80,165.3C160,139,320,85,480,106.7C640,128,800,224,960,240C1120,256,1280,192,1360,160L1440,128V320H0Z" />
        </Svg>
    );

    const renderItem = ({ item }: { item: Client }) => {
        const photoUri = item.photo && item.photo.length > 0
            ? `data:image/png;base64,${item.photo}`
            : 'https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg';

        return (
            <TouchableOpacity style={styles.contactItem} onPress={() => onSelectClient(item)}>
                <Image source={{ uri: photoUri }} style={styles.contactPhoto} />
                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{item.firstName} {item.lastName}</Text>
                    <Text style={styles.contactNumber}>{item.phone}</Text>
                </View>
                <IconCheck color="#969696ff" />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#325284' }} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                <StatusBar backgroundColor={'#325284'} barStyle="light-content" />
                <LinearGradient colors={['#325284', '#00317aff']} style={styles.gradientContainer}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <EyeClose width={50} height={50} color={'#c5c5c6ff'} />
                        </TouchableOpacity>
                        <Text style={styles.header}>Seleccionar Cliente</Text>
                    </View>
                    
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBar}>
                            <SearchIcon color="#bbb" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                value={searchText}
                                onChangeText={setSearchText}
                                placeholder="Escribe para buscar..."
                                placeholderTextColor="#bbb"
                            />
                            {/* Aquí mostramos el ActivityIndicator de búsqueda si el usuario está escribiendo */}
                            {searchLoading ? (
                                <ActivityIndicator size="small" color="#325284" style={{ marginRight: 10 }} />
                            ) : (
                                searchText.length > 0 && (
                                    <TouchableOpacity onPress={() => setSearchText('')}>
                                        <IconClose color="#bbb" style={styles.icon} />
                                    </TouchableOpacity>
                                )
                            )}
                        </View>
                    </View>
                </LinearGradient>
                <WaveDivider />

                <View style={{ flex: 1, paddingHorizontal: 15, marginTop: -20 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 18, color: '#6b6b6bff', marginBottom: 10 }}>Lista de Clientes:</Text>
                    <FlatList
                        data={filteredClients}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={loadClients}
                        onEndReachedThreshold={0.5}
                        refreshing={refreshing}
                        onRefresh={refreshClients}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        ListFooterComponent={
                            loading ? (
                                <ActivityIndicator size="large" color="#293e61ff" style={{ marginVertical: 16 }} />
                            ) : null
                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}