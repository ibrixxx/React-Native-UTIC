import {Button, DataTable, Modal, Title} from "react-native-paper";
import React from "react";
import {Text, View} from "react-native";
import axios from "axios";
import {TOKEN} from "../../App";
import {formatTimestamp} from "../Formats/MyFormats";


export default function ActiveDocReqModal({visible, hideModal, index, docs, theme }) {
    const containerStyle = {backgroundColor: theme.mainBackground, padding: 20, paddingTop: 30, paddingBottom: 30, zIndex: 0}


    const cancelRequest = () => {
        axios.put(`http://192.168.44.79:8080/u/0/student-documents/request-cancellation/${docs[index].id}`,
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
                hideModal();
            })
            .catch(error => {
                console.error(error);
            });
    }

    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Title style={{ textAlign: 'center', fontSize: 22, color: theme.text }}>{docs[index] ? docs[index].documentTypeName : ""}</Title>
            {
                docs[index] ?
                    (docs[index].certificateReasonName !== "") ? <Title style={{ textAlign: 'center', fontSize: 18 }}>{docs[index].certificateReasonName}</Title> : null
                    : null
            }
            <DataTable style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{ fontWeight: 'bold', color: theme.text }}>Datum:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{ color: theme.text }}>{docs[index] ? formatTimestamp(docs[index].date) : ""}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell><Text style={{ fontWeight: 'bold', color: theme.text }}>Status:</Text></DataTable.Cell>
                    {docs[index] ? <DataTable.Cell><Text style={{ color: theme.text}}>{docs[index].documentStatusName}</Text></DataTable.Cell> : <DataTable.Cell></DataTable.Cell>}
                </DataTable.Row>

            </DataTable>

            <Text
                style={{ marginLeft: '10%', marginTop: 20, marginBottom: 10, fontWeight: 'bold', color: theme.text }}>Napomena:</Text>
            <View style={{ width: '85%', padding: 10, marginLeft: 'auto', marginRight: 'auto' }}>
                {docs[index] ?
                    (docs[index].comment !== null) ? <Text>{docs[index].comment}</Text> : <Text style={{ color: theme.text }}> / </Text>
                    : <Text> </Text>}
            </View>

                <Button
                    style={{ backgroundColor: '#DF3D3D', marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }} color='white'
                    onPress={() => cancelRequest()}>Poništi zahtjev</Button>

        </Modal>
    )

}


