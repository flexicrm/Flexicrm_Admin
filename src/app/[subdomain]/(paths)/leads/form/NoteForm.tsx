// 'use client';
// import React, { useEffect, useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';
// import { UpdateLeadsByID } from '../../../../../../api/Leads';
// // import { useToast } from '@/hooks/use-toast';
// import Cookies from 'js-cookie';
// interface Note {
//     id?: string;
//     content: string;
//     createdAt?: string;
//     leadId: any;
// }

// interface NoteFormProps {
//     open: boolean;
//     onOpenChange: (open: boolean) => void;
//     leadId: any;
//     note?: Note;
// }

// const defaultNote: Partial<Note> = {
//     content: ''
// };

// const NoteForm = ({ open, onOpenChange, leadId, note }: NoteFormProps) => {
//     // const { toast } = useToast();
//     const subdomain = Cookies.get('subdomain');
//     console.log(leadId, 'leadIdnotes');

//     const [formData, setFormData] = useState<Partial<Note>>({
//         ...defaultNote
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const isEditMode = !!note?.id;

//     useEffect(() => {
//         if (note) {
//             setFormData(note);
//         } else {
//             setFormData({ ...defaultNote, leadId });
//         }
//     }, [note, leadId]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // Validate form
//         // if (!formData.content) {
//         //     // toast({
//         //     //     title: 'Missing required fields',
//         //     //     description: 'Please fill in all required fields',
//         //     //     variant: 'destructive'
//         //     // });
//         //     setIsSubmitting(false);
//         //     return;
//         // }
//         const payload = {
//             notes: [...leadId.LeadId.notes, formData.content]
//         };
//         console.log(payload,"payload");
//         try {
//             setIsSubmitting(true);

//             const response = await UpdateLeadsByID(subdomain, leadId.LeadId, payload);
//             console.log(response, 'response');
//         } catch (error) {
//             console.log(error);

//         }

//         // if (response.success) {
//         //     setSnackbarMessage(response.data.message);
//         //     setSnackbarOpen(true);
//         //     setSnackbarSeverity('success');
//         //     window.location.href = `/${subdomain}/leads`;
//         // } else {
//         //     setSnackbarMessage(response.data.errors);
//         //     setSnackbarOpen(true);
//         //     setSnackbarSeverity('error');
//         // }
//         // Prepare data for submission
//         const noteData: Note = {
//             id: note?.id || String(Date.now()),
//             leadId,
//             content: formData.content!,
//             createdAt: note?.createdAt || new Date().toISOString()
//         };

//         // Simulate API request
//         setTimeout(() => {
//             // toast({
//             //     title: isEditMode ? 'Note updated' : 'Note created',
//             //     description: isEditMode ? 'Your note has been updated successfully.' : 'Your note has been added successfully.'
//             // });
//             setIsSubmitting(false);
//             onOpenChange(false);
//         }, 800);
//     };

//     const handleCancel = () => {
//         onOpenChange(false);
//     };

//     return (
//         <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
//             <DialogTitle>{'Add New Note'}</DialogTitle>
//             <DialogContent>
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid size={{ xs: 12, sm: 12 }}>
//                             <TextField fullWidth label="Content" name="content" value={formData.content} onChange={handleInputChange} required multiline rows={4} />
//                         </Grid>
//                     </Grid>
//                     <DialogActions>
//                         <Button onClick={handleCancel} color="primary">
//                             Cancel
//                         </Button>
//                         <Button type="submit" color="primary" disabled={isSubmitting}>
//                             {isSubmitting ? 'Saving...' : isEditMode ? 'Update Note' : 'Create Note'}
//                         </Button>
//                     </DialogActions>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default NoteForm;

'use client';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';
import { UpdateLeadsByID } from '../../../../../../api/Leads';
import Cookies from 'js-cookie';
import { MyButton } from '../../../../ui-components/Buttons/Buttons';

interface Note {
    id?: string;
    content: string;
    createdAt?: string;
    leadId: any;
}

interface NoteFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    leadId: any;
    note?: Note;
}

const defaultNote: Partial<Note> = {
    content: ''
};

const NoteForm = ({ open, onOpenChange, leadId, note }: NoteFormProps) => {
    const subdomain = Cookies.get('subdomain');
    console.log(leadId, 'leadIdnotes');

    const [formData, setFormData] = useState<Partial<Note>>({
        ...defaultNote
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEditMode = !!note?.id;

    useEffect(() => {
        if (note) {
            setFormData(note);
        } else {
            setFormData({ ...defaultNote, leadId });
        }
    }, [note, leadId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const existingNotes = Array.isArray(leadId.notes) ? leadId.notes : [];
        console.log(existingNotes, 'existingNotes');

        // Create a new array with existing notes and the new note
        const updatedNotes = [...existingNotes, formData.content];
        console.log(updatedNotes, 'existingNotes');
        const payload = {
            notes: updatedNotes
        };

        console.log(payload, 'payload');

        try {
            setIsSubmitting(true);
            const response = await UpdateLeadsByID(subdomain, leadId.LeadId, payload);
            console.log(response, 'response');
        } catch (error) {
            console.log(error);
        }

        // Prepare data for submission
        const noteData: Note = {
            id: note?.id || String(Date.now()),
            leadId,
            content: formData.content!,
            createdAt: note?.createdAt || new Date().toISOString()
        };

        // Simulate API request
        setTimeout(() => {
            setIsSubmitting(false);
            onOpenChange(false);
        }, 800);
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
            <DialogTitle>{'Add New Note'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid size={{ sm: 12 }}>
                            <TextField fullWidth label="Content" name="content" value={formData.content} onChange={handleInputChange} required multiline rows={4} />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <MyButton variant="text" onClick={handleCancel} color="primary">
                            Cancel
                        </MyButton>
                        <MyButton type="submit" color="primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Note' : 'Create Note'}
                        </MyButton>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NoteForm;
