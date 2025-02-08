import axios from 'axios';
import { API_URL,API_CUSTOMER_URL,API_BARANG_URL} from '../utils/constants';


export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, {
            username,
            password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (username, password, role) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, {
            username,
            password,
            role
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchData = async (role) => {
    try {
        const response = await axios.get(`${API_URL}/api/data`, {
            params: { role }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchCustomer = async () => {
    try {
      const response = await axios.get(API_CUSTOMER_URL);
      console.log('Data customer yang diterima:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  };
  
  // ✅ Tambah customer baru
  export const addCustomer = async (customer) => {
    try {
      // Validasi data customer yang diterima
      if (!customer || !customer.idbarang || !customer.namacostumer || !customer.jumlahbarang || !customer.totalharga || !customer.tanggaltransaksi) {
        throw new Error('Data customer tidak lengkap');
      }
  
      const response = await axios.post(API_CUSTOMER_URL, customer);
      if (response.status === 201) {
        console.log('Customer berhasil ditambahkan:', response.data);
        return response.data;
      } else {
        throw new Error('Customer gagal ditambahkan');
      }
    } catch (error) {
      console.error('Error adding customer:', error.message);
      throw error;
    }
  };
  
  // ✅ Update customer berdasarkan ID
  export const updateCustomer = async (id, customer) => {
    try {
      // Validasi data customer yang diterima
      if (!customer || !customer.idbarang || !customer.namacostumer || !customer.jumlahbarang || !customer.totalharga || !customer.tanggaltransaksi) {
        throw new Error('Data customer tidak lengkap');
      }
  
      const response = await axios.put(`${API_CUSTOMER_URL}/${id}`, customer);
      console.log('Customer berhasil diperbarui:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  };
  
  // ✅ Hapus customer berdasarkan ID
  export const deleteCustomer = async (id) => {
    try {
      await axios.delete(`${API_CUSTOMER_URL}/${id}`);
      console.log('Customer berhasil dihapus');
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  };
  
  // ✅ Ambil barang berdasarkan ID
  export const fetchBarangById = async (id) => {
    try {
      const response = await axios.get(`${API_BARANG_URL}/${id}`);
      console.log('Data barang yang diterima:', response.data);
      return response.data;  // Mengembalikan data barang (misalnya { id, namabarang })
    } catch (error) {
      console.error(`Error fetching barang with ID ${id}:`, error);
      throw error;
    }
  };
  
  
  // ✅ Ambil semua barang
  export const fetchBarang = async () => {
    try {
      const response = await axios.get(API_BARANG_URL);
      console.log('Data barang yang diterima:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching barang:', error);
      throw error;
    }
  };

  
  
  // ✅ Tambah barang baru
  export const addBarang = async (barang) => {
    try {
      // Validasi data barang yang diterima
      if (!barang || !barang.namabarang || !barang.qty || !barang.totalharga || !barang.tanggalpengeluaran) {
        throw new Error('Data barang tidak lengkap');
      }
  
      const response = await axios.post(API_BARANG_URL, barang);
      if (response.status === 201) {
        console.log('Barang berhasil ditambahkan:', response.data);
        return response.data;
      } else {
        throw new Error('Barang gagal ditambahkan');
      }
    } catch (error) {
      console.error('Error adding barang:', error.message);
      throw error;
    }
  };
  
  // ✅ Update barang berdasarkan ID
  export const updateBarang = async (id, barang) => {
    try {
      // Validasi data barang yang diterima
      if (!barang || !barang.namabarang || !barang.qty || !barang.totalharga || !barang.tanggalpengeluaran) {
        throw new Error('Data barang tidak lengkap');
      }
  
      const response = await axios.put(`${API_BARANG_URL}/${id}`, barang);
      console.log('Barang berhasil diperbarui:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating barang:', error);
      throw error;
    }
  };
  
  // ✅ Hapus barang berdasarkan ID
  export const deleteBarang = async (id) => {
    try {
      await axios.delete(`${API_BARANG_URL}/${id}`);
      console.log('Barang berhasil dihapus');
    } catch (error) {
      console.error('Error deleting barang:', error);
      throw error;
    }
  };
  export const fetchTransaksi = async () => {
    try {
      const response = await axios.get(API_BARANG_URL);
      return response.data; // Pastikan response sesuai dengan format data yang diterima
    } catch (error) {
      console.error("Error fetching transaksi:", error);
      throw error;
    }
  };
  
  export const addTransaksi = async (transaksi) => {
    try {
      const response = await axios.post(API_BARANG_URL, transaksi);
      console.log('Transaksi berhasil ditambahkan:',response.data);
      return response.data; // pastikan response dari API dikembalikan
    } catch (error) {
      console.error('Error adding transaksi:', error.response?.data || error.message);
      throw error; // pastikan error dilempar agar bisa ditangani di frontend
    }
  };
  export const updateTransaksi = async (id, transaksi) => {
    try {
      const response = await axios.put(`${API_BARANG_URL}/${id}`, transaksi);
      return response.data;
    } catch (error) {
      console.error("Error updating transaksi:", error);
      throw error;
    }
  };
  export const deleteTransaksi = async (id) => {
    try {
      const response = await axios.delete(`${API_BARANG_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting transaksi:", error);
      throw error;
    }
  };
  
  export const fetchTransaksiById = async (id) => {
    try {
        const response = await axios.get(`${API_CUSTOMER_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching transaksi:', error);
        return null;
    }
  };
  export const fetchBarangList = async () => {
    try {
        const response = await axios.get(`${API_BARANG_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching barang:', error);
        return [];
    }
  };
  
  
  // "Tidak Perlu Menjadi Berkelas,
  // Buka Laptopmu Kita Ngoding Gaya Bebas"