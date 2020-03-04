import React from 'react';
import ReportCard from './ReportCard';

const ReportList = (props) => {

  console.log(props);

  const distributeCards = () => {
    let output;
    if(props.reportData.length > 0) { //if there are reports
      output = props.reportData.map((report, index) => {
        return(
          <ReportCard
            key={index}
            reportid={report.reportid}
            name={report.name}
            description={report.description}
            setReportData={props.setReportData}
            setView={props.setView}
          />
        );
      });
    } else {  //no reports to display
      output = (<h2>No reports to display</h2>);
    }

    return output;
  }

  return(
    <div className="content-container">
      <div className="report-card-container">
        { distributeCards() }
      </div>
    </div>
  );
}

export default ReportList;
