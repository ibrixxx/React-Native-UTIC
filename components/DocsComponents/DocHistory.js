import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {ActivityIndicator, DataTable, Portal, Provider} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../../App";
import DocsModal from "../Modals/DocsModal";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function DocHistory(){
    const [prevRequests, setPrevRequests] = useState({});
    const [visible, setVisible] = React.useState(false)
    const [curr, setCurr] = React.useState(null)
    const[isReady, setIsReady] = useState(false)

    const showModal = (i) => {setVisible(true); setCurr(i)}
    const hideModal = () => setVisible(false)

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
                setIsReady(true)
            })
            .catch(error => {
                console.error(error);
            });
    }
    if (!isReady) {
        return <ActivityIndicator style={{marginTop: '50%'}} color={'dodgerblue'} size={'large'}/>
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
                            <DataTable.Title>Tip dokumenta</DataTable.Title>
                            <DataTable.Title style={{ flex: 0.3 }}>Datum</DataTable.Title>
                            <DataTable.Title style={{ flex: 0.1 }}></DataTable.Title>
                        </DataTable.Header>

                        {   (prevRequests && prevRequests.length > 0) ? prevRequests.map((prev, i) =>
                            (prev.documentStatusName !== "primljen zahtjev") ?
                                <DataTable.Row key={prev.id} style={getStyle(prev.documentStatusName)} onPress={() => showModal(i)} >
                                    <DataTable.Cell>{prev.certificateReasonName ? prev.certificateReasonName: prev.documentTypeName}</DataTable.Cell>
                                    <DataTable.Cell style={{ flex: 0.3 }}>{getDateFormated(prev.date)}</DataTable.Cell>
                                    <DataTable.Cell style={{ flex: 0.1 }} numeric><Icon name="ellipsis-h" size={20} color="#888888" /></DataTable.Cell>

                                </DataTable.Row> : null
                        ) :
                            <Text
                                style={{ textAlign: 'center', padding: 10, marginTop: 5, color: '#434343' }}>Trenutno nemate ranije podnesenih zahtjeva.</Text>

                        }
                    </DataTable>


                </ScrollView>
                <Provider>
                    <Portal>
                        <DocsModal index={curr} visible={visible} docs={prevRequests} hideModal={hideModal}/>
                    </Portal>
                </Provider>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
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