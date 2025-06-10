'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import RestPasswordpage from '../page';

export default function Page() {
    const { slug } = useParams();
    return (
        <div>
            <RestPasswordpage slug={slug} />
        </div>
    );
}
