package org.sergiy.quarkus.starting;

import io.quarkus.mongodb.panache.PanacheMongoEntity;

public class Book extends PanacheMongoEntity {
    public String title;
    public String author;
    public String genre;

    public Book() {}
    public Book(String title, String author, String genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
    }
}
