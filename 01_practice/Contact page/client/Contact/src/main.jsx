import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'



// using normal 

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// using tanStack query

import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

// 1. Create a client

const queryClient=new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
     {/* 2. Provide the client to your App */}
    <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </StrictMode>
)






