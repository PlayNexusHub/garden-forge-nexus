import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from './lib/store';
import { GameHeader } from './components/GameHeader';
import { Dashboard } from './pages/Dashboard';
import { PlantDatabase } from './pages/PlantDatabase';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const GrowAGardenApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { setLoading, isLoading } = useGameStore();

  useEffect(() => {
    // Initialize app
    const initializeApp = async () => {
      setLoading(true);
      // Simulate loading game data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };

    initializeApp();
  }, [setLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold neon-text mb-2">Garden Forge</h2>
          <p className="text-muted-foreground">Loading your garden data...</p>
        </motion.div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'plants':
        return <PlantDatabase />;
      default:
        return (
          <div className="roblox-panel text-center py-16">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-bold mb-2">Coming Soon!</h3>
            <p className="text-muted-foreground">
              This feature is being developed. Stay tuned for updates!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GameHeader activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GrowAGardenApp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
