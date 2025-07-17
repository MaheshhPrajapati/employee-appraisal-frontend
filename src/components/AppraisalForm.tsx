// src/components/AppraisalForm.tsx
import React, { useEffect, useState } from 'react';
import ReviewModal from './ReviewModal';
import './AppraisalForm.css';
import CertificateModal from './CertificateModal';
import GoalForm from './GoalForm';

interface PersonalDetailFormProps {
    handleNumFunc: (num: number) => void;
    num: number
}



const AppraisalForm: React.FC<PersonalDetailFormProps> = ({ num, handleNumFunc }) => {
    const [formData, setFormData] = useState({
        employeeStartDate: "",
        employeeSubType: "",
        certificateType: ""
    });

    const [appraisalData, setAppraisalData] = useState<any[]>([{ appraisalGoal: "" }]);

    const [appraisalFormData, setAppraisalFormData] = useState<any[]>([]);

    function handleAppraisalDataDelete(idx: any) {
        setAppraisalData(prev => prev.filter((_, i) => i !== idx));
    }

    function handleAppraisalDataChange(index: number, newValue: string) {
        setAppraisalData((prev) => {
            const updated = [...prev];
            updated[index] = { appraisalGoal: newValue };
            return updated;
        });
    };


    const [certificationsLists, setCertificationsLists] = useState([
        {
            "certification": "IBM Certified System Administrator - z/OS V2.4",
            "udemy_link": "https://www.udemy.com/course/mainframe-zos-fundamentals/"
        },
        {
            "certification": "IBM Certified Application Developer - Mainframe using COBOL",
            "udemy_link": "https://www.udemy.com/course/cobol-programming-on-mainframe-developer-guide/"
        },
        {
            "certification": "Certified Mainframe Professional (CMP)",
            "udemy_link": "https://www.udemy.com/course/learn-mainframe-fundamentals-beginners-guide/"
        },
        {
            "certification": "AWS Certified Cloud Practitioner",
            "udemy_link": "https://www.udemy.com/course/aws-certified-cloud-practitioner-exam-training-course/"
        },
        {
            "certification": "Microsoft Certified: Azure Fundamentals",
            "udemy_link": "https://www.udemy.com/course/microsoft-azure-fundamentals-az-900-complete-course/"
        }
    ]);

    useEffect(() => {
        const empId = localStorage.getItem("empId");
        fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/find-employee/${empId}`)
            .then(res => res.json())
            .then(data => {
                setFormData(prev => ({
                    ...prev,
                    employeeSubType: data.employeeType || '',
                    employeeStartDate: data.employeeStartDate || '',
                }));
            })
            .catch(err => console.error('Error fetching user:', err));

        const empUserName = localStorage.getItem("empUserName");
        fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/list-employee-appraisal-form?empUserName=${empUserName}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => setAppraisalFormData(res))
            .catch(err => alert(err))
    }, [])

    const domainList = [
        "Technology",
        "Cloud",
        "Programming Language",
        "Data & Analytics",
        "Cybersecurity"
    ]

    const techStackList = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Mobile App Developer",
        "DevOps Engineer",
        "Data Engineer",
        "Machine Learning Engineer",
        "Cloud Engineer",
        "Mainframe Developer",
        "Database Administrator"
    ]

    const [showModal, setShowModal] = useState(false);
    const [showCertificateModal, setShowCertificateModal] = useState(false);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleAISubmit(e: any) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/fetch-certificate-details`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(res => setCertificationsLists(res.data))
            .then(res => setShowCertificateModal(true))
            .catch(err => alert(`Error While Calling AI ${err?.message}`))
    }

    function handleAddAppraisalData(e: any, data: any) {
        e.preventDefault();
        setAppraisalData(prev => [...prev, data]);
    }

    function handleAppraisalDataSubmit(e: any) {
        e.preventDefault();
        const empUN = localStorage.getItem("empUserName");
        const formData = { empUserName: empUN, listGoal: appraisalData }
        fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/add-appraisal-form`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(res => alert(res.message + " for Finanacial year " + res.financialYear))
    }

    function handleValidations() {
        const errors: { [key: string]: string } = {};
        if (!formData.employeeStartDate.trim()) {
            errors.employeeStartDate = "Above Field is required";
        }
        if (!formData.employeeSubType.trim()) {
            errors.employeeSubType = "Above Field is required";
        }
        if (!formData.certificateType.trim()) {
            errors.certificateType = "Above Field is required";
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    }

    return (
        <div className="appraisal-form">
            <h2>Goal Setting</h2>
            <form>
                <label className='label'>Joining Date</label>
                <input type='text' readOnly value={formData.employeeStartDate} />

                <br />
                <br />
                <label className='label'>Designation</label>

                <select
                    className='dropdown'
                    onChange={handleChange}
                    name="employeeSubType"
                    value={formData.employeeSubType}
                    required
                >

                    <option label="Select Technology" />

                    {techStackList.map((item, idx) => <option value={item} label={item} key={idx} />)}
                </select>
                <br />
                <br />
                <label className='label'>Certification Type</label>

                <select
                    className='dropdown'
                    onChange={handleChange}
                    name="certificateType"
                    value={formData.certificateType}
                    required
                >
                    <option label="Select Domain" />

                    {domainList.map((item, idx) => <option value={item} label={item} key={idx} />)}
                </select>

                {/* {Object.keys(formData).map((key) => (
                    <div className="form-group" key={key}>
                        <label className='label'>{key.replace(/([A-Z])/g, ' $1')}</label>
                        <textarea name={key} value={formData[key as keyof typeof formData]} onChange={handleChange} />
                        {
                            formErrors[key] && (
                                <div className='error-text'>{formErrors[key]}</div>
                            )
                        }
                    </div>
                ))} */}
                {/* <button type="button" className='button' onClick={() => setShowModal(true)}>Save & Next</button> */}
                <button type="submit" className='button' onClick={(e) => handleAISubmit(e)}>Get Recommendations</button>
                <GoalForm data={appraisalData} handleAdd={handleAddAppraisalData} handleDelete={handleAppraisalDataDelete} handleInputChange={handleAppraisalDataChange} />
                <button className="submit-button" onClick={(e) => handleAppraisalDataSubmit(e)}>Submit Appraisal Data</button>
                <button className="add-button" onClick={(e) => handleAddAppraisalData(e, "")}>+Add New Point</button>
                <button type="button" className='button' onClick={() => handleNumFunc(num + 1)}>Next</button>
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

            {showCertificateModal && (
                <CertificateModal
                    data={certificationsLists}
                    onClose={() => setShowCertificateModal(false)} />
            )}
        </div>
    );
};

export default AppraisalForm;
