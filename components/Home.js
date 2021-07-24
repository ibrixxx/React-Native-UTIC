import React from 'react'
import {Button, Text, View} from "react-native";
import MyHeader from "./MyHeader";


export default function Home({ navigation }) {
    return (
        <View>
            <MyHeader myTitle="Home" navigation={navigation}/>
            <View style={{ height: '85%', justifyContent: 'center', alignItems: 'center'}}>
                <Button
                    title="Toggle drawer"
                    onPress={() => navigation.navigate('Docs')} />
            </View>
        </View>
    );
}