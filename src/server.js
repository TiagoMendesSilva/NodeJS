/* 
 - padrão de importação Commonjs 
 const http = require('http')

 - padrão de importação ESModules
 OBS: Node não suporta ESModules
 Para utilizar esse tipo de importação é necessário adicionar no arquivo package.json "type": "module" 
 import http from 'http' 

 - diferenciar os módulos internos das importações do node dos módulos de importações de terceiros
 Utilizar o prefixo node
 import http from 'node:http'

*/

import http from 'node:http'
import { json } from './middlewares/json.js' // Para não dar erro module not found, colocar a extensão do arquivo .js no import, isso porque no package.json o type está como module
import { routes } from './routes.js'

const server =  http.createServer(async (req, res) => {
    
    const { method, url } = req

    await json(req, res)
    
    const route = routes.find(route => {
        return route.method === method && route.path === url

    })

    if(route){
        return route.handler(req,res)
    }



    return res.writeHead(404).end()
})

server.listen(3333)