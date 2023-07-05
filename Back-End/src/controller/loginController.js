import express from 'express'
import md5 from 'md5'
import db from '../services/loginServices.js'
import jwt from 'jsonwebtoken';

const router = express.Router()

router.post('/', async (resquest, response) => {
  const {email,senha} = resquest.body
  const hash = md5(senha);
  const secret = 'Etecembu@123'

  try{
    const userl = await db.loginUser(email, hash);

    if(email === '' || hash === ''){
      return(response.status(422).send('Campo em branco'))
    }
    if(userl.length > 0){
      const results = userl[0]

      console.log('results controller >>> ',results)

      const token = jwt.sign({nome_usuario: results.nome_usuario, email: results.email, nascimento: results.nascimento, imagemUsuario: results.imagem}, secret)
      
      
      console.log('token controller >>>>> ',token)
      
      response.status(200).json({token})
    }
    else{
      response.status(404).send('Usuário não cadastrado')
    }
    }catch{
      response.status(500).send('Error')
    }
})

export default router
