import React from 'react'
import {Button, Text, View} from "react-native";
import token from '../App'
import {Card, DataTable, Title} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";


function getAllCustomers(){
    axios.get(' http://localhost:8080/u/0/committee/types', {
        headers: {
            Accept: 'application/json',
            Authorization: token
        }
    })
        // .then(response => response.json())
        .then(responseJSON => {
            alert('get allCustomers proslo')
            let allCustomers = responseJSON.data.map((e)=> ( {
                    name: e.name,
                    id: e.id
                }
            ))
            this.setState({ allCustomers: allCustomers });
        })
        .catch(error => {
            alert('get allCustomers palo')
            console.error(error);
        });
}

export default function StudentData({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <Title>Podaci o studentu</Title>
                <DataTable>
                    <DataTable.Row>
                        <DataTable.Cell>Ime:</DataTable.Cell>
                        <DataTable.Cell></DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Prezime:</DataTable.Cell>
                        <DataTable.Cell></DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>JMBG:</DataTable.Cell>
                        <DataTable.Cell></DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Datum rođenja:</DataTable.Cell>
                        <DataTable.Cell></DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Index:</DataTable.Cell>
                        <DataTable.Cell></DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>


            <Button
                title="Početna"
                onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

const style = {
    container: {
        backgroundColor: white,

    }
}