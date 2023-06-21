import React ,{useState,useEffect} from 'react';
import './Checkup-details.css';
import logoImage from '../../images/logo.png';
import axios from 'axios';
import getLSValue from '../../helpers/localStorage/getLSValue';
import { useLocalStorage } from '../../helpers/localStorage/useLocalStorage';
import { useNavigate } from 'react-router-dom';
function CheckupDet() {
    const pat_no = getLSValue('patNo');
    const doc_no = getLSValue('docNo');
    const [formData, setFormData] = useState({
        patNo: pat_no,
        docNo: doc_no
      });
    const [checkupDate,setDate] = useState('')
    const [docName,setDocName] = useState('')
    const [diagnosis,setDiagnosis] = useState('')
    const [treatment,setTreatment] = useState('')
    const [medicine,setMedicine] = useState('')
    const [payment,setPayment] = useState('')
    const[isLogin,setLogin] = useLocalStorage('isLogin',false)
    const[isCheckup,setCheckup] = useLocalStorage('isCheckup',false)
    const[isAdmit,setAdmit] = useLocalStorage('isAdmit',false)
    const[patStatus,setStatus] = useLocalStorage('status','')
    const navigate = useNavigate()

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


    const getDetails = async () => {
        try {
        const response =await axios.post('http://127.0.0.1:8000/api/get_details',formData)
        console.log(response.data);
        setDate(response.data.date);
        setDocName(response.data.docName)
        setTreatment(response.data.treatment)
        setDiagnosis(response.data.diagnosis)
        setMedicine(response.data.medicines)
        setPayment(response.data.payment)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
      getDetails()
      if (!isLogin){
        navigate('/login')
       }
       else{
        if(patStatus!='regular'){
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

    <div className="checkdet">
    <div className="container-chkdt">
      <hr className="line-chkdt" />
      <div className="logo-chkdt">
        <img src={logoImage} alt="Logo" />
      </div>
      <h1 className="greeting-chkdt">Checkup Complete!!</h1>
      <div className="content-container-chkdt">
        <h1 className="title-chkdt">Checkup Details</h1>
        <div className="form-container-chkdt">
          <div className="input-group-chkdt">
            <label className="input-label-chkdt">Date: {checkupDate}</label>
            <label className="input-label-chkdt">Doctor: Dr. {docName}</label>
            <label className="input-label-chkdt">Diagnosis:{diagnosis}</label>
            <label id='rec' className="input-label-chkdt">Recommendations:</label>
            <label className="input-label-chkdt">Treatment: {treatment}</label>
            <label className="input-label-chkdt">Medicines: {medicine}</label>
            <label className="input-label-chkdt">Total Fees: {payment}</label>
          </div>
        </div>
      </div>
      <a href="#" className="logout-link-chkdt" onClick={handleLogout}>Logout</a>
      <div className='buttonfield-chkdt'><button className="back-button-chkdt" onClick={handleDashboard}>Back to Dashboard</button></div>
    </div>
    </div>
  );
}

export default CheckupDet;
