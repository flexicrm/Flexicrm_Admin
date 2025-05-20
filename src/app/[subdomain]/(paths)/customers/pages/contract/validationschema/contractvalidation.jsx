import * as Yup from "yup";

export const validationcontract = Yup.object({
  subject: Yup.string().required("Project is required"),
  description: Yup.string().required("Description is required"),
  contractStartDate: Yup.date().required("Start date is required").nullable(),
  contractEndDate: Yup.date()
    .required("End date is required")
    .nullable()
    .min(Yup.ref("contractStartDate"), "End date must be after start date"),
  contractValue: Yup.number()
    .required("Total is required")
    .positive("Total must be positive"),
});

export const validationEditcontract = Yup.object({
  customer: Yup.string().required("Customer is required"),
  subject: Yup.string().required("Project is required"),
  description: Yup.string().required("Description is required"),
  contractStartDate: Yup.date().required("Start date is required").nullable(),
  contractEndDate: Yup.date().required("End date is required").nullable(),
  contractValue: Yup.number()
    .required("Total is required")
    .positive("Total must be positive"),
  attachment: Yup.string().required("Attachment is required"),
});
