import React from 'react';

const APICard = ({ obj, addToFavorites, removeFromFavorites }) => (
	<div className="APICard">
		<a className="cardHeader" href={obj.Link}>
			{obj.API}
		</a>

		<h2 className="cardCategory">{obj.Category}</h2>

		<h3 className="cardDescription">{`Description: ${obj.Description}`}</h3>

		<h3 className="cardAuth">{`Authorization: ${
			obj.Auth ? obj.Auth : 'None'
		}`}</h3>

		<h3 className="cardCors">{`Uses Cors: ${obj.Cors}`}</h3>

		<h3 className="cardHTTPS">{`Uses HTTPS: ${
			obj.HTTPS ? 'Yes' : 'No'
		}`}</h3>

		<div className="favorites bounce" onClick={() => addToFavorites(obj)}>
			Add to Favorites
		</div>

		<div
			className="favorites bounce"
			onClick={() => removeFromFavorites(obj)}
		>
			Remove from Favorites
		</div>
	</div>
);

export default APICard;
