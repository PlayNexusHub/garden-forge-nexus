import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Dashboard: React.FC = () => {
  const { profile, farmStats, activeQuests, notifications } = useGameStore();

  const quickStats = [
    {
      title: 'Total Harvests',
      value: farmStats.totalHarvests.toLocaleString(),
      icon: '🌾',
      trend: '+12%',
      color: 'text-green-500'
    },
    {
      title: 'Plants Growing',
      value: '47',
      icon: '🌱',
      trend: '+3',
      color: 'text-blue-500'
    },
    {
      title: 'Daily Income',
      value: '₡2,450',
      icon: '💰',
      trend: '+18%',
      color: 'text-yellow-500'
    },
    {
      title: 'Active Pets',
      value: '8',
      icon: '🐾',
      trend: '+2',
      color: 'text-purple-500'
    }
  ];

  const recentActivities = [
    { action: 'Harvested Golden Apple Tree', time: '2 minutes ago', xp: 100 },
    { action: 'Completed Daily Quest', time: '5 minutes ago', reward: '500 coins' },
    { action: 'Upgraded Watering Can', time: '10 minutes ago', item: 'Golden Watering Can' },
    { action: 'Discovered Rainbow Rose', time: '15 minutes ago', rarity: 'legendary' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div 
        className="roblox-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold neon-text mb-2">
              Welcome back, {profile?.username || 'Gardener'}! 🌟
            </h2>
            <p className="text-muted-foreground">
              Your garden is thriving! You've gained <span className="text-primary font-semibold">1,247 XP</span> today.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Current Season</p>
            <div className="text-2xl">🌸 Spring</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="game-card hover:scale-105 transition-transform duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs ${stat.color}`}>
                      {stat.trend} from yesterday
                    </p>
                  </div>
                  <div className="text-3xl floating-animation">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Farm Overview */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="game-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🌱</span>
                Farm Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="growing" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="growing">Growing (23)</TabsTrigger>
                  <TabsTrigger value="ready">Ready (12)</TabsTrigger>
                  <TabsTrigger value="withered">Withered (2)</TabsTrigger>
                </TabsList>
                
                <TabsContent value="growing" className="space-y-3">
                  {[
                    { name: 'Golden Apple Tree', stage: 'Growing', progress: 75, timeLeft: '2h 15m' },
                    { name: 'Rainbow Rose', stage: 'Sprouting', progress: 35, timeLeft: '8h 45m' },
                    { name: 'Crystal Flower', stage: 'Mature', progress: 90, timeLeft: '30m' },
                  ].map((plant, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-sm">🌱</span>
                        </div>
                        <div>
                          <p className="font-medium">{plant.name}</p>
                          <p className="text-sm text-muted-foreground">{plant.stage}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Progress value={plant.progress} className="w-24 mb-1" />
                        <p className="text-xs text-muted-foreground">{plant.timeLeft}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="ready" className="space-y-3">
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <p className="text-lg font-semibold">12 plants ready to harvest!</p>
                    <Button className="mt-4 game-button">
                      Harvest All
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="game-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📋</span>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  {activity.xp && (
                    <Badge variant="secondary">+{activity.xp} XP</Badge>
                  )}
                  {activity.reward && (
                    <Badge variant="default">{activity.reward}</Badge>
                  )}
                  {activity.rarity && (
                    <Badge variant="destructive" className="gold-effect">
                      {activity.rarity}
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Active Quests */}
          <Card className="game-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📜</span>
                Active Quests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeQuests.slice(0, 3).map((quest, index) => (
                <div key={quest.id} className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{quest.title}</p>
                    <Badge variant="outline">{quest.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{quest.description}</p>
                  <Progress value={50} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Progress: 10/20</p>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Quests
              </Button>
            </CardContent>
          </Card>

          {/* Weather & Events */}
          <Card className="game-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🌤️</span>
                Weather & Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">☀️</div>
                <p className="font-semibold">Sunny Day</p>
                <p className="text-sm text-muted-foreground">+20% growth speed</p>
              </div>
              
              <div className="space-y-2">
                <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <p className="text-sm font-medium text-yellow-600">🎪 Spring Festival</p>
                  <p className="text-xs text-muted-foreground">Double XP for flower harvests</p>
                </div>
                
                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-sm font-medium text-blue-600">💧 Rain Coming</p>
                  <p className="text-xs text-muted-foreground">In 3 hours - Free watering</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="game-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⚡</span>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full game-button" variant="outline">
                🚿 Water All Plants
              </Button>
              <Button className="w-full game-button" variant="outline">
                🌾 Harvest Ready Plants
              </Button>
              <Button className="w-full game-button" variant="outline">
                🛒 Visit Market
              </Button>
              <Button className="w-full game-button" variant="outline">
                🎯 Auto-Complete Quests
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};