import React from 'react'
import {Text, View} from "react-native";
import MyHeader from "./MyHeader";

export default function Tests({ navigation }) {
    return (
        <View>
            <MyHeader myTitle="Ispiti" navigation={navigation}/>
            <View style={{ height: '85%', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Tests</Text>
            </View>
        </View>
    );
}