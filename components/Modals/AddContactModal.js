import {Button, Modal, Title} from "react-native-paper";
import {Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {TOKEN} from "../../App";
import {Picker} from "@react-native-picker/picker";
import style from "../styles/DarkMode";
import {white} from "react-native-paper/src/styles/colors";

export default function AddContactModal({visibleAdd, hideAddModal, theme }) {
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
    const [contactTypes, setContactTypes] = useState({})
    const [contactTypeValue, setContactTypeValue] = useState(1)
    const [contactValue, setContactValue] = useState("")

    const [warning, setWarning] = useState(false);


    useEffect(() => {
        getContactTypes();
    }, [])

    const getContactTypes = () => {
        axios.get(' http://192.168.44.79:8080/u/0/contact-types', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                console.log(respnse.data)
                setContactTypes(respnse.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const validate = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

        return expression.test(String(email).toLowerCase())
    }

    const sendContact = () => {
        axios.post('http://192.168.44.79:8080/u/0/students/student/personal-information/contact', {
            contactTypeId: contactTypeValue,
            value: contactValue,
        },{ headers:
                    {
                        Accept: 'application/json',
                        Authorization: TOKEN
                    }
            }

        )
            .then(respnse => {
                console.log("Upisan")
                resetFields();
                hideAddModal();
            })
            .catch(error => {
                console.error(error);
            });
    }

    function resetFields() {
        setContactValue("")
        setContactTypeValue(1)
        setWarning(false);
    }

    function joined() {
        resetFields();
        hideAddModal();
    }

    return(
        <Modal visible={visibleAdd} onDismiss={joined} contentContainerStyle={containerStyle}>
            <Title style={{
                textAlign: 'center',
                marginBottom: 10,
                color: theme.text
            }}>Dodavanje novog kontakta</Title>
            <View style={{
                borderWidth: 1,
                borderColor: "#999999",
                height: 40,
                paddingTop: '3%',
                marginBottom: 10
            }}>
                <Picker
                    selectedValue={contactTypeValue}
                    onValueChange={(itemValue, itemIndex) => {setContactTypeValue(itemValue); setWarning(false);}}
                    style={{ backgroundColor: theme.secondaryBackground, color: theme.text }}>

                    {(contactTypes && contactTypes.length > 0) ? contactTypes.map((type) => (
                        <Picker.Item label={type.name} value={type.id} key={type.id} />
                    )) : <Picker.Item label="Nema" value={-1} />
                    }
                </Picker>
            </View>

            {
                warning ? <Text style={{ color: 'red' }}>* E-mail nije validan</Text> : null
            }

            {
                warning ? <TextInput
                    style={{
                        backgroundColor: theme.mainBackground,
                        color: theme.text,
                        height: 40,
                        borderWidth: 1,
                        borderColor: "red",
                        padding: 5,
                        marginBottom: 10
                    }}
                    placeholder="Vrijednost"
                    placeholderTextColor={theme.placeholderColor}
                    onChangeText={contact => setContactValue(contact)}
                    value={contactValue}/> :
                    <TextInput
                        style={{
                            backgroundColor: theme.mainBackground,
                            color: theme.text,
                            height: 40,
                            borderWidth: 1,
                            borderColor: "#999999",
                            padding: 5,
                            marginBottom: 10
                        }}
                        placeholder="Vrijednost"
                        placeholderTextColor={theme.placeholderColor}
                        onChangeText={contact => setContactValue(contact)}
                        value={contactValue}/>
            }


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
                        hideAddModal();
                    }}
                    mode="outlined"
                    style={{borderColor: '#2C8BD3'}}
                    color={'#2C8BD3'}>Odustani</Button>
                {
                    (contactValue !== "") ?  <Button
                            onPress={() => {
                                if (contactTypeValue === 1 || contactTypeValue === 6){
                                    if (validate(contactValue)) {
                                        sendContact();
                                    }
                                    else {
                                        setWarning(true);
                                        setContactValue("");
                                    }
                                }
                                else {
                                    sendContact();
                                }

                            }}
                            style={{backgroundColor: '#2C8BD3'}}
                            color={'white'}>Spremi</Button>
                        :
                        <Button
                            disabled>Spremi</Button>
                }


            </View>

        </Modal>
    )
}