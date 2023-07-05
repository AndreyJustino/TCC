import express from 'express'
import db from '../services/cameraService.js'

const router = express.Router()

router.post('/', async (request, response) => {
  const {capturedPhoto} = request.body

  try{    
        await db.setPhoto(capturedPhoto)
        response.status(200).send("envio de foto realizado")
        console.log("pegou")
    }
    catch{
        return((response.status(500).send("Error")))
        console.log("deu ruim")
        console.error(error);
    }
})

export default router