import db from '../repository/connection.js';

async function setDenuncia(url,tipo_problema,desc_problema,longitude,latitude) { 
    const sql = 'INSERT INTO tbl_denuncia (imagem,tipo_problema,desc_problema,longitude,latitude, statu) VALUES(?,?,?,?,?,?)'; 
    
    const dados = [url,tipo_problema,desc_problema,longitude,latitude, 'ABERTO'];

    const conn = await db.connect();
    
    conn.query(sql, dados); 
    conn.end();
}
// ---------------------------------------------------
async function dadosDenuncia(){
    const sql = 'select * from tbl_denuncia where id_denuncia =  (select max(id_denuncia) from tbl_denuncia) ;'

    const conn = await db.connect()

    const [rows] = await conn.query(sql)
    conn.end()
    
    return rows
}

export default {setDenuncia, dadosDenuncia};