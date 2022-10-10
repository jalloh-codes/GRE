import jwt from 'jsonwebtoken';


export const authMiddleware = (req, res, next) =>{
    // console.log(req.get('authorization'));
    const authHeader = req.get('authorization');
   
    if(!authHeader){
        req.isAuth =  false;
        return next()
    }
    let test = authHeader

    const bear = authHeader.split(' ')[0]
    const token = authHeader.split(' ')[1];
  
    if(!token || token === '' || !bear ||  bear != 'Bearer'){
        req.isAuth =  false
        
        return next();
    }

    
    try {
       let decodeToken =  jwt.verify(token, process.env.SECRECT);
       
       if(!decodeToken){
            req.isAuth =  false
            return next();
        }
        
        
       req.isAuth = true;
       req.auth  = decodeToken;
       
   
       return next()
    } catch (error) {
        req.isAuth =  false
        return next();
    }
    // if(!decodeToken){
    //     req.isAuth =  false
    //     return next();
    // }

    // req.isAuth = true;
    // req.userID  = decodeToken.id;

    // return next()
}