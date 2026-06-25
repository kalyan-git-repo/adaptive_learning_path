package com.learningpathbuilder.apis.repository;

import com.learningpathbuilder.apis.entity.Component;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ComponentRepository extends JpaRepository<Component, String> {
}
