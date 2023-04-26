import diagnosisService from './services/diagnosisService';
import { Entry, Gender, NewPatientEntry, EntryWithoutId, HealthCheckRating, Discharge, SickLeave } from './types';

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };
type EntryFields = { type: unknown, description: unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown, healthCheckRating: unknown, discharge: unknown, employerName: unknown, sickLeave: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries } : Fields): NewPatientEntry => {
  
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries)
  };

  return newEntry;
};

const toEntryWithoutId = ({ type, description, date, specialist, diagnosisCodes, healthCheckRating, discharge, employerName, sickLeave } : EntryFields): EntryWithoutId => {
  const typeToUse = parseType(type);
  const commonFields = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
  };
  let additionalFields;
  let newEntry;

  switch(typeToUse) {
    case "HealthCheck":
      additionalFields = {
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
      newEntry = {type: typeToUse, ...commonFields, ...additionalFields};
      break;
    case "Hospital":
      if(isDischargeProvided(discharge)) {
        additionalFields = {
          discharge: parseDischarge(discharge)
        };
      }
      newEntry = {type: typeToUse, ...commonFields, ...additionalFields};
      break;
    case "OccupationalHealthcare":
      if(isSickLeaveProvided(sickLeave)) {
        additionalFields = {
          employerName: parseEmployerName(employerName),
          sickLeave: parseSickLeave(sickLeave)
        };
      } else {
        additionalFields = {
          employerName: parseEmployerName(employerName),
        };
      }
      newEntry = {type: typeToUse, ...commonFields, ...additionalFields};
      break;
  }

  return newEntry;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSpecialist = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing specialist');
  }

  return name;
};

const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing employer name');
  }

  return name;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseDateOfBirth = (dob: unknown): string => {
  if (!dob || !isString(dob) || !isDate(dob)) {
    throw new Error('Incorrect or missing date of birth');
  }

  return dob;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }

  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN');
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (typeof healthCheckRating === 'undefined' || !isHealthCheckRating(healthCheckRating)) {
      throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
      throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};

const parseSickLeave = (sickleave: unknown): SickLeave => {
  if (!sickleave || !isSickLeave(sickleave)) {
      throw new Error('Incorrect or missing sick leave: ' + sickleave);
  }
  return sickleave;
};

const parseType = (type: unknown): 'Hospital' | 'HealthCheck' | 'OccupationalHealthcare' => {
  if (!type || !isString(type) || !isValidType(type)) {
      throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries) {
    return [];
  }
  if (!Array.isArray(entries)) {
    throw new Error('Incorrect entries');
  }
  const entriesFiltered = entries.filter(item => isEntry(item));
  if(!isArrayOfEntries(entriesFiltered)) return [];
  return entriesFiltered;
};

const parseDiagnosisCodes = (diags: unknown): string[] => {
  if (!diags) {
    return [];
  }
  if (!Array.isArray(diags)) {
    throw new Error('Incorrect diagnosis codes');
  }
  const diagsFiltered =  diags.filter(item => isString(item) && isDiagnosisCode(item));
  if(!isArrayOfStrings(diagsFiltered)) return [];
  return diagsFiltered;
};

function isArrayOfStrings(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}

function isArrayOfEntries(value: unknown): value is Entry[] {
  return Array.isArray(value) && value.every(item => isEntry(item));
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
 return isString(param.date) && isString(param.criteria);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  return isDate(param.startDate) && isDate(param.endDate);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (param: any): param is Entry => {
  return ['Hospital', 'HealthCheck', 'OccupationalHealthcare'].includes(param.type);
};

const isDiagnosisCode =  (param: string): param is string => {
  return diagnosisService.getEntries().map(e => e.code).includes(param);
};

const isValidType = (param: string): param is 'Hospital' | 'HealthCheck' | 'OccupationalHealthcare' => {
  return ['Hospital', 'HealthCheck', 'OccupationalHealthcare'].includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeaveProvided = (param: any): boolean => {
  return isDate(param.startDate) && isDate(param.endDate);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischargeProvided = (param: any): boolean => {
  return isString(param.date) && isString(param.criteria) && param.date !== "" && param.criteria !== "";
};

export { 
  toNewPatientEntry, 
  toEntryWithoutId
};