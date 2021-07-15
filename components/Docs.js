import React from 'react'
import {Button, Text, View} from "react-native";

export default function Docs({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Dokumenti</Text>
            <Button
                title="Početna"
                onPress={() => navigation.navigate('Home')} />
        </View>
    );
}