package com.bookstore.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.demo.exception.ResourceNotFoundException;
import com.bookstore.demo.model.Book;
import com.bookstore.demo.repository.BookRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    // get all books rest api
    @GetMapping("/books") 
	 public List < Book > getAllBooks() {
		 return bookRepository.findAll(); 
	}
    
    // get books by title or author rest api
    @GetMapping("/books/{title}/{author}")
    public ResponseEntity<List<Book>> getBooksByTitleOrAuthor(@PathVariable String title, @PathVariable String author)
    {
    	System.out.println(" title " + title + " author " + author);
    		return new ResponseEntity<List<Book>>(bookRepository.findBooksByTitleOrAuthor(title, author), HttpStatus.OK);
    }
	/*public ResponseEntity<List<Book>> getBooksByTitleOrAuthor(@PathVariable String title, @PathVariable String author) 	{
		return new ResponseEntity<List<Book>>(bookRepository.findByTitleOrAuthor(title, author), HttpStatus.OK);
	}*/
    
    
	
    // get books by all feilds rest api
    @GetMapping("/bookss")
    
    public ResponseEntity<Optional<Book>> findBooks(@RequestBody Book book) {
        Example<Book> example = Example.of(book);
        //	List<Book> bookList = bookRepository.findAll(example);
        Optional<Book> books = bookRepository.findOne(example);
        return ResponseEntity.ok(books);
    }

    // create book rest api
    @PostMapping("/books")
    public ResponseEntity < Book > createBook(@RequestBody Book bookDetails) throws Exception{       
		Book newBook = bookRepository.save(bookDetails);
	    if (newBook == null) {
	        throw new Exception();
	    } else {
	    
	        return ResponseEntity.ok(newBook);
	    }
    }

    // get book by id rest api
    @GetMapping("/books/{id}")
    public ResponseEntity < Book > getBookById(@PathVariable Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not exist with id :" + id));
        return ResponseEntity.ok(book);
    }

    // update book rest api
    @PutMapping("/books/{id}")
    public ResponseEntity < Book > updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not exist with id :" + id));
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setIsbn(bookDetails.getIsbn());
        book.setLanguage(bookDetails.getLanguage());
        book.setPrice(bookDetails.getPrice());

        Book updatedBook = bookRepository.save(book);
        return ResponseEntity.ok(updatedBook);
    }

    // delete book rest api
    @DeleteMapping("/books/{id}")
    public ResponseEntity < Map < String, Boolean >> deleteBook(@PathVariable Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not exist with id :" + id));
        bookRepository.delete(book);
        Map < String, Boolean > response = new HashMap < > ();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
