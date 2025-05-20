const expenseValidationSchema = Yup.object().shape({
    expenseId: Yup.string().required('Expense ID is required').unique(),
    expenseSubject: Yup.string().required('Expense subject is required'),
    customer: Yup.string().required('Customer ID is required'),
    project: Yup.string().required('Project ID is required'),
    date: Yup.date().required('Date is required'),
    description: Yup.string().required('Description is required'),
    createdBy: Yup.string().required('Created by User ID is required'),
    Amount: Yup.number().required('Amount is required').positive(),
    paymentMethod: Yup.string().oneOf(['Cash', 'Credit Card', 'Bank Transfer', 'Other']),
    paymentStatus: Yup.string().oneOf(['Pending', 'Closed']),
  });
  