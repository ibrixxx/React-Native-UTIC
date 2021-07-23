import React from 'react'
import {Text, View} from "react-native";
import MyHeader from "./MyHeader";


export default function Curriculum({ navigation }) {
    return (
        <View>
            <MyHeader myTitle="Studij" navigation={navigation}/>
            <View style={{ height: '85%', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Curriculum</Text>
            </View>
        </View>
    );
}