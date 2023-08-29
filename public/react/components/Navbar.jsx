import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({isLoggedIn, setIsLoggedIn}) => {
  function logoutFunc(){
    setIsLoggedIn(false)
    localStorage.clear();
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/items">Items</Link>
        </li>
        <li>
          <Link to="/items/addItem">Create Item</Link>
        </li>
        {!isLoggedIn ? (
        <>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        </>
        ) : (
        <>
        <li>Welcome, {localStorage.getItem("username")}</li>
        <li><button type='submit' onClick={logoutFunc}>Logout</button></li>
        </>
        )}
        
      </ul>
    </nav>
  )
}

export default Navbar