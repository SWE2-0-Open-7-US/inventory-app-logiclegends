import React,{useState} from 'react'
import { useNavigate } from 'react-router';
import apiURL from '../api';

const Signup = ({setIsLoggedIn}) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [doesUserExist, setDoesUserExist] = useState(false)

  async function handleSignup(e){
    e.preventDefault();
    const info = {
        username,
        password
    }
    let verifyRes  = await fetch(`${apiURL}/users/${username}`);
    let verifyData = await verifyRes.json();
    
    if(verifyData){
        setDoesUserExist(true)
        setPassword("")
        setUsername("")

    }else{
        let response = await fetch(`${apiURL}/users`,{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(info)
        })
        let data = await response.json();
        localStorage.setItem("id", data.id);
        localStorage.setItem("username", data.username);
        localStorage.setItem("password", data.password);
        
        setIsLoggedIn(true)
        navigate("/items")
    }


  }

  return (
    <>
    <h2>Signup</h2>
    <form onSubmit={handleSignup}>
        <input type='text' value={username} placeholder='username' onChange={(e)=>setUsername(e.target.value)} />
        <input type='text' value={password} placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit'>SignUp</button>
    </form>
    {doesUserExist && (<p>User already exists, create a unique username</p>) }
    </>
  )
}

export default Signup