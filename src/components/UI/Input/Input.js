import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
	let inputElement = null
	const inputClasses = [classes.Input]

	switch(props.elementtype) {
		case ('input'):
			inputElement = <input 
				className={ inputClasses.join(' ') }
				{ ...props.elementConfig } 
				value={ props.value }
				onChange={ props.changed } />;
			break;
		default:
			inputElement = <input 
				className={ inputClasses.join(' ') }
				{ ...props.elementConfig } 
				value={ props.value }
				onChange={ props.changed } />;
	}

	return (
		<div className={ classes.Form__group }>
			<label className={ classes.Label }>{ props.label }</label>
			{ inputElement }
		</div>
	);
}

export default input;