export const state = () => ({
  columns: []
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
