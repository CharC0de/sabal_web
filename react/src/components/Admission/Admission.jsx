import React , { useState,useEffect }from 'react';
import './Admission.css';
import logoImage from '../../images/logo.png';
import getLSValue from '../../helpers/localStorage/getLSValue';
import axios from 'axios';
import { useLocalStorage } from '../../helpers/localStorage/useLocalStorage';
import { useNavigate } from 'react-router-dom';

function Admission() {
    const navigate = useNavigate();
    const pat_no=getLSValue('patNo')
    const [msg,setMsg] = useState('')
    const[isLogin,setLogin] = useLocalStorage('isLogin',false)
    const[isCheckup,setCheckup] = useLocalStorage('isCheckup',false)
    const[isAdmit,setAdmit] = useLocalStorage('isAdmit',false)
    const[patStatus,setStatus] = useLocalStorage('status','')
    const stat = getLSValue('status');
    const [dbEvent, setDbEvent] = useLocalStorage('dbEvent','')
    const[roomNo,setRoomNo] = useState(null)
    const [formData, setFormData] = useState({
        patNo: pat_no,
        roomType: '',
        roomPrice: 0.00,
        advPayment: 0.00,
        modeOfPayment: '',
        dbEvent:dbEvent
      });
      useEffect(() => {


        console.log(dbEvent);
        if (isAdmit) {
            navigate('/admission_progress');
        } else if (stat === 'for admission') {
            setDbEvent('update');
            setFormData(prevData => ({ ...prevData, dbEvent: 'update' }));
        } else if (stat === '') {
            setDbEvent('insert');
            setFormData(prevData => ({ ...prevData, dbEvent: 'insert' }));
        } else if( stat !=='foradmission'){
            navigate('/');
        }
        console.log(formData);
    }, [dbEvent]);
    const handleLogout = () =>{

        setLogin(false)
        setCheckup(false)
        setAdmit(false)
        setStatus('')
        location.reload()
       }


      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

      const handleSubmit = async (event) => {
        console.log(formData)
        event.preventDefault();

        try {
          // Send the formData object to Laravel backend
          const response = await axios.post('http://127.0.0.1:8000/api/admission', formData);

          console.log(response.data); // Assuming Laravel returns a response
          setRoomNo(response.data.roomNo)
          if (response.data.roomNo !== null) {
            setAdmit(true);
            location.reload()
         }
          setMsg(response.data.message)
          console.log(msg)
          // Clear the form after successful submission
          setFormData({
            patNo: pat_no,
            roomType: '',
            roomPrice: 0.00,
            advPayment: 0.00,
            modeOfPayment: '',
            department:'',
            dbEvent:dbEvent
          });
        } catch (error) {
          console.error(error);
          // Handle error scenario
        }
      };
  return (
    <form onSubmit={handleSubmit}>
    <div className="adm">
        <div className="container-ad">
        <hr className="line-ad" />
        <div className="logo-ad">
            <img src={logoImage} alt="Logo" />
        </div>
        <h1 className="greeting-ad">Admission</h1>
        <h1 className="message-ad">If you are in this window you may have chosen to be admitted to the doctor that has recommended you for admission.</h1>
        <a href="" className="logout-link-ad" onClick={handleLogout}>Logout</a>
        <div className="form-container-ad">
            <div className="input-group-ad">
            <label className="input-label-ad">Room Type</label>
                <select className="input-field-ad" name='roomType' defaultValue='' value={formData.roomType} onChange={handleChange} required>
                <option value='' disabled>Choose Room Type</option>
                <option value="G">General</option>
                <option value="P">Private</option>
                </select>
            </div>
            <div className="input-group-ad">
            <label className="input-label-ad">Prefered Room Price</label>
            <input type="text" placeholder="Enter Price" name='roomPrice' value={formData.roomPrice} className="input-field-ad" onChange={handleChange} required/>
            </div>
            <div className="input-group-ad">
            <label className="input-label-ad">Advance Payment (Optional)</label>
            <input type="text" placeholder="Enter Payment" name='advPayment' value={formData.advPayment} className="input-field-ad"  onChange={handleChange}/>
            </div>
            <div className="input-group-ad">
            <label className="input-label-ad">Mode of Payment (Optional)</label>
                <select className="input-field-ad" name='modeOfPayment'  defaultValue='' value={formData.modeOfPayment} onChange={handleChange}>
                <option value='' disabled>Choose Mode of Payment</option>
                <option value="Card">Card</option>
                <option value="Cash">Cash</option>
                </select>
            </div>
            <div className='centerbutton-condit'><button className="submit-button-condit" type="submit" >Submit</button></div>
            <div className='centerbutton-condit'>{msg}</div>
        </div>

        </div>
    </div>
    </form>
  );
}

export default Admission;
