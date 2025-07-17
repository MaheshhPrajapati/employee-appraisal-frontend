import { useEffect, useState } from "react"

interface IGoal {
    appraisalGoal: string;
    goalDescription: string;
    goalRating: string;
    goalId: number;
    managerRating: number;
}

interface IAppraisalData {
    empUserName: string;
    financialYear: string;
    employeeSubmit: boolean;
    managerReivew: boolean;
    listGoal: IGoal[];
    empId: any;
    appraisalgrade: any;
    employeeIncome: number;
    preIncome: number;
}

interface IFormData {
    [key: string]: IAppraisalData;
    listGoal: any
}

export default function ManagerReview() {
    const [formData, setFormData] = useState<IFormData>({} as IFormData);

    useEffect(() => {
        const empUserName = localStorage.getItem("selectedEmployeeUserName");
        fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/list-employee-appraisal-form?empUserName=${empUserName}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => { setFormData(data); })
            .catch(err => alert(err))
    }, [])

    function handleAppraisalDataChange(val: any, key: string, idx: number, field: keyof IGoal) {
        setFormData((prev) => {
            const updatedGoals = [...prev[key].listGoal];
            updatedGoals[idx] = {
                ...updatedGoals[idx],
                [field]: val
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

    function handleAppraisalDataSubmit() {
        const empUserName = localStorage.getItem("empUserName");
        formData[0].managerReivew = false;
        formData[0].empId = Number(localStorage.getItem("selectedEmpId"));
        fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/update-manager-rating`, {
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

    function handleAppraisalDataSubmitFinal() {
        const empId = localStorage.getItem("selectedEmpId");
        let empIncome = 50000;
        fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/find-employee/${empId}`)
            .then(res => res.json())
            .then(data => { empIncome = data.employeeIncome })
            .catch(err => console.error('Error fetching user:', err));

        const empUserName = localStorage.getItem("empUserName");
        formData[0].empId = Number(localStorage.getItem("selectedEmpId"));
        formData[0].managerReivew = true;
        formData[0].preIncome = empIncome;
        formData[0].appraisalgrade = localStorage.getItem("Grade");
        let allowSubmit = prompt("After Submit you wont be able to change data y/n");
        if (allowSubmit == "y") {
            fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/update-manager-rating`, {
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

    function handleAICall() {
        fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/calculate-appraisal-grade`, {
            method: "POST",
            body: JSON.stringify({ listGoal: formData[0].listGoal }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => { alert("Employee Grade is " + res.appraisalGrade); localStorage.setItem("Grade", res.appraisalGrade) })
            .catch(err => alert(err))
    }


    return <div>

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
                                <input value={goal?.goalDescription} disabled onChange={(e) => handleAppraisalDataChange(e, key, idx, "goalDescription")} />
                                <label className='label'>Goal Rating</label>
                                <input value={goal?.goalRating} disabled onChange={(e) => handleAppraisalDataChange(e, key, idx, "goalRating")} />
                                <label className='label'>Manager Rating</label>
                                <input value={goal?.managerRating} type="number" onChange={(e) => handleAppraisalDataChange(Number(e.target.value), key, idx, "managerRating")} />

                            </div>
                        ))}

                    </div>
                ))}
                <button type="button" className='button' onClick={handleAppraisalDataSubmit}>Save as Draft(Step 1)</button>
                <button type="button" className='button' onClick={handleAICall}>AI Call(Step 2)</button>
                <button type="button" className='button' onClick={handleAppraisalDataSubmitFinal}>Submit Data(Step 3)</button>
                {/* <button type="button" className='button' onClick={() => { if (validateForm()) { setShowModal(true) } }}>Save & Next</button> */}
            </form>
        </div>

    </div>
}