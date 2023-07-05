import express, {response} from 'express';
import db from '../services/imgViewService.js';


const router = express.Router();

router.get('/', async(req,res)=>{
    try{
        const results = await db.imgView();
        if(results.length == 0){
            res.status(204).end();
        }else{
            res.status(200).json(results)
        }
    }catch(err){
        res.status(500).json({message: `encontramos um erro: ${err}`});
    }
});

export default router