import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

export const  useToken  =  () =>{
  const navigate = useNavigate()
  const getToken =   () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
    // 'userToken?.token'
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };
  

  const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return navigate('/')
 }

  return {
    setToken: saveToken,
    token,

    logout: logout,

  }
}

