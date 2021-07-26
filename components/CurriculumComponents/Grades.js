import React, {useEffect} from 'react'
import {DataTable, Banner, Subheading, Caption, Title, IconButton, ActivityIndicator} from "react-native-paper";
import {ScrollView, Text, View} from "react-native";
import axios from "axios";
import {TOKEN} from "../../App";


export default function Grades() {
    const [visible, setVisible] = React.useState(true);
    const [grades, setGrades] = React.useState([]);
    const [ectsSum, setEctsSum] = React.useState(0);
    const [average, setAverage] = React.useState(0);
    const [isReady, setIsReady] = React.useState(false);


    const getDateFormated = (n) => {
        const d = new Date(n);
        return d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
    }


    useEffect(() => {
        axios.get('http://192.168.44.83:8080/u/0/student-exams/all-grades/'
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
                setIsReady(true)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }, [])


    if (!isReady) {
        return <ActivityIndicator color={'dodgerblue'} size={'large'}/>
    }


    return (
        <>
            <DataTable >
                <DataTable.Row >
                    <DataTable.Cell>
                                <Title>Prosjek</Title>
                    </DataTable.Cell>
                    <DataTable.Cell>
                                <Subheading>{average}</Subheading>
                    </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>
                                <Title>ECTS</Title> <Caption>(Σ)</Caption>
                    </DataTable.Cell>
                    <DataTable.Cell>
                                <Subheading>{ectsSum}</Subheading>
                    </DataTable.Cell>
                </DataTable.Row>
            </DataTable>
            <View style={{alignItems: 'center', paddingBottom: '1%'}}>
                <IconButton
                    disabled={visible}
                    icon="menu"
                    color={'#c2a711'}
                    size={14}
                    onPress={() => setVisible(true)}
                />
            </View>

            <Banner
                visible={visible}
                actions={[
                    {
                        label: 'OK',
                        labelStyle: {color: '#c2a711', backgroundColor: 'whitesmoke'},
                        onPress: () => setVisible(false),
                    }
                ]}
                >
                <Subheading>Žutom bojom su označene ocjene koje još uvijek nisu finalizirane. {"\n"}</Subheading>
                <Caption>U slučaju greške, obratite se odgovarajućem profesuru/ici ili studentskoj službi.</Caption>
            </Banner>
            <ScrollView>
                <DataTable >
                    <DataTable.Header style={{width: '100%'}}>
                        <DataTable.Title style={{maxWidth: '100%'}}>Predmet</DataTable.Title>
                        <DataTable.Title style={{maxWidth: '100%'}}>Nastavnik</DataTable.Title>
                        <DataTable.Title style={{maxWidth: '20%'}}>Datum</DataTable.Title>
                        <DataTable.Title style={{maxWidth: '15%'}}>ECTS</DataTable.Title>
                        <DataTable.Title style={{maxWidth: '20%'}}>Ocjena</DataTable.Title>
                    </DataTable.Header>
                    {grades.map((grade, ind) => {
                        return (
                            <DataTable.Row style={{width: '100%'}} key={ind}>
                                <DataTable.Cell style={{maxWidth: '100%'}}><Text style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>{grade.courseName}</Text></DataTable.Cell>
                                <DataTable.Cell style={{maxWidth: '100%'}}><Text style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>{grade.teacher}</Text></DataTable.Cell>
                                <DataTable.Cell style={{maxWidth: '20%'}}><Text style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>{getDateFormated(grade.examDate)}</Text></DataTable.Cell>
                                <DataTable.Cell style={{maxWidth: '15%'}}><Text style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>{grade.ects}</Text></DataTable.Cell>
                                <DataTable.Cell style={{maxWidth: '20%'}}><Text style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>{grade.mark}</Text></DataTable.Cell>
                            </DataTable.Row>
                        );
                    })}
                </DataTable>
            </ScrollView>
        </>
    );
}