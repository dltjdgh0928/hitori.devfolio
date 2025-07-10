-- Supabase에서 실행할 SQL
-- https://app.supabase.com/project/YOUR_PROJECT_ID/sql-editor 에서 실행하세요

CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 정책 설정 (선택사항)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 삽입할 수 있도록 정책 생성
CREATE POLICY "Anyone can insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);

-- 관리자만 조회할 수 있도록 정책 생성 (필요시)
-- CREATE POLICY "Admin can view contacts" ON contacts
--   FOR SELECT USING (auth.role() = 'authenticated'); 