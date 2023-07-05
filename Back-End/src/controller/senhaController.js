import express from 'express'
import db from '../services/checkService.js'
import { generatePassword } from '../helper/recuperarPassword.js'
import nodemailer from "nodemailer"

const router = express.Router()

router.post('/', async(req, res)=>{

  const {emailF} = req.body;

  console.log('email senha controller >>>',emailF)

  try{
    const user = await db.checkEmail(emailF);
    
    if(user.length > 0){
      const newPassword = generatePassword();
      await db.changePassword(emailF, newPassword);

      const email = async () => {
        let trasnporte = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: true,
            port: 465,
            auth: {
                user: "contatandosolucoes@gmail.com",
                pass: "zpfezrbxqptpujgn"
            },
            tls: {
                rejectUnauthorized: false
              }
        })
    
        await trasnporte.sendMail({
            from: 'Reportando <contatandosolucoes@gmail.com>', 
            to: `${emailF}`, 
            subject: 'Pedido de nova senha realizado.', 
            html: `<h1>Digite no campo adequado o código e insira a nova senha</h1><br><p>Seu código é: ${newPassword}</p>`, 
            text: `Sua senha foi alterada, Seu código é: ${newPassword}` 
        })
    
        .then(() => console.log("E-mail enviado com sucesso."))
        .catch((err) => console.log(`Houve um erro: ${err}`))
      }
    
      res.status(200).send(email());

    }else{
      res.status(404).send({messsage: `Usuário não encontrado`});
    }

  }catch(err){
    // res.status(500).send({messsage: `Houve um erro no banco de dados. ${err}`})
    res.status(500).send(console.log(err))
  }

});

export default router