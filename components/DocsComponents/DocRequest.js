import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, Text, View} from "react-native";
import {ActivityIndicator, DataTable, FAB, Portal, Provider} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../../App";
import AddDocRequestModal from "../Modals/AddDocRequestModal";
import ActiveDocReqModal from "../Modals/ActiveDocReqModal";
import Icon from "react-native-vector-icons/FontAwesome";
import {formatTimestamp} from "../Formats/MyFormats";
import styles from "../styles/DarkMode";

export default function DocRequest({ theme }) {
    const [prevRequests, setPrevRequests] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [visible, setVisible] = useState(false)
    const [curr, setCurr] = useState(null)
    const [docsVisible, setDocsVisible] = useState(false)
    const [showFAB, setShowFAB] = useState(true)
    const[isReady, setIsReady] = useState(false)
    const [refreshing, setRefreshing] = useState(false)


    const showModal = () => {setShowFAB(false); setVisible(true);}
    const hideModal = () => {
        setVisible(false);
        setShowFAB(true);
    }

    const showDocsModal = (i) => {setDocsVisible(true); setCurr(i); setShowFAB(false)}
    const hideDocsModal = () => {setDocsVisible(false); setShowFAB(true); getPrevRequests()}

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
                setPrevRequests(respnse.data);
                setIsReady(true)
                console.log("dokumenti")
                setFiltered(
                    respnse.data.filter((doc) => (doc.documentStatusName === "primljen zahtjev")
                    )
                )

                console.log(filtered);
            })
            .catch(error => {
                console.error(error);
            });
    }
    if (!isReady) {
        return (
            <View style={{ height: '100%', backgroundColor: theme.mainBackground }}>
                <ActivityIndicator style={{marginTop: '50%'}} color={'#2C8BD3'} size={'large'}/>
            </View>
        )
    }


    return (
        <>
            <View style={{height: '100%', backgroundColor: theme.mainBackground}}>
                {
                    showFAB ?  <FAB
                        style={styles.fab}
                        small
                        icon="plus"
                        onPress={() => showModal()}
                    /> : null
                }

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
                        <DataTable.Title><Text style={{ fontWeight: 'bold', color: theme.text }}>Tip dokumenta</Text></DataTable.Title>
                        <DataTable.Title style={{ flex: 0.35 }}><Text style={{ fontWeight: 'bold', color: theme.text }}>Datum</Text></DataTable.Title>
                        <DataTable.Title style={{ flex: 0.1 }}></DataTable.Title>
                    </DataTable.Header>

                    {   (filtered && filtered.length > 0) ? filtered.map((prev, i) =>
                            <DataTable.Row key={prev.id} style={theme.yellowStyle} onPress={() => showDocsModal(i)} >
                                <Text style={{ width: '60%', textAlignVertical: 'center' }}>
                                    {prev.certificateReasonName ? prev.certificateReasonName: prev.documentTypeName}
                                </Text>

                                <Text style={{ width: '30%', textAlign: 'center', textAlignVertical: 'center' }}>{formatTimestamp(prev.date)}</Text>
                                <Text style={{ width: '10%', textAlign: 'center', textAlignVertical: 'center' }}><Icon name="ellipsis-h" size={20} color="#888888" /></Text>

                            </DataTable.Row>
                    ) :
                        <Text
                            style={{ textAlign: 'center', padding: 10, marginTop: 5, color: theme.text }}>Trenutno nemate aktivnih zahtjeva za dokumente.</Text>

                    }


                </DataTable>
                </ScrollView>

                <Provider>
                    <Portal>
                        <AddDocRequestModal visible={visible} hideModal={hideModal} prevRequestsF={getPrevRequests}/>
                        <ActiveDocReqModal visible={docsVisible} hideModal={hideDocsModal} index={curr} docs={prevRequests} />
                    </Portal>
                </Provider>

            </View>
        </>
    )
}
