import { Button } from "@/components/ui/button";
import { ChevronDown, Mail, Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@/assets/anya.gif";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ContactForm from "./ContactForm";

export const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const titles = ["AI/ML Engineer", "LLM Specialist", "Generative AI Builder", "Real-time Vision Expert"];
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const title = titles[currentIndex];
    let index = 0;
    const timer = setInterval(() => {
      if (index <= title.length) {
        setDisplayText(title.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % titles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with hero image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-20 h-20 rounded-full bg-primary/20 animate-float" 
           style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-32 w-16 h-16 rounded-full bg-secondary/20 animate-float" 
           style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/4 w-12 h-12 rounded-full bg-accent/20 animate-float" 
           style={{ animationDelay: '2s' }} />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          <span className="gradient-text">안녕하세요</span>
        </h1>
        
        <div className="text-2xl md:text-4xl font-medium mb-8 h-12">
          <span className="text-muted-foreground">저는 </span>
          <span className="text-primary font-semibold">
            {displayText}<span className="animate-pulse">|</span>
          </span>
          <span className="text-muted-foreground"> 입니다</span>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
        무리무리! 화공생명공학과를 전공한 내가<br/> 인공지능을 잘할 수 있을 리가 없잖아?!<br/>(※ 무리가 아니었다?!)
        {/* 화공생명공학과를 전공했지만<br/>AI 엔지니어의 길을 거쳐 이세카이로 가버린 어느 개발자의 이야기 */}
        {/* 익숙한 건 지루하고, 평범한 건 답답합니다.<br /> */}
        {/* 그래서 늘 혁신을 추구하는 <strong>AI Creative Engineer</strong>, 성호입니다. */}
        </p>


        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="glow-primary transition-smooth">
                <Mail className="mr-2 h-5 w-5" />
                연락하기
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>연락하기</DialogTitle>
              <ContactForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="lg" className="transition-smooth">
            프로젝트 보기
          </Button>
        </div>

        {/* Social links */}
        <div className="flex justify-center space-x-6 mb-16">
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

        {/* Scroll indicator */}
        <button 
          onClick={scrollToAbout}
          className="animate-bounce cursor-pointer hover:text-primary transition-smooth"
          aria-label="Scroll to about section"
        >
          <ChevronDown className="h-8 w-8 mx-auto" />
        </button>
      </div>
    </section>
  );
};