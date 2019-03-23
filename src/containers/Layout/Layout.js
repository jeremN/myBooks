import React, { Component } from 'react';
import axios from 'axios';

import Card from '../../components/UI/Card/Card';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Table from '../../components/UI/Table/Table';
import Modal from '../../components/UI/Modal/Modal';

import './Layout.css';

class Layout extends Component {
	state = {
		books: null,
		tableTitles: [
			'Nom du livre'
		],
		search: '',
		showModal: false,
		error: false,
		errorMsg: '',
		btnDisabled: true,
		typingTimeout: 0,
		typing: false
	}

	componentDidMount() {
		this.getBooksHandler()
	}

	getBooksHandler = () => {
		axios.get('https://mybooks-94d36.firebaseio.com/books.json')
			.then((response) => {
				const datas = Object.keys(response.data).map(book => {
					const list =  Object.keys(response.data[book]).map(bName => bName)
					return {[book]: list.join()}
				});
				this.setState({ books: datas });
			})
			.catch(error => {
				this.setState({ error: true });
			})
	}

	searchHandler = (bookName, canSend = false) => {
		const updatedBooks = [
			...this.state.books
		];

		let finded = []
		for (let i = 0; i < updatedBooks.length; i +=1) {
			const filtered = Object.values(updatedBooks[i]).filter(book => book.toLowerCase().indexOf(bookName.toLowerCase()) > -1)
			if (filtered.length) {
				finded.push(updatedBooks[i])
			}
		}

		if (finded.length)  {
			this.setState({ books: finded, btnDisabled: true });
		}

		if (!finded.length) {
			this.setState({ btnDisabled: false });
		}
	}

	addBookHandler = (event) => {
		event.preventDefault();
		const book = {}
		book[this.state.search] = 0;

		axios.post('https://mybooks-94d36.firebaseio.com/books.json', book)
			.then(response => {
				this.setState({ btnDisabled: true, search: '', });
				this.getBooksHandler()
			})
			.catch(error => {
				this.setState({ error: true, errorMsg: error, btnDisabled: true });
			})
	}

	inputChangedHandler = (event) => {
		const value = event.target.value

		if (this.state.typingTimeout) {
			this.setState({ 
				typing: true, 
				btnDisabled: true 
			});
			this.searchHandler(value);
			clearTimeout(this.state.typingTimeout);
		}

		if (value) {
			this.setState({ 
				search: value,
				typing: false,
				typingTimeout: setTimeout(() => {
					this.searchHandler(value, true);
				}, 500)
			});
		} else {
			this.setState({ 
				search: '',
				typing: false,
			});
			this.getBooksHandler()
		}		

	}

	hideModal = () => {
		this.setState({ showModal: false });
	}

	render() {
		let bookTable = this.state.error ? <p>Books can't be loaded !</p> : <p>Loading...</p>

		if (this.state.books) {
			bookTable = (  
				<Table 
					tableBody={ this.state.books }
					tableHeader={ this.state.tableTitles }/> 
			);
		}

		return (
			<div className="Layout">
				<Card>
					<Input
						value={ this.state.search } 
						changed={ (event) => this.inputChangedHandler(event) }
						label={ 'Nom du livre' } />
					<Button 
						disabled={ this.state.btnDisabled } 
						btnType={ "Button--blue" }
						clicked={ (event) => this.addBookHandler(event) }>
						Ajouter
					</Button>
				</Card>
				<div>
					{ bookTable }
				</div>
	            <Modal 
	                show={ this.state.showModal }
	                modalClosed={ this.hideModal }>
	                { this.state.error ? this.state.error.message : null }
	            </Modal>
            </div>
		);
	}
}

export default Layout;
