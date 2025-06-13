import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
interface FieldItem {
    id: string;
    name: string;
    label: string;
    type: string;
}
export const DraggableItem: React.FC<{
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    field: FieldItem;
    children?: React.ReactNode;
}> = ({ provided, snapshot, field, children }) => {
    return (
        <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={{
                ...provided.draggableProps.style,
                // transform: snapshot.isDragging ? provided.draggableProps.style?.transform : 'translate(0px, 0px)',
                // transition: snapshot.isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 999
            }}
        >
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1.5,
                        p: 1,
                        fontSize: '0.9rem',
                        background: snapshot.isDragging ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        border: snapshot.isDragging ? '2px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                        userSelect: 'none',
                        cursor: snapshot.isDragging ? 'grabbing' : 'grab',
                        boxShadow: snapshot.isDragging ? '0 20px 40px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
                        // transform: snapshot.isDragging ? 'rotate(3deg) scale(1.05)' : 'rotate(0deg) scale(1)',
                        zIndex: snapshot.isDragging ? 1000 : 999,
                        opacity: snapshot.isDragging ? 0.95 : 1,
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        // zIndex: '99999'

                        // '&::before': {
                        //     content: '""',
                        //     position: 'absolute',
                        //     top: 0,
                        //     left: 0,
                        //     right: 0,
                        //     height: '1px',
                        //     background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)'
                        // }
                    }}
                >
                    <div {...provided.dragHandleProps}>
                        <DragIndicatorIcon
                            sx={{
                                mr: 2,
                                fontSize: 20,
                                color: 'rgba(255, 255, 255, 0.7)',
                                cursor: 'grab',
                                transition: 'color 0.2s ease',
                                '&:hover': {
                                    color: '#6366f1'
                                },
                                '&:active': {
                                    cursor: 'grabbing'
                                }
                            }}
                        />
                    </div>
                    <Typography variant="body1" sx={{ fontWeight: 500, letterSpacing: '0.01em' }}>
                        {field.label}
                    </Typography>
                    <Box
                        sx={{
                            ml: 'auto',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '8px',
                            background: 'rgba(99, 102, 241, 0.2)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: '#a5b4fc',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}
                    >
                        {field.type}
                    </Box>
                    {children}
                </Box>
            </motion.div>
        </div>
    );
};
