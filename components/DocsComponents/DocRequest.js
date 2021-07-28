import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Button} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {DataTable, FAB, Title} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";

export default function DocRequest(){
    const [selectedValue, setSelectedValue] = useState("");
    const [enableTypes, setEnableTypes] = useState(false);
    const [selectedValueType, setSelectedValueType] = useState("Odaberi tip dokumenta");
    const [showAddCard, setShowAddCard] = useState(false);


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
            <View style={{ height: '100%' }}>
                {
                    !showAddCard ? <FAB
                        style={styles.fab}
                        small
                        icon="plus"
                        onPress={() => setShowAddCard(true)}
                    /> : null
                }

                {
                    showAddCard ?  <View style={styles.card}>
                        <Title style={{ fontSize: 22, textAlign: 'center', marginBottom: 10 }}>Podnošenje zahtjeva</Title>
                        <View style={{ borderWidth: 1, borderColor: "#999999", height: 40, paddingTop: '3%', marginBottom: 10}}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedValue(itemValue);
                                    if (itemValue === "1") setEnableTypes(true);
                                    if (itemValue === "0") setEnableTypes(false);
                                }}>
                                <Picker.Item label="Prvi" value="0"/>
                                <Picker.Item label="Drugi" value="1"/>
                            </Picker>
                        </View>

                        <View style={{ borderWidth: 1, borderColor: "#999999", height: 40, paddingTop: '3%', marginBottom: 10}}>
                            <Picker
                                selectedValue={selectedValueType}
                                style={{ width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValueType(itemValue)}
                                enabled={enableTypes}
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
                        </View>

                        <TextInput
                            multiline
                            numberOfLines={4}
                            placeholder="Napomena"
                            style={{ width: '100%', padding: 10, textAlign: 'left', borderWidth: 1, borderColor: "#999999" }}
                        />

                        <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }}>
                            <Button
                                title="Odustani"
                                onPress={() => setShowAddCard(false)}
                                style={{ backgroundColor: 'blue' }} />
                            <Button title="Spremi" />
                        </View>
                    </View> : null
                }
                <DataTable>
                    <DataTable.Header >
                        <DataTable.Title>1</DataTable.Title>
                        <DataTable.Title>2</DataTable.Title>
                        <DataTable.Title>3</DataTable.Title>

                    </DataTable.Header>


                </DataTable>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: white,
        width: '90%',
        padding: 20,
        borderRadius: 15,
        elevation: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        marginBottom: 20
    },
    title: {
        textAlign: 'center',
        marginBottom: 10
    },
    fab: {
        width: 55,
        height: 55,
        backgroundColor: '#434343',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginBottom: 20,
        marginRight: 20,
        bottom: 0,
        right: 0,
        zIndex: 1000
    },
});