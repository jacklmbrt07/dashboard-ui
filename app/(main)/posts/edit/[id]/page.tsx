"use client"
import BackButton from "@/components/BackButton";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import posts from "@/data/posts";
import { use } from "react";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  body: z.string().min(1, {
    message: "Body is required",
  }),
  author: z.string().min(1, {
    message: "Author is required",
  }),
  date: z.string().min(1, {
    message: "Date is required",
  }),
});

interface PostEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

const PostEditPage = ({ params }: PostEditPageProps) => {
  const param = use(params);
  const post = posts.find((post) => post.id === param.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      body: post?.body || "",
      author: post?.author || "",
      date: post?.date || "",
    },
  });

  return (
    <div>
      <BackButton text="Back" link="/" />
      <h3 className="text-2xl mb-4">Edit Post</h3>
      {/* Form Goes Here */}
    </div>
  );
};

export default PostEditPage;
