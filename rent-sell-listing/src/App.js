import React, {useState, useEffect} from "react";
import './App.css';
import { LoginComponent } from "./components/LoginComponent/LoginComponent"
import {  ApolloClient, InMemoryCache, from, ApolloLink,
    ApolloProvider, HttpLink, concat } from "@apollo/client";
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import {onError} from '@apollo/client/link/error';
import { SignUpComponent } from './components/SignUpComponent/SignUpComponent';
import { Rent_or_sell_Component } from './components/Rent_or_sell_Component/Rent_or_sell_Component';
import { RentListingComponent } from './components/RentListingComponent/RentListingComponent';
import { SellListingComponent } from './components/SellListingComponent/SellListingComponent';
import {useToken} from './components/Api/useToken';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError){
    console.log(`[Network error]: ${networkError}`);
  }
});


const link = from([
  errorLink,
   new HttpLink({uri: "http://192.168.1.32:8080/gre"}), 
])

// const authMiddleware = ApolloLink((operation, forward) => {
//   const token = localStorage.getItem('token')
//   operation.setContext(({headers ={}}) =>({
//     headers:{
//       ...headers,
//       authorization: localStorage.getItem('token') || null
//     }
//   }));
//   return forward(operation)
// });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem('token');

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: JSON.parse(token) || null,
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache()
});


function App() {
  
  const navigate = useNavigate()
  const { token, setToken, logout} = useToken();
  const [authStatus, setAuthStatus] =  useState(false)


  useEffect(() =>{
    if(token){
      setAuthStatus(true)
      return navigate('/makeChoice')
    }else{
      return navigate('/')
    }
    
    
    
  },[])

  return(
    <ApolloProvider  client={client}>
      <div className="App">
        <Routes>
          {token && authStatus ?
          <>
          <Route path="/makeChoice" element={<Rent_or_sell_Component  authStatus={authStatus} logout={logout}/>} />
          <Route path="/rentlisting" element={<RentListingComponent  authStatus={authStatus} logout={logout}/>} />
          <Route path="/selllisting" element={<SellListingComponent authStatus={authStatus} logout={logout}/>} />
          </>:
          <>
          <Route path="/" element={<LoginComponent setToken={setToken} authStatus={authStatus} logout={logout}/>} />
          <Route path="/sign-up" element={<SignUpComponent authStatus={authStatus} logout={logout}/>} />
          </>
          }
      </Routes>
      </div>
      </ApolloProvider> 
  );
}

export default App;
