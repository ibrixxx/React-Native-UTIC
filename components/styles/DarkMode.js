import React from "react";
import {StyleSheet} from "react-native";
import {white} from "react-native-paper/src/styles/colors";

export default StyleSheet.create({
    headerText: {
        fontSize: 22,
        color: 'white',
    },
    everything: {
        height: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 20,
        paddingRight: 20
    },
    container: {
        alignItems: 'center',
        width: '90%',
        backgroundColor: white,
        padding: 15,
        borderRadius: 15,
        borderTopColor: '#2C8BD3',
        borderTopWidth: 2,
        elevation: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15
    },
    titleMain: {
        fontSize: 20,
        textAlign: 'center',
        color: "#263238",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        width: '100%'
    },
    title: {
        textAlign: 'center',
        marginBottom: 10
    },
    dropdownView: {
        borderWidth: 1,
        borderColor: "#888888",
        height: 40,
        paddingTop: '3%',
        marginBottom: 5,
        width: '90%'
    },
    containerSD: {
        width: '100%',
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    TDStyleLeft: {
        fontWeight: 'bold',
        width: '50%',
        textAlignVertical: 'center',
        textAlign: 'right',
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingRight: '4%',
        borderRightWidth: 0.3,
        borderRightColor: "#aaa"
    },
    TDStyleRight: {
        width: '50%',
        textAlignVertical: 'center',
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingLeft: '4%',
    },
    fab: {
        width: 55,
        height: 55,
        backgroundColor: '#263238',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginBottom: 20,
        marginRight: 20,
        bottom: 0,
        right: 0,
        zIndex: 2
    },
    cardAC: {
        backgroundColor: white,
        width: '90%',
        padding: 20,
        borderRadius: 15,
        borderTopWidth: 2,
        borderTopColor: '#2C8BD3',
        elevation: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        marginBottom: 20
    },
    disabledBorder: {
        borderWidth: 1,
        borderColor: "#dddddd",
        height: 40,
        paddingTop: '3%',
        marginBottom: 10

    },
    enabledBorder: {
        borderWidth: 1,
        borderColor: "#888888",
        height: 40,
        paddingTop: '3%',
        marginBottom: 10

    },
    disabled: {
        width: '100%',
        color: "#dddddd"
    },
    enabled: {
        width: '100%',
        color: '#000000'
    },
    card: {
        backgroundColor: white,
        width: '90%',
        padding: 20,
        borderRadius: 15,
        borderTopWidth: 2,
        borderTopColor: '#2C8BD3',
        elevation: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    mainTitle: {
        color: '#2C8BD3',
        marginBottom: '10%',
        textAlign: 'center'
    },
    containerDoc: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    yellowStyle: {
        backgroundColor: '#F6F5DB'
    },
    redStyle: {
        backgroundColor: '#FBE9E9'
    },
    greenStyle: {
        backgroundColor: '#E9FBE4'
    },
    fab2: {
        width: 55,
        height: 55,
        backgroundColor: 'darkred',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginBottom: 20,
        marginRight: 20,
        bottom: 0,
        right: 0,
        zIndex: 2
    }
})