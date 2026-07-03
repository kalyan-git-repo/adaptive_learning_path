package com.learningpathbuilder.apis.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "canvas_edges")
public class CanvasEdge {
    @Id
    private String id; // Matches the React frontend string ID
    private String source;
    private String target;
    private String label;
}
