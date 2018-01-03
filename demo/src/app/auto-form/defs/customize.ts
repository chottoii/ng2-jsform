export const customize = {
'schema': `
title: カスタムWidget
type: object
properties:
  simpleSchema:
    type: string
    minLength: 4
required:
  - simpleSchema
`,
'layout': `
- type: inputWithRemarks
  key: simpleSchema
  title: simpleSchema
  remarks: simpleNote
- type: section
  direction: row
  items:
  - type: button
    title: regist
    kind: submit
    color: primary
`,
'data': {
  'simpleSchema': '規定の入力データ'
 }
}
