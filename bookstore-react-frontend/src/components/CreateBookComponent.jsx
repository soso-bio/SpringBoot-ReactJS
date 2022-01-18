
import React, { Component } from 'react'
import BookService from '../services/BookService';

class CreateBookComponent extends Component {
    constructor(props) {
        super(props)

	this.state = {
		id: this.props.match.params.id,
        		title: '',
        		author: '',
        		isbn: '',
        		language: '',
        		price: ''
        }
        
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
        this.changeIsbnHandler = this.changeIsbnHandler.bind(this);
        this.changeLanguageHandler = this.changeLanguageHandler.bind(this);
        this.changePriceeHandler = this.changePriceHandler.bind(this);
        this.saveOrUpdateBook = this.saveOrUpdateBook.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
	//console.log('id => ' + JSON.stringify(this.state.id));
            return
        }else{
            BookService.getBookById(this.state.id).then( (res) =>{
                 let book = res.data;
                 this.setState({id:book.id, title:book.title,
		author: book.author,
                 isbn: book.isbn,
                 language: book.language,
		price: book.price
                });
            });
        }        
    }


    saveOrUpdateBook = (e) => {
        e.preventDefault();
        //console.log('book => ' + JSON.stringify(book));
        if(this.state.id === '_add'){
        	   console.log('id => ' + JSON.stringify(this.state.id));

        	   let book = {title: this.state.title, author: this.state.author, isbn: this.state.isbn, language: this.state.language, price: this.state.price };
	   console.log('book => ' + JSON.stringify(book));

            BookService.createBook(book).then(res =>{
                this.props.history.push('/books');
            });
        }else{
	        
        	    let book = {id: this.state.id, title: this.state.title, author: this.state.author, isbn: this.state.isbn, language: this.state.language, price: this.state.price };
	    //console.log('book => ' + JSON.stringify(book));

            BookService.updateBook(this.state.id, book).then( res =>{
                this.props.history.push('/books');
            });
        }
    }
    
    changeTitleHandler= (event) => {
        this.setState({title: event.target.value});
    }

    changeAuthorHandler= (event) => {
        this.setState({author: event.target.value});
    }

    changeIsbnHandler= (event) => {
        this.setState({isbn: event.target.value});
    }

    changeLanguageHandler= (event) => {
        this.setState({language: event.target.value});
    }

    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }

    cancel(){
        this.props.history.push('/books');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Book</h3>
        }else{
            return <h3 className="text-center">Update Book</h3>
        }
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Title: </label>
                                            <input placeholder="Title" name="title" className="form-control" 
                                                value={this.state.title} onChange={this.changeTitleHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Author: </label>
                                            <input placeholder="Author" name="author" className="form-control" 
                                                value={this.state.author} onChange={this.changeAuthorHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> ISBN: </label>
                                            <input type="text" placeholder="ISBN" name="isbn" className="form-control" 
                                                value={this.state.isbn} onChange={this.changeIsbnHandler}/>
                                        </div>

					<div className = "form-group">
                                            <label> Language: </label>
                                            <input placeholder="Language" name="language" className="form-control"
                                                value={this.state.language} onChange={this.changeLanguageHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="price" className="form-control"
                                                value={this.state.price} onChange={this.changePriceHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateBook}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}


    
export default CreateBookComponent;


