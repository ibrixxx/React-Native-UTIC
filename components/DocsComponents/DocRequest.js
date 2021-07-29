import React, {useEffect, useState} from 'react';
import {TextInput, View, StyleSheet, Button, Text} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {DataTable, FAB, Title} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";
import axios from "axios";
import {TOKEN} from "../../App";

export default function DocRequest() {
    const [prevRequests, setPrevRequests] = useState({});
    const [filtered, setFiltered] = useState({});
    const [documentTypes, setDocumentTypes] = useState({});
    const [certificateReasons, setCertificateReasons] = useState({});
    const [selectedValue, setSelectedValue] = useState(0);
    const [enableTypes, setEnableTypes] = useState(true);
    const [selectedValueType, setSelectedValueType] = useState(0);
    const [showAddCard, setShowAddCard] = useState(false);
    const [scndDropdownStyle, setScndDropdownStyle] = useState(styles.enabled);
    const [scndDropdownView, setScndDropdownView] = useState(styles.enabledBorder);
    const [note, setNote] = useState("");

    useEffect(() => {
        getPrevRequests();
        /*setFiltered(
            prevRequests.filter((prev) => {
                if (prevRequests && prevRequests.length > 0)
                    prevRequests.filter((prev) => {
                        if (prevRequests.documentStatusName === "primljen zahtjev") return prev;
                    })
            })
        )*/

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

    function resetFields() {
        setSelectedValue(6);
        setSelectedValueType("0");
        setEnableTypes(true);
        setScndDropdownStyle(styles.enabled);
        setScndDropdownView(styles.enabledBorder);
        setNote("");
        setShowAddCard(false);
    }

    return (
        <>
            <View style={{height: '100%'}}>
                {
                    !showAddCard ? <FAB
                        style={styles.fab}
                        small
                        icon="plus"
                        onPress={() => setShowAddCard(true)}
                    /> : null
                }

                {
                    showAddCard ? <View style={styles.card}>
                        <Title style={{fontSize: 22, textAlign: 'center', marginBottom: 10}}>Podnošenje zahtjeva</Title>
                        <View style={{
                            borderWidth: 1,
                            borderColor: "#999999",
                            height: 40,
                            paddingTop: '3%',
                            marginBottom: 10
                        }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{width: '100%'}}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedValue(itemValue);
                                    if (itemValue === 7) {
                                        setEnableTypes(false);
                                        setScndDropdownView(styles.disabledBorder);
                                        setScndDropdownStyle(styles.disabled);
                                    }
                                    if (itemValue === 6) {
                                        setEnableTypes(true);
                                        setScndDropdownView(styles.enabledBorder);
                                        setScndDropdownStyle(styles.enabled);
                                    }
                                }}>
                                {(documentTypes && documentTypes.length > 0) ? documentTypes.map((doc) => (
                                    (doc.name === "Statusna potvrda" || doc.name === "Prepis ocjena") ?
                                        <Picker.Item label={doc.name} value={doc.id}/> : null
                                )) : <Text>Nema</Text>
                                }
                            </Picker>
                        </View>

                        <View style={scndDropdownView}>
                            <Picker
                                selectedValue={selectedValueType}
                                style={scndDropdownStyle}
                                onValueChange={(itemValue, itemIndex) => setSelectedValueType(itemValue)}
                                enabled={enableTypes}
                            >
                                {(certificateReasons && certificateReasons.length !== 0) ? certificateReasons.map((cert) =>
                                    <Picker.Item label={cert.name} value={cert.id}/>
                                ) : <Text>Nema</Text>

                                }
                            </Picker>
                        </View>

                        <TextInput
                            multiline
                            numberOfLines={4}
                            placeholder="Napomena"
                            style={{
                                width: '100%',
                                padding: 10,
                                textAlign: 'left',
                                borderWidth: 1,
                                borderColor: "#999999"
                            }}
                            onChangeText={note => setNote(note)}
                            value={note}
                        />

                        <View style={{
                            flexDirection: 'row',
                            width: '90%',
                            justifyContent: 'space-between',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: 10
                        }}>
                            <Button
                                title="Odustani"
                                onPress={() => resetFields()}
                                style={{backgroundColor: 'blue'}}/>
                            <Button title="Spremi"/>
                        </View>
                    </View> : null
                }
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
    }
});