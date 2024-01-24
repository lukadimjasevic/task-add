export interface TaskRequest {
    deadlineDate: Date;
    description?: string;
    name: string;
    categoryIds?: number[];
}
