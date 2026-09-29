import BackButton from "@/components/BackButton";
import PostsTable from "@/components/posts/PostsTable";

const PostsPage = () => {
  return (
    <div>
      <BackButton text="Back" link="/" />
      <PostsTable />
    </div>
  );
};

export default PostsPage;
