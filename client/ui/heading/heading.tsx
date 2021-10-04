import { h, FunctionalComponent, JSX } from 'preact'
import styles from './heading.css'

export type HeadingProps = {
  level?: '1' | '2' | '3'
}
export const Heading: FunctionalComponent<HeadingProps> = ({
  children,
  level = '2'
}) => {
  const Elem = `h${level}` as unknown as keyof JSX.IntrinsicElements
  return <Elem className={styles.wrap}>{children}</Elem>
}
