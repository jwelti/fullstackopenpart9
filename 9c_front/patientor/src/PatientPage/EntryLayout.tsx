import React from 'react';
import { Entry } from '../types';
import HospitalEntryLayout from './HospitalEntryLayout';
import OccupationalHealthcareEntryLayout from './OccupationalHealthcareEntryLayout';
import HealthCheckEntryLayout from './HealthCheckEntryLayout';

interface EntryProps {
  entry: Entry;
}
/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryLayout = (props: EntryProps) => {
  switch(props.entry.type) {
    case "Hospital":
      return (
        <HospitalEntryLayout entry={props.entry}/>
      );
      break;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryLayout entry={props.entry}/>
      );
      break;
    case "HealthCheck":
      return (
        <HealthCheckEntryLayout entry={props.entry}/>
      );
      break;
    default:
      return assertNever(props.entry);
  }
};
export default EntryLayout;