const array = [1, 2, 2, 3]

const newFilter = function (cb) {
    const array = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) {
            array.push(this[i]);
        }
    }
    return array;
}
const callback = (el, index, arr) => {return  el>2 }
Array.prototype.newFilter = newFilter;
const newArray = array.newFilter(callback(el) => { return typeOf el === 'string';});