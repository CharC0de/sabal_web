import React,{useState,useEffect,} from 'react';
import './Admission-details.css'
import logoImage from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../helpers/localStorage/useLocalStorage';
import getLSValue from '../../helpers/localStorage/getLSValue';
import axios from 'axios';
function AdmissionDet() {
    const pat_no = getLSValue('patNo');
    const [formData, setFormData] = useState({
        patNo: pat_no,
        modeOfPayment:''
      });
    const handleChange = (event) =>   {
        const { name, value } = event.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
   const[isLogin,setLogin] = useLocalStorage('isLogin',false)
   const[isCheckup,setCheckup] = useLocalStorage('isCheckup',false)
   const[isAdmit,setAdmit] = useLocalStorage('isAdmit',false)
   const[patStatus,setStatus] = useLocalStorage('status','')
   const navigate = useNavigate()
   const[docName,setDocName] =useState('')
   const[medicine,setMeds] =useState('')
   const[treatGive,setTreatGive] =useState('')
   const[advice,setAdvice] =useState('')
   const[bill,setBill] =useState('')
   const getDetails = async ()=>{
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/discharge_details', formData);
        console.log(response.data)
        setDocName(response.data.docName)
        setMeds(response.data.medicine)
        setAdvice(response.data.advice)
        setTreatGive(response.data.treatmentGiven)
        setBill(response.data.bill)
      } catch (error) {
        console.error(error);
        // Handle error scenario
      }


}


const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the formData object to Laravel backend
      const response = await axios.post('http://127.0.0.1:8000/api/discharge', formData);
      console.log(response.data); // Assuming Laravel returns a response

      setFormData({
        patNo: pat_no,
        modeOfPayment:''
      });
      handleDashBoard()
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
   const handleDashBoard= () =>{
    setCheckup(false)
    setAdmit(false)
    setStatus('')
    location.reload()
   }

  useEffect(() => {
    getDetails()
    if(!isLogin){
        navigate('/login')
    }else{
        if(!isAdmit){
            if(patStatus===''){
                navigate('/')
            }
            else{
                navigate('/admission')
            }
        }
}
}, [isAdmit,isCheckup]);

  return (
    <form onSubmit={handleSubmit}>
    <div className="admdet">
        <div className="container-adet">
        <hr className="line-adet" />
        <div className="logo-adet">
            <img src={logoImage} alt="Logo" />
        </div>
        <h1 className="title-adet">Admission Details</h1>
        <div className="content-container-adet">
            <div className="form-container-adet">
            <div className="input-group-adet">
                <label className="input-label-adet">Doctor: Dr. {docName}</label>
                <label className="input-label-adet">Treatment: {treatGive}</label>
                <label id='rec' className="input-label-adet">Recommendations:</label>
                <label className="input-label-adet">Treatment Advice:</label>
                <div className="treatment-advice-box-adet">{advice}.</div>
                <label className="input-label-adet">Medicines: {medicine}</label>
                <label className="input-label-adet">Total Fees: {bill}</label>
            </div>
            </div>
        </div>
        <a href="" className="logout-link-adet" onClick={handleLogout}>Logout</a>
        <div className="input-group-ad">
            <label className="input-label-ad">Mode of Payment for discharg</label>
                <select className="input-field-ad" name='modeOfPayment'  defaultValue='' value={formData.modeOfPayment} onChange={handleChange} required>
                <option value='' disabled>Choose Mode of Payment</option>
                <option value="Card">Card</option>
                <option value="Cash">Cash</option>
                </select>
            </div>
        <div className="buttons-adet">
            <div className='buttonfield-adet'><button className="back-button-adet"><Link to='admission_progress'>Cancel Discharge</Link></button></div>
            <div className='buttonfield-adet'><button className="back-button-adet" type='submit'>Confirm Discharge</button></div>
        </div>
        </div>
    </div>
    </form>
  );
}

export default AdmissionDet;
