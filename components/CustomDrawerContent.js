import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import React from "react";
import {Icon} from "react-native-elements";
import AddPhone from "./StudentDataComponents/AddPhone";


export default function CustomDrawerContent(props) {
    console.log(props)
    const {state, ...rest} = props;
    const newState = {...state};
    newState.routes = newState.routes.filter(item => item.name !== 'AddPhone')
    return (
        <DrawerContentScrollView {...props}>

            <DrawerItemList state = {newState} {...rest} />

        </DrawerContentScrollView>
    );
}
