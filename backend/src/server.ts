import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const APP_PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let savedMessage = 'default-value';

app.post('/api/create-answer', (req: Request, res: Response) => {
  const { data: newMessage } = req.body;

  if (newMessage) {
    savedMessage = newMessage;
    res.status(200).json({ message: 'Message saved successfully.', text: newMessage });
    return;
  }

  res.status(400).json({ error: 'Missing "data" field in request body.' });
});

app.get('/api/saved-message', (_req: Request, res: Response) => {
  res.status(200).json({ text: savedMessage });
});

app.listen(APP_PORT, () => {
  console.log(`Server running at http://localhost:${APP_PORT}`);
});
