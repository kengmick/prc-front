export const state = () => ({
  band: {},
})

export const mutations = {
  resetBand(state, { ...band }) {
    state.band = { ...band }
  },
}

export const actions = {
  setBand(context, { ...band }) {
    context.commit('resetBand', { ...band })
  },
}

export const getters = {
  getBand: (state) => {
    return state.band
  },
}
