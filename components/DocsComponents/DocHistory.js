import React from 'react';
import {StyleSheet, View} from "react-native";
import {Title} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";

export default function DocHistory(){

    return (
        <>
            <View style={styles.container}>
                <Title>Ranije podneseni zahtjevi za uvjerenja</Title>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        width: '90%',
        padding: 15,
        borderRadius: 15,
        elevation: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
    },
    title: {
        textAlign: 'center',
        marginBottom: 10
    }
});