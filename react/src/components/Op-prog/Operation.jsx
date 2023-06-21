import React, { useState,useEffect } from 'react';
import './Operation.css';
import logoImage from '../../images/logo.png';
import { Link,useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../helpers/localStorage/useLocalStorage';
import axios from 'axios';
import getLSValue from '../../helpers/localStorage/getLSValue';



function Operation() {
    const pat_no = getLSValue('patNo');
    const doc_no = getLSValue('docNo')
    const department = getLSValue('department')
    const[isLogin,setLogin] = useLocalStorage('isLogin',false)
    const[isCheckup,setCheckup] = useLocalStorage('isCheckup',false)
    const[isAdmit,setAdmit] = useLocalStorage('isAdmit',false)
    const[patStatus,setStatus] = useLocalStorage('status','')
    const navigate = useNavigate()
    const [leave,setLeave] = useState('');
    const [formData, setFormData] = useState({
        patNo: pat_no,
        docNo: doc_no,
        deptName:department
      });
    const checkNull = async () => {
        try {
          // Send the formData object to Laravel backend
          const response = await axios.post('http://127.0.0.1:8000/api/check_op',formData);
          setLeave(response.data.toDashboard)
          console.log(response.data.toDashboard)
          if(response.data.toDashboard){
            handleDashboard();
              }
        } catch (error) {
          console.error(error);
          // Handle error scenario
        }
      };
    const handleLogout = () =>{

        setLogin(false)
        setCheckup(false)
        setAdmit(false)
        setStatus('')
        location.reload()
       }
       const handleDashboard = () =>{
        setCheckup(false)
        setStatus('')
        location.reload()
       }
    useEffect(() => {
        checkNull()
        if (!isLogin){
          navigate('/login')
         }
         else{
          if(patStatus!='to be operated'){
              if(isCheckup){
                  navigate('/checkup_progress')
              }
              else{
                  navigate('/')
              }

             }

         }

      }, [])
  return (
    <div className="operator">
      <div className="container-opera">
        <hr className="line-opera" />
        <div className="logo-opera">
          <img src={logoImage} alt="Logo" />
        </div>
        <h1 className="title-opera">Operation in Progress</h1>
        <a href="#" className="logout-link-opera" onClick={handleLogout}>Logout</a>
      </div>
    </div>
  );
}

export default Operation;
