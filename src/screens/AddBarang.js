// AddPage.js (React Native)
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { addTransaksi } from '../api/api';

const AddPage = ({ navigation }) => {
  const [namabarang, setNamabarang] = useState('');
  const [qty, setQty] = useState('');
  const [totalharga, setTotalharga] = useState('');
  const [tanggalpengeluaran, setTanggalpengeluaran] = useState('');

  // Atur tanggal pengeluaran otomatis ke tanggal saat ini
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    setTanggalpengeluaran(currentDate);
  }, []);

  const handleSubmit = async () => {
    const transaksi = { namabarang, qty, totalharga, tanggalpengeluaran };
    try {
      await addTransaksi(transaksi);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding transaksi:', error);
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
        editable={false} // Tidak dapat diedit karena otomatis diatur
      />
      <Button title="Add Transaksi" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 },
});

export default AddPage;
