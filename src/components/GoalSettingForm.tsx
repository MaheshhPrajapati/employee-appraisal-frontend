// src/components/PersonalDetailForm.tsx
import React, { useEffect, useState } from 'react';
import ReviewModal from './ReviewModal';
import './GoalSettingForm.css';

interface PersonalDetailFormProps {
    // handleNumFunc: (num: number) => void;
    // num: number
}
interface IGoal {
    appraisalGoal: string;
    goalDescription: string;
    goalRating: string;
    goalId: number;
}

interface IAppraisalData {
    empUserName: string;
    financialYear: string;
    employeeSubmit: boolean;
    listGoal: IGoal[]
}

interface IFormData {
    [key: string]: IAppraisalData;
    listGoal: any
}

const GoalSettingForm: React.FC<PersonalDetailFormProps> = () => {
    const [formData, setFormData] = useState<IFormData>({} as IFormData);
    useEffect(() => {
        const empUserName = localStorage.getItem("empUserName");
        fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/list-employee-appraisal-form?empUserName=${empUserName}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => setFormData(res))
            .catch(err => alert(err))
    }, [])

    function handleAppraisalDataSubmit() {
        const empUserName = localStorage.getItem("empUserName");
            fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/update-appraisal-form`, {
                method: "POST",
                body: JSON.stringify(formData[0]),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(res => res.json())
            .then(res => alert(res.message + " for " + res.financialYear))
            .catch(err => alert(err))
        
    }

    function validateForm() {
        const errors: { [key: string]: string } = {};

        // if (!formData.TellUsYourAppraisalExpectations.trim()) {
        //     errors.TellUsYourAppraisalExpectations = "Above Field is required";
        // } else if (formData.TellUsYourAppraisalExpectations.length > 250) {
        //     errors.TellUsYourAppraisalExpectations = "Max 250 Characters allowed";
        // } else if (formData.TellUsYourAppraisalExpectations.length < 50) {
        //     errors.TellUsYourAppraisalExpectations = "Min 50 Characters required";
        // }

        // if (!formData.TellUsAboutYourNextYearPerformanceGoals.trim()) {
        //     errors.TellUsAboutYourNextYearPerformanceGoals = "Above Field is required";
        // } else if (formData.TellUsAboutYourNextYearPerformanceGoals.length > 250) {
        //     errors.TellUsAboutYourNextYearPerformanceGoals = "Max 250 Characters allowed";
        // } else if (formData.TellUsAboutYourNextYearPerformanceGoals.length < 50) {
        //     errors.TellUsAboutYourNextYearPerformanceGoals = "Min 50 Characters required";
        // }

        // if (!formData.TellUsAboutYourNextYearCertificationGoals.trim()) {
        //     errors.TellUsAboutYourNextYearCertificationGoals = "Above Field is required";
        // } else if (formData.TellUsAboutYourNextYearCertificationGoals.length > 250) {
        //     errors.TellUsAboutYourNextYearCertificationGoals = "Max 250 Characters allowed";
        // } else if (formData.TellUsAboutYourNextYearCertificationGoals.length < 50) {
        //     errors.TellUsAboutYourNextYearCertificationGoals = "Min 50 Characters required";
        // }

        // if (!formData.TellUsAboutYourTeamLeadingGoals.trim()) {
        //     errors.TellUsAboutYourTeamLeadingGoals = "Above Field is required";
        // } else if (formData.TellUsAboutYourTeamLeadingGoals.length > 250) {
        //     errors.TellUsAboutYourTeamLeadingGoals = "Max 250 Characters allowed";
        // } else if (formData.TellUsAboutYourTeamLeadingGoals.length < 50) {
        //     errors.TellUsAboutYourTeamLeadingGoals = "Min 50 Characters required";
        // }

        // if (!formData.TellUsAboutYourFutureResponsibiltyGoals.trim()) {
        //     errors.TellUsAboutYourFutureResponsibiltyGoals = "Above Field is required";
        // } else if (formData.TellUsAboutYourFutureResponsibiltyGoals.length > 250) {
        //     errors.TellUsAboutYourFutureResponsibiltyGoals = "Max 250 Characters allowed";
        // } else if (formData.TellUsAboutYourFutureResponsibiltyGoals.length < 50) {
        //     errors.TellUsAboutYourFutureResponsibiltyGoals = "Min 50 Characters required";
        // }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    }

    function handleAppraisalDataChange(e: any, key: string, idx: number, field: keyof IGoal) {
        setFormData((prev) => {
            const updatedGoals = [...prev[key].listGoal];
            updatedGoals[idx] = {
                ...updatedGoals[idx],
                [field]: e.target.value
            };
            return {
                ...prev,
                [key]: {
                    ...prev[key],
                    listGoal: updatedGoals
                }
            };
        });
    }

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, goalId: number) {
        const file = e.target.files?.[0];
        if(file){
            const fileAppend = new FormData();
            fileAppend.append("file", file);
            fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/file-upload/${goalId}`, {
                method: "POST",
                body: fileAppend,
            })
            .then(res => res.json())
            .then(res => alert(res.message))
            .catch(err => alert(err))
        }
    }

    function handleAppraisalDataSubmitFinal() {
        const empUserName = localStorage.getItem("empUserName");
        formData[0].employeeSubmit = true;
        let allowSubmit = prompt("After Submit you wont be able to change data y/n");
        if (allowSubmit == "y") {
            fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/update-appraisal-form`, {
                method: "POST",
                body: JSON.stringify(formData[0]),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(res => res.json())
            .then(res => alert(res.message + " for " + res.financialYear))
            .catch(err => alert(err))
        }
    }

    return (
        <div className="goal-setting-form">
            <h2>Appraisal Form</h2>
            <form>
                {Object.keys(formData).map((key) => (
                    <div className="form-group" key={key}>
                        {/* <label className='label'>{key.replace(/([A-Z])/g, ' $1')}</label>
                        <input className='inputTag' name={key} value={formData[key as keyof typeof formData]} onChange={handleChange} />
                        {
                            formErrors[key] && (
                                <div className='error-text'>{formErrors[key]}</div>
                            )
                        } */}
                        <label className='label'>Data for Financial Year {formData[key]?.financialYear}</label>
                        {formData[key]?.listGoal?.map((goal, idx) => (
                            <div key={idx}>
                                <h4>Goal {idx + 1}</h4>
                                <label className='label'>Appraisal Goal</label>
                                <input value={goal?.appraisalGoal} disabled onChange={(e) => handleAppraisalDataChange(e, key, idx, "appraisalGoal")} />
                                <label className='label'>Goal Desciption</label>
                                <input value={goal?.goalDescription} onChange={(e) => handleAppraisalDataChange(e, key, idx, "goalDescription")} />
                                <label className='label'>Goal Rating</label>
                                <input value={goal?.goalRating} onChange={(e) => handleAppraisalDataChange(e, key, idx, "goalRating")} />
                                <label className='label'>Upload Certificate (optional)</label>
                                <input type='file' onChange={(e) => handleFileChange(e, goal?.goalId)} />
                            </div>
                        ))}

                    </div>
                ))}
                <button type="button" className='button' onClick={handleAppraisalDataSubmit}>Save as Draft</button>
                <button type="button" className='button' onClick={handleAppraisalDataSubmitFinal}>Submit Data</button>
                {/* <button type="button" className='button' onClick={() => { if (validateForm()) { setShowModal(true) } }}>Save & Next</button> */}
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

export default GoalSettingForm;
