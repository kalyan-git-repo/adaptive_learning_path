package com.learningpathbuilder.apis.controller;

import com.learningpathbuilder.apis.entity.Component;
import com.learningpathbuilder.apis.repository.ComponentRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/content")
@CrossOrigin(origins = "http://localhost:5173") // Allows connections from your React dev server
public class ContentController {

    private final ComponentRepository contentRepository;

    // Constructor injection is preferred over field @Autowired
    public ContentController(ComponentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    @GetMapping
    public List<Component> getLeftPanelContent() {
        return contentRepository.findAll(); // Fetches all rows from the database and serializes to JSON
    }
}
