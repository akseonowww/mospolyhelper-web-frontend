import restClient from "@/data/client";
import AccountInfo from "@/domain/account/info/model/accountInfo";
import Result from "@/utils/result";
import UnauthorizedAccessError from "@/utils/unauthorizedAccessError";
import AuthLocalDataSource from "../../auth/local/authLocalDataSource";

export default class InfoApi {
    private URL_MODULE = '/account';
    private URL_INFO = '/info';
    private session = new AuthLocalDataSource();

    async getAccountInfo(): Promise<Result<AccountInfo>> {
        try {
            const path = this.URL_MODULE + this.URL_INFO;
            const options = { additionalHeaders: { sessionId: this.session.getSessionId() } };
            const response = await restClient.get<AccountInfo>(path, options);
            
            console.log("loaded", response.result);
            return Result.success(response.result ?? {});
        }
        catch (err : any) {
            if (err['statusCode'] == 401) {
                return Result.failure(new UnauthorizedAccessError("Авторизируйтесь!"));
            } else return Result.failure(err);
        }
    }
    
}