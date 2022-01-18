import axios from 'axios';

const Book_API_BASE_URL = "http://localhost:8080/api/v1/books";

class BookService {

    getBooks(){
        return axios.get(Book_API_BASE_URL);
    }

    getBookById(bookId){
        return axios.get(Book_API_BASE_URL + '/' + bookId);
    }

    getBookByTitleAndAuthor(title, author){
	return axios.get(Book_API_BASE_URL + '/' + title + '/' + author );
    }

    /*findBooks(book){
        return axios.get(Book_API_BASE_URL+'?', book);
    }*/

    createBook(book){
        return axios.post(Book_API_BASE_URL, book);
    }

    updateBook(bookId, book){
        return axios.put(Book_API_BASE_URL + '/' + bookId, book);
    }

    deleteBook(bookId){
        return axios.delete(Book_API_BASE_URL + '/' + bookId);
    }
}

export default new BookService();
