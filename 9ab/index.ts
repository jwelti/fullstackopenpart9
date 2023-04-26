import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
  if (!isNaN(Number(req.query.weight)) && !isNaN(Number(req.query.height))) {
    const response = {
      weight: Number(req.query.weight),
      height: Number(req.query.height),
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    };
    res.send(response);
  } else {
    const response = {
      error: 'malformatted parameters'
    };
    res.status(400).send(response);
  }  
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if(!daily_exercises) return res.status(400).send({ error: 'parameters missing'});
  if(!target) return res.status(400).send({ error: 'parameters missing'});
  if(!Array.isArray(daily_exercises) || !daily_exercises.every((ele: unknown) => typeof ele === "number")) return res.status(400).send({ error: 'malformatted parameters'});
  if(typeof target !== "number") return res.status(400).send({ error: 'malformatted parameters'});

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});