import { PromisePageProps } from "@premieroctet/next-admin";
import { NextAdmin } from "@premieroctet/next-admin/adapters/next";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { nextAdminOptions } from "@/lib/nextadmin";

export default async function AdminPage(props: PromisePageProps) {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  const params = await props.params;
  const searchParams = await props.searchParams;

  const adminProps = await getNextAdminProps({
    params: params.nextadmin,
    searchParams,
    basePath: "/admin",
    apiBasePath: "/api/admin",
    options: nextAdminOptions,
    prisma,
  });

  return <NextAdmin {...adminProps} />;
}
