import React, { Component } from 'react'
import BookService from '../services/BookService'

class ListBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                books: []
	       
        }
        this.addBook = this.addBook.bind(this);
        this.editBook = this.editBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.searchBook = this.searchBook.bind(this);
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
    addBook(){
        this.props.history.push(`/add-book/_add`);
    }
    searchBook(){
	this.props.history.push(`/search-books`);
    }

    componentDidMount(){
        BookService.getBooks().then((res) => {
            this.setState({ books: res.data});
        });
    }


    render() {
        return (
            <div>
                 <h2 className="text-center">Books List</h2>
                 <div className = "col">
                    <button className="btn btn-primary" onClick={this.addBook}> Add Book</button>
		   <button className="btn btn-primary" onClick={this.searchBook}> Search Book</button>
                 </div>
		
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
        )
    }
}

export default ListBookComponent;


