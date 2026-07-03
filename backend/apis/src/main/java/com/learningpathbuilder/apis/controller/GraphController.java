package com.learningpathbuilder.apis.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;
import com.learningpathbuilder.apis.repository.NodeRepository;
import com.learningpathbuilder.apis.repository.EdgeRepository;
import com.learningpathbuilder.apis.dto.GraphRequestWrapper;

@RestController
@RequestMapping("/api/graph")
@CrossOrigin(origins = "http://localhost:5173") // Adjust to match React port
public class GraphController {

    private final NodeRepository nodeRepository;
    private final EdgeRepository edgeRepository;

    public GraphController(NodeRepository nodeRepository, EdgeRepository edgeRepository) {
        this.nodeRepository = nodeRepository;
        this.edgeRepository = edgeRepository;
    }

    @PostMapping("/save")
    @Transactional
    public ResponseEntity<String> saveGraph(@RequestBody GraphRequestWrapper request) {
        // Clear previous state if you are overwriting the canvas layout
        nodeRepository.deleteAllInBatch();
        edgeRepository.deleteAllInBatch();

        // Save new state
        if (request.getNodes() != null) {
            nodeRepository.saveAll(request.getNodes());
        }
        if (request.getEdges() != null) {
            edgeRepository.saveAll(request.getEdges());
        }

        return ResponseEntity.ok("Graph state saved successfully");
    }
}

