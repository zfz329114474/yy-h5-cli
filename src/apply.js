

let apply = (action, ...args) => {
  //babel-env
  console.log(`./${action})(${args})`)
  require(`./${action}`)(...args);
};

module.exports = apply;