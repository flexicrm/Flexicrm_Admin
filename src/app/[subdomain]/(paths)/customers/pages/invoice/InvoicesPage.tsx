"use client";
import React, { useState, useEffect, useMemo, useContext, useRef } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InvoiceTable from "./InvoiceTable";
import InvoiceForm from "./InvoiceForm";
import EditInvoiceForm from "./EditInvoiceForm";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import userContext from "../../../../../UseContext/UseContext";
import { API_BASE_URL } from "../../../../../utils";

interface Invoice {
    _id: string;
    [key: string]: any;
}

interface Customer {
    _id: string;
    Companyname: string;
    [key: string]: any;
}

interface Item {
    _id: string;
    [key: string]: any;
}

interface InvoicesPageProps {
    fetchData: () => void;
}

const InvoicesPage: React.FC<InvoicesPageProps> = ({ fetchData }) => {
    const { singledata } = useContext(userContext);
    const invoicedata: Invoice[] = singledata.invoices;
    const [item, setItem] = useState<Item[]>([]);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const accessToken = Cookies.get("accessToken");
    const subdomain = Cookies.get("subdomain");
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
        open: false,
        message: "",
        severity: "success",
    });

    const fetchInvoices = async () => {
        setLoading(true);
        setError(null);
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.get(`${API_BASE_URL}/invoice/${subdomain}`, { headers });
            setInvoices(response.data.data.invoices || []);
        } catch (error) {
            setError("Error fetching invoices. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
        // eslint-disable-next-line
    }, [accessToken, subdomain]);

    const fetchInvoiceById = async (_id: string) => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.get(`${API_BASE_URL}/invoice/${subdomain}/${_id}`, { headers });
            setEditingInvoice(response.data.data);
            setIsFormVisible(true);
        } catch (error) {
            setError("Error fetching invoice details. Please try again.");
        }
    };

    const handleEdit = (_id: string) => {
        fetchInvoiceById(_id);
    };

    const handleDelete = async (_id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
        if (result.isConfirmed) {
            try {
                const headers = { Authorization: `Bearer ${accessToken}` };
                await axios.delete(`${API_BASE_URL}/invoice/${subdomain}/${_id}`, { headers });
                setInvoices(invoices.filter((invoice) => invoice._id !== _id));
                setSnackbar({ open: true, message: "Invoice has been deleted.", severity: "success" });
                fetchData();
            } catch (error) {
                setError("Error deleting invoice. Please try again.");
                setSnackbar({ open: true, message: "Error deleting invoice. Please try again.", severity: "error" });
            }
        }
    };

    const handleSubmit = async (values: any) => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        };

        try {
            let response;
            if (editingInvoice) {
                response = await axios.patch(`${API_BASE_URL}/invoice/${subdomain}/${editingInvoice._id}`, values, { headers });
                setSnackbar({ open: true, message: "Invoice has been updated.", severity: "success" });
            } else {
                response = await axios.post(`${API_BASE_URL}/invoice/${subdomain}`, values, { headers });
                setSnackbar({ open: true, message: "Invoice has been created.", severity: "success" });
            }

            setInvoices((prevInvoices) => {
                if (editingInvoice) {
                    return prevInvoices.map((inv) => (inv._id === editingInvoice._id ? response.data : inv));
                } else {
                    return [...prevInvoices, response.data];
                }
            });
            setIsFormVisible(false);
            setEditingInvoice(null);
            fetchData();
        } catch (error) {
            setError("An error occurred while saving the invoice. Please try again.");
            setSnackbar({ open: true, message: "An error occurred while saving the invoice. Please try again.", severity: "error" });
        }
    };

    useEffect(() => {
        const fetchCustomers = async () => {
            const headers = { Authorization: `Bearer ${accessToken}` };
            try {
                const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
                setCustomers(response.data.data.customers || []);
            } catch (error) {
                setError("Error fetching customers. Please try again.");
            }
        };

        fetchCustomers();
        // eslint-disable-next-line
    }, [accessToken, subdomain]);

    const usersOptions = useMemo(
        () =>
            customers.map((customer) => ({
                label: customer.Companyname,
                value: customer._id,
            })),
        [customers]
    );

    const fetchItem = async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            const response = await axios.get(`${API_BASE_URL}/item/${subdomain}`, { headers });
            setItem(response.data.data.items || []);
        } catch (error) {
            setError("Error fetching items. Please try again.");
        }
    };

    useEffect(() => {
        fetchItem();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    {/* <Button
                        variant="contained"
                        color="primary"
                        sx={{ mb: 2 }}
                        onClick={() => {
                            setEditingInvoice(null);
                            setIsFormVisible(true);
                        }}
                    >
                        New Invoice
                    </Button> */}
                    <InvoiceTable
                        invoices={invoicedata}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        setEditingInvoice={setEditingInvoice}
                        setIsFormVisible={setIsFormVisible}
                    />
                    <Dialog open={isFormVisible} onClose={() => setIsFormVisible(false)} maxWidth="md" fullWidth>
                        <DialogTitle>
                            {editingInvoice ? "Edit Invoice" : "New Invoice"}
                            <IconButton
                                aria-label="close"
                                onClick={() => setIsFormVisible(false)}
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            {editingInvoice ? (
                                <EditInvoiceForm
                                    invoice={editingInvoice}
                                    onSubmit={handleSubmit}
                                    customers={singledata}
                                    item={item}
                                />
                            ) : (
                                <InvoiceForm
                                    onSubmit={handleSubmit}
                                    // initialValues={{}}
                                    customers={singledata}
                                    items={item}
                                />
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setIsFormVisible(false)} color="secondary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </div>
    );
};

export default InvoicesPage;
