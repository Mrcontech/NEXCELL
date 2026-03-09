"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-[80vh] w-full items-center justify-center p-4">
            <Card className="max-w-md w-full border-destructive/50">
                <CardHeader className="text-center pb-4">
                    <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit mb-4">
                        <AlertCircle className="h-8 w-8 text-destructive" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-destructive">Application Error</CardTitle>
                    <CardDescription>
                        A critical error occurred while rendering the dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 text-center">
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md overflow-auto font-mono text-left max-h-[150px]">
                        {error.message || "Unknown error"}
                    </p>
                    <Button onClick={() => reset()} variant="default" className="w-full">
                        Try Again
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
