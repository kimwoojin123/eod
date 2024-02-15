'use client'

import Checkout from "../ui/funding/payment/checkout"
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

export default function Test(){
  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <Checkout />
    </div>
    </QueryClientProvider>
  )
}