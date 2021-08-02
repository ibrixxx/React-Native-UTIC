import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {DataTable, Title} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";
import {Icon} from "react-native-elements";
import axios from "axios";
import {TOKEN} from "../../App";

export default function DocHistory(){
    const [prevRequests, setPrevRequests] = useState({});
    const [statusStyle, setStatusStyle] = useState(styles.yellowStyle);

    useEffect(() => {
        getPrevRequests();
    }, [])

    const getPrevRequests = () => {
        axios.get(' http://192.168.44.79:8080/u/0/student-documents/requests/bs', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                console.log(respnse.data)
                setPrevRequests(respnse.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getDateFormated = (n) => {
        const d = new Date(n);
        return d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
    }

    function getStyle(str){
        if (str === "primljen zahtjev" || str === "u obradi") return styles.yellowStyle
        if (str === "obrađen") return styles.greenStyle
        if (str === "poništen" || str === "odbijen") return styles.redStyle
    }

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <DataTable>
                        <DataTable.Header style={{ width: '100%' }}>
                            <DataTable.Title style={{ flex: 0.75 }}>Tip dokumenta</DataTable.Title>
                            <DataTable.Title style={{ flex: 0.25 }}>Datum</DataTable.Title>
                        </DataTable.Header>

                        {   (prevRequests && prevRequests.length > 0) ? prevRequests.map((prev) =>
                            (prev.documentStatusName !== "primljen zahtjev") ?
                                <DataTable.Row style={getStyle(prev.documentStatusName)}>
                                    {   (prev.certificateReasonName === "") ? <DataTable.Cell style={{ flex: 0.75 }}>{prev.documentTypeName}</DataTable.Cell> :
                                        <DataTable.Cell style={{ flex: 0.75 }}>{prev.certificateReasonName}</DataTable.Cell>
                                    }
                                    <DataTable.Cell style={{ flex: 0.25 }}>{getDateFormated(prev.date)}</DataTable.Cell>
                                </DataTable.Row> : null
                        ):<Text>Nema</Text>

                        }
                    </DataTable>
                </ScrollView>

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
    },
    yellowStyle: {
        backgroundColor: '#F6F5DB'
    },
    redStyle: {
        backgroundColor: '#FBE9E9'
    },
    greenStyle: {
        backgroundColor: '#E9FBE4'
    }
});