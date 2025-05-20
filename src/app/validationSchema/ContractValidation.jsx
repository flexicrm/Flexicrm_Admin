const contractValidationSchema = Yup.object().shape({
    contractId: Yup.string().required('Contract ID is required'),
    subject: Yup.string().required('Subject is required'),
    customer: Yup.string().required('Customer ID is required'),
    contractStartDate: Yup.date().required('Contract start date is required'),
    contractEndDate: Yup.date().required('Contract end date is required').min(Yup.ref('contractStartDate'), 'End date must be after start date'),
    contractValue: Yup.number().required('Contract value is required').positive(),
    createdBy: Yup.string().required('Created by User ID is required'),
    attachment: Yup.string(),
    description: Yup.string(),
  });
  