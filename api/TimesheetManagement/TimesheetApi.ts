import { request, expect } from "@playwright/test";
import { UserTokenApi } from "../UserTokenApi";
import { TimesheetBuilder } from "../../Builders/TimesheetBuilder";
import testData from "../../testData/testData.json";
import { getBaseUrl } from "../../utils/baseUrl";
import { ApiEndpoints } from "../apiEndpoints";


export class TimesheetApi{
    public static async submit(){
        let token = await UserTokenApi.get(testData.Employee.UserEmail);
        let requestContext = await request.newContext(
            {
                baseURL : getBaseUrl(),
                extraHTTPHeaders : {
                    "Authorization" : `Bearer ${token}`
                }
            }
        );
        let response =  await requestContext.post(ApiEndpoints.createTimesheet, {
            data : TimesheetBuilder.create()
        });
        expect(response.status()).toBe(200);
        console.log("Timesheet submitted successfully!");
    }
}