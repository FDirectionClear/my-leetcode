// src/types/index.ts
export interface BSLRequest {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  headers?: Record<string, string>;
}

export interface BSLResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code: number;
}

export type RequestHandler = (request: BSLRequest) => Promise<BSLResponse>;

// 协议：接受固定的参数格式，返回promise，promise如果resolve要返回请求结果 eg: {code:0, data: {...}}
// 🐛 如果接口错误，reject的东西无所谓，因为bsl内会讲reject的错误原封不动的reject

// src/core/bslService.ts
export class BSLService {
  private requestHandler: RequestHandler;
  private baseURL: string;

  constructor(config: { 
    baseURL: string;
    requestHandler: RequestHandler; 
  }) {
    this.baseURL = config.baseURL;
    this.requestHandler = config.requestHandler; // 用户传入包含自己基建的个性化请求实例，比如：Taro就是模拟axios实现的request实例
  }

  async getUserProfile(userId: string) {
    // 直接按照规定的参数传入，直接return，后面怎么走，无论是正确还是报错，会经过哪些基建，都交给各C端去处理
    const res = await this.requestHandler({
      url: `${this.baseURL}/user/profile`,
      method: 'POST',
      data: { userId }
    });
  }

  async submitFormData(formData: any) {
    return this.requestHandler({
      url: `${this.baseURL}/form/submit`,
      method: 'POST',
      data: formData
    });
  }
}