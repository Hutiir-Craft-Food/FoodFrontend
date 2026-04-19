import { useRef, useEffect } from 'react'

export const useSwipe = ({ onSwipeLeft, onSwipeRight }) => {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let startX = 0
    let endX = 0

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX
    }

    const handleTouchMove = (e) => {
      endX = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
      if (startX - endX > 50) onSwipeLeft?.()
      if (endX - startX > 50) onSwipeRight?.()
    }

    element.addEventListener('touchstart', handleTouchStart)
    element.addEventListener('touchmove', handleTouchMove)
    element.addEventListener('touchend', handleTouchEnd)

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onSwipeLeft, onSwipeRight])

  return { ref }
}
