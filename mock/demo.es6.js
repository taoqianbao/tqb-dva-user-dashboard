// // 对象
// const user = { name: 'guanguan', age: 2 };
// const { name, age } = user;
// console.log(`${name} : ${age}`);  // guanguan : 2

// // 数组
// const arr = [1, 2];
// const [foo, bar] = arr;
// console.log(foo);  // 1


const user = { name: 'peter', age: 33 }
const { name, age } = user
console.log(`${name}:${age}`)

// Object - Array

const add = (state, { payload }) => {
    return state.concat(payload);
};
//set alias
const sub = (state, { payload: todo }) => {
    return state.concat(todo)
}


app.model({
    reducers: {
        add() { }  // 等同于 add: function() {}
    },
    effects: {
        * addRemote() { }  // 等同于 addRemote: function*() {}
        ,
        addCurrent: function* () { }
    },
});