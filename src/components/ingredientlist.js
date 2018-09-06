import React from 'react';

//Name of the component must start with Upper Case
export class IngredientList extends React.Component{
	constructor(props){
		super(props);
		this.state = {};
	}

//A new array had to be created, else the result was not being displayed properly
//A1B1----  A2B2----     Result was being displayed as this format!!  
//IN the render function -this.displayResultList() is being invoked and is not passed as the reference as in other click events
//https://medium.com/@rjun07a/binding-callbacks-in-react-components-9133c0b396c6
//REACT KEYS: React keys are useful when working with dynamically created components or when your lists are altered by the users. 
//https://reactjs.org/docs/lists-and-keys.html
	displayResultList(){
		let IngredientList = [];

		this.props.Recipe.Ingredients.map((x,i) => IngredientList.push(<li key={i}>  {x.quantity} - {x.ingredient}</li>) )

		return IngredientList;
	}
	

	render(){	
		return(
				<div className="form-inline form=group" > <b><i>IngredientList</i></b>
				<ul>{this.displayResultList()} </ul>
			  	</div>
			);
	}
}