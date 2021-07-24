import React from 'react'
import MyHeader from "./MyHeader";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Grades from "./CurriculumComponents/Grades";
//import { Tab, TabView, Text } from 'react-native-elements';

const Tab = createMaterialTopTabNavigator();


export default function Curriculum({ navigation }) {
    const [index, setIndex] = React.useState(0);


    return (
        <>
            <MyHeader myTitle="Studij" navigation={navigation}/>
            <Tab.Navigator tabBarOptions={{
                activeTintColor: 'dodgerblue',
                labelStyle: { fontSize: 11, color: 'white'},
                style: { backgroundColor: '#434343'},
            }}>
                <Tab.Screen name="ZeroTab" component={Grades} options={{ tabBarLabel: 'Ocjene' }}/>
                <Tab.Screen name="FirstTab" component={Grades} options={{ tabBarLabel: 'Nastavni plan i program' }}/>
                <Tab.Screen name="SecondTab" component={Grades} options={{ tabBarLabel: 'Izborni predmeti' }}/>
                <Tab.Screen name="ThirdTab" component={Grades} options={{ tabBarLabel: 'Trenutni semestar' }}/>
            </Tab.Navigator>
        </>
    )
    /*
    return (
        <>
            <MyHeader myTitle="Studij" navigation={navigation}/>
            <Tab value={index} onChange={setIndex}>
                <Tab.Item title="Ocjene"
                          titleStyle={{fontSize: 11, color: 'black'}}
                          containerStyle={{textAlign: 'center', justifyContent: 'center', backgroundColor: 'white'}}
                          buttonStyle={{padding: 0}}/>
                <Tab.Item title="Nastavni plan i program"
                          titleStyle={{fontSize: 11, color: 'black'}}
                          containerStyle={{textAlign: 'center', justifyContent: 'center', backgroundColor: 'white'}}
                          buttonStyle={{padding: 0}}/>
                <Tab.Item title="Izborni predmeti"
                          titleStyle={{fontSize: 11, color: 'black'}}
                          containerStyle={{textAlign: 'center', justifyContent: 'center', backgroundColor: 'white'}}
                          buttonStyle={{padding: 0}}/>
                <Tab.Item title="Trenutni semestar"
                          titleStyle={{fontSize: 11, color: 'black'}}
                          containerStyle={{textAlign: 'center', justifyContent: 'center', backgroundColor: 'white'}}
                          buttonStyle={{padding: 0}}/>
            </Tab>

            <TabView value={index} onChange={setIndex}>
                <TabView.Item style={{width: '100%', height: '100%'}}>
                    <Grades/>
                </TabView.Item>
                <TabView.Item style={{width: '100%', height: '100%'}}>
                    <Grades/>
                </TabView.Item>
                <TabView.Item style={{width: '100%' }}>
                    <Grades/>
                </TabView.Item>
                <TabView.Item style={{width: '100%' }}>
                    <Grades/>
                </TabView.Item>
            </TabView>
        </>
    );
    */
}