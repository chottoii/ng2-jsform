export const validation = {
'schema': `
title: validationTest
type: object
properties:
  string_para:
    type: string
    minLength: 4
    maxLength: 8
    enum:
      - abcd
      - efgh
  age:
    type: number
    minimum: 0
    exclusiveMaximum: 999
  email:
    type: string
    format: email
  oneOfNumber:
    type: number
    oneOf:
      - multipleOf: 5
      - multipleOf: 3
  anyOfNumber:
    type: number
    anyOf:
      - multipleOf: 5
      - multipleOf: 3
  notNumber:
    type: number
    not:
      - multipleOf: 5
      - multipleOf: 3
  allOfNumber:
    type: number
    allOf:
      - multipleOf: 4
      - maximum: 20
      - minimum: 0
  searchKeyword:
    title: searchKeyword
    type: array
    minItems: 2
    maxItems: 4
    items:
      type: object
      properties:
        keyword:
          type: string
      required:
        - keyword
required:
  - string_para
  - number_para
`,
'layout': `
- type: section
  direction: row
  items:
  - type: input
    title: enum
    key: string_para
    flex: 1 1 auto
  - type: input
    title: over 0
    key: age
    flex: 1 1 auto
  - type: input
    title: format(email)
    key: email
    flex: 1 1 auto
- type: section
  direction: row
  items:
  - type: input
    title: allOfNumber
    key: allOfNumber
    flex: 1 1 auto
    hint: hintAllOfNumber
    hintPosition: start
  - type: input
    title: oneOfNumber
    key: oneOfNumber
    flex: 1 1 auto
    hint: hintOneOfNumber
    hintPosition: start
  - type: input
    title: anyOfNumber
    key: anyOfNumber
    flex: 1 1 auto
    hint: hintAnyOfNumber
    hintPosition: start
- type: section
  direction: row
  items:
  - type: input
    title: notNumber
    key: notNumber
    flex: 1 1 auto
    hint: hintNotNumber
    hintPosition: start
- type: array
  title: 検索キーワード
  key: searchKeyword
  direction: row
  items:
  - type: section
    direction: row
    items:
    - type: icon
      kind: add
      icon: add_circle_outline
      target: searchKeyword
      flex: 1 1 auto
    - type: icon
      kind: remove
      icon: remove_circle_outline
      target: searchKeyword
      flex: 1 1 auto
    - type: input
      key: keyword
      title: type
      hint: hint
      hintPosition: end
      flex: 8 8 auto
- type: section
  items:
  - type: button
    title: search
    kind: submit
    color: primary
  - type: button
    title: clear
    kind: clear
    color: basic
`,
'data': {
  'string_para': 'abcd',
  'age': null,
  'email': null,
  'oneOfNumber': null,
  'anyOfNumber': null,
  'notNumber': null,
  'allOfNumber': null,
  'searchKeyword': [
    {
      'keyword': 'suzuki'
    },
    {
      'keyword': 'tanaka'
    }
  ]
}}
