
export default class DashboardRemote {

    baseUrl = "http://127.0.0.1:5000";
   
    checkFileExistUrl(filename) {
        let url = `${this.baseUrl}/checkfileexist?filename=${filename}`;
        console.log(`checkFileExistUrl==${url}`);
        return url;
    }

    distributionReportUrl(filename) {
        let url = `${this.baseUrl}/distribution_reports?filename=${filename}`;
        console.log(`distribution_reports url==${url}`);
        return url;
    }

    oneDistributionReportUrl(filename, col) {
        let url = `${this.baseUrl}/distribution_report?filename=${filename}&col=${col}`;
        console.log(`distribution_reports url==${url}`);
        return url;
    }

    staticFileUrl(filename) {
        let url = `${this.baseUrl}/static/${filename}.png`;
        console.log(`staticFileUrl url==${url}`);
        return url;
    }
     
    uploadUrl() {
        let url = `${this.baseUrl}/uploadfile`;
        console.log(`uploadUrl==${url}`);
        return url;
    }
    testUrl(filename) {
        let url = `${this.baseUrl}/test?filename=${filename}`;
        console.log(`testUrl==${url}`);
        return url;
    }
 
}
