import { useState, useEffect, useRef } from 'react'

function useComponentFocused(lossFocusEvents = ['click'], onFocusLossCallback = () => {}, initialFocus = false) {
  const [isComponentFocused, setIsComponentFocused] = useState(initialFocus)
  const ref = useRef()

  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsComponentFocused(false)
      onFocusLossCallback()
    }
  }

  useEffect(() => {
    lossFocusEvents.forEach((event) => {
      document.addEventListener(event, handleClickOutside, true) // third argument explanation https://stackoverflow.com/a/17564517
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
