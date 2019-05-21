import React from 'react'

import Task from '../Task'
import plusIcon from '../../assets/img/plusIcon.svg'

function Lane() {
  return (
    <div className="column lane">
      <div className="lane__header">New lane</div>

      <div className="lane__body">
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </div>

      <div className="lane__footer">
        <div className="row new-task">
          <img className="new-task__icon" src={plusIcon} alt="New task" />
          <div className="new-task__text">Добавить еще одну карточку</div>
        </div>
      </div>
    </div>
  )
}

export default Lane
