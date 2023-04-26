import React from 'react';
import { CoursePart } from '../types'

interface PartProps {
  coursePart: CoursePart;
}
/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
  switch(props.coursePart.type) {
    case "normal":
      return (
        <p>
          <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/><i>{props.coursePart.description}</i>
        </p>
      );
      break;
    case "groupProject":
      return (
        <p>
          <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/>Project exercises {props.coursePart.exerciseCount}
        </p>
      );
      break;
    case "submission":
      return (
        <p>
          <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/><i>{props.coursePart.description}</i><br/>Submit to {props.coursePart.exerciseSubmissionLink}
        </p>
      );
      break;
    case "special"  :
      return (
        <p>
          <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/><i>{props.coursePart.description}</i><br/>Required skills: {props.coursePart.requirements.join(', ')}
        </p>
      );
    default:
      return assertNever(props.coursePart)
  }
}
export default Part;