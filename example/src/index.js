import merge from 'lodash/merge'

import styles from './index.scss'

console.log(styles)

const foo = (a, b) => merge(a, b)

foo({}, { a: true })
