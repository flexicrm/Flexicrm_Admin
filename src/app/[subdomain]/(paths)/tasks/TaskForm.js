import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Chips } from "primereact/chips";
import { Editor } from "primereact/editor";
import { Col, Row } from "react-bootstrap";

const TaskForm = ({ onSubmit, users, projectsOptions, tagsOptions }) => {
    const formik = useFormik({
        initialValues: {
            subject: "",
            milestone: "",
            billable: false,
            public: false,
            startDate: "",
            dueDate: "",
            priority: "",
            repeatEvery: "",
            tags: [],
            description: "",
            assignedTo: [],
            project: "",
            followers: []
        },
        validationSchema: Yup.object({
            subject: Yup.string().required("Subject is required"),
            milestone: Yup.string().required("Milestone is required"),
            billable: Yup.boolean().required("Billable is required"),
            public: Yup.boolean().required("Public is required"),
            startDate: Yup.date().required("Start date is required"),
            dueDate: Yup.date().required("Due date is required"),
            priority: Yup.string().required("Priority is required"),
            repeatEvery: Yup.string().required("Repeat every is required"),
            tags: Yup.array().of(Yup.string()).required("Tags are required"),
            description: Yup.string().required("Description is required"),
            assignedTo: Yup.array().of(Yup.string()).required("Assigned to is required"),
            project: Yup.string().required("Project is required"),
            followers: Yup.array().of(Yup.string()).required("Followers are required"),
        }),
        onSubmit: (values) => {
            onSubmit(values);
        },
    });
    const priorityOptions = [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
    ]
    const repeatOptions = [
        { label: 'daily', value: 'daily' },
        { label: 'weekly', value: 'weekly' },
        { label: 'monthly', value: 'monthly' },
        { label: 'yearly', value: 'yearly' },
        { label: 'none', value: 'none' },
    ]
    return (
        <form onSubmit={formik.handleSubmit}>

            <Row>
                 <Col>
                 <div>
                <label htmlFor="subject">Subject</label><br />
                <InputText
                className="mb-3 w-100"
                    id="subject"
                    name="subject"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.subject}
                />
                {formik.touched.subject && formik.errors.subject && (
                    <div className="error">{formik.errors.subject}</div>
                )}
            </div>
                 </Col>
                 <Col>
                 <div>
                <label htmlFor="milestone">Milestone</label><br />
                <InputText
                                className="mb-3 w-100"
                    id="milestone"
                    name="milestone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.milestone}
                />
                {formik.touched.milestone && formik.errors.milestone && (
                    <div className="error">{formik.errors.milestone}</div>
                )}
            </div>
                 </Col>
            </Row>
            <Row>
                <Col>
                <div>
                <label htmlFor="billable">Billable</label><br />
                <input
                                
                    type="checkbox"
                    id="billable"
                    name="billable"
                    onChange={formik.handleChange}
                    checked={formik.values.billable}
                />
                {formik.touched.billable && formik.errors.billable && (
                    <div className="error">{formik.errors.billable}</div>
                )}
            </div>
                </Col>
                <Col>
                <div>
                <label htmlFor="public">Public</label><br />
                <input
                    type="checkbox"               
                    id="public"
                    name="public"
                    onChange={formik.handleChange}
                    checked={formik.values.public}
                />
                {formik.touched.public && formik.errors.public && (
                    <div className="error">{formik.errors.public}</div>
                )}
            </div>
                </Col>
            </Row>
            <Row>
                <Col>
                <div>
                <label htmlFor="startDate">Start Date</label><br />
                <InputText                className="mb-3 w-100"
                    id="startDate"
                    type="date"
                    name="startDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.startDate}
                />
                {formik.touched.startDate && formik.errors.startDate && (
                    <div className="error">{formik.errors.startDate}</div>
                )}
            </div>
                </Col>
                <Col>
                <div>
                <label htmlFor="dueDate">Due Date</label><br />
                <InputText                className="mb-3 w-100"
                    id="dueDate"
                    type="date"
                    name="dueDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dueDate}
                />
                {formik.touched.dueDate && formik.errors.dueDate && (
                    <div className="error">{formik.errors.dueDate}</div>
                )}
            </div>
                </Col>
            </Row>
            <Row>
                <Col>
                <div>
                {/* <label htmlFor="priority">Priority</label><br />
                <InputText
                    id="priority"
                    name="priority"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.priority}
                /> */}
                <label htmlFor="priority">Priority</label><br />
                <Dropdown 
                id="priority"                className="mb-3 w-100"
                name="priority"
                options={priorityOptions}
                onChange={formik.handleChange}
                value={formik.values.priority}
                />
                {formik.touched.priority && formik.errors.priority && (
                    <div className="error">{formik.errors.priority}</div>
                )}
           

                    {/* onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"

                    placeholder="Select a priority"
                    className="w-full md:w-14rem"
                    checkmark={true}
                    highlightOnSelect={false} />

                {formik.touched.priority && formik.errors.priority && (
                    <div className="error">{formik.errors.priority}</div>
                )} */}
            </div>
                </Col>
                <Col>
                <div>
                <label htmlFor="repeatEvery">Repeat Every</label><br />
                {/* <InputText
                    id="repeatEvery"
                    name="repeatEvery"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.repeatEvery}
                /> */}
                 <Dropdown                 className="mb-3 w-100"
                id="repeatEvery"
                name="repeatEvery"
                options={repeatOptions}
                onChange={formik.handleChange}
                value={formik.values.repeatEvery}
                />
                {formik.touched.repeatEvery && formik.errors.repeatEvery && (
                    <div className="error">{formik.errors.repeatEvery}</div>
                )}
            </div>
                </Col>
            </Row>
            <Row>
                <Col>
                <div>
                <label htmlFor="tags">Tags</label><br />
                <Chips
                    id="tags"                className="mb-3 w-100"
                    name="tags"
                    options={tagsOptions}
                    onChange={(e) => formik.setFieldValue("tags", e.value)}
                    value={formik.values.tags}
                    placeholder="Select Tags"
                />
                {formik.touched.tags && formik.errors.tags && (
                    <div className="error">{formik.errors.tags}</div>
                )}
            </div>
                </Col>
                <Col>
                <div>
                <label htmlFor="assignedTo">Assigned To</label><br />
                <MultiSelect                className="mb-3 w-100"
                    id="assignedTo"
                    name="assignedTo"
                    options={users}
                    onChange={(e) => formik.setFieldValue("assignedTo", e.value)}
                    value={formik.values.assignedTo}
                    optionLabel="firstname"
                    optionValue="id"
                    placeholder="Select Users"
                />
                {formik.touched.assignedTo && formik.errors.assignedTo && (
                    <div className="error">{formik.errors.assignedTo}</div>
                )}
            </div>
                </Col>
            </Row>
            <Row>
                <Col>
                <div>
                <label htmlFor="project">Project</label><br />
                <Dropdown
                    id="project"                className="mb-3 w-100"
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
            </Col>
                <Col>
                <div>
                <label htmlFor="followers">Followers</label><br />
                <MultiSelect
                    id="followers"
                    name="followers"                className="mb-3 w-100"
                    options={users}
                    onChange={(e) => formik.setFieldValue("followers", e.value)}
                    value={formik.values.followers}
                    optionLabel="firstname"
                    optionValue="id"
                    placeholder="Select Users"
                />
                {formik.touched.followers && formik.errors.followers && (
                    <div className="error">{formik.errors.followers}</div>
                )}
            </div>
            </Col>
            </Row>










            <div>
                <label htmlFor="description">Description</label><br />
                <Editor
                className="mb-3"
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description && (
                    <div className="error">{formik.errors.description}</div>
                )}
            </div>

            <button type="submit" className="btn-all">Submit</button>
        </form>
    );
};

export default TaskForm;
