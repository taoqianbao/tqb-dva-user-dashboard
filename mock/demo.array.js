const arrList = [0,1,2,3]

function callbackfn(previousValue, currentValue, currentIndex, array1){
    console.log(previousValue, currentValue, currentIndex, array1)
    return previousValue + currentValue
}

let total = arrList.reduce(callbackfn)

console.log(total)