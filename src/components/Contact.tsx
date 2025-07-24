import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, Calendar, Github, Linkedin } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ContactForm from "./ContactForm";
import { useState } from "react";

// 이미지 import
import lukaGif from "@/assets/luka.gif";

export const Contact = () => {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  
  const contactMethods = [
    {
      icon: Mail,
      title: "이메일",
      description: "기술 문의",
      action: "이메일 보내기",
      color: "primary"
    },
    {
      icon: MessageCircle,
      title: "채팅",
      description: "Buy me a coffee",
      action: "카카오톡 채팅", 
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
        <div className="mb-16 animate-fade-in-up">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Contact</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">커피 한잔만</span> 사주세요
            </h2>
          </div>
          
                     {/* Content with GIF and Text */}
           <div className="flex flex-col lg:flex-row items-center gap-8 max-w-4xl mx-auto">
             {/* Luka GIF - Left Side */}
             <div className="flex-shrink-0 animate-float">
               <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 bg-gradient-to-br from-pink-100 to-purple-100 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:border-primary/40">
                 <img 
                   src={lukaGif} 
                   alt="Luka" 
                   className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                 />
               </div>
             </div>
             
             {/* Text Content - Right Side */}
             <div className="flex-1 text-center lg:text-left animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
               <p className="text-lg text-muted-foreground leading-relaxed font-jua hover:text-foreground transition-colors duration-300">
                 재미있는 대화나 프로젝트를 함께 나누고 싶어요.<br/><br/>
                 <span className="text-red-500 hover:text-red-600 transition-colors duration-300 cursor-pointer hover:scale-105 inline-block transform hover:rotate-1">
                   왜 혼자 재밌는거 하세요?
                 </span>
               </p>
             </div>
           </div>
        </div>

                 <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
           {contactMethods.map((method, index) => (
             <Card 
               key={index}
               className={`card-gradient border-0 transition-all duration-500 group cursor-pointer ${getColorClass(method.color)} hover:scale-105 hover:shadow-2xl animate-fade-in-up`}
               style={{ animationDelay: `${index * 0.2}s` }}
             >
               <CardContent className="p-8 text-center">
                 <div className="mb-6 flex justify-center">
                   <div className={`p-4 rounded-full bg-${method.color}/10 group-hover:bg-${method.color}/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                     <method.icon className={`h-8 w-8 text-${method.color} group-hover:animate-pulse`} />
                   </div>
                 </div>
                 <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{method.title}</h3>
                 <p className="text-muted-foreground mb-6 text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300">
                   {method.description}
                 </p>
                 <Button 
                   variant="outline" 
                   className="w-full transition-all duration-300 group-hover:border-current group-hover:scale-105 group-hover:shadow-lg hover:bg-primary hover:text-primary-foreground"
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
          
          {/* <div className="hero-gradient rounded-2xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold mb-4">지금 바로 시작하세요</h3>
            <p className="text-muted-foreground mb-6">
              AI/ML 프로젝트의 첫 걸음을 함께 시작해보세요.
            </p>
            <Button size="lg" className="glow-primary transition-smooth">
              <Mail className="mr-2 h-5 w-5" />
              프로젝트 시작하기
            </Button>
          </div> */}
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