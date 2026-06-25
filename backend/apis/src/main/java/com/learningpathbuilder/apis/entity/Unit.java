package com.learningpathbuilder.apis.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Unit {

    // Metadata properties specific to Units
    @Column(name = "recommended_minutes")
    private Integer recommendedMinutes;

    public Unit() {
    }

    // Getters and setters

    public Integer getRecommendedMinutes() { return recommendedMinutes; }
    public void setRecommendedMinutes(Integer recommendedMinutes) { this.recommendedMinutes = recommendedMinutes;}
}
