import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Game data interfaces
export interface Plant {
  id: string;
  name: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  growthTime: number;
  sellPrice: number;
  buyPrice: number;
  stage: 'seed' | 'sprout' | 'growing' | 'mature' | 'harvestable';
  waterNeeded: number;
  soilType: string;
  season: string[];
  xpGained: number;
  description: string;
  unlockLevel: number;
}

export interface Pet {
  id: string;
  name: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  ability: string;
  abilityDescription: string;
  speed: number;
  efficiency: number;
  unlockLevel: number;
  price: number;
}

export interface Tool {
  id: string;
  name: string;
  icon: string;
  type: 'watering' | 'harvesting' | 'planting' | 'special';
  efficiency: number;
  durability: number;
  price: number;
  unlockLevel: number;
}

export interface PlayerProfile {
  id: string;
  username: string;
  level: number;
  xp: number;
  coins: number;
  gems: number;
  farmSize: number;
  plantsUnlocked: string[];
  petsOwned: string[];
  toolsOwned: string[];
  achievements: string[];
  lastLogin: string;
  playTime: number;
  settings: PlayerSettings;
}

export interface PlayerSettings {
  autoHarvest: boolean;
  autoWater: boolean;
  notifications: boolean;
  soundEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
  keyBindings: Record<string, string>;
}

export interface MarketItem {
  id: string;
  itemId: string;
  itemType: 'plant' | 'pet' | 'tool' | 'decoration';
  seller: string;
  price: number;
  quantity: number;
  listedAt: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'achievement' | 'story';
  requirements: Record<string, number>;
  rewards: Record<string, number>;
  progress: Record<string, number>;
  completed: boolean;
  expiresAt?: string;
}

export interface GameStore {
  // Player data
  profile: PlayerProfile | null;
  isConnected: boolean;
  
  // Game databases
  plants: Plant[];
  pets: Pet[];
  tools: Tool[];
  
  // Market & Trading
  marketItems: MarketItem[];
  tradeOffers: any[];
  
  // Quests & Achievements
  activeQuests: Quest[];
  completedQuests: Quest[];
  achievements: any[];
  
  // Analytics
  farmStats: {
    totalHarvests: number;
    totalPlanted: number;
    coinsEarned: number;
    xpGained: number;
    playTime: number;
  };
  
  // UI State
  activeTab: string;
  notifications: any[];
  isLoading: boolean;
  
  // Actions
  setProfile: (profile: PlayerProfile) => void;
  updateProfile: (updates: Partial<PlayerProfile>) => void;
  setConnected: (connected: boolean) => void;
  addNotification: (notification: any) => void;
  removeNotification: (id: string) => void;
  setActiveTab: (tab: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      profile: null,
      isConnected: false,
      plants: [],
      pets: [],
      tools: [],
      marketItems: [],
      tradeOffers: [],
      activeQuests: [],
      completedQuests: [],
      achievements: [],
      farmStats: {
        totalHarvests: 0,
        totalPlanted: 0,
        coinsEarned: 0,
        xpGained: 0,
        playTime: 0,
      },
      activeTab: 'dashboard',
      notifications: [],
      isLoading: false,
      
      // Actions
      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) => set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null
      })),
      setConnected: (connected) => set({ isConnected: connected }),
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, { ...notification, id: Date.now().toString() }]
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'grow-garden-store',
      partialize: (state) => ({
        profile: state.profile,
        farmStats: state.farmStats,
        completedQuests: state.completedQuests,
        achievements: state.achievements,
      }),
    }
  )
);