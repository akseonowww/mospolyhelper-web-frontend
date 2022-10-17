import { RestClient } from 'typed-rest-client/RestClient';
import SearchEntity from '../../../../domain/account/teachersSearch/model/SearchEntity';
import SearchResult from '../../../../domain/account/teachersSearch/model/SearchResult';
import Result from '../../../../utils/result';
import UnauthorizedAccessError from '../../../../utils/unauthorizedAccessError';
import AuthLocalDataSource from '../../auth/local/authLocalDataSource';

export default class ScheduleApi {
    private URL_BASE = 'https://mospolyhelper.herokuapp.com';
    private URL_MODULE = '/account';
    private URL_SEARCH = '/teachers';
    private session = new AuthLocalDataSource();

    async searchByQuery(query: string, page: number): Promise<Result<SearchResult>> {
        const rest = new RestClient(undefined, this.URL_BASE);
        console.log(this.session.getSessionId());
        let options = { additionalHeaders: { 'sessionId': this.session.getSessionId() } };
        try {
            const response = await rest.get<SearchResult>(
                `${this.URL_MODULE}${this.URL_SEARCH}?searchQuery=${query}&page=${page}`,
                options
            );
            return Result.success(response.result ?? new SearchResult(1, 1, Array<SearchEntity>()));
        }
        catch (err : any) {
            console.log(err);
            if (err['statusCode'] == 401) {
                return Result.failure(new UnauthorizedAccessError("Авторизируйтесь!"));
            } else return Result.failure(err);
        }
    }
    
}