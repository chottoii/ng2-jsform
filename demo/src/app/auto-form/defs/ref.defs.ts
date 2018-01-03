export const refTest = {
'schema': `
id: 06_nested
title: nested Arrays
description: refによる階層定義の例
definitions:
  fees_obj:
    type: object
    title: Fee
    properties:
      ongoing_fee:
        type: integer
        title: Ongoing
      application_fee:
        type: integer
        title: Application
  tiers_obj:
    type: object
    title: Tier
    properties:
      min_amount:
        type: integer
      max_amount:
        type: integer
      fees:
        title: Fees (optional—max 2)
        type: array
        maxItems: 2
        items:
          $ref: '/06_nested#/definitions/fees_obj'

type: object
properties:
  tiers:
  title: Tiers (required—max 3)
  type: array
  maxItems: 3
  items:
    $ref: '/06_nested#/definitions/tiers_obj'
    extendRefs: true
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
`,
'data': `
`
}
