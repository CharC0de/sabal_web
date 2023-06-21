import React, { useState,useEffect } from 'react';
import './Home.css';
import logoImage from '../../images/logo.png';
import { Link,useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../helpers/localStorage/useLocalStorage';
import axios from 'axios';
import getLSValue from '../../helpers/localStorage/getLSValue';


function Home() {
    const pat_no = getLSValue('patNo');
    const [formData, setFormData] = useState({
        patNo: pat_no,
      });
      const[department,setDepartment]= useLocalStorage('department','')
      const[isLogin,setLogin] = useLocalStorage('isLogin',false)
      const[isCheckup,setCheckup] = useLocalStorage('isCheckup',false)
      const[isAdmit,setAdmit] = useLocalStorage('isAdmit',false)
      const[patStatus,setStatus] = useLocalStorage('status','')
   const navigate = useNavigate()
   const resumeSession = async ()=>{
    try {
        // Send the formData object to Laravel backend
        const response = await axios.post('http://127.0.0.1:8000/api/resume_session', formData);
        console.log(response.data); // Assuming Laravel returns a response          // Clear the form after successful submission
        setAdmit(response.data.isAdmit)
        setCheckup(response.data.isCheckUp)
        setStatus(response.data.status)
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
   const [userName, setUserName]= useState ('')
   const getUsername = ()=> {
    const storedValue = localStorage.getItem('sessionUser')
    return JSON.parse(storedValue)
  }


  useEffect(() => {
    setDepartment('')
    const loadedUsername = getUsername();
    setUserName(loadedUsername);
    resumeSession()
    if(isCheckup){
         if(isAdmit){
            navigate('/admission_progress')
        }
        else{
            navigate('/checkup_progress')
        }

    }

    }, [isAdmit,isCheckup]);


  return (
    <div className="homeb">
      <div className="container-homer">
        <div className="logo-homer">
          <img src={logoImage} alt="Logo" />
        </div>
        <div className="navbar-homer">
          <a href="#" className="navbar-link-homer">Checkup</a>
        </div>
        <h1 className="greeting-homer">Hello! {userName}</h1>
        <h1 className="title-homer">Would you like to...</h1>
        <a href="#" className="logout-link-homer" onClick={handleLogout}>Logout</a>
        <div className="form-container-homer">
          <div className='buttonfield-homer'><button className="reg-button-homer" ><Link to="condition">Take a Checkup</Link></button></div>
          <div className='buttonfield-homer'><button className="reg-button-homer"><Link to="admission">Admission</Link></button></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
