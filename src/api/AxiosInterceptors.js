import axios from 'axios';


const config = {
    timeout :400000,
    crossdomain : true,
    Headers : {
    'Content-Type' : 'application/json'
    },
    }
export const api = axios.create(config) 
// Set up the interceptor
api.interceptors.response.use(
    (Res) => Res,
    async (error) => {
    if(error && error.message){
    const {data, status} = error.message
    switch(status){
    case 400:
    break
    case 401:
    break
    }
    }
    }
    )
// const responseBody = (response) = response.data
// export const ApiRequester = {
// get:(url) => api.get(url).then(responseBody),
// post:(url) => api.post(url).then(responseBody, requestBody)
// }

