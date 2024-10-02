import React, { useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext} from '../Dataprovider/Dataprovider'


const Protectedroute = ({children, msg , redirect}) => {

const navigate = useNavigate()
const[{user},dispatch]= useContext(DataContext)

useEffect(()=>{
    

    if(!user){
        navigate("/auth", {state: {msg, redirect}})  //this will send message and redirect to authenticate page the that page will use redirect to direct to payment page afetr logged in and the msg is going to be displayed on in that page 
    }
},[user])

  return children
}

export default Protectedroute