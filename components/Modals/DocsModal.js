import {DataTable, Modal, Title} from "react-native-paper";
import React from "react";
import {Text, View} from "react-native";
import {Icon} from "react-native-elements";
import {formatTimestamp} from "../Formats/MyFormats";


export default function DocsModal({visible, hideModal, index, docs, theme}) {
    const containerStyle = {backgroundColor: theme.mainBackground, padding: 20, paddingTop: 30, paddingBottom: 30, zIndex: 0}

    function getIcon(str){
        if (str === "primljen zahtjev" || str === "u obradi") return <Icon name="south" color="yellow"/>
        if (str === "obrađen") return <Icon name="check" color="green"/>
        if (str === "poništen" || str === "odbijen") return <Icon name="close" color="red"/>

    }

    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Title style={{ textAlign: 'center', fontSize: 22, color: theme.text }}>{docs[index] ? docs[index].documentTypeName : ""}</Title>
            {
                docs[index] ?
                    (docs[index].certificateReasonName !== "") ? <Title style={{ textAlign: 'center', fontSize: 18, color: theme.text }}>{docs[index].certificateReasonName}</Title> : null
                : null
            }
            <DataTable style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
                <DataTable.Row>
                    <DataTable.Cell><Text style={{ fontWeight: 'bold', color: theme.text }}>Datum:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{ color: theme.text }}>{docs[index] ? formatTimestamp(docs[index].date) : ""}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell><Text style={{ fontWeight: 'bold', color: theme.text }}>Status:</Text></DataTable.Cell>
                    {docs[index] ? <DataTable.Cell><Text style={{ color: theme.text }}>{docs[index].documentStatusName}</Text></DataTable.Cell> : <DataTable.Cell></DataTable.Cell>}
                </DataTable.Row>

            </DataTable>

            <Text
                style={{ marginLeft: '10%', marginTop: 20, marginBottom: 10, fontWeight: 'bold', color: theme.text }}>Napomena:</Text>
            <View style={{ width: '85%', padding: 10, marginLeft: 'auto', marginRight: 'auto' }}>
                {docs[index] ?
                    (docs[index].comment !== null) ? <Text style={{ color: theme.text }}>{docs[index].comment}</Text> : <Text style={{ color: theme.text }}> / </Text>
                : <Text> </Text>}
            </View>
        </Modal>
    )
}