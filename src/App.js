import React from 'react'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import AllPropertyes from './pages/AllPropertyes';
import PropertyPage from './pages/PropertyPage';
import HomePage  from "./pages/HomePage"
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage'
import {Route,Routes} from "react-router-dom";
import NewProperty from './pages/NewProperty';
import SearchResult from './pages/SearchResult';
import { UserContextProvider } from './context/AuthContext';
import EditProperty from './pages/EditProperty';
import MyProperty from './pages/MyProperty';
import { QueryClient, QueryClientProvider } from "react-query";
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
const queryClient = new QueryClient({});

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>

        <UserContextProvider>
       <NextUIProvider>
        <Header/>
       <Routes>
        <Route path="/" element={<HomePage/>}/>
       <Route path="/propertyes" element={<AllPropertyes/>} />
      <Route path="/property/:id" element={<PropertyPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/add" element={<NewProperty/>} />
      <Route path="/edit/:id" element={<EditProperty/>} />
      <Route path="/my" element={<MyProperty/>} />
      <Route path="/search" element={<SearchResult/>} />
      <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
       </NextUIProvider>
        </UserContextProvider>
    </QueryClientProvider>
    </>
  )
}

export default App