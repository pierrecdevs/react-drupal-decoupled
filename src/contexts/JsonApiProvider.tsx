import  { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

type JsonApiProviderProps = {
    children: ReactNode;
}
const JsonApiProvider = ({ children }: JsonApiProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default JsonApiProvider;