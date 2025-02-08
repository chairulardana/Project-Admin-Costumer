import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { fetchCustomer, fetchBarangById, deleteCustomer } from '../api/api';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomerDashboard = ({ navigation, route }) => {
    const { user } = route.params || { user: { name: 'Pengguna Tidak Dikenal' } };

    const [customer, setCustomer] = useState([]);
    const [barangMap, setBarangMap] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const loadCustomer = async () => {
        setLoading(true);
        try {
            const result = await fetchCustomer();
            setCustomer(result);

            const barangMapTemp = {};
            const barangPromises = result.map(async (item) => {
                if (!barangMapTemp[item.idbarang]) {
                    const barang = await fetchBarangById(item.idbarang);
                    barangMapTemp[item.idbarang] = barang?.namabarang || 'Barang tidak ditemukan';
                }
            });

            await Promise.all(barangPromises);
            setBarangMap(barangMapTemp);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadCustomer();
        }, [])
    );

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const handleLogout = () => {
        navigation.replace('Login');
    };

    const filteredCustomers = customer.filter(item =>
        item.namacostumer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            await deleteCustomer(id);
            setCustomer(customer.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    return (
        <LinearGradient colors={['#A71FB2', '#25274d']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Selamat Datang Costumer {user.name}</Text>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Icon name="logout" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                
                <TextInput
                    style={styles.searchBar}
                    placeholder="Cari customer..."
                    placeholderTextColor="#777"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />

                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddOrder')}>
                    <Icon name="add-shopping-cart" size={24} color="#fff" />
                    <Text style={styles.addButtonText}>Tambah Order</Text>
                </TouchableOpacity>

                {loading ? (
                    <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />
                ) : (
                    <FlatList
                        data={filteredCustomers}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text style={styles.title}>{item.namacostumer}</Text>
                                <Text style={styles.detailText}>Nama Barang: {barangMap[item.idbarang] || 'Loading...'}</Text>
                                <Text style={styles.detailText}>Jumlah: {item.jumlahbarang}</Text>
                                <Text style={styles.detailText}>Total Harga: Rp {item.totalharga}</Text>
                                <Text style={styles.detailText}>Tanggal: {new Date(item.tanggaltransaksi).toLocaleDateString()}</Text>
                                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                                    <Icon name="delete" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    contentContainer: { padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    headerText: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
    logoutButton: { backgroundColor: '#dc3545', padding: 8, borderRadius: 5 },
    searchBar: { backgroundColor: '#fff', borderRadius: 10, padding: 12, fontSize: 16, marginBottom: 15 },
    addButton: { flexDirection: 'row', backgroundColor: '#28a745', padding: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
    addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
    card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 5, marginVertical: 10 },
    title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    detailText: { fontSize: 16, color: '#555', marginTop: 5 },
    deleteButton: { backgroundColor: '#dc3545', padding: 8, borderRadius: 5, alignItems: 'center', marginTop: 10 },
    loadingIndicator: { marginTop: 20 }
});

export default CustomerDashboard;