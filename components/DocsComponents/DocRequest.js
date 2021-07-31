import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {DataTable, FAB, Portal, Provider} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";
import axios from "axios";
import {TOKEN} from "../../App";
import AddDocRequestModal from "../Modals/AddDocRequestModal";

export default function DocRequest() {
    const [prevRequests, setPrevRequests] = useState({});
    const [filtered, setFiltered] = useState({});
    const [visible, setVisible] = React.useState(false)

    const showModal = () => {setVisible(true)}
    const hideModal = () => setVisible(false)

    useEffect(() => {
        getPrevRequests();
        getDocTypes();
        getCertificateReasons();
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


    const getDocTypes = () => {
        axios.get(' http://192.168.44.79:8080/u/0/document-types', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                console.log(respnse.data)
                setDocumentTypes(respnse.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getCertificateReasons = () => {
        axios.get(' http://192.168.44.79:8080/u/0/certificate-reasons', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                console.log(respnse.data)
                setCertificateReasons(respnse.data)
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
                <FAB
                        style={styles.fab}
                        small
                        icon="plus"
                        onPress={() => showModal()}
                />

                <DataTable>
                    <DataTable.Header style={{ width: '100%' }}>
                        <DataTable.Title>Tip dokumenta</DataTable.Title>
                        <DataTable.Title>Datum</DataTable.Title>
                        <DataTable.Title>Napomena</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                    </DataTable.Header>

                    { (filtered && filtered.length > 0) ? filtered.map((prev) => (
                            <DataTable.Row>
                            {   (prev.certificateReasonName === "") ? <DataTable.Cell style={{ flex: 0.5 }}>{prev.documentTypeName}</DataTable.Cell> :
                                <DataTable.Cell style={{ flex: 0.5 }}>{prev.certificateReasonName}</DataTable.Cell>
                            }
                            <DataTable.Cell style={{ flex: 0.3 }}>{getDateFormated(prev.date)}</DataTable.Cell>
                            <DataTable.Cell style={{ flex: 0.22 }}>{prev.documentStatusName}</DataTable.Cell>
                        </DataTable.Row>
                        )

                    ) : <Text>Nema</Text>


                    }


                </DataTable>

                <Provider>
                    <Portal>
                        <AddDocRequestModal visible={visible} hideModal={hideModal}/>
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

});