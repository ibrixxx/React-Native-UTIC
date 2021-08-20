import React, {useEffect} from 'react'
import {
    ActivityIndicator,
    Banner,
    Caption,
    DataTable,
    Portal,
    Provider,
    Subheading,
    Text,
    Title
} from "react-native-paper";
import {RefreshControl, ScrollView, View} from "react-native";
import axios from "axios";
import {TOKEN} from "../../App";
import GradeModal from "../Modals/GradeModal";



export default function Grades({theme}) {
    const [visible, setVisible] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const [grades, setGrades] = React.useState([]);
    const [ectsSum, setEctsSum] = React.useState(0);
    const [average, setAverage] = React.useState(0);
    const [isReady, setIsReady] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [curr, setCurr] = React.useState(null)


    const showModal = (i) => {setVisible(true); setCurr(i); if(grades[i].markStatus===0) setVisible2(true)}
    const hideModal = () => setVisible(false)


    const getAllGrades = (i) => {
        axios.get('http://192.168.44.79:8080/u/0/student-exams/all-grades/'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setGrades(response.data.grades)
                setAverage(response.data.gradeAverage)
                setEctsSum(response.data.ectsTotal)
                if(i === 1)
                    setRefreshing(false)
                else
                    setIsReady(true)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAllGrades(1);
    }, []);


    useEffect(() => {
        getAllGrades(0);
    }, [])


    if (!isReady) {
        return (
            <View style={{ height: '100%', backgroundColor: theme.mainBackground }}>
                <ActivityIndicator style={{marginTop: '50%'}} color={'#2C8BD3'} size={'large'}/>
            </View>
        )
    }


    return (
        <>
            <Banner
                visible={visible2}
                actions={[
                    {
                        label: 'OK',
                        labelStyle: {color: '#c2a711', backgroundColor: theme.secondaryBackground},
                        onPress: () => setVisible2(false),
                    }
                ]}
            >
                <Subheading style={{color: theme.text}}>Žutom bojom su označene ocjene koje još uvijek nisu
                    finalizirane. {"\n"}</Subheading>
                <Caption style={{color: theme.text}}>U slučaju greške, obratite se odgovarajućem profesuru/ici ili
                    studentskoj službi.</Caption>
            </Banner>
            <ScrollView style={{backgroundColor: theme.mainBackground}}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
            >
                <Text style={{color: theme.secondary, fontWeight: 'bold', paddingTop: '6%', paddingLeft: '4%', paddingBottom: '3.5%', backgroundColor: theme.titleBackground, fontSize: 18, textAlign: 'center'}}>Položeni predmeti</Text>
                <DataTable style={{width: '100%'}}>
                    <DataTable.Header style={{backgroundColor: theme.tableHeaderBackground}}>
                        <DataTable.Title><Text style={{fontWeight: 'bold', color: theme.text}}>Predmet</Text></DataTable.Title>
                        <DataTable.Title numeric><Text style={{fontWeight: 'bold', color: theme.text}}>Ocjena</Text></DataTable.Title>
                    </DataTable.Header>
                    {
                        (grades.length > 0)?
                            grades.map((grade, ind) => {
                                return (
                                    <DataTable.Row style={{backgroundColor: grade.markStatus===0? theme.alertGradeRowBackground:theme.secondaryBackground}} key={ind} onPress={() => showModal(ind)}>
                                        <DataTable.Cell style={{flex: 2}}><Text style={{color: theme.text}}>{grade.courseName}</Text></DataTable.Cell>
                                        <DataTable.Cell numeric><Caption style={{color: (grade.markStatus === 1) ? theme.text : theme.gradeNotFinalized}}>{grade.mark}</Caption></DataTable.Cell>
                                    </DataTable.Row>
                                );
                            }) :
                            <Text style={{textAlign: 'center'}}>Nemate upisanih ocjena</Text>
                    }
                </DataTable>
            </ScrollView>
            <Provider>
                <Portal>
                    <GradeModal theme={theme} index={curr} visible={visible} courses={grades} hideModal={hideModal}/>
                </Portal>
            </Provider>
            <DataTable style={{backgroundColor: theme.primary}}>
                <DataTable.Row>
                    <DataTable.Cell>
                        <Title style={{color: 'white'}}> Prosjek</Title>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                        <Title style={{color: 'white'}}>ECTS  </Title>
                    </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>
                        <Subheading style={{color: 'white', fontWeight: 'bold'}}>    {average}</Subheading>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                        <Subheading style={{color: 'white', fontWeight: 'bold'}}>{ectsSum}    </Subheading>
                    </DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </>
    );
}