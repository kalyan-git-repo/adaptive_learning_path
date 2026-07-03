import React, { useState, } from 'react';
import { type CustomConfigNode } from '../interfaces/customNode';

// Define the interface for the Node and expected onSave payload

interface EditNodeModalProps {
  node: CustomConfigNode;
  onClose: () => void;
  onSave: (updatedNode: CustomConfigNode) => void;
}

export default function EditNodeModal({ node, onClose, onSave }: EditNodeModalProps) {
  // Initialize state with existing node properties
  const [nodeSpecificId, setnodeSpecificId] = useState<string>(node.nodeSpecificId || '');
  const [type, setType] = useState<string>(node.type || '');
  const [componentId, setComponentId] = useState<string>(node.componentId?.toString() || '');
  const [label, setLabel] = useState<string>(node.data?.label || '');
  const [duration, setDuration] = useState<number | string>(node.config?.approximateDurationMinutes || 0);
  const [maxScore, setMaxScore] = useState<number | string>(node.config?.assessment?.maxScore || 0);
  const [passingScore, setPassingScore] = useState<number | string>(node.config?.assessment?.passingScore || 0);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Construct the updated structure package
    onSave({
      nodeSpecificId: nodeSpecificId,
      id: node.id,
      type: type,
      position: node.position,
      componentId,
      data: {
        label: label
      },
      config: {
        approximateDurationMinutes: Number(duration),
        assessment: {
          maxScore: Number(maxScore),
          passingScore: Number(passingScore)
        }
      }
    });
  };

  return (
    <div className="modal-overlay" style={modalStyles.overlay}>
      <div className="modal-content" style={modalStyles.content}>
        <h3>Edit Node: {node.id}</h3>
        <form onSubmit={handleSubmit}>

          <div style={modalStyles.inputGroup}>
            <label>Node Specific Id:</label>
            <input
              type="text" 
              value={nodeSpecificId} 
              onChange={(e) => setnodeSpecificId(e.target.value)} 
            />
          </div>

          <div style={modalStyles.inputGroup}>
            <label>Type:</label>
            <input 
              type="text"
              value={type} 
              onChange={(e) => setType(e.target.value)}
            />
          </div>

          <div style={modalStyles.inputGroup}>
            <label>Component ID:</label>
            <input 
              type="text" 
              value={componentId} 
              onChange={(e) => setComponentId(e.target.value)} 
            />
          </div>
          
          <div style={modalStyles.inputGroup}>
            <label>Label:</label>
            <input 
              type="text" 
              value={label} 
              onChange={(e) => setLabel(e.target.value)} 
            />
          </div>
          
          <div style={modalStyles.inputGroup}>
            <label>Duration (mins):</label>
            <input 
              type="number" 
              value={duration} 
              onChange={(e) => setDuration(Number(e.target.value))} 
            />
          </div>
          
          <div style={modalStyles.inputGroup}>
            <label>Max Score:</label>
            <input 
              type="number" 
              value={maxScore} 
              onChange={(e) => setMaxScore(Number(e.target.value))} 
            />
          </div>
          
          <div style={modalStyles.inputGroup}>
            <label>Passing Score:</label>
            <input 
              type="number" 
              value={passingScore} 
              onChange={(e) => setPassingScore(Number(e.target.value))} 
            />
          </div>
          
          <div style={modalStyles.actions}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Basic styling placeholder
const modalStyles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  content: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px'
  }
};
