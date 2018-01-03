export const simpleColumn = {
'schema': `
title: simpleColumn
description: シンプルな例
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
- type: input
  key: firstName
  title: firstName
- type: input
  key: lastName
  title: lastName
- type: input
  key: age
  title: age
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
