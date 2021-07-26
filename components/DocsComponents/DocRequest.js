import React, {useState} from 'react';
import {Picker, StyleSheet, TextInput, View} from "react-native";
import {Title} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";

export default function DocRequest(){
    const [selectedValue, setSelectedValue] = React.useState("Odaberi tip dokumenta");

    const docTypes = [{
        label: "Aplikacija na drugi fakultet",
        value: 0
    }, {
        label: "Hospitovanje u školi",
        value: 1
    }, {
        label: "Jednokratna novčana pomoć",
        value: 2
    }, {
        label: "Regulisanje prava na šehidsku penziju",
        value: 3
    }, {
        label: "Regulisanje prava prijave na biro za zapošljavanje",
        value: 4
    }, {
        label: "Regulisanje socijalnog statusa",
        value: 5
    }, {
        label: "Regulisanje alimentacije",
        value: 6
    }, {
        label: "Regulisanje dječijeg dodatka",
        value: 7
    }, {
        label: "Regulisanje donacije",
        value: 8
    }, {
        label: "Regulisanje ferijalne prakse",
        value: 9
    }, {
        label: "Regulisanje penzije za civilne žrtve rata",
        value: 10
    }, {
        label: "Regulisanje prava na boračku penziju",
        value: 11
    }, {
        label: "Regulisanje prava na honorar",
        value: 12
    }, {
        label: "Regulisanje prava na invalidninu",
        value: 13
    }, {
        label: "Regulisanje prava na izdavanje pasoša",
        value: 14
    }, {
        label: "Regulisanje prava na poreske olakšice",
        value: 15
    }, {
        label: "Regulisanje prava na porodičnu penziju",
        value: 16
    }, {
        label: "Regulisanje prava na prevoz",
        value: 17
    }, {
        label: "Regulisanje prava na pristup internetu",
        value: 18
    }, {
        label: "Regulisanje prava na studentski dom",
        value: 19
    }, {
        label: "Regulisanje prava privremenog boravka",
        value: 20
    }, {
        label: "Regulisanje prava za izdavanje studentske kartice",
        value: 21
    }, {
        label: "Regulisanje radne vize",
        value: 22
    }, {
        label: "Regulisanje slobodnih dana za zaposlene studente",
        value: 23
    }, {
        label: "Regulisanje stambenog pitanja",
        value: 24
    }, {
        label: "Regulisanje statusnih pitanja",
        value: 25
    }, {
        label: "Regulisanje stipendije",
        value: 26
    }, {
        label: "Regulisanje studentskog kredita",
        value: 27
    }, {
        label: "Regulisanje subvencije",
        value: 28
    }, {
        label: "Regulisanje turističke vize",
        value: 29
    }, {
        label: "Regulisanje vojne obaveze",
        value: 30
    }, {
        label: "Regulisanje vozačkog ispita",
        value: 31
    }, {
        label: "Regulisanje zdravstvenog osiguranja",
        value: 32
    }, {
        label: "Učlanjenje u studentsku zadrugu",
        value: 33
    }, {
        label: "Uvjerenje o položenim ispitima",
        value: 34
    }];
    return (
        <>
            <View style={styles.container}>
                <Title>Podnošenje zahtjeva</Title>
                <Title>Tip uvjerenja:</Title>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Aplikacija na drugi fakultet" value="0" />
                    <Picker.Item label="Hospitovanje u školi" value="1" />
                    <Picker.Item label="Jednokratna novčana pomoć" value="2" />
                    <Picker.Item label="Regulisanje prava na šehidsku penziju" value="3" />
                    <Picker.Item label="Regulisanje prava prijave na biro za zapošljavanje" value="4" />
                    <Picker.Item label="Regulisanje socijalnog statusa" value="5" />
                    <Picker.Item label="Regulisanje alimentacije" value="6" />
                    <Picker.Item label="Regulisanje dječijeg dodatka" value="7" />
                    <Picker.Item label="Regulisanje donacije" value="8" />
                    <Picker.Item label="Regulisanje ferijalne prakse" value="9" />
                    <Picker.Item label="Regulisanje penzije za civilne žrtve rata" value="10" />
                    <Picker.Item label="Regulisanje prava na boračku penziju" value="11" />
                    <Picker.Item label="Regulisanje prava na honorar" value="12" />
                    <Picker.Item label="Regulisanje prava na invalidninu" value="13" />
                    <Picker.Item label="Regulisanje prava na izdavanje pasoša" value="14" />
                    <Picker.Item label="Regulisanje prava na poreske olakšice" value="15" />
                    <Picker.Item label="Regulisanje prava na porodičnu penziju" value="16" />
                    <Picker.Item label="Regulisanje prava na prevoz" value="17" />
                    <Picker.Item label="Regulisanje prava na pristup internetu" value="18" />
                    <Picker.Item label="Regulisanje prava na studentski dom" value="19" />
                    <Picker.Item label="Regulisanje prava privremenog boravka" value="20" />
                    <Picker.Item label="Regulisanje prava za izdavanje studentske kartice" value="21" />
                    <Picker.Item label="Regulisanje radne vize" value="22" />
                    <Picker.Item label="Regulisanje slobodnih dana za zaposlene studente" value="23" />
                    <Picker.Item label="Regulisanje stambenog pitanja" value="24" />
                    <Picker.Item label="Regulisanje statusnih pitanja" value="25" />
                    <Picker.Item label="Regulisanje stipendije" value="26" />
                    <Picker.Item label="Regulisanje studentskog kredita" value="27" />
                    <Picker.Item label="Regulisanje subvencije" value="28" />
                    <Picker.Item label="Regulisanje turističke vize" value="29" />
                    <Picker.Item label="Regulisanje vojne obaveze" value="30" />
                    <Picker.Item label="Regulisanje vozačkog ispita" value="31" />
                    <Picker.Item label="Regulisanje zdravstvenog osiguranja" value="32" />
                    <Picker.Item label="Učlanjenje u studentsku zadrugu" value="33" />
                    <Picker.Item label="Uvjerenje o položenim ispitima" value="34" />

                </Picker>

                <Title>Napomena:</Title>
                <TextInput
                    multiline
                    numberOfLines={4}
                    placeholder="Komentar/prijedlog"
                    style={{ width: '90%', padding: 10, textAlign: 'left', borderWidth: 1 }}
                />
            </View>

        </>
    )
}

const styles = StyleSheet.create({
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
    }
});