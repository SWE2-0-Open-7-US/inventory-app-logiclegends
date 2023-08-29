import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SaucesList } from './SaucesList';
import { Item } from './Item';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import Navbar from './Navbar';
import Checkout from './Checkout';
import Confirmation from './Confirmation';
import Cart from './Cart';


export const App = () => {
	return (
		<BrowserRouter>
			<Navbar />

			<Routes>
				<Route path='/sauces' element={<SaucesList />} />
				<Route path='/items/' element={<ItemList />} />
				<Route path='/items/:id' element={<Item />} />
				<Route path='/items/addItem' element={<AddItemForm />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/checkout' element={<Checkout />} />
				<Route path='/confirmation' element={<Confirmation />} />
			</Routes>

		</BrowserRouter>
	)
}


