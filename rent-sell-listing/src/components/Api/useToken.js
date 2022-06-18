import { useState } from 'react';
// import { useNavigate} from 'react-router-dom';

export const  useToken  =  () =>{
  // const navigate = useNavigate()
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
  
  const deleteToken = async () =>{
    await localStorage.removeItem('token')
    await localStorage.removeItem('user')
  }

  const logout = async () => {
    deleteToken().then((res) =>{
      return res
    }).catch(error =>{
      return error
    })
 }

  return {
    setToken: saveToken,
    token,
    removeToken: logout,

  }
}

