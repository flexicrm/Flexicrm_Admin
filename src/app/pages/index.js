"use client"
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import DraggableForm from "../../app/pages"
import { useState } from 'react';

const Home = () => {
  const [items, setItems] = useState([{ id: 'draggableForm', content: 'Drag Me' }]);

  const onDragEnd = (result) => {
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex' }}>
        {items.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  padding: '20px',
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  margin: '20px',
                  width: '100px',
                  cursor: 'grab',
                  ...provided.draggableProps.style,
                }}
              >
                {item.content}
              </div>
            )}
          </Draggable>
        ))}
        <DraggableForm />
      </div>
    </DragDropContext>
  );
};

export default Home;
