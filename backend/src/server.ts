
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import router from './router'
import {connecDB} from './config/db'
import { corsConfig } from './config/cors'
connecDB()
const app = express();


//cors

app.use(cors(corsConfig))


app.use(express.json())

app.use('/', router)







export default app