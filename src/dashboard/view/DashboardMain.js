import React from 'react';
import { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import DashboardRemote from '../model/DashboardRemote';
import useUploadSingleFile from '../custom_hook/useUploadSingleFile'; 

function DashboardMain(props) {
    const [uploadFileStatus, uploadFileName, setUploadFile] = useUploadSingleFile();
    const [checkFileStatus, setCheckFileStatus] = useState();
    
    const [distributionReportState, setDistributionReportState] = useState([]);
    const [distributionReportList, setDistributionReportList] = useState([]);
     
    const uploadFileRef = React.createRef();  
    const dashboardRemote = new DashboardRemote();
     
      
    useEffect(async ()=>{

        if (uploadFileStatus.status == true) {
 
            try {
                const res = await fetch(dashboardRemote.checkFileExistUrl(uploadFileName));
                const data = await res.json();
                setCheckFileStatus(data);
                console.log('checkFileExist==', checkFileStatus);
            }
            catch (err) {
                console.log(JSON.stringify(err));
                setCheckFileStatus({'status':false, msg: err.toString()});
            }
        }
  

    }, [ uploadFileStatus ]);


    useEffect(async ()=>{

        if (checkFileStatus && checkFileStatus.status == true) {

            try {
                const res = await fetch(dashboardRemote.distributionReportUrl(uploadFileName));
                const data = await res.json();
                setDistributionReportState(data);
                //setDistributionReportList([]);
                console.log('distributionReportState==', distributionReportState);
            }
            catch (err) {
                console.log(JSON.stringify(err));
                setDistributionReportState({'status':false, msg: err.toString()});
            }
        }
           
    }, [ checkFileStatus ]);

    useEffect(async ()=>{

        console.log('debug DistributionReportList...10...');

        if (distributionReportState && distributionReportState.status == true) {

            console.log('debug DistributionReportList...20...');
             

            try {
                distributionReportState?.report_list?.forEach(async report_name => {  
                    
                    let url = dashboardRemote.oneDistributionReportUrl(uploadFileName, report_name);
                    console.log('debug DistributionReportList...30...', url);

                    const res = await fetch( url );
                    console.log('debug DistributionReportList...40...');

                    const data = await res.json();
                    console.log('debug DistributionReportList...50...');

                    let temp_list = distributionReportList;
                    temp_list.push(data.report_filename);
                    setDistributionReportList([...distributionReportList, data.report_filename]);
                    
                    console.log('data.report_filename==', data.report_filename);
                    
                });

                 
            }
            catch (err) {
                console.log(JSON.stringify(err));
                 
            }
        }

    }, [ distributionReportState ]);

     
    

    async function handleUploadFile(e) {
        //const files = e.target.files;
        const files = uploadFileRef.current.files;
        console.log(files);
        if (files.length > 0) {
            console.log('files[0]==', files[0]);
            setUploadFile(files[0]); 
        }  
    }

    // onChange={(e) => handleUploadFile(e.target.files)}
                

    function getImageFullUrl(filename) {
        return dashboardRemote.staticFileUrl(filename);
    }

    /*
    <span>
        [ { JSON.stringify(distributionReportList) } ]
    </span>
    {distributionReportList.map(report_filename =>
                        <div key={report_filename}> 
                            { getImageFullUrl(report_filename) } 
                        </div>
                    )}

    <div className='report-thumbnail-container'>
                      
        [ { JSON.stringify(distributionReportList) } ]
                        
    </div>
                    */

  return (
    <div> 
         
        <div>

            <div className="file-upload">
                <span className="area">
                <span className="active">Upload</span>
                </span>
                <input ref={uploadFileRef} 
                    type="file"
                    aria-label="file upload"
                    name="raw csv" />
 
                <button onClick={ handleUploadFile }>Analyze</button>
                 
                <div>
                    uploadFileStatus: [ { JSON.stringify(uploadFileStatus) } ]
                    <br/>
                    uploadFileName : [ { uploadFileName } ]
                </div>

                <div>
                checkFileStatus: [ { JSON.stringify(checkFileStatus) } ]
                </div>
                  
                <div>
                    distributionReportState: 
                    
                    [ { JSON.stringify(distributionReportState) } ]
                </div>


                <div>distributionReportList: </div>
                 

                <div className='report-thumbnail-container'>
                      
                    {distributionReportList.map(report_filename =>
                        <img key={ report_filename } className='report-thumbnail' src = {getImageFullUrl(report_filename)} />
                         
                    )}
                        
                </div>

                 


                 
            </div>

        </div>

    </div>
    );
}

export default DashboardMain;