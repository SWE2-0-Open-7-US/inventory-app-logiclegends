import React,{useEffect, useState} from 'react';
import { Sauce } from './Sauce';

import apiURL from '../api';

export const SaucesList = () => {
	const [sauces, setSauces] = useState([]);

	async function fetchSauces(){
		try {
			const response = await fetch(`${apiURL}/sauces`);
			const saucesData = await response.json();
			
			setSauces(saucesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchSauces();
	}, []);
	
	return <main>
		<h1>Sauce Store</h1>
		<h2>All things 🔥</h2>	

		{
			sauces.map((sauce, idx) => {
				return(
				<Sauce sauce={sauce} key={idx} 
				/> 
			
				)
			})
		}
	</main>
} 
