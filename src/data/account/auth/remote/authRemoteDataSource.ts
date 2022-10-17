import Result from "../../../../utils/result";
import UnauthorizedAccessError from "../../../../utils/unauthorizedAccessError";
import AuthApi from "../api/authApi";

export default class AuthRemoteDataSource {
    constructor(
        public api: AuthApi
    ) { }

    async getSessionId(login: string, password: string): Promise<Result<string>> {
        try {
            return Result.success(await this.api.logIn(login, password) ?? '');
        } catch (e: any) {
            console.log(e);
            if (e['statusCode'] == 401) {
                return Result.failure(new UnauthorizedAccessError("Авторизируйтесь!"));
            } else return Result.failure(e);
        }
    }

    async updateSessionId(login: string, password: string, sessionId: string): Promise<Result<string>> {
        try {
            return Result.success(await this.api.logIn(login, password, sessionId) ?? '');
        } catch (e : any) {
            console.log(e);
            if (e['statusCode'] == 401) {
                return Result.failure(new UnauthorizedAccessError("Авторизируйтесь!"));
            } else return Result.failure(e);
        }
    }

    async checkPermissions(sessionId: string): Promise<Result<Array<string>>> {
        try {
            return Result.success(await this.api.permissionsCheck(sessionId));
        } catch (e : any) {
            console.log(e);
            if (e['statusCode'] == 401) {
                return Result.failure(new UnauthorizedAccessError("401"));
            } else return Result.failure(e);
        }
    }
}