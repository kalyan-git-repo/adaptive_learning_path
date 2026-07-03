package com.learningpathbuilder.apis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learningpathbuilder.apis.entity.CanvasEdge;

public interface EdgeRepository extends JpaRepository<CanvasEdge, String> {}
