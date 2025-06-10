export const validateRequired = (value) => {
    if (!value) {
        return 'This field is required';
    }
    return undefined;
};

export const validateEmail = (value) => {
    if (!value) {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
    }
    return undefined;
};

export const validatePhone = (value) => {
    if (!value) {
        return 'Phone number is required';
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value)) {
        return 'Please enter a valid 10-digit phone number';
    }
    return undefined;
};

export const validateNumber = (value) => {
    if (value === undefined || value === null || value === '') {
        return 'This field is required';
    }
    if (isNaN(value)) {
        return 'Please enter a valid number';
    }
    return undefined;
};
