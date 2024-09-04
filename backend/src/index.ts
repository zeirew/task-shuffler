import express from 'express';
import { AppDataSource } from './data-source';
import { taskRouter } from './routes/task.routes';

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const { PORT = 3000 } = process.env;
app.use('/api', taskRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Page not found',
  });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log('Server is running on http://localhost:' + PORT);
    });
    console.log('Data Source has been initialized!');
  })
  .catch(error => console.log(error));
  