import { Box } from '@material-ui/core';
import React from 'react';
import { HospitalEntry } from '../types';
import DiagnosisLayout from './DiagnosisLayout';

interface EntryProps {
  entry: HospitalEntry;
}

const HospitalEntryLayout = (props: EntryProps) => {
  const dischargeLayout = () => {
    if(props.entry.discharge) {
      return <div>
        <h4>Discharged</h4>
        {props.entry.discharge.date} {props.entry.discharge.criteria}
      </div>;
    }
    return null;
  };
  return (
    <Box border={0} borderColor="black">
      <h3>Hospital</h3>
      {props.entry.date} <i>{props.entry.description}</i>
      <br/>
      Specialist: {props.entry.specialist}
      {dischargeLayout()}
      <DiagnosisLayout diagnosisCodes={props.entry.diagnosisCodes}/>
    </Box>
  );
};
export default HospitalEntryLayout;