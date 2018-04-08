function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();
let isDone = false;

while (!isDone) {
    let v = hw.next()
    isDone = v.done
    console.log(v.value)
}


var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};


for(let o of myIterable){
    console.warn(`for of = ${o}`)
}

const { a, b, c } = myIterable
console.log([...myIterable]) // [1, 2, 3]