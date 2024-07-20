import React, { Component, ReactNode } from 'react';

interface ButtonProps {
    onClick?: () => void;
    type?: 'button' | 'submit';
    className?: string;
    children: ReactNode;
    disabled?: boolean;
}

class Button extends Component<ButtonProps> {
    static defaultProps = {
        type: 'button',
        className: '',
        disabled: false,
    };

    render() {
        const { onClick, type, className, children, disabled } = this.props;
        return (
            <button type={type} onClick={onClick} className={`btn ${className}`} disabled={disabled}>
                {children}
            </button>
        );
    }
}

export default Button;
