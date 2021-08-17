import {Modal, Title} from "react-native-paper";
import React from "react";
import {Text} from "react-native";
import style from "../styles/DarkMode";

export default function FAQModal({visible, hideModal, index, questions}) {
    const containerStyle = {backgroundColor: 'white', padding: 20, width: '90%', marginLeft: 'auto', marginRight: 'auto', zIndex: 0}

    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Title style={style.mainTitle}>{questions[index] ? questions[index].question : ""}</Title>

            <Text style={{ padding: 15 }}>{questions[index] ? questions[index].answer : ""}</Text>
        </Modal>
    )
}

