import * as axios from 'axios'
let options = {}
options.timeout = 60000
options.baseURL = '/storeApi'
options.withCredentials = true
export default axios.create(options)