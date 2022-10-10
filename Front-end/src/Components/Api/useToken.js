import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

export const  useToken  =  () =>{
  const getToken =   () => {
    const tokenString =  localStorage.getItem('token');

    return {token: tokenString, authanticated: tokenString ? true : false}
  };

  return {token: getToken()}
}

