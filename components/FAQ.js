import React from 'react'
import {Text, View} from "react-native";
import MyHeader from "./MyHeader";

export default function FAQ({ navigation }) {
    return (
        <View>
            <MyHeader myTitle="FAQ" navigation={navigation}/>
            <View style={{ height:'85%', justifyContent: 'center', alignItems: 'center' }}>
                <Text>FAQ</Text>
            </View>
        </View>
    );
}