
export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  export const createPageLoader = (text: string = 'Loading...') => {
    return (
      <div>
        <Loader />
      </div>
    );
  };