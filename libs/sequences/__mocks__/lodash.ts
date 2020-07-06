const memoize = jest.requireActual('lodash/memoize');
// const memoize = val => val;
const isEmpty = jest.requireActual('lodash/isEmpty');
// const isEmpty = val => !val;
const flow = jest.requireActual('lodash/flow');
// const flow = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args);

module.exports = {
    memoize,
    isEmpty,
    flow
}