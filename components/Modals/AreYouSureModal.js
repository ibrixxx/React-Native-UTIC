import React from "react";
import {Button, DataTable, Modal, Title} from "react-native-paper";


export default function AreYouSureModal({visible, hideModal, text, deleteCourse}) {
    const containerStyle = {backgroundColor: 'white', padding: 20, zIndex: 0}


    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <DataTable style={{borderColor: 'whitesmoke'}}>
                <Title style={{marginBottom: '10%', textAlign: 'center'}}>{text}</Title>
                <DataTable.Row>
                    <DataTable.Cell><Button onPress={() => {hideModal(); deleteCourse()}} mode="contained" color={'#DF3D3D'}>DA</Button></DataTable.Cell>
                    <DataTable.Cell numeric><Button color={'white'} style={{backgroundColor: 'gray'}} onPress={() => hideModal()}>NE</Button></DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </Modal>
    );
}