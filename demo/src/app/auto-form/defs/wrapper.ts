export const wrapper = {
'schema': `
title: wrapper
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
- type: wrapper
  title: wrapperHeader
  openLabel: open
  closeLabel: close
  open: true
  items:
  - type: section
    direction: row
    closedView: true
    items:
      - type: label
        id: viewFuncSample
        viewFunc: viewFunc
        trueLabel: trueLabel
        falseLabel: falseLabel
        flex: 1 1 auto
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
