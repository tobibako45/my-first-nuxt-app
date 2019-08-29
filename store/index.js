// state: コンポーネントでいうdata
export const state = () => ({
  isLoading: false
})

// mutations は state を更新する関数を登録します。
export const mutations = {
  setIsLoading(store, isLoading){
    state.isLoading = isLoading
  }
}
