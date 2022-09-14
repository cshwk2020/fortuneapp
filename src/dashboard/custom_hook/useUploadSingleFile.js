import { useState, useEffect } from "react";
import DashboardRemote from '../model/DashboardRemote';

/*
  const [uploadFileStatus, setUploadFile] = useUploadSingleFile();
  input: setUploadFile(e.target.files[0]);
  output: uploadFileStatus format: {status, msg}
*/
const useUploadSingleFile = () => {

  const [uploadFile, setUploadFile] = useState(null);
  const [uploadFileStatus, setUploadFileStatus] = useState({'status':false, msg: ''});
  const dashboardRemote = new DashboardRemote();

  useEffect(async () => {

    if (uploadFile) {

      try {

        var formData = new FormData()
        formData.append('file', uploadFile);
  
        const res = await fetch(dashboardRemote.uploadUrl(), {
            method: 'POST',
            body: formData
          });
        
        const data = await res.json();
        console.log(data);
        setUploadFileStatus(data);
           
      }
      catch (err) {
          console.log('EXCEPTION...');
          setUploadFileStatus({'status':false, msg: err.toString()});
      }
    }
      
  }, [ uploadFile ]);
 
      
  return [uploadFileStatus, uploadFile ? uploadFile.name : '', setUploadFile];
};

export default useUploadSingleFile;