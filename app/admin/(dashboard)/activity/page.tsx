import { createClient } from "@/lib/supabase/server";
import { History } from "lucide-react";

export default async function ActivityLogPage() {
  const supabase = createClient();
  const { data: logs } = await supabase
    .from("activity_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Activity Log</h1>
      <p className="mt-1 text-sm text-brand-muted">Accountability trail across all admin users.</p>

      <div className="mt-6 rounded-xl2 border border-brand-line bg-white p-5 shadow-card">
        {logs && logs.length > 0 ? (
          <div className="divide-y divide-brand-line">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 py-3">
                <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-brand-green-mist text-brand-green-dark">
                  <History size={13} />
                </span>
                <div>
                  <p className="text-sm font-medium">{log.action}</p>
                  <p className="text-xs text-brand-muted">{new Date(log.created_at).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-brand-muted">
            No activity recorded yet. Log entries are written by admin actions once your team is provisioned.
          </p>
        )}
      </div>
    </div>
  );
}
