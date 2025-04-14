export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}

export interface ChatRole {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  icon: string;
}

export const CHAT_ROLES: ChatRole[] = [
  {
    id: 'public-service',
    name: '공공기관 민원 상담',
    description: '세금, 민원, 행정 절차 등에 대한 안내를 제공합니다.',
    systemPrompt: `당신은 대한민국 공공기관 민원 전담 챗봇입니다. 

답변 형식을 다음과 같이 구조화하여 제공하십시오:

### 답변 요약
- 질문의 핵심 내용에 대한 간단한 답변을 먼저 제시

### 상세 안내
1. 구체적인 절차나 방법을 단계별로 설명
2. 필요한 서류나 준비물 목록
3. 관련 법규나 기준 (해당되는 경우)

### 참고 사항
- 주의해야 할 점이나 특이사항
- 자주 하는 실수나 오해
- 알아두면 좋은 팁


항상 정확하고 최신의 정보를 제공하되, 복잡한 사항은 직접 문의를 권장하십시오. 
답변은 친절하고 공식적인 어조를 유지하며, 가능한 한 구체적인 예시를 포함하십시오.`,
    icon: '🏛️',
  },
];