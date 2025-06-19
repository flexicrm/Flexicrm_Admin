
'use client';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import LeadStatusa from './leadStatus';
import Customfilds from './customfilds';

export default function Page() {
    const [selectedTab, setSelectedTab] = useState('Lead Status');

    const SwitchTabs = [{ label: 'Lead Status' }, { label: 'Form' }, { label: 'Custom Fields' }];

    const renderContent = () => {
        switch (selectedTab) {
            case 'Lead Status':
                return <LeadStatusa />;
            case 'Form':
                return <div>Form Content</div>; // Replace with actual content
            case 'Custom Fields':
                return <Customfilds />;
            default:
                return null;
        }
    };

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <div style={{ padding: '1rem' }}>
            <div
                className="card"
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    minHeight: '400px'
                }}
            >
                <div
                    style={{
                        width: isMobile ? '100%' : '220px',
                        borderRight: isMobile ? 'none' : '1px solid #ddd',
                        borderBottom: isMobile ? '1px solid #ddd' : 'none',
                        backgroundColor: '#f9f9f9'
                    }}
                >
                    {SwitchTabs.map((item) => (
                        <div
                            key={item.label}
                            onClick={() => setSelectedTab(item.label)}
                            style={{
                                padding: { xs: '0', md: '12px 16px' },
                                // padding: '12px 16px',
                                cursor: 'pointer',
                                backgroundColor: selectedTab === item.label ? '#e3f2fd' : 'transparent',
                                borderLeft: selectedTab === item.label && !isMobile ? '4px solid #1976d2' : '4px solid transparent',
                                borderBottom: isMobile ? '1px solid #eee' : 'none',
                                fontWeight: selectedTab === item.label ? 'bold' : 'normal',
                                color: selectedTab === item.label ? '#1976d2' : '#333'
                            }}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        padding: { xs: '0', md: '1rem' },
                        flexGrow: 1,
                        width: '100%',
                        overflowX: 'auto'
                    }}
                >
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
