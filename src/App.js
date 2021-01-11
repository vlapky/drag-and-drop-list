import './App.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'

const testArr = Array.from({ length: 5 }, (v, k) => (
  <div>{`Игрок № ${k + 1}`}</div>
))

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 16,
  margin: `0 0 8px 0`,
  background: isDragging ? '#ed9121' : '#126ede',

  ...draggableStyle,
})

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#bdc2c7' : '#f2f3f4',
  padding: 8,
  width: 250,
})

function App() {
  const [list, updateList] = useState(testArr)
  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(list)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    updateList(items)
  }
  return (
    <div className="App">
      <h2>Список игроков</h2>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="list">
          {(provided, snapshot) => (
            <div
              className="list"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {list.map((item, index) => {
                return (
                  <Draggable key={index} draggableId={`${index}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className="item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item}
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default App
