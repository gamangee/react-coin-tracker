import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import { theme } from './theme';
import router from './Router';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  </QueryClientProvider>,
  document.getElementById('root') as HTMLElement
);
