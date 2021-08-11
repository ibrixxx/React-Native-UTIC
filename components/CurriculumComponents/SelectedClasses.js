import React, {useEffect} from "react";
import axios from "axios";
import {TOKEN} from "../../App";
import {
    ActivityIndicator,
    Button,
    DataTable,
    Checkbox,
    FAB,
    Portal,
    Provider,
    Snackbar,
    Text
} from "react-native-paper";
import {RefreshControl, ScrollView, StyleSheet, View, CheckBox} from "react-native";
import CourseModal2 from "../Modals/CourseModal2";
import Icon from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from "react-native-bouncy-checkbox";



export default function SelectedClasses({selected, getSelected}) {
    const [isReady, setIsReady] = React.useState(false);
    const [addVisible, setAddVisible] = React.useState((selected.length > 0)? false : true);
    const [notSelected, setNotSelected] = React.useState([]);
    const [checked, setChecked] = React.useState([]);
    const [visible, setVisible] = React.useState(false)
    const [visible2, setVisible2] = React.useState(false)
    const [visible3, setVisible3] = React.useState(false)
    const [curr, setCurr] = React.useState(null)
    const [curr2, setCurr2] = React.useState(null)
    const [refreshing, setRefreshing] = React.useState(false);
    const [refreshing2, setRefreshing2] = React.useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getSelected();
        setRefreshing(false);
    }, []);


    const onRefresh2 = React.useCallback(() => {
        setRefreshing2(true);
        getNotSelected();
    }, []);


    const onToggleSnackBar = () => setVisible3(true);

    const onDismissSnackBar = () => setVisible3(false);

    const showModal = (i) => {setVisible(true); setCurr(i)}
    const showModal2 = (i) => {setVisible2(true); setCurr2(i)}
    const hideModal = () => setVisible(false)
    const hideModal2 = () => setVisible2(false)

    useEffect(() => {
        getNotSelected()
    }, [])


    const getNotSelected = () => {
        axios.get('http://192.168.44.79:8080/u/0/students/courses/optional'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setNotSelected(response.data)
                setIsReady(true)
                setRefreshing2(false);
            })
            .catch(function (error) {
                console.log('error: ',error);
                setRefreshing2(false);
            })
    }

    const onSubmitOptional = () => {
        const ids = checked.map(el => notSelected[el].courseImplementationId);
        console.log(checked);
        axios.post('http://192.168.44.79:8080/u/0/students/courses/select-additional', [...ids]
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setChecked([])
                getSelected()
            })
            .catch(function (error) {
                onToggleSnackBar()
                console.log(error);
            });
        setAddVisible(false)
    }


    const checkTheBox = (i) => {
        for(const e of checked)
            if(e === i)
                return true
        return false
    }



    if (!isReady) {
        return <ActivityIndicator style={{marginTop: '50%'}} color={'dodgerblue'} size={'large'}/>
    }


    return (
        <View style={{backgroundColor: '#e0e0e0', height: '100%'}}>
            {!addVisible?
                <>
                <ScrollView style={{backgroundColor: '#e0e0e0'}}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Text style={{color: '#2C8BD3', fontWeight: 'bold', paddingTop: '6%', paddingLeft: '4%', paddingBottom: '3.5%', backgroundColor: '#e0e0e0', fontSize: 18, textAlign: 'center'}}>Odabrani izborni predmeti</Text>
                        <DataTable style={{backgroundColor: 'white'}}>
                            <DataTable.Header style={{backgroundColor: '#f2f2f2'}}>
                                <DataTable.Title style={{ flex: 3}}><Text style={{fontWeight: 'bold'}}>Predmet</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={{fontWeight: 'bold'}}>P+V+S</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={{fontWeight: 'bold'}}>ECTS</Text></DataTable.Title>
                            </DataTable.Header>
                        {
                            selected.map((p, i) => {
                                return(
                                    <DataTable.Row key={'s'+i} onPress={() => {showModal(i)}}>
                                        <DataTable.Cell style={{ flex: 3.5}}>
                                            {p.courseName}
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            {p.exerciseHours}+{p.lectureHours}+{p.seminarHours}
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            {p.ects}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                );
                            })
                        }
                        </DataTable>
                </ScrollView>
                    <FAB
                        style={style.fab}
                        small
                        icon="plus"
                        onPress={() => setAddVisible(true)}
                    />
                </>
                :
                <>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing2}
                            onRefresh={onRefresh2}
                        />
                    }
                >
                    <Text style={{color: '#2C8BD3', fontWeight: 'bold', paddingTop: '6%', paddingLeft: '4%', paddingBottom: '3.5%', backgroundColor: '#e0e0e0', fontSize: 18, textAlign: 'center'}}>Dostupni izborni predmeti</Text>
                        <DataTable style={{backgroundColor: 'white'}}>
                            <DataTable.Header>
                                <DataTable.Title style={{flex: 0.2}}> </DataTable.Title>
                                <DataTable.Title style={{flex: 2}}><Text style={{fontWeight: 'bold'}}>Predmet</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={{fontWeight: 'bold'}}>P+V+S</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={{fontWeight: 'bold'}}>ECTS</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={{fontWeight: 'bold'}}>Označi</Text></DataTable.Title>
                            </DataTable.Header>
                            {
                            notSelected.map((p, i) => {
                                return(
                                    <DataTable.Row key={'d'+i} onPress={() => {showModal2(i)}}>
                                        <DataTable.Cell style={{flex: 0.2}}>
                                            <Icon
                                                name='info'
                                                type='material'
                                                color='#517fa4'
                                                size={14}/>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{flex: 2.3}}>
                                            {p.courseName}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{flex: 1}} numeric>
                                            {p.exerciseHours}+{p.lectureHours}+{p.seminarHours}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{flex: 0.8}} numeric>
                                            {p.ects}
                                        </DataTable.Cell>
                                        <DataTable.Cell key={'kk'+i} numeric>
                                            <BouncyCheckbox
                                                onPress={() => {
                                                    let pom = checked
                                                    if(pom.includes(i)) {
                                                        const index = pom.indexOf(i);
                                                        if (index > -1) {
                                                            pom.splice(index, 1);
                                                        }
                                                    }
                                                    else
                                                        pom.push(i)
                                                    setChecked(pom)
                                                }}
                                                isChecked={checked.includes(i)}
                                                fillColor={'dodgerblue'}
                                                iconStyle={{borderColor: 'black'}}
                                            />
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                );
                            })
                            }
                            <DataTable.Row></DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell></DataTable.Cell>
                                <DataTable.Cell></DataTable.Cell>
                                <DataTable.Cell>
                                    <Button color={'whitesmoke'} style={{backgroundColor: 'dodgerblue'}} onPress={() => onSubmitOptional()}>Potvrdi</Button>
                                </DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                </ScrollView>
                    <FAB
                        style={style.fab2}
                        small
                        icon="close"
                        onPress={() => setAddVisible(false)}
                    />
                </>
            }
            <Provider>
                <Portal>
                    <CourseModal2 index={curr} visible={visible} courses={selected} hideModal={hideModal}/>
                    <CourseModal2 index={curr2} visible={visible2} courses={notSelected} hideModal={hideModal2}/>
                </Portal>
            </Provider>
            <Snackbar
                visible={visible3}
                onDismiss={onDismissSnackBar}
                style={{marginBottom: '25%'}}
                action={{
                    label: 'X',
                    onPress: () => {
                        onDismissSnackBar()
                    },
                }}>
                Došlo je do greške!
            </Snackbar>
        </View>
    );
}


const style = StyleSheet.create({
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
        zIndex: 2
    },
    fab2: {
        width: 55,
        height: 55,
        backgroundColor: 'darkred',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginBottom: 20,
        marginRight: 20,
        bottom: 0,
        right: 0,
        zIndex: 2
    }
});