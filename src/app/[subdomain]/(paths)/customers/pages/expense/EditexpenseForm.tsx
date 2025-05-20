import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
const formatDate = (date) => {
    return new Date(date);
};
const EditExpenseForm = ({ onSubmit, expense, customers, projectsOptions }) => {
    console.log(expense, 'Received expense in EditExpenseForm');

    const formik = useFormik({
        initialValues: {
            expenseId: expense?.expenseId || '',
            customer: expense?.customer._id || null,
            expenseSubject: expense?.expenseSubject || '',
            description: expense?.description || '',
            expenseBillUpload: null,
            Amount: expense?.Amount || '',
            paymentStatus: expense?.paymentStatus || 'Pending',
            paymentMethod: expense?.paymentMethod || '',
            tags: expense?.tags || '',
            date: expense.date ? formatDate(expense.date) : null,
            project: expense?.project._id || null
        },
        validationSchema: Yup.object({
            expenseSubject: Yup.string().required('Expense subject is required'),
            description: Yup.string().required('Description is required'),
            Amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
            paymentMethod: Yup.string().required('Payment method is required'),
            date: Yup.date().required('Date is required').nullable(),
            project: Yup.string().required('Project is required')
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });
            onSubmit(formData);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="expenseId">Expense ID</label>
                <br />
                <InputText id="expenseId" name="expenseId" value={formik.values.expenseId} readOnly className="w-100 mb-4" />
            </div>

            {/* <div>
                <label htmlFor="customer">Customer</label><br />
                <Dropdown
                    id="customer"
                    name="customer"
                    options={customers}
                    onChange={(e) => formik.setFieldValue("customer", e.value)}
                    value={formik.values.customer}
                    placeholder="Select a Customer"
                />
                {formik.touched.customer && formik.errors.customer && (
                    <div className="error">{formik.errors.customer}</div>
                )}
            </div> */}
            <div>
                <label htmlFor="project">Project</label>
                <br />
                <Dropdown
                    id="project"
                    name="project"
                    className="w-100 mb-4"
                    optionLabel="label" // Adjust to match your data structure
                    optionValue="value"
                    options={projectsOptions}
                    onChange={(e) => formik.setFieldValue('project', e.value)}
                    value={formik.values.project}
                    placeholder="Select a Project"
                />
                {formik.touched.project && typeof formik.errors.project === 'string' && <div className="error">{formik.errors.project}</div>}
            </div>
            <div>
                <label htmlFor="expenseSubject">Expense Subject</label>
                <br />
                <InputText id="expenseSubject" name="expenseSubject" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.expenseSubject} className="w-100 mb-4" />
                {formik.touched.expenseSubject && typeof formik.errors.expenseSubject === 'string' && <div className="error">{formik.errors.expenseSubject}</div>}
            </div>

            <div>
                <label htmlFor="Amount">Amount</label>
                <br />
                <InputNumber id="Amount" name="Amount" onValueChange={(e) => formik.setFieldValue('Amount', e.value)} value={formik.values.Amount} className="w-100 mb-4" />
                {formik.touched.Amount && typeof formik.errors.Amount === 'string' && <div className="error">{formik.errors.Amount}</div>}
            </div>

            <div>
                <label htmlFor="expenseBillUpload">Expense Bill Upload</label>
                <br />
                <input
                    type="file"
                    name="expenseBillUpload"
                    onChange={(event) => {
                        formik.setFieldValue('expenseBillUpload', event.currentTarget.files[0]);
                    }}
                    className="w-100 mb-4"
                />
                {formik.touched.expenseBillUpload && typeof formik.errors.expenseBillUpload === 'string' && <div className="error">{formik.errors.expenseBillUpload}</div>}
            </div>

            <div>
                <label htmlFor="paymentMethod">Payment Method</label>
                <br />
                <InputText id="paymentMethod" name="paymentMethod" onChange={formik.handleChange} value={formik.values.paymentMethod} className="w-100 mb-4" />
                {formik.touched.paymentMethod && typeof formik.errors.paymentMethod === 'string' && <div className="error">{formik.errors.paymentMethod}</div>}
            </div>

            <div>
                <label htmlFor="paymentStatus">Payment Status</label>
                <br />
                <select id="paymentStatus" name="paymentStatus" className="w-100 mb-4" onChange={formik.handleChange} value={formik.values.paymentStatus}>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                </select>
            </div>

            <div>
                <label htmlFor="date">Date</label>
                <br />
                <Calendar id="date" name="date" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-100 mb-4" value={formik.values.date} showIcon />
                {formik.touched.date && typeof formik.errors.date === 'string' && <div className="error">{formik.errors.date}</div>}
            </div>

            <div>
                <label htmlFor="tags">Tags</label>
                <br />
                <Chips id="tags" name="tags" onChange={formik.handleChange} value={formik.values.tags} className="w-100 mb-4" placeholder="Enter tags separated by commas" />
                {formik.touched.tags && typeof formik.errors.tags === 'string' && <div className="error">{formik.errors.tags}</div>}
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <br />
                <Editor id="description" name="description" className="w-100 mb-4" onChange={formik.handleChange} value={formik.values.description} />
                {formik.touched.description && typeof formik.errors.description === 'string' && <div className="error">{formik.errors.description}</div>}
            </div>
            <Button type="submit" className="btn-all">
                Submit
            </Button>
        </form>
    );
};

export default EditExpenseForm;
