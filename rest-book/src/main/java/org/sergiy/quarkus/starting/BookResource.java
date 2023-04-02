package org.sergiy.quarkus.starting;

import org.bson.types.ObjectId;
import org.jboss.logging.Logger;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@Path("/api/books")
@Produces(MediaType.APPLICATION_JSON)
public class BookResource {

    @Inject
    BookRepository repository;
    @Inject
    Logger logger;

    @GET
    public List<Book> getAllBooks() {
        logger.info("Getting all Books...");
        return repository.listAll();
    }

    @GET
    @Path("/{id}")
    public Book getBook(@PathParam("id") String id) {
        return repository.findById(new ObjectId(id));
    }

    @POST
    public Response createBook(Book book) {
        repository.persist(book);
        try {
            return Response.created(new URI("/" + book.id)).build();
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateBook(@PathParam("id") String id, Book book) {
        book.id = new ObjectId(id);
        repository.update(book);
        return Response.ok(book).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteBook(@PathParam("id") String id) {
        Book book = repository.findById(new ObjectId(id));
        repository.delete(book);
        return Response.noContent().build();
    }

}