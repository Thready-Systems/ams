import React,{useState,useEffect} from 'react';
import {View,StyleSheet,SafeAreaView,ScrollView,Text,Button} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Drawer,
} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator,DrawerItem,DrawerItemList,DrawerContentScrollView} from '@react-navigation/drawer';

import Main from './src/components/Main';
import Login from './src/components/Login';
import Settings from './src/components/Settings';
import {Logout,IsLogged} from './src/services/Authentication';

const Stack = createStackNavigator();
const DrawerTab = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  const[name,setName] = useState('');
  const[username,setUsername] = useState('');

  async function getData(){
    
  }

  useEffect(()=>{
    const name_ = AsyncStorage.getItem('@name_Key');
    const username_ = AsyncStorage.getItem('@username_Key');
    name_.then(name =>{
      setName(name);
    })
    username_.then(username =>{
      setUsername(username);
    })
  })
  
  return (
    <>
    <DrawerContentScrollView>
        <View style={styles.userInfoSection}>
          <Avatar.Icon size={90} style={styles.avatar}
          icon={({ color, size }) => (
            <Icon name="account-circle" color={color} size={90} />
          )}/>
          <Title style={styles.title}>{name}</Title>
          <Caption style={styles.caption}>{username}</Caption>
        </View>

        <Drawer.Section>
          <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="home" color={color} size={size} />
                )}
                label="Principal"
                onPress={() =>  navigation.navigate('Main')}
          />
          <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="cog" color={color} size={size} />
                )}
                label="Configurações"
                onPress={() =>  navigation.navigate('Settings')}
          />
        </Drawer.Section>
        
        <Drawer.Section>
          <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="logout" color={color} size={size} />
                )}
                label="Sair"
                onPress={() =>  {
                  Logout();
                  navigation.closeDrawer();
                  navigation.push('Login');
                }}
          />
        </Drawer.Section>

    </DrawerContentScrollView>
    </>
  );
}

function MainScreen(){
  return(
  <DrawerTab.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <DrawerTab.Screen name='Main' component={Main} />      
  </DrawerTab.Navigator>
  )
}

function SettingsScreen(){
  return(
  <DrawerTab.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <DrawerTab.Screen name='Settings' component={Settings} />      
  </DrawerTab.Navigator>
  )
}

export default function App() {
  const [token,setToken] = useState();
  useEffect(()=>{
    IsLogged().then(res =>{
      setToken(res);
    })
  })
  return (
  <>
  <NavigationContainer>
    <Stack.Navigator> 
      <Stack.Screen options={{headerShown : false}} name='Login' component={Login}/>
      <Stack.Screen options={{headerShown : false}} name='Dashboard' component={MainScreen}/>
      <Stack.Screen options={{headerShown : false }} name='Settings' component={SettingsScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  </>
  )
}

const styles = StyleSheet.create({
  avatar : {
    backgroundColor : '#ffffff',
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingTop : 10,
    paddingBottom : 30,
  },
  title: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

{/* <Button
      title="Go somewhere"
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.navigate('Login');
      }}
    /> */}