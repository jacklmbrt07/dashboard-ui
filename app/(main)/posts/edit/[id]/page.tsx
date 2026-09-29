"use client";
import BackButton from "@/components/BackButton";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { DatePicker } from "@/components/DatePicker";

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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast("Post has been updated successfully", {
      description: `Updated by ${data.author} on ${data.date}`,
    });
  };

  return (
    <div>
      <BackButton text="Back" link="/" />
      <h3 className="text-2xl mb-4">Edit Post</h3>
      <form
        className="mb-8"
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Title"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-body">Body</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="form-rhf-demo-body"
                    placeholder="I'm having an issue with the login button on mobile."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/280 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="author"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="form-rhf-demo-author">Author</FieldLabel>
                <InputGroup>
                  <Input
                    placeholder="Enter Author"
                    {...field}
                    id="form-rhf-demo-author"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="date"
            control={form.control}
            render={({ field }) => (
              <DatePicker
                id="form-rhf-demo-date"
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
              />
            )}
          />
        </FieldGroup>
      </form>
      <Field orientation="horizontal">
        <Button type="submit" form="form-rhf-demo">
          Submit
        </Button>
      </Field>
    </div>
  );
};

export default PostEditPage;
