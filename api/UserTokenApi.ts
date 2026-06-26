import { request } from "@playwright/test";
import testData from "../testData/testData.json";
import { getBaseUrl } from "../utils/baseUrl";
import { ApiEndpoints } from "./apiEndpoints";

export class UserTokenApi{
    public static async get(userEmail: string): Promise<string>{
        const baseURL = getBaseUrl();

        let context = await request.newContext({
            baseURL,
        });
        let response = await context.post(ApiEndpoints.signIn, {
            data: {
                email : userEmail,
                password : testData.SuperUser.UserPassword
            }
        });
        return (await response.json()).accessToken;
    }
}