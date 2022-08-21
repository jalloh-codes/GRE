import React,{useState, useEffect} from 'react';
import { HeaderMainContainer } from './Components/Header/HeaderMainContainer';
import BodyMainContainer from './Components/Body/BodyMainContainer'
import { FooterMainContainer } from './Components/Footer/FooterMainContainer';
import './App.css';
import { LoginComponent } from './Components/LoginComponent/LoginComponent';
import { SignUpComponent } from './Components/SignUpComponent/SignUpComponent';
import { AboutComponent } from './Components/AboutUS/AboutComponent';
import { RentComponent } from './Components/RentComponent/RentComponent';
import { BuyComponent } from './Components/BuyComponent/BuyComponent';
import { SingleHome } from './Components/SingleHome/SingleHome'
import { SimpleMap } from './Components/SingleHome/SimpleMap';
import { ContactComponent } from './Components/ContactComponent/ContactComponent';
import { Routes, Route} from 'react-router-dom';
import {useToken} from './Components/Api/useToken';
import {authContext} from  './Context/authContext';
import {  ApolloClient, InMemoryCache, from, ApolloLink,
  ApolloProvider, HttpLink, concat } from "@apollo/client";
  import {onError} from '@apollo/client/link/error';

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
  
    if (networkError){
      console.log(`[Network error]: ${networkError}`);
      networkError.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
    }
  });

  const link = from([
    errorLink,
     new HttpLink({uri: "http://localhost:8080/gre"}), 
  ])

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
  
  const client = new ApolloClient({
    link: concat(authMiddleware, link),
    cache: new InMemoryCache()
  });

function App() {

  const { token} = useToken();
  const [authStatus, setAuthStatus] =  useState(false)
  const [authanticated, setAuthanticated] = useState(false)

  useEffect(() =>{
    setAuthanticated(token.authanticated)
  },[token])
  
  return (
    <authContext.Provider value={{authanticated}}>
    <ApolloProvider  client={client}>
    <div className="App">
      <Routes>
        <Route path="/" element={
        <>
              <HeaderMainContainer />
              <BodyMainContainer />
              <FooterMainContainer />
        </>} />
        <Route path="login" element={<LoginComponent />} />
        <Route path="signUp" element={<SignUpComponent />} />
        <Route path="aboutUS" element={<AboutComponent />} />
        <Route path="rent" element={<RentComponent />} />
        <Route path="buy" element={<BuyComponent />} />
        <Route path="singleHome" element={<SingleHome />} />
        <Route path="simpleMap" element={<SimpleMap />} />
        <Route path="contactUs" element={<ContactComponent />} />
      </Routes>
    </div>
    </ApolloProvider> 
    </authContext.Provider>
  );
}
export default App;