package com.example.sqlConnection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/geek")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @PostMapping(path = "/addBook")
    public @ResponseBody String addBooks (@RequestParam String bookName, @RequestParam String isBnNumber){
        Book book = new Book();
        book.setBookName(bookName);
        book.setIsbnNumber(isBnNumber);
        bookRepository.save(book);
        return "Detail got saved";
    }

    @GetMapping(path = "/book")
    public @ResponseBody Iterable<Book> getAllUsers(){
        return bookRepository.findAll();
    }
}
