import { Activity } from "@/lib/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { SearchX } from "lucide-react";
import { motion } from "framer-motion";

interface ActivityTableProps {
    activities: Activity[];
    onRowClick: (activity: Activity) => void;
}

export function ActivityTable({ activities, onRowClick }: ActivityTableProps) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "success":
                return <Badge className="bg-green-500 hover:bg-green-600 rounded-full px-3 py-0.5 text-white border-transparent">Success</Badge>;
            case "failed":
                return <Badge className="bg-red-500 hover:bg-red-600 rounded-full px-3 py-0.5 text-white border-transparent">Failed</Badge>;
            case "processing":
                return <Badge className="bg-amber-500 hover:bg-amber-600 rounded-full px-3 py-0.5 text-amber-950 border-transparent">Processing</Badge>;
            default:
                return <Badge variant="outline" className="rounded-full px-3 py-0.5">{status}</Badge>;
        }
    };

    if (activities.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="border border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center bg-card shadow-sm min-h-[300px]"
            >
                <div className="bg-muted/50 p-4 rounded-full mb-4 ring-1 ring-border shadow-inner">
                    <SearchX className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">No activities found</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                    We couldn&apos;t find any activities matching your current filters. Try adjusting your search query or status.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="rounded-md border bg-card shadow-sm overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Created Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activities.map((activity) => (
                        <TableRow
                            key={activity.id}
                            onClick={() => onRowClick(activity)}
                            className="cursor-pointer hover:bg-muted/50 transition-colors"
                        >
                            <TableCell className="font-medium">{activity.id}</TableCell>
                            <TableCell>{activity.user}</TableCell>
                            <TableCell>{activity.type}</TableCell>
                            <TableCell>{getStatusBadge(activity.status)}</TableCell>
                            <TableCell className="text-right text-muted-foreground whitespace-nowrap">
                                {formatDate(activity.createdAt)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
