import log from './log'
export default (fn) =>
  (...args) =>
    fn(...args)
      .catch((ex) => {
        log.error(ex)
        process.nextTick(() => { throw ex })
      })
