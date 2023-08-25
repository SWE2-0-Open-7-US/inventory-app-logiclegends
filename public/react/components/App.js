import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SaucesList } from './SaucesList';
import { Item } from './Item';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import Navbar from './Navbar'


export const App = () => {
	return (
		<BrowserRouter>
			<Navbar />

			<Routes>
				<Route path="/sauces" element={<SaucesList />} />
				<Route path='/items/' element={<ItemList />} />
				<Route path='/items/:id' element={<Item />} />
				<Route path='/items/addItem' element={<AddItemForm />} />
			</Routes>

		</BrowserRouter>
	)
}

