package com.learningpathbuilder.apis.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.learningpathbuilder.apis.entity.CanvasNode;

public interface NodeRepository extends JpaRepository<CanvasNode, String> {}