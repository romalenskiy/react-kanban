import { useState, useEffect, useRef } from 'react'

function useComponentFocused(lossFocusEvents = ['click'], onFocusLossCallback = () => {}, initialFocus = false) {
  const [isComponentFocused, setIsComponentFocused] = useState(initialFocus)
  const ref = useRef(null)

  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsComponentFocused(false)
      onFocusLossCallback()
    }
  }

  useEffect(() => {
    lossFocusEvents.forEach((event) => {
      document.addEventListener(event, handleClickOutside)
    })
    return () => {
      lossFocusEvents.forEach((event) => {
        document.removeEventListener(event, handleClickOutside)
      })
    }
  }, [])

  return [
    ref,
    isComponentFocused,
    setIsComponentFocused,
  ]
}

export default useComponentFocused
