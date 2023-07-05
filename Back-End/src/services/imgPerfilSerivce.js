import database from '../repository/connection.js';

async function insertImgPerfil(email, nome, url){
  const sql = "UPDATE tbl_usuario SET imagem = ?, nome_usuario = ?, email = ? WHERE email = ?"


  const dados = [url, nome, email, email]

  const conn = await database.connect()

  conn.query(sql, dados)
  conn.end()
}

export default {insertImgPerfil};