import dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
    node_env : process.env.NODE_ENV,
    db_url : process.env.DB_URL

}