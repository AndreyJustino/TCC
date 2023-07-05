import express from 'express'
import db from '../services/imgPerfilSerivce.js'

const router = express.Router()

router.put('/', async (resquest, response) => {
  const {url,nome,email} = resquest.body

  try{
    if(email === '' ){

      return(response.status(422).send('Campo email em branco'))

  } else {
    const result = await db.insertImgPerfil(email, nome, url)

    console.log('email >>  perf ', email)

    const RTA = result[0]

    console.log('dados usuario >>' , result)
    response.status(200).send({RTA})
  }


  }catch(error){
    console.log('erro imgPerfil >> ', error)
  }
})

export default router