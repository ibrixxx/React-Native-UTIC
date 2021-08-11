import {DataTable, Modal, Title, Button} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import axios from "axios";
import {TOKEN} from "../../App";
import {white} from "react-native-paper/src/styles/colors";
import Icon from "react-native-vector-icons/FontAwesome";


export default function AddContactModal({visibleContacts, hideContactsModal, index, student}) {
    const containerStyle = style.card;
    const [contactValue, setContactValue] = useState("")

    const [warning, setWarning] = useState(false);


    const validate = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

        return expression.test(String(email).toLowerCase())
    }

    const updateContact = () => {
        axios.put(`http://192.168.44.79:8080/u/0/students/student/personal-information/change-contact`,
            {
                id: student.contacts[index].id,
                value: contactValue,
                optLock: student.contacts[index].optLock
            },
            {
                headers:
                    {
                        Accept: 'application/json',
                        Authorization: TOKEN
                    }
            }
        )
            .then(respnse => {
                console.log("Promijenjen")
                hideContactsModal();
            })
            .catch(error => {
                console.error(error);
            });
    }

    const deleteContact = () => {
        axios.delete(`http://192.168.44.79:8080/u/0/students/student/personal-information/delete-contact/${student.contacts[index].id}`,
            {},
            {
                headers:
                    {
                        Accept: 'application/json',
                        Authorization: TOKEN
                    }
            }
        )
            .then(respnse => {
                console.log("Promijenjen")
                hideContactsModal();
            })
            .catch(error => {
                console.error(error);
            });
    }

    function joined() {
        setWarning(false);
        hideContactsModal();
    }

    return (
        <Modal visible={visibleContacts} onDismiss={joined} contentContainerStyle={containerStyle}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Title style={{
                    color: '#2C8BD3',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 10,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>Izmjena</Title>
            </View>

            <View>
                <Text style={{fontSize: 15, fontWeight: 'bold', marginBottom: 10, marginLeft: 10}}>
                    {student ? student.contacts[index] ? student.contacts[index].type : "" : ""}:
                </Text>

                {
                    warning ? <Text style={{color: '#DF3D3D'}}>* E-mail nije validan</Text> : null
                }

                <TextInput
                    style={{
                        backgroundColor: '#ffffff',
                        height: 40,
                        borderWidth: 1,
                        borderColor: "#999999",
                        padding: 10,
                        marginBottom: 10,
                    }}
                    onChangeText={contact => setContactValue(contact)}
                >{student ? student.contacts[index] ? student.contacts[index].value : "1" : "2"}
                </TextInput>
            </View>


            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button
                    mode='outlined'
                    color="#E47070"
                    style={{
                        borderColor: '#DF3D3D',
                        borderWidth: 2,
                        borderRadius: 30,
                        height: 50,
                        justifyContent: 'center',
                        minWidth: 50
                    }}
                    onPress={() => {
                        deleteContact();
                    }}
                ><Icon name="trash" size={20} color="#DF3D3D"/></Button>
                <Button
                    color="white"
                    style={{
                        backgroundColor: '#2C8BD3',
                        borderRadius: 30,
                        height: 52,
                        justifyContent: 'center',
                        minWidth: 52
                    }}
                    onPress={() => {
                        if (student.contacts[index].type === "primarni e-mail" || student.contacts[index].type === "e-mail") {
                            if (validate(contactValue)) {
                                updateContact();
                            } else setWarning(true)
                        } else updateContact();
                    }}><Icon name="save" size={20}/></Button>
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
        borderTopColor: '#2C8BD3',
        elevation: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
})