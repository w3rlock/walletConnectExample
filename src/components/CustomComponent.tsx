import { useSendTransaction, useWriteContract, useAccount, useReadContract, useWaitForTransactionReceipt   } from 'wagmi'
import { parseEther, parseUnits, parseAbi } from 'viem'
import  abiSale  from '../../abi.json'
import  usdtPolAbi  from '../../usdtPolAbi.json'
import { config } from "../../config"
import { waitForTransactionReceipt } from '@wagmi/core'


export const CustomComponent = () => {
  const { sendTransaction } = useSendTransaction()
  const { writeContract, data: hash, isPending, writeContractAsync } = useWriteContract()
  const { address } = useAccount()
  const result = useReadContract({
    abi: abiSale,
    address: '0x24689DC23088E84ad17537E92717a4928474eCAF',
    functionName: 'getUserTokens',
    args: [1, address]
})

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
            <p></p>
        </>
    )
}