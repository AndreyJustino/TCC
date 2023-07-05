import express from 'express'
import db from '../services/denunciaService.js'

import nodemailer from "nodemailer"

import axios from 'axios'

const router = express.Router()

router.post('/', async (request, response) => {
  const {url,tipo_problema,desc_problema,longitude,latitude} = request.body

  try{    
        await db.setDenuncia(url,tipo_problema,desc_problema,longitude,latitude)

        // sistema para enviar email pra resolutor
        // ver como pegar a imagem

        let config = {
            method: 'get',
            url: `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=ef172e5aac494f98ad94e03ba0d41fb8`,
            headers: { }
            };
        
        const loc = await axios(config)
        .then(function (response) {
        return response.data.features[0].properties.formatted;
        })
        .catch(function (error) {
        return error;
        });

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

            if (tipo_problema === "Elétrico(fio desencapado, poste caido)"){

                await trasnporte.sendMail({
                    from: 'Reportando <contatandosolucoes@gmail.com>', 
                    to: `noreply.atendimentoenel@brasil.enel.com`, 
                    subject: 'Uma nova denuncia foi encontrada.', 
                    html: `<h1>Nova denuncia feita</h1>
                    <p>Os dados são:</p>
                    <ul>
                      <li>Tipo de problema: ${tipo_problema}</li>
                      <li>Descrição: ${desc_problema}</li>
                      <li>Endereço: ${loc}</li>
                    </ul>
                    <img src='${url}'></img>` 
                })
    
                .then(() => console.log("E-mail elétrico enviado com sucesso."))
                .catch((err) => console.log(`Houve um erro: ${err}`))

            }
            else if (tipo_problema === 'Hidraúlico(vazão de água, cano exposto)'){
                
                await trasnporte.sendMail({
                    from: 'Reportando <contatandosolucoes@gmail.com>', 
                    to: `ouvidoria@sabesp.com.br`, 
                    subject: 'Uma nova denuncia foi encontrada.', 
                    html: `<h1>Nova denuncia feita</h1>
                    <p>Os dados são:</p>
                    <ul>
                      <li>Tipo de problema: ${tipo_problema}</li>
                      <li>Descrição: ${desc_problema}</li>
                      <li>Endereço: ${loc}</li>
                    </ul>
                    <img src='${url}'></img>` 
                })
    
                .then(() => console.log("E-mail hidraulico enviado com sucesso."))
                .catch((err) => console.log(`Houve um erro: ${err}`))

            }
            else if (tipo_problema === "Infra(semaforo quebrado, calçada quebrada)"){

                await trasnporte.sendMail({
                    from: 'Reportando <contatandosolucoes@gmail.com>', 
                    to: `ouvidoria@antt.gov.br`, 
                    subject: 'Uma nova denuncia foi encontrada.', 
                    html: `<h1>Nova denuncia feita</h1>
                    <p>Os dados são:</p>
                    <ul>
                      <li>Tipo de problema: ${tipo_problema}</li>
                      <li>Descrição: ${desc_problema}</li>
                      <li>Endereço: ${loc}</li>
                    </ul>
                    <img src='${url}'></img>` 
                })
    
                .then(() => console.log("E-mail infra enviado com sucesso."))
                .catch((err) => console.log(`Houve um erro: ${err}`))

            }

        }

        response.status(200).send(email())
        console.log('Email de denuncia enviado com sucesso!')
    }
    catch(error){
        response.status(500).send({mensagem:'erro', erro: `${error}`})
    }
})

export default router
