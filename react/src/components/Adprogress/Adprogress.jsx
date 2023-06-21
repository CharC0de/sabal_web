import React,{useState,useEffect,} from 'react';
import './Adprogress.css';
import logoImage from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../helpers/localStorage/useLocalStorage';
import getLSValue from '../../helpers/localStorage/getLSValue';
import axios from 'axios';
function Adprogress() {
    const pat_no = getLSValue('patNo');
    const dbEvent = getLSValue('dbEvent')
    const [formData, setFormData] = useState({
        patNo: pat_no,
        dbEvent: dbEvent
      });
      const[isLogin,setLogin] = useLocalStorage('isLogin',false)
      const[isCheckup,setCheckup] = useLocalStorage('isCheckup',false)
      const[isAdmit,setAdmit] = useLocalStorage('isAdmit',false)
      const[patStatus,setStatus] = useLocalStorage('status','')
   const navigate = useNavigate()
   const cancel = async ()=>{
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/cancel', formData);
        console.log(response.data)
        handleDashBoard()
      } catch (error) {
        console.error(error);
        // Handle error scenario
      }
}
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
    <div className="adprog">
        <div className="container-adprog">
        <hr className="line-adprog" />
        <div className="logo-adprog">
            <img src={logoImage} alt="Logo" />
        </div>
        <h1 className="title-adprog">Admission in Progress</h1>
        <a href="" className="logout-link-adprog"onClick={handleLogout}>Logout</a>
        <div className="form-container-homer">
          <div className='buttonfield-homer'><button className="reg-button-homer" ><Link to="/admission_details">Checkup Details</Link></button></div>
          <div className='buttonfield-homer'><button className="reg-button-homer" onClick={cancel}>Cancel Admission</button></div>
        </div>
        </div>
    </div>
  );
}

export default Adprogress;
