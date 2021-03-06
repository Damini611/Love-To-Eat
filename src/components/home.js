import React from 'react';
import {IngredientList} from "./ingredientlist" ;

//Name of the component must start with Upper Case
export class Home extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			Recipes: JSON.parse(localStorage.getItem("RecipesArray")) || []
		}
	}

	//If we just try to display object --> it will give an error stating " objects cannot be  rendered as React Child"
	//That is why specific property of the object is displayed!
	render(){
		return(
			<div className = "container" >
			<h3> Enjoy these Recipes!! </h3>
			<div className = "row"> 
			{this.state.Recipes.map((Recipe, i) => <div className="col-sm-4"  key ={i}><font color="red"><b> {Recipe.Name}  - {Recipe.Description}</b></font> <br />
							<img alt = {Recipe.image} src={Recipe.image} height="220" width = "220" />
							<IngredientList Recipe = {Recipe}/>
												</div>)}
			</div>
			</div>
			);
	}
}