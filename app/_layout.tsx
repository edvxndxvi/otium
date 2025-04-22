import { Tabs } from 'expo-router'
import React from 'react'
import TabBar from '../components/TabBar';

 
export default function Layout() {
 
    return (
        <Tabs screenOptions={{ headerShown: false }} tabBar={props => <TabBar {...props} />}>
            <Tabs.Screen name="index" options={{ title: 'Home', tabBarLabel: () => null}} />
            <Tabs.Screen name="reflections" options={{ title: 'Reflections' }} />
            <Tabs.Screen name="breathing" options={{ title: 'Breathing' }} />
            <Tabs.Screen name="motivation" options={{ title: 'Motivation' }} />
            <Tabs.Screen name="devs" options={{ title: 'Devs' }} />
        </Tabs>
    )
 }