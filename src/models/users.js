import * as usersService from '../services/users';
import { PAGE_SIZE } from '../configs/constants';
// const querystring = require('querystring');

export default {
    namespace: 'users',
    state: {
        list: [],
        total: null,
        page: null
    },
    reducers: {  //用来修改数据模型的state
        save(state, { payload: { data: list, total, page } }) {
            return { ...state, list, total, page };
        }
    },
    effects: {
        //effects指的是涉及到异步请求的方法。
        //通常用来调用服务获取数据。
        //这里要注意如果effects的方法名与reducers中存在重复的话容易造成死循环。
        *fetch({ payload: { page = 1 } }, { call, put }) {
            const { data, headers } = yield call(usersService.fetch, { page });
            yield put({
                type: 'save',
                payload: {
                    data,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, PAGE_SIZE)
                }
            });
        },
        *remove({ payload: id }, { call, put, select }) {
            yield call(usersService.remove, id);
            const page = yield select(state => state.users.page);
            yield put({ type: 'fetch', payload: { page } })
        },
        *patch({ payload: { id, values } }, { call, put, select }) {
            yield call(usersService.patch, id, values);
            const page = yield select(state => state.users.page);
            yield put({ type: 'fetch', payload: { page } });
        },
        *create({ payload: values }, { call, put, select }) {
            yield call(usersService.create, values);
            const page = yield select(state => state.users.page);
            yield put({ type: 'fetch', payload: { page } });
        },
    },
    subscriptions: {
        //触发器。setup表示初始化即调用。
        //其他用法见官方文档。https://github.com/sorrycc/blog/issues/62
        setup({ dispatch, history }) {
            // return history.listen(location => {
            //     const { pathname, search, query } = location;
            //     if (pathname == '/users') {
            //         dispatch({ type: 'fetch', payload: querystring.parse(search.replace(/^[?]*(.*)$/, '$1')) })
            //     }
            // })
            return history.listen(({ pathname, query }) => {
                if (pathname === '/users') {
                    dispatch({ type: 'fetch', payload: query || { page: 1 } });
                }
            });
        },
    },
};