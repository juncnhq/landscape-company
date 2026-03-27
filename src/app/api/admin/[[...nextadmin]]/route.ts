import { createHandler } from "@premieroctet/next-admin/appHandler";
import { prisma } from "@/lib/prisma";
import { nextAdminOptions } from "@/lib/nextadmin";
import type { RequestContext } from "@premieroctet/next-admin";
import { NextRequest } from "next/server";

const { run } = createHandler({
  apiBasePath: "/api/admin",
  options: nextAdminOptions,
  prisma,
});

async function handler(req: NextRequest, context: { params: Promise<{ nextadmin?: string[] }> }) {
  return run(req, context as RequestContext<"nextadmin">);
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
