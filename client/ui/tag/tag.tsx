import cn from 'classnames'
import { h, FunctionalComponent, JSX } from 'preact'
import styles from './tag.css'

export type TagProps = {
  appearance: 'success' | 'warn' | 'fail' | 'plain'
}
export const Tag: FunctionalComponent<TagProps> = ({
  children,
  appearance
}) => {
  return <div className={cn(styles.wrap, styles[appearance])}>{children}</div>
}
