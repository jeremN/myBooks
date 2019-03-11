import React, { Component } from 'react';
import axios from 'axios';

import Card from '../../components/UI/Card/Card';
import './Layout.css';

class Layout extends Component {
	state = {
		books: [],
		search: ''
	}

	componentDidMount() {}

	render() {
		return (
			<div className="Layout">
				{ this.props.children }
			</div>
		);
	}
}

export default Layout;
