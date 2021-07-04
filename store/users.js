export const state = () => ({
  users: []
})

export const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  addUser(state, user) {
    user.groups = [];
    user.projects = [];
    state.users.push(user)
  }
}


export const actions = {
  async fetchUsers({commit}) {
    try {
      const data = await this.$axios.$get('users');
      commit('setUsers', data);
    } catch (e) {
      console.log(e)
    }
  },
}
