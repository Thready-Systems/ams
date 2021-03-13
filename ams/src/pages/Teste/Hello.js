import React,{useState,useEffect} from 'react';

export default function Hello(props){
    const [name,setName] = useState('');

    function sayHello(){
        return `Olá meu amigo ${name}`
    }

    useEffect(()=>{
        setName(props.name);
    },[props.name]);

    return(
        <div>
           {sayHello()}
        </div>
    )
}