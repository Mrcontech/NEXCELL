export type ActivityStatus = "success" | "failed" | "processing";

export interface Activity {
    id: string;
    user: string;
    type: string;
    status: ActivityStatus;
    createdAt: string;
    description: string;
}
