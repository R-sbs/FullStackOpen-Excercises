
const info = (...params) => {
    console.log(...params)
}

const err = (...params) => {
    console.error(...params)
}

export default  { err, info }