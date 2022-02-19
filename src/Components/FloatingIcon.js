import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';

export default function FloatingIcon(){
    return (
        <div>
            <p style={{
                cursor:'pointer',
                margin: '0px',
                position: 'fixed',
                bottom: '10%',
                right: '7%',
                zIndex: 5,
                background: 'var(--base-danger, #e40b27e8)',
                color: 'var(--base-inverted, white)',
                padding: 15,
                borderRadius: 'var(--radius-circle, 100px)',
            }}><FiMessageSquare size={31}/></p>
        </div>
    );
}

