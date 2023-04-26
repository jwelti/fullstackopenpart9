type Rating = 1 | 2 | 3;
interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseParameters {
  target: number;
  exerciseHours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseParameters => {
  const exerciseHours = [];
  if (args.length < 4) throw new Error('Not enough arguments. Provide target daily exercise hours and exercise hours per day for as many days as you like.');
  if (isNaN(Number(args[2]))) {
    throw new Error('Provided target is not a number!');
  }
  const target = Number(args[2]);
  for(let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided exercise hours were not numbers!');
    }
    exerciseHours.push(Number(args[i]));
  }
  return {
    target: target,
    exerciseHours: exerciseHours
  };
};

const calculateExercises = (exerciseHours: Array<number>, target: number) : ExerciseResult => {
  const average = exerciseHours.reduce((a,b) => a + b, 0) / exerciseHours.length;

  let rating: Rating = 1;
  if(average >= 0.5 * target) rating = 2;
  if(average >= target) rating = 3;

  let ratingDescription = 'Try harder next time!';
  if(rating === 2) ratingDescription = 'Not bad, but could be better.';
  else if(rating === 3) ratingDescription = 'Well done!';
  
  return { periodLength: exerciseHours.length, 
    trainingDays: exerciseHours.filter(hours => hours > 0).length,
    success: average > target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};

try {
  const params = parseExerciseArguments(process.argv);
  console.log(calculateExercises(params.exerciseHours, params.target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
export {calculateExercises};