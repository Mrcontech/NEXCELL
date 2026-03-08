import { Activity } from "@/lib/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface ActivityModalProps {
    activity: Activity | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ActivityModal({
    activity,
    open,
    onOpenChange,
}: ActivityModalProps) {
    if (!activity) return null;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "success":
                return <Badge className="bg-green-500 hover:bg-green-600 rounded-full px-3 py-0.5 border-transparent text-white">Success</Badge>;
            case "failed":
                return <Badge className="bg-red-500 hover:bg-red-600 rounded-full px-3 py-0.5 border-transparent text-white">Failed</Badge>;
            case "processing":
                return <Badge className="bg-amber-500 hover:bg-amber-600 rounded-full px-3 py-0.5 border-transparent text-amber-950">Processing</Badge>;
            default:
                return <Badge variant="outline" className="rounded-full px-3 py-0.5">{status}</Badge>;
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Activity Details</DialogTitle>
                    <DialogDescription>
                        ID: {activity.id}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="font-semibold text-muted-foreground text-sm">User</span>
                        <span className="text-sm font-medium">{activity.user}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="font-semibold text-muted-foreground text-sm">Type</span>
                        <span className="text-sm font-medium">{activity.type}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="font-semibold text-muted-foreground text-sm">Status</span>
                        <div>{getStatusBadge(activity.status)}</div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="font-semibold text-muted-foreground text-sm">Date</span>
                        <span className="text-sm font-medium">{formatDate(activity.createdAt)}</span>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                        <span className="font-semibold text-muted-foreground text-sm">Description</span>
                        <div className="bg-muted/50 p-4 rounded-xl text-sm leading-relaxed border border-border/50">
                            {activity.description}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
