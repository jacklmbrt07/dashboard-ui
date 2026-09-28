import BackButton from "@/components/BackButton";
import PostsTable from "@/components/posts/PostsTable";
import PostsPagination from "@/components/posts/PostsPagination";

const PostsPage = () => {
  return (
    <div>
      <BackButton text="Back" link="/" />
      <PostsTable />
      <PostsPagination />
    </div>
  );
};

export default PostsPage;
