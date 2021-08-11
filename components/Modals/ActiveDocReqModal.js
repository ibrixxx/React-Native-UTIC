import {Button, DataTable, Modal, Title} from "react-native-paper";
import React from "react";
import {Text, View} from "react-native";
import axios from "axios";
import {TOKEN} from "../../App";
import {formatTimestamp} from "../Formats/MyFormats";


export default function ActiveDocReqModal({visible, hideModal, index, docs}) {
    const containerStyle = {backgroundColor: 'white', padding: 20, paddingTop: 30, paddingBottom: 30, zIndex: 0}


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
            <Title style={{ textAlign: 'center', fontSize: 22 }}>{docs[index] ? docs[index].documentTypeName : ""}</Title>
            {
                docs[index] ?
                    (docs[index].certificateReasonName !== "") ? <Title style={{ textAlign: 'center', fontSize: 18 }}>{docs[index].certificateReasonName}</Title> : null
                    : null
            }
            <DataTable style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{ fontWeight: 'bold' }}>Datum:</Text></DataTable.Cell>
                    <DataTable.Cell>{docs[index] ? formatTimestamp(docs[index].date) : ""}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell><Text style={{ fontWeight: 'bold' }}>Status:</Text></DataTable.Cell>
                    {docs[index] ? <DataTable.Cell>{docs[index].documentStatusName}</DataTable.Cell> : <DataTable.Cell></DataTable.Cell>}
                </DataTable.Row>

            </DataTable>

            <Text
                style={{ marginLeft: '10%', marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>Napomena:</Text>
            <View style={{ width: '85%', padding: 10, marginLeft: 'auto', marginRight: 'auto' }}>
                {docs[index] ?
                    (docs[index].comment !== null) ? <Text>{docs[index].comment}</Text> : <Text> / </Text>
                    : <Text> </Text>}
            </View>

                <Button
                    style={{ backgroundColor: '#E47070', marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }} color='white'
                    onPress={() => cancelRequest()}>Poništi zahtjev</Button>

        </Modal>
    )

}


