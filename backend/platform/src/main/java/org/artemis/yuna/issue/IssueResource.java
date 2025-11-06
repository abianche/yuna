package org.artemis.yuna.issue;

import java.net.URI;
import java.util.List;

import org.artemis.yuna.issue.dto.IssueCreateRequest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/issues")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class IssueResource {

    @Inject
    IssueRepository repo;

    @GET
    public List<Issue> list() {
        // ORDER BY created_at desc if you like:
        return repo.list("order by createdAt desc");
    }

    @GET
    @Path("/{id}")
    public Issue get(@PathParam("id") Long id) {
        Issue issue = repo.findById(id);
        if (issue == null)
            throw new NotFoundException("Issue " + id + " not found");
        return issue;
    }

    @POST
    @Transactional
    public Response create(@Valid IssueCreateRequest req) {
        if (repo.find("key", req.key).firstResultOptional().isPresent()) {
            throw new ClientErrorException("Key already exists: " + req.key, 409);
        }
        Issue i = new Issue();
        i.key = req.key;
        i.title = req.title;
        i.description = req.description;
        i.assignee = req.assignee;
        i.reporter = req.reporter;

        repo.persist(i);
        return Response.created(URI.create("/api/issues/" + i.id)).entity(i).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        if (!repo.deleteById(id))
            throw new NotFoundException("Issue " + id + " not found");
    }
}
