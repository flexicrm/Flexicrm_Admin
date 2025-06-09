import React from 'react';
import { Chip } from '@mui/material';

// Create a color mapping based on lead score
const getChipColor = (score: string): { label: string; color: string } => {
    switch (score) {
        case 'hot':
            return { label: 'hot', color: '#EF4444' }; // red-500
        case 'warm':
            return { label: 'warm', color: '#F59E0B' }; // amber-500
        case 'cold':
        default:
            return { label: score || 'cold', color: '#3B82F6' }; // blue-500
    }
};

export default function LeadScoreBadge({ score }: { score: string }) {
    const { label, color } = getChipColor(score);

    return (
        <Chip
            label={label}
            size="small"
            sx={{
                backgroundColor: color,
                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'capitalize'
            }}
        />
    );
}
