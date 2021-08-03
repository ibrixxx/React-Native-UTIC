import React, {useEffect} from 'react'
import {Clipboard, ScrollView, Text} from "react-native";
import {ActivityIndicator, DataTable, Searchbar, Snackbar} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../../App";


export default function Professors() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filterData, setFilterData] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [filterMode, setFilterMode] = React.useState(false);
    const [visibleSnackbar, setVisibleSnackbar] = React.useState(false);
    const [isReady, setIsReady] = React.useState(false);


    const onToggleSnackBar = () => setVisibleSnackbar(!visibleSnackbar);
    const onDismissSnackBar = () => setVisibleSnackbar(false);


    const returnData = () => {
        if(filterMode) {
            return filterData
        }
        return data
    }

    const copyToClipboard = (email) => {
        Clipboard.setString(email)
        onToggleSnackBar()
    }


    const onChangeSearch = query => {
        setFilterMode(true)
        setSearchQuery(query)
        setFilterData(
            data.filter((person) => {
                if(person.firstName.toLowerCase().includes(query.toLowerCase()))
                    return person
                else if(person.lastName.toLowerCase().includes(query.toLowerCase()))
                    return person
            })
        )
        if(query === '')
            setFilterMode(false)
    }

    useEffect(() => {
        axios.get('http://192.168.44.83:8080/u/0/employees/info-for-students/by-key/professor'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setData(response.data)
                setIsReady(true)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }, [])



    if (!isReady) {
        return <ActivityIndicator style={{marginTop: '50%'}} color={'dodgerblue'} size={'large'}/>
    }


    return (
        <>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{}}
            />
            <ScrollView>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title><Text style={{fontWeight: 'bold'}}>Prezime</Text></DataTable.Title>
                    <DataTable.Title><Text style={{fontWeight: 'bold'}}>Ime</Text></DataTable.Title>
                    <DataTable.Title><Text style={{fontWeight: 'bold'}}>Email</Text></DataTable.Title>
                </DataTable.Header>
                {
                    returnData().map((prof, index) => {
                        return (
                            <DataTable.Row key={index}>
                                <DataTable.Cell style={{flex: 0.4}}>{prof.lastName}</DataTable.Cell>
                                <DataTable.Cell style={{flex: 0.2}}>{prof.firstName}</DataTable.Cell>
                                <DataTable.Cell style={{borderColor: '#dcf3f5', flex: 0.6}} onPress={() => {if(prof.emails.length > 0) copyToClipboard(prof.emails[0].value)}}> <Text style={{color: 'dodgerblue'}}>{(prof.emails.length > 0)? prof.emails[0].value:''}</Text></DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                }
            </DataTable>
            </ScrollView>
            <Snackbar
                visible={visibleSnackbar}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Undo',
                    onPress: () => {
                        Clipboard.setString('')
                    },
                }}>
                Email copied to clipboard
            </Snackbar>
        </>
    );
}