import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/fileRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use('/api', fileRoutes);

const server = app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

export default server;