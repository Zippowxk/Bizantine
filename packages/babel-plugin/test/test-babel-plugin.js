const { transformSync } = require('@babel/core')

const myPlugin = require("../lib/index.js")

const code = `
if (DEBUG) {
  this.message = 'this is Debug'
}
`

const config = {
  plugins: [myPlugin]
}

console.log(myPlugin)

const output = transformSync(code, config)

console.log(output)