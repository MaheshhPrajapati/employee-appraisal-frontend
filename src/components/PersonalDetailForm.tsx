// src/components/PersonalDetailForm.tsx
import React, { useState } from 'react';
import ReviewModal from './ReviewModal';
import './PersonalDetailForm.css';

interface PersonalDetailFormProps {
    handleNumFunc: (num: number) => void;
    num: number
  }

const PersonalDetailForm: React.FC<PersonalDetailFormProps> = ({num, handleNumFunc}) => {
    const [formData, setFormData] = useState({
        FullName: '',
        AadharCard: '',
        FathersName: '',
        Address: '',
        EmployeeCode: '',
        EmployeeGrade: '',
    });

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleValidations() {
        const errors: { [key: string]: string } = {};
        if (!formData.FullName.trim()) {
            errors.FullName = "Full name is required";
        }
        if (!formData.AadharCard.trim()) {
            errors.AadharCard = "Aadhar Card is required";
        } else if (!/^\d{12}$/.test(formData.AadharCard)) {
            errors.AadharCard = "Aadhar Card must be 12 digits";
        }

        if (!formData.FathersName.trim()) {
            errors.FathersName = "Father's Name is required";
        }

        if (!formData.Address.trim()) {
            errors.Address = "Address is required";
        }

        if (!formData.EmployeeCode.trim()) {
            errors.EmployeeCode = "Employee Code is required";
        }

        if (!formData.EmployeeGrade.trim()) {
            errors.EmployeeGrade = "Employee Grade is required";
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    }

    return (
        <div className="personal-details-form">
            <h2>Your Personal Details</h2>
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
                {/* <button type="button" className='button' onClick={() => setShowModal(true)}>Save & Next</button> */}
                <button type="button" className='button' onClick={() => { if (handleValidations()) { handleNumFunc(num + 1) } }}>Save & Next</button>
            </form>

            {/* {showModal && (
                <ReviewModal
                    data={formData}
                    onClose={() => setShowModal(false)}
                    onSubmit={() => {
                        console.log('Submit to backend:', formData);
                        setShowModal(false);
                    }}
                />
            )} */}
        </div>
    );
};

export default PersonalDetailForm;
