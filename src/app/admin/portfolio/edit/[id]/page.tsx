import { db } from "@/lib/db";
import { portfolio } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { EditProjectForm } from "@/components/admin/EditProjectForm";

export const dynamic = "force-dynamic";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  
  const project = await db.query.portfolio.findFirst({
    where: eq(portfolio.id, id),
  });

  if (!project) {
    notFound();
  }

  return <EditProjectForm project={project} />;
}
