import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { updateTransaksi, fetchTransaksi } from '../api/api';

const EditPage = ({ route, navigation }) => {
  const { id } = route.params;
  const [namabarang, setNamabarang] = useState('');
  const [qty, setQty] = useState('');
  const [totalharga, setTotalharga] = useState('');
  const [tanggalpengeluaran, setTanggalpengeluaran] = useState('');
  const [transaksiData, setTransaksiData] = useState([]);

  // Memuat data transaksi saat halaman pertama kali dibuka
  useEffect(() => {
    const loadTransaksi = async () => {
      try {
        const result = await fetchTransaksi();
        const transaksi = result.find(item => item.id === id);
        if (transaksi) {
          setNamabarang(transaksi.namabarang);
          setQty(transaksi.qty.toString()); // pastikan qty berupa string
          setTotalharga(transaksi.totalharga.toString()); // pastikan totalharga berupa string
          setTanggalpengeluaran(transaksi.tanggalpengeluaran);
        }
      } catch (error) {
        console.error('Error fetching transaksi:', error);
      }
    };
    loadTransaksi();
  }, [id]); // Memuat ulang jika ID berubah

  // Fungsi untuk handle submit form update transaksi
  const handleSubmit = async () => {
    const transaksi = { namabarang, qty, totalharga, tanggalpengeluaran };
    try {
      // Update transaksi dengan API
      const updatedTransaksi = await updateTransaksi(id, transaksi);

      // Setelah transaksi berhasil diupdate, perbarui state transaksiData
      setTransaksiData(prevState => 
        prevState.map(item =>
          item.id === id ? { ...item, ...updatedTransaksi } : item
        )
      );
      // Navigasi kembali ke halaman sebelumnya
      navigation.goBack();
    } catch (error) {
      console.error('Error updating transaksi:', error);
      Alert.alert('Error', 'Gagal memperbarui transaksi');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nama Barang"
        value={namabarang}
        onChangeText={setNamabarang}
      />
      <TextInput
        style={styles.input}
        placeholder="Qty"
        keyboardType="numeric"
        value={qty}
        onChangeText={setQty}
      />
      <TextInput
        style={styles.input}
        placeholder="Total Harga"
        keyboardType="numeric"
        value={totalharga}
        onChangeText={setTotalharga}
      />
      <TextInput
        style={styles.input}
        placeholder="Tanggal Pengeluaran"
        value={tanggalpengeluaran}
        onChangeText={setTanggalpengeluaran}
      />
      <Button title="Update Transaksi" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 },
});

export default EditPage;
