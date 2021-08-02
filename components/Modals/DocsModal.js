import {DataTable, Modal, Title} from "react-native-paper";
import React from "react";
import {Text, View} from "react-native";
import {Icon} from "react-native-elements";


export default function DocsModal({visible, hideModal, index, docs}) {
    const containerStyle = {backgroundColor: 'white', padding: 20, paddingTop: 30, paddingBottom: 30, zIndex: 0}

    function getIcon(str){
        if (str === "primljen zahtjev" || str === "u obradi") return <Icon name="south" color="yellow"/>
        if (str === "obrađen") return <Icon name="check" color="green"/>
        if (str === "poništen" || str === "odbijen") return <Icon name="close" color="red"/>

    }

    const getDateFormated = (n) => {
        const d = new Date(n);
        return d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
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
                    <DataTable.Cell>Datum:</DataTable.Cell>
                    <DataTable.Cell>{docs[index] ? getDateFormated(docs[index].date) : ""}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Status:</DataTable.Cell>
                    {docs[index] ? <DataTable.Cell>{docs[index].documentStatusName} {getIcon(docs[index].documentStatusName)}</DataTable.Cell> : <DataTable.Cell></DataTable.Cell>}
                </DataTable.Row>

            </DataTable>

            <Text
                style={{ marginLeft: '10%', marginTop: 20, marginBottom: 10 }}>Napomena:</Text>
            <View style={{ width: '85%', padding: 10, borderWidth: 1, borderColor: '#999999', marginLeft: 'auto', marginRight: 'auto' }}>
                {docs[index] ?
                    (docs[index].comment !== null) ? <Text>{docs[index].comment}</Text> : <Text> / </Text>
                : <Text> </Text>}
            </View>
        </Modal>
    )
}