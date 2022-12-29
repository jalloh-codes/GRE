export const enviroment =  process.env.NODE_ENV

const api = (env) =>{
    switch (env) {
        case 'production':
            return 'https://gre-api-app.onrender.com/gre'
        case 'development':
            return 'http://localhost:8080/gre'
        default:
            return 'http://localhost:8080/gre'
    }
}



export const api_link = api(enviroment)