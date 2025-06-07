"use client"
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Dialog } from 'primereact/dialog';
import ExpenseTable from './expenseTable';
import ExpenseForm from './expenseForm';
import EditExpenseForm from './EditexpenseForm';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../../styles/popup.scss"
// import { API_BASE_URL } from '@/app/utils';
import { Button } from 'primereact/button';
import { API_BASE_URL } from '../../../utils';

const ExpensesPage = () => {
    const [expenses, setExpenses] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const accessToken = Cookies.get("crmaccess");
    const subdomain = Cookies.get("subdomain");
    const [customers, setCustomers] = useState([]);
    const [projects, setProjects] = useState([]);

    const fetchExpenses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.get(`${API_BASE_URL}/expense/${subdomain}`, { headers });
            // console.log(response.data.data);
            setExpenses(response?.data?.data.expense || []);
        } catch (error) {
            setError("Error fetching expenses. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [accessToken, subdomain]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    const fetchExpenseById = async (_id) => {
    // const fetchExpenseById = async () => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.get(`${API_BASE_URL}/expense/${subdomain}/${_id}`, { headers });
            // const response = await axios.get(`${API_BASE_URL}/expense/${subdomain}/670d1278629a9b483ded2eae`, { headers });
            // console.log(response.data.data,"expensseeee");
            setEditingExpense(response.data.data.expenses);
            setIsFormVisible(true);
        } catch (error) {
            setError("Error fetching expense details. Please try again.");
        }
    };

    const handleEdit = (_id) => {
        fetchExpenseById(_id);
    };

    const handleDelete = async (_id) => {
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
                await axios.delete(`${API_BASE_URL}/expense/${subdomain}/${_id}`, { headers });
                setExpenses(expenses.filter((expense) => expense._id !== _id));
                Swal.fire('Deleted!', 'Expense has been deleted.', 'success');
                fetchExpenses()
            } catch (error) {
                setError("Error deleting expense. Please try again.");
                Swal.fire('Error!', 'Error deleting expense. Please try again.', 'error');
            }
        }
    };

    const handleSubmit = async (values) => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        };

        try {
            let response;
            if (editingExpense) {
                response = await axios.patch(
                    `${API_BASE_URL}/expense/${subdomain}/${editingExpense._id}`,
                    values,
                    { headers }
                );
                Swal.fire('Updated!', 'Expense has been updated.', 'success');
            } else {
                response = await axios.post(
                    `${API_BASE_URL}/expense/${subdomain}`,
                    values,
                    { headers }
                );
                Swal.fire('Created!', 'Expense has been created.', 'success');
            }

            setExpenses((prevExpenses) => {
                if (editingExpense) {
                    return prevExpenses.map((exp) =>
                        exp._id === editingExpense._id ? response.data : exp
                    );
                } else {
                    return [...prevExpenses, response.data];
                }
            });
            setIsFormVisible(false);
            setEditingExpense(null);
        } catch (error) {
            setError("An error occurred while saving the expense. Please try again.");
            Swal.fire('Error!', 'An error occurred while saving the expense. Please try again.', 'error');
        }
    };

    const fetchCustomers = useCallback(async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
            setCustomers(response.data.data.customers || []);
        } catch (error) {
            setError("Error fetching customers. Please try again.");
        }
    }, [accessToken, subdomain]);

    const fetchProjects = useCallback(async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            const response = await axios.get(`${API_BASE_URL}/project/${subdomain}`, { headers });
            setProjects(response?.data?.data?.projects || []);
        } catch (error) {
            setError("Error fetching projects. Please try again.");
        }
    }, [accessToken, subdomain]);

    useEffect(() => {
        fetchCustomers();
        fetchProjects();
    }, [fetchCustomers, fetchProjects]);

    const usersOptions = useMemo(() =>
        customers.map((customer) => ({
            label: customer.Companyname,
            value: customer._id,
        })), [customers]);

    const projectsOptions = useMemo(() =>
        projects.map((project) => ({
            label: project.projectName,
            value: project._id,
        })), [projects]);
        

    return (
        <div>
            {error && <p className="error">{error}</p>}
            {loading ? <p>Loading...</p> : (
                <>
                    
                    <ExpenseTable expenses={expenses} onEdit={handleEdit} onDelete={handleDelete }  setIsFormVisible={setIsFormVisible} />
                    {/* <Dialog 
                        header="Expense Form" 
                        visible={isFormVisible} 
                        onHide={() => setIsFormVisible(false)} 
                        aria-hidden={!isFormVisible} // Use this to control visibility
                    > */}
                     {isFormVisible && (
                        <div className="dialog-overlay ">
                            <div className="dialog-content p-5 ">
                                <span className="dialog-close" onClick={() => setIsFormVisible(false)}>
                                    &times;
                                </span>


                        {editingExpense ? (
                            <EditExpenseForm
                                expense={editingExpense}
                                onSubmit={handleSubmit}
                                customers={usersOptions}
                            />
                        ) : (
                            <ExpenseForm
                                onSubmit={handleSubmit}
                                initialValues={{}}
                                customers={usersOptions}
                                projectsOptions={projectsOptions}
                            />
                        )}
                    </div></div>
                )}
                </>
            )}
        </div>
    );
};

export default ExpensesPage;
