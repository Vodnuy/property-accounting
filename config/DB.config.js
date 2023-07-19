const dbConfig = {
    connectionSchema: process.env.DB_CONNECTION_SCHEMA, 
    host: process.env.DB_HOST,
    dbName: process.env.DB_NAME
}

module.exports=`${dbConfig.connectionSchema}://${dbConfig.host}/${dbConfig.dbName}`