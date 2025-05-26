import { useState } from 'react';
import { mintAndListNFT, buyNFT, getListing } from '../utils/contract';
import { useWallet } from './WalletProviders';

export function NFTMarketplace() {
    const { account, isConnecting, connect } = useWallet();
    const [uri, setUri] = useState('');
    const [price, setPrice] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [listing, setListing] = useState<any>(null);

    const handleMint = async () => {
        if (!account) return;
        try {
            const tx = await mintAndListNFT(uri, price);
            console.log('Minted NFT:', tx);
        } catch (error) {
            console.error('Failed to mint:', error);
        }
    };

    const handleBuy = async () => {
        if (!account) return;
        try {
            const tx = await buyNFT(Number(tokenId), price);
            console.log('Bought NFT:', tx);
        } catch (error) {
            console.error('Failed to buy:', error);
        }
    };

    const handleGetListing = async () => {
        try {
            const listingData = await getListing(Number(tokenId));
            setListing(listingData);
        } catch (error) {
            console.error('Failed to get listing:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">NFT Marketplace</h1>

            {!account ? (
                <button
                    onClick={connect}
                    disabled={isConnecting}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
            ) : (
                <div>
                    <p className="mb-4">Connected: {account}</p>

                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Mint NFT</h2>
                        <input
                            type="text"
                            placeholder="NFT URI"
                            value={uri}
                            onChange={(e) => setUri(e.target.value)}
                            className="border p-2 mr-2"
                        />
                        <input
                            type="text"
                            placeholder="Price in ETH"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="border p-2 mr-2"
                        />
                        <button
                            onClick={handleMint}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Mint
                        </button>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Buy NFT</h2>
                        <input
                            type="number"
                            placeholder="Token ID"
                            value={tokenId}
                            onChange={(e) => setTokenId(e.target.value)}
                            className="border p-2 mr-2"
                        />
                        <button
                            onClick={handleBuy}
                            className="bg-purple-500 text-white px-4 py-2 rounded"
                        >
                            Buy
                        </button>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Check Listing</h2>
                        <input
                            type="number"
                            placeholder="Token ID"
                            value={tokenId}
                            onChange={(e) => setTokenId(e.target.value)}
                            className="border p-2 mr-2"
                        />
                        <button
                            onClick={handleGetListing}
                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                            Check
                        </button>

                        {listing && (
                            <div className="mt-2">
                                <p>Owner: {listing.owner}</p>
                                <p>Price: {listing.price} ETH</p>
                                <p>Status: {listing.isSold ? 'Sold' : 'Available'}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
} 