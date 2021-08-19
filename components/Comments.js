import React, {useEffect, useRef, useState} from 'react'
import {Text, TextInput, View} from "react-native";
import {Button, Snackbar, Title} from "react-native-paper";
import MyHeader from "./MyHeader";
import axios from "axios";
import {TOKEN} from "../App";
import {Picker} from "@react-native-picker/picker";
import BottomSheet from "./BottomSheet";
import style from "./styles/DarkMode";

export default function Comments({ navigation, theme, changeTheme, role}) {
    const [selectedValue, setSelectedValue] = useState(1);
    const [mailTypes, setMailTypes] = useState({});
    const [title, setTitle] = useState("");
    const [mail, setMail] = useState("");
    const [text, setText] = useState("");
    const [visibleSnackbar, setVisibleSnackbar] = useState(false);
    const [badMail, setBadMail] = useState(false);
    const refRBSheet = useRef();


    const onToggleSnackBar = () => setVisibleSnackbar(!visibleSnackbar);
    const onDismissSnackBar = () => setVisibleSnackbar(false);

    useEffect(() => {
        getMailTypes();
    }, [])

    const getMailTypes = () => {
        axios.get(' http://192.168.44.79:8080/u/0/mail-types/', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                setMailTypes(respnse.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const validate = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

        return expression.test(String(email).toLowerCase())
    }

    const sendMail = () => {
        axios.post('http://192.168.44.79:8080/u/0/mail/send/', {
                subject: title,
                mailType: {id: selectedValue},
                mailFrom: mail,
                text: text
            },{ headers:
                    {
                        Accept: 'application/json',
                        Authorization: TOKEN
                    }
            }
        )
            .then(respnse => {

            })
            .catch(error => {
                console.error(error);
            });
    }

    function resetFields(){
        setSelectedValue(0);
        setTitle("");
        setBadMail(false);
        setMail("");
        setText("");
    }

    return (
        <View>
            <MyHeader myTitle="Komentari/prijedlozi" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>
            <View style={{height: '85%', alignItems: 'center', justifyContent: 'center'}}>
                <View style={style.container}>
                    <Title style={{ marginBottom: 20 }}>Forma za slanje</Title>

                    <TextInput
                        placeholder="Naslov poruke"
                        style={{ width: '90%', padding: 5, textAlign: 'left', borderWidth: 1, marginBottom: 5, borderColor: "#888888", }}
                        onChangeText={naslov => setTitle(naslov)}
                        value={title}/>

                    <View style={style.dropdownView}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

                        >
                            {(mailTypes && mailTypes.length > 0) ? mailTypes.map((type) =>
                                <Picker.Item label={type.name} value={type.id} key={type.id}/>
                            ) : <Picker.Item label="Nema" value={-1} />

                            }
                        </Picker>
                    </View>
                    {
                        badMail ? <Text style={{ color: '#DF3D3D', alignSelf: 'flex-start', marginLeft: '5%' }}>* E-mail nije validan</Text> : null
                    }

                    {
                        badMail ? <TextInput
                            placeholder="Vaša e-mail adresa"
                            style={{ width: '90%', padding: 5, textAlign: 'left', borderWidth: 1, marginBottom: 5, borderColor: "#DF3D3D", }}
                            onChangeText={email => {
                                setMail(email);
                                setBadMail(false)
                            }}
                            value={mail}/>
                            : <TextInput
                                placeholder="Vaša E-mail adresa"
                                style={{ width: '90%', padding: 5, textAlign: 'left', borderWidth: 1, marginBottom: 5, borderColor: "#888888", }}
                                onChangeText={email => setMail(email)}
                                value={mail}/>
                    }


                    <TextInput
                        multiline
                        numberOfLines={4}
                        placeholder="Tekst poruke"
                        style={{ width: '90%', maxHeight: 90, padding: 10, textAlign: 'left', borderWidth: 1, marginBottom: 5, borderColor: "#888888", }}
                        onChangeText={msgBody => setText(msgBody)}
                        value={text}/>

                    <View style={{ flexDirection: 'row', marginLeft: 'auto', marginTop: 10 }}>
                        {
                            (title !== "" && mail !== "" && text !== "") ?
                                <Button
                                    onPress={() => {
                                        if (validate(mail)) {
                                            sendMail();
                                            onToggleSnackBar();
                                            resetFields()
                                        }
                                        else {setBadMail(true); setMail("");}
                                    }}
                                    style={{backgroundColor: '#2C8BD3', marginRight: '5%'}}
                                    color={'white'}>Pošalji</Button>
                                : <Button disabled>Pošalji</Button>
                        }

                    </View>

                </View>
            </View>
            <Snackbar
                visible={visibleSnackbar}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'X',
                    onDismissSnackBar
                }}>
                E-mail uspješno poslan!
            </Snackbar>
            <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')}/>
        </View>
    );
}
