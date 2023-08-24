import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { SaucesList } from './SaucesList';
import { Item } from './Item';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {
	return (
		
		<BrowserRouter>
		<Routes>
			<Route path="/sauces" element={<SaucesList/>}/>
			<Route path='/items/:id' element={<Item />}/>
		</Routes>
		
		</BrowserRouter>
	
		
		
	)
}