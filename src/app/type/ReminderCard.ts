export interface ReminderCardProps {
    sortedData: any;
    subdomain: string;
    onEdit: (e: React.MouseEvent, row: any) => void;
}