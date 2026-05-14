import dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
    node_env : process.env.NODE_ENV,
    db_url : process.env.DB_URL,
    jwt_access_expires : process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires : process.env.JWT_REFRESH_EXPIRES_IN,
    jwt_access_secret : process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret : process.env.JWT_REFRESH_SECRET

}