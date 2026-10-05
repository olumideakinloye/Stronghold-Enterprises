import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: adminRecord } = await supabase
    .from("admin_users")
    .select("role, full_name")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRecord) {
    // Authenticated with Supabase but not provisioned as staff — sign out and bounce.
    redirect("/admin/login?reason=not-provisioned");
  }

  return (
    <div className="flex min-h-screen bg-brand-bg font-sans">
      <AdminSidebar role={adminRecord.role} fullName={adminRecord.full_name} email={user.email ?? ""} />
      <div className="flex-1 p-6 pt-20 sm:p-10 sm:pt-10">{children}</div>
    </div>
  );
}
