import React from 'react'
import {StyleSheet, TextInput, View} from "react-native";
import {Title} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";

export default function Comments() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={style.container}>
                <Title>Komentari i prijedlozi</Title>
                <TextInput
                    multiline
                    numberOfLines={4}
                    placeholder="Komentar/prijedlog"
                    style={{ width: '90%', height: 100, padding: 10, marginTop: 20, textAlign: 'left', borderWidth: 1 }}/>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '90%',
        height: 200,
        backgroundColor: white,
        padding: 15,
        borderRadius: 15,
        elevation: 8,
        marginBottom: 20
    },
});