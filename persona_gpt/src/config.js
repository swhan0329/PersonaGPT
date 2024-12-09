// 환경 변수 로드 확인을 위한 콘솔 로그 추가
console.log('API_URL:', process.env.REACT_APP_API_URL);
console.log('OPENAI_API_URL:', process.env.REACT_APP_OPENAI_API_URL);

export const API_URL = process.env.REACT_APP_API_URL || '';
export const OPENAI_API_URL = process.env.REACT_APP_OPENAI_API_URL || '';