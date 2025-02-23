import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import defaultOptions from "./configs/reactQuery";
import Layout from "./layouts/Layout";

export function App() {
  const queryClient=new QueryClient({defaultOptions});
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Router/>
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools/>
     </QueryClientProvider>
  )
}
export default App