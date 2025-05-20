import React from 'react';
import ContractPage from './contractPage';

export default function Contract({ fetchData }: any) {
    return (
        <div>
            <ContractPage fetchData={fetchData} />
        </div>
    );
}
