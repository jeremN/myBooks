import React from 'react';

import classes from './Table.module.css';

const table = ( props ) => {
	let tableContent = props.tableBody.map((bookName) => {
		return Object.keys(bookName).map((book) => {
			if (bookName) {
				return (
					<tr id={ book } key={ book }>
						<td>{ bookName[book] }</td>
					</tr>
				)
			} else {
				return ('')
			}
		})
	});

	let tableHead = props.tableHeader.map((title, i) => (
		<tr key={ title + i }>
			<th>{ title }</th>
		</tr>
	))

	return (
		<table className={ classes.Table }>
			<thead>
				{ tableHead }
			</thead>
			<tbody>
				{ tableContent }
			</tbody>
		</table>
	);
}


export default table;