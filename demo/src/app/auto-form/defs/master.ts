export const defaultMaster = {
  'gender': [
    { 'key': 'male',   'value': 'male' },
    { 'key': 'female', 'value': 'female' }
  ],
  'qualification': [
    { 'key': 'qualification_01', 'value': '01', 'example': 'qualification_example_01' , 'pattern': '^#[A-Fa-f0-9]{6}$'},
    { 'key': 'qualification_02', 'value': '02', 'example': 'qualification_example_02' , 'pattern': '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$'}
  ],
  'filterTarget': [
    { 'key': 'jp', 'value': 'jp' },
    { 'key': 'us', 'value': 'us' }
  ],
  'category': { 'group': [
    { 'title': 'group_01', 'items': [
        { 'key': 'target_01', 'value': '01' },
        { 'key': 'target_02', 'value': '02' },
        { 'key': 'target_03', 'value': '03' }
      ]
    },
    { 'title': 'group_02', 'items': [
      { 'key': 'target_04', 'value': '04' },
      { 'key': 'target_05', 'value': '05' }
      ]
    }
  ]}
}
