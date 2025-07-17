import { useState } from "react";
import './GoalForm.css'
interface PersonalDetailFormProps {
    handleAdd: (e: any, data: any) => void;
    handleInputChange: (idx: number, value: string) => void;
    handleDelete: (idx: number) => void;
    data: any;
}

const GoalForm: React.FC<PersonalDetailFormProps> = ({ data, handleAdd, handleInputChange, handleDelete }) => {

    return <form>
        <h3>Add Appraisal Details</h3>
        {data.map((item: any, idx: any) =>
            <>
                <input className="input" placeholder="Mention your Goal" onChange={(e) => handleInputChange(idx, e.target.value)} value={item.appraisalGoal} key={idx} />
                <button className="delete-button" onClick={(e) => { e.preventDefault(); handleDelete(idx); }}>Delete</button>
            </>
        )}
    </form>

}

export default GoalForm;