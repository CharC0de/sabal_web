import React,{useEffect}from 'react'
import { useLocalStorage } from '../localStorage/useLocalStorage'
export default function logout() {
    useEffect((
    )=>{
    const[isLogin,setLogin] = useLocalStorage('isLogin',false)
    const[isCheckup,setCheckup] = useLocalStorage('isCheckup',false)
    const[isAdmit,setAdmit] = useLocalStorage('isAdmit',false)
    const[pastStatus,setStatus] = useLocalStorage('isStatus','')
    setLogin(false)
    setCheckup(false)
    setAdmit(false)
    setStatus('')
    location.reload},[])


}
