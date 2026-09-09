import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

function hashTarget(hash) {
  if (!hash) return null
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)))
  } catch {
    return null
  }
}

function focusDestination(target) {
  if (!target) return
  // Section anchors also need to receive programmatic focus without joining Tab order.
  if (!target.hasAttribute('tabindex') && target.tabIndex < 0) target.tabIndex = -1
  target.focus({ preventScroll: true })
}

export default function useRouteNavigation() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const previous = useRef(null)
  const positions = useRef(new Map())

  useLayoutEffect(() => {
    const restoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    function rememberPosition() {
      if (previous.current) {
        positions.current.set(previous.current.key, { left: window.scrollX, top: window.scrollY })
      }
    }
    window.addEventListener('scroll', rememberPosition, { passive: true })
    return () => {
      window.history.scrollRestoration = restoration
      window.removeEventListener('scroll', rememberPosition)
    }
  }, [])

  useLayoutEffect(() => {
    const from = previous.current
    const pathnameChanged = from && from.pathname !== location.pathname
    const hashNavigation = location.hash && (!from || pathnameChanged || from.hash !== location.hash
      || (from.key !== location.key && from.search === location.search))
    const saved = navigationType === 'POP' && positions.current.get(location.key)
    previous.current = location

    if (pathnameChanged || hashNavigation) {
      const target = hashTarget(location.hash)
      focusDestination(target ?? document.getElementById('main-content'))
      if (saved) {
        window.scrollTo({ ...saved, behavior: 'instant' })
      } else if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' })
      } else {
        window.scrollTo({ left: 0, top: 0, behavior: 'instant' })
      }
    } else if (from && from.key !== location.key && saved) {
      // Back/Forward between filter entries restores scroll without moving focus.
      window.scrollTo({ ...saved, behavior: 'instant' })
    }
    // PUSH/REPLACE of query filters inherits the viewport; initial loads stay put.
    positions.current.set(location.key, { left: window.scrollX, top: window.scrollY })
  }, [location, navigationType])
}
