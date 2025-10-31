export const corsOptions = {
  origin: "http://localhost:3000", // Allow requests only from this origin
  methods: ["GET", "POST"], // Allow only GET and POST methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true, // Allow sending cookies/authentication headers
};
