"use client";

import { ActivityStatus } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface ActivityFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    statusFilter: ActivityStatus | "all";
    onStatusChange: (value: ActivityStatus | "all") => void;
}

export function ActivityFilters({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusChange,
}: ActivityFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Filter by user or type..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <Select
                value={statusFilter}
                onValueChange={(val) => onStatusChange(val as ActivityStatus | "all")}
            >
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
