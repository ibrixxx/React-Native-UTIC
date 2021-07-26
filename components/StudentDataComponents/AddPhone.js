import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Picker, StyleSheet} from 'react-native';
import MyHeader from "../MyHeader";
import {DataTable, FAB, Title} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../../App";
import {Icon} from "react-native-elements";
import {white} from "react-native-paper/src/styles/colors";

export default function AddPhone({ navigation }){
    const [contactTypes, setContactTypes] = useState({});
    const [selectedValue, setSelectedValue] = useState("Tip kontakta")

    useEffect(() => {
        getContactTypes();
    }, [])

    const getContactTypes = () => {
        axios.get('http://192.168.44.83:8080/u/0/contact-types', {
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

    return(
        <View style={{ height: '100%' }}>
            <MyHeader myTitle="Dodaj kontakt" navigation={navigation}/>

            <View>
                <FAB
                    style={style.fab1}
                    small
                    icon='plus'
                    onPress={() => navigation.navigate('AddPhone')}
                />
                <FAB
                    style={style.fab2}
                    small
                    icon='delete'
                    onPress={() => navigation.navigate('AddPhone')}
                />
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    {
                        (contactTypes.length > 0)?contactTypes.map((contact) => (
                                <Picker.Item label={contact.name} value={contact.id} key={contact.id}/>
                            ))
                            :<Picker.Item label="Nema" />
                   }
                </Picker>

                <TextInput
                    placeholder="Vrijednost"
                    style={{ width: '90%', padding: 10, textAlign: 'left', borderWidth: 1 }}/>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: white,
        width: '90%',
        padding: 15,
        borderRadius: 15,
        elevation: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50
    },
    title: {
        textAlign: 'center',
        marginBottom: 10
    },
    fab1: {
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
    fab2: {
        width: 55,
        height: 55,
        backgroundColor: '#434343',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginBottom: 20,
        marginLeft: 20,
        bottom: 0,
        left: 0,
        zIndex: 1000
    },
});