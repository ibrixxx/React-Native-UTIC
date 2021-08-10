import {Modal, Title, Button, Snackbar} from "react-native-paper";
import {Clipboard, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {TOKEN} from "../../App";
import {Picker} from "@react-native-picker/picker";
import {white} from "react-native-paper/src/styles/colors";

export default function AddContactModal({visibleAdd, hideAddModal }) {
    const containerStyle = style.card;
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
            })
            .catch(error => {
                console.error(error);
            });
    }

    function resetFields() {
        setContactValue("")
        setContactTypeValue(1)
        setContactValue("")
        setWarning(false);
    }

    function joined() {
        resetFields();
        hideAddModal();
    }

    return(
        <Modal visible={visibleAdd} onDismiss={joined} contentContainerStyle={containerStyle}>
            <Title style={style.title}>Dodaj kontakt</Title>
            <View style={{
                borderWidth: 1,
                borderColor: "#999999",
                height: 40,
                paddingTop: '3%',
                marginBottom: 10
            }}>
                <Picker
                    selectedValue={contactTypeValue}
                    onValueChange={(itemValue, itemIndex) => setContactTypeValue(itemValue)}>
                    {(contactTypes && contactTypes.length > 0) ? contactTypes.map((type) => (
                        <Picker.Item label={type.name} value={type.id} key={type.id}/>
                    )) : <Picker.Item>Nema</Picker.Item>
                    }
                </Picker>
            </View>

            {
                warning ? <Text style={{ color: 'red' }}>* E-mail nije validan</Text> : null
            }


            <TextInput
                style={{
                    backgroundColor: '#ffffff',
                    height: 40,
                    borderWidth: 1,
                    borderColor: "#999999",
                    padding: 5,
                    marginBottom: 10
                }}
                placeholder="Vrijednost"
                onChangeText={contact => setContactValue(contact)}
                value={contactValue}/>

            <View style={{
                flexDirection: 'row',
                width: '90%',
                justifyContent: 'space-between',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                <Button
                    onPress={() => {
                        resetFields();
                        hideAddModal();
                    }}
                    mode="outlined"
                    style={{borderColor: '#009FFD'}}
                    color={'#009FFD'}>Odustani</Button>
                {
                    (contactValue !== "") ?  <Button
                            onPress={() => {
                                if (contactTypeValue === 1 || contactTypeValue === 6){
                                    if (validate(contactValue)) {
                                        sendContact();
                                    }
                                    else setWarning(true)
                                }
                                else {
                                    sendContact();
                                }
                                resetFields();
                                hideAddModal();
                            }}
                            style={{backgroundColor: '#009FFD'}}
                            color={'white'}>Spremi</Button>
                        :
                        <Button
                            disabled>Spremi</Button>
                }


            </View>

        </Modal>
    )
}

const style = StyleSheet.create({
    card: {
        backgroundColor: white,
        width: '90%',
        padding: 20,
        borderRadius: 15,
        borderTopWidth: 2,
        borderTopColor: 'dodgerblue',
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
})