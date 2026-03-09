"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Activity, ActivityStatus } from "@/lib/types";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityFilters } from "@/components/dashboard/ActivityFilters";
import { ActivityTable } from "@/components/dashboard/ActivityTable";
import { ActivityModal } from "@/components/dashboard/ActivityModal";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { ListTodo, CheckCircle2, XCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24
    }
  }
};

function DashboardSkeleton() {
  return (
    <div className="space-y-8 mt-8">
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[130px] rounded-xl bg-muted animate-pulse border shadow-sm" />
        ))}
      </div>
      {/* High fidelity skeleton matching table structure roughly */}
      <div className="h-[400px] rounded-xl bg-card border shadow-sm flex flex-col p-4 animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-32 bg-muted rounded"></div>
          <div className="flex gap-2">
            <div className="h-10 w-[250px] bg-muted rounded-md"></div>
            <div className="h-10 w-[180px] bg-muted rounded-md"></div>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4 border-b pb-4">
              <div className="h-4 w-12 bg-muted rounded"></div>
              <div className="h-4 w-24 bg-muted rounded"></div>
              <div className="h-4 w-32 bg-muted rounded"></div>
              <div className="h-4 w-16 bg-muted rounded"></div>
              <div className="h-4 w-28 bg-muted rounded ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // URL-synced filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const statusFilter: ActivityStatus | "all" = (searchParams.get("status") as ActivityStatus | "all") || "all";

  // Modal state
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Sync URL -> Local Search State
  useEffect(() => {
    setSearchQuery(searchParams.get("query") || "");
  }, [searchParams]);

  // Debounce search input to URL
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery !== (searchParams.get("query") || "")) {
        const params = new URLSearchParams(searchParams.toString());
        if (searchQuery) params.set("query", searchQuery);
        else params.delete("query");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery, pathname, router, searchParams]);

  const handleStatusChange = (value: ActivityStatus | "all") => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "all") params.set("status", value);
    else params.delete("status");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    async function fetchActivities() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/activities");
        if (!res.ok) {
          throw new Error("Failed to fetch activities");
        }
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchActivities();
  }, []);

  // Compute filtered activities
  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        searchQuery === "" ||
        activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || activity.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [activities, searchQuery, statusFilter]);

  // Derived statistics (based on fetched data, not just filtered)
  const stats = useMemo(() => {
    return {
      total: activities.length,
      success: activities.filter((a) => a.status === "success").length,
      failed: activities.filter((a) => a.status === "failed").length,
      processing: activities.filter((a) => a.status === "processing").length,
    };
  }, [activities]);

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center p-6 text-red-500 bg-card rounded-xl border mt-8">
        <p>Error loading dashboard: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-8 mt-8"
    >
      {/* STATS STRIP */}
      <div className="grid gap-4 md:grid-cols-4">
        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Activities"
            value={stats.total}
            icon={<ListTodo className="h-5 w-5 text-muted-foreground" />}
            description="Total logs retrieved"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Successful"
            value={stats.success}
            icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
            description="Completed without errors"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Failed"
            value={stats.failed}
            icon={<XCircle className="h-5 w-5 text-destructive" />}
            description="Requires attention"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ActivityChart stats={stats} />
        </motion.div>
      </div>

      {/* MAIN CONTENT AREA */}
      <motion.div variants={itemVariants} className="space-y-6 bg-card p-4 md:p-6 rounded-xl border shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-card-foreground">Activity Logs</h2>
          <ActivityFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={handleStatusChange}
          />
        </div>

        {/* ACTIVITY TABLE */}
        <ActivityTable
          activities={filteredActivities}
          onRowClick={(activity) => setSelectedActivity(activity)}
        />
      </motion.div>

      {/* ACTIVITY DETAIL PANEL (MODAL) */}
      <ActivityModal
        activity={selectedActivity}
        open={!!selectedActivity}
        onOpenChange={(open) => !open && setSelectedActivity(null)}
      />
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              AI Activity Dashboard
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">
              Monitor and audit agent activity logs
            </p>
          </div>
          <ThemeToggle />
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent />
        </Suspense>
      </div>
    </div>
  );
}
