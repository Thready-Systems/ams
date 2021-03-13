import AsyncStorage from '@react-native-community/async-storage';

const IsLogged = async () =>{
    try{
        const response = await AsyncStorage.getItem('@token_Key');
        return response;
    }catch(err){

    }
}

const Logout = async () =>{
    try{
        await AsyncStorage.clear();
    }catch(err){

    }
}

module.exports = {
    IsLogged, Logout
}