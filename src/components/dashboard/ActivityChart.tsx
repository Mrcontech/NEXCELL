import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface ActivityChartProps {
    stats: {
        success: number;
        failed: number;
        processing: number;
    };
}

export function ActivityChart({ stats }: ActivityChartProps) {
    const data = [
        { name: "Success", value: stats.success, color: "oklch(0.627 0.194 149.214)" }, // Tailwind green-500 equivalent approx or use strict hex: #22c55e
        { name: "Failed", value: stats.failed, color: "oklch(0.637 0.237 25.331)" }, // Tailwind red-500 hex: #ef4444
        { name: "Processing", value: stats.processing, color: "oklch(0.769 0.188 70.08)" }, // Tailwind amber-500 hex: #f59e0b
    ];

    // using explicit hex codes for recharts to ensure absolute safety across themes
    const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

    const chartData = [
        { name: "Success", value: stats.success },
        { name: "Failed", value: stats.failed },
        { name: "Processing", value: stats.processing },
    ].filter(d => d.value > 0);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-2">
                <CardTitle className="text-sm font-medium">Activity Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <div className="h-[100px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--foreground))' }}
                                itemStyle={{ color: 'hsl(var(--foreground))' }}
                            />
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={30}
                                outerRadius={45}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[data.findIndex(d => d.name === entry.name)]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
