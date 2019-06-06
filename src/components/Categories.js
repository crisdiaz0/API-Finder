import React from 'react';
import Category from './Category';

const Categories = ({ allCategories, getAPICategory }) => {
	return (
		<div className="Categories">
			{allCategories.map(category => (
				<Category
					key={category}
					categoryName={category}
					getAPICategory={getAPICategory}
				/>
			))}
		</div>
	);
};

export default Categories;
