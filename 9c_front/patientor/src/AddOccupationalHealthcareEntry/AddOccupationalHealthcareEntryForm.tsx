import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";

/*
 * use type Entry, but omit id
 */
export type EntryFormValuesOccupationalHealthcare = Omit<OccupationalHealthcareEntry, "id">;

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

interface Props {
  onSubmit: (values: EntryFormValuesOccupationalHealthcare) => void;
  onCancel: () => void;
}

const AddOccupationalHealthcareEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
  
    return (
      <Formik
        initialValues={{
            description: "",
            date: new Date().toISOString().split('T')[0],
            specialist: "",
            diagnosisCodes: [],
            type: "OccupationalHealthcare",
            employerName: "",
            sickLeave: {
              startDate: "",
              endDate: ""
            }
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";
          
          const errors: { [field: string]: string | {[field: string]: string}} = {};
          errors.sickLeave = {};

          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (values.date && !isDate(values.date)) {
            errors.date = "Invalid date (yyyy-MM-dd).";
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }

          if (!values.sickLeave?.endDate && values.sickLeave?.startDate) {
            errors.sickLeave.endDate = "Field is required if start date is given.";
          }
          if (!values.sickLeave?.startDate && values.sickLeave?.endDate) {
            errors.sickLeave.startDate = "Field is required if end date is given.";
          }
          if (values.sickLeave?.startDate && !isDate(values.sickLeave.startDate)) {
            errors.sickLeave.startDate = "Invalid date (yyyy-MM-dd).";
          }
          if (values.sickLeave?.endDate && !isDate(values.sickLeave.endDate)) {
            errors.sickLeave.endDate = "Invalid date (yyyy-MM-dd).";
          }
          if (errors.sickLeave.startDate === undefined && errors.sickLeave.endDate === undefined) delete errors.sickLeave;
          return errors;
        }}
      >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
  
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sickleave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sickleave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />    
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    );
  };

  export default AddOccupationalHealthcareEntryForm;