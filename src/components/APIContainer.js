import React from 'react';
import APICard from './APICard';

const APIContainer = ({
	API,
	currentCategory,
	addToFavorites,
	removeFromFavorites
}) => (
	<div className="APIContainer">
		{API.map(entry => (
			<APICard
				key={entry.Link}
				obj={entry}
				addToFavorites={addToFavorites}
				removeFromFavorites={removeFromFavorites}
			/>
		))}
	</div>
);

export default APIContainer;
