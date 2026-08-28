import { listProjects } from "@/lib/models/project";
import { getResumeMetadata } from "@/lib/models/resume";
import { getAdminEnvStatus } from "@/lib/adminEnv";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const env = getAdminEnvStatus();
  if (!env.ok) {
    return (
      <AdminDashboard
        initialProjects={[]}
        initialResume={null}
        setupError={`Missing environment variables: ${env.missing.join(", ")}. Add them in Vercel → Settings → Environment Variables, then redeploy.`}
      />
    );
  }

  try {
    const [projects, resume] = await Promise.all([
      listProjects(),
      getResumeMetadata().catch(() => null),
    ]);
    return <AdminDashboard initialProjects={projects} initialResume={resume} />;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Could not connect to MongoDB. Check MONGODB_URI and Atlas network access (allow 0.0.0.0/0).";

    return (
      <AdminDashboard
        initialProjects={[]}
        initialResume={null}
        setupError={message}
      />
    );
  }
}
