import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { ChevronRight, Users, TrendingUp, MessageSquare, Eye, Calendar, MapPin, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';

const PoliticalSentimentAnalyzer = () => {
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedParty, setSelectedParty] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Tamil Nadu constituencies data
  const constituencies = [
    {
      id: 1,
      name: "Chennai Central",
      totalVoters: 245000,
      locations: ["T. Nagar", "Anna Nagar", "Egmore", "Thousand Lights"],
      sentimentScore: 0.65,
      totalMentions: 15420
    },
    {
      id: 2,
      name: "Chennai North",
      totalVoters: 198000,
      locations: ["Royapuram", "Kolathur", "Thiru Vi Ka Nagar", "Dr. Radhakrishnan Nagar"],
      sentimentScore: 0.58,
      totalMentions: 12890
    },
    {
      id: 3,
      name: "Chennai South",
      totalVoters: 220000,
      locations: ["Mylapore", "Velachery", "Sholinganallur", "Perungudi"],
      sentimentScore: 0.72,
      totalMentions: 18650
    },
    {
      id: 4,
      name: "Sriperumbudur",
      totalVoters: 185000,
      locations: ["Sriperumbudur Town", "Kanchipuram Rural", "Walajabad", "Thiruporur"],
      sentimentScore: 0.61,
      totalMentions: 9870
    },
    {
      id: 5,
      name: "Kancheepuram",
      totalVoters: 165000,
      locations: ["Kancheepuram City", "Uthiramerur", "Cheyyur", "Madurantakam"],
      sentimentScore: 0.55,
      totalMentions: 8450
    },
    {
      id: 6,
      name: "Arakkonam",
      totalVoters: 178000,
      locations: ["Arakkonam Town", "Nemili", "Sholinghur", "Walajah"],
      sentimentScore: 0.63,
      totalMentions: 7230
    },
    {
      id: 7,
      name: "Vellore",
      totalVoters: 192000,
      locations: ["Vellore City", "Katpadi", "Gudiyatham", "Pernambut"],
      sentimentScore: 0.59,
      totalMentions: 11200
    },
    {
      id: 8,
      name: "Krishnagiri",
      totalVoters: 155000,
      locations: ["Krishnagiri Town", "Hosur", "Denkanikottai", "Pochampalli"],
      sentimentScore: 0.57,
      totalMentions: 6890
    },
    {
      id: 9,
      name: "Dharmapuri",
      totalVoters: 148000,
      locations: ["Dharmapuri Town", "Harur", "Nallampalli", "Pappireddipatti"],
      sentimentScore: 0.52,
      totalMentions: 5670
    },
    {
      id: 10,
      name: "Salem",
      totalVoters: 210000,
      locations: ["Salem City", "Mettur", "Omalur", "Sankari"],
      sentimentScore: 0.66,
      totalMentions: 14320
    }
  ];

  const parties = [
    {
      id: 'DMK',
      name: 'Dravida Munnetra Kazhagam',
      color: '#FF6B35',
      leader: 'M.K. Stalin',
      overallSentiment: {
        positive: 38,
        negative: 42,
        neutral: 20,
        corruption: 25,
        development: 35,
        leadership: 28
      }
    },
    {
      id: 'ADMK',
      name: 'All India Anna Dravida Munnetra Kazhagam',
      color: '#4ECDC4',
      leader: 'Edappadi K. Palaniswami',
      overallSentiment: {
        positive: 32,
        negative: 45,
        neutral: 23,
        corruption: 35,
        development: 28,
        leadership: 22
      }
    },
    {
      id: 'BJP',
      name: 'Bharatiya Janata Party',
      color: '#FF8C42',
      leader: 'K. Annamalai',
      overallSentiment: {
        positive: 28,
        negative: 48,
        neutral: 24,
        corruption: 18,
        development: 32,
        leadership: 25
      }
    },
    {
      id: 'NTK',
      name: 'Naam Tamilar Katchi',
      color: '#6A4C93',
      leader: 'Seeman',
      overallSentiment: {
        positive: 45,
        negative: 35,
        neutral: 20,
        corruption: 12,
        development: 38,
        leadership: 42
      }
    },
    {
      id: 'TVK',
      name: 'Tamilaga Vettri Kazhagam',
      color: '#F72585',
      leader: 'Vijay',
      overallSentiment: {
        positive: 55,
        negative: 25,
        neutral: 20,
        corruption: 8,
        development: 45,
        leadership: 52
      }
    }
  ];

  const socialMediaData = [
    { platform: 'X (Twitter)', mentions: 45230, sentiment: 0.62, engagement: 125000 },
    { platform: 'Facebook', mentions: 38940, sentiment: 0.58, engagement: 89000 },
    { platform: 'Instagram', mentions: 28750, sentiment: 0.71, engagement: 156000 },
    { platform: 'YouTube', mentions: 15680, sentiment: 0.65, engagement: 234000 }
  ];

  const trendingTopics = [
    { topic: '#TamilNaduElections', mentions: 25430, sentiment: 0.55 },
    { topic: '#ChennaiDevelopment', mentions: 18920, sentiment: 0.68 },
    { topic: '#FreebieCulture', mentions: 15670, sentiment: 0.42 },
    { topic: '#Corruption', mentions: 12340, sentiment: 0.35 },
    { topic: '#WomenSafety', mentions: 9870, sentiment: 0.71 },
    { topic: '#Employment', mentions: 8450, sentiment: 0.48 }
  ];

  const getDetailedPartyData = (partyId) => {
    const baseData = {
      DMK: {
        keyIssues: ['Dravidian Ideology', 'Social Justice', 'Tamil Language', 'Welfare Schemes'],
        recentMentions: [
          { date: '2024-08-25', mentions: 1250, sentiment: 0.58 },
          { date: '2024-08-24', mentions: 980, sentiment: 0.62 },
          { date: '2024-08-23', mentions: 1450, sentiment: 0.55 },
          { date: '2024-08-22', mentions: 1120, sentiment: 0.60 }
        ],
        demographics: {
          age: { '18-25': 25, '26-35': 35, '36-50': 28, '50+': 12 },
          gender: { male: 58, female: 42 },
          location: { urban: 62, rural: 38 }
        },
        topHashtags: ['#DMK', '#Stalin', '#DravidianModel', '#TamilNadu']
      },
      ADMK: {
        keyIssues: ['Amma Legacy', 'Agricultural Policies', 'Infrastructure', 'Traditional Values'],
        recentMentions: [
          { date: '2024-08-25', mentions: 890, sentiment: 0.52 },
          { date: '2024-08-24', mentions: 1200, sentiment: 0.48 },
          { date: '2024-08-23', mentions: 950, sentiment: 0.55 },
          { date: '2024-08-22', mentions: 1080, sentiment: 0.50 }
        ],
        demographics: {
          age: { '18-25': 18, '26-35': 28, '36-50': 35, '50+': 19 },
          gender: { male: 52, female: 48 },
          location: { urban: 45, rural: 55 }
        },
        topHashtags: ['#ADMK', '#EPS', '#AmmaLegacy', '#GoldenRule']
      },
      BJP: {
        keyIssues: ['National Integration', 'Development', 'Hindu Values', 'Central Schemes'],
        recentMentions: [
          { date: '2024-08-25', mentions: 670, sentiment: 0.48 },
          { date: '2024-08-24', mentions: 780, sentiment: 0.52 },
          { date: '2024-08-23', mentions: 590, sentiment: 0.45 },
          { date: '2024-08-22', mentions: 720, sentiment: 0.50 }
        ],
        demographics: {
          age: { '18-25': 22, '26-35': 32, '36-50': 30, '50+': 16 },
          gender: { male: 65, female: 35 },
          location: { urban: 75, rural: 25 }
        },
        topHashtags: ['#BJP', '#ModiInTN', '#Development', '#HindutvaInTN']
      },
      NTK: {
        keyIssues: ['Tamil Nationalism', 'Anti-Corruption', 'Youth Employment', 'Tamil Eelam'],
        recentMentions: [
          { date: '2024-08-25', mentions: 1120, sentiment: 0.68 },
          { date: '2024-08-24', mentions: 1340, sentiment: 0.72 },
          { date: '2024-08-23', mentions: 980, sentiment: 0.65 },
          { date: '2024-08-22', mentions: 1200, sentiment: 0.70 }
        ],
        demographics: {
          age: { '18-25': 45, '26-35': 38, '36-50': 15, '50+': 2 },
          gender: { male: 72, female: 28 },
          location: { urban: 68, rural: 32 }
        },
        topHashtags: ['#NTK', '#Seeman', '#TamilNationalism', '#YouthPower']
      },
      TVK: {
        keyIssues: ['Youth Empowerment', 'Clean Politics', 'Technology', 'Progressive Policies'],
        recentMentions: [
          { date: '2024-08-25', mentions: 1890, sentiment: 0.78 },
          { date: '2024-08-24', mentions: 2100, sentiment: 0.82 },
          { date: '2024-08-23', mentions: 1650, sentiment: 0.75 },
          { date: '2024-08-22', mentions: 1980, sentiment: 0.80 }
        ],
        demographics: {
          age: { '18-25': 52, '26-35': 35, '36-50': 11, '50+': 2 },
          gender: { male: 55, female: 45 },
          location: { urban: 78, rural: 22 }
        },
        topHashtags: ['#TVK', '#Thalapathy', '#NewPolitics', '#VijayForChange']
      }
    };
    return baseData[partyId];
  };

  const pieData = constituencies.map(c => ({
    name: c.name,
    value: c.totalMentions,
    sentiment: c.sentimentScore,
    voters: c.totalVoters
  }));

  const COLORS = ['#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];

  const getSentimentColor = (score) => {
    if (score > 0.7) return '#27AE60';
    if (score > 0.5) return '#F39C12';
    return '#E74C3C';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Constituency Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                onClick={(data) => {
                  const constituency = constituencies.find(c => c.name === data.name);
                  setSelectedConstituency(constituency);
                  setActiveTab('constituency');
                }}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} mentions`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Social Media Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={socialMediaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="mentions" fill="#4ECDC4" />
              <Bar dataKey="engagement" fill="#FF6B35" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Overall Party Sentiment Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parties.map(party => (
            <div key={party.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                 onClick={() => {setSelectedParty(party); setActiveTab('party');}}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{party.id}</h4>
                <div className="w-4 h-4 rounded-full" style={{backgroundColor: party.color}}></div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-600">Positive:</span>
                  <span>{party.overallSentiment.positive}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600">Negative:</span>
                  <span>{party.overallSentiment.negative}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-600">Corruption Tagging:</span>
                  <span>{party.overallSentiment.corruption}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Trending Topics</h3>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">{topic.topic}</span>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{topic.mentions} mentions</span>
                <div className={`px-2 py-1 rounded-full text-xs text-white ${getSentimentColor(topic.sentiment) === '#27AE60' ? 'bg-green-500' : getSentimentColor(topic.sentiment) === '#F39C12' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                  {(topic.sentiment * 100).toFixed(0)}% positive
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConstituency = () => {
    if (!selectedConstituency) return <div className="text-center py-8 text-gray-500">Select a constituency from the overview to view details</div>;

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{selectedConstituency.name}</h2>
            <button 
              onClick={() => setSelectedConstituency(null)}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">{selectedConstituency.totalVoters.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Voters</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <MessageSquare className="w-8 h-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">{selectedConstituency.totalMentions.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Social Mentions</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-purple-600">{(selectedConstituency.sentimentScore * 100).toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Positive Sentiment</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <Eye className="w-8 h-8 text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-orange-600">{Math.round(selectedConstituency.totalMentions * 2.3).toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Reach</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Locations in {selectedConstituency.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {selectedConstituency.locations.map((location, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors flex items-center"
                  onClick={() => {setSelectedLocation(location); setActiveTab('location');}}
                >
                  <MapPin className="w-4 h-4 text-gray-600 mr-2" />
                  <span className="text-sm font-medium">{location}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Party Performance in {selectedConstituency.name}</h3>
            <div className="space-y-4">
              {parties.map(party => (
                <div key={party.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                     onClick={() => {setSelectedParty(party); setActiveTab('party');}}>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-3" style={{backgroundColor: party.color}}></div>
                    <span className="font-medium">{party.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-green-600">{party.overallSentiment.positive}% positive</span>
                    <span className="text-red-600">{party.overallSentiment.negative}% negative</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLocation = () => {
    if (!selectedLocation) return <div className="text-center py-8 text-gray-500">Select a location from constituency view to see detailed analysis</div>;

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{selectedLocation}</h2>
            <button 
              onClick={() => setSelectedLocation(null)}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-gray-800">Party Sentiment Analysis</h3>
              {parties.map(party => (
                <div key={party.id} className="mb-4 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                     onClick={() => {setSelectedParty(party); setActiveTab('party');}}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: party.color}}></div>
                      <span className="font-medium text-sm">{party.id}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{party.overallSentiment.positive}%</div>
                      <div className="text-gray-600">Positive</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-red-600">{party.overallSentiment.negative}%</div>
                      <div className="text-gray-600">Negative</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-orange-600">{party.overallSentiment.corruption}%</div>
                      <div className="text-gray-600">Corruption</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-gray-800">Key Metrics for {selectedLocation}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Social Media Mentions</span>
                  <span className="font-semibold">{Math.floor(Math.random() * 5000) + 2000}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Engagement Rate</span>
                  <span className="font-semibold">{(Math.random() * 15 + 5).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Top Platform</span>
                  <span className="font-semibold">X (Twitter)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Voter Turnout (2021)</span>
                  <span className="font-semibold">{(Math.random() * 20 + 65).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderParty = () => {
    if (!selectedParty) return <div className="text-center py-8 text-gray-500">Select a party from any view to see detailed analysis</div>;
    
    const partyData = getDetailedPartyData(selectedParty.id);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedParty.name}</h2>
              <p className="text-gray-600">Leader: {selectedParty.leader}</p>
            </div>
            <button 
              onClick={() => setSelectedParty(null)}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <ThumbsUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-600">{selectedParty.overallSentiment.positive}%</div>
              <div className="text-xs text-gray-600">Positive</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <ThumbsDown className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-red-600">{selectedParty.overallSentiment.negative}%</div>
              <div className="text-xs text-gray-600">Negative</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-xl font-bold text-gray-600">{selectedParty.overallSentiment.neutral}%</div>
              <div className="text-xs text-gray-600">Neutral</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <AlertTriangle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-orange-600">{selectedParty.overallSentiment.corruption}%</div>
              <div className="text-xs text-gray-600">Corruption</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-blue-600">{selectedParty.overallSentiment.development}%</div>
              <div className="text-xs text-gray-600">Development</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-purple-600">{selectedParty.overallSentiment.leadership}%</div>
              <div className="text-xs text-gray-600">Leadership</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-gray-800">Recent Mention Trends</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={partyData.recentMentions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="mentions" stroke={selectedParty.color} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-gray-800">Demographic Breakdown</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 text-gray-700">Age Groups</h4>
                  <div className="space-y-2">
                    {Object.entries(partyData.demographics.age).map(([age, percentage]) => (
                      <div key={age} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{age}</span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{backgroundColor: selectedParty.color, width: `${percentage}%`}}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2 text-gray-700">Gender Distribution</h4>
                  <div className="space-y-2">
                    {Object.entries(partyData.demographics.gender).map(([gender, percentage]) => (
                      <div key={gender} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 capitalize">{gender}</span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{backgroundColor: selectedParty.color, width: `${percentage}%`}}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-gray-800">Key Issues & Topics</h3>
              <div className="flex flex-wrap gap-2">
                {partyData.keyIssues.map((issue, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                    {issue}
                  </span>
                ))}
              </div>
              
              <h4 className="font-medium mt-4 mb-2 text-gray-800">Top Hashtags</h4>
              <div className="flex flex-wrap gap-2">
                {partyData.topHashtags.map((hashtag, index) => (
                  <span key={index} className="px-2 py-1 text-xs rounded" style={{backgroundColor: selectedParty.color + '20', color: selectedParty.color}}>
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-gray-800">Social Media Performance</h3>
              <div className="space-y-4">
                {socialMediaData.map((platform, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{platform.platform}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{Math.floor(platform.mentions * (selectedParty.overallSentiment.positive / 100))}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{backgroundColor: selectedParty.color, width: `${platform.sentiment * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSummary = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Party Comparison Summary</h2>
        
        <div className="grid grid-cols-1 gap-6">
          {parties.map(party => (
            <div key={party.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full mr-3" style={{backgroundColor: party.color}}></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{party.name}</h3>
                    <p className="text-sm text-gray-600">Leader: {party.leader}</p>
                  </div>
                </div>
                <button 
                  className="px-4 py-2 text-sm rounded-lg transition-colors"
                  style={{backgroundColor: party.color + '20', color: party.color}}
                  onClick={() => {setSelectedParty(party); setActiveTab('party');}}
                >
                  View Details
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{party.overallSentiment.positive}%</div>
                  <div className="text-xs text-gray-600">Positive</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {party.overallSentiment.positive > 40 ? '🔥 Strong' : party.overallSentiment.positive > 30 ? '👍 Good' : '⚠️ Weak'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{party.overallSentiment.negative}%</div>
                  <div className="text-xs text-gray-600">Negative</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {party.overallSentiment.negative > 45 ? '🚨 High' : party.overallSentiment.negative > 35 ? '⚠️ Medium' : '✅ Low'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{party.overallSentiment.neutral}%</div>
                  <div className="text-xs text-gray-600">Neutral</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {party.overallSentiment.neutral > 25 ? '😐 High' : '🤔 Low'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{party.overallSentiment.corruption}%</div>
                  <div className="text-xs text-gray-600">Corruption Tag</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {party.overallSentiment.corruption > 30 ? '🚫 Critical' : party.overallSentiment.corruption > 20 ? '⚠️ Concern' : '✅ Clean'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{party.overallSentiment.development}%</div>
                  <div className="text-xs text-gray-600">Development</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {party.overallSentiment.development > 40 ? '🚀 Excellent' : party.overallSentiment.development > 30 ? '👍 Good' : '📉 Poor'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{party.overallSentiment.leadership}%</div>
                  <div className="text-xs text-gray-600">Leadership</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {party.overallSentiment.leadership > 45 ? '⭐ Strong' : party.overallSentiment.leadership > 25 ? '👤 Average' : '👎 Weak'}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Overall Sentiment Score:</span>
                  <span className={`font-semibold ${
                    (party.overallSentiment.positive - party.overallSentiment.negative) > 10 ? 'text-green-600' : 
                    (party.overallSentiment.positive - party.overallSentiment.negative) > -10 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {party.overallSentiment.positive - party.overallSentiment.negative > 0 ? '+' : ''}{party.overallSentiment.positive - party.overallSentiment.negative}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded border-l-4 border-green-500">
              <h4 className="font-semibold text-green-700 mb-2">Most Positive Sentiment</h4>
              <p className="text-gray-700">
                TVK leads with 55% positive sentiment, driven by youth appeal and fresh political narrative.
              </p>
            </div>
            <div className="bg-white p-4 rounded border-l-4 border-red-500">
              <h4 className="font-semibold text-red-700 mb-2">Corruption Concerns</h4>
              <p className="text-gray-700">
                ADMK faces highest corruption tagging at 35%, impacting overall public trust.
              </p>
            </div>
            <div className="bg-white p-4 rounded border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-700 mb-2">Development Focus</h4>
              <p className="text-gray-700">
                TVK and NTK lead in development perception, resonating with youth aspirations.
              </p>
            </div>
            <div className="bg-white p-4 rounded border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-700 mb-2">Leadership Appeal</h4>
              <p className="text-gray-700">
                Celebrity factor gives TVK (Vijay) strong leadership perception at 52%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Political Sentiment Analyzer</h1>
              <p className="text-gray-600 mt-1">Real-time social media pulse for Tamil Nadu Politics</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Last Updated: Aug 27, 2025</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Eye className="w-4 h-4" />
                <span>128.4K Total Mentions</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'constituency', label: 'Constituencies', icon: '🗺️' },
              { id: 'location', label: 'Locations', icon: '📍' },
              { id: 'party', label: 'Party Analysis', icon: '🏛️' },
              { id: 'summary', label: 'Summary', icon: '📈' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'constituency' && renderConstituency()}
        {activeTab === 'location' && renderLocation()}
        {activeTab === 'party' && renderParty()}
        {activeTab === 'summary' && renderSummary()}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Data Sources</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• X (Twitter) API</li>
                <li>• Facebook Graph API</li>
                <li>• Instagram Basic Display</li>
                <li>• YouTube Data API</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Methodology</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Natural Language Processing</li>
                <li>• Sentiment Analysis ML</li>
                <li>• Real-time Data Processing</li>
                <li>• Statistical Modeling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Coverage</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• 10 Tamil Nadu Constituencies</li>
                <li>• 5 Major Political Parties</li>
                <li>• 4 Social Media Platforms</li>
                <li>• 24/7 Real-time Monitoring</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="text-sm text-gray-300">
                <p>Demo Application</p>
                <p>Political Analytics Team</p>
                <p className="mt-2 text-gray-400">
                  ⚠️ This is a demonstration app with simulated data for validation purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PoliticalSentimentAnalyzer;
