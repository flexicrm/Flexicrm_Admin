'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaLock } from 'react-icons/fa';

function Page() {
    return (
        <motion.div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.h2 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                404 - Page Not Found
            </motion.h2>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                The URL you entered is incorrect or no longer exists.
            </motion.p>
            <motion.div
                style={{ marginTop: '20px' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            >
                <FaLock size={30} />
            </motion.div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                <Link href="/register" className="btn bg-black text-white mt-3">
                    Go Back Home
                </Link>
            </motion.div>
        </motion.div>
    );
}

export default Page;
