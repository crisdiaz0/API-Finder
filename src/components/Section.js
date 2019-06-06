import React from 'react';

const Section = ({ onClick, text, currentSection }) => (
	<div
		className={`Section ${
			text === currentSection ? 'activeSection' : 'inactiveSelection'
		}`}
		onClick={() => onClick(text)}
	>
		{text}
	</div>
);

export default Section;
