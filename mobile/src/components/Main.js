import React,{useState,useEffect} from 'react';
import {ScrollView,SafeAreaView,Text,View, TextInput, StyleSheet,TouchableOpacity} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import api from '../services/api';

export default function Main({navigation}){
    const deviceID = 'aaa1166';
    const [orderID,setOrderID] = useState([]);
    const [order,setOrder] = useState({});
    const [error,setError] = useState('');
    const [receivedBy,setReceivedBy] = useState('');
    const [position,setPosition] = useState({});

    const postLocation = async (lat,lon) => {
        await api.post('/login/asset',{
            "mac" : "aaa1166",
            "name" : "Bahia",
            "type" : "car_leo",
            "value" : 8,
            "status" : "ok",
            "active" : 1,
            "coord" : 
                {
                    lat,
                    lon
                }
        });
    }

    // const heartBeat = () =>{
    //     Geolocation.getCurrentPosition(
    //         position => {
    //             setError('');
    //             setPosition({
    //                 lat : position.coords.latitude,
    //                 lon : position.coords.longitude
    //             });
    //         },
    //         e => setError(e.message)
    //     );
    //     postLocation();
        
    // }

    var heartBeat = function (options) {
        return new Promise(function (resolve, reject) {
          Geolocation.getCurrentPosition(resolve, reject, options);
        });
    }


    useEffect(()=>{
        BackgroundTimer.setTimeout(()=>{   
            heartBeat().then((position) => {
                setPosition({
                    lat : position.coords.latitude,
                    lon : position.coords.longitude
                });
                postLocation(position.coords.latitude,position.coords.longitude);
                console.log(position.coords.latitude,position.coords.longitude)       
            }).catch((err) => {
                console.error(err.message);
            });
        },5000);
    });

    const search = async () =>{
        const response = await api.get(`/api/orderid?dv=${deviceID}&ord=${orderID}`);
        const order_ = response.data;
        order_.map(order =>{
            setOrder({
                code : order.code,
                description : order.description,
                contact : order.contact,
                delivered : order.delivered,
                checkin : order.checkin,
                checkout : order.checkout,
                receivedBy : order.receivedBy
            });
        });       
    }

    const updateOrder = async () =>{
        const payload = {
            code : order.code,
            description : order.description,
            contact : order.contact,
            delivered : true,
            checkin : order.checkin,
            checkout : order.checkout,
            receivedBy : receivedBy
        }
        const response = await api.post(`/api/orderid?dv=${deviceID}&ord=${orderID}`,payload);
        setOrder(payload);
    }

    return(
        <>
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <TextInput
                        name='orderID'
                        placeholder='código do produto'
                        style={styles.inputSearch}
                        returnKeyType='search'
                        onSubmitEditing={search}
                        onChangeText={value => setOrderID(value)}
                    />
                 <Icon style={styles.search} name="magnify" color='#3F51B5' size={30} />
                </View>

                {order.code != undefined ? (
                    <View style={styles.orderCard}>
                        <View style={styles.line}>
                            <Text style={styles.cardTitle}>{textLanguage.BR.code}::</Text>
                            <Text>{order.code}</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.cardTitle}>{textLanguage.BR.description}:</Text>
                            <Text>{order.description}</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.cardTitle}>{textLanguage.BR.contact}:</Text>
                            <Text>{order.contact}</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.cardTitle}>{textLanguage.BR.delivered}:</Text>
                            {order.delivered ? (<Icon style={styles.search} name="checkbox-marked-circle" color='green' size={20}/>) : <Text/>}
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.cardTitle}>{textLanguage.BR.checkin}:</Text>
                            <Text>{order.checkin}</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.cardTitle}>{textLanguage.BR.checkout}:</Text>
                            <Text>{order.checkout}</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.cardTitle}>{textLanguage.BR.receivedBy}:</Text>
                            <Text>{order.receivedBy}</Text>
                        </View>
                        <View style={styles.footer}>
                            {order.delivered ?<Text/> : <TextInput
                                name='receivedBy'
                                placeholder={textLanguage.BR.receivedBy}
                                style={styles.inputReceived}
                                onChangeText={value => setReceivedBy(value)}
                            />}
                            <TouchableOpacity 
                                style={order.delivered ? 1 : styles.buttom} 
                                disabled={order.delivered} 
                                onPress={updateOrder}>
                                {order.delivered ? <Text/> : <Text style={styles.input} >{textLanguage.BR.confirmDeliver}</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : <Text/>}
                
            </ScrollView>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    input : {
        color : '#ffffff',
        textTransform : 'uppercase',
    },
    inputReceived : {
        flex : 1,
        height : 50,
        alignItems : 'stretch',
        backgroundColor : '#dddddd',
        borderRadius : 5,
    },
    buttom : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#3F51B5',
        height : 60,
        marginTop : 10,
        borderRadius : 5,
    },
    footer : {
        marginTop : 10,
    },
    line : {
        flexDirection : 'row',
    },
    cardTitle : {
        fontWeight : 'bold',
        marginRight : 5
    },
    orderCard : {
        flex : 1,
        borderWidth : 2,
        borderColor : '#dddddd',
        margin : 10,
        padding : 5,
    },
    container : {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dddddd',
        borderColor: '#000',
        height: 50,
        borderRadius: 5,
        margin: 10,
    },
    inputSearch : {
        flex : 1,
        alignItems : 'stretch',
        width : 300,  
        backgroundColor : '#dddddd',
        borderRadius : 5,
    },
    search : {

    }
});

const textLanguage = {
    BR : {
        'code' : 'Código',
        'description' : 'Descrição',
        'contact' : 'contato',
        'delivered' : 'Entregue',
        'checkin' : 'Checkin',
        'checkout' : 'Checkout',
        'receivedBy' : 'Recebido por',
        'confirmDeliver' : 'Confirmar entrega'
    }
}