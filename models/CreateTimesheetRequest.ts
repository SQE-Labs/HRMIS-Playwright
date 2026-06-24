export interface CreateTimesheetRequest {
    date:        string;
    isSubmitted: string;
    entries:     Entry[];
}

export interface Entry {
    titleType:    string;
    projectId?:    number;
    titleName:    string;
    description:  string;
    duration:     number;
    taskStatus:   string;
    allocationId: null;
    workStream?:   string;
}