package com.learningpathbuilder.apis.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.List;
import com.learningpathbuilder.apis.entity.CanvasNode;
import com.learningpathbuilder.apis.entity.CanvasEdge;

@Getter
@Setter
@NoArgsConstructor
public class GraphRequestWrapper {
    private List<CanvasNode> nodes;
    private List<CanvasEdge> edges;
}
