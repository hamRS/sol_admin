import { ethers } from 'ethers';

// Contract ABI - only the functions we need
const contractABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function mintAndList(string memory _uri, uint96 _price) external",
    "function buy(uint256 tokenId) external payable",
    "function getListing(uint256 tokenId) external view returns (address, uint96, bool)",
    "event ItemListed(uint256 indexed tokenId, address owner, uint96 price)",
    "event ItemSold(uint256 indexed tokenId, address buyer)"
];

// Get contract instance
export const getContract = async () => {
    if (typeof window.ethereum === 'undefined') {
        throw new Error('Please install MetaMask');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

    return new ethers.Contract(contractAddress, contractABI, signer);
};

// Connect wallet
export const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
        throw new Error('Please install MetaMask');
    }

    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        return accounts[0];
    } catch (error) {
        console.error('Error connecting wallet:', error);
        throw error;
    }
};

// Mint and list NFT
export const mintAndListNFT = async (uri: string, price: string) => {
    const contract = await getContract();
    const priceInWei = ethers.parseEther(price);

    try {
        const tx = await contract.mintAndList(uri, priceInWei);
        return await tx.wait();
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw error;
    }
};

// Buy NFT
export const buyNFT = async (tokenId: number, price: string) => {
    const contract = await getContract();
    const priceInWei = ethers.parseEther(price);

    try {
        const tx = await contract.buy(tokenId, { value: priceInWei });
        return await tx.wait();
    } catch (error) {
        console.error('Error buying NFT:', error);
        throw error;
    }
};

// Get listing details
export const getListing = async (tokenId: number) => {
    const contract = await getContract();
    try {
        const listing = await contract.getListing(tokenId);
        return {
            owner: listing[0],
            price: ethers.formatEther(listing[1]),
            isSold: listing[2]
        };
    } catch (error) {
        console.error('Error getting listing:', error);
        throw error;
    }
}; 