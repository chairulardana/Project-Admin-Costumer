import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        // Animasi fade-in
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        // Timer untuk pindah ke Login
        setTimeout(() => {
            navigation.replace('Login');
        }, 7000);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <LottieView
                    source={require('../../assets/lotie.json')} // Animasi Lottie
                    autoPlay
                    loop
                    style={styles.lottie}
                />
                <Text style={styles.text}>Hello Everyone</Text>
            </Animated.View>

            {/* Footer */}
            <Text style={styles.footer}>© 2025 Chairul Ardana. All rights reserved.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a001f',
    },
    lottie: {
        width: 200,
        height: 200,
    },
    text: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
    },
});

export default SplashScreen;
