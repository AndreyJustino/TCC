import express, {response} from 'express';
import db from '../services/getDservices.js';


const router = express.Router();

router.get('/', async(req,res)=>{
    try{
        const results = await db.SelectD();
        if(results.length == 0){
            res.status(204).end();
        }else{
            res.status(200).json(results)
        }
    }catch(err){
        response.status(500).json({message: `encontramos um erro: ${err}`});
    }
});

export default router