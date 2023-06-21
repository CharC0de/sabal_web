import React, { useState } from 'react';
import './Login.css';
import logoImage from '../../images/logo.png';
import axios from 'axios';
import { useLocalStorage } from '../../helpers/localStorage/useLocalStorage';



function Login() {
    const [formData, setFormData] = useState({
        userName: '',
        phoneNumber: ''
    });
    const [isLogin,setIsLogin] = useLocalStorage('isLogin',false)
    const [userName,setUserName] = useLocalStorage('sessionUser','')
    const[errorMsg,setError]= useState('');
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
          console.log(response.data);
          if (response.status === 200 && response.data.message === 'Login successful') {
            setIsLogin(true); // Set the value to true in localStorage
            setError('Login Success');
            const patNo = response.data.pat_no;
            localStorage.setItem('patNo', JSON.stringify(patNo));
            setUserName(formData.userName)
            window.location.reload();
          } else {
            setError('Invalid Credentials');
          }
          // Clear the form after submission
          setFormData({
            userName: '',
            phoneNumber: ''
          });
        } catch (error) {
          console.error(error);
        }
      };
    return (
        <form onSubmit={handleSubmit}>
    <div className="logbody">
        <div className="container-l">
        { }

                { }
        <div className="logo-l">
            <img src={logoImage} alt="Logo" />
        </div>
        <h1 className="title-l">SABAL HOSPITAL</h1>
        <a href="#" className="register-link-l">Register</a>
        <div className="form-container-l">
            <div className="input-group-l">
                <label id='username' className="input-label-l">USERNAME</label>
                <input type="text" placeholder="Enter username.." className="input-field-l" name='userName' value={formData.userName} onChange={handleChange} />
            </div>
            <div className="input-group-l">
                <label id='phone' className="input-label-l">PHONE NUMBER</label>
             <input type="text" placeholder="Enter Phone number.." className="input-field-l" name='phoneNumber' value={formData.phoneNumber} onChange={handleChange}/>
            </div>
        </div>
        <div className='centerbutton-l'><button className="login-button-l">Login</button></div>

        </div>
        <div className='centerbutton-l'>{errorMsg}</div>

    </div>
    </form>
  );
}

export default Login;
