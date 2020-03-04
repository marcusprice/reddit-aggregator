import React, { useState } from 'react';
import NavBar from './dashboard-components/NavBar';
import DashboardHeader from './dashboard-components/DashboardHeader'
import ReportList from './dashboard-components/ReportList';
import AccountSettings from './dashboard-components/AccountSettings';
import CreateReport from './dashboard-components/CreateReport';
import EditReport from './dashboard-components/EditReport';

const Dashboard = (props) => {
  let [view, setView] = useState('report list');

  const handleView = () => {
    let output;
    switch(view) {
      case 'account settings':
        output = <AccountSettings setUserData={props.setUserData} userData={props.userData} />;
        break;
      case 'create report':
        output = <CreateReport setReportData={props.setReportData} setView={setView} />;
        break;
      case 'edit report':
        output = <EditReport setReportData={props.setReportData} setView={setView} />;
        break;
      default:
        output = <ReportList reportData={props.reportData} setReportData={props.setReportData} setView={setView} />;
        break;
    }

    return output;
  }

  return(
    <div>
      <NavBar
        setView={setView}
        setUserLoggedIn={props.setUserLoggedIn}
        setUserData={props.setUserData}
        setReportData={props.setReportData}
      />
      <DashboardHeader
        view={view}
        setView={setView}
        numOfReports={props.reportData.length}
        firstName={props.userData.firstname}
      />
      { handleView() }
    </div>
  );
}

export default Dashboard;
