import { RestClient } from 'typed-rest-client/RestClient';
import Marks from '../../../../domain/account/marks/model/marks';
import Result from '../../../../utils/result';
import UnauthorizedAccessError from '../../../../utils/unauthorizedAccessError';
import AuthLocalDataSource from '../../auth/local/authLocalDataSource';

export default class ScheduleApi {
    private URL_BASE = 'https://mospolyhelper.herokuapp.com';
    private URL_MODULE = '/account';
    private URL_SEARCH = '/marks';
    private session = new AuthLocalDataSource();

    async searchByQuery(): Promise<Result<Marks>> {
        const rest = new RestClient(undefined, this.URL_BASE);
        console.log(this.session.getSessionId(), `${this.URL_MODULE}${this.URL_SEARCH}`);
        let options = { additionalHeaders: { 'sessionId': this.session.getSessionId() } };
        try {
            const response = await rest.get<Marks>(
                `${this.URL_MODULE}${this.URL_SEARCH}`,
                options
            );
            console.log("loaded", response.result);
            return Result.success(response.result ?? <Marks>{ marks: new Map() });
        }
        catch (err : any) {
            console.log('неУспех');
            if (err['statusCode'] == 401) {
                return Result.failure(new UnauthorizedAccessError("Авторизируйтесь!"));
            } else return Result.failure(err);
        }
    }
    
}