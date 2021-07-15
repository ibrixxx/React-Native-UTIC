import React from 'react'
import {Button, Text, View} from "react-native";
import {Button as RNPB} from "react-native-paper";
import {Icon} from "react-native-elements";


export default function Home({ navigation }) {
    return (
        <View>
            <RNPB onPress={() => navigation.openDrawer()} >
                <Icon
                    name='menu' />
            </RNPB>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '50%' }}>
                <Text>Feed Screen</Text>
                <Button
                    title="Toggle drawer"
                    onPress={() => navigation.navigate('Docs')} />
            </View>
        </View>
    );
}