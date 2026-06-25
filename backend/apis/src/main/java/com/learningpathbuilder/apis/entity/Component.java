package com.learningpathbuilder.apis.entity;

/*import org.springframework.data.annotation.Transient;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides; */
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Embedded;


@Entity
@Table(name = "components")
public class Component {

    @Id
    @Column(name = "id", nullable = false, length = 100)
    private String id;

    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @Column(name = "short_description", nullable = false, length = 280)
    private String shortDescription;

    @Column(name = "type", nullable = false, length = 50)
    private String type;

    @Column(name = "approximate_duration_minutes", nullable = false)
    private Integer approximateDurationMinutes;

    @Embedded // Marks this intermediate POJO so JPA doesn't attempt to map the wrapper as a column
    private MainMetadata metadata;

    public Component() {
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Integer getApproximateDurationMinutes() { return approximateDurationMinutes; }
    public void setApproximateDurationMinutes(Integer approximateDurationMinutes) { this.approximateDurationMinutes = approximateDurationMinutes; }

    // Standard Getter
    public MainMetadata getMetadata() {
        return metadata;
    }

    // Standard Setter
    public void setMetadata(MainMetadata metadata) {
        // Optional: Defensive null check or initialization can go here
        this.metadata = metadata;
    }
}

/* 
@Transient
    @AttributeOverrides({
    @AttributeOverride(name = "assessment.maxScore", column = @Column(name = "max_score")),
    @AttributeOverride(name = "assessment.passingScore", column = @Column(name = "passing_Score")),
    @AttributeOverride(name = "unit.recommendedMinutes", column = @Column(name = "recommended_Minutes"))
    })
*/