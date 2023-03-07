export const state = () => ({
  head: {},
})

// contains your mutations
export const mutations = {
  setHead(state, value) {
    state.head = value
  },
}
export const actions = {
  changeHead(state, value) {
    state.head = value
  },
}
// your root getters
export const getters = {
  getHead(state) {
    return state.head
  },
}
