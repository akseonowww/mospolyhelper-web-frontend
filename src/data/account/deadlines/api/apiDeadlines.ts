import { RestClient } from 'typed-rest-client/RestClient';
import MyPortfolio from '../../../../domain/account/deadlines/model/myPortfolio';
import Result from '../../../../utils/result';
import UnauthorizedAccessError from '../../../../utils/unauthorizedAccessError';
import AuthLocalDataSource from '../../auth/local/authLocalDataSource';

export default class DealinesApi {
    private URL_BASE = 'https://mospolyhelper.herokuapp.com';
    private URL_MODULE = '/account';
    private URL_SCHEDULE = '/myportfolio';
    private session = new AuthLocalDataSource()

    public async sendMyPortfolio(
        otherInformation: string,
        isPublic: boolean = false
    ): Promise<Result<MyPortfolio>> {
        const rest = new RestClient(undefined, this.URL_BASE);
        let options = { additionalHeaders: { 'sessionId': this.session.getSessionId() } };
        try {
            const response = await rest.create<MyPortfolio>(
                `${this.URL_MODULE}${this.URL_SCHEDULE}`,
                {
                    otherInformation: otherInformation,
                    isPublic: isPublic
                },
                options
            );
            return Result.success(response.result ?? new MyPortfolio(""));
        } catch (err : any) {
            console.log(err);
            if (err['statusCode'] == 401) {
                return Result.failure(new UnauthorizedAccessError("Авторизируйтесь!"));
            } else return Result.failure(err);
        }
    }

    public async getMyPortfolio(): Promise<Result<MyPortfolio>> {
        const rest = new RestClient(undefined, this.URL_BASE);
        console.log(this.session.getSessionId());
        let options = { additionalHeaders: { 'sessionId': this.session.getSessionId() } };
        try {
            const response = await rest.get<MyPortfolio>(
                `${this.URL_MODULE}${this.URL_SCHEDULE}`,
                options
            );
            return Result.success(response.result ?? new MyPortfolio(""));
        }
        catch (err : any) {
            console.log(err);
            if (err['statusCode'] == 401) {
                return Result.failure(new UnauthorizedAccessError("Авторизируйтесь!"));
            } else return Result.failure(err);
        }
    }
}