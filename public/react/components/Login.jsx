import React,{useState} from 'react'
import { useNavigate } from 'react-router';
import apiURL from '../api';

const Login = ({setIsLoggedIn}) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [doesUserExist, setDoesUserExist] = useState(true)

  async function handleLogin(e){
    e.preventDefault();
    let response = await fetch(`${apiURL}/users/${username}/${password}`);
    let data = await response.json()
    console.log(data);
    if(data.username === undefined){
        setDoesUserExist(false)
        setPassword("")
        setUsername("")
    }else{
        localStorage.setItem("id",data.id);
        localStorage.setItem("username", data.username)
        localStorage.setItem("password", data.password);
    
        setIsLoggedIn(true)
        navigate("/items")
    }
  }

  return (
    <>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
        <input type='text' value={username} placeholder='username' onChange={(e)=>setUsername(e.target.value)} />
        <input type='text' value={password} placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit'>Login</button>
    </form>
    {!doesUserExist && (<p>Incorrect username or password,try again</p>) }
    </>
  )
}

export default Login