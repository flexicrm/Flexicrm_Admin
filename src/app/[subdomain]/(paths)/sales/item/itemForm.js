// "use client";
// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';

// const ItemForm = ({  onSubmit }) => {
//     const [customFields, setCustomFields] = useState([]);

//     const initialValues = {
//         itemName: '',
//         description: '',
//         price: '',
//         quantity: '',
//         customFields: []
//     };

//     const validationSchema = Yup.object().shape({
//         itemName: Yup.string().required('Item Name is required'),
//         description: Yup.string().required('Description is required'),
//         price: Yup.number().required('Price is required').positive('Price must be positive'),
//         quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive').integer('Quantity must be an integer'),
//         customFields: Yup.array().of(Yup.object().shape({
//             fieldName: Yup.string().required('Field Name is required'),
//             fieldValue: Yup.string().required('Field Value is required')
//         }))
//     });

//     const handleSubmit = async (values) => {
//         const itemData = {
//             itemName: values.itemName,
//             description: values.description,
//             price: values.price,
//             quantity: values.quantity,
//             customFields: values.customFields
//         };

//         // Optimistic update

//         onSubmit(itemData);

//     };

//     const addCustomField = () => {
//         setCustomFields([...customFields, { fieldName: '', fieldValue: '' }]);
//     };

//     const handleCustomFieldChange = (index, field, value) => {
//         const newCustomFields = [...customFields];
//         newCustomFields[index][field] = value;
//         setCustomFields(newCustomFields);
//     };
//     // console.log(values)
//     return (
//         <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//         >
//             {({ values }) => (
//                 <Form>
//                     <div>
//                         <label htmlFor="itemName">Item Name</label><br />
//                         <Field id="itemName" name="itemName">
//                             {({ field }) => <InputText {...field} placeholder="Item Name" value={values.itemName} />}
//                         </Field>
//                         <ErrorMessage name="itemName" component="div" />
//                     </div>

//                     <div>
//                         <label htmlFor="description">Description</label><br />
//                         <Field id="description" name="description">
//                             {({ field }) => <InputText {...field} placeholder="Description" value={values.description} />}
//                         </Field>
//                         <ErrorMessage name="description" component="div" />
//                     </div>

//                     <div>
//                         <label htmlFor="price">Price</label><br />
//                         <Field id="price" name="price">
//                             {({ field }) => <InputText {...field} type="number" placeholder="Price" value={values.price} />}
//                         </Field>
//                         <ErrorMessage name="price" component="div" />
//                     </div>

//                     <div>
//                         <label htmlFor="quantity">Quantity</label><br />
//                         <Field id="quantity" name="quantity">
//                             {({ field }) => <InputText {...field} type="number" placeholder="Quantity" value={values.quantity} />}
//                         </Field>
//                         <ErrorMessage name="quantity" component="div" />
//                     </div>

//                     <div>
//                         <div className='d-flex'>
//                             <label className='my-auto'>Add Custom Field</label>
//                             <Button type="button" icon="pi pi-plus-circle" onClick={addCustomField} style={{ height: "19px", width: "23px", borderRadius: "50%" }} />
//                         </div>
//                         {customFields.map((field, index) => (
//                             <div key={index}>
//                                 <InputText
//                                     id="fieldName"
//                                     name="fieldName"
//                                     value={field.fieldName}
//                                     onChange={(e) => handleCustomFieldChange(index, 'fieldName', e.target.value)}
//                                     placeholder="Field Name"
//                                 />
//                                 <InputText
//                                     id="fieldValue"
//                                     name="fieldValue"
//                                     value={field.fieldValue}
//                                     onChange={(e) => handleCustomFieldChange(index, 'fieldValue', e.target.value)}
//                                     placeholder="Field Value"
//                                 />
//                             </div>
//                         ))}
//                     </div>

//                     <Button type="submit" label={'Create Item'} />
//                 </Form>
//             )}
//         </Formik>
//     );
// };

// export default ItemForm;
'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Col, Row } from 'react-bootstrap';

const ItemForm = ({ onSubmit }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
    }, []);
    const initialValues = {
        itemName: '',
        description: '',
        price: '',
        quantity: '',
        customFields: [{ fieldName: '', fieldValue: '' }]
    };

    const validationSchema = Yup.object().shape({
        itemName: Yup.string().required('Item Name is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number().required('Price is required').positive('Price must be positive'),
        quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive').integer('Quantity must be an integer'),
        customFields: Yup.array().of(
            Yup.object().shape({
                fieldName: Yup.string().required('Field Name is required'),
                fieldValue: Yup.string().required('Field Value is required')
            })
        )
    });

    const handleSubmit = async (values) => {
        onSubmit(values);
    };

    const addCustomField = (setFieldValue) => {
        setFieldValue('customFields', [...initialValues.customFields, { fieldName: '', fieldValue: '' }]);
    };

    return (
        <>
            {loading && (
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, setFieldValue }) => (
                        <Form>
                            <Row>
                                <Col>
                                    <div>
                                        <label htmlFor="itemName">Item Name</label>
                                        <br />
                                        <Field id="itemName" name="itemName" className="mb-3 w-100">
                                            {({ field }) => <InputText {...field} placeholder="Item Name" className="mb-3 w-100" />}
                                        </Field>
                                        <ErrorMessage name="itemName" component="div" />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <label htmlFor="description">Description</label>
                                        <br />
                                        <Field id="description" name="description">
                                            {({ field }) => <InputText {...field} placeholder="Description" className="mb-3 w-100" />}
                                        </Field>
                                        <ErrorMessage name="description" component="div" />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div>
                                        <label htmlFor="price">Price</label>
                                        <br />
                                        <Field id="price" name="price">
                                            {({ field }) => <InputText {...field} type="number" placeholder="Price" className="mb-3 w-100" />}
                                        </Field>
                                        <ErrorMessage name="price" component="div" />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <label htmlFor="quantity">Quantity</label>
                                        <br />
                                        <Field id="quantity" name="quantity">
                                            {({ field }) => <InputText {...field} type="number" placeholder="Quantity" className="mb-1 w-100" />}
                                        </Field>
                                        <ErrorMessage name="quantity" component="div" />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div>
                                        <div className="d-flex">
                                            <label className="my-auto">Add Custom Field</label>
                                            <Button className="btn-all m-3" type="button" icon="pi pi-plus-circle" onClick={() => addCustomField(setFieldValue)} style={{ height: '19px', width: '23px', borderRadius: '50%' }} />
                                        </div>

                                        {values.customFields.map((field, index) => (
                                            <div key={index}>
                                                <InputText
                                                    className="mb-3 w-100"
                                                    name={`customFields[${index}].fieldName`}
                                                    value={field.fieldName}
                                                    onChange={(e) => setFieldValue(`customFields[${index}].fieldName`, e.target.value)}
                                                    placeholder="Field Name"
                                                />
                                                <InputText
                                                    className="mb-3 w-100"
                                                    name={`customFields[${index}].fieldValue`}
                                                    value={field.fieldValue}
                                                    onChange={(e) => setFieldValue(`customFields[${index}].fieldValue`, e.target.value)}
                                                    placeholder="Field Value"
                                                />
                                                <ErrorMessage name={`customFields[${index}].fieldName`} component="div" />
                                                <ErrorMessage name={`customFields[${index}].fieldValue`} component="div" />
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>

                            <Button type="submit" label={'Create Item'} className="btn-all" />
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
};

export default ItemForm;
