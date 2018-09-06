import React from 'react';

//Name of the component must start with Upper Case
export class Ingredients extends React.Component{
	constructor(props){
		super(props);
		this.state = {};
	}

	addIngredient(){
		console.log(this.qty.value);
		console.log(this.ing.value);
		//this is calling the addIngredients function in the parent component
		this.props.addIngredients(this.qty.value, this.ing.value);
		//After passing the values to the parent component, values in the text area are cleared
		this.qty.value ="";
		this.ing.value = "";
	}
	render(){	
		return(
				<div className="form-inline form=group" >
			  	<label htmlFor = "qty">Ingredient quantity </label>
			  	<input className="form-control" type ="text" id ="qty" ref ={input => this.qty = input}  placeholder="Enter Ingredients quantity" />
			  	<label>Recipe Ingredients </label>
			  	<textarea className="form-control" type ="text" id ="ingredient"  ref={input => this.ing = input} placeholder="Enter all ingredients" />	
  		  		<button type= "button" className = "btn btn-info" onClick = {this.addIngredient.bind(this)}>Add Ingredients</button>
	  			</div>
			);
	}
}