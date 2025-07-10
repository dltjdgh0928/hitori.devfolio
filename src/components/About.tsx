import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Zap } from "lucide-react";

export const About = () => {
  const highlights = [
    {
      icon: Brain,
      title: "AI/ML 전문성",
      description: "LLM, Computer Vision, Deep Learning 전 영역에서의 깊은 이해와 실무 경험"
    },
    {
      icon: Code,
      title: "엔지니어링 역량", 
      description: "대규모 모델 배포부터 최적화까지, 프로덕션 레벨의 시스템 구축 능력"
    },
    {
      icon: Zap,
      title: "혁신적 사고",
      description: "최신 기술 트렌드를 빠르게 습득하고 비즈니스 가치로 변환하는 능력"
    }
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="outline" className="mb-4">About Me</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">AI/ML 전문가</span>로서의 여정
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            인공지능과 머신러닝 분야에서 끊임없이 도전하며, 
            기술적 깊이와 실무 경험을 바탕으로 혁신적인 솔루션을 만들어나가고 있습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {highlights.map((item, index) => (
            <Card 
              key={index} 
              className="card-gradient border-0 hover:glow-primary transition-smooth group cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-smooth">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6 text-primary">전문 분야</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Large Language Models</h4>
                <p className="text-muted-foreground text-sm">
                  Axolotl을 활용한 LLM 파인튜닝, RAG 시스템 구축, LLM Agent 개발
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Computer Vision</h4>
                <p className="text-muted-foreground text-sm">
                  Stable Diffusion, Real-time Vision 기술, 이미지 생성 및 편집 솔루션
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Inference Engineering</h4>
                <p className="text-muted-foreground text-sm">
                  ONNX, TensorRT 최적화, 대규모 모델 배포 및 성능 튜닝
                </p>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6 text-secondary">경험과 성과</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                A100/H100 GPU 클러스터를 활용한 대규모 모델 배포 경험
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                다양한 LLM 모델(Mistral, Llama, Qwen) 파인튜닝 및 최적화
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                ComfyUI, Kohya_ss 등을 활용한 Stable Diffusion 워크플로우 구축
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                실시간 Real-time Vision 시스템 아키텍처 설계 및 구현
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};