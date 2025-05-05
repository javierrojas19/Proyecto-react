import {CorsOptions} from 'cors' 

//aqui validamos y permitimos el acceso a la api desde el frontend
export const corsConfig: CorsOptions = {
    origin : function(origin,callback){
        if(origin === process.env.FRONTEND_URL || !origin){
            callback(null,true)
        }else {
            callback(new Error('No permitido por CORS'))    
        }
    }
}