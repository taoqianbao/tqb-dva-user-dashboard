
export default {
  // 用作顶层state key，以及action前缀
  namespace: 'example',

  // module级初始state
  state: {},

  // 订阅其它数据源，如router change，window resize, key down/up...
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  // redux-saga里的sagas
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  // redux里的reducer
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};