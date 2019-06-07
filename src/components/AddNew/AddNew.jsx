import React, { useState } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'

import { doAddLane } from '../../action_creators/lanes'
import { doAddCard } from '../../action_creators/cards'

import useControlledInput from '../../customHooks/useControlledInput'

import plusIcon from '../../assets/img/plusIcon.svg'
import crossIcon from '../../assets/img/crossIcon.svg'

function AddNew({ type, laneId, onAdd }) {
  const [value, setValue, isValueValid] = useControlledInput()
  const [isAdding, setIsAdding] = useState(false)

  function onAddNewClick() {
    setIsAdding(true)
  }

  function onAddNewClose() {
    setIsAdding(false)
    setValue('')
  }

  function onAddNewFinish() {
    if (!isValueValid) return

    onAdd(value, laneId)
    onAddNewClose()
  }

  function onInputChange(e) {
    setValue(e.target.value)
  }

  function onInputKeyDown(e) {
    const { key, shiftKey } = e

    switch (true) {
      case (shiftKey && key === 'Enter'): {
        break
      }

      case (key === 'Enter'): {
        onAddNewFinish()
        break
      }

      case (key === 'Escape' || key === 'Esc'): {
        onAddNewClose()
        break
      }

      default:
        break
    }
  }

  const laneOrCardAccusative = type === 'lane' ? 'колонку' : 'карточку'
  const laneOrCardGenitive = type === 'lane' ? 'колонки' : 'карточки'

  const textFieldProps = {
    placeholder: `Введите название ${laneOrCardGenitive}`,
    value,
    onChange: onInputChange,
    onKeyDown: onInputKeyDown,
    autoFocus: true,
  }

  return (
    isAdding
      ? (
        <div className={`column add-new add-new_${type} add-new__form`}>
          {type === 'lane' ? <input className="box input add-new__input" type="text" {...textFieldProps} /> : <textarea className="box textarea add-new__textarea" rows="2" {...textFieldProps} />}
          <div className="row add-new__buttons">
            <button className="button add-new__button" type="button" disabled={!isValueValid} onClick={onAddNewFinish}>{`Добавить ${laneOrCardAccusative}`}</button>
            <img className="add-new__icon-cross" src={crossIcon} alt="Close" onClick={onAddNewClose} />
          </div>
        </div>
      )

      : (
        <div className={`row add-new add-new_${type} add-new__placeholder-${type}`} onClick={onAddNewClick}>
          <img className="add-new__icon-add" src={plusIcon} alt={`New ${type}`} />
          <div className="add-new__text">{`Добавить еще одну ${laneOrCardAccusative}`}</div>
        </div>
      )

  )
}

function mapDispatchToProps(dispatch, props) {
  return {
    onAdd: (value, laneId) => dispatch(props.type === 'lane' ? doAddLane(value) : doAddCard({ laneId, cardId: uuid(), task: value })),
  }
}

const ConnectedAddNew = connect(null, mapDispatchToProps)(AddNew)

export default ConnectedAddNew
