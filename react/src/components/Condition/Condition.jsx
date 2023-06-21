import React, { useEffect ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import getLSValue from '../../helpers/localStorage/getLSValue';
import { useLocalStorage } from '../../helpers/localStorage/useLocalStorage';
import './Condition.css';
import logoImage from '../../images/logo.png';
import axios from 'axios';

function Condition() {
    const navigate = useNavigate()
    const[isLogin,setLogin] = useLocalStorage('isLogin',false)
    const[isCheckup,setCheckup] = useLocalStorage('isCheckup',false)
    const[isAdmit,setAdmit] = useLocalStorage('isAdmit',false)
    const[patStatus,setStatus] = useLocalStorage('status','')
    const[department,setDepartment] = useLocalStorage('department','')
    const patNo = getLSValue('patNo')
    const handleLogout = () =>{

        setLogin(false)
        setCheckup(false)
        setAdmit(false)
        setStatus('')
        location.reload()
       }
    useEffect(()=>{
        if (!isLogin){
            navigate('/login')
        }
        else if(isCheckup){
            navigate('/checkup_progress')
        }
    },[]);



    const [docNo,setDocNo]= useLocalStorage('docNo',false)

    const [formData, setFormData] = useState({
        patNo: patNo,
        deptName: '',
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

      const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          // Send the formData object to Laravel backend
          const response = await axios.post('http://127.0.0.1:8000/api/checkup', formData);
          console.log(response.data); // Assuming Laravel returns a response
          setDocNo(response.data.docNo)
          setDepartment(formData.deptName)     // Clear the form after successful submission
          setFormData({
            patNo: patNo,
            deptName: '',
          });
          setCheckup(true);
          location.reload();
        } catch (error) {
          console.error(error);
          // Handle error scenario
        }
      };
  return (
    <form onSubmit={handleSubmit} >
    <div className="condi">
      <div className="container-condit">
        <hr className="line-condit" />
        <div className="logo-condit">
          <img src={logoImage} alt="Logo" />
        </div>
        <h1 className="title-condit">What condition would you like to check?</h1>
        <a href="" className="logout-link-condit" onClick={handleLogout}>Logout</a>
        <div className="form-container-condit">
          <div className="input-group-condit">
            <select className="input-field-condit" defaultValue=''name="deptName"
            value={formData.deptName}
            onChange={handleChange} >
              <option value='' disabled>Choose condition</option>
              <option value="Cardiology Department">Heart Related Conditions</option>
              <option value="Dermatology Department">Skin Related Conditions</option>
              <option value="Gynecology Department">Reproductive Related Conditions</option>
              <option value="Neurology Department">Brain Related Conditions</option>
              <option value="Ophthalmology Department">Eye Related Conditions</option>
              <option value="Psychiatry Department">Mental Health Related Condtions</option>
              <option value="Pediatrics Department">Pediatric Conditions</option>
            </select>
          </div>
        </div>
        <div className='centerbutton-condit'><button className="submit-button-condit" type="submit" >Submit</button></div>
      </div>
    </div>
    </form>
  );
}

export default Condition;
