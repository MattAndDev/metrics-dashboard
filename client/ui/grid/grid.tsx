import { h, FunctionalComponent } from 'preact'
import styles from './grid.css'

export const Grid: FunctionalComponent = ({ children }) => {
  return <div className={styles.wrap}>{children}</div>
}
