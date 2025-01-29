import Sidebar from "./sidebar";
import Header from "./header";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import profileAction from "@/_actions/profile.action";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["profile"],
    queryFn: profileAction,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-svh w-full bg-background flex">
        <Sidebar />
        <div className="flex flex-col w-full min-h-svh">
          <Header />
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
}
