import LeftPanel from "./leftPanel";
import SectionalDisplay from "./SectionalDisplay";

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ borderRight: '1px solid #ccc', padding: '15px', width: '200px', display: "flex", flexDirection: 'column', gap: "10px" }}>
      <div style={{ fontWeight: 'bold', textAlign: "left" }}>Add Components</div>

      <div style={{fontSize: 'small', textAlign: "left"}}>Drag or click to add to canvas</div>

      <div
        className="dndnode input"
        draggable
        onDragStart={(e) => onDragStart(e, 'Section')}
        style={{ padding: '10px', border: '1px solid #0041d0', borderRadius: '4px', cursor: 'grab', marginBottom: '10px' }}
      >

      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
      <img src="src/assets/section.png" alt="Company Logo" style={{
        width: "36px",
        height: "36px",
        objectFit: "contain",
        display: "inline-block",
        verticalAlign: "middle"
        }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <p>Section</p>
        <span style={{fontSize: 'small'}}>Add a quiz/</span>
        <span style={{fontSize: 'small'}}>assessment section</span>  
      </div>
      </div>
      </div>
      

      <div
        className="dndnode default"
        draggable
        onDragStart={(e) => onDragStart(e, 'Group')}
        style={{ padding: '10px', border: '1px solid #1a192b', borderRadius: '4px', cursor: 'grab' }}
      >
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
      <img src="src/assets/group.png" alt="Company Logo" style={{
        width: "36px",
        height: "36px",
        objectFit: "contain",
        display: "inline-block",
        verticalAlign: "middle"
        }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <p>Group</p>
        <span style={{fontSize: 'small'}}>Group sections for</span>
        <span style={{fontSize: 'small'}}>conditional routing</span>  
      </div>
      </div>
      </div>
      <LeftPanel/>
    </aside>
  );
}