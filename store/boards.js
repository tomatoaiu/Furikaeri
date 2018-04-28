export const state = () => ({
  columns: [
    {
      name: 'aiueo1',
      notes: [
        {
          title: 'abcde',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.'
        },
        {
          title: 'abcde',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.'
        },
        {
          title: 'abcde',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.'
        }
      ]
    },
    {
      name: 'aiueo2',
      notes: [
        {
          title: 'abcde',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.'
        }
      ]
    }
  ]
})

export const mutations = {
  addColumn (state, payload) {
    state.columns.push({
      name: payload.name,
      notes: []
    })
  },
  addNote (state, { title, content, index }) {
    state.columns[index].notes.push({
      title,
      content
    })
  },
  remove (state, { todo }) {
    state.columns.splice(state.columns.indexOf(todo), 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}

export const getters = {
  getColumnIndex: (state) => (columnName) => {
    return state.columns.findIndex(({name}) => name === columnName)
  },
  existsColumn: (state) => (columnName) => {
    return state.columns.some(col => col.name === columnName)
  }
}
