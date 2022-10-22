import { RestClient } from "typed-rest-client";

const BASE_URL = "https://mospolyhelper.herokuapp.com";
export const IMG_BASE_URL = "https://e.mospolytech.ru/old/";

const restClient = new RestClient(null, BASE_URL);
export default restClient;
