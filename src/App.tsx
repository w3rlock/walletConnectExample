import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useAccount } from 'wagmi'
import { wagmiAdapter, projectId } from "../config"
import { createAppKit } from "@reown/appkit"
import {mainnet, arbitrum, polygon} from "@reown/appkit/networks"
import { useSendTransaction } from 'wagmi'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, {type ReactNode} from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi"

import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import './App.css'
import { parseEther } from 'viem'

import { CustomComponent } from "./components/CustomComponent"

const queryClient = new QueryClient()

if(!projectId){
    throw new Error('Project ID is not defined.')
}

const metadata = {
    name: "test",
    description: "Appkit example",
    url: 'https://reown.com/appkit', // origin must match your domain & subdomain
    icons: ['https://assets.reown.com/reown-profile-pic.png']
}

const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [mainnet, arbitrum, polygon],
    defaultNetwork: polygon,
    features: {
        analytics: true,
        email: true,
        socials: ['google', 'x', 'github'],
        emailShowWallets: true
    },
    themeMode: 'dark'
})

function App() {
  return (
    <>
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
            <MetaMaskUIProvider
                sdkOptions={{
                    dappMetadata: {
                    name: "Example React UI Dapp",
                    url: window.location.href,
                    },
                    infuraAPIKey: process.env.INFURA_API_KEY,
                    // Other options
                }}
                >
                    <CustomComponent />
                </MetaMaskUIProvider>
            </QueryClientProvider>
        </WagmiProvider>
    </>
  )
}

export default App
