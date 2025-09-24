import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PLANTS } from '@/lib/gameData';

export const PlantDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'uncommon': return 'bg-green-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredPlants = PLANTS.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = selectedRarity === 'all' || plant.rarity === selectedRarity;
    const matchesSeason = selectedSeason === 'all' || plant.season.includes(selectedSeason);
    
    return matchesSearch && matchesRarity && matchesSeason;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'level': return a.unlockLevel - b.unlockLevel;
      case 'price': return a.sellPrice - b.sellPrice;
      case 'time': return a.growthTime - b.growthTime;
      default: return 0;
    }
  });

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="roblox-panel">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold neon-text">🌿 Plant Database</h2>
            <p className="text-muted-foreground">
              Discover all {PLANTS.length} plants available in Grow a Garden
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm text-muted-foreground">
              {filteredPlants.length} plants found
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          
          <Select value={selectedRarity} onValueChange={setSelectedRarity}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by rarity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rarities</SelectItem>
              <SelectItem value="common">Common</SelectItem>
              <SelectItem value="uncommon">Uncommon</SelectItem>
              <SelectItem value="rare">Rare</SelectItem>
              <SelectItem value="epic">Epic</SelectItem>
              <SelectItem value="legendary">Legendary</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSeason} onValueChange={setSelectedSeason}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Seasons</SelectItem>
              <SelectItem value="spring">Spring</SelectItem>
              <SelectItem value="summer">Summer</SelectItem>
              <SelectItem value="fall">Fall</SelectItem>
              <SelectItem value="winter">Winter</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="level">Unlock Level</SelectItem>
              <SelectItem value="price">Sell Price</SelectItem>
              <SelectItem value="time">Growth Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Plant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredPlants.map((plant, index) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="grow-animation"
            >
              <Card className={`game-card h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
                plant.rarity === 'legendary' ? 'magical-border pulse-glow' : ''
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-4xl floating-animation">{plant.icon}</div>
                    <Badge className={`${getRarityColor(plant.rarity)} text-white capitalize`}>
                      {plant.rarity}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{plant.name}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{plant.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Sell Price</p>
                      <p className="font-semibold text-yellow-600">₡{plant.sellPrice}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">XP Gained</p>
                      <p className="font-semibold text-blue-600">{plant.xpGained} XP</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Growth Time</p>
                      <p className="font-semibold">{formatTime(plant.growthTime)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Unlock Level</p>
                      <p className="font-semibold">Level {plant.unlockLevel}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Seasons</p>
                      <div className="flex gap-1">
                        {plant.season.map(season => (
                          <Badge key={season} variant="outline" className="text-xs">
                            {season}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-muted-foreground">Soil Type</p>
                      <Badge variant="secondary" className="text-xs">
                        {plant.soilType}
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Water needed: {plant.waterNeeded}x
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: plant.waterNeeded }, (_, i) => (
                          <span key={i} className="text-blue-500">💧</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full game-button" size="sm">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Statistics Panel */}
      <Card className="game-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📈</span>
            Plant Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="rarity" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="rarity">By Rarity</TabsTrigger>
              <TabsTrigger value="season">By Season</TabsTrigger>
              <TabsTrigger value="profitability">Profitability</TabsTrigger>
              <TabsTrigger value="growth">Growth Times</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rarity" className="mt-4">
              <div className="grid grid-cols-5 gap-4">
                {['common', 'uncommon', 'rare', 'epic', 'legendary'].map(rarity => {
                  const count = PLANTS.filter(p => p.rarity === rarity).length;
                  return (
                    <div key={rarity} className="text-center">
                      <div className={`w-16 h-16 ${getRarityColor(rarity)} rounded-full flex items-center justify-center mx-auto mb-2`}>
                        <span className="text-white font-bold">{count}</span>
                      </div>
                      <p className="text-sm capitalize font-medium">{rarity}</p>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="profitability" className="mt-4">
              <div className="space-y-3">
                {PLANTS
                  .filter(p => p.rarity === 'legendary')
                  .sort((a, b) => (b.sellPrice / b.growthTime) - (a.sellPrice / a.growthTime))
                  .slice(0, 5)
                  .map((plant, index) => (
                    <div key={plant.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{plant.icon}</span>
                        <div>
                          <p className="font-medium">{plant.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ₡{(plant.sellPrice / (plant.growthTime / 60000)).toFixed(2)} per minute
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};