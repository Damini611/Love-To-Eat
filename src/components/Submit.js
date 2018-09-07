import React from 'react';
import {Ingredients} from "./ingredients" ;
import {IngredientList} from "./ingredientlist" ;
import Dropzone from 'react-dropzone';
import request from 'superagent';
const CLOUDINARY_UPLOAD_PRESET = 'jipkrwqw';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ddwxmarzv/upload';

//Name of the component must start with Upper Case
//history is a JavaScript library that lets you easily manage session history anywhere JavaScript runs.
// IT has properties and can aLso Used for navigation , blocking transition etc.
//https://github.com/ReactTraining/history
//ref is used to interact with DOM element. In this example it is used to show the value of the text input!
export class Submit extends React.Component{

	constructor(props){
		super(props);
		this.state ={
			//We are initializing with the currently stored items in the local storage
			Recipes: JSON.parse(localStorage.getItem("RecipesArray")) || [],
			Recipe:{
			Name : "",
			Description: "",
			Ingredients :[],
			image :""
			},
			uploadedFileCloudinaryUrl:"",
			uploadedFile:" "
		}

	//Binding callback methods to the current instance of React component in the constructor
	//When using the React ES5 class syntax (React.createClass), all methods are "autobound" to the class instance. 
	//The code in this post uses the ES6 class syntax (extends React.Component), 
	//which does not provide autobinding. That's why we use .bind(this) 
	this.addIngredients = this.addIngredients.bind(this);
	this.SubmitRecipe = this.SubmitRecipe.bind(this);
	this.onImageDrop = this.onImageDrop.bind(this)
	}

	//Below method is getting its quantity and value from it child component "ingredient".
	//This method is passed as a prop to the child component "ingredient" and in the child component this method gets called with the desired parameters!
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
	//only a reference of method "SubmitRecipe" is passed to the onclick event of SUbmit Button
	//If the function was called instead of passing the reference, it would get executed on the spot
	SubmitRecipe(){
		//refs are used to fetch the value from text input - like this.desc 
		//description value is shown using refs, whereas NAme of the Recipe is displayed using onChange function
		console.log(this.desc.value);

		let newrecipe = this.state.Recipe;
		newrecipe.Description =this.desc.value;
		newrecipe.image = this.state.uploadedFileCloudinaryUrl;
		this.setState({
			Recipe: newrecipe
		});

		this.setState({
			Recipes: this.state.Recipes.push(this.state.Recipe)
		});


		// Storing the Recipes array in the Local web storage
		localStorage.setItem("RecipesArray", JSON.stringify(this.state.Recipes));
		console.log(this.state.Recipes);
		//Page is redirected to Home page on clicking the Submit buttons!
		this.props.history.push('/Home');
	}

	//This method is called on onChange event
	handleName(event){
		let newrecipe = this.state.Recipe;
		newrecipe.Name = event.target.value;
		this.setState({
			Recipe: newrecipe
		})
	}

	onImageDrop(files){
		this.setState({
		      uploadedFile: files[0]
		    });

		    this.handleImageUpload(files[0]);
		}

	handleImageUpload(file) {
		    let upload = request.post(CLOUDINARY_UPLOAD_URL)
		                      	 .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
		                        .field('file', file);

		    upload.end((err, response) => {
		      if (err) {
		        console.error(err);
		      }

		      if (response.body.secure_url !== '') {
		        this.setState({
		          uploadedFileCloudinaryUrl: response.body.secure_url
		        });
		      }
		    });
		  }


	render(){
		return(
			<div className="container">
			<div className="page-header">
			<h2> <b>Add a Recipe </b></h2>

			<Dropzone  className="dropzone" multiple={false} accept="image/*" onDrop={this.onImageDrop}>
			      <p>Drop an image or click to select a file to upload.</p>
			</Dropzone>
			{this.state.uploadedFileCloudinaryUrl === '' ? null :
	        <div>
	          <p>{this.state.uploadedFile.name}</p>
	          <img alt = {this.state.uploadedFile.name} src={this.state.uploadedFileCloudinaryUrl} />
	        </div>}

			</div>
			  <div className="row">
			  <div className="col-xs-12"></div>
			  <div className="col-sm-12"></div>
			    
			  <form>

			  	<div className="form-group">
				  	<label>Recipe Name </label>
				  	<input className="form-control" type ="text" id ="usr" ref={input => this.name = input} placeholder="Enter Recipe Name" onChange ={this.handleName.bind(this)} />
		  		</div>

		  		<div className="form-group">
				  	<label>Recipe Description </label>
				  	<textarea className="form-control" type ="text" id ="desc"  ref={input => this.desc = input} placeholder="Enter Recipe Description" />
		  		</div>
		  		 <IngredientList Recipe = {this.state.Recipe}/>
		  		 <Ingredients addIngredients = {this.addIngredients} />
			    <button type = "button" className = "btn btn-info" onClick ={this.SubmitRecipe}>Submit</button>
			   </form>
		    </div>
		    </div>
			
			);
	}
}	