export const structured = {
  'schema': `
  title: structured
  description: 構造化スキーマ
  type: object
  properties:
    firstName:
      type: string
    structured:
      type: object
      properties:
        prop:
          type: string
  required:
    - firstName
  `,
  'layout': `
  - type: section
    direction: row
    items:
    - type: input
      key: firstName
      title: firstName
    - type: input
      key: structured.prop
      title: properties
  - type: section
    direction: row
    items:
    - type: button
      title: regist
      kind: submit
      color: primary
  `,
  'data': {
    'firstName': '鈴木',
    'structured': {
      'prop': 'プロパティ値'
    }
  }
}
