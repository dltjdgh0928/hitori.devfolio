import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Image, User, Zap, Server, Code, Award, Target, Cpu } from "lucide-react";
import { useEffect, useRef } from "react";

// 이미지 import
import bocchiImage from "@/assets/bocchi_1.png";
import tensorrtImage from "@/assets/Tensorrt.png";
import onnxImage from "@/assets/onnx.png";
import comfyuiImage from "@/assets/comfyui.svg";
import cudaImage from "@/assets/cuda_logo.png";

// 홀로 카드 컴포넌트
const HoloCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const rect = card.getBoundingClientRect();
      let x: number, y: number;

      if (e instanceof MouseEvent) {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      } else {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      }

      const width = rect.width;
      const height = rect.height;
      
      // 마우스 위치를 퍼센트로 변환
      const px = Math.abs(Math.floor(100 / width * x) - 100);
      const py = Math.abs(Math.floor(100 / height * y) - 100);
      const pa = (50 - px) + (50 - py);

      // 그라디언트 위치 계산
      const lp = (50 + (px - 50) / 1.5);
      const tp = (50 + (py - 50) / 1.5);
      const px_spark = (50 + (px - 50) / 7);
      const py_spark = (50 + (py - 50) / 7);
      const p_opc = 20 + (Math.abs(pa) * 1.5);

      // 3D 변환 계산
      const ty = ((tp - 50) / 2) * -1;
      const tx = ((lp - 50) / 1.5) * 0.5;

      // CSS 스타일 적용
      const grad_pos = `background-position: ${lp}% ${tp}%;`;
      const sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
      const opc = `opacity: ${p_opc / 100};`;
      const tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`;

      // 스타일 태그 생성 또는 업데이트
      if (!styleRef.current) {
        styleRef.current = document.createElement('style');
        document.head.appendChild(styleRef.current);
      }

      const style = `
        .holo-card.interactive:hover:before { ${grad_pos} }
        .holo-card.interactive:hover:after { ${sprk_pos} ${opc} }
      `;
      styleRef.current.textContent = style;

      // 카드에 3D 변환 적용
      card.style.transform = tf;
      card.classList.add('active');
    };

    const handleMouseLeave = () => {
      card.style.transform = '';
      card.classList.remove('active');
      if (styleRef.current) {
        styleRef.current.textContent = '';
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('touchmove', handleMouseMove, { passive: false });
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('touchend', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('touchmove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('touchend', handleMouseLeave);
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
      }
    };
  }, []);

  return (
    <div ref={cardRef} className={`holo-card interactive ${className}`}>
      {children}
    </div>
  );
};

export const TechStack = () => {
  const techCategories = [
    {
      icon: Brain,
      title: "Large Language Models",
      color: "primary",
      techs: ["Axolotl LLM Finetuning", "Mistral 7B/22B", "Llama 2/3", "Qwen 1.5/2", "RAG Systems", "LLM Agent Development"],
      description: "대규모 언어 모델 파인튜닝과 RAG 시스템 구축, LLM Agent 개발 전문"
    },
    {
      icon: Image,
      title: "Stable Diffusion & Generative AI",
      color: "secondary", 
      techs: ["SD 1.5/SDXL", "ComfyUI Workflows", "Kohya_ss", "OneTrainer", "LoRA Training", "Parameter Optimization", "Custom Model Training"],
      description: "이미지 생성 모델 커스터마이징과 워크플로우 자동화, LoRA 훈련 최적화"
    },
    {
      icon: User,
      title: "Real-time Computer Vision",
      color: "accent",
      techs: ["Face Recognition (Arcface)", "Object Detection (Retinanet)", "Xseg Occlusion", "GFPGAN v1.4", "CodeFormer", "Inswapper128", "DFM Architecture"],
      description: "실시간 얼굴 인식과 변환, 고해상도 이미지 복원 시스템 구축"
    },
    {
      icon: Zap,
      title: "Inference Engineering", 
      color: "primary",
      techs: ["ONNX Runtime", "TensorRT Optimization", "Executive Provider", "CuPY Acceleration", "Quantization (fp16, bf16, int8, gguf)", "Model Compression"],
      description: "ONNX, TensorRT를 활용한 대규모 모델 배포 및 성능 최적화"
    },
    {
      icon: Code,
      title: "Development & Framework",
      color: "secondary",
      techs: ["PyTorch Lightning", "TensorFlow/Keras", "FastAPI", "Docker Containerization", "Supabase", "React/TypeScript", "MLOps Pipeline"],
      description: "풀스택 AI 애플리케이션 개발과 MLOps 파이프라인 구축"
    },
    {
      icon: Server,
      title: "Infrastructure & Deployment",
      color: "accent", 
      techs: ["A100/H100 GPU Cluster", "Multi-GPU Training", "Model Serving", "Load Balancing", "Auto-scaling", "Performance Monitoring"],
      description: "대규모 GPU 클러스터 운영과 고성능 모델 서빙 시스템 구축"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "대회 우승",
      description: "AI Factory Spark Challenge 시계열 예측 우승",
      metric: "1st Place"
    },
    {
      icon: Target,
      title: "모델 최적화",
      description: "다양한 LLM 모델 파인튜닝 및 최적화 경험",
      metric: "15+ Models"
    },
    {
      icon: Cpu,
      title: "GPU 클러스터",
      description: "A100/H100 GPU를 활용한 대규모 모델 배포",
      metric: "24/7 Operation"
    }
  ];

  const expertiseAreas = [
    {
      title: "LLM Fine-tuning & RAG",
      details: [
        "Axolotl을 활용한 효율적인 LLM 파인튜닝",
        "RAG 시스템 구축과 벡터 데이터베이스 최적화",
        "LLM Agent 개발과 Tool-using AI 구현",
        "Prompt Engineering과 Chain-of-Thought 기법"
      ]
    },
    {
      title: "Computer Vision & Image Generation",
      details: [
        "Stable Diffusion 커스텀 모델 훈련과 최적화",
        "ComfyUI 워크플로우 설계와 자동화",
        "Real-time Face Swap과 Image Enhancement",
        "LoRA 모델 평가와 최적 파라미터 탐색"
      ]
    },
    {
      title: "Production ML Systems",
      details: [
        "대규모 모델 배포와 서빙 아키텍처 설계",
        "ONNX, TensorRT를 활용한 추론 성능 최적화",
        "Multi-GPU 분산 훈련과 메모리 최적화",
        "MLOps 파이프라인과 자동화된 배포 시스템"
      ]
    }
  ];

  const getColorClass = (color: string) => {
    switch(color) {
      case 'primary': return 'hover:glow-primary border-primary/20';
      case 'secondary': return 'hover:glow-secondary border-secondary/20';
      case 'accent': return 'hover:glow-accent border-accent/20';
      default: return 'hover:glow-primary border-primary/20';
    }
  };

  const getBadgeVariant = (color: string) => {
    switch(color) {
      case 'primary': return 'default';
      case 'secondary': return 'secondary'; 
      case 'accent': return 'outline';
      default: return 'default';
    }
  };

  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="outline" className="mb-4">Tech Stack & Expertise</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">AI/ML 전문 기술</span>과 실무 경험
          </h2>
        </div>

                 {/* Personal Introduction with Image */}
         <div className="mb-16">
           <div className="flex flex-col lg:flex-row items-center gap-8 max-w-5xl mx-auto">
             <div className="flex-shrink-0">
               <HoloCard className="bocchi-card w-83 h-80">
                 <img
                   src={bocchiImage}
                   alt="AI/ML Research"
                   className="w-full h-full object-cover"
                 />
               </HoloCard>
             </div>
             <div className="flex-1 text-center">
               <p className="text-2xl md:text-3xl font-bold text-pink-500 leading-relaxed font-jua">
                 "소... 솔직히 AI라는 건 많이 해봤다고 생각해요..."
               </p>
               <p className="text-sm text-yellow-500 mt-2 font-jua">
                 "성호야 그게 무슨 소리니?"
               </p>
             </div>
           </div>
         </div>

        {/* Tech Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {techCategories.map((category, index) => (
            <Card 
              key={index}
              className={`card-gradient transition-smooth group cursor-pointer ${getColorClass(category.color)}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg bg-${category.color}/10`}>
                    <category.icon className={`h-6 w-6 text-${category.color}`} />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.techs.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex}
                      variant={getBadgeVariant(category.color)}
                      className="text-xs transition-smooth hover:scale-105"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center gradient-text">주요 성과</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center card-gradient border-0 hover:glow-primary transition-smooth">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-primary/10">
                      <achievement.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">{achievement.metric}</div>
                  <h4 className="font-semibold mb-2">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Expertise */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center gradient-text">전문 분야 상세</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => (
              <Card key={index} className="card-gradient border-0 hover:glow-secondary transition-smooth">
                <CardHeader>
                  <CardTitle className="text-lg text-secondary">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {area.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tech Logo Marquee */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-8 text-center text-muted-foreground">사용 기술 스택</h3>
          <div className="overflow-hidden">
            <div className="flex animate-marquee py-4 whitespace-nowrap">
              <div className="flex items-center space-x-8">
                {/* 첫 번째 세트 */}
                {/* Python */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">Python</span>
                </div>
                
                {/* PyTorch */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">PyTorch</span>
                </div>

                {/* TensorFlow */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">TensorFlow</span>
                </div>

                {/* Docker */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">Docker</span>
                </div>

                {/* FastAPI */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" alt="FastAPI" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">FastAPI</span>
                </div>

                {/* Supabase */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" alt="Supabase" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">Supabase</span>
                </div>

                {/* Git */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">Git</span>
                </div>

                {/* GitHub */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">GitHub</span>
                </div>

                {/* Redis */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">Redis</span>
                </div>

                {/* TensorRT */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-1 shadow-lg">
                    <img src={tensorrtImage} alt="TensorRT" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">TensorRT</span>
                </div>

                {/* ONNX */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src={onnxImage} alt="ONNX" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">ONNX</span>
                </div>

                {/* Hugging Face */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://huggingface.co/front/assets/huggingface_logo.svg" alt="Hugging Face" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">Hugging Face</span>
                </div>

                {/* ComfyUI */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src={comfyuiImage} alt="ComfyUI" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">ComfyUI</span>
                </div>

                {/* CUDA */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg flex items-center justify-center">
                    <img src={cudaImage} alt="CUDA" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">CUDA</span>
                </div>

                {/* 두 번째 세트 (동일한 내용) */}
                {/* Python */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">Python</span>
                </div>
                
                {/* PyTorch */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">PyTorch</span>
                </div>

                {/* TensorFlow */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">TensorFlow</span>
                </div>

                {/* Docker */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">Docker</span>
                </div>

                {/* FastAPI */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" alt="FastAPI" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">FastAPI</span>
                </div>

                {/* Supabase */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" alt="Supabase" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">Supabase</span>
                </div>

                {/* Git */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">Git</span>
                </div>

                {/* GitHub */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">GitHub</span>
                </div>

                {/* Redis */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">Redis</span>
                </div>

                {/* TensorRT */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-1 shadow-lg">
                    <img src={tensorrtImage} alt="TensorRT" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">TensorRT</span>
                </div>

                {/* ONNX */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src={onnxImage} alt="ONNX" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">ONNX</span>
                </div>

                {/* Hugging Face */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src="https://huggingface.co/front/assets/huggingface_logo.svg" alt="Hugging Face" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">Hugging Face</span>
                </div>

                {/* ComfyUI */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg">
                    <img src={comfyuiImage} alt="ComfyUI" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">ComfyUI</span>
                </div>

                {/* CUDA */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0" style={{ width: '6rem' }}>
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-lg flex items-center justify-center">
                    <img src={cudaImage} alt="CUDA" className="w-full h-full" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">CUDA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};