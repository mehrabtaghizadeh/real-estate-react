import {useState,useEffect, useContext} from 'react'
import BASE_URL from '../utils/BASE_URL'
import { UserContext } from '../context/AuthContext'

function Auth({children}) {
   const [auth,setAuth] = useState()
   const {user} = useContext(UserContext)
 useEffect(()=>{
      fetch(`${BASE_URL}/user/profile`,{
            credentials:'include'
          }).then(res => res.json()).then(data => {
            setAuth(data.username)})
 },[])
 if( auth && user ) {
      return children;
 }
 return null;
}

export default Auth