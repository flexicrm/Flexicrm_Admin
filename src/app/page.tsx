'use client';

import AndroidIcon from '@mui/icons-material/Android';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import GroupsIcon from '@mui/icons-material/Groups';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PeopleIcon from '@mui/icons-material/People';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import StorageIcon from '@mui/icons-material/Storage';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TwitterIcon from '@mui/icons-material/Twitter';
import { AppBar, Avatar, Box, Button, Card, Chip, Container, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Toolbar, Typography, alpha } from '@mui/material';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface WhyChoose {
    icon: React.ReactNode;
    title: string;
    desc: string;
}
interface Feature {
    title: string;
    desc: string;
    color: string;
    live: boolean;
    icon: React.ReactNode;
}
interface Statistic {
    value: string;
    label: string;
    color?: string;
}
interface RoadmapItem {
    title: string;
    status: 'live' | 'soon';
    icon: React.ReactNode;
}

/* ─────────────────────────────────────────────
   RowSlide
   rowIndex even  → slides from RIGHT (positive x)
   rowIndex odd   → slides from LEFT  (negative x)
   cardIndex      → stagger delay per card
───────────────────────────────────────────── */
interface RowSlideProps {
    children: React.ReactNode;
    rowIndex: number;
    cardIndex: number;
    distance?: number;
}
const RowSlide: React.FC<RowSlideProps> = ({ children, rowIndex, cardIndex, distance = 120 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    const controls = useAnimation();
    const fromX = rowIndex % 2 === 0 ? distance : -distance;

    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: cardIndex * 0.08, ease: [0.22, 1, 0.36, 1] }
            });
        }
    }, [inView, controls, cardIndex]);

    return (
        <motion.div ref={ref} initial={{ opacity: 0, x: fromX }} animate={controls} style={{ height: '100%' }}>
            {children}
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
   ScrollReveal
───────────────────────────────────────────── */
interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    distance?: number;
}
const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0, direction = 'up', distance = 50 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const controls = useAnimation();
    const initial = {
        opacity: 0,
        x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
        y: direction === 'up' ? distance : direction === 'down' ? -distance : 0
    };
    useEffect(() => {
        if (inView) controls.start({ opacity: 1, x: 0, y: 0 });
    }, [inView, controls]);
    return (
        <motion.div ref={ref} initial={initial} animate={controls} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
   Logo
───────────────────────────────────────────── */
const FlexiLogo: React.FC = () => (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
            <svg width="40" height="34" viewBox="0 0 60 50" fill="none">
                <path d="M4 4h20v10H14v6h8v10h-8v6h10v10H4V4z" fill="#1E5FA8" />
                <path d="M28 4l16 22L28 46V4z" fill="#F5921E" />
                <path d="M36 4h20L40 26l16 20H36L20 26 36 4z" fill="#1E5FA8" opacity=".15" />
            </svg>
            <Typography variant="h6" component="span" sx={{ ml: 1, fontFamily: 'Sora, sans-serif', fontWeight: 800, color: '#2D3142', letterSpacing: '0.5px' }}>
                Flexi <span style={{ color: '#1E5FA8' }}>CRM</span>
            </Typography>
            <Chip label="BETA" size="small" sx={{ ml: 1.5, backgroundColor: '#F5921E', color: 'white', fontWeight: 'bold', fontSize: '0.65rem', height: 20 }} />
        </Box>
    </motion.div>
);

/* ─────────────────────────────────────────────
   AnimatedCounter
───────────────────────────────────────────── */
const AnimatedCounter: React.FC<{ value: string; color?: string }> = ({ value, color }) => {
    const [count, setCount] = useState(0);
    const match = value.match(/(\d+)/);
    const num = match ? parseInt(match[1]) : 0;
    const suffix = value.replace(/\d+/, '');
    useEffect(() => {
        if (!num) return;
        let start = 0;
        const step = num / (1500 / 16);
        const t = setInterval(() => {
            start += step;
            if (start >= num) {
                setCount(num);
                clearInterval(t);
            } else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(t);
    }, [num]);
    return (
        <Typography variant="h4" sx={{ fontWeight: 800, color }}>
            {count}
            {suffix}
        </Typography>
    );
};

/* ─────────────────────────────────────────────
   Section heading helper
───────────────────────────────────────────── */
const SectionHeader = ({ label, title, sub }: { label: string; title: React.ReactNode; sub: string }) => (
    <ScrollReveal>
        <Box sx={{ textAlign: 'center', mb: 7 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <Box sx={{ width: 28, height: 2, backgroundColor: '#F5921E', borderRadius: 1 }} />
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F5921E' }}>{label}</Typography>
                <Box sx={{ width: 28, height: 2, backgroundColor: '#F5921E', borderRadius: 1 }} />
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 800, color: '#2D3142', mb: 2, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
                {title}
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', color: '#6B7280', maxWidth: 560, mx: 'auto', lineHeight: 1.7 }}>{sub}</Typography>
        </Box>
    </ScrollReveal>
);

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
export default function Home(): React.JSX.Element {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const [statsVisible, setStatsVisible] = useState(false);

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) setStatsVisible(true);
            },
            { threshold: 0.3 }
        );
        if (statsRef.current) obs.observe(statsRef.current);
        return () => obs.disconnect();
    }, []);

    /* ── Nav items ── */
    const navItems = ['Home', 'Features', 'Why Choose Us', 'Roadmap', 'Contact'];

    /* ── Why Choose Us — 8 items, 2 rows × 4 ── */
    const whyChoose: WhyChoose[] = [
        { icon: <CheckCircleOutlineIcon />, title: 'Easy Lead Tracking', desc: 'Track every lead from first touch to close with an intuitive pipeline view. Never lose a prospect again.' },
        { icon: <StorageIcon />, title: 'Centralized Data', desc: 'All your lead info, notes, and communications stored in one place. Your whole team stays on the same page.' },
        { icon: <GroupsIcon />, title: 'Team Workflow', desc: 'Assign leads to team members, set priorities, and collaborate seamlessly with built-in workflow tools.' },
        { icon: <SpeedIcon />, title: 'Fast Dashboard', desc: 'Real-time metrics and visual reports that load instantly. Make data-driven decisions without waiting.' },
        { icon: <TrendingUpIcon />, title: 'Scalable Growth', desc: 'Start small and grow without limits. Flexi CRM scales with your business from 10 leads to 10,000.' },
        { icon: <SecurityIcon />, title: 'Secure & Reliable', desc: 'Enterprise-grade security with 99.9% uptime. Your data is encrypted and protected at every layer.' },
        { icon: <PeopleIcon />, title: 'Team Collaboration', desc: 'Work together seamlessly with team assignments, comments, and real-time notifications.' },
        { icon: <TimelineIcon />, title: 'Advanced Analytics', desc: 'Get deep insights into your sales pipeline with customizable reports and forecasting.' }
    ];

    /* ── Core Features — 8 items, 2 rows × 4 ── */
    const coreFeatures: Feature[] = [
        { title: 'Lead Capture', desc: 'Capture leads from any source — forms, email, or manual entry — into a single organized inbox.', color: '#F5921E', live: true, icon: <PeopleIcon /> },
        { title: 'Lead Tracking', desc: 'Visualize your entire pipeline with customizable stages and real-time status updates.', color: '#F5921E', live: true, icon: <TimelineIcon /> },
        { title: 'Follow-up Reminders', desc: 'Set automated reminders so no follow-up falls through the cracks. Stay on top of every opportunity.', color: '#F5921E', live: true, icon: <NotificationsActiveIcon /> },
        { title: 'Team Assignment', desc: 'Assign leads to the right sales rep automatically based on rules, region, or availability.', color: '#F5921E', live: true, icon: <GroupsIcon /> },
        { title: 'Contact Management', desc: 'Maintain a rich contact database with full history, preferences, and interaction timeline.', color: '#F5921E', live: true, icon: <AssignmentIcon /> },
        { title: 'Activity Notes', desc: 'Log calls, meetings, and emails with timestamped notes attached to every lead record.', color: '#F5921E', live: true, icon: <TaskAltIcon /> },
        { title: 'Email Integration', desc: 'Connect your email account and sync all communications automatically with lead records.', color: '#F5921E', live: true, icon: <StorageIcon /> },
        { title: 'Mobile Access', desc: 'Access your leads and pipeline on the go with our mobile-optimized interface.', color: '#F5921E', live: true, icon: <PhoneIphoneIcon /> }
    ];

    /* split helpers — chunk array into rows of n */
    const chunk = <T,>(arr: T[], n: number): T[][] => Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));

    const whyRows = chunk(whyChoose, 4); // 2 rows of 4
    const featureRows = chunk(coreFeatures, 4); // 2 rows of 4

    const roadmapItems: RoadmapItem[] = [
        { title: 'Lead Management', status: 'live', icon: <PeopleIcon sx={{ color: '#fff' }} /> },
        { title: 'Sales Management', status: 'soon', icon: <TrendingUpIcon sx={{ color: 'rgba(255,255,255,0.6)' }} /> },
        { title: 'Customer Management', status: 'soon', icon: <GroupsIcon sx={{ color: 'rgba(255,255,255,0.6)' }} /> },
        { title: 'Project Management', status: 'soon', icon: <AssignmentIcon sx={{ color: 'rgba(255,255,255,0.6)' }} /> },
        { title: 'Invoice Management', status: 'soon', icon: <ReceiptIcon sx={{ color: 'rgba(255,255,255,0.6)' }} /> }
    ];

    const stats: Statistic[] = [
        { value: '2k+', label: 'Beta Users', color: '#1E5FA8' },
        { value: '98%', label: 'Satisfaction Rate', color: '#F5921E' },
        { value: '5x', label: 'Faster Lead Tracking', color: '#16a34a' }
    ];

    const heroContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
    const heroItem = { hidden: { opacity: 0, y: 44 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

    const drawer = (
        <Box sx={{ width: 260, pt: 2 }}>
            <Box sx={{ px: 2, mb: 2 }}>
                <FlexiLogo />
            </Box>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton href={`#${item.toLowerCase().replace(/\s+/g, '')}`} onClick={() => setMobileOpen(false)}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ px: 2, mt: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button variant="outlined" href="/register" fullWidth sx={{ borderColor: '#1E5FA8', color: '#1E5FA8', borderRadius: 2, fontWeight: 600 }}>
                    Login
                </Button>
                <Button variant="contained" href="/register" fullWidth sx={{ bgcolor: '#F5921E', '&:hover': { bgcolor: '#d97b0d' }, borderRadius: 2, fontWeight: 700 }}>
                    Register Now
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ overflowX: 'hidden', backgroundColor: '#ffffff', fontFamily: "'DM Sans', sans-serif", '& h1,& h2,& h3,& h4,& h5': { fontFamily: "'Sora', sans-serif" } }}>
            {/* ═══════ NAV ═══════ */}
            <AppBar
                position="fixed"
                sx={{
                    background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: scrolled ? '0 8px 32px rgba(30,95,168,0.10)' : 'none',
                    borderBottom: '1px solid #E5E7EB',
                    transition: 'all 0.35s ease'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', py: 1, height: 68 }}>
                    <FlexiLogo />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                                sx={{
                                    color: '#2D3142',
                                    fontSize: '0.93rem',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    position: 'relative',
                                    '&::after': { content: '""', position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 0, height: 2, bgcolor: '#1E5FA8', borderRadius: 1, transition: 'width 0.25s ease' },
                                    '&:hover::after': { width: '70%' },
                                    '&:hover': { color: '#1E5FA8', backgroundColor: 'transparent' }
                                }}
                            >
                                {item}
                            </Button>
                        ))}
                    </Box>
                    <Box gap={2} display="flex" alignItems="center">
                        <Button
                            variant="text"
                            href="/register"
                            sx={{
                                display: { xs: 'none', sm: 'flex' },
                                color: '#1E5FA8',
                                fontWeight: 600,
                                border: '1.5px solid #1E5FA8',
                                borderRadius: '8px',
                                px: 2.5,
                                py: 1,
                                '&:hover': { backgroundColor: '#1E5FA8', color: '#fff' },
                                transition: 'all 0.25s ease'
                            }}
                        >
                            Login
                        </Button>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="contained"
                                href="/register"
                                sx={{ backgroundColor: '#F5921E', '&:hover': { backgroundColor: '#d97b0d' }, fontWeight: 700, px: 3, py: 1, borderRadius: '8px', boxShadow: '0 4px 14px rgba(245,146,30,0.35)', display: { xs: 'none', sm: 'flex' } }}
                            >
                                Register Now
                            </Button>
                        </motion.div>
                        <IconButton sx={{ display: { xs: 'flex', md: 'none' } }} onClick={() => setMobileOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
                {drawer}
            </Drawer>

            {/* ═══════ HERO ═══════ */}
            <Box ref={heroRef} id="home" sx={{ minHeight: '100vh', pt: { xs: 15, md: 20 }, pb: { xs: 10, md: 15 }, background: 'linear-gradient(135deg, #f8f9fb 0%, #eef3fb 60%, #fdf5ec 100%)', position: 'relative', overflow: 'hidden' }}>
                <motion.div style={{ position: 'absolute', top: -120, right: -120, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,95,168,0.08) 0%, transparent 70%)', opacity: heroOpacity, y: heroY }} />
                <motion.div style={{ position: 'absolute', bottom: -80, left: -80, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,146,30,0.07) 0%, transparent 70%)', opacity: heroOpacity }} />
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{ position: 'absolute', width: 6 + i * 2, height: 6 + i * 2, borderRadius: '50%', background: i % 2 === 0 ? 'rgba(30,95,168,0.18)' : 'rgba(245,146,30,0.18)', top: `${10 + i * 12}%`, left: `${5 + i * 8}%` }}
                        animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
                    />
                ))}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 6, minHeight: '70vh' }}>
                        {/* LEFT */}
                        <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: '48%' } }}>
                            <motion.div variants={heroContainer} initial="hidden" animate="visible">
                                <motion.div variants={heroItem}>
                                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2.5, px: 2, py: 0.75, borderRadius: 20, border: '1px solid rgba(34,197,94,0.3)', bgcolor: 'rgba(34,197,94,0.06)' }}>
                                        <Box
                                            component={motion.span}
                                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e', display: 'block' }}
                                        />
                                        <Typography sx={{ color: '#1a7a34', fontWeight: 600, fontSize: '0.82rem', fontFamily: "'Sora', sans-serif" }}>Beta Version – Live Now</Typography>
                                    </Box>
                                </motion.div>
                                <motion.div variants={heroItem}>
                                    <Typography variant="h1" sx={{ fontWeight: 800, color: '#2D3142', mb: 2, fontSize: { xs: '2.4rem', md: '3.1rem' }, lineHeight: 1.12, letterSpacing: '-0.02em' }}>
                                        Manage Leads{' '}
                                        <motion.span style={{ color: '#1E5FA8', display: 'inline-block' }} animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                                            Smarter
                                        </motion.span>{' '}
                                        with Flexi CRM
                                    </Typography>
                                </motion.div>
                                <motion.div variants={heroItem}>
                                    <Typography sx={{ fontSize: '1.05rem', color: '#6B7280', mb: 4, lineHeight: 1.75, maxWidth: 480 }}>
                                        Organize, track, and convert leads into customers with a simple and powerful CRM platform built for growing teams.
                                    </Typography>
                                </motion.div>
                                <motion.div variants={heroItem}>
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 5 }}>
                                        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                href="/register"
                                                endIcon={<ArrowForwardIcon />}
                                                sx={{ backgroundColor: '#F5921E', px: 4, py: 1.75, fontSize: '1rem', fontWeight: 700, borderRadius: '10px', boxShadow: '0 6px 20px rgba(245,146,30,0.38)', '&:hover': { backgroundColor: '#d97b0d' } }}
                                            >
                                                Register Now – It&apos;s Free
                                            </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                variant="outlined"
                                                size="large"
                                                startIcon={<span style={{ fontSize: '1.1rem' }}>▶</span>}
                                                sx={{
                                                    borderColor: '#1E5FA8',
                                                    color: '#1E5FA8',
                                                    borderWidth: 2,
                                                    px: 4,
                                                    py: 1.75,
                                                    fontSize: '1rem',
                                                    fontWeight: 700,
                                                    borderRadius: '10px',
                                                    '&:hover': { borderWidth: 2, backgroundColor: alpha('#1E5FA8', 0.04) }
                                                }}
                                            >
                                                View Demo
                                            </Button>
                                        </motion.div>
                                    </Stack>
                                </motion.div>
                                <motion.div variants={heroItem}>
                                    <Stack direction="row" spacing={4} ref={statsRef}>
                                        {stats.map((stat, i) => (
                                            <Box key={i}>
                                                {statsVisible ? (
                                                    <AnimatedCounter value={stat.value} color={stat.color} />
                                                ) : (
                                                    <Typography variant="h4" sx={{ fontWeight: 800, color: stat.color }}>
                                                        0
                                                    </Typography>
                                                )}
                                                <Typography variant="body2" sx={{ color: '#6B7280', mt: 0.5 }}>
                                                    {stat.label}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </motion.div>
                            </motion.div>
                        </Box>

                        {/* RIGHT – Dashboard */}
                        <Box sx={{ flex: 1, position: 'relative', pt: { xs: 4, md: 0 }, pl: { md: 2 } }}>
                            <motion.div
                                initial={{ opacity: 0, y: -24, x: 10 }}
                                animate={{ opacity: 1, y: 0, x: 0 }}
                                transition={{ delay: 0.85, duration: 0.6, type: 'spring', stiffness: 120 }}
                                style={{ position: 'absolute', top: -14, right: 0, zIndex: 10, background: '#fff', borderRadius: 14, padding: '12px 18px', boxShadow: '0 8px 32px rgba(30,95,168,0.13)', border: '1px solid #E5E7EB' }}
                            >
                                <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.2, repeat: Infinity }}>
                                    <Typography sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#F5921E', lineHeight: 1 }}>+34</Typography>
                                    <Typography sx={{ fontSize: '0.72rem', color: '#6B7280', mt: 0.3 }}>New leads today</Typography>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 80, scale: 0.93 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                style={{ background: '#fff', borderRadius: 20, boxShadow: '0 24px 64px rgba(30,95,168,0.14)', padding: 22, border: '1px solid #E5E7EB', position: 'relative', zIndex: 2 }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '0.95rem' }}>Lead Dashboard</Typography>
                                    <Chip label="● Live" size="small" sx={{ backgroundColor: '#e6f4ea', color: '#166534', fontWeight: 700, fontSize: '0.7rem' }} />
                                </Box>
                                <Grid container spacing={1} sx={{ mb: 2 }}>
                                    {[
                                        { value: '248', label: 'Total Leads', color: '#1E5FA8' },
                                        { value: '64', label: 'Follow-ups', color: '#F5921E' },
                                        { value: '38', label: 'Converted', color: '#16a34a' }
                                    ].map((m, idx) => (
                                        <Grid item xs={4} key={idx}>
                                            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + idx * 0.13 }}>
                                                <Box sx={{ backgroundColor: '#F3F4F6', borderRadius: 2, p: 1.5 }}>
                                                    <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: m.color }}>{m.value}</Typography>
                                                    <Typography sx={{ fontSize: '0.72rem', color: '#6B7280', mt: 0.4 }}>{m.label}</Typography>
                                                </Box>
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 80, backgroundColor: '#F3F4F6', p: 1.5, borderRadius: 2, mb: 2 }}>
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                                        const heights = [45, 65, 50, 80, 60, 90, 40];
                                        const colors = ['#1E5FA820', '#1E5FA840', '#1E5FA830', '#1E5FA8', '#F5921E', '#F5921E', '#1E5FA820'];
                                        return (
                                            <Box key={day} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                                                <motion.div
                                                    style={{ width: '100%', backgroundColor: colors[idx], borderRadius: '4px 4px 0 0' }}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${heights[idx]}%` }}
                                                    transition={{ delay: 1.0 + idx * 0.09, duration: 0.55, ease: 'backOut' }}
                                                    whileHover={{ filter: 'brightness(1.25)', transition: { duration: 0.15 } }}
                                                />
                                                <Typography sx={{ fontSize: '0.65rem', color: '#6B7280' }}>{day}</Typography>
                                            </Box>
                                        );
                                    })}
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {[
                                        { name: 'Arun Kumar', company: 'TechCorp Pvt Ltd', initial: 'AK', color: '#1E5FA8', status: '🔥 Hot', statusColor: '#fee2e2', statusText: '#991b1b' },
                                        { name: 'Sneha Raj', company: 'Startup X', initial: 'SR', color: '#F5921E', status: 'Follow-up', statusColor: '#fef3c7', statusText: '#92400e' },
                                        { name: 'Mohammed V', company: 'Global Traders', initial: 'MV', color: '#16a34a', status: '✓ Closed', statusColor: '#dcfce7', statusText: '#166534' }
                                    ].map((lead, idx) => (
                                        <motion.div key={idx} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.45 + idx * 0.13 }} whileHover={{ x: 4, transition: { duration: 0.2 } }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1.5,
                                                    p: 1.5,
                                                    backgroundColor: '#F3F4F6',
                                                    borderRadius: 2,
                                                    cursor: 'pointer',
                                                    '&:hover': { backgroundColor: '#e8f0fb' },
                                                    transition: 'background 0.25s'
                                                }}
                                            >
                                                <Avatar sx={{ bgcolor: lead.color, width: 32, height: 32, fontSize: '0.8rem', fontWeight: 700 }}>{lead.initial}</Avatar>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography sx={{ fontWeight: 600, fontSize: '0.83rem' }}>{lead.name}</Typography>
                                                    <Typography sx={{ fontSize: '0.72rem', color: '#6B7280' }}>{lead.company}</Typography>
                                                </Box>
                                                <Chip label={lead.status} size="small" sx={{ backgroundColor: lead.statusColor, color: lead.statusText, fontWeight: 700, fontSize: '0.7rem' }} />
                                            </Box>
                                        </motion.div>
                                    ))}
                                </Box>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 24, x: -10 }}
                                animate={{ opacity: 1, y: 0, x: 0 }}
                                transition={{ delay: 1.1, duration: 0.6, type: 'spring', stiffness: 120 }}
                                style={{ position: 'absolute', bottom: -22, left: 12, zIndex: 10, background: '#fff', borderRadius: 14, padding: '12px 18px', boxShadow: '0 8px 32px rgba(30,95,168,0.12)', border: '1px solid #E5E7EB' }}
                            >
                                <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>
                                    <Typography sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#16a34a', lineHeight: 1 }}>+12%</Typography>
                                    <Typography sx={{ fontSize: '0.72rem', color: '#6B7280', mt: 0.3 }}>Conversion rate this week</Typography>
                                </motion.div>
                            </motion.div>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* ════════════════════════════════════════════
                WHY CHOOSE US
                8 cards · 2 rows × 4 cols
                Row 0 → slides from RIGHT
                Row 1 → slides from LEFT
                Each card: same style as "How It Works"
            ════════════════════════════════════════════ */}
            <Box sx={{ backgroundColor: '#F3F4F6', py: { xs: 8, md: 12 } }} id="whychooseus">
                <Container maxWidth="lg">
                    <SectionHeader
                        label="Why Choose Us"
                        title={
                            <>
                                Built for Teams That <span style={{ color: '#1E5FA8' }}>Move Fast</span>
                            </>
                        }
                        sub="Everything you need to capture, nurture, and convert leads — without the complexity."
                    />

                    {/* Render 2 rows, each with 4 cards */}
                    {whyRows.map((row, rowIndex) => (
                        <Box
                            key={rowIndex}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4, 1fr)' },
                                gap: 3,
                                position: 'relative',
                                mb: rowIndex === 0 ? 3 : 0
                            }}
                        >
                            {/* Connecting gradient line — same as How It Works */}
                            <Box sx={{ position: 'absolute', top: 36, left: '5%', right: '5%', height: 2, background: 'linear-gradient(90deg, #e8f0fb, #eef3fb)', display: { xs: 'none', md: 'block' }, zIndex: 0 }} />

                            {row.map((item, cardIndex) => (
                                <RowSlide key={cardIndex} rowIndex={rowIndex} cardIndex={cardIndex}>
                                    <motion.div whileHover={{ y: -8, transition: { duration: 0.22 } }} style={{ height: '100%' }}>
                                        <Card
                                            sx={{
                                                p: 4,
                                                height: '100%',
                                                borderRadius: 4,
                                                textAlign: 'center',
                                                border: '1px solid #E5E7EB',
                                                background: '#fff',
                                                position: 'relative',
                                                zIndex: 1,
                                                transition: 'all 0.3s',
                                                '&:hover': { boxShadow: '0 8px 32px rgba(30,95,168,0.12)', borderColor: '#1E5FA8' }
                                            }}
                                        >
                                            <motion.div whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }}>
                                                <Avatar
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        bgcolor: '#1E5FA8',
                                                        color: '#fff',
                                                        margin: '0 auto 20px',
                                                        boxShadow: '0 4px 16px rgba(30,95,168,0.30)'
                                                    }}
                                                >
                                                    {React.cloneElement(item.icon as React.ReactElement, { sx: { fontSize: 26 } })}
                                                </Avatar>
                                            </motion.div>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '0.97rem', color: '#1a1f36' }}>
                                                {item.title}
                                            </Typography>
                                            <Typography sx={{ fontSize: '0.83rem', color: '#6B7280', lineHeight: 1.65 }}>{item.desc}</Typography>
                                        </Card>
                                    </motion.div>
                                </RowSlide>
                            ))}
                        </Box>
                    ))}
                </Container>
            </Box>

            {/* ════════════════════════════════════════════
                CORE FEATURES
                8 cards · 2 rows × 4 cols
                Row 0 → slides from RIGHT
                Row 1 → slides from LEFT
                Each card: same style as "How It Works"
            ════════════════════════════════════════════ */}
            <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#fff' }} id="features">
                <Container maxWidth="lg">
                    <SectionHeader
                        label="Core Features"
                        title={
                            <>
                                Everything You Need to <span style={{ color: '#1E5FA8' }}>Manage Leads</span>
                            </>
                        }
                        sub="Powerful tools designed for simplicity. Go from lead capture to closed deal in record time."
                    />

                    {featureRows.map((row, rowIndex) => (
                        <Box
                            key={rowIndex}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4, 1fr)' },
                                gap: 3,
                                position: 'relative',
                                mb: rowIndex === 0 ? 3 : 0
                            }}
                        >
                            {/* Connecting gradient line — same as How It Works */}
                            <Box sx={{ position: 'absolute', top: 36, left: '5%', right: '5%', height: 2, background: 'linear-gradient(90deg, #fff4e6, #fdf5ec)', display: { xs: 'none', md: 'block' }, zIndex: 0 }} />

                            {row.map((feature, cardIndex) => (
                                <RowSlide key={cardIndex} rowIndex={rowIndex} cardIndex={cardIndex}>
                                    <motion.div whileHover={{ y: -8, transition: { duration: 0.22 } }} style={{ height: '100%' }}>
                                        <Card
                                            sx={{
                                                p: 4,
                                                height: '100%',
                                                borderRadius: 4,
                                                textAlign: 'center',
                                                border: '1px solid #E5E7EB',
                                                background: '#fff',
                                                position: 'relative',
                                                zIndex: 1,
                                                transition: 'all 0.3s',
                                                '&:hover': { boxShadow: '0 8px 32px rgba(245,146,30,0.13)', borderColor: '#F5921E' }
                                            }}
                                        >
                                            <motion.div whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }}>
                                                <Avatar
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        bgcolor: '#F5921E',
                                                        color: '#fff',
                                                        margin: '0 auto 20px',
                                                        boxShadow: '0 4px 16px rgba(245,146,30,0.35)'
                                                    }}
                                                >
                                                    {React.cloneElement(feature.icon as React.ReactElement, { sx: { fontSize: 26 } })}
                                                </Avatar>
                                            </motion.div>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '0.97rem', color: '#1a1f36' }}>
                                                {feature.title}
                                            </Typography>
                                            <Typography sx={{ fontSize: '0.83rem', color: '#6B7280', lineHeight: 1.65 }}>{feature.desc}</Typography>
                                        </Card>
                                    </motion.div>
                                </RowSlide>
                            ))}
                        </Box>
                    ))}
                </Container>
            </Box>

            {/* ═══════ ROADMAP ═══════ */}
            <Box sx={{ background: 'linear-gradient(135deg, #0f2a4e 0%, #1a3f70 100%)', py: 12 }} id="roadmap">
                <Container maxWidth="lg">
                    <ScrollReveal>
                        <Box sx={{ textAlign: 'center', mb: 7 }}>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <Box sx={{ width: 24, height: 1, backgroundColor: '#F5921E' }} />
                                <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F5921E' }}>Product Roadmap</Typography>
                                <Box sx={{ width: 24, height: 1, backgroundColor: '#F5921E' }} />
                            </Box>
                            <Typography variant="h2" sx={{ fontWeight: 800, color: '#fff', mb: 2, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
                                What&apos;s <span style={{ color: '#F5921E' }}>Live &amp; Coming</span> Next
                            </Typography>
                            <Typography sx={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', maxWidth: 560, mx: 'auto', lineHeight: 1.7 }}>
                                We&apos;re building a full business OS. Lead Management is live — more powerful modules are on the way.
                            </Typography>
                        </Box>
                    </ScrollReveal>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', maxWidth: 1100, mx: 'auto' }}>
                        <Box sx={{ position: 'absolute', top: 28, left: 0, right: 0, height: 2, backgroundColor: 'rgba(255,255,255,0.15)', zIndex: 0 }} />
                        <motion.div
                            style={{ position: 'absolute', top: 28, left: 0, height: 2, backgroundColor: '#F5921E', zIndex: 1 }}
                            initial={{ width: '0%' }}
                            whileInView={{ width: '10%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                        {roadmapItems.map((item, index) => (
                            <ScrollReveal key={index} direction="up" delay={index * 0.18}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 2, px: 1.5 }}>
                                    <motion.div
                                        whileHover={{ scale: 1.12 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: 20,
                                            border: item.status === 'live' ? '3px solid rgba(245,146,30,0.4)' : '3px solid rgba(255,255,255,0.2)',
                                            backgroundColor: item.status === 'live' ? '#F5921E' : 'rgba(255,255,255,0.08)',
                                            boxShadow: item.status === 'live' ? '0 0 0 10px rgba(245,146,30,0.12)' : 'none'
                                        }}
                                    >
                                        {item.status === 'live' ? (
                                            <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                                                {item.icon}
                                            </motion.div>
                                        ) : (
                                            item.icon
                                        )}
                                    </motion.div>
                                    <Typography sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '0.96rem', color: '#fff', mb: 1.5 }}>{item.title}</Typography>
                                    <Chip
                                        label={item.status === 'live' ? '● Live Now' : 'Coming Soon'}
                                        size="small"
                                        sx={{
                                            backgroundColor: item.status === 'live' ? '#22c55e20' : 'rgba(245,146,30,0.15)',
                                            color: item.status === 'live' ? '#4ade80' : '#F5921E',
                                            border: item.status === 'live' ? '1px solid #22c55e50' : '1px solid rgba(245,146,30,0.3)',
                                            fontWeight: 700,
                                            fontSize: '0.72rem'
                                        }}
                                    />
                                </Box>
                            </ScrollReveal>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ═══════ HOW IT WORKS ═══════ */}
            <Box sx={{ backgroundColor: '#F3F4F6', py: 12 }} id="howitworks">
                <Container maxWidth="lg">
                    <SectionHeader
                        label="How It Works"
                        title={
                            <>
                                Up &amp; Running in <span style={{ color: '#1E5FA8' }}>4 Simple Steps</span>
                            </>
                        }
                        sub="No training required. Start managing leads in minutes, not weeks."
                    />
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4, 1fr)' }, gap: 3, position: 'relative' }}>
                        <Box sx={{ position: 'absolute', top: 36, left: '10%', right: '10%', height: 2, background: 'linear-gradient(90deg, #e8f0fb, #fff4e6)', display: { xs: 'none', md: 'block' } }} />
                        {[
                            { num: 1, title: 'Register Account', desc: 'Create your free account in 30 seconds. No credit card or setup required.' },
                            { num: 2, title: 'Add & Manage Leads', desc: 'Import existing leads or start fresh. Organize them by status, priority, or owner.' },
                            { num: 3, title: 'Track Follow-ups', desc: 'Set reminders, log activities, and never miss a follow-up that could close a deal.' },
                            { num: 4, title: 'Grow Your Business', desc: 'Convert more leads, grow your pipeline, and scale your revenue with clear insights.' }
                        ].map((step, index) => (
                            <ScrollReveal key={index} direction="down" delay={index * 0.18}>
                                <motion.div whileHover={{ y: -8, transition: { duration: 0.22 } }}>
                                    <Card sx={{ p: 4, height: '100%', borderRadius: 4, textAlign: 'center', border: '1px solid #E5E7EB', transition: 'all 0.3s', '&:hover': { boxShadow: '0 8px 32px rgba(30,95,168,0.12)' } }}>
                                        <motion.div whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }}>
                                            <Avatar
                                                sx={{
                                                    width: 60,
                                                    height: 60,
                                                    bgcolor: index === 3 ? '#F5921E' : '#1E5FA8',
                                                    color: '#fff',
                                                    fontSize: '1.2rem',
                                                    fontWeight: 800,
                                                    margin: '0 auto 20px',
                                                    boxShadow: index === 3 ? '0 4px 16px rgba(245,146,30,0.35)' : '0 4px 16px rgba(30,95,168,0.3)'
                                                }}
                                            >
                                                {step.num}
                                            </Avatar>
                                        </motion.div>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                            {step.title}
                                        </Typography>
                                        <Typography sx={{ fontSize: '0.83rem', color: '#6B7280', lineHeight: 1.6 }}>{step.desc}</Typography>
                                    </Card>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ═══════ MOBILE APP ═══════ */}
            <Box sx={{ background: 'linear-gradient(135deg, #0d1f3c 0%, #1a3f70 50%, #0f2a4e 100%)', py: 12, position: 'relative', overflow: 'hidden' }} id="mobileapp">
                <Box sx={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,146,30,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: -150, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,95,168,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={8} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <ScrollReveal direction="left">
                                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <Box sx={{ width: 24, height: 1, backgroundColor: '#F5921E' }} />
                                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F5921E' }}>Mobile App</Typography>
                                    <Box sx={{ width: 24, height: 1, backgroundColor: '#F5921E' }} />
                                </Box>
                                <Typography variant="h2" sx={{ fontWeight: 800, color: '#fff', mb: 2, fontSize: { xs: '1.8rem', md: '2.6rem' }, lineHeight: 1.2 }}>
                                    Take Flexi CRM <span style={{ color: '#F5921E' }}>Everywhere</span> You Go
                                </Typography>
                                <Typography sx={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', mb: 4, maxWidth: 460, lineHeight: 1.75 }}>Manage your leads, track follow-ups, and stay on top of your pipeline right from your pocket.</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
                                    {[
                                        { icon: <CheckCircleIcon />, text: 'Real-time lead updates & notifications' },
                                        { icon: <NotificationsActiveIcon />, text: 'Instant follow-up reminders on the go' },
                                        { icon: <BarChartIcon />, text: 'Live dashboard charts & metrics' },
                                        { icon: <GroupsIcon />, text: 'Team collaboration & lead assignment' },
                                        { icon: <SecurityIcon />, text: 'Offline mode with secure data sync' }
                                    ].map((item, idx) => (
                                        <ScrollReveal key={idx} direction="left" delay={0.1 + idx * 0.09}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Box sx={{ width: 36, height: 36, borderRadius: 1.5, background: 'rgba(245,146,30,0.15)', border: '1px solid rgba(245,146,30,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {React.cloneElement(item.icon as React.ReactElement, { sx: { color: '#F5921E', fontSize: 18 } })}
                                                </Box>
                                                <Typography sx={{ fontSize: '0.93rem', color: 'rgba(255,255,255,0.85)' }}>{item.text}</Typography>
                                            </Box>
                                        </ScrollReveal>
                                    ))}
                                </Box>
                                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                    {[
                                        { Icon: PhoneIphoneIcon, line1: 'DOWNLOAD ON THE', line2: 'App Store' },
                                        { Icon: AndroidIcon, line1: 'GET IT ON', line2: 'Google Play' }
                                    ].map(({ Icon, line1, line2 }, idx) => (
                                        <motion.div key={idx} whileHover={{ scale: 1.05, y: -3 }}>
                                            <Button
                                                variant="outlined"
                                                startIcon={<Icon />}
                                                sx={{
                                                    backgroundColor: 'rgba(255,255,255,0.07)',
                                                    border: '1.5px solid rgba(255,255,255,0.18)',
                                                    borderRadius: 2,
                                                    color: '#fff',
                                                    py: 1.5,
                                                    px: 3,
                                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.13)', borderColor: '#F5921E' }
                                                }}
                                            >
                                                <Box sx={{ textAlign: 'left' }}>
                                                    <Typography sx={{ fontSize: '0.68rem', textTransform: 'uppercase', opacity: 0.55 }}>{line1}</Typography>
                                                    <Typography sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '1rem' }}>{line2}</Typography>
                                                </Box>
                                            </Button>
                                        </motion.div>
                                    ))}
                                </Stack>
                                <Chip
                                    icon={<FiberManualRecordIcon sx={{ fontSize: 12, color: '#F5921E !important' }} />}
                                    label="App launching soon — Join the waitlist"
                                    sx={{ backgroundColor: 'rgba(245,146,30,0.15)', border: '1px solid rgba(245,146,30,0.35)', color: '#F5921E', fontWeight: 700, fontSize: '0.74rem' }}
                                />
                            </ScrollReveal>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 3, height: 540, position: 'relative' }}>
                                <Box sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(30,95,168,0.25)', filter: 'blur(60px)', top: '10%', right: '10%', zIndex: 0 }} />
                                <Box sx={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'rgba(245,146,30,0.2)', filter: 'blur(60px)', bottom: '5%', left: '15%', zIndex: 0 }} />
                                {/* Phone L */}
                                <motion.div
                                    initial={{ opacity: 0, x: -60, rotate: -6 }}
                                    whileInView={{ opacity: 1, x: 20, rotate: -6 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -10, rotate: -4, transition: { duration: 0.3 } }}
                                    style={{ width: 170, height: 360, borderRadius: 40, boxShadow: '0 40px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.08)', overflow: 'hidden', position: 'relative', zIndex: 2, opacity: 0.85 }}
                                >
                                    <Box sx={{ height: '100%', background: 'linear-gradient(180deg,#0d1a2e 0%,#0f2540 100%)' }}>
                                        <Box sx={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 70, height: 20, background: '#000', borderRadius: 10, zIndex: 10 }} />
                                        <Box sx={{ position: 'absolute', inset: 0, padding: '40px 12px 12px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0.5 }}>
                                                <Typography sx={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '0.62rem', color: '#fff' }}>My Leads</Typography>
                                                <Avatar sx={{ width: 22, height: 22, bgcolor: '#F5921E', fontSize: '0.5rem' }}>AK</Avatar>
                                            </Box>
                                            <Typography sx={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.6)', mt: 0.5 }}>Today&apos;s Follow-ups (5)</Typography>
                                            {[
                                                { name: 'Ravi Shankar', tag: '🔥 Hot', tagBg: 'rgba(239,68,68,0.2)', tagColor: '#f87171' },
                                                { name: 'Priya Nair', tag: 'Warm', tagBg: 'rgba(245,158,11,0.2)', tagColor: '#fbbf24' },
                                                { name: 'Arjun Mehta', tag: 'New', tagBg: 'rgba(59,130,246,0.2)', tagColor: '#60a5fa' }
                                            ].map((it, idx) => (
                                                <Box key={idx} sx={{ background: 'rgba(255,255,255,0.06)', borderRadius: 1.5, p: 1, border: '1px solid rgba(255,255,255,0.08)' }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, color: '#fff' }}>{it.name}</Typography>
                                                        <Chip label={it.tag} size="small" sx={{ height: 18, fontSize: '0.45rem', fontWeight: 700, backgroundColor: it.tagBg, color: it.tagColor, border: 'none' }} />
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </motion.div>
                                {/* Phone C */}
                                <motion.div
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                    style={{ width: 200, height: 420, borderRadius: 40, boxShadow: '0 40px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.08)', overflow: 'hidden', position: 'relative', zIndex: 3 }}
                                >
                                    <Box sx={{ height: '100%', background: 'linear-gradient(180deg,#0d1a2e 0%,#0f2540 100%)' }}>
                                        <Box sx={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 70, height: 20, background: '#000', borderRadius: 10, zIndex: 10 }} />
                                        <Box sx={{ position: 'absolute', inset: 0, padding: '40px 12px 12px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography sx={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '0.65rem', color: '#fff' }}>Good morning, Arun 👋</Typography>
                                                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                                    <Box
                                                        component={motion.div}
                                                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                        sx={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }}
                                                    />
                                                    <Typography sx={{ fontSize: '0.5rem', color: '#4ade80' }}>Live</Typography>
                                                </Box>
                                            </Box>
                                            <Grid container spacing={0.5}>
                                                {[
                                                    { val: '128', label: 'Total Leads', color: '#60a5fa' },
                                                    { val: '32', label: 'Follow-ups', color: '#F5921E' },
                                                    { val: '19', label: 'Converted', color: '#4ade80' },
                                                    { val: '74%', label: 'Response Rate', color: '#c084fc' }
                                                ].map((m, i) => (
                                                    <Grid item xs={6} key={i}>
                                                        <Box sx={{ background: 'rgba(255,255,255,0.06)', borderRadius: 1.5, p: 1, border: '1px solid rgba(255,255,255,0.06)' }}>
                                                            <Typography sx={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '0.85rem', color: m.color }}>{m.val}</Typography>
                                                            <Typography sx={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.45)' }}>{m.label}</Typography>
                                                        </Box>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                            <Box sx={{ background: 'rgba(255,255,255,0.04)', borderRadius: 1.5, p: 1, border: '1px solid rgba(255,255,255,0.06)' }}>
                                                <Typography sx={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.5)', mb: 0.5, fontWeight: 600 }}>Weekly Lead Activity</Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5, height: 40 }}>
                                                    {[40, 65, 50, 85, 70, 95, 45].map((h, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            style={{ flex: 1, background: idx === 4 || idx === 5 ? '#F5921E' : idx === 3 ? '#1E5FA8' : `rgba(30,95,168,${0.3 + idx * 0.1})`, borderRadius: '3px 3px 0 0' }}
                                                            initial={{ height: 0 }}
                                                            whileInView={{ height: `${h}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: 0.5 + idx * 0.08, duration: 0.5 }}
                                                        />
                                                    ))}
                                                </Box>
                                            </Box>
                                            <Typography sx={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, px: 0.5 }}>Recent Leads</Typography>
                                            {[
                                                { name: 'Arun Kumar', company: 'TechCorp', initial: 'AK', color: '#1E5FA8', dot: '#22c55e' },
                                                { name: 'Sneha Raj', company: 'Startup X', initial: 'SR', color: '#F5921E', dot: '#fbbf24' },
                                                { name: 'Mohammed V', company: 'Global Traders', initial: 'MV', color: '#7c3aed', dot: '#f87171' }
                                            ].map((lead, idx) => (
                                                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 1, p: 0.75 }}>
                                                    <Avatar sx={{ width: 18, height: 18, bgcolor: lead.color, fontSize: '0.45rem', fontWeight: 800 }}>{lead.initial}</Avatar>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography sx={{ fontSize: '0.52rem', fontWeight: 700, color: '#fff' }}>{lead.name}</Typography>
                                                        <Typography sx={{ fontSize: '0.44rem', color: 'rgba(255,255,255,0.4)' }}>{lead.company}</Typography>
                                                    </Box>
                                                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: lead.dot }} />
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </motion.div>
                                {/* Phone R */}
                                <motion.div
                                    initial={{ opacity: 0, x: 60, rotate: 6 }}
                                    whileInView={{ opacity: 1, x: -20, rotate: 6 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -10, rotate: 4, transition: { duration: 0.3 } }}
                                    style={{ width: 170, height: 360, borderRadius: 40, boxShadow: '0 40px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.08)', overflow: 'hidden', position: 'relative', zIndex: 2, opacity: 0.85 }}
                                >
                                    <Box sx={{ height: '100%', background: 'linear-gradient(180deg,#0d1a2e 0%,#0f2540 100%)' }}>
                                        <Box sx={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 70, height: 20, background: '#000', borderRadius: 10, zIndex: 10 }} />
                                        <Box sx={{ position: 'absolute', inset: 0, padding: '40px 12px 12px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography sx={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '0.62rem', color: '#fff' }}>Activity</Typography>
                                                <Chip label="3 New" size="small" sx={{ background: '#F5921E', color: '#fff', fontSize: '0.45rem', fontWeight: 800, height: 16 }} />
                                            </Box>
                                            {[
                                                { title: '🔔 Follow-up Due', name: 'Ravi Shankar', sub: 'TechVision • 10:30 AM', color: '#F5921E', bg: 'rgba(245,146,30,0.1)', border: 'rgba(245,146,30,0.2)' },
                                                { title: '✅ Lead Converted', name: 'Priya Nair', sub: 'Closed ₹2.4L deal', color: '#4ade80', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
                                                { title: '👤 New Lead Added', name: 'Karan Mehta', sub: 'Added by Sneha • 9:15 AM', color: '#60a5fa', bg: 'rgba(30,95,168,0.15)', border: 'rgba(30,95,168,0.25)' }
                                            ].map((it, idx) => (
                                                <Box key={idx} sx={{ background: it.bg, border: `1px solid ${it.border}`, borderRadius: 1.5, p: 1 }}>
                                                    <Typography sx={{ fontSize: '0.55rem', fontWeight: 700, color: it.color, mb: 0.5 }}>{it.title}</Typography>
                                                    <Typography sx={{ fontSize: '0.52rem', color: '#fff', fontWeight: 600 }}>{it.name}</Typography>
                                                    <Typography sx={{ fontSize: '0.46rem', color: 'rgba(255,255,255,0.45)' }}>{it.sub}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </motion.div>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* ═══════ CTA ═══════ */}
            <Box sx={{ background: 'linear-gradient(135deg, #1E5FA8 0%, #154080 100%)', py: 12, position: 'relative', overflow: 'hidden' }} id="cta">
                <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(245,146,30,0.1)', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <ScrollReveal>
                        <Typography variant="h2" sx={{ fontWeight: 800, color: '#fff', mb: 2, fontSize: { xs: '1.8rem', md: '2.8rem' } }}>
                            Start Managing Your Leads Today
                        </Typography>
                        <Typography sx={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', mb: 4, maxWidth: 600, mx: 'auto' }}>Join thousands of teams already using Flexi CRM in beta. It&apos;s completely free to start.</Typography>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="contained"
                                size="large"
                                href="/register"
                                sx={{
                                    backgroundColor: '#F5921E',
                                    color: '#fff',
                                    px: 8,
                                    py: 2,
                                    fontSize: '1.1rem',
                                    fontWeight: 800,
                                    borderRadius: '10px',
                                    boxShadow: '0 6px 24px rgba(245,146,30,0.5)',
                                    '&:hover': { backgroundColor: '#d97b0d', boxShadow: '0 10px 32px rgba(245,146,30,0.6)' }
                                }}
                            >
                                Register Now — It&apos;s Free
                            </Button>
                        </motion.div>
                        <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', mt: 2 }}>✓ No credit card required &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ Beta access</Typography>
                    </ScrollReveal>
                </Container>
            </Box>

            {/* ═══════ FOOTER ═══════ */}
            <Box component="footer" sx={{ backgroundColor: '#2D3142', py: 8 }} id="contact">
                <Container maxWidth="lg">
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={4}>
                            <Box display="flex" alignItems="center" gap={1} sx={{ mb: 2 }}>
                                <svg width="32" height="28" viewBox="0 0 60 50" fill="none">
                                    <path d="M4 4h20v10H14v6h8v10h-8v6h10v10H4V4z" fill="#4a90d9" />
                                    <path d="M28 4l16 22L28 46V4z" fill="#F5921E" />
                                </svg>
                                <Typography sx={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>
                                    Flexi <span style={{ color: '#4a90d9' }}>CRM</span>
                                </Typography>
                            </Box>
                            <Typography sx={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 280 }}>
                                The smart, flexible CRM platform for growing teams. Manage leads, close deals, and scale your business — all in one place.
                            </Typography>
                        </Grid>

                        {[
                            {
                                title: 'Product',
                                links: [
                                    { name: 'Features', path: '/features' },
                                    { name: 'Roadmap', path: '/roadmap' },
                                    { name: 'Pricing', path: '/pricing' },
                                    { name: 'Changelog', path: '/changelog' }
                                ]
                            },
                            {
                                title: 'Company',
                                links: [
                                    { name: 'About Us', path: '/about' },
                                    { name: 'Blog', path: '/blog' },
                                    { name: 'Careers', path: '/careers' },
                                    { name: 'Press', path: '/press' }
                                ]
                            },
                            {
                                title: 'Support',
                                links: [
                                    { name: 'Help Center', path: '/help' },
                                    { name: 'Contact Us', path: '/contact' },
                                    { name: 'Privacy Policy', path: '/privacy-policy' },
                                    { name: 'Terms of Service', path: '/terms-conditions' }
                                ]
                            }
                        ].map((col, idx) => (
                            <Grid item xs={12} sm={4} md={2} key={idx}>
                                <Typography
                                    sx={{
                                        fontFamily: "'Sora',sans-serif",
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        color: '#fff',
                                        mb: 2
                                    }}
                                >
                                    {col.title}
                                </Typography>

                                {col.links.map((link, li) => (
                                    <Link key={li} href={link.path} passHref>
                                        <Button
                                            sx={{
                                                display: 'block',
                                                color: 'rgba(255,255,255,0.55)',
                                                fontSize: '0.85rem',
                                                textAlign: 'left',
                                                py: 0.5,
                                                textTransform: 'none',
                                                '&:hover': {
                                                    color: '#F5921E',
                                                    backgroundColor: 'transparent'
                                                },
                                                transition: 'color 0.2s'
                                            }}
                                        >
                                            {link.name}
                                        </Button>
                                    </Link>
                                ))}
                            </Grid>
                        ))}
                    </Grid>
                    <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>© 2026 Flexi CRM. All rights reserved. Beta version — built with ❤️</Typography>
                        <Stack direction="row" spacing={1}>
                            {[TwitterIcon, LinkedInIcon, InstagramIcon].map((Icon, idx) => (
                                <motion.div key={idx} whileHover={{ scale: 1.15, y: -2 }}>
                                    <IconButton
                                        size="small"
                                        sx={{ width: 36, height: 36, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 1, color: 'rgba(255,255,255,0.7)', '&:hover': { backgroundColor: '#F5921E', color: '#fff' }, transition: 'all 0.25s' }}
                                    >
                                        <Icon sx={{ fontSize: 18 }} />
                                    </IconButton>
                                </motion.div>
                            ))}
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
