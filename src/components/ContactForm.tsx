import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import React from "react";

const schema = z.object({
  name: z.string().min(2, "이름을 입력해 주세요."),
  email: z.string().email("유효한 이메일을 입력해 주세요."),
  message: z.string().min(5, "메시지를 입력해 주세요.")
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched"
  });

  const onSubmit = (data: FormValues) => {
    // 실제 이메일 전송 로직은 백엔드/외부 서비스 필요
    toast({
      title: "메시지가 성공적으로 전송되었습니다!",
      description: "빠른 시일 내에 답변드리겠습니다.",
    });
    form.reset();
    if (onSuccess) onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="이름을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input type="email" placeholder="이메일 주소" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>메시지</FormLabel>
              <FormControl>
                <Textarea placeholder="문의 내용을 입력해 주세요" rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full glow-primary">보내기</Button>
      </form>
    </Form>
  );
} 