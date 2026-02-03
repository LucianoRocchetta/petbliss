import mongoose from "mongoose";
import config, { mongoDbConfig } from "@/config";

const MONGODB_URI = mongoDbConfig.mongoDbUri as string;
const DB_NAME = mongoDbConfig.dbName as string;
const NODE_ENV = config.nodeEnv as string;

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI is not defined in environment variables");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

/**
 * Conecta a MongoDB usando la base de datos especificada en las variables de entorno
 * 
 * @param customDbName - (Opcional) Nombre personalizado de la base de datos. 
 *                       Si no se proporciona, usa MONGODB_DB_NAME del .env
 * 
 * Variables de entorno requeridas:
 * - MONGODB_URI: URI de conexión a MongoDB (sin el nombre de la DB al final)
 * - MONGODB_DB_NAME: Nombre de la base de datos (por defecto: "production")
 * - NODE_ENV: Ambiente de ejecución (development, production, etc.)
 */
async function connectDB(customDbName?: string) {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    // Usar el nombre de DB personalizado o el de las variables de entorno
    const targetDbName = customDbName || DB_NAME;

    // Construir la URI completa con el nombre de la base de datos
    const uriParts = MONGODB_URI.split("?");
    const baseUri = uriParts[0];
    const queryParams = uriParts[1] ? `?${uriParts[1]}` : "";

    // Asegurarse de que la URI base no tenga un nombre de DB al final
    let cleanBaseUri = baseUri;
    if (cleanBaseUri.endsWith("/")) {
      cleanBaseUri = cleanBaseUri.slice(0, -1);
    }

    // Si la URI ya tiene una DB, quitarla
    const lastSlashIndex = cleanBaseUri.lastIndexOf("/");
    const potentialDbName = cleanBaseUri.substring(lastSlashIndex + 1);
    
    // Si hay algo después del último slash, quitarlo
    if (potentialDbName && !potentialDbName.includes(".")) {
      cleanBaseUri = cleanBaseUri.substring(0, lastSlashIndex);
    }

    // Construir la URI final con el nombre de la DB
    const dbURI = `${cleanBaseUri}/${targetDbName}${queryParams}`;

    console.log(`🔌 Connecting to MongoDB...`);
    console.log(`📊 Environment: ${NODE_ENV}`);
    console.log(`🗄️  Target Database: ${targetDbName}`);

    cached.promise = mongoose
      .connect(dbURI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      .then((mongoose) => {
        const connectedDbName = mongoose.connection.db?.databaseName || "unknown";
        console.log(`✅ Connected to MongoDB: ${connectedDbName}`);
        
        // Advertencia si no estamos conectados a la DB esperada
        if (connectedDbName !== targetDbName) {
          console.warn(`⚠️ Warning: Connected to "${connectedDbName}" but expected "${targetDbName}"`);
        }
        
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export async function disconnectDB() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log("🔌 Disconnected from MongoDB");
  }
}

export default connectDB;
