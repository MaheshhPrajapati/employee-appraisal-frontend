// src/pages/DashboardPage.tsx
import { useEffect, useState } from 'react';
import './DashboardPage.css';
import { useNavigate } from 'react-router-dom';
import Globe from './Globe';

interface User {
  firstName: string;
  email: string;
  empUserName: string;
  lastName: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const [user, setUser] = useState<User | null>(null);
  const [employees, setEmployees] = useState<User[]>([]);
  const [dropDown, setDropDown] = useState<any[]>([]);
  const [selectedDropDown, setSelectedDropDown] = useState<any>({});


  function handleOpenEmployee(empUserName: string, empId: number) {
    fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/list-employee-appraisal-form?empUserName=${empUserName}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => { if (data.length) { localStorage.setItem("selectedEmployeeUserName", empUserName); localStorage.setItem("selectedEmpId", String(empId)); navigate('/backend/managerReview') } else { alert("No Data Found") } })
      .catch(err => alert(err))
  }

  function downloadAppraisalPDF() {
    const formData = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      effectiveDate: selectedDropDown?.effectiveDate,
      financialYear: selectedDropDown?.financialYear,
      grade: selectedDropDown?.appraisalgrade,
      amount: selectedDropDown?.employeeIncome
    }
    fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/generate-letter`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        // Create a URL for the PDF blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element and simulate click to download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'GeneratedLetter.pdf';  // <-- Choose your filename
        document.body.appendChild(a);
        a.click();

        // Clean up
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error while downloading PDF:', error);
      });
  }

  useEffect(() => {
    // Replace with your actual API call logic
    const empId = localStorage.getItem("empId");
    const userRole = localStorage.getItem("userRole");
    const empUserName = localStorage.getItem("empUserName");
    fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/find-employee/${empId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => { console.error('Error fetching user:', err); alert("No data Found") });

    if (userRole == "Manager") {
      //@ts-ignore
      fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/find-all-employee?managerUserName=${empUserName}`)
        .then(res => res.json())
        .then(data => setEmployees(data))
        .catch(err => console.error('Error fetching user:', err));
    }
    if (userRole == "Employee") {
      fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/list-employee-appraisal-form?empUserName=${empUserName}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => setDropDown(data))
        .catch(err => alert(err))
    }
  }, []);
  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <span className="dashboard-title">Employee Appraisal System</span>
        <span className="dashboard-user">Welcome, {user?.firstName || 'Loading...'}</span>
        <button className='button logout' onClick={() => {navigate('/account/login'); localStorage.clear();}}>Logout</button>

      </nav>

      {userRole == "Employee" && dropDown?.length && <select className='dropDown' onChange={(e) => {
        const selectedYear = e.target.value;
        const selectedItem = dropDown.find(item => item?.financialYear === selectedYear);
        setSelectedDropDown(selectedItem);
      }}>
        <option disabled selected value="">Select Financial Year</option>
        {dropDown.map((item, idx) => <option key={idx} label={item?.financialYear} value={item?.financialYear}></option>)}
      </select>}
      {userRole == "Employee" && dropDown?.length && <button className="appraisal-button-left" onClick={() => downloadAppraisalPDF()}>Download Appraisal</button>}
      {userRole == "Employee" && <button className="appraisal-button" onClick={() => { navigate('/backend/employeeDashboard') }}>+ Fill Appraisal Form</button>}

      <div className="dashboard-content">
        <h2 className="dashboard-heading">Dashboard</h2>
        <div className="dashboard-user-info">
          <h3>User Info:</h3>
          <p>Email: {user?.email}</p>
        </div>

        {userRole == "Manager" &&
          <table border={1}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>User Name</th>
                <th>Mobile Number</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {employees.length && employees.map((user: any, idx: number) =>
                <tr key={idx}>
                  <td>{user.firstName + " " + user.lastName}</td>
                  <td>{user.empUserName}</td>
                  <td>{user.mobileno}</td>
                  <td><button className='button' onClick={() => handleOpenEmployee(user.empUserName, user.empId)}>Select</button></td>
                </tr>

              )}</tbody>
          </table>
        }
        {userRole == "Employee" && <Globe />}
      </div>
    </div>
  );
};

export default DashboardPage;
