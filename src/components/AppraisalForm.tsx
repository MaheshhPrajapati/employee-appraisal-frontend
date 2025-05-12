// src/components/AppraisalForm.tsx
import React, { useState } from 'react';
import ReviewModal from './ReviewModal';
import './AppraisalForm.css';

const AppraisalForm: React.FC = () => {
    const [formData, setFormData] = useState({
        goalAchievement: '',
        teamwork: '',
        communication: '',
        punctuality: '',
        innovation: '',
        leadership: '',
    });

    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="appraisal-form">
            <h2>Fill Appraisal Form</h2>
            <form>
                {Object.keys(formData).map((key) => (
                    <div className="form-group" key={key}>
                        <label>{key.replace(/([A-Z])/g, ' $1')}</label>
                        <textarea name={key} value={formData[key as keyof typeof formData]} onChange={handleChange} />
                    </div>
                ))}
                <button type="button" className='button' onClick={() => setShowModal(true)}>Review & Submit</button>
            </form>

            {showModal && (
                <ReviewModal
                    data={formData}
                    onClose={() => setShowModal(false)}
                    onSubmit={() => {
                        console.log('Submit to backend:', formData);
                        setShowModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default AppraisalForm;
