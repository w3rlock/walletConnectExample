import { useSendTransaction, useWriteContract, useAccount, useReadContract, useWaitForTransactionReceipt, useSwitchChain     } from 'wagmi'
import { parseEther, parseUnits, parseAbi } from 'viem'
import  abiSale  from '../../abi.json'
import  usdtPolAbi  from '../../usdtPolAbi.json'
import { config } from "../../config"
import { waitForTransactionReceipt, signMessage } from '@wagmi/core'
import { useAppKitNetwork } from "@reown/appkit/react";

import {
    MetaMaskButton,
    useSDK,
    useSignMessage,
  } from "@metamask/sdk-react-ui"

export const CustomComponent = () => {
  const { sendTransaction } = useSendTransaction()
  const { writeContract, data: hash, isPending, writeContractAsync } = useWriteContract()
  const { address } = useAccount()
  const { switchChain, chains } = useSwitchChain()
  const result = useReadContract({
    abi: abiSale,
    address: '0x24689DC23088E84ad17537E92717a4928474eCAF',
    functionName: 'getUserTokens',
    args: [1, address]
})


// const { caipNetwork, caipNetworkId, chainId, switchNetwork } = useAppKitNetwork()

// console.log("network: " + caipNetwork)
// console.log("caipNetworkId: " + caipNetworkId)
// console.log("chainId: " + chainId)


const buyTokens = async () => {
    try {
        const result = await writeContractAsync({
            abi: usdtPolAbi,
            address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
            functionName: 'approve',
            args: [
                '0x24689DC23088E84ad17537E92717a4928474eCAF',
                parseUnits("1", 6),
            ],
        })
        console.log(result)
        const receipt1 = await waitForTransactionReceipt(config, {hash: result})

        const result2 = writeContractAsync({
            abi: abiSale,
            address: '0x24689DC23088E84ad17537E92717a4928474eCAF',
            functionName: 'buyTokens',
            args: [
              address,
              1,
              parseUnits("1", 6),
              '0x0000000000000000000000000000000000000000'
            ],
        })
        console.log(result2)
    } catch (error) {
        console.log(error)
    }
    
}


const sign = async () => {
    const result = await signMessage(config, {message: "zaebal"})
    console.log(result)
}


  let balance

    return (
        <>
            <appkit-button />
            <button onClick={() =>
                sendTransaction({
                    to: '0x5F93F766f069CCc6552f9c1809631419C1cd8a90',
                    value: parseEther('0.01')
                })
            }>
            Send
            </button>
            <p>{address}</p>
            <button onClick={() =>
                buyTokens()
            }>
            Smart contract write
            </button>
            <button onClick={() =>
                sign()
            }>
                Sign message
            </button>
            <div>
            {chains.map((chain) => (
                <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
                {chain.name}
                </button>
                ))}
            </div>  
            <appkit-network-button />
            <p></p>
            <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
        </>
    )
}