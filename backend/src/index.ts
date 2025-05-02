import colors from 'colors'
import server from './server'


const port = process.env.port ||  4000 



//Routing
server.listen(port, () => {
    console.log(colors.bgBlue.magenta.italic( `servidor funncionando en puerto: ${port} `))
} )


