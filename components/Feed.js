import React from 'react'
import {Button, Text, View} from "react-native";
import {Button as RNPB} from "react-native-paper";
import {Icon} from "react-native-elements";


export default function Feed({ navigation }) {
    return (
        <View>
            <RNPB onPress={() => navigation.openDrawer()} >
                <Icon
                    name='menu' />
            </RNPB>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Feed Screen</Text>
                <Button title="Toggle drawer" onPress={() => navigation.navigate('Dokumenti')} />
            </View>
        </View>
    );
}