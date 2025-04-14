import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Baby, Menu, X, Wallet, ChevronDown, ExternalLink, Shield, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState('');
  const [network, setNetwork] = useState('');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnectedWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(accounts[0]);
            const network = await provider.getNetwork();
            
            setWalletAddress(accounts[0]);
            setWalletBalance(ethers.utils.formatEther(balance).substring(0, 6));
            setNetwork(network.name === 'unknown' ? 'holesky' : network.name);
          }
        } catch (error) {
          console.error("Error checking connected wallet:", error);
        }
      }
    };
    
    checkConnectedWallet();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          updateWalletInfo(accounts[0]);
        } else {
          disconnectWallet();
        }
      });
      
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const updateWalletInfo = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();
      
      setWalletAddress(address);
      setWalletBalance(ethers.utils.formatEther(balance).substring(0, 6));
      setNetwork(network.name === 'unknown' ? 'holesky' : network.name);
    } catch (error) {
      console.error("Error updating wallet info:", error);
    }
  };

  const connectWallet = async (walletType) => {
    setWalletConnecting(true);
    setConnectionError('');
    
    try {
      if (walletType === 'metamask') {
        if (!window.ethereum) {
          throw new Error("MetaMask not installed");
        }
        
        // Request Holesky network (if needed)
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x4e1' }], // Holesky chainId
          });
        } catch (switchError) {
          // Holesky not added, add it
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x4e1',
                    chainName: 'Holesky Testnet',
                    nativeCurrency: {
                      name: 'ETH',
                      symbol: 'ETH',
                      decimals: 18
                    },
                    rpcUrls: ['https://ethereum-holesky.publicnode.com'],
                    blockExplorerUrls: ['https://holesky.etherscan.io']
                  }
                ]
              });
            } catch (addError) {
              throw new Error("Could not add Holesky network");
            }
          } else {
            throw switchError;
          }
        }
        
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        updateWalletInfo(accounts[0]);
      } else if (walletType === 'walletconnect') {
        // For demonstration - in a real app you'd use WalletConnect library
        throw new Error("WalletConnect integration not yet implemented");
      }
      
      setIsWalletModalOpen(false);
    } catch (error) {
      console.error("Wallet connection error:", error);
      setConnectionError(error.message || "Failed to connect wallet");
    } finally {
      setWalletConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setWalletBalance('');
    setNetwork('');
    setIsDropdownOpen(false);
  };

  const uploadToIPFS = async () => {
    try {
      alert("IPFS upload functionality would be implemented here.\n\nThis would typically involve:\n- Selecting files to upload\n- Connecting to IPFS via HTTP client or Infura\n- Uploading and receiving CID\n- Storing references on-chain");
    } catch (error) {
      console.error("IPFS upload error:", error);
      alert("Error uploading to IPFS: " + error.message);
    }
  };

  // Navigation items array for consistency
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Contact Us', path: '/contact-us' },
    { name: 'Emergency Contact', path: '/emergency-contact' },
    { name: 'Personal Space', path: '/personal-space' }
  ];

  // Animation variants
  const navbarVariants = {
    initial: { 
      height: 64,
      backgroundColor: "rgba(255, 255, 255, 1)" 
    },
    scrolled: { 
      height: 56,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    }
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  const linkVariants = {
    initial: { y: 0 },
    hover: { 
      y: -2,
      color: "#f43f5e", // rose-500
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 4px 6px -1px rgba(244, 63, 94, 0.4), 0 2px 4px -1px rgba(244, 63, 94, 0.06)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    open: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <motion.nav 
        className="fixed w-full top-0 z-50 bg-white"
        variants={navbarVariants}
        initial="initial"
        animate={scrolled ? "scrolled" : "initial"}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-full items-center">
            <motion.div 
              className="flex items-center"
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
            >
              <Link to="/" className="flex items-center">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatDelay: 5 }}
                >
                  <Baby className="h-8 w-8 text-rose-500" />
                </motion.div>
                <motion.span 
                  className="ml-2 text-2xl font-semibold text-gray-900"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  MaatrCare
                </motion.span>
              </Link>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                  custom={index}
                >
                  <Link 
                    to={item.path} 
                    className="text-gray-700 hover:text-rose-500 relative"
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-rose-500"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              {!walletAddress ? (
                <motion.button 
                  className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 flex items-center"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setIsWalletModalOpen(true)}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </motion.button>
              ) : (
                <div className="relative">
                  <motion.button 
                    className="bg-gray-100 text-gray-800 border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-200 flex items-center"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <Wallet className="h-4 w-4 mr-2 text-rose-500" />
                    <span className="hidden lg:inline mr-2">{walletAddress.substring(0, 6)}...{walletAddress.substring(38)}</span>
                    <span className="lg:hidden mr-2">{walletAddress.substring(0, 4)}...{walletAddress.substring(40)}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 z-50 border border-gray-100"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-700">Connected Wallet</p>
                          <p className="text-xs text-gray-500 truncate">{walletAddress}</p>
                        </div>
                        <div className="px-4 py-2 border-b border-gray-100">
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-700">Balance</p>
                            <p className="text-sm font-medium">{walletBalance} ETH</p>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-gray-700">Network</p>
                            <p className="text-sm font-medium capitalize">{network}</p>
                          </div>
                        </div>
                        <button 
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={uploadToIPFS}
                        >
                          <Database className="h-4 w-4 mr-2 text-gray-500" />
                          Upload to IPFS
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => {
                            window.open(`https://holesky.etherscan.io/address/${walletAddress}`, '_blank');
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2 text-gray-500" />
                          View on Etherscan
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center border-t border-gray-100"
                          onClick={disconnectWallet}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Disconnect Wallet
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
            
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-white pt-16"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={mobileItemVariants}
                  className="border-b border-gray-100 py-2"
                >
                  <Link 
                    to={item.path} 
                    className="text-gray-700 hover:text-rose-500 text-lg block"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div variants={mobileItemVariants} className="pt-4">
                {!walletAddress ? (
                  <motion.button 
                    className="w-full bg-rose-500 text-white px-4 py-3 rounded-md hover:bg-rose-600 text-lg flex items-center justify-center"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsOpen(false);
                      setIsWalletModalOpen(true);
                    }}
                  >
                    <Wallet className="h-5 w-5 mr-2" />
                    Connect Wallet
                  </motion.button>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm font-medium text-gray-700">Connected Wallet</p>
                      <p className="text-xs text-gray-500 truncate">{walletAddress}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm text-gray-700">Balance</p>
                        <p className="text-sm font-medium">{walletBalance} ETH</p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-gray-700">Network</p>
                        <p className="text-sm font-medium capitalize">{network}</p>
                      </div>
                    </div>
                    
                    <button 
                      className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 flex items-center justify-center"
                      onClick={uploadToIPFS}
                    >
                      <Database className="h-4 w-4 mr-2" />
                      Upload to IPFS
                    </button>
                    
                    <button 
                      className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 flex items-center justify-center"
                      onClick={() => {
                        window.open(`https://holesky.etherscan.io/address/${walletAddress}`, '_blank');
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Etherscan
                    </button>
                    
                    <button 
                      className="w-full bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 flex items-center justify-center"
                      onClick={disconnectWallet}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Disconnect Wallet
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Wallet Connection Modal */}
      <AnimatePresence>
        {isWalletModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div 
              className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Connect Wallet</h3>
                <button 
                  onClick={() => setIsWalletModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-600">Connect your wallet to access blockchain features, manage your digital assets, and interact with IPFS storage.</p>
                
                {connectionError && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                    {connectionError}
                  </div>
                )}
                
                <button
                  onClick={() => connectWallet('metamask')}
                  disabled={walletConnecting}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg flex items-center justify-between transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-3 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-500 text-lg font-bold">M</span>
                    </div>
                    <span>MetaMask</span>
                  </div>
                  {walletConnecting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-gray-300 border-t-gray-600 rounded-full"
                    ></motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ChevronDown className="h-5 w-5 transform rotate-270" />
                    </motion.div>
                  )}
                </button>
                
                <button
                  onClick={() => connectWallet('walletconnect')}
                  disabled={walletConnecting}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg flex items-center justify-between transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-3 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-500 text-lg font-bold">W</span>
                    </div>
                    <span>WalletConnect</span>
                  </div>
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ChevronDown className="h-5 w-5 transform rotate-270" />
                  </motion.div>
                </button>
                
                <div className="text-xs text-gray-500 text-center pt-2">
                  By connecting, you agree to our Terms of Service and Privacy Policy
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default NavigationBar;