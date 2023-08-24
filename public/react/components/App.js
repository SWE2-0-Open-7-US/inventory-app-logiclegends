import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SaucesList } from './SaucesList';
import { Item } from './Item';
import ItemList from './ItemList';

export const App = () => {
	return (
		<BrowserRouter>

			<Routes>
				<Route path="/sauces" element={<SaucesList />} />
				<Route path='/items/' element={<ItemList />} />
				<Route path='/items/:id' element={<Item />} />
			</Routes>

		</BrowserRouter>
	)
}