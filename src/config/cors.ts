import { corsConfig } from './security';

export const configureCORS = () => {
  return {
    ...corsConfig,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    handlePreflightRequest: (req: Request, res: Response) => {
      const headers = {
        'Access-Control-Allow-Origin': Array.isArray(corsConfig.origin) 
          ? corsConfig.origin[0] 
          : corsConfig.origin,
        'Access-Control-Allow-Methods': corsConfig.methods.join(', '),
        'Access-Control-Allow-Headers': corsConfig.allowedHeaders.join(', '),
        'Access-Control-Allow-Credentials': String(corsConfig.credentials),
        'Access-Control-Max-Age': String(corsConfig.maxAge)
      };

      return {
        statusCode: 204,
        headers,
        body: ''
      };
    }
  };
};
