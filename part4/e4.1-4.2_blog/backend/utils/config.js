import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

export default { PORT, MONGO_URI };