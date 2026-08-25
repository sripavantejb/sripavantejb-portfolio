import { listProjects } from "@/lib/models/project";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

// Session-gated and always reflects live database content, so it must never be
// prerendered at build time (which also made `next build` require database access).
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const projects = await listProjects();
  return <AdminDashboard initialProjects={projects} />;
}
