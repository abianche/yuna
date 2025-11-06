package org.artemis.yuna.issue.dto;

import jakarta.validation.constraints.NotBlank;

public class IssueCreateRequest {
    @NotBlank
    public String key;
    @NotBlank
    public String title;
    public String description;
    public String assignee;
    public String reporter;
}
