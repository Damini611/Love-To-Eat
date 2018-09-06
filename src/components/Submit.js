import React from 'react';
import {Ingredients} from "./ingredients" ;
import {IngredientList} from "./ingredientlist" ;

//Name of the component must start with Upper Case
//history is a JavaScript library that lets you easily manage session history anywhere JavaScript runs.
// IT has properties and can aLso Used for navigation , blocking transition etc.
//https://github.com/ReactTraining/history
//ref is used to interact with DOM element. In this example it is used to show the value of the text input!
export class Submit extends React.Component{

	constructor(props){
		super(props);
		this.state ={

			Recipe:{
			Name : "",
			Description: "",
			Ingredients :[]
			}
		}

	this.addIngredients = this.addIngredients.bind(this);
	this.handleClick = this.handleClick.bind(this);
	}

	//Below method is getting its quantity and value from it child component "ingredient".
	//This method is passed as a prop to the child component and in the child component this method gets called with the desired parameters!
	addIngredients(quantity,value){
		//Below is one of the method to update an object using setState()
		// Create a copy of the object , update desired property and then reassign the state object with the newly update copy using setState()
		let newrecipe = this.state.Recipe;
		//Since ingredient is an array, we have to use push method and we are pushing an object in the Ingredient array
		newrecipe.Ingredients.push({quantity: quantity, ingredient: value});
		this.setState({
			Recipe: newrecipe
		});
		

	}
	handleClick(){
		//refs are used to fetch th evalue from text input
		
		//description value is shown using refs, whereas NAme of the Recipe is displayed using onChange function
		console.log(this.desc.value);

		let newrecipe = this.state.Recipe;
		newrecipe.Description =this.desc.value;
		this.setState({
			Recipe: newrecipe
		});

		console.log(this.state.Recipe);
		this.props.history.push('/Home');
	}

	handleName(event){
		let newrecipe = this.state.Recipe;
		newrecipe.Name = event.target.value;
		this.setState({
			Recipe: newrecipe
		})
	}


	render(){
		return(
			<div className="container">
			<div className="page-header">
			<h2> <b>Add a Recipe </b></h2>
			</div>
			  <div className="row">
			  <div className="col-xs-12"></div>
			  <div className="col-sm-12"></div>
			  <form>
			  	<div className="form-group">
				  	<label>Recipe Name </label>
				  	<input className="form-control" type ="text" id ="usr" placeholder="Enter Recipe Name" onChange ={this.handleName.bind(this)} />
		  		</div>

		  		<div className="form-group">
				  	<label>Recipe Description </label>
				  	<textarea className="form-control" type ="text" id ="desc"  ref={input => this.desc = input} placeholder="Enter Recipe Description" />
		  		</div>
		  		 <IngredientList Recipe = {this.state.Recipe}/>
		  		 <Ingredients addIngredients = {this.addIngredients} />
			    <button type = "button" className = "btn btn-info" onClick ={this.handleClick}>Submit</button>
			   </form>
		    </div>
		    </div>
			
			);
	}
}	