import { useEffect, useState } from "react";
import { X, Menu } from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 특정 섹션의 헤더만 찾기
    const sectionIds = ["hero", "projects", "tech-stack", "contact"];
    const sectionTitles = ["소개", "프로젝트", "기술 스택", "연락처"];
    const items: TOCItem[] = [];
    
    sectionIds.forEach((sectionId, index) => {
      const section = document.getElementById(sectionId);
      if (section) {
        items.push({
          id: sectionId,
          title: sectionTitles[index],
          level: 2,
        });
      }
    });
    
    setHeadings(items);

    // Intersection Observer로 현재 보이는 섹션 감지
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (headings.length === 0) return null;

  return (
    <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      {isVisible ? (
        <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg p-6 shadow-lg min-w-48">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-muted-foreground">📑 목차</h3>
            <button
              onClick={toggleVisibility}
              className="p-2 hover:bg-muted rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <ul className="space-y-3">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={`flex items-center text-sm transition-all duration-200 hover:text-primary w-full text-left py-2 px-3 rounded hover:bg-muted/50 ${
                    activeId === heading.id
                      ? "text-primary font-medium bg-primary/10"
                      : "text-muted-foreground"
                  }`}
                >
                  <span className="truncate">{heading.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          onClick={toggleVisibility}
          className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-lg hover:bg-background/90 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
    </nav>
  );
}; 