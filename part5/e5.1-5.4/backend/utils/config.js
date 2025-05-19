import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;
const SECRET = process.env.JWT_SECRET || kMFOgX4H44 ;

export default { PORT, MONGO_URI, SECRET };