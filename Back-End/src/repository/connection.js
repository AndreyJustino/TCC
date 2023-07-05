import mysql2 from 'mysql2/promise';


async function connect() {
    const connection = await mysql2.createConnection(
 { 
        database: 'sql9627614',
        user: 'sql9627614',
        port : 3306,
        host: 'sql9.freemysqlhosting.net',
        password: 'BnpYUshZF6'
   }
)

    return connection;
};

export default {connect};

// { 
//     user : 'root',
//     host : 'localhost',
//     port : 3306,
//     password : '',
//     database : 'constsolucion'
//   }

// 'mysql://tak140iu6rv8jepbi4oq:pscale_pw_5qlTxC8MxhT8LmAdYIzCIIlxL5GA79EB5pm1iV24Mgt@aws.connect.psdb.cloud/reportando?ssl={"rejectUnauthorized":true}'

// { 
//     database: 'sql9627614',
//     user: 'sql9627614',
//     port : 3306,
//     host: 'sql9.freemysqlhosting.net',
//     password: 'BnpYUshZF6'
//   }
