const {
    MONGODB_URI,
    MONGODB_DB_NAME
} = process.env;

export default {
    mongoDbUri: MONGODB_URI || "" as string,
    dbName: MONGODB_DB_NAME || "production" as string,
}