// 'use client';
// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { Dialog } from 'primereact/dialog';
// import TaskTable from './TaskTable';
// import TaskForm from './TaskForm';
// import EditTaskForm from './EdittaskForm';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// // import { API_BASE_URL } from '@/app/utils';
// import { Button } from 'primereact/button';
// import { TaskManagement, TaskManagementdelete, TaskManagementGET, TaskManagementGETsingle, TaskManagementpatch } from '../../../../../api/page';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { setCustomber } from '../../../store/slice/userSlice';
// import { API_BASE_URL } from '../../../utils';
// import "../../../styles/popup.scss"

// const TaskPage = () => {
//     const [tasks, setTasks] = useState([]);
//     const [isFormVisible, setIsFormVisible] = useState(false);
//     const [editingTask, setEditingTask] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const dispatch = useDispatch();
//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');
//     const [users, setUsersList] = useState([]);
//     const [projects, setProjects] = useState([]);
//     const slugname = useSelector((state) => state?.slug?.slugname);
//     const accessToken1 = useSelector((state) => console.log(state, 'state'));
//     // console.log(editingTask,"editingTask");

//     const fetchTasks = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await TaskManagementGET(slugname);
//             // console.log(response.data, "followers");
//             setTasks(response?.data?.tasks || []);
//         } catch (error) {
//             setError('Error fetching tasks. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchTasks();
//     }, []);

//     const fetchTaskById = async (_id) => {
//         try {
//             const response = await TaskManagementGETsingle(slugname, _id);
//             // console.log(response.data, "task details");
//             setEditingTask(response?.data);

//             setIsFormVisible(true);
//         } catch (error) {
//             setError('Error fetching task details. Please try again.');
//         }
//     };

//     const handleEdit = (_id) => {
//         fetchTaskById(_id);
//     };

//     const handleDelete = async (_id) => {
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         });
//         if (result.isConfirmed) {
//             try {
//                 await TaskManagementdelete(slugname, _id);
//                 setTasks(tasks.filter((task) => task._id !== _id));
//                 Swal.fire('Deleted!', 'Task has been deleted.', 'success');
//             } catch (error) {
//                 setError('Error deleting task. Please try again.');
//                 Swal.fire('Error!', 'Error deleting task. Please try again.', 'error');
//             }
//         }
//     };

//     const handleSubmit = async (values) => {
//         // console.log(values);

//         try {
//             let response;
//             if (editingTask) {
//                 response = await TaskManagementpatch(values, editingTask._id);
//                 Swal.fire('Updated!', 'Task has been updated.', 'success');
//             } else {
//                 const data = values;
//                 // console.log(data, ">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
//                 response = await TaskManagement(data, slugname);
//                 Swal.fire('Created!', 'Task has been created.', 'success');
//             }

//             setTasks((prevTasks) => {
//                 if (editingTask) {
//                     return prevTasks.map((task) => (task._id === editingTask._id ? response.data : task));
//                 } else {
//                     // Check if response.data exists
//                     if (response.data) {
//                         return [...prevTasks, response.data];
//                     } else {
//                         return prevTasks;
//                     }
//                 }
//             });
//             setIsFormVisible(false);
//             setEditingTask(null);
//         } catch (error) {
//             setError('An error occurred while saving the task. Please try again.');
//             Swal.fire('Error!', 'An error occurred while saving the task. Please try again.', 'error');
//         }
//     };

//     const fetchUsers = useCallback(async () => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/user/${subdomain}`, { headers });
//             const userss = response?.data?.data?.users;
//             dispatch(setCustomber({ Customber: userss }));
//             setUsersList(response.data.data.users || []);
//         } catch (error) {
//             setError('Error fetching users. Please try again.');
//         }
//     }, [accessToken, subdomain]);

//     const fetchProjects = useCallback(async () => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/project/${subdomain}`, { headers });
//             setProjects(response?.data?.data?.projects || []);
//         } catch (error) {
//             setError('Error fetching projects. Please try again.');
//         }
//     }, [accessToken, subdomain]);

//     useEffect(() => {
//         fetchUsers();
//         fetchProjects();
//     }, [fetchUsers, fetchProjects]);

//     const usersOptions = users.map((user) => ({
//         firstname: user.firstname,
//         id: user._id
//     }));

//     const projectsOptions = useMemo(
//         () =>
//             projects.map((project) => ({
//                 label: project.projectName,
//                 value: project._id
//             })),
//         [projects]
//     );

//     return (
//         <div>
//             {error && <p className="error">{error}</p>}
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     {/* <Button onClick={() => setIsFormVisible(true)}>New Task</Button> */}
//                     <TaskTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} setIsFormVisible={setIsFormVisible} />
//                     {/* <Dialog
//                         header={editingTask ? "Edit Task Form" : "Task Form"}      
//                         visible={isFormVisible}
//                         onHide={() => setIsFormVisible(false)}
//                         aria-hidden={!isFormVisible} // Use this to control visibility
//                     > */}

//                     {isFormVisible && (
//                         <div className="dialog-overlay ">
//                             <div className="dialog-content p-5 ">
//                                 <span className="dialog-close" onClick={() => setIsFormVisible(false)}>
//                                     &times;
//                                 </span>

//                                 <   div>
//                                 <h5>{editingTask ? "Edit Task Form" : "Task Form"} </h5>
                                
//                                 </div>
//                                 {editingTask ? (
//                                     <EditTaskForm task={editingTask} onSubmit={handleSubmit} users={usersOptions} projectsOptions={projectsOptions} />
//                                 ) : (
//                                     <TaskForm onSubmit={handleSubmit} initialValues={{}} users={usersOptions} projectsOptions={projectsOptions} />
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default TaskPage;
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}