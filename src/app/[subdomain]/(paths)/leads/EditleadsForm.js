
'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import LeadStatus from './leadstatus';
import LeadSource from './leadsource';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const EditLeadForm = ({ lead, onSubmit, UsersOptions }) => {
    console.log(lead, '==================lead========================');
    // const dataleads = lead
    // console.log(dataleads,"dataleads")
    console.log(lead.lead, 'asjhasashjasas');
    const [leadStatus, setLeadStatus] = useState(lead?.lead?.leadstatus);
    const [leadSource, setLeadSource] = useState(lead?.lead?.leadsource);
    // const [customFields, setCustomFields] = useState(dataleads);

    const formik = useFormik({
        initialValues: {
            manualData: {
                name: lead?.manualData?.name || '',
                email: lead?.manualData?.email || '',
                mobileNo: lead?.manualData?.mobileNo || '',
                company: lead?.manualData?.company || '',
                address: {
                    street: lead?.manualData?.address?.street || '',
                    city: lead?.manualData?.address?.city || '',
                    state: lead?.manualData?.address?.state || '',
                    zipCode: lead?.manualData?.address?.zipCode || '',
                    country: lead?.manualData?.address?.country || ''
                }
            },
            description: lead?.description || '',
            assignTo: lead?.assignTo?.firstname || null
        },
        validationSchema: Yup.object({
            manualData: Yup.object().shape({
                name: Yup.string().required('Required'),
                email: Yup.string().email('Invalid email format').required('Required'),
                company: Yup.string().required('Required'),
                mobileNo: Yup.string()
                    .matches(/^\+\d{2}-\d{10}$/, 'Mobile number must be in format +xx-xxxxxxxxxx')
                    .required('Required'),
                address: Yup.object().shape({
                    street: Yup.string().required('Required'),
                    city: Yup.string().required('Required'),
                    state: Yup.string().required('Required'),
                    zipCode: Yup.string().required('Required'),
                    country: Yup.string().required('Required')
                })
            }),
            assignTo: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            const formData = {
                leadsource: leadSource,
                leadstatus: leadStatus,
                manualData: values.manualData,
                assignTo: values.assignTo,
                description: values.description,
                customFields: customFields // Use the updated customFields state
            };
            onSubmit(formData);
        }
    });

    const handleFieldChange = (fieldName, value) => {
        setCustomFields((prevValues) => {
            const existingFieldIndex = prevValues.findIndex((item) => item.label === fieldName);

            if (existingFieldIndex >= 0) {
                // If it exists, update its value
                const updatedValues = [...prevValues];
                updatedValues[existingFieldIndex].value = value;
                return updatedValues;
            } else {
                // If it doesn't exist, add a new entry
                return [...prevValues, { label: fieldName, value: value }];
            }
        });
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <ul className="d-flex  list-inline">
                <li>
                    <label htmlFor="leadStatus">Lead Status</label>
                    <LeadStatus onSelect={setLeadStatus} selected={leadStatus} />
                </li>
                <li className="ms-2">
                    <label htmlFor="leadSource">Lead Source</label>
                    <LeadSource onSelect={setLeadSource} selected={leadSource} />
                </li>
                <li className="ms-2">
                    <div>
                        <label htmlFor="assignTo">assignTo</label>
                        <br />
                        <Dropdown
                            id="assignTo"
                            name="assignTo"
                            optionLabel="label" // Adjust to match your data structure
                            optionValue="value"
                            options={UsersOptions}
                            onChange={(e) => formik.setFieldValue('assignTo', e.value)}
                            value={formik.values.assignTo}
                            placeholder="Assign To"
                            className='w-100 '
                        />
                        {formik.touched.assignTo && formik.errors.assignTo && <small className="p-error">{formik.errors.assignTo}</small>}
                    </div>
                </li>
            </ul>
            <Row>
                <Col>
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <br />
                        <InputText id="name" className='w-100 ' name="manualData.name" value={formik.values.manualData.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.manualData?.name && formik.errors.manualData?.name && <small className="p-error">{formik.errors.manualData.name}</small>}
                    </div>
                </Col>
                <Col>
                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <br />
                        <InputText id="email className='w-100 '" name="manualData.email" value={formik.values.manualData.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.manualData?.email && formik.errors.manualData?.email && <small className="p-error">{formik.errors.manualData.email}</small>}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="p-field">
                        <label htmlFor="mobileNo">Mobile Number</label>
                        <br />
                        <InputMask id="mobileNo" className='w-100 ' name="manualData.mobileNo" value={formik.values.manualData.mobileNo} onChange={formik.handleChange} onBlur={formik.handleBlur} mask="+99-9999999999" />
                        {formik.touched.manualData?.mobileNo && formik.errors.manualData?.mobileNo && <small className="p-error">{formik.errors.manualData.mobileNo}</small>}
                    </div>
                </Col>
                <Col>
                    <div className="p-field">
                        <label htmlFor="address.street">Street</label>
                        <br />
                        <InputText id="address.street" className='w-100 ' name="manualData.address.street" value={formik.values.manualData.address.street} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.manualData?.address?.street && formik.errors.manualData?.address?.street && <small className="p-error">{formik.errors.manualData.address.street}</small>}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="p-field">
                        <label htmlFor="address.city">City</label>
                        <br />
                        <InputText id="address.city" className='w-100 ' name="manualData.address.city" value={formik.values.manualData.address.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.manualData?.address?.city && formik.errors.manualData?.address?.city && <small className="p-error">{formik.errors.manualData.address.city}</small>}
                    </div>
                </Col>
                <Col>
                    <div className="p-field">
                        <label htmlFor="address.state">State</label>
                        <br />
                        <InputText id="address.state" className='w-100 ' name="manualData.address.state" value={formik.values.manualData.address.state} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.manualData?.address?.state && formik.errors.manualData?.address?.state && <small className="p-error">{formik.errors.manualData.address.state}</small>}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="p-field">
                        <label htmlFor="address.zipCode">Zip Code</label>
                        <br />
                        <InputText id="address.zipCode" className='w-100 ' name="manualData.address.zipCode" value={formik.values.manualData.address.zipCode} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.manualData?.address?.zipCode && formik.errors.manualData?.address?.zipCode && <small className="p-error">{formik.errors.manualData.address.zipCode}</small>}
                    </div>
                </Col>
                <Col>
                    <div className="p-field">
                        <label htmlFor="address.country">Country</label>
                        <br />
                        <InputText id="address.country" className='w-100 ' name="manualData.address.country" value={formik.values.manualData.address.country} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.manualData?.address?.country && formik.errors.manualData?.address?.country && <small className="p-error">{formik.errors.manualData.address.country}</small>}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="p-field">
                        <label htmlFor="company">Company</label>
                        <br />
                        <InputText id="company" className='w-100 ' name="manualData.company" value={formik.values.manualData.company} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.manualData?.company && formik.errors.manualData?.company && <small className="p-error">{formik.errors.manualData.company}</small>}
                    </div>
                </Col>
                <Col>
                    <div className="p-field">
                        <label htmlFor="description">Description</label>
                        <br />
                        <InputTextarea id="description" className='w-100 ' name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.description && formik.errors.description && <small className="p-error">{formik.errors.description}</small>}
                    </div>
                </Col>
            </Row>
            <Row>
                {lead?.lead?.manualData?.address?.map((field, index) => (
                    <Col key={index} md={6}>
                        <label htmlFor={`customField_${index}`}>{field.label}</label> <br />
                        <InputText
                        className='w-100 '
                            type="text"
                            id={`customField_${index}`} // Unique ID for each field
                            name={`customFields.${field.label}`} // Use dot notation for nested fields
                            value={customFields.find((item) => item.label === field.label)?.value || ''} // Get value from customFields
                            onChange={(e) => handleFieldChange(field.label, e.target.value)} // Use the new handler
                            required={field.required}
                        />
                        {field.required && <span style={{ color: 'red' }}> (Required)</span>}
                    </Col>
                ))}
            </Row>
            <Button type="submit" label="Save" className='btn-all' />
        </form>
    );
};

export default EditLeadForm;
