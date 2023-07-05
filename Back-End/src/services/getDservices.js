import database from '../repository/connection.js'

async function SelectD(){
    const sql = 'SELECT * from tbl_denuncia';
    const conn = await database.connect();
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

export default{SelectD}