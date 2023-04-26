import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { addPatientDetails, useStateValue } from "../state";
import EntryLayout from "./EntryLayout";
import { EntryFormValues } from "../AddHospitalEntryModal/AddHospitalEntryForm";
import { EntryFormValuesHealthCheck } from "../AddHealthCheckEntryModal/AddHealthCheckEntryForm";
import { EntryFormValuesOccupationalHealthcare } from "../AddOccupationalHealthcareEntry/AddOccupationalHealthcareEntryForm";
import { addEntry } from "../state";
import AddHospitalEntryModal from "../AddHospitalEntryModal";
import AddHealthCheckEntryModal from "../AddHealthCheckEntryModal";
import AddOccupationalHealthcareEntryModal from "../AddOccupationalHealthcareEntry";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpenHospital, setModalOpenHospital] = React.useState<boolean>(false);
  const [modalOpenHealthCheck, setModalOpenHealthCheck] = React.useState<boolean>(false);
  const [modalOpenOccupationalHealthcare, setModalOpenOccupationalHealthcare] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string>();

  const openModalHospital = (): void => setModalOpenHospital(true);
  const openModalHealthCheck = () : void => setModalOpenHealthCheck(true);
  const openModalOccupationalHealthcare = () : void => setModalOpenOccupationalHealthcare(true);

  const closeModalHospital = (): void => {
    setModalOpenHospital(false);
    setError(undefined);
  };

  const closeModalHealthCheck = (): void => {
    setModalOpenHealthCheck(false);
    setError(undefined);
  };

  const closeModalOccupationalHealthcare = (): void => {
    setModalOpenOccupationalHealthcare(false);
    setError(undefined);
  };

  const submitNewEntryHospital = async (values: EntryFormValues) => {
    try {
      if(id === undefined) {
        return null;
      }
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModalHospital();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const submitNewEntryHealthcheck = async (values: EntryFormValuesHealthCheck) => {
    try {
      if(id === undefined) {
        return null;
      }
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModalHealthCheck();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const submitNewEntryOccupationalHealthcare = async (values: EntryFormValuesOccupationalHealthcare) => {
    try {
      if(id === undefined) {
        return null;
      }
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModalOccupationalHealthcare();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };


  const fetchPatientDetails = async () => {
    try {
      if(id === undefined) {
        return null;
      }
      const { data: patientDetails } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(addPatientDetails(patientDetails));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
      }
    }
  };

  if(id === undefined) {
    return null;
  }
  const patient = patients[id];

  if(patient === undefined) {
    return null;
  }

  if(patient.ssn === undefined) {
    console.log(`SSN not defined, fetching more details for ${patient.name}...`);
    void fetchPatientDetails();
  }

  const entryLayout = () => {
    if(patient.entries) {
      return <div>
        {patient.entries.map(entry =>
          <EntryLayout key={entry.id} entry={entry}/>
        )}
      </div>;
    }
    return null;
  };

  return (
    <div className="PatientPage">
      <h1>{patient.name}</h1> 
      Gender: {patient.gender}<br/>
      SSN: {patient.ssn}<br/>
      Date of birth: {patient.dateOfBirth}<br/>
      Occupation: {patient.occupation}

      <div>
        <h2>Entries</h2>
        {entryLayout()}
      </div>
      <div>
      <AddHospitalEntryModal
        modalOpen={modalOpenHospital}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={submitNewEntryHospital}
        error={error}
        onClose={closeModalHospital}
      />
      <AddHealthCheckEntryModal
        modalOpen={modalOpenHealthCheck}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={submitNewEntryHealthcheck}
        error={error}
        onClose={closeModalHealthCheck}
      />
      <AddOccupationalHealthcareEntryModal
        modalOpen={modalOpenOccupationalHealthcare}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={submitNewEntryOccupationalHealthcare}
        error={error}
        onClose={closeModalOccupationalHealthcare}
      />
      <Button variant="contained" onClick={() => openModalHospital()}>
        Add New Hospital Entry
      </Button>
      <Button variant="contained" onClick={() => openModalHealthCheck()}>
        Add New Health Check Entry
      </Button>
      <Button variant="contained" onClick={() => openModalOccupationalHealthcare()}>
        Add New Occupational Healthcare Entry
      </Button>
      </div>
    </div>
  );
};

export default PatientPage;
