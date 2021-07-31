import {Modal, Title, Button} from "react-native-paper";
import { StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {TOKEN} from "../../App";
import {Picker} from "@react-native-picker/picker";
import {white} from "react-native-paper/src/styles/colors";

export default function AddContactModal({visible, hideModal }) {
    const containerStyle = {backgroundColor: 'white', padding: 20, width: '90%', marginLeft: 'auto', marginRight: 'auto', zIndex: 0}
    const [contactTypes, setContactTypes] = useState({})
    const [contactTypeValue, setContactTypeValue] = useState("")
    const [contactValue, setContactValue] = useState("")


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

    function resetFields() {
        setContactValue("")
        setContactTypeValue("")
        setContactValue("")
        hideModal()
    }

    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
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
                        <Picker.Item label={type.name} value={type.id}/>
                    )) : <Picker.Item>Nema</Picker.Item>
                    }
                </Picker>
            </View>

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
                    }}
                    style={{backgroundColor: '#009FFD'}}
                    color={'white'}>Odustani</Button>
                <Button
                    onPress={() => {
                        resetFields();
                    }}
                    style={{backgroundColor: '#009FFD'}}
                    color={'white'}>Spremi</Button>

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