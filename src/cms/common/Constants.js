
export default class Constants {

    getCurrentUserId() {
        return 1;
    }

    baseUrl = "https://localhost:8080/api";
     
    getSubjectsUrl() {
        let url = `${this.baseUrl}/subjects/${this.getCurrentUserId()}`;
        console.log(`getSubjectsUrl==${url}`);
        return url;
    }

    saveSubjectUrl() {
        let url = `${this.baseUrl}/subjects`;
        console.log(`saveSubjectsUrl==${url}`);
        return url;
    }

}