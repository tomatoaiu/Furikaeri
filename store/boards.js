export const state = () => ({
  columns: []
})

export const mutations = {
  ADD_COLUMN (state, { name }) {
    state.columns.push({
      name: name,
      notes: []
    })
  },
  ADD_NOTE (state, { title, content, index }) {
    state.columns[index].notes.push({
      title,
      content
    })
  },
  SET_COLUMN (state, { index, column }) {
    state.columns[index] = column
  },
  SET_NOTE (state, { index, note }) {
    state.columns[index].notes = note
  },
  SET_NOTE_TITLE  (state, { columnIndex, noteIndex, title }) {
    state.columns[columnIndex].notes[noteIndex].title = title
  },
  SET_NOTE_CONTENT  (state, { columnIndex, noteIndex, content }) {
    state.columns[columnIndex].notes[noteIndex].content = content
  },
  REMOVE_COLUMN (state, { index }) {
    state.columns.splice(index, 1)
  },
  REMOVE_NOTE (state, { columnIndex, noteIndex }) {
    state.columns[columnIndex].notes.splice(noteIndex, 1)
  }
}

export const actions = {
  addColumn ({ commit }, { name }) {
    commit('ADD_COLUMN', { name })
  },
  addNote ({ commit }, { title, content, index }) {
    commit('ADD_NOTE', { title, content, index })
  },
  setColumn ({ commit }, { index, column }) {
    commit('SET_COLUMN', { index, column })
  },
  setNote ({ commit }, { index, note }) {
    commit('SET_NOTE', { index, note })
  },
  setNoteTitle ({ commit }, { columnIndex, noteIndex, title }) {
    commit('SET_NOTE_TITLE', { columnIndex, noteIndex, title })
  },
  setNoteContent ({ commit }, { columnIndex, noteIndex, content }) {
    commit('SET_NOTE_CONTENT', { columnIndex, noteIndex, content })
  },
  removeColumn ({ commit }, { index }) {
    commit('REMOVE_COLUMN', { index })
  },
  removeNote ({ commit }, { columnIndex, noteIndex }) {
    commit('REMOVE_NOTE', { columnIndex, noteIndex })
  }
}

export const getters = {
  columns: state => state.columns,
  getColumnIndex: state => columnName => state.columns.findIndex(({name}) => name === columnName),
  getNotes: state => index => state.columns[index].notes,
  getNoteIndex: state => (columnIndex, noteName) => state.columns[columnIndex].notes.findIndex(({title}) => title === noteName),
  existsColumn: state => columnName => state.columns.some(col => col.name === columnName)
}
