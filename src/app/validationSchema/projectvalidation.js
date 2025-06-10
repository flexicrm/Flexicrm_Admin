import * as Yup from 'yup';

const projectValidationSchema = Yup.object().shape({
  projectName: Yup.string().required('Project name is required'),
  customer: Yup.string().required('Customer ID is required'),
  totalRate: Yup.number().required('Total rate is required').positive(),
  startDate: Yup.date().required('Start date is required'),
  deadline: Yup.date().required('Deadline is required').min(Yup.ref('startDate'), 'Deadline must be after start date'),
  description: Yup.string(),
  sendEmail: Yup.boolean(),
  tags: Yup.array().of(Yup.string()),
  createdBy: Yup.string().required('Created by User ID is required'),
  customFields: Yup.array().of(
    Yup.object().shape({
      fieldName: Yup.string(),
      fieldValue: Yup.mixed(),
    })
  ),
});
