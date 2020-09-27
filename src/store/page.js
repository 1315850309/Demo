const state = {
  user: ""
}
const mutations = {
  updateUser(state, name) {
    state.user = name
  }
}
const actions = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}