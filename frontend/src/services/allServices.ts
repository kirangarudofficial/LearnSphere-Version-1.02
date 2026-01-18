// Extended API Services for All 48 Microservices
import apiClient, { PaginationParams } from './api';

// ==================== Phase 1 Services ====================

// Admin Service (Port 3013)
export const adminApi = {
    getSystemStats: () => apiClient.get('/admin/stats'),
    getUsers: (params?: PaginationParams & { role?: string }) =>
        apiClient.get('/admin/users', { params }),
    updateUserRole: (userId: string, role: string) =>
        apiClient.patch(`/admin/users/${userId}/role`, { role }),
    banUser: (userId: string, reason: string) =>
        apiClient.post(`/admin/users/${userId}/ban`, { reason }),
    unbanUser: (userId: string) =>
        apiClient.post(`/admin/users/${userId}/unban`),
    getCourses: (params?: PaginationParams & { status?: string }) =>
        apiClient.get('/admin/courses', { params }),
    approveCourse: (courseId: string) =>
        apiClient.post(`/admin/courses/${courseId}/approve`),
    rejectCourse: (courseId: string, reason: string) =>
        apiClient.post(`/admin/courses/${courseId}/reject`, { reason }),
    getRevenueReport: (startDate: string, endDate: string) =>
        apiClient.get('/admin/revenue', { params: { startDate, endDate } }),
    getActivityLogs: (params?: PaginationParams) =>
        apiClient.get('/admin/activity-logs', { params }),
    getSystemHealth: () => apiClient.get('/admin/health'),
};

// Assessment Service (Port 3009)
export const assessmentApi = {
    // Quizzes
    createQuiz: (data: {
        courseId: string;
        title: string;
        questions: any[];
        passingScore: number;
        timeLimit?: number;
    }) => apiClient.post('/assessments/quizzes', data),
    getQuiz: (quizId: string) => apiClient.get(`/assessments/quizzes/${quizId}`),
    publishQuiz: (quizId: string) =>
        apiClient.post(`/assessments/quizzes/${quizId}/publish`),
    submitQuiz: (quizId: string, answers: any[]) =>
        apiClient.post(`/assessments/quizzes/${quizId}/submit`, { answers }),
    getQuizAnalytics: (quizId: string) =>
        apiClient.get(`/assessments/quizzes/${quizId}/analytics`),
    getMyAttempts: () => apiClient.get('/assessments/my-attempts'),

    // Assignments
    createAssignment: (data: {
        courseId: string;
        title: string;
        description: string;
        dueDate: Date;
        maxScore: number;
    }) => apiClient.post('/assessments/assignments', data),
    getAssignment: (assignmentId: string) =>
        apiClient.get(`/assessments/assignments/${assignmentId}`),
    submitAssignment: (assignmentId: string, content: string, files?: string[]) =>
        apiClient.post(`/assessments/assignments/${assignmentId}/submit`, { content, files }),
    getSubmissions: (assignmentId: string) =>
        apiClient.get(`/assessments/assignments/${assignmentId}/submissions`),
    gradeSubmission: (submissionId: string, score: number, feedback: string) =>
        apiClient.patch(`/assessments/submissions/${submissionId}/grade`, { score, feedback }),
};

// Certificate Service (Port 3011)
export const certificateApi = {
    generateCertificate: (courseId: string) =>
        apiClient.post('/certificates/generate', { courseId }),
    verifyCertificate: (certificateId: string) =>
        apiClient.get(`/certificates/verify/${certificateId}`),
    getMyCertificates: () => apiClient.get('/certificates/my-certificates'),
    getCertificate: (certificateId: string) =>
        apiClient.get(`/certificates/${certificateId}`),
    downloadCertificate: (certificateId: string) =>
        apiClient.get(`/certificates/${certificateId}/download`),
    revokeCertificate: (certificateId: string, reason: string) =>
        apiClient.post(`/certificates/${certificateId}/revoke`, { reason }),
};

// Gamification Service (Port 3012)
export const gamificationApi = {
    awardPoints: (points: number, reason: string) =>
        apiClient.post('/gamification/points', { points, reason }),
    awardBadge: (badgeId: string) =>
        apiClient.post('/gamification/badges', { badgeId }),
    getUserStats: () => apiClient.get('/gamification/stats'),
    getLeaderboard: (limit?: number, category?: string) =>
        apiClient.get('/gamification/leaderboard', { params: { limit, category } }),
    trackAchievement: (achievementType: string, metadata?: any) =>
        apiClient.post('/gamification/achievements/track', { achievementType, metadata }),
    getStreak: () => apiClient.get('/gamification/streak'),
};

// Review Service (Port 3010)
export const reviewApi = {
    createReview: (courseId: string, rating: number, comment: string) =>
        apiClient.post('/reviews', { courseId, rating, comment }),
    updateReview: (reviewId: string, rating?: number, comment?: string) =>
        apiClient.patch(`/reviews/${reviewId}`, { rating, comment }),
    deleteReview: (reviewId: string) =>
        apiClient.delete(`/reviews/${reviewId}`),
    getCourseReviews: (courseId: string, params?: PaginationParams) =>
        apiClient.get(`/reviews/course/${courseId}`, { params }),
    getMyReviews: () => apiClient.get('/reviews/my-reviews'),
    markHelpful: (reviewId: string) =>
        apiClient.post(`/reviews/${reviewId}/helpful`),
    reportReview: (reviewId: string, reason: string) =>
        apiClient.post(`/reviews/${reviewId}/report`, { reason }),
    moderateReview: (reviewId: string, action: string) =>
        apiClient.post(`/reviews/${reviewId}/moderate`, { action }),
};

// ==================== Phase 2 Services ====================

// Forum Service (Port 3021)
export const forumApi = {
    createThread: (courseId: string, title: string, content: string) =>
        apiClient.post('/forum/threads', { courseId, title, content }),
    replyToThread: (threadId: string, content: string) =>
        apiClient.post(`/forum/threads/${threadId}/reply`, { content }),
    getCourseThreads: (courseId: string) =>
        apiClient.get(`/forum/courses/${courseId}/threads`),
    getThreadPosts: (threadId: string) =>
        apiClient.get(`/forum/threads/${threadId}/posts`),
    pinThread: (threadId: string) =>
        apiClient.patch(`/forum/threads/${threadId}/pin`),
    lockThread: (threadId: string) =>
        apiClient.patch(`/forum/threads/${threadId}/lock`),
};

// Webhook Service (Port 3027)
export const webhookApi = {
    registerWebhook: (url: string, events: string[], secret?: string) =>
        apiClient.post('/webhooks', { url, events, secret }),
    triggerEvent: (eventType: string, data: any) =>
        apiClient.post('/webhooks/trigger', { eventType, data }),
    listWebhooks: () => apiClient.get('/webhooks'),
    deactivateWebhook: (webhookId: string) =>
        apiClient.patch(`/webhooks/${webhookId}/deactivate`),
};

// Reporting Service (Port 3028)
export const reportingApi = {
    generateReport: (type: string, filters: any) =>
        apiClient.post('/reports/generate', { type, filters }),
    scheduleReport: (type: string, schedule: string, filters: any) =>
        apiClient.post('/reports/schedule', { type, schedule, filters }),
    exportReport: (reportId: string, format: string) =>
        apiClient.get(`/reports/${reportId}/export`, { params: { format } }),
    getReportHistory: () => apiClient.get('/reports/history'),
};

// Search Service (Port 3029)
export const searchApi = {
    searchCourses: (query: string, filters?: any) =>
        apiClient.get('/search/courses', { params: { query, ...filters } }),
    searchContent: (query: string, filters?: any) =>
        apiClient.get('/search/content', { params: { query, ...filters } }),
    searchUsers: (query: string, filters?: any) =>
        apiClient.get('/search/users', { params: { query, ...filters } }),
    indexDocument: (type: string, id: string, document: any) =>
        apiClient.post('/search/index', { type, id, document }),
    removeFromIndex: (type: string, id: string) =>
        apiClient.delete(`/search/index/${type}/${id}`),
};

// Recommendation Service (Port 3030)
export const recommendationApi = {
    getUserRecommendations: (limit?: number) =>
        apiClient.get('/recommendations/user', { params: { limit } }),
    getSimilarCourses: (courseId: string, limit?: number) =>
        apiClient.get(`/recommendations/course/${courseId}/similar`, { params: { limit } }),
    trackBehavior: (action: string, metadata: any) =>
        apiClient.post('/recommendations/track', { action, metadata }),
    trainModel: () => apiClient.post('/recommendations/train'),
};

// AI Service (Port 3031)
export const aiApi = {
    chatbot: (message: string, courseId?: string) =>
        apiClient.post('/ai/chat', { message, courseId }),
    generateContent: (type: string, context: any) =>
        apiClient.post('/ai/generate', { type, context }),
    autoGrade: (submissionId: string, rubric: any) =>
        apiClient.post('/ai/grade', { submissionId, rubric }),
    analyzeSentiment: (text: string) =>
        apiClient.post('/ai/analyze-sentiment', { text }),
    personalizeLearningPath: (userId: string) =>
        apiClient.get(`/ai/learning-path/${userId}`),
};

// Audit Log Service (Port 3032)
export const auditApi = {
    logEvent: (eventType: string, resourceType: string, resourceId: string, action: string, metadata?: any) =>
        apiClient.post('/audit/log', { eventType, resourceType, resourceId, action, metadata }),
    queryLogs: (filters: any) =>
        apiClient.get('/audit/query', { params: filters }),
    getTimeline: (userId: string) =>
        apiClient.get(`/audit/timeline/${userId}`),
    generateAuditReport: (startDate: string, endDate: string) =>
        apiClient.post('/audit/report', { startDate, endDate }),
};

// Code Execution Service (Port 3033)
export const codeExecApi = {
    executeCode: (code: string, language: string, input?: string) =>
        apiClient.post('/execute', { code, language, input }),
    validateCode: (code: string, language: string) =>
        apiClient.post('/execute/validate', { code, language }),
    runTests: (code: string, tests: any[], language: string) =>
        apiClient.post('/execute/test', { code, tests, language }),
    getExecutionResult: (id: string) =>
        apiClient.get(`/execute/${id}/result`),
};

// Document Management Service (Port 3034)
export const documentApi = {
    uploadDocument: (courseId: string, fileName: string, fileType: string, fileSize: number) =>
        apiClient.post('/documents/upload', { courseId, fileName, fileType, fileSize }),
    getDocument: (id: string) =>
        apiClient.get(`/documents/${id}`),
    listCourseDocuments: (courseId: string) =>
        apiClient.get(`/documents/course/${courseId}`),
    deleteDocument: (id: string) =>
        apiClient.delete(`/documents/${id}`),
    updateMetadata: (id: string, metadata: any) =>
        apiClient.patch(`/documents/${id}`, metadata),
    createNewVersion: (id: string, fileName: string) =>
        apiClient.post(`/documents/${id}/version`, { fileName }),
};

// Feature Flag Service (Port 3035)
export const featureFlagApi = {
    createFlag: (key: string, name: string, description: string, defaultValue: boolean) =>
        apiClient.post('/flags', { key, name, description, defaultValue }),
    evaluateFlag: (key: string, userId?: string, organizationId?: string) =>
        apiClient.get(`/flags/${key}/evaluate`, { params: { userId, organizationId } }),
    updateFlag: (key: string, updates: any) =>
        apiClient.patch(`/flags/${key}`, updates),
    toggleFlag: (key: string) =>
        apiClient.post(`/flags/${key}/toggle`),
    listFlags: () => apiClient.get('/flags'),
    setRollout: (key: string, percentage: number) =>
        apiClient.post(`/flags/${key}/rollout`, { percentage }),
    addOverride: (key: string, isEnabled: boolean, userId?: string, organizationId?: string, variant?: string) =>
        apiClient.post(`/flags/${key}/override`, { isEnabled, userId, organizationId, variant }),
};

// ==================== Phase 4 Services ====================

// Email Service (Port 3038)
export const emailApi = {
    sendEmail: (to: string, subject: string, body: string, from?: string) =>
        apiClient.post('/email/send', { to, subject, body, from }),
    sendTemplateEmail: (to: string, templateId: string, data: any) =>
        apiClient.post('/email/send-template', { to, templateId, data }),
    sendBulkEmail: (recipients: string[], subject: string, body: string) =>
        apiClient.post('/email/send-bulk', { recipients, subject, body }),
    getEmailStatus: (id: string) =>
        apiClient.get(`/email/status/${id}`),
    createTemplate: (name: string, subject: string, body: string) =>
        apiClient.post('/email/templates', { name, subject, body }),
    getTemplates: () => apiClient.get('/email/templates'),
};

// Calendar Service (Port 3039)
export const calendarApi = {
    createEvent: (title: string, description: string, startTime: Date, endTime: Date, attendees?: string[]) =>
        apiClient.post('/calendar/events', { title, description, startTime, endTime, attendees }),
    updateEvent: (id: string, updates: any) =>
        apiClient.patch(`/calendar/events/${id}`, updates),
    deleteEvent: (id: string) =>
        apiClient.delete(`/calendar/events/${id}`),
    getEvent: (id: string) =>
        apiClient.get(`/calendar/events/${id}`),
    getUserEvents: (startDate?: string, endDate?: string) =>
        apiClient.get('/calendar/events', { params: { startDate, endDate } }),
    respondToInvitation: (eventId: string, response: string) =>
        apiClient.post(`/calendar/events/${eventId}/respond`, { response }),
    getUpcomingEvents: (days?: number) =>
        apiClient.get('/calendar/upcoming', { params: { days } }),
};

// Integration Service (Port 3040)
export const integrationApi = {
    connectIntegration: (provider: string, credentials: any) =>
        apiClient.post('/integrations/connect', { provider, credentials }),
    disconnectIntegration: (id: string) =>
        apiClient.delete(`/integrations/${id}/disconnect`),
    syncData: (id: string) =>
        apiClient.post(`/integrations/${id}/sync`),
    getUserIntegrations: () =>
        apiClient.get('/integrations'),
    executeAction: (id: string, action: string, params: any) =>
        apiClient.post(`/integrations/${id}/execute`, { action, params }),
};

// Survey Service (Port 3041)
export const surveyApi = {
    createSurvey: (title: string, description: string, questions: any[]) =>
        apiClient.post('/surveys', { title, description, questions }),
    submitResponse: (surveyId: string, answers: any[]) =>
        apiClient.post(`/surveys/${surveyId}/respond`, { answers }),
    getSurvey: (id: string) =>
        apiClient.get(`/surveys/${id}`),
    getResults: (id: string) =>
        apiClient.get(`/surveys/${id}/results`),
    closeSurvey: (id: string) =>
        apiClient.post(`/surveys/${id}/close`),
};

// Subscription Service (Port 3042)
export const subscriptionApi = {
    createPlan: (name: string, price: number, interval: string, features: any[]) =>
        apiClient.post('/subscriptions/plans', { name, price, interval, features }),
    subscribe: (planId: string) =>
        apiClient.post('/subscriptions/subscribe', { planId }),
    cancelSubscription: (id: string) =>
        apiClient.post(`/subscriptions/${id}/cancel`),
    getMySubscription: () =>
        apiClient.get('/subscriptions/my-subscription'),
};

// Export Service (Port 3043)
export const exportApi = {
    exportData: (type: string, format: string, filters: any) =>
        apiClient.post('/export', { type, format, filters }),
    getJobStatus: (id: string) =>
        apiClient.get(`/export/jobs/${id}`),
};

// Translation Service (Port 3044)
export const translationApi = {
    translateText: (text: string, targetLang: string, sourceLang?: string) =>
        apiClient.post('/translation/translate', { text, targetLang, sourceLang }),
    translateCourse: (courseId: string, targetLang: string) =>
        apiClient.post(`/translation/course/${courseId}`, { targetLang }),
    getSupportedLanguages: () =>
        apiClient.get('/translation/languages'),
};

// Marketing Service (Port 3045)
export const marketingApi = {
    createCampaign: (name: string, type: string, audience: any, content: any) =>
        apiClient.post('/marketing/campaigns', { name, type, audience, content }),
    launchCampaign: (id: string) =>
        apiClient.post(`/marketing/campaigns/${id}/launch`),
    trackClick: (campaignId: string) =>
        apiClient.post(`/marketing/campaigns/${campaignId}/track-click`),
    getCampaignAnalytics: (id: string) =>
        apiClient.get(`/marketing/campaigns/${id}/analytics`),
};

// Affiliate Service (Port 3046)
export const affiliateApi = {
    registerAffiliate: (commissionRate: number) =>
        apiClient.post('/affiliate/register', { commissionRate }),
    trackReferral: (affiliateCode: string) =>
        apiClient.post('/affiliate/track-referral', { affiliateCode }),
    processSale: (affiliateCode: string, saleAmount: number) =>
        apiClient.post('/affiliate/process-sale', { affiliateCode, saleAmount }),
    getEarnings: () =>
        apiClient.get('/affiliate/earnings'),
};

// Waitlist Service (Port 3047)
export const waitlistApi = {
    joinWaitlist: (courseId: string, email: string) =>
        apiClient.post('/waitlist/join', { courseId, email }),
    notifyAvailable: (courseId: string, count: number) =>
        apiClient.post(`/waitlist/course/${courseId}/notify`, { count }),
    getPosition: (entryId: string) =>
        apiClient.get(`/waitlist/entry/${entryId}/position`),
    removeFromWaitlist: (entryId: string) =>
        apiClient.delete(`/waitlist/entry/${entryId}`),
};

// ==================== Analytics & Monitoring ====================

export const analyticsApi = {
    trackEvent: (event: string, properties?: any) =>
        apiClient.post('/analytics/track', { event, properties }),
    getAnalytics: (params: any) =>
        apiClient.get('/analytics', { params }),
    getUserAnalytics: (userId: string) =>
        apiClient.get(`/analytics/users/${userId}`),
    getCourseAnalytics: (courseId: string) =>
        apiClient.get(`/analytics/courses/${courseId}`),
};

// ==================== Other Core Services ====================

export const notificationApi = {
    getNotifications: (params?: PaginationParams) =>
        apiClient.get('/notifications', { params }),
    markAsRead: (id: string) =>
        apiClient.patch(`/notifications/${id}/read`),
    markAllAsRead: () =>
        apiClient.post('/notifications/read-all'),
    getUnreadCount: () =>
        apiClient.get('/notifications/unread-count'),
};

export const progressApi = {
    getProgress: (courseId: string) =>
        apiClient.get(`/progress/${courseId}`),
    updateProgress: (courseId: string, lessonId: string, completed: boolean) =>
        apiClient.put(`/progress/${courseId}/lesson/${lessonId}`, { completed }),
    getCourseCompletion: (courseId: string) =>
        apiClient.get(`/progress/${courseId}/completion`),
};

export const chatApi = {
    sendMessage: (message: string, sessionId?: string) =>
        apiClient.post('/chat/messages', { message, sessionId }),
    getChatHistory: (sessionId: string) =>
        apiClient.get(`/chat/sessions/${sessionId}/messages`),
    getSessions: () =>
        apiClient.get('/chat/sessions'),
};

export const liveStreamingApi = {
    createSession: (courseId: string, title: string, scheduledTime: Date) =>
        apiClient.post('/live/sessions', { courseId, title, scheduledTime }),
    startSession: (sessionId: string) =>
        apiClient.post(`/live/sessions/${sessionId}/start`),
    endSession: (sessionId: string) =>
        apiClient.post(`/live/sessions/${sessionId}/end`),
    getSession: (sessionId: string) =>
        apiClient.get(`/live/sessions/${sessionId}`),
    joinSession: (sessionId: string) =>
        apiClient.post(`/live/sessions/${sessionId}/join`),
};

export const organizationApi = {
    createOrganization: (name: string, description: string) =>
        apiClient.post('/organizations', { name, description }),
    getOrganization: (id: string) =>
        apiClient.get(`/organizations/${id}`),
    updateOrganization: (id: string, updates: any) =>
        apiClient.patch(`/organizations/${id}`, updates),
    addMember: (orgId: string, userId: string, role: string) =>
        apiClient.post(`/organizations/${orgId}/members`, { userId, role }),
    removeMember: (orgId: string, userId: string) =>
        apiClient.delete(`/organizations/${orgId}/members/${userId}`),
};

// Export all APIs
export const allApis = {
    admin: adminApi,
    assessment: assessmentApi,
    certificate: certificateApi,
    gamification: gamificationApi,
    review: reviewApi,
    forum: forumApi,
    webhook: webhookApi,
    reporting: reportingApi,
    search: searchApi,
    recommendation: recommendationApi,
    ai: aiApi,
    audit: auditApi,
    codeExec: codeExecApi,
    document: documentApi,
    featureFlag: featureFlagApi,
    email: emailApi,
    calendar: calendarApi,
    integration: integrationApi,
    survey: surveyApi,
    subscription: subscriptionApi,
    export: exportApi,
    translation: translationApi,
    marketing: marketingApi,
    affiliate: affiliateApi,
    waitlist: waitlistApi,
    analytics: analyticsApi,
    notification: notificationApi,
    progress: progressApi,
    chat: chatApi,
    liveStreaming: liveStreamingApi,
    organization: organizationApi,
};

export default allApis;
