import { h, FunctionalComponent, JSX } from 'preact'
import styles from './fieldset.css'

export const Fieldset: FunctionalComponent<{
  legend: JSX.Element | string
}> = ({ legend, children }) => {
  return (
    <fieldset className={styles.wrap}>
      <legend className={styles.legend}>{legend}</legend>
      {children}
    </fieldset>
  )
}
