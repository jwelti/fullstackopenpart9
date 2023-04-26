import patientData from '../../data/patients';
import { NonSensitivePatientEntry, Patient, NewPatientEntry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';
import { toNewPatientEntry } from '../utils';

const patients: Patient[] = patientData.map(obj => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getEntries = () => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = ( id: string, entry: EntryWithoutId ): Patient | undefined => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  const patientEntry = findById(id);
  if(patientEntry) {
    if(!patientEntry.entries) patientEntry.entries = [];
    patientEntry.entries.push(newEntry);
  }
  return patientEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  addEntry,
  findById
};