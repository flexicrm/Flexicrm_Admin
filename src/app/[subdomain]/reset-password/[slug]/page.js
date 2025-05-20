'use client';
import React from 'react';
import RestPasswordpage from '../page';
import { useParams } from 'next/navigation';

export default function page() {
    const { slug } = useParams();
    return (
        <div>
            <RestPasswordpage slug={slug} />
        </div>
    );
}
