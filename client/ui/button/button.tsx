import { h, FunctionalComponent, JSX } from 'preact'
import styles from './button.css'

export type ButtonProps = h.JSX.HTMLAttributes<HTMLButtonElement>
export const Button: FunctionalComponent<ButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <button className={styles.wrap} {...rest}>
      {children}
    </button>
  )
}
