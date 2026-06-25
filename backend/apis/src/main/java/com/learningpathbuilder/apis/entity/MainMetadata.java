package com.learningpathbuilder.apis.entity;


import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;



@Embeddable
public class MainMetadata {
     // Skips "metadataTwo" and flattens fields directly to this object
    @Embedded
    private Assessment assessment;

    @Embedded
    private Unit unit;

    public MainMetadata() {
    }
    
     // Standard Getter
    public Assessment getAssessment() {
        return assessment;
    }

    // Standard Setter
    public void setAssessment(Assessment assessment) {
        // Optional: Defensive null check or initialization can go here
        this.assessment = assessment;
    }

    public Unit getUnit() {
        return unit;
    }

    // Standard Setter
    public void setUnit(Unit unit) {
        // Optional: Defensive null check or initialization can go here
        this.unit = unit;
    }
}
