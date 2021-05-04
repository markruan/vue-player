const isPro = Object.is(process.env.NODE_ENV, 'production')
 
const baseUrl=isPro ? 'https://netease-cloud-music-api-lime-nine.vercel.app' : 'api/'
export default baseUrl;
