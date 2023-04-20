export const environment =  process.env.NODE_ENV

const api = (env) =>{
    switch (env) {
        case 'release':
            return 'https://gre-api-app.onrender.com/gre'
        case 'development':
            return 'https://gre-api-app.onrender.com/gre'
        case 'uat': 
            return 'https://gre-api-uat.onrender.com'
        default:
            return 'http://localhost:8080/gre'
    }
}



export const api_link = api(environment)