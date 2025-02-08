import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addCustomer, fetchBarang } from '../api/api';  // Import addCustomer API

const AddOrderScreen = ({ navigation }) => {
  const [namaCustomer, setNamaCustomer] = useState('');
  const [idBarang, setIdBarang] = useState('');
  const [jumlahBarang, setJumlahBarang] = useState('');
  const [totalHarga, setTotalHarga] = useState('');
  const [barangList, setBarangList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Barang data saat halaman dimuat
  useEffect(() => {
    const loadBarang = async () => {
      try {
        const response = await fetchBarang(); // Mengambil data barang
        setBarangList(response);
      } catch (error) {
        console.error('Error fetching barang:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadBarang();
  }, []);

  // Update harga total berdasarkan barang dan jumlah
  const handleBarangChange = (itemValue) => {
    setIdBarang(itemValue);
    const selectedBarang = barangList.find((barang) => barang.id === parseInt(itemValue, 10));
    if (selectedBarang) {
      const hargaBarang = parseInt(selectedBarang.totalharga, 10);
      if (!isNaN(hargaBarang) && !isNaN(jumlahBarang)) {
        const calculatedTotalHarga = hargaBarang * parseInt(jumlahBarang, 10);
        setTotalHarga(calculatedTotalHarga.toString());
      } else {
        setTotalHarga('');
      }
    } else {
      setTotalHarga('');
    }
  };

  // Update total harga saat jumlah barang diubah
  const handleJumlahBarangChange = (value) => {
    const jumlah = parseInt(value, 10);
    setJumlahBarang(value);
    if (idBarang) {
      const selectedBarang = barangList.find((barang) => barang.id === parseInt(idBarang, 10));
      if (selectedBarang) {
        const hargaBarang = parseInt(selectedBarang.totalharga, 10);
        if (!isNaN(hargaBarang) && !isNaN(jumlah)) {
          const calculatedTotalHarga = hargaBarang * jumlah;
          setTotalHarga(calculatedTotalHarga.toString());
        } else {
          setTotalHarga('');
        }
      } else {
        setTotalHarga('');
      }
    }
  };

  // Fungsi untuk menambahkan transaksi
  const handleAddTransaksi = async () => {
    if (!idBarang || !namaCustomer || !jumlahBarang || !totalHarga) {
      Alert.alert('Error', 'Semua kolom harus diisi!');
      return;
    }

    const transaksi = {
      idbarang: parseInt(idBarang, 10),
      namacostumer: namaCustomer,
      jumlahbarang: parseInt(jumlahBarang, 10),
      totalharga: parseInt(totalHarga, 10),
      tanggaltransaksi: new Date().toISOString(),
    };

    try {
      // Mengirim data transaksi ke API untuk ditambahkan ke customer
      await addCustomer(transaksi);
      Alert.alert('Sukses', 'Order berhasil ditambahkan!');
      navigation.goBack(); // Kembali ke halaman sebelumnya
    } catch (error) {
      Alert.alert('Gagal', `Gagal menambahkan order: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Order</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Customer"
        value={namaCustomer}
        onChangeText={setNamaCustomer}
      />
      <Text style={styles.label}>Pilih Barang</Text>
      {isLoading ? (
        <Text>Loading barang...</Text>
      ) : (
        <Picker selectedValue={idBarang} onValueChange={handleBarangChange} style={styles.picker}>
          <Picker.Item label="Pilih Barang" value="" />
          {barangList.map((barang) => (
            <Picker.Item key={barang.id} label={barang.namabarang} value={barang.id.toString()} />
          ))}
        </Picker>
      )}
      <TextInput
        style={styles.input}
        placeholder="Jumlah Barang"
        value={jumlahBarang}
        onChangeText={handleJumlahBarangChange}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Total Harga"
        value={totalHarga}
        editable={false}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTransaksi}>
        <Text style={styles.buttonText}>BELI SEKARANG</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  input: { height: 45, borderColor: '#4e4fc5', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff' },
  picker: { height: 45, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, borderRadius: 8, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 5, color: '#555' },
  button: { backgroundColor: '#16ad00', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default AddOrderScreen;
