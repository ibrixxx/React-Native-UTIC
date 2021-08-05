import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {DataTable, FAB, Portal, Provider} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";
import axios from "axios";
import {TOKEN} from "../../App";
import AddDocRequestModal from "../Modals/AddDocRequestModal";
import ActiveDocReqModal from "../Modals/ActiveDocReqModal";

export default function DocRequest() {
    const [prevRequests, setPrevRequests] = useState([]);
    const [visible, setVisible] = useState(false)
    const [curr, setCurr] = useState(null)
    const [docsVisible, setDocsVisible] = useState(false)
    const [showFAB, setShowFAB] = useState(true)


    const showModal = () => {setVisible(true);}
    const hideModal = () => setVisible(false)

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
                        <DataTable.Title style={{ flex: 0.75 }}>Tip dokumenta</DataTable.Title>
                        <DataTable.Title style={{ flex: 0.25 }}>Datum</DataTable.Title>
                    </DataTable.Header>

                    {   (prevRequests && prevRequests.length > 0) ? prevRequests.map((prev, i) =>
                        (prev.documentStatusName === "primljen zahtjev" || prev.documentStatusName === "u obradi") ?
                            <DataTable.Row key={prev.id} style={styles.yellowStyle} onPress={() => showDocsModal(i)} >
                                {   (prev.certificateReasonName === "") ? <DataTable.Cell style={{ flex: 0.75 }}>{prev.documentTypeName}</DataTable.Cell> :
                                    <DataTable.Cell style={{ flex: 0.75 }}>{prev.certificateReasonName}</DataTable.Cell>
                                }
                                <DataTable.Cell style={{ flex: 0.25 }}>{getDateFormated(prev.date)}</DataTable.Cell>
                            </DataTable.Row> : null
                    ):<Text>Nema</Text>

                    }


                </DataTable>

                <Provider>
                    <Portal>
                        <AddDocRequestModal visible={visible} hideModal={hideModal}/>
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