import React from 'react';
import Cover from './facebook_cover_photo_1.png';
import Categories from './components/Categories';
import APICard from './components/APICard';
import APIConainer from './components/APIContainer';
import Sections from './components/Sections';
import Filters from './components/Filters';

const baseAPIUrl = 'https://api.publicapis.org/';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allCategories: [],
			currentSection: 'Home',
			currentCategory: '',
			randomAPIFetch: {},
			APIFetch: [],
			favorites: [],
			searchResults: []
		};
	}

	componentDidMount() {
		this.getAllCatagories();
	}

	getAllCatagories = async () => {
		const response = await fetch(`${baseAPIUrl}categories`);
		const json = await response.json();

		this.setState({ allCategories: json });
	};

	getCurrentSectionContent() {
		let returnScreen;

		switch (this.state.currentSection) {
			case 'Home':
				returnScreen = <div />;
				break;

			case 'Categories':
				returnScreen = (
					<Categories
						allCategories={this.state.allCategories}
						getAPICategory={this.getAPICategory}
					/>
				);
				break;

			case 'Random':
				returnScreen = (
					<div>
						<div
							className="randomHeader"
							onClick={() => this.getRandomAPI()}
						>
							Click me to get a random API
						</div>

						<div className="randomCard">
							{this.state.randomAPIFetch.API ? (
								<APICard
									obj={this.state.randomAPIFetch}
									addToFavorites={this.addToFavorites}
									removeFromFavorites={
										this.removeFromFavorites
									}
								/>
							) : (
								<div />
							)}
						</div>
					</div>
				);
				break;

			case 'Details':
				returnScreen = (
					<div>
						<div className="detailsHeader">
							{this.state.currentCategory
								? `Category: ${
										this.state.currentCategory
								  } Total APIs: ${
										this.state.searchResults.length
											? this.state.searchResults.length
											: this.state.APIFetch.length
								  }`
								: `Nothing Selected`}
						</div>

						<Filters
							filterAPIQuery={this.filterAPIQuery}
							handleSearch={this.handleSearch}
						/>

						<APIConainer
							API={
								this.state.searchResults.length
									? this.state.searchResults
									: this.state.APIFetch
							}
							currentCategory={this.state.currentCategory}
							addToFavorites={this.addToFavorites}
							removeFromFavorites={this.removeFromFavorites}
						/>
					</div>
				);
				break;

			case 'Favorites':
				returnScreen = (
					<div>
						{this.state.favorites.length ? (
							<APIConainer
								API={this.state.favorites}
								currentCategory={this.state.currentCategory}
								addToFavorites={this.addToFavorites}
								removeFromFavorites={this.removeFromFavorites}
							/>
						) : (
							<h1 className="empty">Nothing Here</h1>
						)}
					</div>
				);
				break;

			case 'Doom':
				returnScreen = (
					<iframe
						id="jsdos"
						src="http://js-dos.com/games/doom.exe.html"
						title="yeet"
						scrolling="no"
					/>
				);
				break;

			default:
				returnScreen = <div>Error</div>;
				break;
		}

		return returnScreen;
	}

	updatecurrentSection = newScreen => {
		this.setState({
			currentSection: newScreen,
			searchResults: []
		});
	};

	getRandomAPI = async () => {
		const response = await fetch(`${baseAPIUrl}random`);
		const json = await response.json();

		this.setState({
			randomAPIFetch: json.entries[0]
		});
	};

	getAPICategory = async categoryName => {
		const response = await fetch(
			`${baseAPIUrl}entries?category=${categoryName}`
		);

		const json = await response.json();

		this.setState({
			currentSection: 'Details',
			currentCategory: categoryName,
			APIFetch: json.entries,
			searchResults: []
		});
	};

	filterAPIQuery = async query => {
		const newQuery = `entries?category=${
			this.state.currentCategory
		}&${query}`;

		const response = await fetch(`${baseAPIUrl}${newQuery}`);
		const json = await response.json();

		const newAPIFetch = json.entries ? json.entries : [];

		this.setState({
			APIFetch: newAPIFetch
		});
	};

	addToFavorites = obj => {
		const newFavorites = this.state.favorites.includes(obj)
			? this.state.favorites
			: [...this.state.favorites, obj];

		this.setState({
			favorites: newFavorites
		});
	};

	removeFromFavorites = obj => {
		const newFavorites = this.state.favorites.filter(api => api !== obj);

		this.setState({
			favorites: newFavorites
		});
	};

	handleSearch = event => {
		let newAPIFetch = [];

		if (event.target.value === 'Doom ') {
			this.setState({ currentSection: 'Doom' });
		}

		event.target.value.startsWith('`')
			? (newAPIFetch = this.state.APIFetch.filter(api =>
					api.API.toLowerCase().startsWith(
						event.target.value.split('`')[1].toLowerCase()
					)
			  ))
			: (newAPIFetch = this.state.APIFetch.filter(api =>
					api.API.toLowerCase().includes(
						event.target.value.toLowerCase()
					)
			  ));

		this.setState({
			searchResults: newAPIFetch
		});
	};

	render() {
		return (
			<div className="App">
				<img
					src={Cover}
					alt="Cover"
					onClick={() => this.updatecurrentSection('Home')}
				/>

				<Sections
					updatecurrentSection={this.updatecurrentSection}
					currentSection={this.state.currentSection}
				/>

				{this.getCurrentSectionContent()}
			</div>
		);
	}
}

export default App;
