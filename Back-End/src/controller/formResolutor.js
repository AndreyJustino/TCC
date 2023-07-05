import express, { response } from 'express'
import db from "../services/resolutorService.js"

const router = express.Router()

router.put('/', async (resquest, response) => {
    const {id, imgURL} = resquest.body
    
    try{

        const resposta = await db.resolutor(id) // verifica se o id é real

        if(id === '' ){
            return(response.status(422).send('Campo em branco'))
        }
        if(resposta.length > 0){    
            const insert = await db.insertImgStatus(id, imgURL)

            response.status(200).send('forms inserido')
    }
    else{
      response.status(404).send('ID invalido')
    }
    }catch(error){
        console.log('erro no banco formResolutor >>',error)
    }

})

// tabela
router.get('/', async (resquest, response) => {
    try{
        const results = await db.denuncia() 

        if(results.length == 0){
            response.status(204).end();
        } else{
            response.status(200).json(results);
        }

    }catch(error){
        response.status(500).json({message: `Encontramos um erro: ${error}`});
    }
})

export default router