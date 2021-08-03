import {DataTable, Modal, Title, Button} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {Text, TextInput, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import axios from "axios";
import {TOKEN} from "../../App";


export default function AddContactModal({visibleContacts, hideContactsModal, index, student, war}) {
    const containerStyle = {backgroundColor: 'white', padding: 20, width: '90%', marginLeft: 'auto', marginRight: 'auto', zIndex: 0}
    const [contactValue, setContactValue] = useState("")

    const [warning, setWarning] = useState(false);


    const validate = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

        return expression.test(String(email).toLowerCase())
    }

    const sendContact = () => {
        axios.post('http://192.168.44.79:8080/u/0/students/student/personal-information/change-contact', {
                id: index,
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

    return (
        <Modal visible={visibleContacts} onDismiss={hideContactsModal} contentContainerStyle={containerStyle}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Title style={{ color: 'dodgerblue', fontWeight: 'bold', textAlign: 'center', marginBottom: 10, marginLeft: '30%' }}>Uređivanje</Title>
                <Button color="#434343" onPress={() => hideContactsModal()} labelStyle={{ fontWeight: 'bold' }}>X</Button>
            </View>

            <View>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10, marginLeft: 10 }}>
                    {student ? student.contacts[index] ? student.contacts[index].type : "" : ""}:
                </Text>

                {
                    warning ? <Text style={{ color: 'red' }}>* E-mail nije validan</Text> : null
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



            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                    style={{ backgroundColor: '#E47070' }}
                    color="white"
                    >Obriši</Button>
                <Button
                    style={{ backgroundColor: 'dodgerblue' }}
                    color="white"
                    onPress={() => {
                        if (student.contacts[index].type === "primarni e-mail" || student.contacts[index].type === "e-mail"){
                            if (validate(contactValue)) {
                                sendContact();
                            }
                            else setWarning(true)
                        }
                        else sendContact();
                    }}>Spremi</Button>
            </View>


        </Modal>
    )


}