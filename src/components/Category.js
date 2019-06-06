import React from 'react';

const Category = ({ categoryName, getAPICategory }) => (
	<div className="Category" onClick={() => getAPICategory(categoryName)}>
		<div>{categoryName}</div>
	</div>
);

export default Category;
