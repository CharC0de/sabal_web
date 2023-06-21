import React from 'react';
import Admission from './components/Admission/Admission';
import AdmissionDet from './components/Admission-details/AdmissionDet';
import Adprogress from './components/Adprogress/Adprogress';
import CheckupProg from './components/Checkup-prog/CheckupProg';
import CheckupDet from './components/Checkup-details/CheckupDet';
import Condition from './components/Condition/Condition';
import Home from './components/Home/Home';
import Operation from './components/Op-prog/Operation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { Route, Routes, Navigate } from 'react-router-dom';



const App = () => {
    // Retrieve the login status from localStorage
    const isLogin = localStorage.getItem('isLogin') === 'true';

    return (
      <Routes>
        <Route path="/" element={isLogin ? <Home /> : <Navigate to="/login" />} />
        <Route path="login" element={!isLogin ? <Login /> : <Navigate to="/" />} />
        <Route path="register" element={!isLogin ? <Register /> : <Navigate to="/" />} />
        <Route path="checkup_details" element={<CheckupDet />} />
        <Route path="checkup_progress" element={<CheckupProg />} />
        <Route path="condition" element={<Condition />} />
        <Route path="operation" element={<Operation />} />
        <Route path="admission_progress" element={<Adprogress />} />
        <Route path="admission_details" element={<AdmissionDet />} />
        <Route path="admission" element={isLogin ? <Admission /> : <Navigate to="/login" />} />
      </Routes>
    );
  };
export default App;

