import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import {ActivityIndicator, DataTable, Portal, Provider} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../../App";
import DocsModal from "../Modals/DocsModal";
import Icon from 'react-native-vector-icons/FontAwesome';
import {formatTimestamp} from "../Formats/MyFormats";
import styles from "../styles/DarkMode";

export default function DocHistory(){
    const [prevRequests, setPrevRequests] = useState({});
    const [visible, setVisible] = React.useState(false)
    const [curr, setCurr] = React.useState(null)
    const [isReady, setIsReady] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const showModal = (i) => {setVisible(true); setCurr(i)}
    const hideModal = () => setVisible(false)

    useEffect(() => {
        getPrevRequests();
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getPrevRequests();
        setRefreshing(false);
    }, []);

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
        return <ActivityIndicator style={{marginTop: '50%'}} color={'#2C8BD3'} size={'large'}/>
    }

    function getStyle(str){
        if (str === "primljen zahtjev" || str === "u obradi") return styles.yellowStyle
        if (str === "obrađen") return styles.greenStyle
        if (str === "poništen" || str === "odbijen") return styles.redStyle
    }

    return (
        <>
            <View style={styles.containerDoc}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                    {/*<Text style={{ fontWeight: 'bold', backgroundColor: '#e0e0e0', fontSize: 18, textAlign: 'center'}}> </Text>*/}
                    <DataTable>
                        <DataTable.Header style={{ width: '100%' }}>
                            <DataTable.Title><Text style={{ fontWeight: 'bold', color: 'black' }}>Tip dokumenta</Text></DataTable.Title>
                            <DataTable.Title style={{ flex: 0.35 }}><Text style={{ fontWeight: 'bold', color: 'black' }}>Datum</Text></DataTable.Title>
                            <DataTable.Title style={{ flex: 0.1 }}></DataTable.Title>
                        </DataTable.Header>

                        {   (prevRequests && prevRequests.length > 0) ? prevRequests.map((prev, i) =>
                            (prev.documentStatusName !== "primljen zahtjev") ?
                                <DataTable.Row key={prev.id} style={getStyle(prev.documentStatusName)} onPress={() => showModal(i)} >
                                    <Text style={{ width: '60%', textAlignVertical: 'center' }}>{prev.certificateReasonName ? prev.certificateReasonName: prev.documentTypeName}</Text>
                                    <Text style={{ width: '30%', textAlign: 'center', textAlignVertical: 'center' }}>{formatTimestamp(prev.date)}</Text>
                                    <Text style={{ width: '10%', textAlign: 'center', textAlignVertical: 'center' }}><Icon name="ellipsis-h" size={20} color="#888888" /></Text>

                                </DataTable.Row> : null
                        ) :
                            <Text
                                style={{ textAlign: 'center', padding: 10, marginTop: 5, color: '#263238' }}>Trenutno nemate ranije podnesenih zahtjeva.</Text>

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
