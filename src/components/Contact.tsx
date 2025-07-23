import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, Calendar, Github, Linkedin } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ContactForm from "./ContactForm";
import { useState } from "react";

export const Contact = () => {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  
  const contactMethods = [
    {
      icon: Mail,
      title: "이메일",
      description: "프로젝트 문의 및 협업 제안",
      action: "이메일 보내기",
      color: "primary"
    },
    {
      icon: MessageCircle,
      title: "채팅",
      description: "빠른 질문이나 기술 상담",
      action: "채팅 시작하기", 
      color: "secondary",
      link: "https://open.kakao.com/o/sj0FSsIh"
    }
  ];

  const getColorClass = (color: string) => {
    switch(color) {
      case 'primary': return 'hover:glow-primary';
      case 'secondary': return 'hover:glow-secondary';
      case 'accent': return 'hover:glow-accent';
      default: return 'hover:glow-primary';
    }
  };

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="outline" className="mb-4">Contact</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">함께 혁신을</span> 만들어가요
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI/ML 프로젝트나 기술에 관심이 있으시다면 언제든 연락주세요. 
            재미있는 대화나 프로젝트를 함께 나누고 싶습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
          {contactMethods.map((method, index) => (
            <Card 
              key={index}
              className={`card-gradient border-0 transition-smooth group cursor-pointer ${getColorClass(method.color)}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className={`p-4 rounded-full bg-${method.color}/10 group-hover:bg-${method.color}/20 transition-smooth`}>
                    <method.icon className={`h-8 w-8 text-${method.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {method.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full transition-smooth group-hover:border-current"
                  onClick={() => {
                    if (method.link) {
                      window.open(method.link, '_blank');
                    } else if (method.title === "이메일") {
                      setEmailModalOpen(true);
                    }
                  }}
                >
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:glow-primary transition-smooth"
              onClick={() => window.open('https://github.com/dltjdgh0928', '_blank')}
            >
              <Github className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:glow-secondary transition-smooth"
              onClick={() => window.open('https://www.linkedin.com/in/%EC%84%B1%ED%98%B8-%EC%9D%B4-2243a3278/', '_blank')}
            >
              <Linkedin className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="hero-gradient rounded-2xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold mb-4">지금 바로 시작하세요</h3>
            <p className="text-muted-foreground mb-6">
              AI/ML 프로젝트의 첫 걸음을 함께 시작해보세요.
            </p>
            <Button size="lg" className="glow-primary transition-smooth">
              <Mail className="mr-2 h-5 w-5" />
              프로젝트 시작하기
            </Button>
          </div>
        </div>
      </div>
      
      {/* 이메일 모달 */}
      <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
        <DialogContent>
          <DialogTitle>이메일 보내기</DialogTitle>
          <ContactForm onSuccess={() => setEmailModalOpen(false)} isOpen={emailModalOpen} />
        </DialogContent>
      </Dialog>
    </section>
  );
};