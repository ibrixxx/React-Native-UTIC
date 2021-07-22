import React from 'react'
import {Button, Text, View} from "react-native";
import {IconButton} from "react-native-paper";


export default function Home({ navigation }) {
    return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                <IconButton icon={'menu'} size={50} style={{marginRight: '75%'}} onPress={() => navigation.openDrawer()} />
                <Text>Feed Screen</Text>
                <Button
                    title="Toggle drawer"
                    onPress={() => navigation.navigate('Docs')} />
            </View>
    );
}