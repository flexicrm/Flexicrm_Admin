'use client';

import { Box, Typography, GlobalStyles } from '@mui/material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Circle1, Circle2 } from '../../ReuseableStyle/ReusableStyleCom';

const slides = [
    { img: '/Group.png', text: 'Crafted for Performance and Flexibility' },
    { img: '/slider1.png', text: 'Smart Dashboards for Smarter Decisions' },
    { img: '/slider2.png', text: 'Modular Components for Easy Customization' }
];

export default function LoginSlider() {
    return (
        <>
            {/* Global styles for swiper pagination dots */}
            <GlobalStyles
                styles={{
                    '.swiper-pagination-bullet': {
                        width: 8,
                        height: 8,
                        backgroundColor: 'transparent',
                        border: '2px solid white',
                        opacity: 0.7,
                        transition: 'opacity 0.3s ease, background-color 0.3s ease',
                        margin: '0 4px !important'
                        // space between dots
                    },
                    '.swiper-pagination-bullet-active': {
                        backgroundColor: 'inherit',
                        opacity: 1
                    },
                    '.swiper-pagination': {
                        bottom: '80px !important',
                        textAlign: 'center',
                        '@media (min-width: 1024px)': {
                            bottom: '10px !important'
                        }
                    }
                }}
            />

            <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 5000 }} loop pagination={{ clickable: true }} style={{ height: '100%', width: '100%' }}>
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <Box sx={{ textAlign: 'center', margin: '0 auto', marginTop: '4rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Circle1>
                                    <Circle2>
                                        <motion.img src={slide.img} alt={`slide-${index}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '80%', height: 'auto', marginBottom: 16 }} />
                                    </Circle2>
                                </Circle1>
                            </Box>
                            <Typography variant="h6" sx={{ mt: 1 }}>
                                {slide.text}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1, fontSize: '12px' }}>
                                Everything you need in an easily customizable dashboard.
                            </Typography>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
