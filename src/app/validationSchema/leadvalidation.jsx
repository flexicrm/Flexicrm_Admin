const leadValidationSchema = Yup.object().shape({
    LeadId: Yup.string().required('Lead ID is required').unique(),
    assignTo: Yup.string(),
    leadstatus: Yup.string(),
    leadsource: Yup.string(),
    manualData: Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email('Invalid email'),
      mobileNo: Yup.string(),
      address: Yup.object().shape({
        street: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        zipCode: Yup.string(),
        country: Yup.string(),
      }),
    }),
    Company: Yup.string(),
    description: Yup.string(),
    followUps: Yup.array().of(
      Yup.object().shape({
        followUpDate: Yup.date(),
        notes: Yup.string(),
        status: Yup.string().oneOf(['pending', 'completed']),
      })
    ),
    updatedBy: Yup.string(),
  });
  