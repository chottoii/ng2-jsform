export const simpleRow = {
'schema': `
title: simpleRow
description: シンプルな例 行
type: object
properties:
  firstName:
    type: string
  lastName:
    type: string
  age:
    description: Age in years
    type: integer
    minimum: 0
required:
  - firstName
  - lastName
`,
'layout': `
- type: section
  direction: row
  items:
  - type: input
    key: firstName
    title: firstName
    flex: 1 1 auto
  - type: input
    key: lastName
    title: lastName
    flex: 1 1 auto
  - type: input
    key: age
    title: age
    flex: 1 1 auto
- type: section
  direction: row
  items:
  - type: button
    title: regist
    kind: submit
    color: primary
`,
'data': {
  'firstName': '',
  'lastName': '',
  'age': null
  }
}
