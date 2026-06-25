import { useState, useEffect } from 'react';

// Simple inline styles for demonstration
const styles  = {
  container: { margin: '20px auto', fontFamily: 'Arial, sans-serif' },
  header: { textAlign: 'center' as const, color: '#333' },
  cardContainer: { marginBottom: '12px' },
  buttonCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '16px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    border: '1px solid #d9d9d9',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left' as const,
  },
  buttonText: { pointerEvents: 'none' as const },
  fieldsDisplay: {
    padding: '16px',
    backgroundColor: '#fafafa',
    borderLeft: '4px solid #1890ff',
    borderBottom: '1px solid #e8e8e8',
    borderRight: '1px solid #e8e8e8',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
  },
  titleField: { margin: '0 0 8px 0', color: '#222', fontSize: '15px' },
  descField: { margin: '0', color: '#666', fontSize: '14px', lineHeight: '1.5' }
};

const LeftPanel = () => {
  interface Item {
    id: string | number; // Match the type of your IDs
    title: string;
    shortDescription: string;
    type: string;
    approximateDurationMinutes: number;
    maxScore?: number | null;
    passingScore?: number | null;
    recommendedMinutes?: number | null;
  }
  // State to hold the API data
  const [items, setItems] = useState<Item[]>([]);
  // State to handle loading states
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define the async fetch function
    const fetchPanelContent = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/content');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data)
        setItems(data); // Save data to state
      } catch (err) {
        if (err instanceof Error) {
           setError(err.message);
        }  else {
           setError(String(err)); // Fallback for unexpected thrown values
        }
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchPanelContent();
  }, []); // Empty dependency array means this runs once on mount

  

  // Track the active section ID (can be number or null when closed)
  const [activeItemId, setActiveItemId] = useState<string | number | null>(null);

  // Toggle section open or closed
  const handleItemClick = (id: any): void => {
    setActiveItemId(activeItemId === id ? null : id);
  };

  if (loading) return <div className="sidebar">Loading sidebar...</div>;
  if (error) return <div className="sidebar">Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Example: SAT Adaptive Test</h2>
      
      {items.map((item) => {
        const isOpen = activeItemId === item.id;
        
        return (
          <div key={item.id} style={styles.cardContainer}>
            {/* Section Card / Button */}
            <button 
              onClick={() => handleItemClick(item.id)}
              style={{
                ...styles.buttonCard,
                backgroundColor: isOpen ? '#e6f7ff' : '#ffffff',
                borderColor: isOpen ? '#1890ff' : '#d9d9d9',
              }}
              aria-expanded={isOpen}
            >
              <span style={styles.buttonText}>{item.id}</span>
              <span>{isOpen ? '▲' : '▼'}</span>
            </button>

            {/* Sectional Fields (Conditional Rendering) */}
            {isOpen && (
              <div style={styles.fieldsDisplay}>
                <h4 style={styles.titleField}>
                  <strong>Title:</strong> {item.title}
                </h4>
                <h4 style={styles.descField}>
                  <strong>shortDescription:</strong> {item.shortDescription}
                </h4>
                <h4 style={styles.descField}>
                  <strong>Type:</strong> {item.type}
                </h4>
                <h4 style={styles.descField}>
                  <strong>ApproximateDurationMinutes:</strong> {item.approximateDurationMinutes}
                </h4>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LeftPanel;
