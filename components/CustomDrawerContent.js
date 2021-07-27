import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import React from "react";


export default function CustomDrawerContent(props) {
    //console.log(props)
    //const {state, ...rest} = props;
    //const newState = {...state};
    //newState.routes = newState.routes.filter(item => item.name !== 'AddPhone')

    return (
        <DrawerContentScrollView {...props}>

            <DrawerItemList {...props} />

        </DrawerContentScrollView>
    );
}
