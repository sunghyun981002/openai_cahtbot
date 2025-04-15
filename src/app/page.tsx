import Image from "next/image";

export default function Home() {
  return (
    <div className="page-container">
      <h1 className="main-title">
        Open Talk AI 애플리케이션
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/chat" className="card">
          <h2 className="card-title">기본 챗봇</h2>
          <p className="card-text">
            OpenAI를 활용한 기본 대화형 챗봇입니다. 질문을 입력하면 AI가 답변을 제공합니다.
          </p>
        </a>
        <a href="/role" className="card">
          <h2 className="card-title">역할 AI</h2>
          <p className="card-text">
            다양한 역할을 수행하는 특화된 AI 챗봇입니다.
          </p>
        </a>
        <a href="/blog-writer" className="card">
          <h2 className="card-title">블로그 글 작성</h2>
          <p className="card-text">
            주제를 입력하면 자동으로 블로그 글을 생성해주는 AI 도구입니다.
          </p>
        </a>
        <a href="/json-ui" className="card">
          <h2 className="card-title">JSON UI 시각화</h2>
          <p className="card-text">
            AI의 JSON 응답을 시각적인 UI 요소로 변환하여 표시합니다.
          </p>
        </a>
      </div>
    </div>
  );
}
