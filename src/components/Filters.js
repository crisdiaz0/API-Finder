import React from 'react';

class Filters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: '',
			https: '',
			cors: ''
		};
	}

	handleChange = (e, type) => {
		this.setState({
			[type]: e.target.value
		});
	};

	filterAPIQuery = () => {
		const { auth, https, cors } = this.state;
		const query = `auth=${auth}&https=${https}&cors=${cors}`;
		this.props.filterAPIQuery(query);
	};

	render() {
		return (
			<div className="Filters">
				<input
					type="text"
					className="search"
					placeholder="Search By Name (use ` for exact matching)"
					onChange={this.props.handleSearch}
				/>

				<select onChange={e => this.handleChange(e, 'auth')}>
					<option value="">Authorization: All</option>
					<option value="apiKey">Authorization: apiKey</option>
					<option value="OAuth">Authorization: OAuth</option>
					<option value="X-Mashape-Key">
						Authorization: X-Mashape-Key
					</option>
				</select>

				<select onChange={e => this.handleChange(e, 'https')}>
					<option value="">HTTPS: All</option>
					<option value="true">HTTPS: Yes</option>
					<option value="false">HTTPS: No</option>
				</select>

				<select onChange={e => this.handleChange(e, 'cors')}>
					<option value="">Cors: All</option>
					<option value="yes">Cors: Yes</option>
					<option value="no">Cors: No</option>
				</select>

				<span
					className="submitButton"
					onClick={() => this.filterAPIQuery()}
				>
					Submit
				</span>
			</div>
		);
	}
}

export default Filters;
