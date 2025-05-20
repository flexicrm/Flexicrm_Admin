
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";

const SaleForm = ({ onSubmit, customers, projectsOptions }) => {
    const formik = useFormik({
        initialValues: {
            customer: null,
            expenseSubject: "",
            description: "",
            expenseBillUpload: null, // File upload
            Amount: "",
            paymentStatus: "Pending", // Default payment status
            paymentMethod: "",
            tags: "",
            date: "", // Date field
            project: null, // Project field
        },
        validationSchema: Yup.object({
            // customerId: Yup.string().required("Customer is required"),
            expenseSubject: Yup.string().required("Expense subject is required"),
            description: Yup.string().required("Description is required"),
            Amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
            paymentMethod: Yup.string().required("Payment method is required"),
            date: Yup.date().required("Date is required").nullable(),
            project: Yup.string().required("Project is required"),
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });
            onSubmit(formData);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="customer">Customer</label><br />
                <Dropdown
                    id="customer"
                    name="customer"
                    options={customers}
                    onChange={(e) => formik.setFieldValue("customer", e.value)}
                    value={formik.values.customer}
                    placeholder="Select a Customer"
                    className="w-100 mb-3"
                />
                {formik.touched.customer && formik.errors.customer && (
                    <div className="error">{formik.errors.customer}</div>
                )}
            </div>

            <div>
                <label htmlFor="expenseSubject">Expense Subject</label><br />
                <InputText
                    id="expenseSubject"
                    name="expenseSubject"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.expenseSubject}
                    className="w-100 mb-3"
                />
                {formik.touched.expenseSubject && formik.errors.expenseSubject && (
                    <div className="error">{formik.errors.expenseSubject}</div>
                )}
            </div>

            <div>
                <label htmlFor="description">Description</label><br />
                <Editor
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    className="w-100 mb-3"
                />
                {formik.touched.description && formik.errors.description && (
                    <div className="error">{formik.errors.description}</div>
                )}
            </div>

            <div>
                <label htmlFor="Amount">Amount</label><br />
                <InputNumber
                    id="Amount"
                    name="Amount"
                    onValueChange={(e) => formik.setFieldValue("Amount", e.value)}
                    value={formik.values.Amount}
                    className="w-100 mb-3"
                />
                {formik.touched.Amount && formik.errors.Amount && (
                    <div className="error">{formik.errors.Amount}</div>
                )}
            </div>

            <div>
                <label htmlFor="expenseBillUpload">Expense Bill Upload</label><br />
                <input
                className="w-100 mb-3"
                    type="file"
                    name="expenseBillUpload"
                    onChange={(event) => {
                        formik.setFieldValue("expenseBillUpload", event.currentTarget.files[0]);
                    }}
                />
                {formik.touched.expenseBillUpload && formik.errors.expenseBillUpload && (
                    <div className="error">{formik.errors.expenseBillUpload}</div>
                )}
            </div>

            <div>
                <label htmlFor="paymentMethod">Payment Method</label><br />
                <InputText
                className="w-100 mb-3"
                    id="paymentMethod"
                    name="paymentMethod"
                    onChange={formik.handleChange}
                    value={formik.values.paymentMethod}
                />
                {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                    <div className="error">{formik.errors.paymentMethod}</div>
                )}
            </div>

            <div>
                <label htmlFor="paymentStatus">Payment Status</label><br />
                <select
                className="w-100 mb-3"
                    id="paymentStatus"
                    name="paymentStatus"
                    onChange={formik.handleChange}
                    value={formik.values.paymentStatus}
                >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                </select>
            </div>

            <div>
                <label htmlFor="date">Date</label><br />
                <InputText
                className="w-100 mb-3"
                    id="date"
                    type="date"
                    name="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                />
                {formik.touched.date && formik.errors.date && (
                    <div className="error">{formik.errors.date}</div>
                )}
            </div>

            <div>
                <label htmlFor="project">Project</label><br />
                <Dropdown
                className="w-100 mb-3"
                    id="project"
                    name="project"
                    options={projectsOptions}
                    onChange={(e) => formik.setFieldValue("project", e.value)}
                    value={formik.values.project}
                    placeholder="Select a Project"
                />
                {formik.touched.project && formik.errors.project && (
                    <div className="error">{formik.errors.project}</div>
                )}
            </div>

            <button type="submit" className="btn-all">Submit</button>
        </form>
    );
};

export default SaleForm;
