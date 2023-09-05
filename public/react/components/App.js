import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Item } from './Item';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import Navbar from './Navbar';
import Confirmation from './Confirmation';
import Cart from './Cart';
import Signup from './Signup';
import Login from './Login';



export const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		if (localStorage.getItem("username")) {
			setIsLoggedIn(true);
		}
	})

	return (
		<BrowserRouter>
			<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

			<Routes>

				<Route path='/cart' element={<Cart isLoggedIn={isLoggedIn} />} />
				<Route path='/confirmation' element={<Confirmation />} />
				<Route path='/items/' element={<ItemList />} />
				<Route path='/items/:id' element={<Item />} />
				<Route path='/items/addItem' element={<AddItemForm />} />
				<Route path='/signup' element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
				<Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />

				<Route path='*' element={<Navigate to="/items" />} />
			</Routes>

		</BrowserRouter>
	)
}


