import restClient from "@/data/client";
import DialogPreviewModel from "@/domain/account/dialogs/preview/model/dialogs";
import Result from "@/utils/result";
import UnauthorizedAccessError from "@/utils/unauthorizedAccessError";
import AuthLocalDataSource from "../../../auth/local/authLocalDataSource";

export default class DialogsApi {
    private URL_MODULE = "/account";
    private URL_DIALOGS = "/dialogs";
    private session = new AuthLocalDataSource();

    async getDialogs(): Promise<Result<DialogPreviewModel[]>> {
        try {
            const path = this.URL_MODULE + this.URL_DIALOGS;
            const options = { additionalHeaders: { sessionId: this.session.getSessionId() } };
            const response = await restClient.get<DialogPreviewModel[]>(path, options);

            console.log("loaded", response.result);
            return Result.success(response.result ?? []);
        } catch (err : any) {
            if (err["statusCode"] == 401) {
                return Result.failure(new UnauthorizedAccessError("Авторизируйтесь!"));
            } else return Result.failure(err);
        }
    }
}
