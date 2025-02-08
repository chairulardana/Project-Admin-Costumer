import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { login } from '../api/api';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Validation Error', 'Please enter both username and password');
            return;
        }

        try {
            const response = await login(username, password);
            if (response.status === 'success') {
                const { role } = response.user;
                navigation.navigate(role === 'admin' ? 'AdminDashboard' : 'CustomerDashboard', {
                    user: response.user
                });
            } else {
                Alert.alert('Error', response.message);
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred during login');
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/image.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                {/* Card untuk form login */}
                <View style={styles.card}>
                    <Text style={styles.title}>Form Login</Text>

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

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <Text style={styles.registerPrompt}>
                        Belum punya akun?{' '}
                        <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
                            Daftar sekarang
                        </Text>
                    </Text>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#0ce70f',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    registerPrompt: {
        color: '#333',
        textAlign: 'center',
    },
    registerLink: {
        color: '#0ce70f',
        fontWeight: 'bold',
    },
});

export default LoginScreen;