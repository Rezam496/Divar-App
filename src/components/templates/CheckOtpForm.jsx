import { useNavigate } from 'react-router-dom';
import { checkOtp } from '../../services/auth';
import {setCookie} from '../../utils/cookie';
import { useQuery } from "@tanstack/react-query";
import { getProfile } from '../../services/user';
import styles from './CheckOtpForm.module.css';

function CheckOtpForm({mobile,setCode,setStep,code}) {
  const navigate= useNavigate();
  const{data,isLoading,error}=useQuery(["profile"],getProfile); 
  const submitHandler=async(event)=>{
      event.preventDefault();
      if(code.length!==5)return;

      const {response,error} = await checkOtp(mobile,code);
      if(response){
          setCookie(response.data)
          navigate("/");
          refetch();
      }
      if(error) console.log(error.response.data.message);
  }
  return (
    <form onSubmit={submitHandler} className={styles.form}>
        <p>تایید کد اس ام اس شده</p>
        <span>کد پیامک شده به شماره «{mobile}»را وارد کنید</span>
        <label htmlFor="input">کد تایید را وارد کنید</label>
        <input type="text" id='input' placeholder='کد تایید' value={code} onChange={e=>setCode(e.target.value)}/>
        <button type='submit'>ورود</button>
        <button onClick={()=>setStep(1)} className={styles.backButton}>تغییر شماره موبایل</button>
    </form>
  )
}

export default CheckOtpForm