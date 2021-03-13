import React,{useState,useEffect} from 'react';
import {ScrollView,SafeAreaView,Text, Button} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import Geolocation from '@react-native-community/geolocation';
import api from '../services/api';

export default function Main({navigation}){
    const [error,setError] = useState('');
    const [position,setPosition] = useState({
        lat : 0,
        lon : 0,
    });

    const postLocation = async () => {
        await api.post('/login/asset',{
            "mac" : "aaa1166",
            "name" : "Bahia",
            "type" : "car_leo",
            "value" : 8,
            "status" : "ok",
            "active" : 1,
            "coord" : 
                {
                    lat : position.lat,
                    lon : position.lon
                }
        });
    }

    const heartBeat = () =>{
        Geolocation.getCurrentPosition(
            position => {
                setError('');
                setPosition({
                    lat : position.coords.latitude,
                    lon : position.coords.longitude
                });
            },
            e => setError(e.message)
        );
        postLocation();
        
    }

    useEffect(()=>{
        BackgroundTimer.setTimeout(()=>{   
            heartBeat();
        },120000);
    })


    return(
        <>
        <SafeAreaView>
            <ScrollView>
                <Text>Dashboard</Text>
                <Button title='Get Location'/>
                    
                <Text>Latitude : {position.lat}</Text>
                <Text>Longitude : {position.lon}</Text>    
                
                
            </ScrollView>
        </SafeAreaView>
        </>
    )
}