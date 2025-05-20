const invoiceValidationSchema = Yup.object().shape({
    invoiceNumber: Yup.string().required('Invoice number is required').unique(),
    customer: Yup.string().required('Customer ID is required'),
    dueDate: Yup.date().required('Due date is required'),
    items: Yup.array().of(Yup.string()),
    subtotal: Yup.number().required('Subtotal is required').positive(),
    discount: Yup.number().min(0),
    gst: Yup.number().required('GST is required').positive(),
    igst: Yup.number().required('IGST is required').positive(),
    total: Yup.number().required('Total is required').positive(),
    createdBy: Yup.string().required('Created by User ID is required'),
    paymentStatus: Yup.string().oneOf(['unpaid', 'paid', 'partial']),
    paymentMethod: Yup.string(),
    notes: Yup.string(),
  });
  