import { StateUpdater, useEffect, useState } from 'preact/hooks'

const getItem = <T>(key: string): T | undefined => {
  try {
    const val = localStorage.getItem(key)
    if (val) {
      return JSON.parse(val)
    }
    return undefined
  } catch (error) {
    return undefined
  }
}

const setItem = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (_e) {
    return undefined
  }
}

export const usePersistState = <T>(
  initState: T,
  key: string,
  cleanupFn: (s: T) => T = (s) => s
): [T, StateUpdater<T>] => {
  const prevState = getItem<T>(key)
  const [state, setState] = useState<T>(
    prevState !== undefined ? cleanupFn(prevState) : initState
  )
  useEffect(() => {
    setItem(key, state)
  }, [state])
  return [state, setState]
}
