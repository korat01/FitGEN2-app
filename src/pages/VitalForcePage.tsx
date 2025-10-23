import React, { useState } from 'react';
import { 
  Flame, 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Crown,
  Hexagon,
  Triangle,
  Square,
  Circle,
  User,
  Bell,
  Coins,
  TrendingUp
} from 'lucide-react';

const VitalForcePage: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState('7 Days');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-3 text-sm">
        <span className="text-white font-medium">9:41</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white rounded-full opacity-80"></div>
          <div className="w-4 h-4 bg-white rounded-full opacity-60"></div>
          <div className="w-4 h-4 bg-white rounded-full opacity-40"></div>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-4 h-2 bg-white rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      {/* App Header */}
      <div className="text-center py-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            {/* V Logo - Two overlapping triangles */}
            <div className="relative w-16 h-16">
              {/* Purple triangle */}
              <div 
                className="absolute w-8 h-8 transform rotate-45"
                style={{
                  background: 'linear-gradient(135deg, #8B45FF 0%, #6B2AFF 100%)',
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  top: '0',
                  left: '0'
                }}
              ></div>
              {/* Blue triangle */}
              <div 
                className="absolute w-8 h-8 transform rotate-45"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #00C2FF 100%)',
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  top: '0',
                  right: '0'
                }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* App Name */}
        <h1 className="text-3xl font-bold text-white">VitalForce</h1>
      </div>

      {/* Activity Cards */}
      <div className="px-6 mb-8">
        <div className="flex gap-4 overflow-x-auto">
          {/* Left Card - Partially visible */}
          <div className="flex-shrink-0 w-32 h-40 rounded-2xl relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #8B45FF 0%, #6B2AFF 100%)'
          }}>
            {/* Progress bar */}
            <div className="absolute top-2 left-2 right-2 h-1 bg-white/20 rounded-full">
              <div className="h-full bg-white rounded-full" style={{ width: '60%' }}></div>
            </div>
            
            {/* Gold coins */}
            <div className="absolute bottom-4 left-4">
              <div className="flex">
                <Coins className="w-6 h-6 text-yellow-400" />
                <Coins className="w-6 h-6 text-yellow-400 -ml-2" />
              </div>
            </div>
          </div>

          {/* Middle Card - Daily Weekly */}
          <div className="flex-shrink-0 w-40 h-40 rounded-2xl relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #8B45FF 0%, #6B2AFF 100%)'
          }}>
            {/* Progress bar */}
            <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
              <div className="h-1 bg-white/20 rounded-full flex-1 mr-2">
                <div className="h-full bg-white rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span className="text-xs text-white font-medium">XP</span>
            </div>
            
            {/* Small icons */}
            <div className="absolute top-6 left-2 flex gap-1">
              <Target className="w-3 h-3 text-white/80" />
              <Coins className="w-3 h-3 text-yellow-400" />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8B45FF' }}></div>
            </div>
            
            {/* Main content */}
            <div className="absolute bottom-8 left-2 right-2">
              <h3 className="text-lg font-bold text-white mb-1">Daily Weekly</h3>
              <p className="text-sm text-white/80 mb-2">Special! Event</p>
            </div>
            
            {/* Bell icon */}
            <div className="absolute bottom-4 right-4">
              <Bell className="w-5 h-5 text-yellow-400" />
            </div>
          </div>

          {/* Right Card - Challenge */}
          <div className="flex-shrink-0 w-40 h-40 rounded-2xl relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #00C2FF 100%)'
          }}>
            {/* Progress bar */}
            <div className="absolute top-2 left-2 right-2 h-1 bg-white/20 rounded-full">
              <div className="h-full bg-white rounded-full" style={{ width: '45%' }}></div>
            </div>
            
            {/* Small icons */}
            <div className="absolute top-6 left-2 flex gap-1">
              <Target className="w-3 h-3 text-white/80" />
              <Coins className="w-3 h-3 text-yellow-400" />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8B45FF' }}></div>
            </div>
            
            {/* Main content */}
            <div className="absolute bottom-8 left-2 right-2">
              <h3 className="text-lg font-bold text-white mb-1">Challenge</h3>
              <p className="text-sm text-white/80 mb-2">Special Leagues</p>
            </div>
            
            {/* Hexagonal badge */}
            <div className="absolute bottom-4 right-4">
              <div className="w-6 h-6 relative">
                <Hexagon className="w-6 h-6 text-purple-400" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Streck Section */}
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Challenge Streck</h2>
        
        {/* Duration Options */}
        <div className="flex justify-center gap-8 mb-6">
          {/* 3 Days */}
          <div 
            className={`text-center cursor-pointer transition-all ${selectedDuration === '3 Days' ? 'scale-110' : 'scale-100'}`}
            onClick={() => setSelectedDuration('3 Days')}
          >
            <div className="text-white font-medium mb-2">3 Days</div>
            <Triangle className="w-8 h-8 text-purple-400 mx-auto mb-1" />
            <div className="text-xs text-gray-400">DIFFICULTIES</div>
          </div>

          {/* 7 Days - Selected */}
          <div 
            className={`text-center cursor-pointer transition-all ${selectedDuration === '7 Days' ? 'scale-110' : 'scale-100'}`}
            onClick={() => setSelectedDuration('7 Days')}
          >
            <div className="text-white font-medium mb-2">7 Days</div>
            <div className="relative">
              <Flame className="w-12 h-12 text-orange-500 mx-auto mb-1" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-80"></div>
              </div>
            </div>
            <div className="text-xs text-gray-400">Top 3</div>
          </div>

          {/* Right option */}
          <div 
            className={`text-center cursor-pointer transition-all ${selectedDuration === 'LEADERS' ? 'scale-110' : 'scale-100'}`}
            onClick={() => setSelectedDuration('LEADERS')}
          >
            <div className="text-white font-medium mb-2">LEADERS</div>
            <div className="relative">
              <Hexagon className="w-8 h-8 text-purple-400 mx-auto mb-1" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
            </div>
            <div className="text-xs text-gray-400">LEADERBOARDS</div>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="flex justify-center gap-8 mb-6">
          <div 
            className={`text-center cursor-pointer transition-all ${selectedDifficulty === 'Easy' ? 'scale-110' : 'scale-100'}`}
            onClick={() => setSelectedDifficulty('Easy')}
          >
            <Triangle className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <div className="text-sm text-white">Easy</div>
          </div>

          <div 
            className={`text-center cursor-pointer transition-all ${selectedDifficulty === 'Medium' ? 'scale-110' : 'scale-100'}`}
            onClick={() => setSelectedDifficulty('Medium')}
          >
            <Square className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <div className="text-sm text-white">Medium</div>
          </div>

          <div 
            className={`text-center cursor-pointer transition-all ${selectedDifficulty === 'Hard' ? 'scale-110' : 'scale-100'}`}
            onClick={() => setSelectedDifficulty('Hard')}
          >
            <Hexagon className="w-6 h-6 text-blue-400 mx-auto mb-1" />
            <div className="text-sm text-white">Hard</div>
          </div>
        </div>

        {/* Info text */}
        <div className="text-center text-xs text-gray-400 mb-8">
          Hop 316503 uses Leretidos, der simtoall rem
        </div>
      </div>

      {/* Start Challenge Button */}
      <div className="px-6 mb-8">
        <button 
          className="w-full py-4 rounded-2xl font-bold text-lg text-white"
          style={{
            background: 'linear-gradient(90deg, #FF6B9D 0%, #8B45FF 50%, #3B82F6 100%)'
          }}
        >
          Start Challenge
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-gray-800">
        <div className="flex justify-around items-center py-4">
          <Triangle className="w-6 h-6 text-purple-400" />
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          </div>
          <div className="relative">
            <Hexagon className="w-8 h-8 text-purple-400" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 relative">
                {/* V Logo mini */}
                <div className="absolute w-2 h-2 transform rotate-45 bg-purple-400 top-0 left-0"></div>
                <div className="absolute w-2 h-2 transform rotate-45 bg-blue-400 top-0 right-0"></div>
              </div>
            </div>
          </div>
          <div className="w-6 h-6 bg-gray-600 rounded-sm"></div>
          <User className="w-6 h-6 text-gray-400" />
        </div>
        
        {/* Home gesture bar */}
        <div className="w-32 h-1 bg-white rounded-full mx-auto mb-2"></div>
      </div>
    </div>
  );
};

export default VitalForcePage;
