import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {DataTable, FAB, Portal, Provider} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";
import axios from "axios";
import {TOKEN} from "../../App";
import AddDocRequestModal from "../Modals/AddDocRequestModal";
import ActiveDocReqModal from "../Modals/ActiveDocReqModal";
import Icon from "react-native-vector-icons/FontAwesome";

export default function DocRequest() {
    const [prevRequests, setPrevRequests] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [visible, setVisible] = useState(false)
    const [curr, setCurr] = useState(null)
    const [docsVisible, setDocsVisible] = useState(false)
    const [showFAB, setShowFAB] = useState(true)


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

    const getDateFormated = (n) => {
        const d = new Date(n);
        return d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
    }


    return (
        <>
            <View style={{height: '100%'}}>
                {
                    showFAB ?  <FAB
                        style={styles.fab}
                        small
                        icon="plus"
                        onPress={() => showModal()}
                    /> : null
                }


                <DataTable>
                    <DataTable.Header style={{ width: '100%' }}>
                        <DataTable.Title>Tip dokumenta</DataTable.Title>
                        <DataTable.Title style={{ flex: 0.3 }}>Datum</DataTable.Title>
                        <DataTable.Title style={{ flex: 0.1 }}></DataTable.Title>
                    </DataTable.Header>

                    {   (filtered && filtered.length > 0) ? filtered.map((prev, i) =>
                            <DataTable.Row key={prev.id} style={styles.yellowStyle} onPress={() => showDocsModal(i)} >
                                <DataTable.Cell>
                                    {prev.certificateReasonName ? prev.certificateReasonName: prev.documentTypeName}
                                </DataTable.Cell>

                                <DataTable.Cell style={{ flex: 0.3 }}>{getDateFormated(prev.date)}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 0.1 }} numeric><Icon name="ellipsis-h" size={20} color="#888888" /></DataTable.Cell>

                            </DataTable.Row>
                    ) :
                        <Text
                            style={{ textAlign: 'center', padding: 10, marginTop: 5, color: '#434343' }}>Trenutno nemate aktivnih zahtjeva za dokumente.</Text>

                    }


                </DataTable>

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

const styles = StyleSheet.create({
    card: {
        backgroundColor: white,
        width: '90%',
        padding: 20,
        borderRadius: 15,
        elevation: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        marginBottom: 20
    },
    title: {
        textAlign: 'center',
        marginBottom: 10
    },
    fab: {
        width: 55,
        height: 55,
        backgroundColor: '#434343',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginBottom: 20,
        marginRight: 20,
        bottom: 0,
        right: 0,
        zIndex: 1000
    },
    yellowStyle: {
        backgroundColor: '#F4F3A9'
    },
    redStyle: {
        color: '#EDBBBB'
    },
    greenStyle: {
        color: '#C5EDBB'
    }

});