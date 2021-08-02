import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import React from "react";
import {Text, View} from "react-native";


export default function CustomDrawerContent(props) {
    //console.log(props)
    //const {state, ...rest} = props;
    //const newState = {...state};
    //newState.routes = newState.routes.filter(item => item.name !== 'AddPhone')

    return (
        <DrawerContentScrollView {...props}>
            <View
                style={{
                    backgroundColor: '#f50057',
                    height: 140,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style={{ color: 'white', fontSize: 30 }}>
                    Header
                </Text>
            </View>
            <DrawerItemList {...props} />

        </DrawerContentScrollView>
    );
}
