import React from 'react';
import './Register.css';
import logoImage from '../../images/logo.png';
import axios from 'axios';

import { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    gender: 'male',
    address: '',
    phoneNumber: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the formData object to Laravel backend
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      console.log(response.data); // Assuming Laravel returns a response

      // Clear the form after successful submission
      setFormData({
        username: '',
        age: '',
        gender: 'M',
        address: '',
        phoneNumber: ''
      });
    } catch (error) {
      console.error(error);
      // Handle error scenario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className='regbody'>

        <div className="container-r">

        <div className="logo-r">
            <img src={logoImage} alt="Logo" />
        </div>
        <a href="#" className="login-link-r">Login</a>
        <h1 className="title-r">REGISTRATION FORM</h1>
        <div className="form-container-r">
            <div className="input-group-r">
            <label id='username' className="input-label-r">USERNAME</label>
            <input type="text" placeholder="Enter username.." className="input-field-r" name="username"
            value={formData.username}
            onChange={handleChange}/>
            </div>
            <div className="input-group-r">
            <label className="input-label-r">AGE</label>
            <input type="text" placeholder="Enter Age" className="input-field-r" name="age"
            value={formData.age}
            onChange={handleChange}/>
            </div>
            <div className="input-group-r">
            <label className="input-label-r">GENDER</label>
            <select className="input-field-r" name="gender"
            value={formData.gender}
            onChange={handleChange}>

                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>
            </div>
            <div className="input-group-r">
            <label className="input-label-r">ADDRESS</label>
            <input type="text" placeholder="Enter address.." className="input-field-r" name="address"
            value={formData.address}
            onChange={handleChange}/>
            </div>
            <div className="input-group-r">
            <label className="input-label-r">PHONE NUMBER</label>
            <input type="text" placeholder="Enter Phone number.." className="input-field-r" name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}/>
            </div>
        </div>
        <div className='centerbutton-r'><button type="submit" className="reg-button-r">REGISTER</button></div>
        </div>
    </div>
    </form>
  );
}
export default Register;
