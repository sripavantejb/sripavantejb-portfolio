import { listProjects } from "@/lib/models/project";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const projects = await listProjects();
  return <AdminDashboard initialProjects={projects} />;
}
