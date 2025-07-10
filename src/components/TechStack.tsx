import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Image, User, Zap, Server, Code } from "lucide-react";

export const TechStack = () => {
  const techCategories = [
    {
      icon: Brain,
      title: "Large Language Models",
      color: "primary",
      techs: ["LLM Finetuning (Axolotl)", "Mistral", "Llama", "Qwen", "RAG", "LLM Agent"]
    },
    {
      icon: Image,
      title: "Stable Diffusion",
      color: "secondary", 
      techs: ["SD15", "SDXL", "ComfyUI", "Kohya_ss", "OneTrainer", "LoRA", "Training Parameter Optimization"]
    },
    {
      icon: User,
      title: "Real-time Vision",
      color: "accent",
      techs: ["Backend Architecture", "Arcface", "Retinanet", "Xseg for Occlusion", "GFPGAN v1.4", "Codeformer", "Inswapper128", "DFM"]
    },
    {
      icon: Zap,
      title: "Inference Engineering", 
      color: "primary",
      techs: ["ONNX", "TensorRT", "TensorRT Executive Provider", "CuPY", "Quantization (fp16, bf16, int8, gguf)"]
    },
    {
      icon: Code,
      title: "Development Stack",
      color: "secondary",
      techs: ["PyTorch", "TensorFlow", "Docker", "FastAPI", "Supabase"]
    },
    {
      icon: Server,
      title: "Infrastructure",
      color: "accent", 
      techs: ["A100/H100 GPU Cluster", "Large-scale Model Deployment", "Performance Optimization"]
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
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="outline" className="mb-4">Tech Stack</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">기술 전문성</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            AI/ML 분야의 최신 기술들을 활용하여 적인 솔루션을 개발합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => (
            <Card 
              key={index}
              className={`card-gradient transition-smooth group cursor-pointer ${getColorClass(category.color)}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-${category.color}/10`}>
                    <category.icon className={`h-6 w-6 text-${category.color}`} />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
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

        <div className="mt-16 text-center animate-fade-in-up">
          <h3 className="text-2xl font-bold mb-8 gradient-text">핵심 역량</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <p className="text-muted-foreground">AI/ML 프로젝트 경험</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">100+</div>
              <p className="text-muted-foreground">모델 훈련 및 최적화</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <p className="text-muted-foreground">대규모 시스템 운영</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};