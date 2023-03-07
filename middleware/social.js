export default ({ store }) => {
  console.log('this is the middle ')
  const headInfo = { id: '86', title: 'middleware title' }
  store.commit('setHead', headInfo)
  store.dispatch('changeHead', headInfo)
}
