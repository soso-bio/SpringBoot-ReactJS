package com.bookstore.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bookstore.demo.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>{
	List<Book> findByTitleOrAuthor(String title, String Author);
	
    @Query("select b from Book b where b.title = :title or b.author = :author")
	List<Book> findBooksByTitleOrAuthor(@Param("title") String title, @Param("author") String author);
}

