import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/items">Items</Link>
        </li>
        <li>
          <Link to="/sauces">Sauces</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar