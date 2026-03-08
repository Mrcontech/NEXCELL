import { NextResponse } from "next/server";
import { Activity } from "@/lib/types";

// 10 sample activities
const mockActivities: Activity[] = [
    {
        id: "1",
        user: "agent_01",
        type: "lead_analysis",
        status: "success",
        createdAt: "2026-03-01T12:10:00Z",
        description: "Analysed lead from Zoopla listing #4821.",
    },
    {
        id: "2",
        user: "agent_02",
        type: "message_reply",
        status: "success",
        createdAt: "2026-03-02T09:15:00Z",
        description: "Sent follow-up email to prospective buyer.",
    },
    {
        id: "3",
        user: "agent_01",
        type: "document_parse",
        status: "failed",
        createdAt: "2026-03-02T14:30:00Z",
        description: "Failed to parse uploaded PDF contract (corrupted file).",
    },
    {
        id: "4",
        user: "agent_03",
        type: "lead_analysis",
        status: "processing",
        createdAt: "2026-03-03T10:05:00Z",
        description: "Currently analyzing market trends for lead #8892.",
    },
    {
        id: "5",
        user: "agent_02",
        type: "message_reply",
        status: "success",
        createdAt: "2026-03-03T16:20:00Z",
        description: "Successfully replied to 5 inquiries.",
    },
    {
        id: "6",
        user: "agent_04",
        type: "document_parse",
        status: "success",
        createdAt: "2026-03-04T11:45:00Z",
        description: "Parsed required signatures from lease agreement.",
    },
    {
        id: "7",
        user: "agent_01",
        type: "lead_analysis",
        status: "failed",
        createdAt: "2026-03-05T08:30:00Z",
        description: "Timeout while fetching remote data for listing validation.",
    },
    {
        id: "8",
        user: "agent_03",
        type: "message_reply",
        status: "processing",
        createdAt: "2026-03-05T13:40:00Z",
        description: "Drafting response to complex client query.",
    },
    {
        id: "9",
        user: "agent_04",
        type: "document_parse",
        status: "success",
        createdAt: "2026-03-06T09:25:00Z",
        description: "Extracted key terms from vendor contract.",
    },
    {
        id: "10",
        user: "agent_02",
        type: "lead_analysis",
        status: "success",
        createdAt: "2026-03-06T15:10:00Z",
        description: "Completed comprehensive report on new property listing.",
    }
];

export async function GET() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json(mockActivities);
}
