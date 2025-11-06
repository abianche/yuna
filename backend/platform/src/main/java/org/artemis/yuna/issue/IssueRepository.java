package org.artemis.yuna.issue;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class IssueRepository implements PanacheRepository<Issue> {
    // Panache gives you: listAll(), findById(), persist(), deleteById(), find(),
    // etc.
}
