"use client";
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../utils';
// import { API_BASE_URL } from '@/app/utils';

const stylesofborderleft = {
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
    backgroundColor: " rgba(10, 45, 90, 0.966)",
    color: "white",
  };
  const stylesofborderright = {
    borderTopRightRadius: "12px",
    borderBottomRightRadius: "12px",
    backgroundColor: " rgba(10, 45, 90, 0.966)",
    color: "white",
  };
  const Headerstyles = {
    // borderTopRightRadius: "12px",
    // borderBottomRightRadius: "12px",
    backgroundColor: " rgba(10, 45, 90, 0.966)",
    color: "white",
  };


const SaleTable = ({ expenses, onEdit, onDelete }) => {

    const [statuses, setStatuses] = useState([]);
    const accessToken = Cookies.get("crmaccess");
    const subdomain = Cookies.get("subdomain");

    useEffect(() => {
        setStatuses(expenses.map(expense => ({ _id: expense._id, status: expense.status })));
    }, [expenses]);

    const handleStatusChange = async (id, status) => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            await axios.patch(
                `${API_BASE_URL}/expense/${subdomain}/${id}`,
                { status },
                { headers }
            );

            setStatuses(prevStatuses =>
                prevStatuses.map(expense =>
                    expense._id === id ? { ...expense, status } : expense
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const totalExpenses = statuses.length;
    const activeExpenses = statuses.filter(expense => expense.status === 1).length;
    const inactiveExpenses = statuses.filter(expense => expense.status === 0).length;

    return (
<div className='mt-2'>


<DataTable value={expenses} className=''>
            <Column field="expenseId" header="Expense ID"  headerStyle={Headerstyles}/>
            <Column field="createdBy.email" header="Email"  headerStyle={Headerstyles}/>
            <Column field="createdBy.firstname" header="First Name"  headerStyle={Headerstyles}/>
            {/* <Column field="userRole" header="User Role" /> */}
            <Column
             headerStyle={Headerstyles}
                header="Status"
                body={rowData => (
                    <InputSwitch
                        checked={rowData.status === 1}
                        onChange={e => handleStatusChange(rowData._id, e.value ? 1 : 0)}
                    />
                )}
            />
            <Column field="paymentStatus" header="Payment Status"  headerStyle={Headerstyles}/>
            <Column
             headerStyle={Headerstyles}
                body={rowData => (
                    <>
                        <Button label="Edit" onClick={() => onEdit(rowData._id)} />
                        <Button label="Delete" onClick={() => onDelete(rowData._id)} />
                    </>
                )}
            />
        </DataTable>
</div>
    );
};

export default SaleTable;
