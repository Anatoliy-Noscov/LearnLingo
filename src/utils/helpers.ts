import { Loader } from '../components/Loader/Loader';


export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  export const createPageLoader = (text: string = 'Loading...') => {
    return {
      text,
      size: 'large' as const,
      color: '#0984e3'
    };
  };