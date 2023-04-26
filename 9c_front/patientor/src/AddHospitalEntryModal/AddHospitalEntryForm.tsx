import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HospitalEntry } from "../types";
import { useStateValue } from "../state";

/*
 * use type Entry, but omit id
 */
export type EntryFormValues = Omit<HospitalEntry, "id">;

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddHospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
  
    return (
      <Formik
        initialValues={{
            description: "",
            date: new Date().toISOString().split('T')[0],
            specialist: "",
            diagnosisCodes: [],
            type: "Hospital",
            discharge: {
              criteria: "",
              date: ""
            }
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";
          
          const errors: { [field: string]: string | {[field: string]: string}} = {};
          errors.discharge = {};

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

          if (!values.discharge?.criteria && values.discharge?.date) {
            errors.discharge.criteria = "Field is required if discharge date is given.";
          }
          if (!values.discharge?.date && values.discharge?.criteria) {
            errors.discharge.date = "Field is required if discharge criteria is given.";
          }
          if (values.discharge?.date && !isDate(values.discharge.date)) {
            errors.discharge.date = "Invalid date (yyyy-MM-dd).";
          }
          if (errors.discharge.date === undefined && errors.discharge.criteria === undefined) delete errors.discharge;
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
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              id="dischargeDate"
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

  export default AddHospitalEntryForm;