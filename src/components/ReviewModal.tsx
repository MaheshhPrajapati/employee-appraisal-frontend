// src/components/ReviewModal.tsx
import React from 'react';
import './ReviewModal.css';

interface Props {
    data: Record<string, string>;
    onClose: () => void;
    onSubmit: () => void;
}

const ReviewModal: React.FC<Props> = ({ data, onClose, onSubmit }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Review Your Answers</h3>
                <ul>
                    {Object.entries(data).map(([question, answer]) => (
                        <li key={question}>
                            <strong>{question.replace(/([A-Z])/g, ' $1')}:</strong> {answer}
                        </li>
                    ))}
                </ul>
                <div className="modal-actions">
                    <button className='button' onClick={onClose}>Edit</button>
                    <button className='button' onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;