import { h, FunctionalComponent, JSX, Attributes } from 'preact'
import styles from './input.css'

export type InputProps = {
  id: string
  label: string
  inputProps: h.JSX.HTMLAttributes<HTMLInputElement>
}
export const Input: FunctionalComponent<InputProps> = ({
  id,
  label,
  inputProps
}) => {
  return (
    <label className={styles.wrap} htmlFor={id}>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} id={id} {...inputProps}></input>
    </label>
  )
}
