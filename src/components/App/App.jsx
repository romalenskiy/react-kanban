import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import uuidv4 from 'uuid/v4'

import { LANES_SEED } from '../../constants'

import Lane from '../Lane'
import AddNew from '../AddNew'

function App() {
  const [lanes, setLanes] = useState(LANES_SEED)

  function onNewLaneAdd(name) {
    const id = uuidv4()

    setLanes([...lanes, { id, name: name.trim(), cards: [] }])
  }

  function onNewCardAdd(laneId, task) {
    const id = uuidv4()
    const updatedLanes = lanes.map((lane) => {
      if (lane.id === laneId) {
        return { ...lane, cards: [...lane.cards, { id, task: task.trim() }] }
      }
      return lane
    })

    setLanes(updatedLanes)
  }

  function onCardDragEnd(result) {
    const { source, destination, draggableId } = result

    // When card dropped out of the lane
    if (!destination) return null

    // When location of the draggable didn't change
    if (destination.droppableId === source.droppableId && destination.index === source.index) return null

    // Perform card move
    let updatedLanes

    if (destination.droppableId === source.droppableId) {
      updatedLanes = lanes.map((lane) => {
        if (lane.id === destination.droppableId) {
          const firstCard = lane.cards[source.index]
          const secondCard = lane.cards[destination.index]
          const updatedCards = [...lane.cards]
          updatedCards.splice(source.index, 1, secondCard)
          updatedCards.splice(destination.index, 1, firstCard)

          return { ...lane, cards: updatedCards }
        }
        return lane
      })
    } else {
      let movingCard = null

      for (let index = 0; index < lanes.length; index += 1) {
        movingCard = lanes[index].cards.find(card => card.id === draggableId)
        if (movingCard) break
      }

      updatedLanes = lanes.map((lane) => {
        if (lane.id === source.droppableId) {
          const updatedCards = lane.cards.filter(card => (card.id !== draggableId))
          return { ...lane, cards: updatedCards }
        }

        if (lane.id === destination.droppableId) {
          const cardsWithLessIndex = []
          const cardsWithEqualOrMoreIndex = []

          lane.cards.forEach((card, index) => {
            if (index < destination.index) {
              cardsWithLessIndex.push(card)
            } else if (index >= destination.index) {
              cardsWithEqualOrMoreIndex.push(card)
            }
          })

          const updatedCards = [...cardsWithLessIndex, movingCard, ...cardsWithEqualOrMoreIndex]
          return { ...lane, cards: updatedCards }
        }

        return lane
      })
    }

    setLanes(updatedLanes)
  }

  return (
    <DragDropContext onDragEnd={onCardDragEnd}>
      <div className="row app">
        {Boolean(lanes.length) && lanes.map((lane) => {
          const { id, name, cards } = lane
          return <Lane key={id} id={id} name={name} cards={cards} onNewCardAdd={onNewCardAdd.bind(null, id)} />
        })}

        <AddNew type="lane" onAdd={onNewLaneAdd} />
      </div>
    </DragDropContext>
  )
}

export default App
