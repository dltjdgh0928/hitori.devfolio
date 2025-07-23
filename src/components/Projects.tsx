import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Github, ExternalLink, Award, Brain, Cog, X } from "lucide-react";
import { useState } from "react";
import aifactoryImage from "@/assets/aifactory_spark_challenge.jpg";
import knowledgeManagement1 from "@/assets/knowledge_management_1.jpeg";
import knowledgeManagement2 from "@/assets/knowledge_management_2.jpeg";
import loraEvaluatorImage from "@/assets/lora_evaluater.png";

export const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ src: "", title: "", description: "" });

  const openImageModal = (imageSrc: string, title: string, description: string) => {
    setSelectedImage({ src: imageSrc, title, description });
    setModalOpen(true);
  };

  const projects = [
    {
      id: 1,
      title: "LoRA Evaluator",
      description: "생성형 인공지능 캐릭터의 얼굴/몸체 등 신체 비율 분석을 통해 LoRA 모델 학습 후 원본과의 유사도를 분석하는 평가 도구입니다. 랜드마크 기반 메트릭을 사용하여 최적의 LoRA 스텝을 찾아줍니다.",
      longDescription: "Facial detection과 body detection을 결합하여 캐릭터가 모델 학습 후 원본과 얼마나 유사한지 분석하는 강력한 도구입니다. 어깨 너비, 허리 너비, 눈 거리, 코-입 거리 등 다양한 비율을 측정하여 수학적으로 최적의 LoRA 스텝을 결정합니다.",
      tech: ["Python", "PyTorch", "MMDetection", "MMPose", "MediaPipe", "CUDA"],
      image: loraEvaluatorImage,
      github: "https://github.com/dltjdgh0928/lora-evaluator",
      category: "AI/ML",
      icon: <Brain className="h-6 w-6" />,
      features: [
        "애니메이션 얼굴 검출 및 분석",
        "신체 랜드마크 기반 비율 측정",
        "수학적 평가 함수를 통한 최적화",
        "MMDetection/MMPose 기반 정밀 분석"
      ]
    },
    {
      id: 2,
      title: "시계열 예측 모델링 - PM2.5 농도 예측 🏆",
      description: "다변량 시계열 데이터를 활용한 대기오염 예측 시스템입니다. AI Factory Spark Challenge에서 우승을 차지한 프로젝트로, Python 기반의 머신러닝 파이프라인 구축부터 지리공간 데이터 처리, 시계열 모델링까지 전 과정을 구현했습니다.",
      longDescription: "복합 센서 데이터(PM2.5, 기상 데이터)를 융합하여 시계열 예측 모델을 개발했습니다. 우수한 성적으로 대회 우승을 달성하며, 데이터 전처리, 특성 엔지니어링, 모델 최적화 등 ML 파이프라인 전체를 설계하고 구현한 실력을 입증한 프로젝트입니다.",
      tech: ["LSTM", "XGBoost", "Prophet", "ARIMA", "Optuna", "GeoPandas", "Hyperparameter Tuning", "Ensemble Methods"],
      image: aifactoryImage,
      category: "Competition",
      icon: <Award className="h-6 w-6" />,
      detailLink: "https://aifactory.space/task/2317/overview",
      detailText: "대회 개요",
      features: [
        "다변량 시계열 데이터 전처리 파이프라인",
        "지리공간 좌표 기반 특성 엔지니어링",
        "결측치 처리 및 데이터 정합성 검증",
        "교차 검증 기반 모델 성능 최적화",
        "확장 가능한 ML 파이프라인 설계"
      ]
    },
    {
      id: 3,
      title: "CCUS 기술 연구 - GS 칼텍스 협업",
      description: "학부 지식경영 수업에서 GS 칼텍스와 협업하여 CCUS(탄소 포집, 활용, 저장) 기술에 대한 연구 프로젝트를 수행했습니다. 화공생명공학 전공 지식을 바탕으로 탄소중립 기술을 분석하고 발표했습니다.",
      longDescription: "실제 석유화학 기업인 GS 칼텍스와의 산학협력 프로젝트로, CCUS 기술의 현황과 전망을 화공생명공학 관점에서 분석했습니다. 공정 설계, 경제성 분석, 환경 영향 평가 등 다각도로 접근한 연구 프로젝트입니다.",
      tech: ["Chemical Engineering", "CCUS Technology", "Process Design", "Economic Analysis", "Presentation", "Industry Collaboration"],
      image: knowledgeManagement1,
      category: "Research",
      icon: <Cog className="h-6 w-6" />,
      detailLink: "https://www.notion.so/KNOWLEDGE-MANAGEMENT-3cc052b1f863447bb97f43af8086bf71?source=copy_link",
      detailText: "PPT 보기",
      features: [
        "GS 칼텍스와의 산학협력 프로젝트",
        "CCUS 기술 현황 및 전망 분석",
        "화공생명공학 관점의 공정 설계",
        "경제성 및 환경 영향 평가",
        "전문적인 프레젠테이션 및 발표"
      ]
    }
  ];

  const upcomingProjects = [
    { name: "ComfyUI Workflow Automation", tech: "ComfyUI, Python, Workflow Design" },
    { name: "LLM Fine-tuning Platform", tech: "PyTorch, Transformers, PEFT" },
    { name: "Real-time Face Swap System", tech: "OpenCV, Deep Learning, Real-time Processing" }
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            프로젝트
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI/ML 프로젝트와 화공생명공학 전공 프로젝트들입니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-card/50 backdrop-blur h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {project.icon}
                    </div>
                    <Badge variant="secondary">{project.category}</Badge>
                  </div>
                </div>
                
                {project.image && (
                  <div className="mb-4 rounded-lg overflow-hidden cursor-pointer relative" onClick={() => openImageModal(project.image, project.title, project.description)}>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                      <div className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-lg">
                        클릭하여 확대
                      </div>
                    </div>
                  </div>
                )}

                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">주요 기능:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                {project.github && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                )}
                {project.detailLink && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(project.detailLink, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {project.detailText}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Additional Projects */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8 text-muted-foreground">
            기타 진행 프로젝트
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingProjects.map((project, index) => (
              <Card key={index} className="bg-card hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold mb-2">{project.name}</h4>
                  <p className="text-sm text-muted-foreground">{project.tech}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] p-0">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={() => setModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="overflow-hidden rounded-lg">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>
              <div className="p-6 bg-background">
                <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-muted-foreground">{selectedImage.description}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}; 