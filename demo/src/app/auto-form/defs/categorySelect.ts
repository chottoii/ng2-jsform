export const categorySelect = {
'schema': `
title: categorySelect
type: object
properties:
  selectCategory:
    type: string
  filter:
    type: string
`,
'layout': `
- type: radio
  direction: column
  itemDirection: row
  master: filterTarget
  title: country
  color: primary
  key: filter
- type: select
  master: category
  key: selectCategory
  title: selectCategory
  composite:
    type: button
    kind: popup
    icon: view_list
    popupWidth: 600px
    popupTitle: auxiliaryTitle
    popupSchema:
      type: object
      properties:
        auxiliary:
          type: string
    popupitems:
    - type: categorySelect
      master: category
      title: auxiliaryItem
      key: auxiliary
      targetKey: selectCategory
      flex: 3 1 auto
`,
'data': {
  'selectCategory': ''
  }
}
