/* eslint-disable */
import uuidv4 from 'uuid/v4'


export const LANES_SEED = [
  {id: uuidv4(), name: 'Test lane', cards: [
    {id: uuidv4(), task: 'foo'},
    {id: uuidv4(), task: 'bar'},
    {id: uuidv4(), task: 'baz'},
  ]},
]
