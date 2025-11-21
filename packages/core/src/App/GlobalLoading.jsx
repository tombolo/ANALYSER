'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GlobalLoading.module.scss';

// Import your logo - make sure the path is correct
import LOGO from './Logo/NILOTE.png';

export const GlobalLoading = () => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [currentContentIndex, setCurrentContentIndex] = useState(0);

    // Vibrant and modern color palette
    const colors = {
        primary: '#6366F1', // Electric indigo
        secondary: '#EC4899', // Vibrant pink
        accent: '#10B981', // Emerald green
        gold: '#F59E0B', // Amber gold
        cyan: '#06D6A0', // Bright cyan
        purple: '#8B5CF6', // Royal purple
        orange: '#F97316', // Vibrant orange
        teal: '#14B8A6', // Sophisticated teal
        dark: '#0F172A', // Deep navy
        light: '#F8FAFC', // Clean white
        surface: 'rgba(30, 41, 59, 0.6)', // Enhanced glass surface
        gradient1: '#6366F1', // Indigo
        gradient2: '#EC4899', // Pink
        gradient3: '#10B981', // Emerald
    };

    // Enhanced loading content with rotations
    const loadingContent = [
        {
            text: 'In partnership with',
            company: 'DERIV',
            type: 'partnership',
            gradient: ['#F59E0B', '#F97316'], // Gold to orange
        },
        {
            text: 'Powered by',
            company: 'DERIV',
            type: 'powered',
            gradient: ['#EC4899', '#8B5CF6'], // Pink to purple
        },
        {
            text: 'Simplifying your',
            highlight: 'trading journey',
            type: 'journey',
            gradient: ['#10B981', '#06D6A0'], // Emerald to cyan
        },
        {
            text: 'Built for',
            highlight: 'modern traders',
            type: 'modern',
            gradient: ['#6366F1', '#8B5CF6'], // Indigo to purple
        },
    ];

    useEffect(() => {
        // Content rotation every 2 seconds
        const contentInterval = setInterval(() => {
            setCurrentContentIndex(prev => (prev + 1) % loadingContent.length);
        }, 2000);

        // Smooth progress animation with easing over 5 seconds
        const duration = 10000;
        const startTime = Date.now();
        let animationFrame;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);

            // Custom easing function for natural feel
            const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
            const easedProgress = easeOutQuart(progress / 100) * 100;

            setProgress(Math.min(easedProgress, 100));

            if (progress < 100) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                // Add a slight delay before completing
                setTimeout(() => setIsComplete(true), 600);
            }
        };

        // Start the animation
        animationFrame = requestAnimationFrame(animate);

        return () => {
            clearInterval(contentInterval);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
        },
        exit: {
            opacity: 0,
            scale: 0.98,
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
        },
    };

    const logoVariants = {
        initial: { scale: 0.8, opacity: 0, rotateY: -180 },
        animate: {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            transition: {
                duration: 1.2,
                ease: 'easeOut',
                rotateY: { duration: 1.5, ease: 'easeOut' },
            },
        },
    };

    const textContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const textItemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
        exit: {
            opacity: 0,
            y: -30,
            scale: 0.95,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    const currentContent = loadingContent[currentContentIndex];
    const progressWidth = Math.max(5, progress);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className={styles.globalLoading}
                    style={{
                        '--primary': colors.primary,
                        '--secondary': colors.secondary,
                        '--accent': colors.accent,
                        '--gold': colors.gold,
                        '--cyan': colors.cyan,
                        '--purple': colors.purple,
                        '--orange': colors.orange,
                        '--teal': colors.teal,
                        '--dark': colors.dark,
                        '--light': colors.light,
                        '--surface': colors.surface,
                        '--gradient1': colors.gradient1,
                        '--gradient2': colors.gradient2,
                        '--gradient3': colors.gradient3,
                    }}
                    variants={containerVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                >
                    {/* Animated gradient background */}
                    <div className={styles.animatedBackground} />

                    {/* Enhanced background elements */}
                    <div className={styles.backgroundElements}>
                        <div className={styles.floatingOrb1} />
                        <div className={styles.floatingOrb2} />
                        <div className={styles.floatingOrb3} />
                        <div className={styles.particleField} />
                    </div>

                    <div className={styles.loadingContainer}>
                        {/* Enhanced Logo with 3D effect */}
                        <motion.div
                            className={styles.logoContainer}
                            variants={logoVariants}
                            initial='initial'
                            animate='animate'
                            whileHover={{ scale: 1.05, rotateY: 10 }}
                        >
                            <img src={LOGO} alt='Logo' className={styles.logo} />
                            <div className={styles.logoGlow} />
                            <div className={styles.logoPulse} />
                        </motion.div>

                        {/* Dynamic Text Content */}
                        <motion.div
                            className={styles.textsContainer}
                            variants={textContainerVariants}
                            initial='hidden'
                            animate='visible'
                            key={currentContentIndex}
                        >
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentContentIndex}
                                    className={styles.textContent}
                                    variants={textItemVariants}
                                    initial='hidden'
                                    animate='visible'
                                    exit='exit'
                                >
                                    {currentContent.type === 'partnership' && (
                                        <div className={styles.partnershipContent}>
                                            <span className={styles.prefix}>{currentContent.text}</span>
                                            <motion.span
                                                className={styles.companyName}
                                                style={{
                                                    background: `linear-gradient(135deg, ${currentContent.gradient[0]}, ${currentContent.gradient[1]})`,
                                                    backgroundSize: '200% 200%',
                                                }}
                                                animate={{
                                                    backgroundPosition: ['0%', '100%', '0%'],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }}
                                            >
                                                {currentContent.company}
                                            </motion.span>
                                        </div>
                                    )}

                                    {currentContent.type === 'powered' && (
                                        <div className={styles.poweredContent}>
                                            <span className={styles.prefix}>{currentContent.text}</span>
                                            <motion.span
                                                className={styles.techName}
                                                style={{
                                                    color: colors.light,
                                                }}
                                                animate={{
                                                    textShadow: [
                                                        `0 0 20px ${currentContent.gradient[0]}`,
                                                        `0 0 30px ${currentContent.gradient[1]}`,
                                                        `0 0 20px ${currentContent.gradient[0]}`,
                                                    ],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }}
                                            >
                                                {currentContent.company}
                                            </motion.span>
                                        </div>
                                    )}

                                    {(currentContent.type === 'journey' || currentContent.type === 'modern') && (
                                        <div className={styles.journeyContent}>
                                            <span className={styles.journeyText}>{currentContent.text}</span>
                                            <motion.span
                                                className={styles.highlightText}
                                                style={{
                                                    background: `linear-gradient(135deg, ${currentContent.gradient[0]}, ${currentContent.gradient[1]})`,
                                                    backgroundSize: '200% 200%',
                                                }}
                                                animate={{
                                                    backgroundPosition: ['0%', '100%', '0%'],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }}
                                            >
                                                {currentContent.highlight}
                                            </motion.span>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        {/* Enhanced Progress Bar */}
                        <div className={styles.progressContainer}>
                            <div className={styles.progressBar}>
                                <motion.div
                                    className={styles.progressFill}
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${progressWidth}%`,
                                        transition: {
                                            duration: 0.2,
                                            ease: 'easeOut',
                                        },
                                    }}
                                >
                                    <div className={styles.progressGlow} />
                                    <div className={styles.progressSparkle} />
                                </motion.div>
                            </div>
                            <motion.div
                                className={styles.progressText}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { delay: 0.2 },
                                }}
                            >
                                {Math.round(progress)}%
                            </motion.div>
                        </div>

                        {/* Enhanced Loading Indicator */}
                        <motion.div
                            className={styles.loadingIndicator}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className={styles.spinner}>
                                <div className={styles.spinnerOrbit} />
                                <div className={styles.spinnerCore} />
                            </div>
                            <motion.span
                                className={styles.loadingLabel}
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Loading
                            </motion.span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalLoading;
