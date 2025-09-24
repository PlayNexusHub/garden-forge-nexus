import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface GameHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠', color: 'primary' },
  { id: 'farm', label: 'Farm Manager', icon: '🌱', color: 'secondary' },
  { id: 'plants', label: 'Plant Database', icon: '🌿', color: 'accent' },
  { id: 'pets', label: 'Pet Collection', icon: '🐾', color: 'primary' },
  { id: 'tools', label: 'Tool Shop', icon: '🔧', color: 'secondary' },
  { id: 'market', label: 'Market Hub', icon: '💰', color: 'accent' },
  { id: 'quests', label: 'Quests', icon: '📜', color: 'primary' },
  { id: 'automation', label: 'Automation', icon: '🤖', color: 'secondary' },
  { id: 'analytics', label: 'Analytics', icon: '📊', color: 'accent' },
  { id: 'community', label: 'Community', icon: '👥', color: 'primary' },
  { id: 'guides', label: 'Guides', icon: '📚', color: 'secondary' },
  { id: 'settings', label: 'Settings', icon: '⚙️', color: 'accent' },
];

export const GameHeader: React.FC<GameHeaderProps> = ({ activeTab, onTabChange }) => {
  const { profile, isConnected } = useGameStore();

  const getXPProgress = () => {
    if (!profile) return 0;
    const currentLevelXP = profile.level * 1000;
    const nextLevelXP = (profile.level + 1) * 1000;
    return ((profile.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  };

  return (
    <header className="glass-effect border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          {/* Logo & Game Title */}
          <div className="flex items-center space-x-4">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center pulse-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">🌱</span>
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold neon-text">Garden Forge</h1>
              <p className="text-sm text-muted-foreground">Roblox Grow a Garden Companion</p>
            </div>
          </div>

          {/* Player Stats */}
          {profile && (
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Level</p>
                <p className="text-lg font-bold">{profile.level}</p>
              </div>
              
              <div className="w-32">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>XP</span>
                  <span>{profile.xp}</span>
                </div>
                <Progress value={getXPProgress()} className="h-2" />
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">Coins</p>
                <p className="text-lg font-bold gold-effect">{profile.coins.toLocaleString()}</p>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">Gems</p>
                <p className="text-lg font-bold text-accent">{profile.gems}</p>
              </div>

              <Badge variant={isConnected ? "default" : "destructive"} className="ml-4">
                {isConnected ? "🟢 Connected" : "🔴 Offline"}
              </Badge>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto pb-2">
          {TABS.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`shrink-0 transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'game-button pulse-glow' 
                  : 'hover:bg-secondary/50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};