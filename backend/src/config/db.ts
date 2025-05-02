import mongoose from 'mongoose';
import colors from 'colors'



export const connecDB = async () =>{
    try {
        
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.cyan.bold(`mongo db conectacto en: ${url}`))
    } catch (error) {
        console.log(error)
    }
}