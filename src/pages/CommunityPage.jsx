import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  PenSquare,
  MessageSquare,
  ThumbsUp,
  Eye,
  ChevronRight,
  ChevronLeft,
  X,
  Send,
  ArrowRight,
  FileText
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   EXACT COMMUNITY POSTS DATABASE (MATCHING SCREENSHOT)
   ───────────────────────────────────────────────────────────── */
const INITIAL_POSTS = [
  // Pinned Official Notices
  {
    id: '1',
    isNotice: true,
    category: 'Notice',
    title: 'Important Notice: Privacy Protection',
    commentsCount: 0,
    author: 'ITP',
    authorTag: 'OFFICIAL',
    likes: 0,
    date: '04.24',
    views: 98,
    content: 'We prioritize your candidate privacy and security. All practice logs, diagnostic test metrics, and personal data on Edwaay are encrypted end-to-end.',
    comments: []
  },
  {
    id: '2',
    isNotice: true,
    category: 'Notice',
    title: 'Edwaay Community Board Rules',
    commentsCount: 0,
    author: 'Edwaay',
    authorTag: 'OFFICIAL',
    likes: 2,
    date: '02.21',
    views: 833,
    content: 'Welcome to the Edwaay Candidate Forum! Please maintain respectful discourse, avoid posting unauthorized exam materials, and support fellow candidates.',
    comments: []
  },
  {
    id: '3',
    isNotice: true,
    category: 'Notice',
    title: '[Issue Resolved] Writing - Practice Questions: Build a Sentence',
    commentsCount: 0,
    author: 'ITP',
    authorTag: 'STAFF',
    likes: 1,
    date: '02.19',
    views: 422,
    content: 'The minor sentence construction rendering issue reported on the Writing practice module has been fully patched. All candidate progress is preserved.',
    comments: []
  },
  {
    id: '4',
    isNotice: true,
    category: 'Notice',
    title: '🎉 May 2026 Mock Test Challenge & Review Event Winner Announcement',
    commentsCount: 1,
    author: 'ITP',
    authorTag: 'OFFICIAL',
    likes: 2,
    date: '02.18',
    views: 416,
    content: 'Congratulations to our top 5 score achievers in the May Mock Test Simulation! Pro access passes have been credited to your candidate profiles.',
    comments: [
      { id: 'c1', author: 'sn******', text: 'Congrats to all winners! Excited for the June challenge.', date: '02.18' }
    ]
  },
  {
    id: '5',
    isNotice: true,
    category: 'Notice',
    title: '📢 (Cancellation & Refund) Cancellation & Refund Request Procedure',
    commentsCount: 1,
    author: 'Edwaay',
    authorTag: 'OFFICIAL',
    likes: 2,
    date: '02.06',
    views: 238,
    content: 'Need help updating your subscription plan or requesting support? Follow our automated 24/7 candidate service guidelines.',
    comments: []
  },

  // Regular Community Posts
  {
    id: '6',
    isNotice: false,
    category: 'FREE TOPIC',
    title: 'Writing',
    commentsCount: 1,
    author: 'xi******',
    likes: 0,
    date: '42 minutes ago',
    views: 4,
    content: 'Can anyone review my sample essay intro for IELTS Writing Task 2 regarding renewable energy policies?',
    comments: [
      { id: 'c2', author: 'ta******', text: 'Post your paragraph here! Happy to give feedback.', date: '30 mins ago' }
    ]
  },
  {
    id: '7',
    isNotice: false,
    category: 'TOEFL',
    title: 'Anyone taking TOEFL for US grad school? What is your target score...',
    commentsCount: 1,
    author: 'ft******',
    likes: 0,
    date: '1 hour(s) ago',
    views: 8,
    content: 'I am applying for Computer Science MS programs. My target is 100+ with 25+ in speaking. How many hours a day are you studying?',
    comments: []
  },
  {
    id: '8',
    isNotice: false,
    category: 'TOEFL',
    title: 'Does it lower my score if I get the first part (module 1) wrong?',
    commentsCount: 2,
    author: 'sn******',
    likes: 2,
    date: '06.12',
    views: 52,
    content: 'I felt Module 1 of Reading was tricky. Does adaptive scoring penalize early errors heavily?',
    comments: [
      { id: 'c3', author: 'Edwaay Mentor', text: 'Adaptive test engines dynamically adjust Module 2 difficulty, but maintaining accuracy across Module 2 still yields top score bands!', date: '06.12' }
    ]
  },
  {
    id: '9',
    isNotice: false,
    category: 'FREE TOPIC',
    title: 'Took the Edwaay Mock Test!',
    commentsCount: 1,
    author: 'ck******',
    likes: 1,
    date: '06.11',
    views: 22,
    content: 'After studying the Vocab Chart matrix for 10 days, my Reading score improved by 80 points! Highly recommend daily practice.',
    comments: []
  },
  {
    id: '10',
    isNotice: false,
    category: 'TOEFL',
    title: 'How many minutes does everyone usually take for Reading task 1??',
    commentsCount: 5,
    author: 'wj******',
    likes: 2,
    date: '06.11',
    views: 48,
    content: 'I spend almost 18 minutes on passage 1 and run out of time on passage 3. What pacing strategy works best for you?',
    comments: []
  },
  {
    id: '11',
    isNotice: false,
    category: 'TOEFL',
    title: 'Took the June Edwaay Mock Test',
    commentsCount: 1,
    author: 'yo******',
    likes: 1,
    date: '06.10',
    views: 19,
    content: 'Scored 28 in Listening, 26 in Reading, 24 in Speaking. Aiming for 26+ in Speaking for teaching assistantships.',
    comments: []
  },
  {
    id: '12',
    isNotice: false,
    category: 'TOEFL',
    title: 'Took the June Edwaay Mock Test',
    commentsCount: 1,
    author: 'ka******',
    likes: 1,
    date: '06.10',
    views: 15,
    content: 'The listening audio passages in this month simulation were super realistic. Great practice before test day.',
    comments: []
  },
  {
    id: '13',
    isNotice: false,
    category: 'IELTS',
    title: 'Best tips for IELTS Speaking Part 3 abstract questions',
    commentsCount: 3,
    author: 'ma******',
    likes: 3,
    date: '06.09',
    views: 34,
    content: 'How do you structure responses when examiners ask broad opinion questions about technology and society?',
    comments: []
  },
  {
    id: '14',
    isNotice: false,
    category: 'FREE TOPIC',
    title: 'Vocabulary flashcard summary notes shared',
    commentsCount: 2,
    author: 'rh******',
    likes: 4,
    date: '06.08',
    views: 89,
    content: 'Compiled 40 essential academic verbs and adjectives from the Vocab Chart. Check out the matrix tab!',
    comments: []
  }
];

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form state
  const [newPostCategory, setNewPostCategory] = useState('TOEFL');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostAuthor, setNewPostAuthor] = useState('');

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const userPosts = posts.filter(p => !p.isNotice);
    return {
      All: posts.length,
      TOEFL: userPosts.filter(p => p.category === 'TOEFL').length,
      IELTS: userPosts.filter(p => p.category === 'IELTS').length,
      PTE: userPosts.filter(p => p.category === 'PTE').length,
      'Free Topic': userPosts.filter(p => p.category === 'FREE TOPIC' || p.category === 'Free Topic').length
    };
  }, [posts]);

  // Filter & sort
  const filteredPosts = useMemo(() => {
    let list = [...posts];

    // Filter by Category
    if (activeCategory !== 'All') {
      if (activeCategory === 'Free Topic') {
        list = list.filter((p) => p.isNotice || p.category === 'FREE TOPIC' || p.category === 'Free Topic');
      } else {
        list = list.filter((p) => p.isNotice || p.category.toUpperCase() === activeCategory.toUpperCase());
      }
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q));
    }

    // Sort
    if (sortBy === 'Most Viewed') {
      list.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'Most Liked') {
      list.sort((a, b) => b.likes - a.likes);
    }

    return list;
  }, [posts, activeCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage]);

  const handleOpenPost = (post) => {
    const updatedPost = { ...post, views: post.views + 1 };
    setSelectedPost(updatedPost);
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p)));
  };

  const handleLikePost = (postId, e) => {
    if (e) e.stopPropagation();
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)));
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => ({ ...prev, likes: prev.likes + 1 }));
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !selectedPost) return;

    const newC = {
      id: 'c_' + Date.now(),
      author: 'You (Candidate)',
      text: newCommentText.trim(),
      date: 'Just now'
    };

    const updatedPost = {
      ...selectedPost,
      commentsCount: selectedPost.commentsCount + 1,
      comments: [...(selectedPost.comments || []), newC]
    };

    setSelectedPost(updatedPost);
    setPosts((prev) => prev.map((p) => (p.id === selectedPost.id ? updatedPost : p)));
    setNewCommentText('');
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newP = {
      id: String(Date.now()),
      isNotice: false,
      category: newPostCategory.toUpperCase(),
      title: newPostTitle.trim(),
      commentsCount: 0,
      author: newPostAuthor.trim() || 'student_' + Math.floor(10 + Math.random() * 89),
      likes: 0,
      date: 'Just now',
      views: 1,
      content: newPostContent.trim(),
      comments: []
    };

    setPosts([newP, ...posts]);
    setIsWriteModalOpen(false);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostAuthor('');
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] dark:bg-[#061317] text-slate-900 dark:text-[#E6F5F7] transition-colors duration-300 py-6 sm:py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── 2-COLUMN LAYOUT: SIDEBAR (LEFT) & BOARD (RIGHT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ─────────────────────────────────────────────────────────────
             LEFT SIDEBAR (3 COLS)
             ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* WRITE POST BUTTON */}
            <button
              type="button"
              onClick={() => setIsWriteModalOpen(true)}
              className="w-full py-3.5 rounded-2xl bg-[#0b1728] dark:bg-[#0097B2] hover:bg-[#0097B2] dark:hover:bg-[#00788E] text-white text-xs font-black uppercase tracking-wider shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer group"
            >
              <PenSquare className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>WRITE POST</span>
            </button>

            {/* REVIEWS CARD */}
            <div
              onClick={() => { setActiveCategory('Reviews'); setCurrentPage(1); }}
              className="p-4 rounded-2xl bg-white dark:bg-[#0d242b] border border-slate-200/80 dark:border-zinc-800 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#0097B2] transition-colors"
            >
              <span className="text-xs font-extrabold text-slate-800 dark:text-zinc-200">Reviews</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>

            {/* COMMUNITY CATEGORIES LIST */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0d242b] border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 block px-1">
                COMMUNITY
              </span>

              <div className="space-y-1">
                {[
                  { id: 'All', label: 'All', count: categoryCounts.All },
                  { id: 'TOEFL', label: 'TOEFL', count: categoryCounts.TOEFL },
                  { id: 'IELTS', label: 'IELTS', count: categoryCounts.IELTS },
                  { id: 'Free Topic', label: 'Free Topic', count: categoryCounts['Free Topic'] }
                ].map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setCurrentPage(1);
                      }}
                      className={`w-full px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#E6F5F7] dark:bg-[#0097B2]/20 text-[#0097B2] dark:text-cyan-300 font-extrabold'
                          : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-900'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isActive
                          ? 'bg-[#0097B2] text-white'
                          : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GET IN TOUCH WITH EDWAAY */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0d242b] border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-3">
              <div>
                <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
                  GET IN TOUCH WITH EDWAAY
                </span>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5">
                  Contact Us
                </h4>
              </div>

              <a
                href="mailto:support@edwaay.com"
                className="w-9 h-9 rounded-full bg-cyan-500/10 dark:bg-[#0097B2]/20 text-[#0097B2] dark:text-cyan-300 flex items-center justify-center hover:bg-[#0097B2] hover:text-white transition-all shadow-xs"
              >
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* ─────────────────────────────────────────────────────────────
             RIGHT MAIN BOARD TABLE (9 COLS)
             ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-9 space-y-4">
            
            {/* BOARD HEADER BAR */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {activeCategory === 'All' ? 'All Posts Board' : `${activeCategory} Board`}
                </h1>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-bold mt-0.5">
                  Found: {filteredPosts.length} entries registered
                </p>
              </div>

              {/* SEARCH & SORT CONTROLS */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Search Box */}
                <div className="relative min-w-[200px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search titles, authors..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-[#0d242b] border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
                  />
                </div>

                {/* Sort Tabs */}
                <div className="flex items-center p-0.5 rounded-xl bg-white dark:bg-[#0d242b] border border-slate-200 dark:border-zinc-800 text-xs font-bold">
                  {['Newest', 'Most Viewed', 'Most Liked'].map((sort) => (
                    <button
                      key={sort}
                      type="button"
                      onClick={() => setSortBy(sort)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        sortBy === sort
                          ? 'bg-[#0b1728] dark:bg-[#0097B2] text-white shadow-xs'
                          : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
                      }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* TABLE CONTAINER */}
            <div className="rounded-3xl bg-white dark:bg-[#0d242b] border border-slate-200/80 dark:border-zinc-800/80 shadow-sm overflow-hidden">
              
              {/* Table Column Headers */}
              <div className="grid grid-cols-12 bg-slate-50 dark:bg-[#091b20] border-b border-slate-200/80 dark:border-zinc-800 text-[10px] font-black tracking-widest uppercase text-slate-400 dark:text-zinc-500 py-3 px-4">
                <div className="col-span-6 sm:col-span-7">POST</div>
                <div className="col-span-2 text-center">WRITER</div>
                <div className="col-span-1 text-center">LIKES</div>
                <div className="col-span-2 sm:col-span-1 text-center">DATE</div>
                <div className="hidden sm:block sm:col-span-1 text-center">VIEWS</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                {paginatedPosts.length > 0 ? (
                  paginatedPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => handleOpenPost(post)}
                      className="grid grid-cols-12 items-center py-3 px-4 text-xs hover:bg-slate-50 dark:hover:bg-zinc-900/60 transition-colors cursor-pointer group"
                    >
                      {/* Post Title & Category Badge */}
                      <div className="col-span-6 sm:col-span-7 flex items-center space-x-2.5 pr-2">
                        {post.isNotice ? (
                          <span className="px-2 py-0.5 rounded-md text-[9.5px] font-black uppercase bg-emerald-500 text-white shrink-0">
                            Notice
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md text-[9.5px] font-black uppercase bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 shrink-0">
                            {post.category}
                          </span>
                        )}

                        <span className={`line-clamp-1 ${post.isNotice ? 'font-black text-slate-900 dark:text-white' : 'font-bold text-slate-800 dark:text-zinc-200'} group-hover:text-[#0097B2] dark:group-hover:text-cyan-300`}>
                          {post.title} <span className="text-[#0097B2] dark:text-cyan-400 font-extrabold">({post.commentsCount})</span>
                        </span>
                      </div>

                      {/* Writer */}
                      <div className="col-span-2 text-center font-bold text-[11px] truncate flex items-center justify-center space-x-1">
                        {post.isNotice ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0097B2]" />
                            <span className="text-[#0097B2] dark:text-cyan-300 font-black">{post.author}</span>
                          </>
                        ) : (
                          <span className="font-mono text-slate-600 dark:text-zinc-400">{post.author}</span>
                        )}
                      </div>

                      {/* Likes */}
                      <div className="col-span-1 text-center font-semibold text-slate-500 dark:text-zinc-400">
                        {post.likes}
                      </div>

                      {/* Date */}
                      <div className="col-span-2 sm:col-span-1 text-center font-mono text-[11px] text-slate-400 dark:text-zinc-500">
                        {post.date}
                      </div>

                      {/* Views */}
                      <div className="hidden sm:block sm:col-span-1 text-center font-mono text-[11px] text-slate-500 dark:text-zinc-400">
                        {post.views}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center space-y-2">
                    <FileText className="w-8 h-8 text-slate-300 dark:text-zinc-600 mx-auto" />
                    <p className="text-sm font-bold text-slate-600 dark:text-zinc-400">No community posts registered</p>
                  </div>
                )}
              </div>

            </div>

            {/* PAGINATION & WRITE CTA */}
            <div className="flex items-center justify-between pt-2">
              
              {/* Pagination controls */}
              <div className="flex items-center space-x-1.5 text-xs font-bold">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="w-7 h-7 rounded-lg bg-white dark:bg-[#0d242b] border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 disabled:opacity-40 flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-7 h-7 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      currentPage === i + 1
                        ? 'bg-[#0097B2] text-white shadow-xs'
                        : 'bg-white dark:bg-[#0d242b] border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="w-7 h-7 rounded-lg bg-white dark:bg-[#0d242b] border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 disabled:opacity-40 flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom Right Floating Write CTA Button */}
              <button
                type="button"
                onClick={() => setIsWriteModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#0b1728] dark:bg-[#0097B2] hover:bg-[#0097B2] text-white text-xs font-black uppercase tracking-wider shadow-md flex items-center space-x-1.5 cursor-pointer transition-all hover:scale-105"
              >
                <PenSquare className="w-3.5 h-3.5" />
                <span>WRITE</span>
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
         POST READER MODAL
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedPost(null)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#0d242b] border border-slate-200 dark:border-[#0097B2]/30 rounded-3xl p-6 sm:p-8 w-full max-w-xl relative z-10 shadow-2xl space-y-5"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-black uppercase ${
                  selectedPost.isNotice ? 'bg-emerald-500 text-white' : 'bg-[#0097B2] text-white'
                }`}>
                  {selectedPost.category}
                </span>

                <span className="text-xs font-mono text-slate-400">
                  By <strong>{selectedPost.author}</strong> • {selectedPost.date}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                {selectedPost.title}
              </h2>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#091b20] text-xs sm:text-sm text-slate-800 dark:text-zinc-200 font-medium">
                {selectedPost.content}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-zinc-800 text-xs">
                <div className="flex items-center space-x-4 text-slate-500">
                  <span><Eye className="w-3.5 h-3.5 inline mr-1" />{selectedPost.views} views</span>
                  <span><MessageSquare className="w-3.5 h-3.5 inline mr-1" />{selectedPost.commentsCount} comments</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleLikePost(selectedPost.id, e)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-[#0097B2] font-bold hover:bg-[#0097B2] hover:text-white transition-all flex items-center space-x-1"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Like ({selectedPost.likes})</span>
                </button>
              </div>

              {/* Comment thread */}
              <div className="space-y-3 pt-2">
                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {selectedPost.comments && selectedPost.comments.map((c, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#091b20] text-xs space-y-0.5">
                      <span className="font-extrabold text-[#0097B2]">{c.author}: </span>
                      <span className="text-slate-700 dark:text-zinc-300">{c.text}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-grow px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                  <button type="submit" className="px-3 py-2 rounded-xl bg-[#0097B2] text-white text-xs font-bold">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
         CREATE POST MODAL
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md"
              onClick={() => setIsWriteModalOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#0d242b] border border-slate-200 dark:border-[#0097B2]/30 rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Create Community Post</h3>
                <button onClick={() => setIsWriteModalOpen(false)} className="p-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Category</label>
                  <div className="flex gap-2">
                    {['TOEFL', 'IELTS', 'Free Topic', 'Reviews'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setNewPostCategory(cat)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold border ${
                          newPostCategory === cat ? 'bg-[#0097B2] text-white border-[#0097B2]' : 'bg-slate-50 dark:bg-[#091b20] border-slate-200 text-slate-700 dark:text-zinc-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="Enter post title..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Content *</label>
                  <textarea
                    rows={3}
                    required
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Enter post description..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#0097B2] text-white text-xs font-black uppercase"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
