interface BMIValues {
  weight: number;
  height: number;
}

const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};


const calculateBmi = (height: number, weight: number) : string => {
  if (height === 0) throw new Error('Can\'t divide by 0 height!');
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  if(bmi < 16) return "Underweight (Severe thinness)";
  else if(bmi < 17) return "Underweight (Moderate thinness)";
  else if(bmi < 18.5) return "Underweight (Mild thinness)";
  else if(bmi < 25) return "Normal range";
  else if(bmi < 30) return "Overweight (Pre-obese)";
  else if(bmi < 35) return "Obese (Class I)";
  else if(bmi < 40) return "Obese (Class II)";
  else return "Obese (Class III)";
};

try {
  const bmiValues = parseArguments(process.argv);
  console.log(calculateBmi(bmiValues.height, bmiValues.weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
export { calculateBmi };