// state: コンポーネントでいうdata
export const state = () => ({
  list: []
})

// mutations は state を更新する関数を登録します。
export const mutations = {
  addUser(state, user){
    state.list.push(user)
  }
}

// actionsはmutationsをコミットする関数を登録します。
export const actions = {
  addUser({commit}, {user}) {
    commit('addUser', user)
  }
}
