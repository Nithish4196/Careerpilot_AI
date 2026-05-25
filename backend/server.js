import express from 'express';
import cors from 'cors';
import jobsRouter from './routes/jobs.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobsRouter);

app.get('/', (req, res) => {
  res.send('CareerPilot AI Backend Aggregator Engine is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
