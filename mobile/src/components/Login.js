import React,{useState} from 'react';
import {
        ScrollView,
        SafeAreaView,
        Image,StatusBar,
        View,Text,TextInput,
        StyleSheet,TouchableOpacity} from 'react-native';


import AsyncStorage from '@react-native-community/async-storage';
import {IsLogged} from '../services/Authentication';

import {Dimensions } from "react-native";
const Logo = require('../img/logo.png');
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

import api from '../services/api';

export default function Login({navigation}){
const [username,setUser] = useState('');
const [password,setPasswd] = useState('');

async function StoreLogin(token,name,username){
    try{
        await AsyncStorage.setItem('@token_Key',token);
        await AsyncStorage.setItem('@name_Key',name);
        await AsyncStorage.setItem('@username_Key',username);
    }catch(err){

    }
}

async function Login(){
    const response = await api.post('/login/signin',{
        username,
        password
    });
   if(response.data.token){
       StoreLogin(response.data.token,response.data.name,response.data.username);
       navigation.navigate('Dashboard');
       //AsyncStorage.clear();
       //console.log(AsyncStorage.getItem('@name_Key'));
       //IsLogged();
   }
}

  return(
    <>
    <StatusBar barStyle="dark-content"/>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image alt='' source={Logo} style={styles.logo}/>
              <Text>AMS TRACKING</Text>
            </View>
            <TextInput
                autoCapitalize='none'
                placeholder={'email@empresa'} 
                style={styles.textInput}
                onChangeText={setUser}/>
            <TextInput
                secureTextEntry={true}
                autoCapitalize='none'
                placeholder={'senha'} 
                style={styles.textInput}
                onChangeText={setPasswd}/>
            <TouchableOpacity 
                style={styles.button}
                onPress={Login}>
              <Text style={styles.text}>ENTRAR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container : {
    display : 'flex',
    alignItems : 'stretch',
    justifyContent : 'center',
    padding : 10,
    marginTop : screenHeight * 0.15
  },
  textInput : {
    backgroundColor : '#dddddd',
    borderRadius : 5,
    marginTop : 10,
  },
  button : {
    height : 50,
    backgroundColor : '#3F51B5',
    marginTop : 10,
    borderRadius : 5,
    justifyContent : 'center',
    alignItems : 'center'
  },
  text : {
    color : '#fafafa'
  },
  logo : {
    width : 70,
    height : 70, 
  },
  logoContainer : {
    alignItems : 'center',
    marginBottom : 10
  }
})