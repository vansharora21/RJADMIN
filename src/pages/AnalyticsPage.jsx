import Header from "../components/common/Header";

import OverviewCards from "../components/analytics/OverviewCards";
import RevenueChart from "../components/analytics/RevenueChart";
import ChannelPerformance from "../components/analytics/ChannelPerformance";
import ProductPerformance from "../components/analytics/ProductPerformance";
import UserRetention from "../components/analytics/UserRetention";
import CustomerSegmentation from "../components/analytics/CustomerSegmentation";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";

const AnalyticsPage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
            <Header title="Support & Escalation Management Console" />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                {/* Support Dashboard Overview */}
                <div className='mb-6'>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-2xl font-bold text-white'>Support Dashboard</h1>
                        <div className='flex space-x-2'>
                            <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm'>
                                Refresh Data
                            </button>
                            <button className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm'>
                                Export Report
                            </button>
                        </div>
                    </div>
                    <div className='bg-gray-800 rounded-lg p-4 mb-4'>
                        <div className='flex items-center space-x-4'>
                            <div className='flex items-center space-x-2'>
                                <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
                                <span className='text-white text-sm'>System Status: Online</span>
                            </div>
                            <div className='text-gray-400 text-sm'>Last Updated: {new Date().toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                {/* Support Metrics Overview */}
                <OverviewCards />
                
                {/* Ticket Status Distribution */}
                <RevenueChart />

                {/* Support Ticket View & Respond Section */}
                <div className='bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-8'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-xl font-semibold text-white flex items-center'>
                            <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                                <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/>
                            </svg>
                            Support Ticket Management
                        </h2>
                        <div className='flex space-x-2'>
                            <select className='bg-gray-700 text-white px-3 py-1 rounded-md text-sm border border-gray-600'>
                                <option>All Priorities</option>
                                <option>Critical</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                            <input 
                                type='text' 
                                placeholder='Search tickets...' 
                                className='bg-gray-700 text-white px-3 py-1 rounded-md text-sm border border-gray-600 w-48'
                            />
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                        <div className='lg:col-span-2'>
                            {/* Inline Ticket List */}
                            <div className='bg-gray-700 rounded-lg p-4'>
                                <h3 className='text-lg font-medium text-white mb-4'>Active Support Tickets</h3>
                                <div className='space-y-3'>
                                    <div className='bg-gray-600 rounded-lg p-4 border-l-4 border-red-500'>
                                        <div className='flex justify-between items-start mb-2'>
                                            <div>
                                                <span className='text-white font-medium'>Ticket #ST-2025-001</span>
                                                <span className='ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs'>Critical</span>
                                            </div>
                                            <span className='text-gray-400 text-sm'>2 hours ago</span>
                                        </div>
                                        <p className='text-gray-300 text-sm mb-2'>Payment gateway integration failure - MegaMart Chain</p>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-gray-400 text-xs'>Assigned to: John Smith</span>
                                            <div className='flex space-x-2'>
                                                <button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs'>
                                                    Respond
                                                </button>
                                                <button className='bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-xs'>
                                                    Escalate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='bg-gray-600 rounded-lg p-4 border-l-4 border-yellow-500'>
                                        <div className='flex justify-between items-start mb-2'>
                                            <div>
                                                <span className='text-white font-medium'>Ticket #ST-2025-002</span>
                                                <span className='ml-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs'>High</span>
                                            </div>
                                            <span className='text-gray-400 text-sm'>4 hours ago</span>
                                        </div>
                                        <p className='text-gray-300 text-sm mb-2'>Inventory sync issues - TechStore Plus</p>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-gray-400 text-xs'>Assigned to: Sarah Johnson</span>
                                            <div className='flex space-x-2'>
                                                <button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs'>
                                                    Respond
                                                </button>
                                                <button className='bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs'>
                                                    Resolve
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='bg-gray-600 rounded-lg p-4 border-l-4 border-blue-500'>
                                        <div className='flex justify-between items-start mb-2'>
                                            <div>
                                                <span className='text-white font-medium'>Ticket #ST-2025-003</span>
                                                <span className='ml-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs'>Medium</span>
                                            </div>
                                            <span className='text-gray-400 text-sm'>1 day ago</span>
                                        </div>
                                        <p className='text-gray-300 text-sm mb-2'>Account access request - QuickShop Ltd</p>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-gray-400 text-xs'>Assigned to: Mike Chen</span>
                                            <div className='flex space-x-2'>
                                                <button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs'>
                                                    Respond
                                                </button>
                                                <button className='bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs'>
                                                    Resolve
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className='bg-gray-700 rounded-lg p-4'>
                            <h3 className='text-lg font-medium text-white mb-3'>Quick Actions</h3>
                            <div className='space-y-3'>
                                <button className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center'>
                                    <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                                        <path d='M10 12a2 2 0 100-4 2 2 0 000 4z'/>
                                        <path fillRule='evenodd' d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'/>
                                    </svg>
                                    View All Tickets (47)
                                </button>
                                <button className='w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center'>
                                    <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'/>
                                    </svg>
                                    Critical Issues (12)
                                </button>
                                <button className='w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center'>
                                    <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'/>
                                    </svg>
                                    Escalate Queue (8)
                                </button>
                                <button className='w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center'>
                                    <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'/>
                                    </svg>
                                    Auto-Resolve (23)
                                </button>
                            </div>
                            
                            <div className='mt-6 pt-4 border-t border-gray-600'>
                                <h4 className='text-sm font-medium text-gray-300 mb-2'>Response Templates</h4>
                                <div className='space-y-2'>
                                    <button className='w-full text-left text-sm text-gray-400 hover:text-white p-2 hover:bg-gray-600 rounded'>
                                        Technical Issue Resolution
                                    </button>
                                    <button className='w-full text-left text-sm text-gray-400 hover:text-white p-2 hover:bg-gray-600 rounded'>
                                        Billing Query Response
                                    </button>
                                    <button className='w-full text-left text-sm text-gray-400 hover:text-white p-2 hover:bg-gray-600 rounded'>
                                        Account Access Help
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Retailer Query Management Section */}
                <div className='bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-8'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-xl font-semibold text-white flex items-center'>
                            <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                                <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z'/>
                            </svg>
                            Retailer Query Management
                        </h2>
                        <div className='flex space-x-2'>
                            <button className='bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm'>
                                Bulk Actions
                            </button>
                            <button className='bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm'>
                                Export Queries
                            </button>
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                        <div className='lg:col-span-2'>
                            {/* Inline Retailer Query List */}
                            <div className='bg-gray-700 rounded-lg p-4'>
                                <h3 className='text-lg font-medium text-white mb-4'>Recent Retailer Queries</h3>
                                <div className='space-y-3'>
                                    <div className='bg-gray-600 rounded-lg p-4'>
                                        <div className='flex justify-between items-start mb-2'>
                                            <div>
                                                <span className='text-white font-medium'>MegaMart Chain</span>
                                                <span className='ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs'>Product Issue</span>
                                            </div>
                                            <span className='text-gray-400 text-sm'>30 min ago</span>
                                        </div>
                                        <p className='text-gray-300 text-sm mb-2'>Bulk product upload failing for electronics category</p>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-gray-400 text-xs'>Query ID: RQ-2025-045</span>
                                            <div className='flex space-x-2'>
                                                <button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs'>
                                                    Reply
                                                </button>
                                                <button className='bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs'>
                                                    Resolve
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='bg-gray-600 rounded-lg p-4'>
                                        <div className='flex justify-between items-start mb-2'>
                                            <div>
                                                <span className='text-white font-medium'>TechStore Plus</span>
                                                <span className='ml-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs'>Billing</span>
                                            </div>
                                            <span className='text-gray-400 text-sm'>1 hour ago</span>
                                        </div>
                                        <p className='text-gray-300 text-sm mb-2'>Commission calculation discrepancy for last month</p>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-gray-400 text-xs'>Query ID: RQ-2025-044</span>
                                            <div className='flex space-x-2'>
                                                <button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs'>
                                                    Reply
                                                </button>
                                                <button className='bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-xs'>
                                                    Forward
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='bg-gray-600 rounded-lg p-4'>
                                        <div className='flex justify-between items-start mb-2'>
                                            <div>
                                                <span className='text-white font-medium'>QuickShop Ltd</span>
                                                <span className='ml-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs'>Technical</span>
                                            </div>
                                            <span className='text-gray-400 text-sm'>3 hours ago</span>
                                        </div>
                                        <p className='text-gray-300 text-sm mb-2'>API integration documentation request</p>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-gray-400 text-xs'>Query ID: RQ-2025-043</span>
                                            <div className='flex space-x-2'>
                                                <button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs'>
                                                    Reply
                                                </button>
                                                <button className='bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs'>
                                                    Resolve
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className='space-y-4'>
                            <div className='bg-gray-700 rounded-lg p-4'>
                                <h3 className='text-lg font-medium text-white mb-3'>Query Categories</h3>
                                <div className='space-y-3'>
                                    <div className='flex justify-between items-center p-3 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors'>
                                        <div className='flex items-center space-x-3'>
                                            <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                                            <span className='text-white font-medium'>Product Issues</span>
                                        </div>
                                        <span className='bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold'>12</span>
                                    </div>
                                    <div className='flex justify-between items-center p-3 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors'>
                                        <div className='flex items-center space-x-3'>
                                            <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
                                            <span className='text-white font-medium'>Billing Queries</span>
                                        </div>
                                        <span className='bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-bold'>8</span>
                                    </div>
                                    <div className='flex justify-between items-center p-3 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors'>
                                        <div className='flex items-center space-x-3'>
                                            <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                                            <span className='text-white font-medium'>Technical Support</span>
                                        </div>
                                        <span className='bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-bold'>15</span>
                                    </div>
                                    <div className='flex justify-between items-center p-3 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors'>
                                        <div className='flex items-center space-x-3'>
                                            <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                                            <span className='text-white font-medium'>Account Management</span>
                                        </div>
                                        <span className='bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold'>6</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='bg-gray-700 rounded-lg p-4'>
                                <h3 className='text-lg font-medium text-white mb-3'>Priority Retailers</h3>
                                <div className='space-y-2'>
                                    <div className='flex justify-between items-center p-2 bg-gray-600 rounded'>
                                        <span className='text-white text-sm'>MegaMart Chain</span>
                                        <span className='text-red-400 text-xs'>3 Open</span>
                                    </div>
                                    <div className='flex justify-between items-center p-2 bg-gray-600 rounded'>
                                        <span className='text-white text-sm'>TechStore Plus</span>
                                        <span className='text-yellow-400 text-xs'>2 Open</span>
                                    </div>
                                    <div className='flex justify-between items-center p-2 bg-gray-600 rounded'>
                                        <span className='text-white text-sm'>QuickShop Ltd</span>
                                        <span className='text-blue-400 text-xs'>1 Open</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Push Notifications/Announcements Section */}
                <div className='bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-8'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-xl font-semibold text-white flex items-center'>
                            <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                                <path d='M10 2L3 7v11a2 2 0 002 2h4v-6h2v6h4a2 2 0 002-2V7l-7-5z'/>
                            </svg>
                            Push Notifications & Announcements
                        </h2>
                        <div className='flex space-x-2'>
                            <button className='bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm'>
                                Schedule Notification
                            </button>
                            <button className='bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md text-sm'>
                                Broadcast Alert
                            </button>
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                        <div className='lg:col-span-2'>
                            {/* Inline Notification Creation Form */}
                            <div className='bg-gray-700 rounded-lg p-4'>
                                <h3 className='text-lg font-medium text-white mb-4'>Create New Announcement</h3>
                                <div className='space-y-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-300 mb-2'>Announcement Title</label>
                                        <input 
                                            type='text' 
                                            placeholder='Enter announcement title...' 
                                            className='w-full bg-gray-600 text-white px-3 py-2 rounded-md border border-gray-500 focus:border-blue-500 focus:outline-none'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-300 mb-2'>Message Content</label>
                                        <textarea 
                                            placeholder='Enter your message...' 
                                            rows='4'
                                            className='w-full bg-gray-600 text-white px-3 py-2 rounded-md border border-gray-500 focus:border-blue-500 focus:outline-none'
                                        ></textarea>
                                    </div>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <label className='block text-sm font-medium text-gray-300 mb-2'>Priority Level</label>
                                            <select className='w-full bg-gray-600 text-white px-3 py-2 rounded-md border border-gray-500'>
                                                <option>Normal</option>
                                                <option>High</option>
                                                <option>Critical</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className='block text-sm font-medium text-gray-300 mb-2'>Target Audience</label>
                                            <select className='w-full bg-gray-600 text-white px-3 py-2 rounded-md border border-gray-500'>
                                                <option>All Retailers</option>
                                                <option>Premium Retailers</option>
                                                <option>New Retailers</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='flex space-x-3'>
                                        <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex-1'>
                                            Send Now
                                        </button>
                                        <button className='bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex-1'>
                                            Schedule Later
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className='space-y-4'>
                            <div className='bg-gray-700 rounded-lg p-4'>
                                <h3 className='text-lg font-medium text-white mb-3'>Recent Announcements</h3>
                                <div className='space-y-3 max-h-64 overflow-y-auto'>
                                    <div className='p-3 bg-gray-600 rounded-lg border-l-4 border-red-500'>
                                        <div className='flex justify-between items-start mb-2'>
                                            <span className='text-white font-medium text-sm'>System Maintenance</span>
                                            <span className='text-gray-400 text-xs'>2 hours ago</span>
                                        </div>
                                        <p className='text-gray-300 text-xs'>Scheduled maintenance window tonight 11 PM - 2 AM EST</p>
                                        <div className='flex items-center mt-2'>
                                            <span className='text-green-400 text-xs'>✓ Delivered to 1,247 users</span>
                                        </div>
                                    </div>
                                    <div className='p-3 bg-gray-600 rounded-lg border-l-4 border-blue-500'>
                                        <div className='flex justify-between items-start mb-2'>
                                            <span className='text-white font-medium text-sm'>New Feature Release</span>
                                            <span className='text-gray-400 text-xs'>1 day ago</span>
                                        </div>
                                        <p className='text-gray-300 text-xs'>Enhanced reporting dashboard now available with real-time analytics</p>
                                        <div className='flex items-center mt-2'>
                                            <span className='text-green-400 text-xs'>✓ Delivered to 2,156 users</span>
                                        </div>
                                    </div>
                                    <div className='p-3 bg-gray-600 rounded-lg border-l-4 border-yellow-500'>
                                        <div className='flex justify-between items-start mb-2'>
                                            <span className='text-white font-medium text-sm'>Policy Update</span>
                                            <span className='text-gray-400 text-xs'>3 days ago</span>
                                        </div>
                                        <p className='text-gray-300 text-xs'>Updated terms of service effective next month</p>
                                        <div className='flex items-center mt-2'>
                                            <span className='text-yellow-400 text-xs'>⏳ Pending delivery to 892 users</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='bg-gray-700 rounded-lg p-4'>
                                <h3 className='text-lg font-medium text-white mb-3'>Notification Stats</h3>
                                <div className='space-y-2'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-300 text-sm'>Total Sent Today</span>
                                        <span className='text-white font-bold'>3,247</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-300 text-sm'>Delivery Rate</span>
                                        <span className='text-green-400 font-bold'>98.2%</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-300 text-sm'>Open Rate</span>
                                        <span className='text-blue-400 font-bold'>76.5%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Escalation Matrix & Analytics */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                    <div className='bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6'>
                        <h3 className='text-lg font-semibold text-white mb-4 flex items-center'>
                            <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'/>
                            </svg>
                            Escalation Matrix
                        </h3>
                        {/* Inline Escalation Rules */}
                        <div className='space-y-4'>
                            <div className='bg-gray-700 rounded-lg p-4'>
                                <h4 className='text-white font-medium mb-3'>Escalation Rules</h4>
                                <div className='space-y-3'>
                                    <div className='flex justify-between items-center p-2 bg-gray-600 rounded'>
                                        <span className='text-white text-sm'>Critical Issues</span>
                                        <span className='text-red-400 text-xs'>Immediate</span>
                                    </div>
                                    <div className='flex justify-between items-center p-2 bg-gray-600 rounded'>
                                        <span className='text-white text-sm'>High Priority</span>
                                        <span className='text-yellow-400 text-xs'>2 Hours</span>
                                    </div>
                                    <div className='flex justify-between items-center p-2 bg-gray-600 rounded'>
                                        <span className='text-white text-sm'>Medium Priority</span>
                                        <span className='text-blue-400 text-xs'>24 Hours</span>
                                    </div>
                                    <div className='flex justify-between items-center p-2 bg-gray-600 rounded'>
                                        <span className='text-white text-sm'>Low Priority</span>
                                        <span className='text-green-400 text-xs'>72 Hours</span>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-gray-700 rounded-lg p-4'>
                                <h4 className='text-white font-medium mb-3'>Escalation Levels</h4>
                                <div className='space-y-2'>
                                    <div className='text-sm text-gray-300'>Level 1: Support Agent</div>
                                    <div className='text-sm text-gray-300'>Level 2: Senior Support</div>
                                    <div className='text-sm text-gray-300'>Level 3: Team Lead</div>
                                    <div className='text-sm text-gray-300'>Level 4: Management</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6'>
                        <h3 className='text-lg font-semibold text-white mb-4 flex items-center'>
                            <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                                <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/>
                            </svg>
                            Team Performance
                        </h3>
                        <div className='space-y-4'>
                            <div className='bg-gray-700 rounded-lg p-4'>
                                <div className='flex justify-between items-center mb-2'>
                                    <span className='text-white font-medium'>Agent Response Time</span>
                                    <span className='text-green-400 font-bold'>2.3 min avg</span>
                                </div>
                                <div className='w-full bg-gray-600 rounded-full h-2'>
                                    <div className='bg-green-500 h-2 rounded-full' style={{width: '85%'}}></div>
                                </div>
                            </div>
                            <div className='bg-gray-700 rounded-lg p-4'>
                                <div className='flex justify-between items-center mb-2'>
                                    <span className='text-white font-medium'>Resolution Rate</span>
                                    <span className='text-blue-400 font-bold'>94.2%</span>
                                </div>
                                <div className='w-full bg-gray-600 rounded-full h-2'>
                                    <div className='bg-blue-500 h-2 rounded-full' style={{width: '94%'}}></div>
                                </div>
                            </div>
                            <div className='bg-gray-700 rounded-lg p-4'>
                                <div className='flex justify-between items-center mb-2'>
                                    <span className='text-white font-medium'>Customer Satisfaction</span>
                                    <span className='text-yellow-400 font-bold'>4.7/5.0</span>
                                </div>
                                <div className='w-full bg-gray-600 rounded-full h-2'>
                                    <div className='bg-yellow-500 h-2 rounded-full' style={{width: '94%'}}></div>
                                </div>
                            </div>
                            <div className='bg-gray-700 rounded-lg p-4'>
                                <h4 className='text-white font-medium mb-3'>Active Agents</h4>
                                <div className='space-y-2'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-300 text-sm'>John Smith</span>
                                        <span className='text-green-400 text-xs'>Online - 5 tickets</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-300 text-sm'>Sarah Johnson</span>
                                        <span className='text-green-400 text-xs'>Online - 3 tickets</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-300 text-sm'>Mike Chen</span>
                                        <span className='text-yellow-400 text-xs'>Away - 2 tickets</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI-Powered Insights */}
                <div className='bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6'>
                    <h2 className='text-xl font-semibold text-white mb-4 flex items-center'>
                        <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                            <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z'/>
                        </svg>
                        AI-Powered Support Insights
                    </h2>
                    <AIPoweredInsights />
                </div>
            </main>
        </div>
    );
};

export default AnalyticsPage;
