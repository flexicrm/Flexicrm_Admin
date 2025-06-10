// // 'use client';
// // import React, { useState } from 'react';
// // // import {
// // //     MyAutocomplete,
// // //     MyButton,
// // //     MyCheckbox,
// // //     MyRadioGroup,
// // //     MySlider,
// // //     MySwitch,
// // //     MyTextField,
// // //     MyRating,
// // //     MyAvatar,
// // //     MyBadge,
// // //     MyChip,
// // //     MyDivider,
// // //     MyList,
// // //     MyTable,
// // //     MySnackbar,
// // //     MyBox,
// // //     MyAppBar,
// // //     MyContainer,
// // //     MyTypography,
// // //     MyTooltip,
// // //     MyAlert,
// // //     MyBackdrop,
// // //     MyDialog,
// // //     MyCircularProgress,
// // //     MySkeleton,
// // //     MyAccordion,
// // //     MyCard,
// // //     MyDrawer,
// // //     MyBreadcrumbs,
// // //     MyLink,
// // //     MyMenu,
// // //     MyPagination,
// // //     MySpeedDial,
// // //     MyTabs,
// // //     MyGrid,
// // //     MyStack,
// // //     MyImageList
// // // } from '../../Component';
// // import { Box, Typography } from '@mui/material';
// // import { MyAutocomplete } from '../../Component/Autocomplete/Autocomplete';
// // import { MyButton } from '../../Component/Buttons/Buttons';
// // import { MyCheckbox } from '../../Component/Checkbox/CheckBox';
// // import { MyRadioGroup } from '../../Component/Radio/Radio';
// // import { MySlider } from '../../Component/Range/Slider';
// // import { MySwitch } from '../../Component/Switch/Switch';
// // import { MyTextField } from '../../Component/Textfields/TextFields';
// // import { MyRating } from '../../Component/Rating/Rating';
// // import { MyAvatar } from '../../Component/Avatar/Avatar';
// // import { MyBadge } from '../../Component/Badge/Badge';
// // import { MyChip } from '../../Component/Chip/Chip';
// // import { MyDivider } from '../../Component/Divider/Divider';
// // import { MySnackbar } from '../../Component/Snackbar/Snackbar';
// // import { MyList } from '../../Component/List/List';
// // import { MyTable } from '../../Component/Table/Table';
// // import { MyAppBar } from '../../Component/App-Bar/App-Bar';
// // import { MyContainer } from '../../Component/Container/Container';
// // import { MyBox } from '../../Component/Layout(Box)/Layout(Box)';
// // import { MyTypography } from '../../Component/Typography/Typography';
// // import { MyTooltip } from '../../Component/Tooltip/Tooltip';
// // import { MyAlert } from '../../Component/Feedback (Alert)/Feedback';
// // import { MyBackdrop } from '../../Component/Backdrop/Backdrop';
// // import { MyImageList } from '../../Component/ImageList/ImageList';
// // import { MyStack } from '../../Component/Stack/Stack';
// // import { MyGrid } from '../../Component/Grid/Grid';
// // import { MyTabs } from '../../Component/Tabs/Tabs';
// // import { MySpeedDial } from '../../Component/SpeedDial/SpeedDial';
// // import { MyPagination } from '../../Component/Pagination/Pagination';
// // import { MyMenu } from '../../Component/Menu/menu';
// // import { MyLink } from '../../Component/Link/Link';
// // import { MyBreadcrumbs } from '../../Component/Breadcrumbs/Breadcrumbs';
// // import { MyDrawer } from '../../Component/Navigation(Drawer)/Navigation(Drawer)';
// // import { MyCard } from '../../Component/Card/Card';
// // import { MyAccordion } from '../../Component/Accordion/Accordion';
// // import { MySkeleton } from '../../Component/Skeleton/Skeleton';
// // import { MyCircularProgress } from '../../Component/Progress/Progress';
// // import { MyDialog } from '../../Component/Dialog/Dialog';

// // const App = () => {
// //     const [open, setOpen] = useState(false);
// //     const [open1, setOpen1] = useState(false);
// //     const [open2, setOpen2] = useState(false);
// //     const [open3, setOpen3] = useState(false);
// //     const [openSnackbar, setOpenSnackbar] = useState(false);
// //     const [openDialog, setOpenDialog] = useState(false);
// //     const [openDrawer, setOpenDrawer] = useState(false);
// //     const [anchorEl, setAnchorEl] = useState(null);
// //     const [activeStep, setActiveStep] = useState(0);
// //     const [value, setValue] = useState(0);

// //     const sampleData = [
// //         { id: 1, name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, active: true },
// //         { id: 2, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, active: false },
// //         { id: 3, name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0, active: true },
// //         { id: 4, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, active: false },
// //         { id: 5, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, active: true }
// //     ];

// //     const columns = [
// //         { id: 'name', label: 'Dessert' },
// //         { id: 'calories', label: 'Calories', align: 'right' },
// //         { id: 'fat', label: 'Fat (g)', align: 'right' },
// //         { id: 'carbs', label: 'Carbs (g)', align: 'right' },
// //         { id: 'protein', label: 'Protein (g)', align: 'right' }
// //     ];

// //     const handleEdit = (row) => {
// //         console.log('Edit row:', row);
// //     };

// //     const handleDelete = (id) => {
// //         console.log('Delete row with id:', id);
// //     };

// //     const handleToggle = (id) => {
// //         console.log('Toggle row with id:', id);
// //     };

// //     const handleOpenSnackbar = () => setOpenSnackbar(true);
// //     const handleCloseSnackbar = () => setOpenSnackbar(false);
// //     const handleOpenDialog = () => setOpenDialog(true);
// //     const handleCloseDialog = () => setOpenDialog(false);
// //     const handleOpenDrawer = () => setOpenDrawer(true);
// //     const handleCloseDrawer = () => setOpenDrawer(false);
// //     const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
// //     const handleMenuClose = () => setAnchorEl(null);
// //     const handleChange = (event, newValue) => setValue(newValue);

// //     const listItems = ['Item 1', 'Item 2', 'Item 3'];
// //     const tableData = [
// //         { id: 1, value1: 'Data 1', value2: 'Data 2' },
// //         { id: 2, value1: 'Data 3', value2: 'Data 4' }
// //     ];
// //     const imageItems = [
// //         { img: '/something-lost.png', title: 'Image 1' },
// //         { img: '/something-lost.png', title: 'Image 2' },
// //         { img: '/something-lost.png', title: 'Image 3' }
// //     ];

// //     return (
// //         <div>
// //             <Box maxWidth="md" sx={{ p: 5 }}>
// //                 <Typography variant="h1" color="primary">
// //                     Heading
// //                 </Typography>
// //                 <Typography variant="h2" color="primary">
// //                     Heading
// //                 </Typography>
// //                 <Typography variant="h3" color="primary">
// //                     Heading
// //                 </Typography>
// //                 <Typography variant="h4" color="primary">
// //                     Heading
// //                 </Typography>
// //                 <Typography variant="h5" color="primary">
// //                     Heading
// //                 </Typography>
// //                 <Typography variant="h6" color="primary">
// //                     Heading
// //                 </Typography>
// //                 <Typography variant="body1" color="primary">
// //                     Heading
// //                 </Typography>
// //                 <Typography>
// //                     Dropdown
// //                     <MyAutocomplete options={['Option 1', 'Option 2', 'Option 3']} />
// //                 </Typography>
// //                 <Typography>
// //                     Buttons <br />
// //                     <MyButton variant="contained" color="primary">
// //                         Primary Button
// //                     </MyButton>
// //                     <br />
// //                     <MyButton variant="contained" color="primary" disabled>
// //                         Primary Button
// //                     </MyButton>
// //                     <br />
// //                     <MyButton variant="outlined" color="primary">
// //                         Primary Button
// //                     </MyButton>
// //                     <br />
// //                     <MyButton variant="contained" color="secondary">
// //                         Secondary Button
// //                     </MyButton>
// //                     <br />
// //                     <MyButton variant="contained" color="error">
// //                         Error Button
// //                     </MyButton>
// //                     <br />
// //                     <MyButton variant="contained" color="info">
// //                         Info Button
// //                     </MyButton>
// //                     <br />
// //                     <MyButton variant="contained" color="warning">
// //                         Warning Button
// //                     </MyButton>
// //                 </Typography>
// //                 <Typography>
// //                     <MyCheckbox label="Checkbox" />
// //                 </Typography>
// //                 <Typography>
// //                     <MyRadioGroup label="Radio Group" options={['Option 1', 'Option 2', 'Option 3']} />
// //                 </Typography>
// //                 <MySlider defaultValue={0} />
// //                 <Typography>
// //                     <MySwitch label="Switch" />
// //                 </Typography>
// //                 <Typography>
// //                     <MyTextField label="Text Field" variant="outlined" />
// //                 </Typography>
// //                 <Typography>
// //                     <MyRating />
// //                 </Typography>
// //                 <Typography>
// //                     <MyAvatar src="" alt="demo" />
// //                 </Typography>
// //                 <Typography>
// //                     <MyBadge count={2} />
// //                 </Typography>
// //                 <Typography>
// //                     <MyChip label="Custom Chip" />
// //                 </Typography>
// //                 <Typography>
// //                     <MyDivider />
// //                 </Typography>
// //                 <MyButton variant="contained" onClick={() => setOpen(true)} color="success">
// //                     Show Snackbar
// //                 </MyButton>
// //                 <br />
// //                 <MyButton variant="contained" onClick={() => setOpen1(true)} color="info">
// //                     Show Snackbar
// //                 </MyButton>
// //                 <br />
// //                 <MyButton variant="contained" onClick={() => setOpen2(true)} color="warning">
// //                     Show Snackbar
// //                 </MyButton>
// //                 <br />
// //                 <MyButton variant="contained" onClick={() => setOpen3(true)} color="error">
// //                     Show Snackbar
// //                 </MyButton>
// //                 <br />
// //                 <MySnackbar open={open} message="This is a top-center snackbar!" position={{ vertical: 'top', horizontal: 'center' }} onClose={() => setOpen(false)} />
// //                 <MySnackbar open={open1} message="This is a snackbar message!" severity="info" position={{ vertical: 'bottom', horizontal: 'right' }} onClose={() => setOpen1(false)} />
// //                 <MySnackbar open={open2} message="This is a snackbar message!" severity="warning" position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setOpen2(false)} />
// //                 <MySnackbar open={open3} message="This is a snackbar message!" severity="error" onClose={() => setOpen3(false)} />
// //                 <MyList items={['Item 1', 'Item 2', 'Item 3']} />
// //                 <MyTable data={sampleData} columns={columns} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleToggle} />
// //             </Box>
// //             <MyAppBar title="My App" />
// //             <MyContainer>
// //                 <MyBox>
// //                     <MyTypography text="Welcome to My App" variant="h1" />
// //                     <MyTooltip title="This is a tooltip">
// //                         <span>Hover me</span>
// //                     </MyTooltip>
// //                     <MyAlert message="This is an alert" severity="info" />
// //                     <MyBackdrop open={false} />
// //                     <MyButton onClick={() => setOpenDialog(true)}>Dialgo open</MyButton>
// //                     <MyDialog open={openDialog} title="Dialog Title" content="This is the dialog content." onClose={handleCloseDialog} />
// //                     <MyCircularProgress />
// //                     <MySkeleton variant="text" width={210} height={118} />
// //                     <MySnackbar open={openSnackbar} message="This is a snackbar message" severity="success" onClose={handleCloseSnackbar} />
// //                     <MyAccordion title="Accordion Title" content="This is the accordion content" />
// //                     <MyCard title="Card Title" content="This is the card content" />
// //                     <MyDrawer open={openDrawer} items={listItems} onClose={handleCloseDrawer} />
// //                     <MyBreadcrumbs items={['Home', 'Page 1', 'Page 2']} />
// //                     <MyLink href="https://example.com" text="Visit Example" />
// //                     <MyMenu anchorEl={anchorEl} open={Boolean(anchorEl)} items={listItems} onClose={handleMenuClose} />
// //                     <MyPagination count={10} page={1} onChange={(event, page) => console.log(page)} />
// //                     <MySpeedDial />
// //                     <MyTabs value={value} onChange={handleChange} items={['Tab 1', 'Tab 2', 'Tab 3']} />
// //                     <MyGrid>
// //                         <MyBox>Grid Item 1</MyBox>
// //                         <MyBox>Grid Item 2</MyBox>
// //                     </MyGrid>
// //                     <MyStack>
// //                         <MyBox>Stack Item 1</MyBox>
// //                         <MyBox>Stack Item 2</MyBox>
// //                     </MyStack>
// //                     <MyImageList items={imageItems} />
// //                 </MyBox>
// //             </MyContainer>
// //         </div>
// //     );
// // };

// // export default App;
// 'use client';
// import React, { useState } from 'react';
// // import { Box, Typography } from '@mui/material';
// import { Box, Typography } from '@mui/material';
// import { MyAutocomplete } from '../../Component/Autocomplete/Autocomplete';
// import { MyButton } from '../../Component/Buttons/Buttons';
// import { MyCheckbox } from '../../Component/Checkbox/CheckBox';
// import { MyRadioGroup } from '../../Component/Radio/Radio';
// import { MySlider } from '../../Component/Range/Slider';
// import { MySwitch } from '../../Component/Switch/Switch';
// import { MyTextField } from '../../Component/Textfields/TextFields';
// import { MyRating } from '../../Component/Rating/Rating';
// import { MyAvatar } from '../../Component/Avatar/Avatar';
// import { MyBadge } from '../../Component/Badge/Badge';
// import { MyChip } from '../../Component/Chip/Chip';
// import { MyDivider } from '../../Component/Divider/Divider';
// import { MySnackbar } from '../../Component/Snackbar/Snackbar';
// import { MyList } from '../../Component/List/List';
// import { MyTable } from '../../Component/Table/Table';
// import { MyAppBar } from '../../Component/App-Bar/App-Bar';
// import { MyContainer } from '../../Component/Container/Container';
// import { MyBox } from '../../Component/Layout(Box)/Layout(Box)';
// // import { MyTypography } from '../../Component/Typography/Typography';
// import { MyTooltip } from '../../Component/Tooltip/Tooltip';
// import { MyAlert } from '../../Component/Feedback (Alert)/Feedback';
// import { MyBackdrop } from '../../Component/Backdrop/Backdrop';
// import { MyImageList } from '../../Component/ImageList/ImageList';
// import { MyStack } from '../../Component/Stack/Stack';
// import { MyGrid } from '../../Component/Grid/Grid';
// import { MyTabs } from '../../Component/Tabs/Tabs';
// import { MySpeedDial } from '../../Component/SpeedDial/SpeedDial';
// import { MyPagination } from '../../Component/Pagination/Pagination';
// import { MyMenu } from '../../Component/Menu/menu';
// import { MyLink } from '../../Component/Link/Link';
// import { MyBreadcrumbs } from '../../Component/Breadcrumbs/Breadcrumbs';
// // import { MyDrawer } from '../../Component/Navigation(Drawer)/Navigation(Drawer)';
// import { MyCard } from '../../Component/Card/Card';
// import { MyAccordion } from '../../Component/Accordion/Accordion';
// import { MySkeleton } from '../../Component/Skeleton/Skeleton';
// import { MyCircularProgress } from '../../Component/Progress/Progress';
// import { MyDialog } from '../../Component/Dialog/Dialog';
// import AppNavbar from '../../ReuseableStyle/AppNavbar';
// import ProductTable from '../../ReuseableStyle/Producttable';
// import { ThemeSwitcher } from '../../Theme/ThemeSwitcher';

// const App = () => {
//     const [open, setOpen] = useState(false);
//     const [open1, setOpen1] = useState(false);
//     const [open2, setOpen2] = useState(false);
//     const [open3, setOpen3] = useState(false);
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [openDrawer, setOpenDrawer] = useState(false);
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [activeStep, setActiveStep] = useState(0);
//     const [value, setValue] = useState(0);

//     const sampleData = [
//         { id: 1, name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, active: true },
//         { id: 2, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, active: false },
//         { id: 3, name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0, active: true },
//         { id: 4, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, active: false },
//         { id: 5, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, active: true }
//     ];

//     const columns = [
//         { id: 'name', label: 'Dessert' },
//         { id: 'calories', label: 'Calories', align: 'right' },
//         { id: 'fat', label: 'Fat (g)', align: 'right' },
//         { id: 'carbs', label: 'Carbs (g)', align: 'right' },
//         { id: 'protein', label: 'Protein (g)', align: 'right' }
//     ];

//     const handleEdit = (row) => {
//         console.log('Edit row:', row);
//     };

//     const handleDelete = (id) => {
//         console.log('Delete row with id:', id);
//     };

//     const handleToggle = (id) => {
//         console.log('Toggle row with id:', id);
//     };

//     const handleOpenSnackbar = () => setOpenSnackbar(true);
//     const handleCloseSnackbar = () => setOpenSnackbar(false);
//     const handleOpenDialog = () => setOpenDialog(true);
//     const handleCloseDialog = () => setOpenDialog(false);
//     const handleOpenDrawer = () => setOpenDrawer(true);
//     const handleCloseDrawer = () => setOpenDrawer(false);
//     const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//     const handleMenuClose = () => setAnchorEl(null);
//     const handleChange = (event, newValue) => setValue(newValue);

//     const listItems = ['Item 1', 'Item 2', 'Item 3'];
//     const tableData = [
//         { id: 1, value1: 'Data 1', value2: 'Data 2' },
//         { id: 2, value1: 'Data 3', value2: 'Data 4' }
//     ];
//     const imageItems = [
//         { img: '/something-lost.png', title: 'Image 1' },
//         { img: '/something-lost.png', title: 'Image 2' },
//         { img: '/something-lost.png', title: 'Image 3' }
//     ];

//     return (
//         <div>
//             <MyContainer>
//                 <MyAppBar title="My App" />
//                 <ThemeSwitcher/>
//                 <Box maxWidth="md" sx={{ p: 5 }}>
//                     <Typography variant="h1" color="primary" gutterBottom>
//                         Heading 1
//                     </Typography>
//                     <Typography variant="h2" color="primary" gutterBottom>
//                         Heading 2
//                     </Typography>
//                     <Typography variant="h3" color="primary" gutterBottom>
//                         Heading 3
//                     </Typography>
//                     <Typography variant="h4" color="primary" gutterBottom>
//                         Heading 4
//                     </Typography>
//                     <Typography variant="h5" color="primary" gutterBottom>
//                         Heading 5
//                     </Typography>
//                     <Typography variant="h6" color="primary" gutterBottom>
//                         Heading 6
//                     </Typography>
//                     <Typography variant="body1" color="primary" gutterBottom>
//                         Body Text
//                     </Typography>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Dropdown</Typography>
//                         <MyAutocomplete options={['Option 1', 'Option 2', 'Option 3']} />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Buttons</Typography>
//                         <MyButton variant="contained" color="primary">
//                             Primary Button
//                         </MyButton>
//                         <MyButton variant="contained" color="primary" disabled>
//                             Primary Button
//                         </MyButton>
//                         <MyButton variant="outlined" color="primary">
//                             Primary Button
//                         </MyButton>
//                         <MyButton variant="contained" color="secondary">
//                             Secondary Button
//                         </MyButton>
//                         <MyButton variant="contained" color="error">
//                             Error Button
//                         </MyButton>
//                         <MyButton variant="contained" color="info">
//                             Info Button
//                         </MyButton>
//                         <MyButton variant="contained" color="warning">
//                             Warning Button
//                         </MyButton>
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Checkbox</Typography>
//                         <MyCheckbox label="Checkbox" />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Radio Group</Typography>
//                         <MyRadioGroup label="Radio Group" options={['Option 1', 'Option 2', 'Option 3']} />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Slider</Typography>
//                         <MySlider defaultValue={0} />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Switch</Typography>
//                         <MySwitch label="Switch" />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Text Field</Typography>
//                         <MyTextField label="Text Field" variant="outlined" />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Rating</Typography>
//                         <MyRating />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Avatar</Typography>
//                         <MyAvatar src="" alt="demo" />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Badge</Typography>
//                         <MyBadge count={2} />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Chip</Typography>
//                         <MyChip label="Custom Chip" />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Divider</Typography>
//                         <MyDivider />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Snackbar</Typography>
//                         <MyButton variant="contained" onClick={() => setOpen(true)} color="success">
//                             Show Snackbar
//                         </MyButton>
//                         <MyButton variant="contained" onClick={() => setOpen1(true)} color="info">
//                             Show Snackbar
//                         </MyButton>
//                         <MyButton variant="contained" onClick={() => setOpen2(true)} color="warning">
//                             Show Snackbar
//                         </MyButton>
//                         <MyButton variant="contained" onClick={() => setOpen3(true)} color="error">
//                             Show Snackbar
//                         </MyButton>
//                         <MySnackbar open={open} message="This is a top-center snackbar!" position={{ vertical: 'top', horizontal: 'center' }} onClose={() => setOpen(false)} />
//                         <MySnackbar open={open1} message="This is a snackbar message!" severity="info" position={{ vertical: 'bottom', horizontal: 'right' }} onClose={() => setOpen1(false)} />
//                         <MySnackbar open={open2} message="This is a snackbar message!" severity="warning" position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setOpen2(false)} />
//                         <MySnackbar open={open3} message="This is a snackbar message!" severity="error" onClose={() => setOpen3(false)} />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>List</Typography>
//                         <MyList items={['Item 1', 'Item 2', 'Item 3']} />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Table</Typography>
//                         <MyTable data={sampleData} columns={columns} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleToggle} />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Tooltip</Typography>
//                         <MyTooltip title="This is a tooltip">
//                             <span>Hover me</span>
//                         </MyTooltip>
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Alert</Typography>
//                         <MyAlert message="This is an alert" severity="info" />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Backdrop</Typography>
//                         <MyBackdrop open={false} />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Dialog</Typography>
//                         <MyButton onClick={() => setOpenDialog(true)}>Open Dialog</MyButton>
//                         <MyDialog open={openDialog} title="Dialog Title" content="This is the dialog content." onClose={handleCloseDialog} />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Circular Progress</Typography>
//                         <MyCircularProgress />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Skeleton</Typography>
//                         <MySkeleton variant="text" width={210} height={118} />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Accordion</Typography>
//                         <MyAccordion title="Accordion Title" content="This is the accordion content" />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Card</Typography>
//                         <MyCard title="Card Title" content="This is the card content" />
//                     </Box>

//                     {/* <Box sx={{ my: 2 }}> */}
//                     {/* <Typography gutterBottom>Drawer</Typography> */}
//                     {/* <MyButton onClick={handleOpenDrawer}>Open Drawer</MyButton> */}
//                     {/* <MyDrawer open={openDrawer} items={listItems} onClose={handleCloseDrawer} /> */}
//                     {/* </Box> */}

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Breadcrumbs</Typography>
//                         <MyBreadcrumbs items={['Home', 'Page 1', 'Page 2']} />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Link</Typography>
//                         <MyLink href="https://example.com" text="Visit Example" />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Menu</Typography>
//                         <MyButton onClick={handleMenuOpen}>Open Menu</MyButton>
//                         <MyMenu anchorEl={anchorEl} open={Boolean(anchorEl)} items={listItems} onClose={handleMenuClose} />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Pagination</Typography>
//                         <MyPagination count={10} page={1} onChange={(event, page) => console.log(page)} />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Speed Dial</Typography>
//                         <MySpeedDial />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Tabs</Typography>
//                         <MyTabs value={value} onChange={handleChange} items={['Tab 1', 'Tab 2', 'Tab 3']} />
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Grid</Typography>
//                         <MyGrid>
//                             <MyBox>Grid Item 1</MyBox>
//                             <MyBox>Grid Item 2</MyBox>
//                         </MyGrid>
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Stack</Typography>
//                         <MyStack>
//                             <MyBox>Stack Item 1</MyBox>
//                             <MyBox>Stack Item 2</MyBox>
//                         </MyStack>
//                     </Box>

//                     <Box sx={{ my: 2 }}>
//                         <Typography gutterBottom>Image List</Typography>
//                         <MyImageList items={imageItems} />
//                     </Box>
//                 </Box>
//                 <AppNavbar />
//                 <ProductTable />
//             </MyContainer>
//         </div>
//     );
// };

// export default App;
import React from 'react';

export default function page() {
    return <div>page</div>;
}
