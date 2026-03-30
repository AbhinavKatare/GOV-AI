import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Search, MapPin, Briefcase, Building2, Clock, IndianRupee, ChevronRight, TrendingUp } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api';

const JobCard = ({ job, onApply, isAuthenticated }) => {
    const matchScore = job.match_score || Math.floor(Math.random() * 20) + 80;

    return (
        <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            <CardHeader>
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <CardTitle className="text-xl mb-2 line-clamp-2">{job.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Building2 className="w-4 h-4" />
                            <span>{job.department || 'Government Department'}</span>
                        </div>
                    </div>
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                            <circle cx="32" cy="32" r="28" stroke="#2563eb" strokeWidth="4" fill="none" strokeDasharray={`${matchScore * 1.75} 1000`} />
                        </svg>
                        <span className="absolute text-sm font-bold text-gray-900">{matchScore}%</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                        {job.job_type || 'Full-time'}
                    </Badge>
                    {matchScore > 90 && (
                        <Badge variant="success" className="bg-green-50 text-green-700 border-green-200">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            High Match
                        </Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent className="flex-1">
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {job.description || 'Government job opportunity with competitive benefits.'}
                </p>

                <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location || 'Pan India'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <IndianRupee className="w-4 h-4" />
                        <span className="font-semibold text-gray-900">{job.salary_range || '₹8-15 LPA'}</span>
                    </div>
                    {job.deadline && (
                        <div className="flex items-center gap-2 text-red-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                                Apply by: {new Date(job.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </span>
                        </div>
                    )}
                </div>

                {job.skills_required && job.skills_required.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                        {job.skills_required.slice(0, 4).map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {skill}
                            </span>
                        ))}
                    </div>
                )}
            </CardContent>

            <div className="p-4 border-t">
                <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => onApply(job)}
                >
                    {isAuthenticated ? 'Quick Apply' : 'Login to Apply'} <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </Card>
    );
};

const SkillProfiling = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            // Since we don't have a jobs endpoint yet, use mock data
            // In production, this would be: const response = await fetch(`${API_BASE_URL}/jobs`);
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
            setJobs(mockJobs);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobs(mockJobs);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = (job) => {
        if (!user) {
            navigate('/login');
            return;
        }
        // Navigate to application page or show application modal
        console.log('Applying for job:', job);
        alert(`Quick Apply for: ${job.title}\n\nYour profile will be submitted. The backend API will handle the application.`);
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.department?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
        return matchesSearch && matchesDepartment;
    });

    const departments = ['All', ...new Set(jobs.map(job => job.department))];

    return (
        <div className="max-w-7xl mx-auto space-y-8 p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Government Job Opportunities</h1>
                    <p className="text-gray-500 mt-1">AI-matched positions based on your skills</p>
                </div>
                {user && (
                    <Button variant="outline" onClick={() => navigate('/skills')}>
                        <Briefcase className="w-4 h-4 mr-2" /> Update Skills
                    </Button>
                )}
            </div>

            <Card className="bg-white p-2 flex items-center shadow-sm">
                <Search className="w-5 h-5 text-gray-400 ml-4" />
                <input
                    type="text"
                    placeholder="Search by job title, department, or skills..."
                    className="flex-1 p-4 text-sm focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button size="lg" className="px-8">Search</Button>
            </Card>

            <div className="flex gap-2 flex-wrap">
                {departments.map(dept => (
                    <button
                        key={dept}
                        onClick={() => setSelectedDepartment(dept)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedDepartment === dept
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {dept}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500 text-sm">
                            Showing <span className="font-bold text-gray-900">{filteredJobs.length}</span> job openings
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            Sort by: <span className="font-bold text-blue-600 cursor-pointer">Match Score</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onApply={handleApply}
                                isAuthenticated={!!user}
                            />
                        ))}
                    </div>

                    {filteredJobs.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
                            <Button className="mt-4" onClick={() => { setSearchQuery(''); setSelectedDepartment('All'); }}>
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

// Mock data
const mockJobs = [
    {
        id: 1,
        title: "Senior UI/UX Designer",
        department: "Department of Digital Innovation",
        description: "Lead design initiatives for government digital services. Create user-centric interfaces for citizen-facing applications.",
        location: "New Delhi",
        salary_range: "₹12-18 LPA",
        job_type: "Full-time",
        deadline: "2026-03-31",
        skills_required: ["Figma", "Adobe XD", "User Research", "Prototyping"],
        is_active: true
    },
    {
        id: 2,
        title: "Data Analyst",
        department: "Ministry of Statistics",
        description: "Analyze government data for policy insights. Work with large datasets to derive actionable intelligence.",
        location: "Mumbai",
        salary_range: "₹8-12 LPA",
        job_type: "Full-time",
        deadline: "2026-04-15",
        skills_required: ["Python", "SQL", "Data Visualization", "Statistics"],
        is_active: true
    },
    {
        id: 3,
        title: "Software Engineer",
        department: "NIC - National Informatics Centre",
        description: "Develop and maintain government web applications. Build scalable systems for national digital platforms.",
        location: "Bangalore",
        salary_range: "₹10-15 LPA",
        job_type: "Full-time",
        deadline: "2026-05-20",
        skills_required: ["React", "Node.js", "PostgreSQL", "REST APIs"],
        is_active: true
    },
    {
        id: 4,
        title: "Cybersecurity Analyst",
        department: "CERT-In",
        description: "Monitor and respond to cybersecurity incidents. Protect government infrastructure from cyber threats.",
        location: "New Delhi",
        salary_range: "₹15-22 LPA",
        job_type: "Full-time",
        deadline: "2026-04-30",
        skills_required: ["Network Security", "Penetration Testing", "SIEM", "Incident Response"],
        is_active: true
    },
    {
        id: 5,
        title: "Policy Analyst",
        department: "NITI Aayog",
        description: "Research and analyze policy proposals. Contribute to national development strategies.",
        location: "New Delhi",
        salary_range: "₹12-18 LPA",
        job_type: "Full-time",
        deadline: "2026-06-15",
        skills_required: ["Policy Research", "Economics", "Data Analysis", "Report Writing"],
        is_active: true
    },
    {
        id: 6,
        title: "Digital Marketing Specialist",
        department: "Ministry of Tourism",
        description: "Promote India's tourism through digital channels. Create engaging campaigns for global audiences.",
        location: "Pan India",
        salary_range: "₹6-10 LPA",
        job_type: "Contract",
        deadline: "2026-03-25",
        skills_required: ["SEO", "Social Media", "Content Creation", "Analytics"],
        is_active: true
    }
];

export default SkillProfiling;
