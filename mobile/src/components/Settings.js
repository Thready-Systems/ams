import React,{Component} from 'react';
import {View,SafeAreaView,TextInput,StyleSheet} from 'react-native';

export default class Settings extends Component{
    render(){
        return(
            <>
            <SafeAreaView>
                <TextInput
                    style={styles.vehicle}
                    name='vehicle'
                    placeholder='veículo'/>
            </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    vehicle : {
        margin : 10,
        borderRadius : 5,
        height : 50,
        alignItems : 'stretch',
        justifyContent : 'center',
        backgroundColor : '#dddddd'
    }
})