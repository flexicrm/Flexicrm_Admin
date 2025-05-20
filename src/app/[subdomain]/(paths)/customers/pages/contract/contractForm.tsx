// "use client";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Dropdown } from "primereact/dropdown";
// import { Button } from "primereact/button";
// import { Calendar } from "primereact/calendar";
// import { Editor } from "primereact/editor";
// // import validationcontract from "./validationschema/contractvalidation"
// const ContractForm = ({ onSubmit, customers }) => {
//   // console.log(customers, ">>>>>>>>>>>>>>>>>>......");

//   const formik = useFormik({
//     initialValues: {
//       customer:customers?._id,
//       subject: "",
//       description: "",
//       contractStartDate: null,
//       contractEndDate: null,
//       contractValue: 0,
//       attachment: "",
//     },
//    validationSchema: Yup.object({
//     subject: Yup.string().required("Project is required"),
//     description: Yup.string().required("Description is required"),
//     contractStartDate: Yup.date().required("Start date is required").nullable(),
//     contractEndDate: Yup.date()
//       .required("End date is required")
//       .nullable()
//       .min(Yup.ref("contractStartDate"), "End date must be after start date"),
//     contractValue: Yup.number()
//       .required("Total is required")
//       .positive("Total must be positive"),
//   })
//   ,

//     onSubmit: (values) => {
//       const formData = new FormData();

//       Object.keys(values).forEach((key) => {
//         if (key === 'contractStartDate' || key === 'contractEndDate') {
//           // Format dates as ISO strings
//           formData.append(key, values[key]?.toISOString());
//         } else if (typeof values[key] === "object" && values[key] !== null) {
//           Object.keys(values[key]).forEach((subKey) => {
//             formData.append(`${key}[${subKey}]`, values[key][subKey]);
//           });
//         } else {
//           formData.append(key, values[key]);
//         }
//       });

//       onSubmit(formData);
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>

//       <div className="field">
//         <label htmlFor="subject">subject</label><br/>
//         <InputText
//           id="subject"
//           name="subject"
//           className="mb-3 w-100"
//           value={formik.values.subject}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           rows={5}
//           cols={30}
//         />
//         {formik.touched.subject && formik.errors.subject && <small className="error">{formik.errors.subject}</small>}
//       </div>

//       <div className="field">
//         <label htmlFor="contractStartDate">Contract Start Date</label><br/>
//         <Calendar
//           id="contractStartDate"
//           name="contractStartDate"
//           className="mb-3 w-100"
//           value={formik.values.contractStartDate}
//           onChange={(e) => formik.setFieldValue("contractStartDate", e.value)}
//           onBlur={formik.handleBlur}
//           dateFormat="mm/dd/yy"
//           showIcon
//         />
//         {formik.touched.contractStartDate && formik.errors.contractStartDate && <small className="error">{formik.errors.contractStartDate}</small>}
//       </div>

//       <div className="field">
//         <label htmlFor="contractEndDate">Contract End Date</label><br/>
//         <Calendar
//           id="contractEndDate"
//           className="mb-3 w-100"
//           value={formik.values.contractEndDate}
//           onChange={(e) => formik.setFieldValue("contractEndDate", e.value)}
//           onBlur={formik.handleBlur}
//           dateFormat="mm/dd/yy"
//           showIcon
//         />
//         {formik.touched.contractEndDate && formik.errors.contractEndDate && <small className="error">{formik.errors.contractEndDate}</small>}
//       </div>

//       <div className="field">
//         <label htmlFor="contractValue">Contract Value</label><br/>
//         <InputNumber
//           id="contractValue"
//           className="mb-3 w-100"
//           value={formik.values.contractValue}
//           onValueChange={(e) => formik.setFieldValue("contractValue", e.value)}
//           onBlur={formik.handleBlur}
//           mode="decimal"
//           min={0}
//         />
//         {formik.touched.contractValue && formik.errors.contractValue && <small className="error">{formik.errors.contractValue}</small>}
//       </div>

//       <div className="field">
//         <label htmlFor="attachment">Attachment</label><br/>
//         <InputText
//           id="attachment"
//           className="mb-3 w-100"
//           type="file"
//           onChange={(event) => {
//             formik.setFieldValue("attachment", event.currentTarget.files[0]);
//           }}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.attachment && formik.errors.attachment && <small className="error">{formik.errors.attachment}</small>}
//       </div>
//       <div className="field">
//         <label htmlFor="description">Description</label><br/>
//         <Editor

//           id="description"
//           name="description"
//           className="mb-3 w-100"
//           value={formik.values.description}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           rows={5}
//           cols={30}
//         />
//         {formik.touched.description && formik.errors.description && <small className="error">{formik.errors.description}</small>}
//       </div>
//       <Button type="submit" label="Submit" className="btn-all"/>
//     </form>
//   );
// };

// export default ContractForm;
'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, InputLabel, FormHelperText, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Editor } from 'primereact/editor';

type ContractFormProps = {
    onSubmit: (formData: FormData) => void;
    customers?: { _id: string };
    contract: any;
};

const ContractForm: React.FC<ContractFormProps> = ({ onSubmit, customers, contract }) => {
    const formik = useFormik({
        initialValues: {
            customer: customers?._id || '',
            subject: contract?.subject || '',
            description: contract?.description || '',
            contractStartDate: contract?.contractStartDate || (null as Date | null),
            contractEndDate: contract?.contractEndDate || (null as Date | null),
            contractValue: contract?.contractValue || 0,
            attachment: contract?.attachment || (null as File | null)
        },
        validationSchema: Yup.object({
            subject: Yup.string().required('Project is required'),
            description: Yup.string().required('Description is required'),
            contractStartDate: Yup.date().required('Start date is required').nullable(),
            contractEndDate: Yup.date().required('End date is required').nullable().min(Yup.ref('contractStartDate'), 'End date must be after start date'),
            contractValue: Yup.number().required('Total is required').positive('Total must be positive')
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                const value = (values as any)[key];
                if (key === 'contractStartDate' || key === 'contractEndDate') {
                    if (value) formData.append(key, value.toISOString());
                } else if (key === 'attachment' && value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, value);
                }
            });
            onSubmit(formData);
        }
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            id="subject"
                            name="subject"
                            label="Subject"
                            value={formik.values.subject}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.subject && Boolean(formik.errors.subject)}
                            helperText={formik.touched.subject &&  typeof formik.errors.subject === "string"}
                            margin="normal"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            id="contractValue"
                            name="contractValue"
                            label="Contract Value"
                            type="number"
                            value={formik.values.contractValue}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.contractValue && Boolean(formik.errors.contractValue)}
                            helperText={formik.touched.contractValue && typeof formik.errors.contractValue === "string"}
                            margin="normal"
                            inputProps={{ min: 0 }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <DatePicker
                            label="Contract Start Date"
                            value={formik.values.contractStartDate}
                            onChange={(value) => formik.setFieldValue('contractStartDate', value)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: formik.touched.contractStartDate && Boolean(formik.errors.contractStartDate),
                                    helperText: formik.touched.contractStartDate && typeof formik.errors.contractStartDate === 'string' ? formik.errors.contractStartDate : undefined,
                                    margin: 'normal',
                                    name: 'contractStartDate',
                                    onBlur: formik.handleBlur
                                }
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <DatePicker
                            label="Contract End Date"
                            value={formik.values.contractEndDate}
                            onChange={(value) => formik.setFieldValue('contractEndDate', value)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: formik.touched.contractEndDate && Boolean(formik.errors.contractEndDate),
                                    helperText: formik.touched.contractEndDate && typeof formik.errors.contractEndDate === 'string' ? formik.errors.contractEndDate : undefined,
                                    margin: 'normal',
                                    name: 'contractEndDate',
                                    onBlur: formik.handleBlur
                                }
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel htmlFor="attachment" sx={{ mt: 2 }}>
                            Attachment
                        </InputLabel>
                        <input
                            id="attachment"
                            name="attachment"
                            type="file"
                            style={{ display: 'block', marginTop: 8 }}
                            onChange={(event) => {
                                formik.setFieldValue('attachment', event.currentTarget.files?.[0] || null);
                            }}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.attachment && typeof formik.errors.attachment === 'string' && <FormHelperText error>{formik.errors.attachment}</FormHelperText>}
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <InputLabel htmlFor="description" sx={{ mt: 2 }}>
                            Description
                        </InputLabel>
                        {/* <Editor
                            id="description"
                            value={formik.values.description}
                            init={{
                                height: 200,
                                menubar: false,
                                plugins: ['advlist autolink lists link charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount'],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={(content) => formik.setFieldValue('description', content)}
                            onBlur={formik.handleBlur as any}
                        /> */}
                        <Editor id="description" name="description" className="w-100 mb-4" value={formik.values.description} onTextChange={(e) => formik.setFieldValue('description', e.htmlValue)} onBlur={formik.handleBlur as any} />
                        {formik.touched.description && typeof formik.errors.description === 'string' && (
                            <FormHelperText error>{formik.errors.description}</FormHelperText>
                        )}
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>
    );
};

export default ContractForm;
