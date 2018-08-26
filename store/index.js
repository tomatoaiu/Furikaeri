const localStoragePlugin = store => {
  store.subscribe((mutation, {
    boards,
    kpt,
    ywt,
    fourLinesDiary,
    lamda,
    experientialLearning,
    gapAnalysis,
    pdca
  }) => {
    window.localStorage.setItem('boards', JSON.stringify(boards))
    // window.localStorage.setItem('kpt', JSON.stringify(kpt))
    window.localStorage.setItem('ywt', JSON.stringify(ywt))
    window.localStorage.setItem('fourLinesDiary', JSON.stringify(fourLinesDiary))
    window.localStorage.setItem('lamda', JSON.stringify(lamda))
    window.localStorage.setItem('experientialLearning', JSON.stringify(experientialLearning))
    window.localStorage.setItem('gapAnalysis', JSON.stringify(gapAnalysis))
    window.localStorage.setItem('pdca', JSON.stringify(pdca))
  })
}

export const plugins = [ localStoragePlugin ]
