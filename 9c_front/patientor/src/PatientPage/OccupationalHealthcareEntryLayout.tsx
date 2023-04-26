import { Box } from '@material-ui/core';
import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import DiagnosisLayout from './DiagnosisLayout';

interface EntryProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryLayout = (props: EntryProps) => {
  const sickLeaveLayout = () => {
    if(props.entry.sickLeave) {
      return <div>
        <h4>Sick leave</h4>
        {props.entry.sickLeave.startDate} - {props.entry.sickLeave.endDate}
      </div>;
    }
    return null;
  };
  return (
    <Box border={0} borderColor="black">
      <h3>Occupational healthcare</h3>
      {props.entry.date} <i>{props.entry.description}</i>
      <br/>
      Specialist: {props.entry.specialist}
      <br/>
      Employer: {props.entry.employerName}
      {sickLeaveLayout()}
      <DiagnosisLayout diagnosisCodes={props.entry.diagnosisCodes}/>
    </Box>
  );
};
export default OccupationalHealthcareEntryLayout;