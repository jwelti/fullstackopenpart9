import React from 'react';
import { useStateValue } from "../state";

interface DiagnosisListProps {
  diagnosisCodes: string[] | undefined;
}

const DiagnosisLayout = (props: DiagnosisListProps) => {
  const [{ diagnoses }, ] = useStateValue();

  if(props.diagnosisCodes) {
    return <div>
      <h4>Diagnoses</h4>
      <ul>
        {props.diagnosisCodes.map(diagnosis =>
          <li key={diagnosis}>{diagnosis} {diagnoses[diagnosis].name}</li>
        )}
      </ul>
    </div>;
  }
  return null;
};
export default DiagnosisLayout;