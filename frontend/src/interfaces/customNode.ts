
import {
  type Node,
} from '@xyflow/react';


type Assessment = {
  maxScore: number;
  passingScore: number;
}

type MyNodeConfig = {
  approximateDurationMinutes: number;
  assessment: Assessment;
};

// 2. Define your standard node data type
export type NodeData = {
  label: string;
};

// 3. Extend the base Node type to accept your custom property outside of 'data'
export type CustomConfigNode = Node<{
  label: string;
}, string> & {
  config: MyNodeConfig;
  componentId: string;
  type: string;
  nodeSpecificId: string
};