import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Newspaper, ExternalLink, Clock, Bookmark, Share2, RefreshCw } from 'lucide-react';

// We'll use NewsAPI.org for real news - you'll need to get a free API key
// For now, using a fallback to government sources
const NEWS_API_KEY = 'YOUR_NEWS_API_KEY'; // Users can get this from newsapi.org
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

const NewsCard = ({ article }) => {
    const [saved, setSaved] = useState(false);

    return (
        <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
            {article.urlToImage && (
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&h=400&fit=crop';
                        }}
                    />
                    <div className="absolute top-3 right-3">
                        <Badge className="bg-blue-600 text-white border-none">
                            {article.category || 'Government'}
                        </Badge>
                    </div>
                </div>
            )}

            <CardHeader>
                <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Newspaper className="w-4 h-4" />
                        <span>{article.source?.name || 'Government News'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short'
                        }) : 'Recent'}</span>
                    </div>
                </div>
                <CardTitle className="text-xl leading-snug line-clamp-2">
                    {article.title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {article.description || article.content || 'Read the full article for more details.'}
                </p>

                <div className="flex items-center justify-between pt-4 border-t">
                    <Button
                        variant="link"
                        className="p-0 text-blue-600"
                        onClick={() => window.open(article.url, '_blank')}
                    >
                        Read Full Article <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSaved(!saved)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Bookmark className={`w-4 h-4 ${saved ? 'fill-blue-600 text-blue-600' : 'text-gray-400'}`} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Share2 className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const NewsFeed = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNews();
    }, [selectedCategory]);

    const fetchNews = async () => {
        setLoading(true);
        setError(null);

        try {
            // Try to fetch from News API
            const response = await fetch(
                `${NEWS_API_URL}?country=in&category=${selectedCategory}&apiKey=${NEWS_API_KEY}`
            );

            if (response.ok) {
                const data = await response.json();
                if (data.status === 'ok') {
                    setNews(data.articles.slice(0, 12));
                    setLoading(false);
                    return;
                }
            }

            // Fallback to mock data
            throw new Error('Using fallback data');
        } catch (err) {
            console.log('Using mock news data');
            setNews(mockNews);
            setLoading(false);
        }
    };

    const categories = [
        { id: 'general', label: 'All News' },
        { id: 'business', label: 'Business' },
        { id: 'technology', label: 'Technology' },
        { id: 'health', label: 'Health' },
        { id: 'science', label: 'Science' }
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Latest Government News</h1>
                    <p className="text-gray-500 mt-1">Stay updated with the latest developments</p>
                </div>
                <Button variant="outline" onClick={fetchNews}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                </Button>
            </div>

            <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((article, index) => (
                        <NewsCard key={index} article={article} />
                    ))}
                </div>
            )}

            {error && (
                <div className="text-center py-10">
                    <p className="text-red-600">{error}</p>
                </div>
            )}
        </div>
    );
};

// Mock news data as fallback
const mockNews = [
    {
        title: "India eyes chip parity as momentum gains in semiconductor sector",
        description: "India's semiconductor ambitions come as global chip leaders pour billions into expanding capacities for future technologies like AI and electric mobility.",
        source: { name: "Press Information Bureau" },
        url: "https://pib.gov.in",
        urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        category: "Technology"
    },
    {
        title: "New Farm Bill introduces subsidy for sustainable crops",
        description: "The bill aims to promote sustainable agriculture practices and offers substantial subsidies for farmers transitioning to eco-friendly crops.",
        source: { name: "Ministry of Agriculture" },
        url: "https://agricoop.nic.in",
        urlToImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        category: "Agriculture"
    },
    {
        title: "Recruitment drive announced for 50,000 government positions",
        description: "Major recruitment across various ministries to fill vacancies in FY 2026-27, focusing on youth employment.",
        source: { name: "Department of Personnel & Training" },
        url: "https://dopt.gov.in",
        urlToImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        category: "Employment"
    },
    {
        title: "Digital India initiative expands to rural areas",
        description: "New digital infrastructure projects announced for 5000 villages across the country to bridge the digital divide.",
        source: { name: "MeitY" },
        url: "https://meity.gov.in",
        urlToImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 259200000).toISOString(),
        category: "Technology"
    },
    {
        title: "PM launches new health insurance scheme for senior citizens",
        description: "Comprehensive health coverage up to ₹5 lakhs per annum for citizens above 60 years.",
        source: { name: "Ministry of Health" },
        url: "https://mohfw.gov.in",
        urlToImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 345600000).toISOString(),
        category: "Health"
    },
    {
        title: "India achieves renewable energy milestone",
        description: "Country crosses 180 GW of renewable energy capacity, ahead of 2030 targets.",
        source: { name: "Ministry of New & Renewable Energy" },
        url: "https://mnre.gov.in",
        urlToImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 432000000).toISOString(),
        category: "Environment"
    },
    {
        title: "New education policy implementation reaches 75% schools",
        description: "National Education Policy 2020 adopted by three-quarters of schools across the country.",
        source: { name: "Ministry of Education" },
        url: "https://education.gov.in",
        urlToImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 518400000).toISOString(),
        category: "Education"
    },
    {
        title: "Infrastructure investment of ₹100 lakh crore announced",
        description: "Gati Shakti Master Plan to transform India's infrastructure with focus on logistics and connectivity.",
        source: { name: "Ministry of Finance" },
        url: "https://finmin.nic.in",
        urlToImage: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 604800000).toISOString(),
        category: "Infrastructure"
    },
    {
        title: "Startup India initiative crosses 100,000 recognized startups",
        description: "India's startup ecosystem reaches new milestone with over one lakh recognized startups.",
        source: { name: "DPIIT" },
        url: "https://dpiit.gov.in",
        urlToImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 691200000).toISOString(),
        category: "Business"
    }
];

export default NewsFeed;