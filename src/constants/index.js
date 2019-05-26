/* eslint-disable */
import uuidv4 from 'uuid/v4'

export const LANES_SEED = [
  {id: uuidv4(), name: 'Test lane', cards: [
    {id: uuidv4(), task: 'foo'},
    {id: uuidv4(), task: 'bar'},
    {id: uuidv4(), task: 'baz'},
  ]},
  {id: uuidv4(), name: 'Test lane 2', cards: [
    {id: uuidv4(), task: 'qwe'},
    {id: uuidv4(), task: 'asd'},
    {id: uuidv4(), task: 'zxc'},
  ]},
]


export const ItemTypes = {
  CARD: 'card',
}