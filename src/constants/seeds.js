const lanesSeed = {
  entities: {
    1: { id: 1, name: 'To do', cardIds: ['1', '2', '3'] },
    2: { id: 2, name: 'In progress', cardIds: [] },
    3: { id: 3, name: 'Done', cardIds: [] },
  },
  ids: [1, 2, 3],
}

const cardsSeed = {
  entities: {
    1: { id: 1, task: 'Quis quis do ullamco excepteur ipsum ut ad non.' },
    2: { id: 2, task: 'Sint aliqua anim adipisicing aute. Dolore duis pariatur sint excepteur commodo nostrud aliqua culpa. Minim laborum voluptate commodo id nostrud ex eu.' },
    3: { id: 3, task: 'Enim enim amet fugiat.' },
  },
  ids: [1, 2, 3],
}

export {
  lanesSeed,
  cardsSeed,
}
