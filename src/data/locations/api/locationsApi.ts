import restClient from "@/data/client";
import Locations from "@/domain/locations/model/Locations";
import Result from "@/utils/result";

export default class LocationsApi {
    private URL_MODULE = "/map";
    private URL_MAP = "/map";

    async getLocations(): Promise<Result<Locations>> {
        try {
            const path = this.URL_MODULE + this.URL_MAP;
            const response = await restClient.get<Locations>(path);

            console.log("loaded", response.result);
            return Result.success(response.result ?? {});
        } catch (err : any) {
            console.log("an error occurred during locations request");
            return Result.failure(err);
        }
    }
}
