function Constant(val) {
  return new Promise(function(resolve, reject) {
    resolve(val)
  })
}
function Promisify(func, ...args) {
  return new Promise(function(resolve, reject) {
    resolve(func.apply(undefined, args))
  })
}
function PromiseAcceptor(func) {
  return function(...args) {
    // Trust sake
    for (var i = 0; i < args.length; i++) {
      args[i] = Promise.resolve(args[i])
    }
    return Promise.all(args).then(function(vals) {
      return func.apply(null, vals)
    })
  }
}
function cbToPromise(func) {
  return function(...args) {
    return new Promise(function(resolve, reject) {
      args.push(function(...output) {
        if (output.length === 1) {
          return resolve(output[0])
        } else {
          return resolve(output)
        }
      })
      func.apply(null, args)
    })
  }
}
function add(p1, p2) {
  return Number(p1) + Number(p2)
}
add = PromiseAcceptor(add)
