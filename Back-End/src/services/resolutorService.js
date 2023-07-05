import database from '../repository/connection.js';

async function resolutor(id){
  const sql = "SELECT * FROM tbl_denuncia WHERE id_denuncia = ?"
  const dados = [id]

  const conn = await database.connect();
  const [rows] = await conn.query(sql, dados)
  conn.end();

  return rows
}

async function insertImgStatus(id, url){
  const sql = "UPDATE tbl_denuncia SET imagem = ?, status = 'RESOLVIDO' WHERE id_denuncia = ?"


  const dados = [url, id]

  const conn = await database.connect()

  conn.query(sql, dados)
  conn.end()
}

async function denuncia(){
  const sql = 'SELECT * FROM tbl_denuncia'

  const conn = await database.connect();
  const [rows] = await conn.query(sql)

  conn.end()

  return rows
}

export default {resolutor, denuncia, insertImgStatus};