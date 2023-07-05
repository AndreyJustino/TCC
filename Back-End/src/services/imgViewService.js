import database from '../repository/connection.js'

async function imgView(){
    const sql = 'SELECT imagem FROM tbl_denuncia WHERE id_imagem = 1';
    const conn = await database.connect();
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

export default{imgView}