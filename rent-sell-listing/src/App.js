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
import {Verification} from './components/Verification/Verification'
import {authContext} from  './Context/authContext';
import {ResetPassword} from './components/ResetPassword/ResetPassword'
import { createUploadLink } from 'apollo-upload-client'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});


// const link = from([
//   errorLink,
//    new HttpLink({uri: "http://localhost:8080/gre"}), 
// ])

const uploadLink = createUploadLink({
  uri: 'https://gre-api-app.onrender.com/gre',
  errorLink
});
// const link = createUploadLink([
//   errorLink,
//    new HttpLink({uri: "http://localhost:8080/gre"}), 
// ])

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const { token } = useToken();
  if(token.authanticated){
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token.token,
      }
    }));
  }else{
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers
      }
    }));
  }

  return forward(operation);
})

// const client = new ApolloClient({
//   link: concat(authMiddleware, link),
//   cache:new InMemoryCache().restore(window.__APOLLO_STATE__)
// });




const client = new ApolloClient({
  link: concat(authMiddleware, uploadLink),
  cache: new InMemoryCache(),
});

function App() {
  
  const navigate = useNavigate()
  const { token} = useToken();
  const [authStatus, setAuthStatus] =  useState(false)
  const [authanticated, setAuthanticated] = useState(token.authanticated)

  useEffect(() =>{
    setAuthanticated(token.authanticated)
  },[token, authanticated])
  
  useEffect(() =>{
    if(token.authanticated){
      return navigate('/makeChoice')
    }else{
      return navigate("/")
    }
  },[authanticated])



  return(
    <authContext.Provider value={{authanticated, setAuthanticated}}>
    <ApolloProvider  client={client}>
      <div className="App">
        <Routes>
          {authanticated ?
          <>
          <Route path="/makeChoice" element={<Rent_or_sell_Component  />} />
          <Route path="/rentlisting" element={<RentListingComponent  />} />
          <Route path="/selllisting" element={<SellListingComponent/>} />
          <Route  path="verify" element={<Verification />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          </>:
          <>
          <Route exact path="/" element={<LoginComponent />} />
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route  path="/verify" element={<Verification />} />
          </>
          }
      </Routes>
      </div>
      </ApolloProvider> 
      </authContext.Provider>
  );
}

export default App;
