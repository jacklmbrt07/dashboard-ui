import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Folders, MessageCircle, Newspaper, User } from "lucide-react";
import PostsTable from "@/components/posts/PostsTable";

const dashboardCards = [
  { title: "Posts", count: 100, icon: Newspaper },
  { title: "Categories", count: 12, icon: Folders },
  { title: "Users", count: 750, icon: User },
  { title: "Comments", count: 1200, icon: MessageCircle },
];

export default function Home() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
        {dashboardCards.map(({ title, count, icon: Icon }) => (
          <DashboardCard
            key={title}
            title={title}
            count={count}
            icon={<Icon className="text-slate-500 size-18 shrink-0" />}
          />
        ))}
      </div>
      <PostsTable title="Latest Posts" limit={5} />
      <h1 className="text-2xl">Dashboard</h1>
      <Button variant="destructive" size="lg" className="text-blue-400">
        Click Me
      </Button>
    </div>
  );
}
