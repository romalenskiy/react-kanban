import React, { useState } from 'react'

import useControlledInput from '../../customHooks/useControlledInput'

import plusIcon from '../../assets/img/plusIcon.svg'
import crossIcon from '../../assets/img/crossIcon.svg'

function AddNew({ type, onAdd }) {
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

    onAdd(value)
    onAddNewClose()
  }

  function onInputChange(e) {
    setValue(e.target.value)
  }

  function onInputKeyDown(e) {
    if (e.key === 'Enter') { onAddNewFinish() }
    if (e.key === 'Escape' || e.key === 'Esc') { onAddNewClose() }
  }

  const laneOrCardAccusative = type === 'lane' ? 'колонку' : 'карточку'
  const laneOrCardGenitive = type === 'lane' ? 'колонки' : 'карточки'

  return (
    isAdding
      ? (
        <div className={`column add-new add-new_${type} add-new__form`}>
          <input className="box input add-new__input" type="text" placeholder={`Введите название ${laneOrCardGenitive}`} value={value} onChange={onInputChange} onKeyDown={onInputKeyDown} autoFocus />
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

export default AddNew
