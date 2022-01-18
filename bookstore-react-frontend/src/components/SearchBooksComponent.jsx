
import React, { Component } from 'react'
import BookService from '../services/BookService';

class SearchBooksComponent extends Component {
    constructor(props) {
        super(props)

	this.state = {
		books:[],
        		title: '',
        		author: ''   		
        }
        
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
        this.searchBooks = this.searchBooks.bind(this);
    }

    componentDidMount(){ 
            return   
    }


    searchBooks = (e) => {
        e.preventDefault();
	if (!this.state.title) {
      		this.state.title = 'null';
    	}
	if (!this.state.author) {
      		this.state.author = 'null';
    	}

         BookService.getBookByTitleAndAuthor(this.state.title, this.state.author).then((res) => {
            this.setState({ books: res.data});
        });
    }
    
    deleteBook(id){
        BookService.deleteBook(id).then( res => {
            this.setState({books: this.state.books.filter(book => book.id !== id)});
        });
    }

    viewBook(id){
        this.props.history.push(`/view-book/${id}`);
    }

    editBook(id){
        this.props.history.push(`/add-book/${id}`);
    }

    changeTitleHandler= (event) => {
        this.setState({title: event.target.value});
    }

    changeAuthorHandler= (event) => {
        this.setState({author: event.target.value});
    }

    cancel(){
        this.props.history.push('/books');
    }

    getTitle(){
            return <h3 className="text-center"> Search Books </h3>
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

                                        <button className="btn btn-success" onClick={this.searchBooks}>Find</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                   </div>
            <div>
                 <h2 className="text-center">Search Results</h2>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                        <thead>
                        	       <th>Title</th>
                                <th>Author</th>
                                <th>ISBN</th>
                                <th>Language</th>
                                <th>Price</th>
			       <th>Action</th>
                         </thead>
                            <tbody>
                                {
                                    this.state.books.map(
                                        book => 
                                            <tr key={book.id}>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.isbn}</td>
                                            <td>{book.language}</td>
                                            <td>{book.price}</td>
                                             <td>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.editBook(book.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBook(book.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewBook(book.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                 </div>
            </div>
          </div>
        )
    }
}
    
export default SearchBooksComponent;


