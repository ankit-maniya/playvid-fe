import { ArrowSmallUpIcon, ArrowUpCircleIcon, ArrowUpIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { classNames } from '../../global/helper'


export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 lg:bottom-10 lg:right-10 z-50">
      <button
        type="button"
        name="scrollToTop"
        onClick={scrollToTop}
        className={classNames(
          isVisible ? 'opacity-100' : 'opacity-0',
          'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 inline-flex items-center rounded-full p-3 animate-bounce text-white shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2',
        )}
      >
        <ArrowSmallUpIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  )
}