// 'use client'

// import { wagmiAdapter, projectId } from "../config"
// import { createAppKit } from "@reown/appkit"
// import {mainnet, arbitrum} from "@reown/appkit/networks"

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import React, {type ReactNode} from 'react'
// import { cookieToInitialState, WagmiProvider, type Config } from "wagmi"


// const queryClient = new QueryClient()

// if(!projectId){
//     throw new Error('Project ID is not defined.')
// }

// const metadata = {
//     name: "test",
//     description: "Appkit example",
//     url: 'https://reown.com/appkit', // origin must match your domain & subdomain
//     icons: ['https://assets.reown.com/reown-profile-pic.png']
// }

// const modal = createAppKit({
//     adapters: [wagmiAdapter],
//     projectId,
//     networks: [mainnet, arbitrum],
//     defaultNetwork: mainnet,
//     features: {
//         analytics: true,
//         email: true,
//         socials: ['google', 'x', 'github'],
//         emailShowWallets: true
//     },
//     themeMode: 'dark'
// })


// function ContextProvider({children, cookies} : {children: ReactNode; cookies: string | null}){
//     const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

//     return (
//         <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
//             <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//         </WagmiProvider>
//     )
// }
