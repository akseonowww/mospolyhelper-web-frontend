import restClient from "@/data/client";
import Application from "@/domain/account/applications/model/application";
import Result from "@/utils/result";
import UnauthorizedAccessError from "@/utils/unauthorizedAccessError";
import AuthLocalDataSource from "../../auth/local/authLocalDataSource";

export default class ApplicationsApi {
    private URL_MODULE = '/account';
    private URL_INFO = '/applications';
    private session = new AuthLocalDataSource();

    async getApplications(): Promise<Result<Application[]>> {
        try {
            const path = this.URL_MODULE + this.URL_INFO;
            const options = { additionalHeaders: { sessionId: this.session.getSessionId() } };
            const response = await restClient.get<Application[]>(path, options);
            
            console.log("loaded", response.result);
            return Result.success(response.result ?? []);
        }
        catch (err : any) {
            if (err['statusCode'] == 401) {
                return Result.failure(new UnauthorizedAccessError("Авторизируйтесь!"));
            } else return Result.failure(err);
        }
    }
    
}