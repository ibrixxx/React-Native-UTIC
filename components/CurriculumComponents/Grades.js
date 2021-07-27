import React, {useEffect} from 'react'
import {
    DataTable,
    Banner,
    Subheading,
    Caption,
    Title,
    IconButton,
    ActivityIndicator,
    Surface,
    List,
} from "react-native-paper";
import {ScrollView, Text, View, StyleSheet} from "react-native";
import axios from "axios";
import {TOKEN} from "../../App";



export default function Grades() {
    const [visible, setVisible] = React.useState(true);
    const [grades, setGrades] = React.useState([]);
    const [ectsSum, setEctsSum] = React.useState(0);
    const [average, setAverage] = React.useState(0);
    const [isReady, setIsReady] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);

    const handlePress = () => setExpanded(!expanded);


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
            <View style={{alignItems: 'center'}}>
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
                <List.Section title="Accordions">
                    {grades.map((grade, ind) => {
                        return (
                            <List.Accordion
                                key={ind}
                                title={grade.courseName}
                                left={props => <Text {...props} style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>{grade.mark}</Text>}
                                expanded={expanded}
                                onPress={handlePress}>
                                <List.Item
                                    title={grade.courseName}
                                    left={props => <Title {...props} style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>Predmet:</Title>}
                                />
                                <List.Item
                                    title={grade.teacher}
                                    left={props => <Title {...props} style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>Nastavnik:</Title>}
                                />
                                <List.Item
                                    title={getDateFormated(grade.examDate)}
                                    left={props => <Title {...props} style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>Datum:</Title>}
                                />
                                <List.Item
                                    title={grade.ects}
                                    left={props => <Title {...props} style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>ECTS:</Title>}
                                />
                                <List.Item
                                    title={grade.mark}
                                    left={props => <Title {...props} style={{fontSize: 11, textAlign: 'center', alignItems: 'center'}}>Ocjena:</Title>}
                                />
                            </List.Accordion>
                                );
                            })}
                </List.Section>
            </ScrollView>
            <DataTable style={{backgroundColor: 'whitesmoke'}}>
                <DataTable.Row >
                    <DataTable.Cell>
                        <Surface style={styles.surface}>
                            <Title>Prosjek</Title>
                            <Subheading>{average}</Subheading>
                        </Surface>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                        <Surface style={styles.surface}>
                            <Title>ECTS <Caption>(Σ)</Caption></Title>
                            <Subheading>{ectsSum}</Subheading>
                        </Surface>
                    </DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </>
    );
}

const styles = StyleSheet.create({
    surface: {
        padding: 8,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        elevation: 4,
        backgroundColor: 'transparent',
    },
});