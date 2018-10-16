import { createStore, combineReducers } from 'redux'

/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// 定义默认值
const defaultUser = {
  userName: 'Guest',
  uid: '000000000000',
}

//另一个reducer
function user(state = defaultUser, action) {
  switch (action.type) {
    case 'LOGIN': 
      return Object.assign({}, state, {
        userName: action.userName,
        uid: action.uid,
      })
    case 'LOGOUT':
      return defaultUser
    default:
      return defaultUser
  }
}

// 将不同的reducer合到一起，一个应用只能产生一个store
const rootReducer = combineReducers({
  counter,
  user,
})

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(
  rootReducer,
  // 下面这个用于Chrome的redux插件debug
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store
