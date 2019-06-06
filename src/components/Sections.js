import React from 'react';
import Section from './Section';

const Sections = ({ updatecurrentSection, currentSection }) => (
	<div className="Sections">
		<Section
			onClick={updatecurrentSection}
			text="Categories"
			currentSection={currentSection}
		/>

		<Section
			onClick={updatecurrentSection}
			text="Details"
			currentSection={currentSection}
		/>

		<Section
			onClick={updatecurrentSection}
			text="Random"
			currentSection={currentSection}
		/>

		<Section
			onClick={updatecurrentSection}
			text="Favorites"
			currentSection={currentSection}
		/>
	</div>
);

export default Sections;
