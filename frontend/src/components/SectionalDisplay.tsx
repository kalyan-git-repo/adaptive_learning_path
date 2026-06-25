import { useState } from 'react';

// 1. Define the interface for the section data structure
interface Section {
  id: string | number;
  name: string;
  title: string;
  description: string;
}

// Simple inline styles for demonstration
const styles  = {
  container: { maxWidth: '500px', margin: '20px auto', fontFamily: 'Arial, sans-serif' },
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

const SectionalDisplay = () => {
  // 1. Define data structure for sections
  const sections: Section[] = [
    { id: 1, name: 'Profile Details', title: 'User Information', description: 'Manage your personal account settings and contact details here.' },
    { id: 2, name: 'Security Settings', title: 'Privacy & Credentials', description: 'Update your password, enable 2-factor authentication, and review login history.' },
  ];

  // 2. Track the active section ID (can be number or null when closed)
  const [activeSectionId, setActiveSectionId] = useState<string | number | null>(null);

  // 3. Toggle section open or closed
  const handleSectionClick = (id: any): void => {
    setActiveSectionId(activeSectionId === id ? null : id);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Interactive Sections</h2>
      
      {sections.map((section) => {
        const isOpen = activeSectionId === section.id;
        
        return (
          <div key={section.id} style={styles.cardContainer}>
            {/* Section Card / Button */}
            <button 
              onClick={() => handleSectionClick(section.id)}
              style={{
                ...styles.buttonCard,
                backgroundColor: isOpen ? '#e6f7ff' : '#ffffff',
                borderColor: isOpen ? '#1890ff' : '#d9d9d9',
              }}
              aria-expanded={isOpen}
            >
              <span style={styles.buttonText}>{section.name}</span>
              <span>{isOpen ? '▲' : '▼'}</span>
            </button>

            {/* Sectional Fields (Conditional Rendering) */}
            {isOpen && (
              <div style={styles.fieldsDisplay}>
                <h4 style={styles.titleField}>
                  <strong>Title:</strong> {section.title}
                </h4>
                <h4 style={styles.descField}>
                  <strong>shortDescription:</strong> {section.description}
                </h4>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};


export default SectionalDisplay;
