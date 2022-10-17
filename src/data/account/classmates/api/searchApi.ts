import { RestClient } from 'typed-rest-client/RestClient';
import SearchEntity from '../../../../domain/account/teachersSearch/model/SearchEntity';
import SearchResult from '../../../../domain/account/teachersSearch/model/SearchResult';
import Result from '../../../../utils/result';
import UnauthorizedAccessError from '../../../../utils/unauthorizedAccessError';
import AuthLocalDataSource from '../../auth/local/authLocalDataSource';

export default class ScheduleApi {
    private URL_BASE = 'https://mospolyhelper.herokuapp.com';
    private URL_MODULE = '/account';
    private URL_SEARCH = '/classmates';
    private session = new AuthLocalDataSource();

    async searchByQuery(): Promise<Result<Array<SearchEntity>>> {
        const rest = new RestClient(undefined, this.URL_BASE);
        console.log(this.session.getSessionId());
        let options = { additionalHeaders: { 'sessionId': this.session.getSessionId() } };
        try {
            const response = await rest.get<Array<SearchEntity>>(
                `${this.URL_MODULE}${this.URL_SEARCH}`,
                options
            );
            return Result.success(response.result ?? Array<SearchEntity>());
        }
        catch (err : any) {
            if (err['status'] == 401) {
                return Result.failure(new UnauthorizedAccessError("Авторизируйтесь!"));
            } else return Result.failure(err);
        }
    }
    
}