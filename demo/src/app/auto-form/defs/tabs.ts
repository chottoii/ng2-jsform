export const tabs = {
'schema': `
title: tabs
type: object
properties:
  string_para:
    type: string
  number_para:
    type: number
  dateFrom:
    type: string
  dateTo:
    type: string
  gender:
    type: string
  reading:
    type: boolean
  sports:
    type: boolean
  other:
    type: boolean
`,
'layout': `
- type: tabs
  title: tabs
  tabitems:
  - title: tabs-title1
    items:
    - type: input
      title: string_para
      key: string_para
    - type: input
      title: number_para
      key: number_para
    - type: date
      title: dateFrom
      key: dateFrom
      maxTarget: dateTo
    - type: date
      title: dateTo
      key: dateTo
      minTarget: dateFrom
  - title: tabs-title2
    items:
    - type: radio
      direction: column
      itemDirection: row
      master: gender
      title: gender
      color: primary
      key: gender
      itemFlex: 1 1 100px
    - type: toggle
      master: gender
      title: gender
      key: gender
    - type: select
      master: gender
      title: gender
      key: gender
    - type: section
      title: hobby
      items:
      - type: checkbox
        notitle: true
        title: reading
        key: reading
        flex: 1 1 auto
      - type: checkbox
        notitle: true
        title: sports
        key: sports
        flex: 1 1 auto
      - type: checkbox
        notitle: true
        title: other
        key: other
        flex: 1 1 auto
  - title: tabs-title3
    items:
    - type: icon
      kind: tooltip
      icon: live_help
      tooltip: tooltipSample
      tooltipPosition: right
      itemFlex: 1 1 auto
- type: section
  items:
  - type: button
    title: regist
    kind: submit
    color: primary
`,
'data': {
  'string_para': '',
  'number_para': '',
  'dateFrom': null,
  'dateTo': null,
  'gender': 'male',
  'reading': false,
  'sports': false,
  'other': false
}

}
