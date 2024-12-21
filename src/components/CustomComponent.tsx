import { useSendTransaction, useWriteContract, useAccount  } from 'wagmi'
import { parseEther, parseUnits } from 'viem'
import  abi  from '../../abi.json'

export const CustomComponent = () => {
  const { sendTransaction } = useSendTransaction()
  const { writeContract } = useWriteContract()
  const { address } = useAccount()

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
                writeContract({
                    abi,
                    address: '0x24689DC23088E84ad17537E92717a4928474eCAF',
                    functionName: 'buyTokens',
                    args: [
                      address,
                      1,
                      parseUnits("1", 6),
                      '0x0000000000000000000000000000000000000000'
                    ],
                })
            }>
            Smart contract write
            </button>
        </>
    )
}

