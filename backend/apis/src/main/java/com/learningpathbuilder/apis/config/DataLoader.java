package com.learningpathbuilder.apis.config;


import com.learningpathbuilder.apis.entity.Component;
import com.learningpathbuilder.apis.repository.ComponentRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner runner(ComponentRepository componentRepository) {
        return args -> {
            ObjectMapper mapper = new ObjectMapper();
            TypeReference<List<Component>> typeReference = new TypeReference<List<Component>>(){};
            InputStream inputStream = TypeReference.class.getResourceAsStream("/json/AvailableContextExample.json");
            
            try {
                List<Component> users = mapper.readValue(inputStream, typeReference);
                componentRepository.saveAll(users);
                System.out.println("JSON Data successfully saved to H2 Database!");
            } catch (Exception e) {
                System.out.println("Unable to save users: " + e.getMessage());
            }
        };
    }
}

