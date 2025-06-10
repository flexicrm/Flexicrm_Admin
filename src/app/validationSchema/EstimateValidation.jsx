const estimationValidationSchema = Yup.object().shape({
    customer: Yup.string().required('Customer ID is required'),
    project: Yup.string().required('Project ID is required'),
    billingTo: Yup.object().shape({
      street: Yup.string().required('Billing street is required'),
      city: Yup.string().required('Billing city is required'),
      state: Yup.string().required('Billing state is required'),
      zipcode: Yup.string().required('Billing zipcode is required'),
      country: Yup.string().required('Billing country is required'),
    }),
    shippingTo: Yup.object().shape({
      street: Yup.string().required('Shipping street is required'),
      city: Yup.string().required('Shipping city is required'),
      state: Yup.string().required('Shipping state is required'),
      zipcode: Yup.string().required('Shipping zipcode is required'),
      country: Yup.string().required('Shipping country is required'),
    }),
    estimationNo: Yup.string().required('Estimation number is required').unique(),
    currency: Yup.string().required('Currency is required'),
    estimateDate: Yup.date().required('Estimate date is required'),
    expireDate: Yup.date().required('Expiration date is required').min(Yup.ref('estimateDate'), 'Expire date must be after estimate date'),
    items: Yup.array().of(Yup.string()),
    subTotal: Yup.number().required('Subtotal is required').positive(),
    discount: Yup.number().min(0),
    total: Yup.number().required('Total is required').positive(),
    createdBy: Yup.string().required('Created by User ID is required'),
  });
  