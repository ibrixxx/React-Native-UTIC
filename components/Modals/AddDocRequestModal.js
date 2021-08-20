import {Button, Modal, Title} from "react-native-paper";
import {TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {TOKEN} from "../../App";
import {Picker} from "@react-native-picker/picker";
import styles from "../styles/DarkMode";

export default function AddDocRequestModal({visible, hideModal, prevRequestsF, theme }) {
    const containerStyle = {
        backgroundColor: theme.mainBackground,
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
    };
    const [documentTypes, setDocumentTypes] = useState({});
    const [certificateReasons, setCertificateReasons] = useState({});
    const [selectedValue, setSelectedValue] = useState(1);
    const [enableTypes, setEnableTypes] = useState(true);
    const [selectedValueType, setSelectedValueType] = useState(1);
    const [scndDropdownStyle, setScndDropdownStyle] = useState(styles.enabled);
    const [scndDropdownView, setScndDropdownView] = useState(styles.enabledBorder);
    const [scndDDTxt, setScndDDTxt] = useState(theme.text);
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
                comment: note,
                languageId: 1
            },{ headers:
                    {
                        Accept: 'application/json',
                        Authorization: TOKEN
                    }
            }

        )
            .then(respnse => {
                console.log("Upisan")
                prevRequestsF();
            })
            .catch(error => {
                console.error(error);
            });
    }

    function resetFields() {
        setSelectedValue(6);
        setSelectedValueType(1);
        setEnableTypes(true);
        setScndDropdownStyle(styles.enabled);
        setScndDropdownView(styles.enabledBorder);
        setNote("");
        hideModal();
    }

    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Title style={{fontSize: 22, textAlign: 'center', marginBottom: 10, color: theme.text }}>Podnošenje zahtjeva</Title>
                <View style={{
                    borderWidth: 1,
                    borderColor: "#999999",
                    height: 40,
                    paddingTop: '3%',
                    marginBottom: 10
                }}>
                    <Picker
                        selectedValue={selectedValue}
                        style={{width: '100%', color: theme.text}}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedValue(itemValue);
                            if (itemValue === 7) {
                                setSelectedValueType(null)
                                setEnableTypes(false);
                                setScndDropdownView(styles.disabledBorder);
                                setScndDropdownStyle(styles.disabled);
                                setScndDDTxt(theme.disabled)
                            }
                            if (itemValue === 6) {
                                setSelectedValueType(1);
                                setEnableTypes(true);
                                setScndDropdownView(styles.enabledBorder);
                                setScndDropdownStyle(styles.enabled);
                                setScndDDTxt(theme.text)
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
                        style={[scndDropdownStyle, scndDDTxt]}
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
                    placeholderTextColor={theme.placeholderColor}
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
                        mode="outlined"
                        color={'#2C8BD3'}
                        style={{ borderColor: '#2C8BD3' }}>Odustani</Button>
                    <Button
                        onPress={() => {
                            sendRequest();
                            resetFields();
                            hideModal();
                        }}
                        style={{backgroundColor: '#2C8BD3'}}
                        color={'white'}>Pošalji</Button>
                </View>
        </Modal>
    )
}
