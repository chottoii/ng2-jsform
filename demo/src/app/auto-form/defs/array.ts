export const array = {
'schema': `
id: 06_nested
title: nested Arrays
type: object
properties:
  tiers:
    title: Tiers (required—max 3)
    type: array
    maxItems: 3
    items:
      min_amount:
        type: integer
      max_amount:
        type: integer
required:
  - tiers
`,
'layout': `
- type: array
  key: tiers
  items:
  - type: section
    direction: row
    items:
    - type: icon
      kind: add
      icon: add_circle_outline
      target: tiers
      flex: 1 1 auto
    - type: icon
      kind: remove
      icon: remove_circle_outline
      target: tiers
      flex: 1 1 auto
    - type: input
      key: min_amount
      title: min_amount
      flex: 8 8 auto
    - type: input
      key: max_amount
      title: max_amount
      flex: 8 8 auto
- type: section
  direction: row
  items:
  - type: button
    title: search
    kind: submit
    id: 1
    color: primary
`,
'data': {
  'tiers': [
    {
      'min_amount': '',
      'max_amount': 3,
    }
  ],
 }
}
