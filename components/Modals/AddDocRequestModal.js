import {Modal, Title, Button} from "react-native-paper";
import { StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {TOKEN} from "../../App";
import {Picker} from "@react-native-picker/picker";
import {white} from "react-native-paper/src/styles/colors";

export default function AddDocRequestModal({visible, hideModal }) {
    const containerStyle = {backgroundColor: 'white', padding: 20, width: '90%', marginLeft: 'auto', marginRight: 'auto', zIndex: 0}
    const [documentTypes, setDocumentTypes] = useState({});
    const [certificateReasons, setCertificateReasons] = useState({});
    const [selectedValue, setSelectedValue] = useState(0);
    const [enableTypes, setEnableTypes] = useState(true);
    const [selectedValueType, setSelectedValueType] = useState(0);
    const [scndDropdownStyle, setScndDropdownStyle] = useState(styles.enabled);
    const [scndDropdownView, setScndDropdownView] = useState(styles.enabledBorder);
    const [note, setNote] = useState("");


    useEffect(() => {
        getDocTypes();
        getCertificateReasons();
    }, [])

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

    const sendRequest = () => {
        axios.post('http://192.168.44.79:8080/u/0/student-documents/create-request', {
                documentTypeId: selectedValue,
                certificateReasonId: selectedValueType,
                comment: note
            },{ headers:
                    {
                        Accept: 'application/json',
                        Authorization: TOKEN
                    }
            }

        )
            .then(respnse => {
                console.log("Upisan")
            })
            .catch(error => {
                console.error(error);
            });
    }

    function resetFields() {
        setSelectedValue(6);
        setSelectedValueType(0);
        setEnableTypes(true);
        setScndDropdownStyle(styles.enabled);
        setScndDropdownView(styles.enabledBorder);
        setNote("");
        hideModal();
    }

    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
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
                                <Picker.Item label={doc.name} value={doc.id} key={doc.id}/> : null
                        )) : <Picker.Item label="Nema" value={-1} />
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
                        {(certificateReasons && certificateReasons.length > 0) ? certificateReasons.map((cert) =>
                            <Picker.Item label={cert.name} value={cert.id} key={cert.id}/>
                        ) : <Picker.Item label="Nema" value={-1} />

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
                        onPress={() => {
                            resetFields();
                            hideModal();
                        }}
                        style={{backgroundColor: '#009FFD'}}
                        color={'white'}>Odustani</Button>
                    <Button
                        onPress={() => {
                            sendRequest();
                            resetFields();
                            hideModal();
                        }}
                        style={{backgroundColor: '#009FFD'}}
                        color={'white'}>Spremi</Button>
                </View>
        </Modal>
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
    container: {
        width: '100%',
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        textAlign: 'center',
        marginBottom: 10
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
})