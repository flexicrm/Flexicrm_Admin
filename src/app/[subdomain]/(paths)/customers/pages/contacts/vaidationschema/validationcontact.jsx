import * as Yup from 'yup';

const validationEditContact = Yup.object().shape({
  position: Yup.string().required('Position is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  mobileNo: Yup.string().required('Mobile number is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  companyId: Yup.string().required('Company ID is required'),
  description: Yup.string().required('Description is required'),
  primaryContact: Yup.boolean().required('Primary contact status is required'),
  contactProfile: Yup.string().required('Contact profile is required'),
  notifications: Yup.object().shape({
    email: Yup.object().shape({
      invoice: Yup.boolean().required('Invoice notification setting is required'),
      estimate: Yup.boolean().required('Estimate notification setting is required'),
      project: Yup.boolean().required('Project notification setting is required'),
      contract: Yup.boolean().required('Contract notification setting is required'),
    }).required('Email notifications settings are required'),
  }).required('Notifications settings are required'),
});

export default validationEditContact;
