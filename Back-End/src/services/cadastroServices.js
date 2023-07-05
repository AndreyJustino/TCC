import db from '../repository/connection.js';

async function duplicate(nome_usuario, email, senha) {
    const sql3  = "SELECT * FROM tbl_usuario WHERE email = ?"
    const check = [email] 
    const dados = [nome_usuario, senha]
    
    const conn = await db.connect(); 
    const [rows] = await conn.query(sql3, check, dados);
    conn.end(); 

    return rows
}


async function createUser(nome_usuario, email, senha, nascimentoP) { 
    const sql = 'INSERT INTO tbl_usuario (nome_usuario, email, senha, nascimento, imagem) VALUES(?, ?, ?, ?, ?)'; 
    
    const imgP = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

    const dados = [nome_usuario, email, senha, nascimentoP, imgP];

    const conn = await db.connect();
    
    conn.query(sql, dados);
    conn.end();
}

export default {createUser, duplicate};
