import React from 'react';
import {StyleSheet, View} from "react-native";
import {Title} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";

export default function DocHistory(){

    return (
        <>
            <View style={styles.container}>
                <Title style={styles.title}>Ranije podneseni zahtjevi za uvjerenja</Title>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#aaa'
    }
});