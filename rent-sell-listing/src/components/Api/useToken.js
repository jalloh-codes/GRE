
export const  useToken  =  () =>{
  const getToken =   () => {
    const tokenString =  localStorage.getItem('listingAccess');

    return {token: tokenString, authanticated: tokenString ? true : false}
  };

  return {token: getToken()}
}

