package com.learningpathbuilder.apis.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "canvas_nodes")
public class CanvasNode {
    @Id
    private String id; // Matches the React frontend string ID
    private String type;
    private String label;
    private double x;
    private double y;
}
