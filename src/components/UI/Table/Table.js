import React from 'react';

import classes from './Table.module.css';

const table = (props) => (
	<table className={ classes.Table }>
		<thead>
			<tr>
				<th>Nom du livre</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>1</td>
			</tr>
			<tr>
				<td>1</td>
			</tr>
		</tbody>
	</table>
);

export default table;