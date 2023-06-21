import React,{useEffect,useState} from 'react';
import './Checkup-progress.css';
import logoImage from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../helpers/localStorage/useLocalStorage';
import getLSValue from '../../helpers/localStorage/getLSValue';
import axios from 'axios';
function CheckupProg() {
    const pat_no = getLSValue('patNo');
    const doc_no = getLSValue('docNo')
    const paid = getLSValue('isPaid')
    const department = getLSValue('department');
    const [isPaid,setPayment] = useLocalStorage('isPaid',false)
    const[isLogin,setLogin] = useLocalStorage('isLogin',false)
    const[isCheckup,setCheckup] = useLocalStorage('isCheckup',false)
    const[isAdmit,setAdmit] = useLocalStorage('isAdmit',false)
    const[patStatus,setStatus] = useLocalStorage('status','')
    const navigate = useNavigate()

    useEffect(()=>{
        checkStatus()
        if(!isLogin){
            navigate('/login')
        }
        else{
            if(!isCheckup){
                navigate('/')
            }
            else{
                if (patStatus==='regular'){
                    checkPayment()
                    if(paid){
                        setPayment(false)
                        navigate('/checkup_details');
                    }
                }
                else if (patStatus==='for admission'){
                    setDept()
                    navigate('/admission')
                }
                else if (patStatus==='to be operated'){
                    setDoc()
                    navigate('/operation')
                }
            }
        }
    },[isCheckup,patStatus,paid,isPaid,isLogin])
    const handleLogout = () =>{

        setLogin(false)
        setCheckup(false)
        setAdmit(false)
        setStatus('')
        location.reload
       }

    const [formData, setFormData] = useState({
        patNo: pat_no,
        docNo: doc_no,
        deptName:department
      });

    const checkStatus = async () => {
        try {
          // Send the formData object to Laravel backend
          const response = await axios.post('http://127.0.0.1:8000/api/check_status',formData);
          setStatus(response.data.status.status)

        } catch (error) {
          console.error(error);
          // Handle error scenario
        }
      };

      const setDoc = async () => {
        try {
          // Send the formData object to Laravel backend
          const response = await axios.post('http://127.0.0.1:8000/api/set_doctor',formData);
          console.log(response.data);
        } catch (error) {
          console.error(error);

        }
      };

      const setDept = async () => {
        try {
          // Send the formData object to Laravel backend
          const response = await axios.post('http://127.0.0.1:8000/api/set_dept',formData);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }

      };

      const checkPayment = async () => {
        try {
          // Send the formData object to Laravel backend
          const response = await axios.post('http://127.0.0.1:8000/api/check_payment',formData);
          console.log(response.data);
          // Assuming Laravel returns a response
          if (response.data.payment.payment!==null){
            setPayment(true)
            location.reload()
          }
        } catch (error) {
          console.error(error);
          // Handle error scenario
        }

      };

  return (
    <div className="checkprog">
      <div className="container-chkprog">
        <hr className="line-chkprog" />
        <div className="logo-chkprog">
          <img src={logoImage} alt="Logo" />
        </div>
        <h1 className="title-chkprog">Checkup in Progress</h1>
        <a href="" className="logout-link-chkprog" onClick={handleLogout}>Logout</a>
      </div>
    </div>
  );
}

export default CheckupProg;
