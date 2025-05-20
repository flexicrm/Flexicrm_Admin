const validationSchema = Yup.object({
    subject: Yup.string().required('Subject is required'),
    openTill: Yup.date().required('Open till date is required'),
    customer: Yup.string().required('Customer is required'),
    project: Yup.string().required('Project is required'),
    description: Yup.string().required('Description is required'),
    total: Yup.number().required('Total is required'),
    subtotal: Yup.number().required('Subtotal is required'),
    gst: Yup.number().required('GST is required'),
    igst: Yup.number().required('IGST is required'),
    createdBy: Yup.string().required('Created By is required'),
  });