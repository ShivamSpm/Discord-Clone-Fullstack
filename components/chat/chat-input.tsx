"use client";
import React, { use } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import axios from "axios";
import qs from "query-string";
import useModal from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import EmojiPicker from "../emoji-picker";
import { ReplyContextType } from "@/types";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
  replyContext: ReplyContextType | null;
  setReplyContext: (context: ReplyContextType | null) => void; 
}

const formSchema = z.object({
  content: z.string().min(1),
  fileUrl: z.string().optional(),
});

const ChatInput: React.FC<ChatInputProps> = ({ apiUrl, query, name, type, replyContext, setReplyContext}) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      content: "",
      fileUrl: "",
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      await axios.post(url, data);
      form.reset();
      setReplyContext(null);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {replyContext && (
          <div className="bg-gray-100 p-3 rounded-lg mb-2 shadow relative">
            <span className="text-sm text-gray-800">Replying to {replyContext.authorName}</span>
            <p className="text-sm text-gray-600">{replyContext.content}</p>
            <button
              type="button"
              onClick={() => setReplyContext(null)} // Assuming you have a method to clear the reply context
              className="absolute top-1 right-2 text-gray-400 hover:text-gray-600"
              aria-label="Cancel reply"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        )}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition p-1 flex rounded-full justify-center items-center"
                  >
                    <Plus className="text-white dark:text-[#323338]" />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message ${
                      type === "conversation" ? name : "#" + name
                    }`}
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
  
};

export default ChatInput;