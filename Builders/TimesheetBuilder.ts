import {CreateTimesheetRequest} from '../models/CreateTimesheetRequest'
import { format } from 'date-fns';

export class TimesheetBuilder{
    static create(customDate? : Date, isSubmitted? : boolean) : CreateTimesheetRequest{
        return {
            date: format(customDate ? customDate : new Date(), "yyyy-MM-dd"),
            isSubmitted: isSubmitted ? "1" : "0",
            entries: [
                {
                    titleType: "PROJECT",
                    projectId: 974,
                    titleName: "internal-discussions",
                    description: "Playwright Learning",
                    duration: 60,
                    taskStatus: "COMPLETED",
                    allocationId: null,
                    workStream: "QA"
                },
                {
                    titleType: "PROJECT",
                    projectId: 975,
                    titleName: "internal-discussions",
                    description: "Playwright Learning",
                    duration: 60,
                    taskStatus: "COMPLETED",
                    allocationId: null,
                    workStream: "Dev"
                },
                {
                    titleType: "PROJECT",
                    projectId: 976,
                    titleName: "internal-discussions",
                    description: "Playwright Learning",
                    duration: 60,
                    taskStatus: "COMPLETED",
                    allocationId: null
                },
                {
                    titleType: "PROJECT",
                    projectId: 977,
                    titleName: "internal-discussions",
                    description: "Playwright Learning",
                    duration: 60,
                    taskStatus: "COMPLETED",
                    allocationId: null
                },
                {
                    titleType: "OTHERS",
                    //projectId: null,
                    titleName: "internal-discussions",
                    description: "Playwright Learning",
                    duration: 60,
                    taskStatus: "COMPLETED",
                    allocationId: null,
                }
        ]
        };
    }
}