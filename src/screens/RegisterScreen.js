import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Impor Picker
import { register } from '../api/api';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // State untuk menyimpan role

    const handleRegister = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            const response = await register(username, password, role); // Kirim role ke API
            if (response.status === 'success') {
                Alert.alert('Success', response.message);
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', response.message);
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred during registration');
        }
    };

    return (
        <ImageBackground 
            source={require('../../assets/image.png')} 
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Form Registrasi</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    {/* Picker untuk memilih role */}
                    <Text style={styles.label}>Pilih Role:</Text>
                    <Picker
                        selectedValue={role}
                        style={styles.picker}
                        onValueChange={(itemValue) => setRole(itemValue)} // Update state role
                    >
                        <Picker.Item label="Customer" value="customer" />
                        <Picker.Item label="Admin" value="admin" />
                    </Picker>

                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>Sudah punya akun? Login sekarang</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
        alignSelf: 'flex-start',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#0ce70f',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginText: {
        textAlign: 'center',
        color: '#007bff',
        fontSize: 16,
    },
});

export default RegisterScreen;