import { db } from "@/lib/db";
import { post } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { EditPostForm } from "@/components/admin/EditPostForm";

export const dynamic = "force-dynamic";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  
  const article = await db.query.post.findFirst({
    where: eq(post.id, id),
  });

  if (!article) {
    notFound();
  }

  return <EditPostForm article={article} />;
}
