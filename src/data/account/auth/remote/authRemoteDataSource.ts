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
        } catch (e) {
            console.log(e);
            if (e['statusCode'] == 401) {
                return Result.failure(new UnauthorizedAccessError("���������������!"));
            } else return Result.failure(e);
        }
    }

    async updateSessionId(login: string, password: string, sessionId: string): Promise<Result<string>> {
        try {
            return Result.success(await this.api.logIn(login, password, sessionId) ?? '');
        } catch (e) {
            console.log(e);
            if (e['statusCode'] == 401) {
                return Result.failure(new UnauthorizedAccessError("���������������!"));
            } else return Result.failure(e);
        }
    }
}