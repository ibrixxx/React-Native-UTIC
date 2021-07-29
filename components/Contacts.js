import React from 'react'
import {Text, View} from "react-native";
import MyHeader from "./MyHeader";

export default function Contacts({ navigation }) {
    return (
        <View>
            <MyHeader myTitle="Kontakti" navigation={navigation}/>
            <View style={{ height: '85%', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Contacts</Text>
            </View>
        </View>
    );
}