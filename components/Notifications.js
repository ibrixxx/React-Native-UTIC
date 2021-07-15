import React from 'react';
import {Button, Text, View} from "react-native";


export default function Notifications({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Notifications Screen</Text>
            <Button
                title="Početna"
                onPress={() => navigation.navigate('Home')} />
        </View>
    );
}