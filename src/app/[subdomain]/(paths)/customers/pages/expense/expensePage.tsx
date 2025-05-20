// "use client";
// import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
// import { Dialog } from 'primereact/dialog';
// import ExpenseTable from './expenseTable';
// import ExpenseForm from './expenseForm';
// import EditExpenseForm from './EditexpenseForm';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { API_BASE_URL } from '@/app/utils';
// import { Button } from 'primereact/button';
// import userContext from '@/app/UseContext/UseContext';

// const ExpensesPage = (fetchData) => {
//   const { singledata } = useContext(userContext);
//   const Expensedatasingle = singledata.expenses;
//   const [expenses, setExpenses] = useState([]);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const accessToken = Cookies.get("accessToken");
//   const subdomain = Cookies.get("subdomain");
//   const [customers, setCustomers] = useState([]);
//   const [projects, setProjects] = useState([]);

//   const fetchExpenses = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       const response = await axios.get(`${API_BASE_URL}/expense/${subdomain}`, { headers });
//       console.log(response.data.data);
//       setExpenses(response?.data?.data.expense || []);
//       fetchData()
//     } catch (error) {
//       setError("Error fetching expenses. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [accessToken, subdomain]);

//   useEffect(() => {
//     fetchExpenses();
//   }, [fetchExpenses]);

//   const fetchExpenseById = async (_id) => {
//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       const response = await axios.get(`${API_BASE_URL}/expense/${subdomain}/${_id}`, { headers });
//       console.log(response.data.data, "Fetched expense data");
//       setEditingExpense(response.data.data.expense);
//       setIsFormVisible(true);
//     } catch (error) {
//       setError("Error fetching expense details. Please try again.");
//     }
//   };

//   const handleEdit = (_id) => {
//     fetchExpenseById(_id);
//   };

//   const handleDelete = async (_id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });
//     if (result.isConfirmed) {
//       try {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         await axios.delete(`${API_BASE_URL}/expense/${subdomain}/${_id}`, { headers });
//         setExpenses(expenses.filter((expense) => expense._id !== _id));
//         Swal.fire('Deleted!', 'Expense has been deleted.', 'success');
//         fetchData()
//       } catch (error) {
//         setError("Error deleting expense. Please try again.");
//         Swal.fire('Error!', 'Error deleting expense. Please try again.', 'error');
//       }
//     }
//   };

//   const handleSubmit = async (values) => {
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     };

//     try {
//       let response;
//       if (editingExpense) {
//         response = await axios.patch(
//           `${API_BASE_URL}/expense/${subdomain}/${editingExpense._id}`,
//           values,
//           { headers }
//         );
//         Swal.fire('Updated!', 'Expense has been updated.', 'success');
//         fetchData()
//       } else {
//         response = await axios.post(
//           `${API_BASE_URL}/expense/${subdomain}`,
//           values,
//           { headers }
//         );
//         Swal.fire('Created!', 'Expense has been created.', 'success');
//         fetchData()
//       }

//       setExpenses((prevExpenses) => {
//         if (editingExpense) {
//           return prevExpenses.map((exp) =>
//             exp._id === editingExpense._id ? response.data : exp
//           );
//         } else {
//           return [...prevExpenses, response.data];
//         }
//       });
//       setIsFormVisible(false);
//       setEditingExpense(null);
//     } catch (error) {
//       setError("An error occurred while saving the expense. Please try again.");
//       Swal.fire('Error!', 'An error occurred while saving the expense. Please try again.', 'error');
//     }
//   };

//   const fetchCustomers = useCallback(async () => {
//     const headers = { Authorization: `Bearer ${accessToken}` };
//     try {
//       const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
//       setCustomers(response.data.data.customers || []);
//     } catch (error) {
//       setError("Error fetching customers. Please try again.");
//     }
//   }, [accessToken, subdomain]);

//   const fetchProjects = useCallback(async () => {
//     const headers = { Authorization: `Bearer ${accessToken}` };
//     try {
//       const response = await axios.get(`${API_BASE_URL}/project/${subdomain}`, { headers });
//       setProjects(response?.data?.data?.projects || []);
//     } catch (error) {
//       setError("Error fetching projects. Please try again.");
//     }
//   }, [accessToken, subdomain]);

//   useEffect(() => {
//     fetchCustomers();
//     fetchProjects();
//   }, [fetchCustomers, fetchProjects]);

//   const usersOptions = useMemo(() =>
//     customers.map((customer) => ({
//       label: customer.name,
//       value: customer._id,
//     })), [customers]);

//   const projectsOptions = useMemo(() =>
//     projects.map((project) => ({
//       label: project.projectName,
//       value: project._id,
//     })), [projects]);

//   return (
//     <div>
//       {error && <p className="error">{error}</p>}
//       {loading ? <p>Loading...</p> : (
//         <>
//           <Button onClick={() => setIsFormVisible(true)}>New Expense</Button>
//           <ExpenseTable expenses={Expensedatasingle} onEdit={handleEdit} onDelete={handleDelete} />
//           <Dialog
//           header={editingExpense ? "Edit Expense Form" : "Expense Form"}
//             visible={isFormVisible}
//             onHide={() => setIsFormVisible(false)}
//             aria-hidden={!isFormVisible}
//           >
//             {editingExpense ? (
//               <EditExpenseForm
//                 expense={editingExpense}
//                 onSubmit={handleSubmit}
//                 customers={usersOptions}
//                 projectsOptions={projectsOptions}
//               />
//             ) : (
//               <ExpenseForm
//                 onSubmit={handleSubmit}
//                 initialValues={{}}
//                 customers={singledata}
//                 projectsOptions={projectsOptions}
//               />
//             )}
//           </Dialog>
//         </>
//       )}
//     </div>
//   );
// };

// export default ExpensesPage;
// "use client";
// import React, { useState, useEffect, useMemo, useCallback, useContext, useRef } from 'react';
// import { Dialog } from 'primereact/dialog';
// import { Toast } from 'primereact/toast';
// import ExpenseTable from './expenseTable';
// import ExpenseForm from './expenseForm';
// import EditExpenseForm from './EditexpenseForm';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import { API_BASE_URL } from '@/app/utils';
// import { Button } from 'primereact/button';
// import userContext from '@/app/UseContext/UseContext';
// import Swal from 'sweetalert2';

// const ExpensesPage = ({ fetchData }) => {
//   const { singledata } = useContext(userContext);
//   const Expensedatasingle = singledata.expenses;
//   const [expenses, setExpenses] = useState([]);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const accessToken = Cookies.get("accessToken");
//   const subdomain = Cookies.get("subdomain");
//   const [customers, setCustomers] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const toast = useRef(null);

//   const fetchExpenses = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       const response = await axios.get(`${API_BASE_URL}/expense/${subdomain}`, { headers });
//       setExpenses(response?.data?.data.expense || []);
//     } catch (error) {
//       setError("Error fetching expenses. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [accessToken, subdomain]);

//   useEffect(() => {
//     fetchExpenses();
//   }, [fetchExpenses]);

//   const fetchExpenseById = async (_id) => {
//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       const response = await axios.get(`${API_BASE_URL}/expense/${subdomain}/${_id}`, { headers });
//       setEditingExpense(response.data.data.expense);
//       setIsFormVisible(true);
//     } catch (error) {
//       setError("Error fetching expense details. Please try again.");
//     }
//   };

//   const handleEdit = (_id) => {
//     fetchExpenseById(_id);
//   };

//   const handleDelete = async (_id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });
//     if (result.isConfirmed) {
//       try {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         await axios.delete(`${API_BASE_URL}/expense/${subdomain}/${_id}`, { headers });
//         toast.current.show({ severity: 'success', summary: 'Deleted!', detail: 'Expense has been deleted.' });
//         fetchExpenses(); // Re-fetch expenses after deletion
//         fetchData(); // Notify parent component if necessary
//       } catch (error) {
//         setError("Error deleting expense. Please try again.");
//         toast.current.show({ severity: 'error', summary: 'Error!', detail: 'Error deleting expense. Please try again.' });
//       }
//     }
//   };

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     };

//     try {
//       let response;
//       if (editingExpense) {
//         response = await axios.patch(
//           `${API_BASE_URL}/expense/${subdomain}/${editingExpense._id}`,
//           values,
//           { headers }
//         );
//         toast.current.show({ severity: 'success', summary: 'Updated!', detail: 'Expense has been updated.' });
//       } else {
//         response = await axios.post(
//           `${API_BASE_URL}/expense/${subdomain}`,
//           values,
//           { headers }
//         );
//         toast.current.show({ severity: 'success', summary: 'Created!', detail: 'Expense has been created.' });
//       }
//       fetchExpenses(); // Re-fetch expenses after create/update
//       setIsFormVisible(false);
//       setEditingExpense(null);
//     } catch (error) {
//       console.error("Error occurred during submit:", error);
//       setError("An error occurred while saving the expense. Please try again.");
//       toast.current.show({ severity: 'error', summary: 'Error!', detail: 'An error occurred while saving the expense. Please try again.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCustomers = useCallback(async () => {
//     const headers = { Authorization: `Bearer ${accessToken}` };
//     try {
//       const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
//       setCustomers(response.data.data.customers || []);
//     } catch (error) {
//       setError("Error fetching customers. Please try again.");
//     }
//   }, [accessToken, subdomain]);

//   const fetchProjects = useCallback(async () => {
//     const headers = { Authorization: `Bearer ${accessToken}` };
//     try {
//       const response = await axios.get(`${API_BASE_URL}/project/${subdomain}`, { headers });
//       setProjects(response?.data?.data?.projects || []);
//     } catch (error) {
//       setError("Error fetching projects. Please try again.");
//     }
//   }, [accessToken, subdomain]);

//   useEffect(() => {
//     fetchCustomers();
//     fetchProjects();
//   }, [fetchCustomers, fetchProjects]);

//   const usersOptions = useMemo(() =>
//     customers.map((customer) => ({
//       label: customer.name,
//       value: customer._id,
//     })), [customers]);

//   const projectsOptions = useMemo(() =>
//     projects.map((project) => ({
//       label: project.projectName,
//       value: project._id,
//     })), [projects]);

//   const handleStatusChange = async (id, status) => {
//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       await axios.patch(
//         `${API_BASE_URL}/expense/${subdomain}/${id}`,
//         { status },
//         { headers }
//       );
//       setExpenses(prevExpenses =>
//         prevExpenses.map(expense =>
//           expense._id === id ? { ...expense, status } : expense
//         )
//       );
//       toast.current.show({ detail: "Status updated successfully!" });
//       fetchData()
//     } catch (error) {
//       console.error("Error updating status:", error);
//       toast.current.show({ severity: 'error', summary: 'Error!', detail: 'An error occurred while updating the status. Please try again.' });
//     }
//   };

//   return (
//     <div>
//       <Toast ref={toast} />
//       {error && <p className="error">{error}</p>}
//       {loading ? <p>Loading...</p> : (
//         <>
//           <Button onClick={() => setIsFormVisible(true)}>New Expense</Button>
//           <ExpenseTable
//             expenses={Expensedatasingle}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//             handleStatusChange={handleStatusChange}
//           />
//           <Dialog
//             header={editingExpense ? "Edit Expense Form" : "Expense Form"}
//             visible={isFormVisible}
//             onHide={() => setIsFormVisible(false)}
//             aria-hidden={!isFormVisible}
//           >
//             {editingExpense ? (
//               <EditExpenseForm
//                 expense={editingExpense}
//                 onSubmit={handleSubmit}
//                 customers={singledata}
//                 projectsOptions={projectsOptions}
//               />
//             ) : (
//               <ExpenseForm
//                 onSubmit={handleSubmit}
//                 initialValues={{}}
//                 customers={singledata}
//                 projectsOptions={projectsOptions}
//               />
//             )}
//           </Dialog>
//         </>
//       )}
//     </div>
//   );
// };

// export default ExpensesPage;
'use client';
import React, { useState, useEffect, useMemo, useCallback, useContext, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert, CircularProgress, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpenseTable from './expenseTable';
import ExpenseForm from './expenseForm';
import EditExpenseForm from './EditexpenseForm';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import userContext from '../../../../../UseContext/UseContext';
import { API_BASE_URL } from '../../../../../utils';

interface Expense {
    _id: string;
    [key: string]: any;
}

interface ExpensesPageProps {
    fetchData: () => void;
}

const ExpensesPage: React.FC<ExpensesPageProps> = ({ fetchData }) => {
    const { singledata } = useContext(userContext);
    const Expensedatasingle = singledata.expenses;
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    });
    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');
    const [customers, setCustomers] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);

    const fetchExpenseById = async (_id: string) => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.get(`${API_BASE_URL}/expense/${subdomain}/${_id}`, { headers });
            setEditingExpense(response.data.data.expense);
            setIsFormVisible(true);
        } catch (error) {
            setError('Error fetching expense details. Please try again.');
        }
    };

    const handleEdit = (_id: string) => {
        fetchExpenseById(_id);
    };

    const handleDelete = async (_id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            setLoading(true);
            try {
                const headers = { Authorization: `Bearer ${accessToken}` };
                await axios.delete(`${API_BASE_URL}/expense/${subdomain}/${_id}`, { headers });
                setExpenses(expenses.filter((expense) => expense._id !== _id));
                setSnackbar({ open: true, message: 'Expense has been deleted.', severity: 'success' });
                fetchData();
            } catch (error) {
                setError('Error deleting expense. Please try again.');
                setSnackbar({ open: true, message: 'Error deleting expense. Please try again.', severity: 'error' });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (values: any) => {
        setLoading(true);
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        };

        try {
            let response;
            if (editingExpense) {
                response = await axios.patch(`${API_BASE_URL}/expense/${subdomain}/${editingExpense._id}`, values, { headers });
                setSnackbar({ open: true, message: 'Expense has been updated.', severity: 'success' });
                fetchData();
            } else {
                response = await axios.post(`${API_BASE_URL}/expense/${subdomain}`, values, { headers });
                setSnackbar({ open: true, message: 'Expense has been created.', severity: 'success' });
                fetchData();
            }
            setIsFormVisible(false);
            setEditingExpense(null);
        } catch (error) {
            setError('An error occurred while saving the expense. Please try again.');
            setSnackbar({ open: true, message: 'An error occurred while saving the expense. Please try again.', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomers = useCallback(async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
            setCustomers(response.data.data.customers || []);
        } catch (error) {
            setError('Error fetching customers. Please try again.');
        }
    }, [accessToken, subdomain]);

    const fetchProjects = useCallback(async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            const response = await axios.get(`${API_BASE_URL}/project/${subdomain}`, { headers });
            setProjects(response?.data?.data?.projects || []);
        } catch (error) {
            setError('Error fetching projects. Please try again.');
        }
    }, [accessToken, subdomain]);

    useEffect(() => {
        fetchCustomers();
        fetchProjects();
    }, [fetchCustomers, fetchProjects]);

    const usersOptions = useMemo(
        () =>
            customers.map((customer) => ({
                label: customer.name,
                value: customer._id
            })),
        [customers]
    );

    const projectsOptions = useMemo(
        () =>
            projects.map((project) => ({
                label: project.projectName,
                value: project._id
            })),
        [projects]
    );

    const handleStatusChange = async (id: string, status: string) => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            await axios.patch(`${API_BASE_URL}/expense/${subdomain}/${id}`, { status }, { headers });
            setExpenses((prevExpenses) => prevExpenses.map((expense) => (expense._id === id ? { ...expense, status } : expense)));
            setSnackbar({ open: true, message: 'Status updated successfully!', severity: 'success' });
            await fetchData();
        } catch (error) {
            setSnackbar({ open: true, message: 'An error occurred while updating the status. Please try again.', severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <Box>
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {/* <Box mb={2} display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" onClick={() => { setEditingExpense(null); setIsFormVisible(true); }}>
                            New Expense
                        </Button>
                    </Box> */}
                    <ExpenseTable expenses={Expensedatasingle} onEdit={handleEdit} onDelete={handleDelete} handleStatusChange={handleStatusChange} setIsFormVisible={setIsFormVisible} />
                    <Dialog open={isFormVisible} onClose={() => setIsFormVisible(false)} maxWidth="sm" fullWidth>
                        <DialogTitle>
                            {editingExpense ? 'Edit Expense Form' : 'Expense Form'}
                            <IconButton
                                aria-label="close"
                                onClick={() => setIsFormVisible(false)}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500]
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            {editingExpense ? (
                                <ExpenseForm expense={editingExpense} onSubmit={handleSubmit} customers={singledata} projectsOptions={projectsOptions} />
                            ) : (
                                <ExpenseForm
                                    onSubmit={handleSubmit}
                                    // initialValues={{}}
                                    expense={{}}
                                    customers={singledata}
                                    projectsOptions={projectsOptions}
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
        </Box>
    );
};

export default ExpensesPage;
