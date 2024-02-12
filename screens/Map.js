import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapComponent() {
    const [location, setLocation] = useState({
        latitude: 65.0800,
        longitude: 25.4800,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            try {
                const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                setLocation({
                    ...location,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <MapView
            style={styles.map}
            region={location}
        />
    );
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%',
    },
});