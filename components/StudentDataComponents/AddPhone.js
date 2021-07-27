import React from 'react';
import { View, Text } from 'react-native';
import {Title} from "react-native-paper";
import MyHeader from "../MyHeader";

export default function AddPhone({ navigation }){
    return(
        <View>
            <MyHeader myTitle="Add Phone" navigation={navigation}/>
            <Title>Add Phone</Title>
        </View>
    );
}