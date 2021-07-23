import React, {useState} from 'react'
import {View, ScrollView, StyleSheet, Button, TextInput, Form} from "react-native";
import {Title, Menu, Provider} from "react-native-paper";
import {Dropdown} from "sharingan-rn-modal-dropdown";
import {white} from "react-native-paper/src/styles/colors";
import MyHeader from "./MyHeader";

export default function Docs({ navigation }) {
    const [valueSS, setValueSS] = useState("");

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

    const onChangeSS = (value) => {
        setValueSS(value);
    };

    return (
        <View>
            <MyHeader myTitle="Dokumenti" navigation={navigation}/>
            <View style={styles.everything}>
                <Title>Uvjerenja/potvrde</Title>

                <View style={styles.container}>
                    <Title>Podnošenje zahtjeva</Title>
                    <Title>Tip uvjerenja:</Title>
                    <Dropdown
                        label="Simple dropdown"
                        data={docTypes}
                        value={valueSS}
                        onChange={onChangeSS}
                    />
                    <Title style={{marginTop: 50}}>Napomena:</Title>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        placeholder="Komentar/prijedlog"
                        style={{ width: '90%', padding: 10, textAlign: 'left', borderWidth: 1 }}
                    />
                </View>


                <View style={styles.container}>
                    <Title>Ranije podneseni zahtjevi za uvjerenja</Title>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    everything: {
        height: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 20,
        paddingRight: 20
    },
    container: {
        backgroundColor: white,
        width: '90%',
        padding: 15,
        borderRadius: 15,
        elevation: 8,
        marginBottom: 20
    },
    title: {
        textAlign: 'center',
        marginBottom: 10
    },
    menu: {
        width: '72%'
    },
    menuItem: {
        flexDirection: 'row',
        flexShrink: 1
    }
});
