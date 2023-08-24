// Front-end View for all Items - Tier 1 #6

import React, { useState, useEffect } from 'react';
import { Item } from './Item';

export const ItemList = ({items}) => {
	return <>
		{
			items.map((item, idx) => {
				return <Item item={item} key={idx} />
			})
		}
	</>
} 

export default ItemList;
