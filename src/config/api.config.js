const isPro = Object.is(process.env.NODE_ENV, 'production')
 
const baseUrl=isPro ? 'https://api.iqimeng.com' : 'api/'
export default baseUrl;