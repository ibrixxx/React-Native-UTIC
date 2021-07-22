import React, {useState} from 'react'
import {View, ScrollView, StyleSheet, Button, TextInput, Form} from "react-native";
import {Title, Menu, Provider} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";

export default function Docs({ navigation }) {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState("Tip uvjerenja");

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const handleTip = (str) => {
        setTitle(str);
        closeMenu();
    }

    let docTypes = [{
        "label": "Aplikacija na drugi fakultet",
        "value": 0
    }, {
        "label": "Hospitovanje u školi",
        "value": 1
    }, {
        "label": "Jednokratna novčana pomoć",
        "value": 2
    }, {
        "label": "Regulisanje prava na šehidsku penziju",
        "value": 3
    }, {
        "label": "Regulisanje prava prijave na biro za zapošljavanje",
        "value": 4
    }, {
        "label": "Regulisanje socijalnog statusa",
        "value": 5
    }, {
        "label": "Regulisanje alimentacije",
        "value": 6
    }, {
        "label": "Regulisanje dječijeg dodatka",
        "value": 7
    }, {
        "label": "Regulisanje donacije",
        "value": 8
    }, {
        "label": "Regulisanje ferijalne prakse",
        "value": 9
    }, {
        "label": "Regulisanje penzije za civilne žrtve rata",
        "value": 10
    }, {
        "label": "Regulisanje prava na boračku penziju",
        "value": 11
    }, {
        "label": "Regulisanje prava na honorar",
        "value": 12
    }, {
        "label": "Regulisanje prava na invalidninu",
        "value": 13
    }, {
        "label": "Regulisanje prava na izdavanje pasoša",
        "value": 14
    }, {
        "label": "Regulisanje prava na poreske olakšice",
        "value": 15
    }, {
        "label": "Regulisanje prava na porodičnu penziju",
        "value": 16
    }, {
        "label": "Regulisanje prava na prevoz",
        "value": 17
    }, {
        "label": "Regulisanje prava na pristup internetu",
        "value": 18
    }, {
        "label": "Regulisanje prava na studentski dom",
        "value": 19
    }, {
        "label": "Regulisanje prava privremenog boravka",
        "value": 20
    }, {
        "label": "Regulisanje prava za izdavanje studentske kartice",
        "value": 21
    }, {
        "label": "Regulisanje radne vize",
        "value": 22
    }, {
        "label": "Regulisanje slobodnih dana za zaposlene studente",
        "value": 23
    }, {
        "label": "Regulisanje stambenog pitanja",
        "value": 24
    }, {
        "label": "Regulisanje statusnih pitanja",
        "value": 25
    }, {
        "label": "Regulisanje stipendije",
        "value": 26
    }, {
        "label": "Regulisanje studentskog kredita",
        "value": 27
    }, {
        "label": "Regulisanje subvencije",
        "value": 28
    }, {
        "label": "Regulisanje turističke vize",
        "value": 29
    }, {
        "label": "Regulisanje vojne obaveze",
        "value": 30
    }, {
        "label": "Regulisanje vozačkog ispita",
        "value": 31
    }, {
        "label": "Regulisanje zdravstvenog osiguranja",
        "value": 32
    }, {
        "label": "Učlanjenje u studentsku zadrugu",
        "value": 33
    }, {
        "label": "Uvjerenje o položenim ispitima",
        "value": 34
    }];

    return (
        <Provider>
            <View style={styles.everything}>
                <Title>Uvjerenja/potvrde</Title>

                <View style={styles.container}>
                    <Title>Podnošenje zahtjeva</Title>
                    <Title>Tip uvjerenja:</Title>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        style={styles.menu}
                        anchor={<Button style={{ whiteSpace: 'normal' }} onPress={openMenu} title={title}>{title}</Button>}
                    >
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Aplikacija na drugi fakultet")}} title="Aplikacija na drugi fakultet" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Hospitovanje u školi")}} title="Hospitovanje u školi" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Jednokratna novčana pomoć")}} title="Jednokratna novčana pomoć" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje prava na šehidsku penziju")}} title="Regulisanje prava na šehidsku penziju" />
                        <Menu.Item contentStyle={styles.menuItem}onPress={() => {handleTip("Regulisanje prava prijave na biro za zapošljavanje")}} title="Regulisanje prava prijave na biro za zapošljavanje" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje socijalnog statusa")}} title="Regulisanje socijalnog statusa" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje alimentacije")}} title="Regulisanje alimentacije" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje dječijeg dodatka")}} title="Regulisanje dječijeg dodatka" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje donacije")}} title="Regulisanje donacije" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje ferijalne prakse")}} title="Regulisanje ferijalne prakse" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje penzije za civilne žrtve rata")}} title="Regulisanje penzije za civilne žrtve rata" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje prava na boračku penziju")}} title="Regulisanje prava na boračku penziju" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje prava na honorar")}} title="Regulisanje prava na honorar" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje prava na invalidninu")}} title="Regulisanje prava na invalidninu" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje prava na izdavanje pasoša")}} title="Regulisanje prava na izdavanje pasoša" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje prava na poreske olakšice")}} title="Regulisanje prava na poreske olakšice" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje prava na porodičnu penziju")}} title="Regulisanje prava na porodičnu penziju" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje prava na prevoz")}} title="Regulisanje prava na prevoz" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje prava na pristup internetu")}} title="Regulisanje prava na pristup internetu" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje prava na studentski dom")}} title="Regulisanje prava na studentski dom" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje prava privremenog boravka")}} title="Regulisanje prava privremenog boravka" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje prava za izdavanje studentske kartice")}} title="Regulisanje prava za izdavanje studentske kartice" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje radne vize")}} title="Regulisanje radne vize" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje slobodnih dana za zaposlene studente")}} title="Regulisanje slobodnih dana za zaposlene studente" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje stambenog pitanja")}} title="Regulisanje stambenog pitanja" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje statusnih pitanja")}} title="Regulisanje statusnih pitanja" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje stipendije")}} title="Regulisanje stipendije" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje studentskog kredita")}} title="Regulisanje studentskog kredita" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje subvencije")}} title="Regulisanje subvencije" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje turističke vize")}} title="Regulisanje turističke vize" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje vojne obaveze")}} title="Regulisanje vojne obaveze" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje vozačkog ispita")}} title="Regulisanje vozačkog ispita" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Regulisanje zdravstvenog osiguranja")}} title="Regulisanje zdravstvenog osiguranja" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Učlanjenje u studentsku zadrugu")}} title="Učlanjenje u studentsku zadrugu" />
                        <Menu.Item contentStyle={styles.menuItem} onPress={() => {handleTip("Uvjerenje o položenim ispitima")}} title="Uvjerenje o položenim ispitima" />
                    </Menu>
                    <Title>Napomena:</Title>
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
        </Provider>
    );
}

const styles = StyleSheet.create({
    everything: {
        flex: 1,
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
