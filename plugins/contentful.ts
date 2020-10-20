const contentful = require('contentful')
const config = {
  space: process.env.CTF_SI ? process.env.CTF_SI : "",
  accessToken: process.env.CTF_CDA_AT ? process.env.CTF_CDA_AT : "",
}
const client = contentful.createClient(config)
export default client