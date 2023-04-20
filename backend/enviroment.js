const allowedOrigin = ['http://localhost:3000', 'http://10.15.85.21:3000',
'https://kwerde.onrender.com', 'https://kwerde-customer.onrender.com']

const envId =  process.env.NODE_ENV
const getEnviroment = (env) => {
    switch (env) {
        case 'development':
            return ['https://kwerde.onrender.com', 'https://kwerde-customer.onrender.com']
        case 'uat':
            return ['https://kwerde-internal-uat.onrender.com/', 'https://kwerde-public-uat.onrender.com/']
        case 'release':
            return ['https://kwerde-internal-uat.onrender.com/', 'https://kwerde-public-uat.onrender.com/']
        default:
            return ['http://localhost:3000']
    }
}

export const environment =  getEnviroment(envId)