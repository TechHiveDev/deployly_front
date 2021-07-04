export const state = () => ({
  groups: []
})

export const mutations = {
  setGroups(state, groups) {
    state.groups = groups
  },
  addGroup(state, group) {
    group.projects = [];
    state.groups.push(group)
  },
  removeGroup(state, id) {
    state.groups = state.groups.filter(g => g.id !== id)
  },
  setGroup(state, _group) {
    state.groups = state.groups.map(group => {
      if (group.id === _group.id) {
        return _group;
      } else {
        return group;
      }
    })
  }
}


export const actions = {
  async fetchGroups({commit}) {
    try {
      const data = await this.$axios.$get('projectGroups');
      commit('setGroups', data);
    } catch (e) {
      console.log(e)
    }
  },
  async updateGroup({commit}, groupId) {
    try {
      const group = await this.$axios.$get(`projectGroups/${groupId}`);
      commit("setGroup", group)
    } catch (e) {
      console.log(e)
    }
  }
}
