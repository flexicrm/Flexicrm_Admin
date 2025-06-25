import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Box } from '@mui/material';
import LeadStatus from '../leadstatus';
import { MyButton } from '../../../../ui-components/Buttons/Buttons';
import DatePicker from '../../../../ui-components/DatePickermui/DatePicker';
import Notepad from '../../../../ui-components/Notepad/Notepad';

const FollowUpDialog = ({
    open,
    onClose,
    followUp,
    leadStatus,
    usersType,
    statusesOptions,
    UsersOptions,
    formData,
    dueDate,
    reminderEnabled,
    reminderDate,
    isSubmitting,
    isSmall,
    handleSubmit,
    setLeadStatus,
    handleInputChange,
    handleSelectChange,
    setDueDate,
    setReminderEnabled,
    setReminderDate
}) => {
    const [dropdownActive, setDropdownActive] = useState(false);
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{followUp?._id ? 'Edit Follow-Up' : 'Add New Follow-Up'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <LeadStatus leadStatus={leadStatus} onSelect={setLeadStatus} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth size="small">
                                <TextField select fullWidth size="small" label="Type" name="type" value={formData.type} onChange={(e) => handleSelectChange('type', e.target.value)}>
                                    {usersType?.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <DatePicker name={dueDate} setName={setDueDate} labels="Due Date" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Priority</InputLabel>
                                <Select value={formData.priority} onChange={(e) => handleSelectChange('priority', e.target.value)} label="Priority">
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth size="small">
                                <TextField select fullWidth size="small" label="Status" name="status" value={formData.status} onChange={(e) => handleSelectChange('status', e.target.value)}>
                                    {statusesOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            <Box display="flex" alignItems="start">
                                                {option.label}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField select fullWidth size="small" label="Assign To" name="assignTo" value={formData.assignTo} onChange={handleInputChange}>
                                {UsersOptions?.map((option) => (
                                    <MenuItem key={option.value || option.id} value={option.value || option.id}>
                                        {option.label || option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormControlLabel control={<Checkbox size="small" checked={reminderEnabled} onChange={(e) => setReminderEnabled(e.target.checked)} />} label="Set reminder" />
                        </Grid>
                        {reminderEnabled && (
                            <Grid size={{ xs: 12 }}>
                                <DatePicker name={reminderDate} setName={setReminderDate} labels="ReminderDate" />
                            </Grid>
                        )}
                        {formData.status === 'completed' && (
                            <Grid size={{ xs: 12 }}>
                                <TextField size="small" fullWidth label="Outcome" name="outcome" value={formData.outcome || ''} onChange={handleInputChange} multiline rows={3} />
                            </Grid>
                        )}
                        <Grid size={{ xs: 12 }}>
                            {/* <TextField size="small" fullWidth label="Notes" name="notes" value={formData.notes || ''} onChange={handleInputChange} multiline rows={3} /> */}

                            <Notepad formData={formData.notes} handleInputChange={handleInputChange} setDropdownActive={setDropdownActive} name="notes" />
                        </Grid>
                    </Grid>
                    <Box position="sticky" bottom={0} bgcolor="background.paper" zIndex={1} sx={{ mt: 2 }}>
                        <DialogActions>
                            <MyButton variant="text" onClick={onClose} color="primary">
                                Cancel
                            </MyButton>
                            <MyButton color="primary" disabled={isSubmitting} type="submit">
                                {isSubmitting ? 'Saving...' : !followUp ? 'Create Follow-Up' : 'Update Follow-Up'}
                            </MyButton>
                        </DialogActions>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default FollowUpDialog;
