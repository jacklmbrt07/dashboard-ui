import BackButton from "@/components/BackButton";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import posts from '@/data/posts'
import { Usable, use } from "react";

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required'
  }),
  body: z.string().min(1, {
    message: 'Body is required'
  }),
  author: z.string().min(1, {
    message: 'Author is required'
  }),
  date: z.string().min(1, {
    message: 'Date is required'
  }),
})

interface PostEditPageProps {
  params: {
    id: string;
  };
}

const PostEditPage = ({ params }: PostEditPageProps) => {

  const param = use(params)
  const post = posts.find((post) => post.id === param.id)

  console.log("postpostpost", post)
  return (
    <div>
      <BackButton text="Back" link="/" />
      PostEditPage
    </div>
  );
};

export default PostEditPage;
