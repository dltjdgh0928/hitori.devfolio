import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import React, { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';

const schema = z.object({
  name: z.string().min(2, "이름을 입력해 주세요."),
  email: z.string().email("회신 받을 이메일을 입력해 주세요."),
  message: z.string().min(5, "메시지를 입력해 주세요.")
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm({ onSuccess, isOpen }: { onSuccess?: () => void; isOpen?: boolean }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // EmailJS 초기화
  useEffect(() => {
    emailjs.init("0lBkq8_hTUq7loPkC");
  }, []);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  // 모달이 열릴 때마다 폼을 초기화
  useEffect(() => {
    if (isOpen) {
      form.reset();
      form.clearErrors();
    }
  }, [isOpen, form]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // EmailJS를 사용하여 이메일 전송
      const templateParams = {
        from_name: data.name,
        reply_to: data.email, // 회신 받을 이메일
        message: data.message,
        to_name: "성호"
      };

      // EmailJS 설정
      const serviceId = "service_i9rrr82";
      const templateId = "template_suvj58p";
      const publicKey = "0lBkq8_hTUq7loPkC";

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      // Supabase에도 백업 저장 시도
      try {
        const { error } = await (supabase as any)
          .from('contacts')
          .insert([
            {
              name: data.name,
              email: data.email,
              message: data.message
            }
          ]);

        if (error) {
          console.error('Supabase error:', error);
        }
      } catch (supabaseError) {
        console.error('Supabase backup error:', supabaseError);
      }

      toast({
        title: "메시지가 성공적으로 전송되었습니다!",
        description: "빠른 시일 내에 답변드리겠습니다.",
      });
      
      form.reset();
      if (onSuccess) onSuccess();
      
    } catch (error) {
      console.error('EmailJS error:', error);
      
      toast({
        title: "전송 실패",
        description: "이메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <FormLabel>회신 받을 이메일</FormLabel>
              <FormControl>
                <Input type="email" placeholder="회신 받을 이메일 주소" {...field} />
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
        <Button type="submit" className="w-full glow-primary" disabled={isSubmitting}>
          {isSubmitting ? "전송 중..." : "보내기"}
        </Button>
      </form>
    </Form>
  );
} 