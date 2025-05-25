// // 'use client';

// // import { useFormik } from 'formik';
// // import * as Yup from 'yup';
// // import { TextField, Button, MenuItem, Chip, Box, Grid, Autocomplete } from '@mui/material';
// // import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // import { useContext, useMemo, useState } from 'react';
// // import Itempage from '../estimate/itempage';
// // import userContext from '../../../../../UseContext/UseContext';

// // interface Customer {
// //     _id: string;
// //     [key: string]: any;
// // }

// // interface Item {
// //     _id: string;
// //     itemName: string;
// //     [key: string]: any;
// // }

// // interface InvoiceFormProps {
// //     onSubmit: (formData: FormData) => void;
// //     customers: Customer;
// //     item: Item[];
// // }

// // const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit, customers, item }) => {
// //     const { subtotals, finalTotals, discounts } = useContext(userContext);

// //     const itemOptions = useMemo(() => (Array.isArray(item) ? item.map((i) => ({ label: i.itemName, value: i._id })) : []), [item]);

// //     const [selectedItem, setSelectedItem] = useState<string[]>([]);

// //     const formik = useFormik({
// //         initialValues: {
// //             customerId: customers._id,
// //             dueDate: null as Date | null,
// //             issuedDate: null as Date | null,
// //             paymentStatus: 'unpaid',
// //             paymentMethod: '',
// //             tags: [] as string[],
// //             items: [] as string[],
// //             notes: '',
// //             subtotal: 0,
// //             total: 0
// //         },
// //         validationSchema: Yup.object({
// //             customerId: Yup.string().required('Customer is required'),
// //             issuedDate: Yup.date().required('Issued date is required').nullable(),
// //             dueDate: Yup.date().required('Due date is required').nullable(),
// //             subtotal: Yup.number().required('Subtotal is required'),
// //             total: Yup.number().required('Total is required')
// //         }),
// //         onSubmit: (values) => {
// //             const formData = new FormData();
// //             const formattedValues = {
// //                 ...values,
// //                 discount: discounts,
// //                 total: finalTotals,
// //                 subTotal: subtotals,
// //                 items: selectedItem
// //             };

// //             Object.keys(formattedValues).forEach((key) => {
// //                 const value = formattedValues[key as keyof typeof formattedValues];
// //                 if (Array.isArray(value)) {
// //                     value.forEach((item, index) => {
// //                         formData.append(`${key}[${index}]`, item);
// //                     });
// //                 } else {
// //                     formData.append(key, value as any);
// //                 }
// //             });

// //             onSubmit(formData);
// //         }
// //     });

// //     const paymentStatusOptions = [
// //         { label: 'Unpaid', value: 'unpaid' },
// //         { label: 'Paid', value: 'paid' },
// //         { label: 'Partial', value: 'partial' }
// //     ];

// //     return (
// //         <LocalizationProvider dateAdapter={AdapterDateFns}>
// //             <form onSubmit={formik.handleSubmit}>
// //                 <Grid container spacing={2}>
// //                     <Grid size={{ xs: 12, sm: 6 }}>
// //                         <DatePicker
// //                             label="Issued Date"
// //                             sx={{ width: '100%' }}
// //                             value={formik.values.issuedDate}
// //                             onChange={(date) => formik.setFieldValue('issuedDate', date)}
// //                             renderInput={(params) => <TextField {...params} fullWidth error={!!formik.touched.issuedDate && !!formik.errors.issuedDate} helperText={formik.touched.issuedDate && formik.errors.issuedDate} />}
// //                         />
// //                     </Grid>

// //                     <Grid size={{ xs: 12, sm: 6 }}>
// //                         <DatePicker
// //                             sx={{ width: '100%' }}
// //                             label="Due Date"
// //                             value={formik.values.dueDate}
// //                             onChange={(date) => formik.setFieldValue('dueDate', date)}
// //                             renderInput={(params: any) => <TextField {...params} fullWidth error={!!formik.touched.dueDate && !!formik.errors.dueDate} helperText={formik.touched.dueDate && formik.errors.dueDate} />}
// //                         />
// //                     </Grid>
// //                     <Grid size={{ xs: 12, sm: 6 }}>
// //                         <TextField select label="Payment Status" name="paymentStatus" value={formik.values.paymentStatus} onChange={formik.handleChange} fullWidth>
// //                             {paymentStatusOptions.map((option) => (
// //                                 <MenuItem key={option.value} value={option.value}>
// //                                     {option.label}
// //                                 </MenuItem>
// //                             ))}
// //                         </TextField>
// //                     </Grid>
// //                     <Grid size={{ xs: 12, sm: 6 }}>
// //                         <TextField label="Payment Method" name="paymentMethod" value={formik.values.paymentMethod} onChange={formik.handleChange} fullWidth />
// //                     </Grid>
// //                     <Grid size={{ xs: 12, sm: 6 }}>
// //                         <TextField label="Notes" name="notes" value={formik.values.notes} onChange={formik.handleChange} fullWidth />
// //                     </Grid>
// //                     <Grid size={{ xs: 12, sm: 6 }}>
// //                         <Autocomplete
// //                             multiple
// //                             freeSolo
// //                             options={[]}
// //                             value={formik.values.tags}
// //                             onChange={(_, value) => formik.setFieldValue('tags', value)}
// //                             renderTags={(value: string[], getTagProps) => value.map((option: string, index: number) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)}
// //                             renderInput={(params) => <TextField {...params} label="Tags" fullWidth />}
// //                         />
// //                     </Grid>
// //                     <Grid size={{ xs: 12, sm: 6 }}>
// //                         <Autocomplete
// //                             multiple
// //                             options={itemOptions}
// //                             getOptionLabel={(option) => option.label}
// //                             value={itemOptions.filter((opt) => selectedItem.includes(opt.value))}
// //                             onChange={(_, value) => {
// //                                 const ids = value.map((v) => v.value);
// //                                 setSelectedItem(ids);
// //                                 formik.setFieldValue('items', ids);
// //                             }}
// //                             renderInput={(params) => <TextField {...params} label="Select Items" fullWidth />}
// //                         />
// //                     </Grid>
// //                     <Grid size={{ xs: 12, sm: 6 }}>{selectedItem.length > 0 && <Itempage selectedItem={selectedItem} />}</Grid>
// //                     <Grid size={{ xs: 12, sm: 6 }}>
// //                         <Box mt={2}>
// //                             <Button type="submit" variant="contained" color="primary">
// //                                 Submit
// //                             </Button>
// //                         </Box>
// //                     </Grid>
// //                 </Grid>
// //             </form>
// //         </LocalizationProvider>
// //     );
// // };

// // export default InvoiceForm;
// 'use client';

// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { TextField, Button, MenuItem, Chip, Box, Grid, Autocomplete } from '@mui/material';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { useContext, useMemo, useState } from 'react';
// import Itempage from '../estimate/itempage';
// import userContext from '../../../../../UseContext/UseContext';

// interface Customer {
//     _id: string;
//     [key: string]: any;
// }

// interface Item {
//     _id: string;
//     itemName: string;
//     [key: string]: any;
// }

// interface Address {
//     street: string;
//     city: string;
//     state: string;
//     zipcode: string;
//     country: string;
// }

// interface InvoiceFormProps {
//     onSubmit: (formData: FormData) => void;
//     customers: Customer[];
//     items: any;
//     // createdBy: string; // User ID who is creating the invoice
// }

// const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit, customers, items }) => {
//     const { subtotals, finalTotals, discounts } = useContext(userContext);

//     const itemOptions = useMemo(() => (Array.isArray(items) ? items.map((i) => ({ label: i.itemName, value: i._id })) : []), [items]);
//     const customerOptions = useMemo(() => (Array.isArray(customers) ? customers.map((c) => ({ label: c.name || c.email, value: c._id })) : []), [customers]);

//     const [selectedItems, setSelectedItems] = useState<string[]>([]);
//     const [sameAsBilling, setSameAsBilling] = useState(true);

//     const formik = useFormik({
//         initialValues: {
//             invoiceNumber: '',
//             customer: '',
//             lead: '',
//             project: '',
//             saleAgent: '',
//             discountType: 'percentage',
//             issuedDate: new Date(),
//             dueDate: null as Date | null,
//             billingTo: {
//                 street: '',
//                 city: '',
//                 state: '',
//                 zipcode: '',
//                 country: ''
//             } as Address,
//             shippingTo: {
//                 street: '',
//                 city: '',
//                 state: '',
//                 zipcode: '',
//                 country: ''
//             } as Address,
//             currency: 'USD',
//             recurringInvoice: '',
//             totalCycle: 0,
//             paymentMethod: '',
//             invoiceFile: '',
//             gstNo: '',
//             items: [] as string[],
//             subtotal: 0,
//             discount: 0,
//             adjustment: 0,
//             gst: 0,
//             igst: 0,
//             total: 0,
//             status: 1, // Assuming 1 is ACTIVE
//             paymentStatus: 'unpaid',
//             tags: [] as string[],
//             adminNotes: '',
//             clientNotes: '',
//             termsAndConditions: ''
//         },
//         validationSchema: Yup.object({
//             invoiceNumber: Yup.string().required('Invoice number is required'),
//             customer: Yup.string().required('Customer is required'),
//             issuedDate: Yup.date().required('Issued date is required'),
//             dueDate: Yup.date().required('Due date is required').nullable(),
//             billingTo: Yup.object().shape({
//                 street: Yup.string().required('Street is required'),
//                 city: Yup.string().required('City is required'),
//                 state: Yup.string().required('State is required'),
//                 zipcode: Yup.string().required('Zipcode is required'),
//                 country: Yup.string().required('Country is required')
//             }),
//             items: Yup.array().min(1, 'At least one item is required'),
//             subtotal: Yup.number().min(0, 'Subtotal must be positive').required('Subtotal is required'),
//             total: Yup.number().min(0, 'Total must be positive').required('Total is required'),
//             gst: Yup.number().min(0, 'GST must be positive').required('GST is required'),
//             igst: Yup.number().min(0, 'IGST must be positive').required('IGST is required')
//         }),
//         onSubmit: (values) => {
//             const formData = new FormData();
//             const formattedValues = {
//                 ...values,
//                 discount: discounts,
//                 total: finalTotals,
//                 subtotal: subtotals,
//                 items: selectedItems
//                 // createdBy: createdBy
//             };

//             Object.keys(formattedValues).forEach((key) => {
//                 const value = formattedValues[key as keyof typeof formattedValues];
//                 if (value !== null && value !== undefined) {
//                     if (typeof value === 'object' && !(value instanceof Date)) {
//                         formData.append(key, JSON.stringify(value));
//                     } else if (Array.isArray(value)) {
//                         value.forEach((item, index) => {
//                             formData.append(`${key}[${index}]`, item);
//                         });
//                     } else {
//                         formData.append(key, value.toString());
//                     }
//                 }
//             });

//             onSubmit(formData);
//         }
//     });

//     const paymentStatusOptions = [
//         { label: 'Unpaid', value: 'unpaid' },
//         { label: 'Paid', value: 'paid' },
//         { label: 'Partial', value: 'partial' }
//     ];

//     const paymentMethodOptions = [
//         { label: 'Cash', value: 'cash' },
//         { label: 'Credit Card', value: 'credit card' },
//         { label: 'Bank Transfer', value: 'bank transfer' },
//         { label: 'Other', value: 'other' }
//     ];

//     const discountTypeOptions = [
//         { label: 'Percentage', value: 'percentage' },
//         { label: 'Flat', value: 'flat' }
//     ];

//     const handleSameAsBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const checked = e.target.checked;
//         setSameAsBilling(checked);
//         if (checked) {
//             formik.setFieldValue('shippingTo', { ...formik.values.billingTo });
//         } else {
//             formik.setFieldValue('shippingTo', {
//                 street: '',
//                 city: '',
//                 state: '',
//                 zipcode: '',
//                 country: ''
//             });
//         }
//     };

//     return (
//         <>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//                 <form onSubmit={formik.handleSubmit}>
//                     <Grid container spacing={2}>
//                         {/* Basic Information */}
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField
//                                 label="Invoice Number"
//                                 name="invoiceNumber"
//                                 value={formik.values.invoiceNumber}
//                                 onChange={formik.handleChange}
//                                 error={formik.touched.invoiceNumber && Boolean(formik.errors.invoiceNumber)}
//                                 helperText={formik.touched.invoiceNumber && formik.errors.invoiceNumber}
//                                 fullWidth
//                             />
//                         </Grid>

//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <Autocomplete
//                                 options={customerOptions}
//                                 getOptionLabel={(option) => option.label}
//                                 value={customerOptions.find((opt) => opt.value === formik.values.customer) || null}
//                                 onChange={(_, value) => formik.setFieldValue('customer', value?.value || '')}
//                                 renderInput={(params) => <TextField {...params} label="Customer" error={formik.touched.customer && Boolean(formik.errors.customer)} helperText={formik.touched.customer && formik.errors.customer} required />}
//                             />
//                         </Grid>

//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <DatePicker label="Issued Date" value={formik.values.issuedDate} onChange={(date) => formik.setFieldValue('issuedDate', date)} slotProps={{ textField: { fullWidth: true, required: true } }} />
//                         </Grid>

//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <DatePicker label="Due Date" value={formik.values.dueDate} onChange={(date) => formik.setFieldValue('dueDate', date)} slotProps={{ textField: { fullWidth: true, required: true } }} />
//                         </Grid>

//                         {/* Billing Address */}
//                         <Grid size={{ xs: 12, sm: 12 }}>
//                             <h3>Billing Address</h3>
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField
//                                 label="Street"
//                                 name="billingTo.street"
//                                 value={formik.values.billingTo.street}
//                                 onChange={formik.handleChange}
//                                 error={Boolean(formik.touched.billingTo?.street && formik.errors.billingTo?.street)}
//                                 helperText={formik.touched.billingTo?.street && formik.errors.billingTo?.street}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField
//                                 label="City"
//                                 name="billingTo.city"
//                                 value={formik.values.billingTo.city}
//                                 onChange={formik.handleChange}
//                                 error={Boolean(formik.touched.billingTo?.city && formik.errors.billingTo?.city)}
//                                 helperText={formik.touched.billingTo?.city && formik.errors.billingTo?.city}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 4 }}>
//                             <TextField
//                                 label="State"
//                                 name="billingTo.state"
//                                 value={formik.values.billingTo.state}
//                                 onChange={formik.handleChange}
//                                 error={Boolean(formik.touched.billingTo?.state && formik.errors.billingTo?.state)}
//                                 helperText={formik.touched.billingTo?.state && formik.errors.billingTo?.state}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 4 }}>
//                             <TextField
//                                 label="Zipcode"
//                                 name="billingTo.zipcode"
//                                 value={formik.values.billingTo.zipcode}
//                                 onChange={formik.handleChange}
//                                 error={Boolean(formik.touched.billingTo?.zipcode && formik.errors.billingTo?.zipcode)}
//                                 helperText={formik.touched.billingTo?.zipcode && formik.errors.billingTo?.zipcode}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 4 }}>
//                             <TextField
//                                 label="Country"
//                                 name="billingTo.country"
//                                 value={formik.values.billingTo.country}
//                                 onChange={formik.handleChange}
//                                 error={Boolean(formik.touched.billingTo?.country && formik.errors.billingTo?.country)}
//                                 helperText={formik.touched.billingTo?.country && formik.errors.billingTo?.country}
//                                 fullWidth
//                             />
//                         </Grid>

//                         {/* Shipping Address */}
//                         <Grid size={{ xs: 12, sm: 12 }}>
//                             <h3>Shipping Address</h3>
//                             <label>
//                                 <input type="checkbox" checked={sameAsBilling} onChange={handleSameAsBillingChange} />
//                                 Same as billing address
//                             </label>
//                         </Grid>
//                         {!sameAsBilling && (
//                             <>
//                                 <Grid size={{ xs: 12, sm: 6 }}>
//                                     <TextField label="Street" name="shippingTo.street" value={formik.values.shippingTo.street} onChange={formik.handleChange} fullWidth />
//                                 </Grid>
//                                 <Grid size={{ xs: 12, sm: 6 }}>
//                                     <TextField label="City" name="shippingTo.city" value={formik.values.shippingTo.city} onChange={formik.handleChange} fullWidth />
//                                 </Grid>
//                                 <Grid size={{ xs: 12, sm: 4 }}>
//                                     <TextField label="State" name="shippingTo.state" value={formik.values.shippingTo.state} onChange={formik.handleChange} fullWidth />
//                                 </Grid>
//                                 <Grid size={{ xs: 12, sm: 4 }}>
//                                     <TextField label="Zipcode" name="shippingTo.zipcode" value={formik.values.shippingTo.zipcode} onChange={formik.handleChange} fullWidth />
//                                 </Grid>
//                                 <Grid size={{ xs: 12, sm: 4 }}>
//                                     <TextField label="Country" name="shippingTo.country" value={formik.values.shippingTo.country} onChange={formik.handleChange} fullWidth />
//                                 </Grid>
//                             </>
//                         )}

//                         {/* Items and Pricing */}
//                         <Grid size={{ xs: 12, sm: 12 }}>
//                             <h3>Items</h3>
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <Autocomplete
//                                 multiple
//                                 options={itemOptions}
//                                 getOptionLabel={(option) => option.label}
//                                 value={itemOptions.filter((opt) => selectedItems.includes(opt.value))}
//                                 onChange={(_, value) => {
//                                     const ids = value.map((v) => v.value);
//                                     setSelectedItems(ids);
//                                     formik.setFieldValue('items', ids);
//                                 }}
//                                 renderInput={(params) => <TextField {...params} label="Select Items" error={formik.touched.items && Boolean(formik.errors.items)} helperText={formik.touched.items && formik.errors.items} fullWidth />}
//                             />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 12 }}>{selectedItems.length > 0 && <Itempage selectedItem={selectedItems} />}</Grid>

//                         {/* Payment Information */}
//                         <Grid size={{ xs: 12, sm: 12 }}>
//                             <h3>Payment Information</h3>
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField select label="Payment Status" name="paymentStatus" value={formik.values.paymentStatus} onChange={formik.handleChange} fullWidth>
//                                 {paymentStatusOptions.map((option) => (
//                                     <MenuItem key={option.value} value={option.value}>
//                                         {option.label}
//                                     </MenuItem>
//                                 ))}
//                             </TextField>
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField select label="Payment Method" name="paymentMethod" value={formik.values.paymentMethod} onChange={formik.handleChange} fullWidth>
//                                 {paymentMethodOptions.map((option) => (
//                                     <MenuItem key={option.value} value={option.value}>
//                                         {option.label}
//                                     </MenuItem>
//                                 ))}
//                             </TextField>
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField select label="Discount Type" name="discountType" value={formik.values.discountType} onChange={formik.handleChange} fullWidth>
//                                 {discountTypeOptions.map((option) => (
//                                     <MenuItem key={option.value} value={option.value}>
//                                         {option.label}
//                                     </MenuItem>
//                                 ))}
//                             </TextField>
//                         </Grid>

//                         {/* Notes and Terms */}
//                         <Grid size={{ xs: 12, sm: 12 }}>
//                             <h3>Notes</h3>
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField label="Admin Notes" name="adminNotes" value={formik.values.adminNotes} onChange={formik.handleChange} multiline rows={4} fullWidth />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField label="Client Notes" name="clientNotes" value={formik.values.clientNotes} onChange={formik.handleChange} multiline rows={4} fullWidth />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField label="Terms and Conditions" name="termsAndConditions" value={formik.values.termsAndConditions} onChange={formik.handleChange} multiline rows={4} fullWidth />
//                         </Grid>

//                         {/* Tags */}
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <Autocomplete
//                                 multiple
//                                 freeSolo
//                                 options={[]}
//                                 value={formik.values.tags}
//                                 onChange={(_, value) => formik.setFieldValue('tags', value)}
//                                 renderTags={(value: string[], getTagProps) => value.map((option: string, index: number) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)}
//                                 renderInput={(params) => <TextField {...params} label="Tags" fullWidth />}
//                             />
//                         </Grid>

//                         {/* Submit Button */}
//                         <Grid size={{ xs: 12, sm: 12 }}>
//                             <Box mt={2}>
//                                 <Button type="submit" variant="contained" color="primary" size="large">
//                                     Create Invoice
//                                 </Button>
//                             </Box>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </LocalizationProvider>
//         </>
//     );
// };

// export default InvoiceForm;
import React from 'react'

export default function Page() {
  return (
    <div>P</div>
  )
}
