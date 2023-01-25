import React, { useContext, createContext } from "react";

import {useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react"
import { ethers } from "ethers";

const stateContext = createContext();

export const stateContextProvider = ({ children }) => {
    const { contract } = useContract ('0xE00Da73a68e4ccd38B1D11b72d67397522859bfD');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
                address,
                form.title,
                form.description,
                form.target,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ])

            console.log("contract call successful", date)
        }   catch (error) {
            console.log("contract call failure", error)
        }
    }

    return (
        <stateContext.Provider
            value={{
                address,
                contract,
                createCampaign: publishCampaign,
            }}
        >
            {children}
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext);