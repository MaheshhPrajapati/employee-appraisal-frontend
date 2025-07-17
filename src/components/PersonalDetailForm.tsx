// src/components/PersonalDetailForm.tsx
import React, { useEffect, useState } from 'react';
import ReviewModal from './ReviewModal';
import './PersonalDetailForm.css';

interface PersonalDetailFormProps {
    handleNumFunc: (num: number) => void;
    num: number
}

interface User {
    empId: string,
    firstName: string,
    email: string,
    lastName: string,
    empUserName: string
}

interface ApiResponse {
    message: string,
    data: any
}

const PersonalDetailForm: React.FC<PersonalDetailFormProps> = ({ num, handleNumFunc }) => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Gender: '',
        DateOfBirth: '',
        MobileNumber: '',
        JoiningDate: '',
        AadharCard: '',
        FathersName: '',
        Address: '',
        EmployeeCode: '',
        EmployeeGrade: '',
        Designation: '',
    });


    const [user, setUser] = useState<User | null>(null);
    const [managerList, setManagerList] = useState<User[] | null>([]);


    useEffect(() => {
        // Replace with your actual API call logic
        const empId = localStorage.getItem("empId")
        fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/find-employee/${empId}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setFormData(prev => ({
                    ...prev,
                    FirstName: data.firstName || '',
                    Email: data.email || '',
                    LastName: data.lastName || '',
                    Gender: data.gender || '',
                    EmployeeCode: data.empUserName || '',
                    Address: `${data.addressList[0]?.street} ${data.addressList[0]?.city} ${data.addressList[0]?.state}` || '',
                    Designation: data.employeeType || '',
                    JoiningDate: data.employeeStartDate || '',
                    DateOfBirth: data.employeeDob || '',
                    MobileNumber: data.mobileno || '',
                }));
            })
            .catch(err => console.error('Error fetching user:', err));

        fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/find-all-manager`)
            .then(res => res.json())
            .then(data => setManagerList(data))
            .catch(err => console.error('Error fetching user:', err));
    }, []);

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function updateManger(value: any) {
        console.log(value);
        fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/update-employee-manager`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "empId": user?.empId,
                "managerUserName": value,
                "empUserName": user?.empUserName
            }),
        })
        .then(res => res.json())
        .then((res: ApiResponse) => alert(res.message));
    }

    function handleValidations() {
        const errors: { [key: string]: string } = {};
        if (!formData.FirstName.trim()) {
            errors.FirstName = "First name is required";
        }
        if (!formData.LastName.trim()) {
            errors.LastName = "Last name is required";
        }
        if (!formData.Gender.trim()) {
            errors.Gender = "Gender is required";
        }
        if (!formData.AadharCard.trim()) {
            errors.AadharCard = "Aadhar Card is required";
        } else if (!/^\d{12}$/.test(formData.AadharCard)) {
            errors.AadharCard = "Aadhar Card must be 12 digits";
        }

        if(!formData.MobileNumber.trim()){
            errors.MobileNumber = "Mobile Number is Required";
        } else if (!/^\d{10}$/.test(formData.MobileNumber)) {
            errors.MobileNumber = "Mobile Number must be of 10 digits"
        }

        if (!formData.Email.trim()) {
            errors.Email = "Email is required";
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.Email)) {
            errors.Email = "Invalid email format";
        }

        // if (!formData.FathersName.trim()) {
        //     errors.FathersName = "Father's Name is required";
        // }

        if (!formData.Address.trim()) {
            errors.Address = "Address is required";
        }

        if (!formData.EmployeeCode.trim()) {
            errors.EmployeeCode = "Employee Code is required";
        }

        if (!formData.Designation.trim()) {
            errors.Designation = "Employee Designation is required";
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
                    <label className='label'>Select Manager</label>
                <select
                    className='dropdown'
                    onChange={(e) => updateManger(e.target.value)}
                    value={formData.EmployeeCode}
                >
                    <option value="" disabled > Select Manager </option>
                    {managerList?.map(manager =>
                        <option key={manager.empId} value={manager.empUserName} label={`${manager.firstName} ${manager.lastName}`} />
                    )}
                    
                </select>

                <button type="button" className='button' onClick={() => { if (handleValidations()) { handleNumFunc(num + 1) } }}>Save & Next</button>
            </form>

        </div >
    );
};

export default PersonalDetailForm;
