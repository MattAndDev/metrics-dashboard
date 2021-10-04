import { ComponentChildren, createContext, FunctionComponent, h } from 'preact'
import { useContext } from 'preact/hooks'
import { I18nContextType } from './types'
import { strings } from './en'

const defaultValue: I18nContextType = {
  trans: strings,
  locales: ['en'],
  currentLocale: 'en'
}

export const I18nContext = createContext<I18nContextType>(defaultValue)

export const I18nProvider: FunctionComponent<{
  children: ComponentChildren
}> = ({ children }) => {
  return (
    <I18nContext.Provider value={defaultValue}>{children}</I18nContext.Provider>
  )
}

export const useI18n = (): I18nContextType => useContext(I18nContext)
