import { Button } from "@/components/ui/button";
import { ChevronDown, Mail, Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@/assets/anya.gif";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ContactForm from "./ContactForm";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const titles = ["AI/ML Engineer", "LLM Specialist", "Generative AI Builder", "Real-time Vision Expert"];
  const [open, setOpen] = useState(false);
  
  // 스크롤 애니메이션 훅들
  const { ref: titleRef, isIntersecting: titleVisible } = useIntersectionObserver<HTMLHeadingElement>();
  const { ref: subtitleRef, isIntersecting: subtitleVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });
  const { ref: descriptionRef, isIntersecting: descriptionVisible } = useIntersectionObserver<HTMLParagraphElement>({ threshold: 0.3 });
  const { ref: buttonsRef, isIntersecting: buttonsVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });
  const { ref: socialRef, isIntersecting: socialVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });
  const { ref: scrollRef, isIntersecting: scrollVisible } = useIntersectionObserver<HTMLButtonElement>({ threshold: 0.3 });
  
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

  const scrollToTechStack = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
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
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 
          ref={titleRef}
          className={`text-6xl md:text-8xl font-bold mb-6 scroll-animate ${titleVisible ? 'animate' : ''}`}
        >
          <span className="gradient-text">안녕하세요</span>
        </h1>
        
        <div 
          ref={subtitleRef}
          className={`text-2xl md:text-4xl font-medium mb-8 h-12 scroll-animate ${subtitleVisible ? 'animate' : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <span className="text-muted-foreground">저는 </span>
          <span className="text-primary font-semibold">
            {displayText}<span className="animate-pulse">|</span>
          </span>
          <span className="text-muted-foreground"> 입니다</span>
        </div>

        <p 
          ref={descriptionRef}
          className={`text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed scroll-animate ${descriptionVisible ? 'animate' : ''}`}
          style={{ transitionDelay: '0.4s' }}
        >
        무리무리! 화공생명공학과를 전공한 내가<br/> 인공지능을 잘할 수 있을 리가 없잖아?!<br/>(※ 무리가 아니었다?!)
        </p>

        <div 
          ref={buttonsRef}
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 scroll-animate ${buttonsVisible ? 'animate' : ''}`}
          style={{ transitionDelay: '0.6s' }}
        >
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="glow-primary transition-smooth">
                <Mail className="mr-2 h-5 w-5" />
                연락하기
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>연락하기</DialogTitle>
              <ContactForm onSuccess={() => setOpen(false)} isOpen={open} />
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="lg" className="transition-smooth" onClick={scrollToProjects}>
            프로젝트 보기
          </Button>
        </div>

        {/* Social links */}
        <div 
          ref={socialRef}
          className={`flex justify-center space-x-6 mb-16 scroll-animate ${socialVisible ? 'animate' : ''}`}
          style={{ transitionDelay: '0.8s' }}
        >
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
          ref={scrollRef}
          onClick={scrollToTechStack}
          className={`animate-bounce cursor-pointer hover:text-primary transition-smooth scroll-animate ${scrollVisible ? 'animate' : ''}`}
          style={{ transitionDelay: '1s' }}
          aria-label="Scroll to tech stack section"
        >
          <ChevronDown className="h-8 w-8 mx-auto" />
        </button>
      </div>
    </section>
  );
};