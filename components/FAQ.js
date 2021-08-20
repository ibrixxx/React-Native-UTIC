import React, {useEffect, useRef, useState} from 'react'
import {ScrollView, Text, View} from "react-native";
import MyHeader from "./MyHeader";
import {ActivityIndicator, DataTable, List, Portal, Provider, Searchbar, Title} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../App";
import FAQModal from "./Modals/FAQModal";
import {Icon} from "react-native-elements";
import BottomSheet from "./BottomSheet";

export default function FAQ({ navigation, theme, changeTheme, role, isDark}) {

    const [questions, setQuestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [filterMode, setFilterMode] = useState(false);
    const [visible, setVisible] = useState(false)
    const [curr, setCurr] = useState(null)
    const [showSearchbar, setShowSearchBar] = useState(true);
    const [activeList, setActiveList] = React.useState(null);
    const [isReady, setIsReady] = useState(false)
    const refRBSheet = useRef();


    const showModal = (i) => {setVisible(true); setCurr(i); setShowSearchBar(false);}
    const hideModal = () => {setVisible(false); setShowSearchBar(true);}

    useEffect(() => {
        getQuestions();
    }, [])

    const getQuestions = () => {
        axios.get(' http://192.168.44.79:8080/u/0/faq/by-user-type', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                console.log(respnse.data)
                setQuestions(respnse.data)
                setIsReady(true)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const onChangeSearch = query => {
        setFilterMode(true)
        setSearchQuery(query)
        setFilterData(
            questions.filter((ques) => {
                if(ques.question.toLowerCase().includes(query.toLowerCase()))
                    return ques
                else if(ques.question.toLowerCase().includes(query.toLowerCase()))
                    return ques
            })
        )
        if(query === '')
            setFilterMode(false)
    }

    const returnData = () => {
        if(filterMode) {
            return filterData
        }
        return questions
    }

    const handlePress = (ind) => {
        if(activeList === ind)
            setActiveList(null)
        else
            setActiveList(ind)
    }

    return (
        <View style={{zIndex: 1, backgroundColor: theme.mainBackground, height: '100%'}}>
            <MyHeader myTitle="FAQ" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>
            <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={{ backgroundColor: theme.secondaryBackground }}
            />
            <ScrollView>
                <List.Section
                    title="Najčešće postavljena pitanja"
                    titleStyle={{color: '#2C8BD3', fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>
                    {   isReady ?
                        (returnData() && returnData().length > 0) ? returnData().map((ques, i) =>{
                            return(
                                <View key={i}>
                                    <List.Accordion
                                        key={i}
                                        id={i}
                                        title={ques.question}
                                        titleStyle={{fontWeight: 'bold', color: theme.text}}
                                        style={{ backgroundColor: theme.mainBackground }}
                                        theme={{ colors: { primary: '#2C8BD3' }}}
                                        expanded={i === activeList}
                                        onPress={() => handlePress(i)}>

                                        <View style={{ padding: 20, backgroundColor: theme.secondaryBackground}}>
                                            <Text style={{ textAlign: 'justify', color: theme.text }}>{ques.answer}</Text>
                                        </View>

                                    </List.Accordion>
                                </View>
                            )
                        }) : <Title>Nema postavljenih pitanja</Title>
                        : <ActivityIndicator style={{marginTop: '35%'}} color={'#2C8BD3'} size={'large'}/>
                    }
                </List.Section>
            </ScrollView>
            <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')} changeTheme={changeTheme} isDark={isDark}/>
        </View>
    );
}
