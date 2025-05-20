import React from 'react';
import ResetPassword from './ResetPassword';

export default function RestPasswordpage({ slug }: any) {
    return (
        <div>
            <ResetPassword slug={slug} />
        </div>
    );
}
