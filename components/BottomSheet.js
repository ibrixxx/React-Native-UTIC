import React from 'react';
import {DataTable, Switch, Text, Title} from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from "react-native-vector-icons/FontAwesome";
import {Icon as Icon2} from 'react-native-elements'


export default function BottomSheet({myRef, navigateHome, changeTheme, isDark}){
    const [isSwitchOn, setIsSwitchOn] = React.useState(isDark);

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        changeTheme();
    }

    return(
        <RBSheet
            ref={myRef}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
                wrapper: {
                    backgroundColor: "transparent"
                },
                draggableIcon: {
                    backgroundColor: "gray"
                },
                container: {
                    backgroundColor: '#263238',
                    color: 'white',
                    alignItems: 'center',
                }
            }}
        >
            <DataTable style={{paddingTop: '5%'}}>
                <DataTable.Row onPress={navigateHome}>
                    <DataTable.Cell style={{flex: 0.1}}><Icon name={'home'} color={'whitesmoke'} size={20}/></DataTable.Cell>
                    <DataTable.Cell style={{flex: 0.85}}><Title style={{color: 'whitesmoke'}}>Početna</Title></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell style={{flex: 0.1}}><Icon name={'graduation-cap'} color={'whitesmoke'} size={20}/></DataTable.Cell>
                    <DataTable.Cell style={{flex: 0.5}} numeric><Text style={{color: '#2C8BD3'}}>Diplomirani student</Text></DataTable.Cell>
                    <DataTable.Cell style={{flex: 0.4}} numeric><Text style={{color: 'lightgray'}}>Normalni student</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell style={{flex: 0.1}}><Icon2 name={'opacity'} color={'whitesmoke'}/></DataTable.Cell>
                    <DataTable.Cell style={{flex: 0.4}}><Title style={{color: 'whitesmoke'}}>Tamna tema</Title></DataTable.Cell>
                    <DataTable.Cell style={{flex: 0.15, paddingTop: '1%'}}><Switch value={isSwitchOn} onValueChange={onToggleSwitch}/></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell style={{flex: 0.1}}><Icon2 name={'logout'} color={'whitesmoke'}/></DataTable.Cell>
                    <DataTable.Cell style={{flex: 0.9}}><Title style={{color: 'whitesmoke'}}>Odjavi se</Title></DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </RBSheet>
    );
}