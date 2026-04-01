"use client";
import { Box, Container, Divider, Typography } from "@mui/material";

export default function PrivacyPolicy() {
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Privacy Policy
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
                Effective Date: 20 March 2026
            </Typography>

            {/* Section 1 */}
            <Section
                title="1. Introduction"
                content={`Welcome to Flexi CRM, a product developed and operated by Webdads2u Private Limited ("Company", "we", "our", "us").
Flexi CRM is a business Customer Relationship Management (CRM) platform designed to help companies manage leads, customers, sales, and related business activities.
This Privacy Policy explains how we collect, use, store, and protect your information when you use our application.
By accessing or using Flexi CRM, you agree to the terms of this Privacy Policy.`}
            />

            {/* Section 2 */}
            <Section title="2. Information We Collect">
                <SubTitle text="A. Account Information" />
                <List items={["Name", "Email address", "Phone number", "Company name", "Login credentials (securely encrypted)"]} />

                <SubTitle text="B. Business & CRM Data" />
                <List
                    items={[
                        "Lead details (name, phone number, email, company information)",
                        "Customer information",
                        "Sales and project data",
                        "Notes, comments, and activity logs",
                        "Internal team user details",
                    ]}
                />

                <SubTitle text="C. Technical Information" />
                <List items={["IP address", "Device information", "Browser type", "Usage data", "Log data"]} />
            </Section>

            {/* Section 3 */}
            <Section
                title="3. How We Use Your Information"
                list={[
                    "Provide lead management services",
                    "Authenticate users",
                    "Enable secure CRM workspace access",
                    "Improve performance",
                    "Ensure system security",
                    "Send updates",
                    "Comply with legal requirements",
                ]}
            />

            {/* Section 4 */}
            <Section
                title="4. Data Sharing and Disclosure"
                list={[
                    "We do not sell or rent data",
                    "Shared with cloud providers",
                    "Shared when legally required",
                    "Protect company rights",
                ]}
            />

            {/* Section 5 */}
            <Section
                title="5. Data Security"
                list={[
                    "Encrypted passwords",
                    "Role-based access",
                    "Secure servers",
                    "Restricted DB access",
                    "Monitoring systems",
                ]}
            />

            {/* Section 6 */}
            <Section
                title="6. Data Retention"
                list={[
                    "While account is active",
                    "To provide services",
                    "Legal compliance",
                    "User can request deletion",
                ]}
            />

            {/* Section 7 */}
            <Section title="7. User Rights">
                <List
                    items={[
                        "Access data",
                        "Correct data",
                        "Delete account",
                        "Withdraw consent",
                    ]}
                />

                <Box mt={2}>
                    <Typography>Email: flexicrm.in@gmail.com</Typography>
                    <Typography>Phone: +91 9150659909</Typography>
                </Box>
            </Section>

            {/* Section 8 */}
            <Section
                title="8. Children's Privacy"
                content="Not intended for individuals under 18."
            />

            {/* Section 9 */}
            <Section
                title="9. Third-Party Services"
                content="We use secure cloud providers under strict agreements."
            />

            {/* Section 10 */}
            <Section
                title="10. Updates to This Privacy Policy"
                content="We may update this policy. Continued use means acceptance."
            />

            {/* Section 11 */}
            <Section title="11. Contact Information">
                <Typography>
                    Webdads2u Private Limited
                    <br />
                    FIRST FLOOR, 2ND PORTION, 36, Saraswati Nagar Main Rd,
                    <br />
                    Chennai – 600062, India
                </Typography>

                <Box mt={2}>
                    <Typography>Email: flexicrm.in@gmail.com</Typography>
                    <Typography>Phone: +91 9150659909</Typography>
                </Box>
            </Section>
        </Container>
    );
}

function Section({ title, content, list, children }) {
    return (
        <Box mb={4}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
                {title}
            </Typography>

            {content && (
                <Typography whiteSpace="pre-line" color="text.secondary">
                    {content}
                </Typography>
            )}

            {list && <List items={list} />}

            {children}

            <Divider sx={{ mt: 3 }} />
        </Box>
    );
}

function SubTitle({ text }) {
    return (
        <Typography fontWeight={600} mt={2}>
            {text}
        </Typography>
    );
}

function List({ items }) {
    return (
        <Box component="ul" sx={{ pl: 2, color: "text.secondary" }}>
            {items.map((item, i) => (
                <li key={i}>
                    <Typography variant="body2">{item}</Typography>
                </li>
            ))}
        </Box>
    );
}
