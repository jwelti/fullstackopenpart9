import { Box } from '@material-ui/core';
import React from 'react';
import { HealthCheckEntry } from '../types';
import DiagnosisLayout from './DiagnosisLayout';

interface EntryProps {
  entry: HealthCheckEntry;
}

const HealthCheckEntryLayout = (props: EntryProps) => {
  return (
    <Box border={0} borderColor="black">
      <h3>Health check</h3>
      {props.entry.date} <i>{props.entry.description}</i>
      <br/>
      Specialist: {props.entry.specialist}
      <br/>
      Rating: {props.entry.healthCheckRating}
      <DiagnosisLayout diagnosisCodes={props.entry.diagnosisCodes}/>
    </Box>
  );
};
export default HealthCheckEntryLayout;