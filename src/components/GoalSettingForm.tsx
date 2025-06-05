// src/components/PersonalDetailForm.tsx
import React, { useState } from 'react';
import ReviewModal from './ReviewModal';
import './GoalSettingForm.css';

interface PersonalDetailFormProps {
    // handleNumFunc: (num: number) => void;
    // num: number
}

const GoalSettingForm: React.FC<PersonalDetailFormProps> = () => {
    const [formData, setFormData] = useState({
        TellUsYourAppraisalExpectations: '',
        TellUsAboutYourNextYearPerformanceGoals: '',
        TellUsAboutYourNextYearCertificationGoals: '',
        TellUsAboutYourTeamLeadingGoals: '',
        TellUsAboutYourFutureResponsibiltyGoals: '',
    });

    function validateForm() {
        const errors: { [key: string]: string } = {};

        if (!formData.TellUsYourAppraisalExpectations.trim()) {
            errors.TellUsYourAppraisalExpectations = "Above Field is required";
        } else if (formData.TellUsYourAppraisalExpectations.length > 250) {
            errors.TellUsYourAppraisalExpectations = "Max 250 Characters allowed";
        } else if (formData.TellUsYourAppraisalExpectations.length < 50) {
            errors.TellUsYourAppraisalExpectations = "Min 50 Characters required";
        }

        if (!formData.TellUsAboutYourNextYearPerformanceGoals.trim()) {
            errors.TellUsAboutYourNextYearPerformanceGoals = "Above Field is required";
        } else if (formData.TellUsAboutYourNextYearPerformanceGoals.length > 250) {
            errors.TellUsAboutYourNextYearPerformanceGoals = "Max 250 Characters allowed";
        } else if (formData.TellUsAboutYourNextYearPerformanceGoals.length < 50) {
            errors.TellUsAboutYourNextYearPerformanceGoals = "Min 50 Characters required";
        }

        if (!formData.TellUsAboutYourNextYearCertificationGoals.trim()) {
            errors.TellUsAboutYourNextYearCertificationGoals = "Above Field is required";
        } else if (formData.TellUsAboutYourNextYearCertificationGoals.length > 250) {
            errors.TellUsAboutYourNextYearCertificationGoals = "Max 250 Characters allowed";
        } else if (formData.TellUsAboutYourNextYearCertificationGoals.length < 50) {
            errors.TellUsAboutYourNextYearCertificationGoals = "Min 50 Characters required";
        }

        if (!formData.TellUsAboutYourTeamLeadingGoals.trim()) {
            errors.TellUsAboutYourTeamLeadingGoals = "Above Field is required";
        } else if (formData.TellUsAboutYourTeamLeadingGoals.length > 250) {
            errors.TellUsAboutYourTeamLeadingGoals = "Max 250 Characters allowed";
        } else if (formData.TellUsAboutYourTeamLeadingGoals.length < 50) {
            errors.TellUsAboutYourTeamLeadingGoals = "Min 50 Characters required";
        }

        if (!formData.TellUsAboutYourFutureResponsibiltyGoals.trim()) {
            errors.TellUsAboutYourFutureResponsibiltyGoals = "Above Field is required";
        } else if (formData.TellUsAboutYourFutureResponsibiltyGoals.length > 250) {
            errors.TellUsAboutYourFutureResponsibiltyGoals = "Max 250 Characters allowed";
        } else if (formData.TellUsAboutYourFutureResponsibiltyGoals.length < 50) {
            errors.TellUsAboutYourFutureResponsibiltyGoals = "Min 50 Characters required";
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    }

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="goal-setting-form">
            <h2>Goal Setting Form</h2>
            <form>
                {Object.keys(formData).map((key) => (
                    <div className="form-group" key={key}>
                        <label className='label'>{key.replace(/([A-Z])/g, ' $1')}</label>
                        <input className='inputTag' name={key} value={formData[key as keyof typeof formData]} onChange={handleChange} />
                        {
                            formErrors[key] && (
                                <div className='error-text'>{formErrors[key]}</div>
                            )
                        }
                    </div>
                ))}
                <button type="button" className='button' onClick={() => { if (validateForm()) { setShowModal(true) } }}>Save & Next</button>
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

export default GoalSettingForm;
