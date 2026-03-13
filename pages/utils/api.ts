import { BASE_URL } from "../constants/constants.ts";
type RequestInterceptor = (config: RequestInit) => RequestInit | Promise<RequestInit>;
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;

class ApiClient {
    private baseUrl: string;
    private requestInterceptors: Array<RequestInterceptor> = [];
    private responseInterceptors: Array<ResponseInterceptor> = [];

    constructor(baseURL: string) {
        this.baseUrl = baseURL;
        this.requestInterceptors.push(async (config: RequestInit): Promise<RequestInit> => {
            const header = new Headers(config.headers);
            header.set('Content-Type', 'application/json');
            const token = localStorage.getItem('token');
            if(token) header.set('Authorization', `Bearer ${token}`);
            return { ...config, headers: header };
        });
        this.responseInterceptors.push(async (response: Response): Promise<Response> => {
            if (!response.ok) {
                if (response.status === 401) {
                    console.warn('Unauthorized');
                }
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response;
        });
    }

    async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        let config = { ...options };

        for (const interceptor of this.requestInterceptors) {
            config = await interceptor(config);
        }

        const url = `${this.baseUrl}${endpoint}`;
        let response = await fetch(url, config);

        for (const interceptor of this.responseInterceptors) {
            response = await interceptor(response);
        }

        return response.json() as Promise<T>;
    }

    async requestFirstFourCamersAndPetsById(endpoint: string, options: RequestInit = {}): Promise<any> {
         let config = { ...options };

        for (const interceptor of this.requestInterceptors) {
            config = await interceptor(config);
        }

        const url = `${this.baseUrl}${endpoint}`;
        let response = await fetch(url, config);

        
    }
}

export const api = new ApiClient(BASE_URL);