
export const state = () => ({

})

export const mutations = {

}

export const actions = {
  async loadData () {
    // get projects
    try {
      const data = await this.$axios.$get('projectGroups')
      commit('groups/setGroups', data)
    } catch (e) {
      console.log(e)
    }

    // get users
    try {
      const data = await this.$axios.$get('users')
      commit('users/setUsers', data)
    } catch (e) {
      // user is Not admin
      console.log(e.response.data.message)
    }
  }
}
