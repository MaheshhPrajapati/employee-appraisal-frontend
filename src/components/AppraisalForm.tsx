// src/components/AppraisalForm.tsx
import React, { useState } from 'react';
import ReviewModal from './ReviewModal';
import './AppraisalForm.css';

interface PersonalDetailFormProps {
    handleNumFunc: (num: number) => void;
    num: number
}

const AppraisalForm: React.FC<PersonalDetailFormProps> = ({num, handleNumFunc}) => {
    const [formData, setFormData] = useState({
        TellUsYourPreviousAchievement: '',
        TellUsYourContributionInTeamwork: '',
        TellUsYourContributionInSoftwareImprovements: '',
        TellUsYourContributionsInIssueResolving: '',
        WriteAboutYourGoalAcheivements: '',
        TellUsAboutYourProjectHandling: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleValidations() {
        const errors: { [key: string]: string } = {};
        if (!formData.TellUsYourPreviousAchievement.trim()) {
            errors.TellUsYourPreviousAchievement = "Above Field is required";
        } else if (formData.TellUsYourPreviousAchievement.length > 250) {
            errors.TellUsYourPreviousAchievement = "Max 250 Characters allowed";
        } else if (formData.TellUsYourPreviousAchievement.length < 50) {
            errors.TellUsYourPreviousAchievement = "Min 50 Characters required";
        }

        if (!formData.TellUsYourContributionInTeamwork.trim()) {
            errors.TellUsYourContributionInTeamwork = "Above Field is required";
        } else if (formData.TellUsYourContributionInTeamwork.length > 250) {
            errors.TellUsYourContributionInTeamwork = "Max 250 Characters allowed";
        } else if (formData.TellUsYourContributionInTeamwork.length < 50) {
            errors.TellUsYourContributionInTeamwork = "Min 50 Characters required";
        }

        if (!formData.TellUsYourContributionInSoftwareImprovements.trim()) {
            errors.TellUsYourContributionInSoftwareImprovements = "Above Field is required";
        } else if (formData.TellUsYourContributionInSoftwareImprovements.length > 250) {
            errors.TellUsYourContributionInSoftwareImprovements = "Max 250 Characters allowed";
        } else if (formData.TellUsYourContributionInSoftwareImprovements.length < 50) {
            errors.TellUsYourContributionInSoftwareImprovements = "Min 50 Characters required";
        }

        if (!formData.TellUsYourContributionsInIssueResolving.trim()) {
            errors.TellUsYourContributionsInIssueResolving = "Above Field is required";
        } else if (formData.TellUsYourContributionsInIssueResolving.length > 250) {
            errors.TellUsYourContributionsInIssueResolving = "Max 250 Characters allowed";
        } else if (formData.TellUsYourContributionsInIssueResolving.length < 50) {
            errors.TellUsYourContributionsInIssueResolving = "Min 50 Characters required";
        }

        if (!formData.WriteAboutYourGoalAcheivements.trim()) {
            errors.WriteAboutYourGoalAcheivements = "Above Field is required";
        } else if (formData.WriteAboutYourGoalAcheivements.length > 250) {
            errors.WriteAboutYourGoalAcheivements = "Max 250 Characters allowed";
        } else if (formData.WriteAboutYourGoalAcheivements.length < 50) {
            errors.WriteAboutYourGoalAcheivements = "Min 50 Characters required";
        }
        
        if (!formData.TellUsAboutYourProjectHandling.trim()) {
            errors.TellUsAboutYourProjectHandling = "Above Field is required";
        } else if (formData.TellUsAboutYourProjectHandling.length > 250) {
            errors.TellUsAboutYourProjectHandling = "Max 250 Characters allowed";
        } else if (formData.TellUsAboutYourProjectHandling.length < 50) {
            errors.TellUsAboutYourProjectHandling = "Min 50 Characters required";
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    }

    return (
        <div className="appraisal-form">
            <h2>Fill Appraisal Form</h2>
            <form>
                {Object.keys(formData).map((key) => (
                    <div className="form-group" key={key}>
                        <label className='label'>{key.replace(/([A-Z])/g, ' $1')}</label>
                        <textarea name={key} value={formData[key as keyof typeof formData]} onChange={handleChange} />
                        {
                            formErrors[key] && (
                                <div className='error-text'>{formErrors[key]}</div>
                            )
                        }
                    </div>
                ))}
                {/* <button type="button" className='button' onClick={() => setShowModal(true)}>Save & Next</button> */}
                <button type="button" className='button' onClick={() => { if (handleValidations()) { handleNumFunc(num + 1) } }}>Save & Next</button>
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
