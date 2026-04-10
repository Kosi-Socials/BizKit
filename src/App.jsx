import { useState, useEffect } from "react";

// ─── NICHE DATA ───────────────────────────────────────────────────────────────
const NICHES = [
  {
    id:"beauty",label:"Beauty & Wellness",color:"#c4a882",bg:"#1a1218",lightBg:"#fdf8f4",
    illustration:(<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}><circle cx="60" cy="45" r="28" stroke="#c4a882" strokeWidth="1.5" fill="none" opacity="0.6"/><circle cx="60" cy="45" r="18" fill="#c4a882" opacity="0.15"/><path d="M44 45 Q52 32 60 45 Q68 58 76 45" stroke="#c4a882" strokeWidth="1.5" fill="none"/><line x1="60" y1="73" x2="60" y2="95" stroke="#c4a882" strokeWidth="1.5" opacity="0.5"/><ellipse cx="60" cy="97" rx="12" ry="4" stroke="#c4a882" strokeWidth="1" fill="none" opacity="0.4"/><circle cx="38" cy="30" r="2" fill="#c4a882" opacity="0.4"/><circle cx="82" cy="30" r="2" fill="#c4a882" opacity="0.4"/></svg>),
    expenseCategories:["Products & Supplies","Equipment","Salon Rent","Staff Wages","Marketing","Training","Packaging","Software"],
    incomeCategories:["Services","Product Sales","Gift Cards","Consultations","Online Courses","Collaborations"],
    contentIdeas:[{type:"Reel",idea:"Before & after transformation reveal",pillar:"Showcase"},{type:"Carousel",idea:"5 skincare mistakes your clients are making",pillar:"Educate"},{type:"Story",idea:"Poll: Which treatment do you want first?",pillar:"Engage"},{type:"Reel",idea:"Morning salon setup routine — satisfying & aesthetic",pillar:"Behind the scenes"},{type:"Static",idea:"Client testimonial quote card",pillar:"Social proof"},{type:"Reel",idea:"Trending beauty hack with your expert take",pillar:"Educate"},{type:"Carousel",idea:"Your complete price list — beautifully designed",pillar:"Showcase"},{type:"Reel",idea:"Day in the life of a beauty business owner",pillar:"Relate"},{type:"Static",idea:"Seasonal treatment promotion",pillar:"Sell"},{type:"Reel",idea:"Product unboxing — new stock just arrived",pillar:"Entertain"},{type:"Carousel",idea:"How to maintain your [service] at home",pillar:"Educate"},{type:"Story",idea:"Behind the scenes preparing for a full day of bookings",pillar:"Behind the scenes"}],
    captions:["Your skin deserves the best — and we're here to give it exactly that. Book your [service] today 🌿","Before she walked in, she felt [emotion]. When she walked out? [transformation] ✨","Hot take: [beauty tip]. Do you agree? Drop a 🙋 below","We don't just do [service] — we make you feel like the best version of yourself 👇"],
    pillars:[{name:"Transform",desc:"Before/afters, client reveals, visual results",emoji:"✨"},{name:"Educate",desc:"Skincare tips, product knowledge, myths vs facts",emoji:"📚"},{name:"Behind the scenes",desc:"Your process, your space, your passion",emoji:"🎬"},{name:"Social proof",desc:"Reviews, testimonials, client love",emoji:"💬"},{name:"Sell",desc:"Promotions, new services, booking CTAs",emoji:"🛍️"}],
    checklist:["Register your business name","Set up Instagram & TikTok business accounts","Create a booking system (Booksy or Calendly)","Set your price list","Get professional liability insurance","Create a client consent/intake form","Set up a payment method","Take professional photos of your space","Create a Google Business Profile","Build a referral programme"],
    analyticsHints:{ig:"Open Instagram → Profile → Insights → tap any post → scroll to see Reach, Saves, Shares",tiktok:"Open TikTok → tap your video → ... → Analytics",linkedin:"Open LinkedIn → tap a post → View analytics"},
  },
  {
    id:"tech",label:"Tech & Software",color:"#4ade80",bg:"#0d1117",lightBg:"#f0fdf4",
    illustration:(<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}><rect x="20" y="25" width="80" height="55" rx="4" stroke="#4ade80" strokeWidth="1.5" fill="none" opacity="0.6"/><line x1="28" y1="42" x2="92" y2="42" stroke="#4ade80" strokeWidth="0.8" opacity="0.3"/><text x="32" y="57" fontFamily="monospace" fontSize="7" fill="#4ade80" opacity="0.8">const grow = () =&gt; {'{'}</text><text x="32" y="66" fontFamily="monospace" fontSize="7" fill="#86efac" opacity="0.6">  return success</text><text x="32" y="75" fontFamily="monospace" fontSize="7" fill="#4ade80" opacity="0.8">{'}'}</text><line x1="45" y1="80" x2="75" y2="80" stroke="#4ade80" strokeWidth="2" opacity="0.5"/><circle cx="95" cy="28" r="6" fill="#4ade80" opacity="0.2" stroke="#4ade80" strokeWidth="1"/></svg>),
    expenseCategories:["Hosting & Infrastructure","Software Licenses","Developer Tools","Marketing & Ads","Team / Contractors","Legal & Compliance","Equipment","Events & Networking"],
    incomeCategories:["SaaS Subscriptions","One-time Sales","Consulting","API Usage Fees","Partnerships","Grants & Funding"],
    contentIdeas:[{type:"Carousel",idea:"5 tools every small business needs in 2026",pillar:"Educate"},{type:"Reel",idea:"Watch us build a feature in real time — 60 seconds",pillar:"Behind the scenes"},{type:"Static",idea:"Customer success story — their results using your product",pillar:"Social proof"},{type:"Carousel",idea:"We just launched [feature] — here's what it does",pillar:"Announce"},{type:"Reel",idea:"The problem we solve — told in under 30 seconds",pillar:"Sell"},{type:"Carousel",idea:"Common misconceptions about [your tech niche]",pillar:"Educate"},{type:"Static",idea:"Milestone post — X users, X customers, X revenue",pillar:"Relate"},{type:"Reel",idea:"Our team's favourite productivity hacks",pillar:"Entertain"},{type:"Carousel",idea:"Step-by-step: How to get started with [your product]",pillar:"Onboard"},{type:"Static",idea:"Industry stat + your hot take on it",pillar:"Thought leadership"},{type:"Reel",idea:"A bug we fixed — and what we learned",pillar:"Transparency"},{type:"Carousel",idea:"What we're building next — community sneak peek",pillar:"Engage"}],
    captions:["We built [product] because [problem] was costing businesses like yours [time/money] 👇","The future of [industry] isn't complicated. It just needs the right tools 🖥️","Our users save an average of [X hours] per week. Here's exactly how 🧵","[Feature] is now live. We've been working on this for months ⚡"],
    pillars:[{name:"Educate",desc:"Tech tips, tutorials, industry insights",emoji:"💡"},{name:"Showcase",desc:"Product demos, feature highlights, UI walkthroughs",emoji:"🖥️"},{name:"Social proof",desc:"Case studies, metrics, customer wins",emoji:"📊"},{name:"Thought leadership",desc:"Opinions, predictions, industry takes",emoji:"🧠"},{name:"Community",desc:"Feedback requests, polls, feature voting",emoji:"🤝"}],
    checklist:["Register your business / company name","Set up a GitHub or GitLab account","Choose your hosting provider","Set up a privacy policy and terms of service","Create a Stripe or payment integration","Set up error tracking (Sentry or similar)","Create a product roadmap","Set up a customer support channel","Build a landing page","Get your first 10 beta users"],
    analyticsHints:{ig:"Open Instagram → Profile → Insights → tap any post → Reach, Saves, Shares",tiktok:"Open TikTok → tap your video → ... → Analytics → scroll for all metrics",linkedin:"Open LinkedIn → tap a post → View analytics → see impressions and engagement"},
  },
  {
    id:"agric",label:"Agriculture & Farming",color:"#86d88a",bg:"#111a0e",lightBg:"#f0fdf0",
    illustration:(<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}><path d="M20 90 Q35 75 50 80 Q65 85 80 70 Q95 55 110 60" stroke="#86d88a" strokeWidth="1.5" fill="none" opacity="0.5"/><line x1="10" y1="90" x2="110" y2="90" stroke="#86d88a" strokeWidth="1" opacity="0.3"/><path d="M40 90 L40 60 Q50 45 60 55 Q50 60 40 90Z" fill="#86d88a" opacity="0.2"/><path d="M65 90 L65 55 Q75 38 85 48 Q75 55 65 90Z" fill="#86d88a" opacity="0.2"/><circle cx="35" cy="25" r="12" stroke="#bbf7bb" strokeWidth="1" fill="none" opacity="0.3"/><path d="M29 20 Q35 14 41 20 Q35 26 29 20Z" fill="#86d88a" opacity="0.4"/></svg>),
    expenseCategories:["Seeds & Inputs","Equipment & Machinery","Fuel & Transport","Labour","Fertilizers & Chemicals","Land Rent","Storage","Marketing"],
    incomeCategories:["Crop Sales","Livestock Sales","Processed Products","Government Subsidies","Export Sales","Agro-tourism"],
    contentIdeas:[{type:"Reel",idea:"Harvest day — raw and real footage of your farm",pillar:"Behind the scenes"},{type:"Carousel",idea:"From seed to table — your full production process",pillar:"Educate"},{type:"Static",idea:"What's in season right now + how to order",pillar:"Sell"},{type:"Reel",idea:"Meet the people behind your food — introduce your team",pillar:"Relate"},{type:"Carousel",idea:"5 things you didn't know about [your crop]",pillar:"Educate"},{type:"Reel",idea:"Time-lapse of your crop growing over weeks",pillar:"Entertain"},{type:"Static",idea:"Customer recipe using your produce",pillar:"Community"},{type:"Carousel",idea:"Why buying local farm produce matters",pillar:"Educate"},{type:"Reel",idea:"A day on the farm — sunrise to sunset",pillar:"Behind the scenes"},{type:"Static",idea:"Seasonal availability chart — what's coming next",pillar:"Sell"},{type:"Carousel",idea:"The challenges of farming no one talks about",pillar:"Relate"},{type:"Reel",idea:"Sustainable farming practices you use — and why",pillar:"Values"}],
    captions:["Every [product] you buy from us was grown with [values]. Here's what that means 🌱","Harvest season is here. Here's what's fresh and how to get yours 🌾","Farming isn't just a job. It's [X] months of patience, work, and love 🙏","Real food. Real farmers. Real care. Order yours this week 👇"],
    pillars:[{name:"Harvest Stories",desc:"Real moments from the farm — raw and honest",emoji:"🌾"},{name:"Educate",desc:"Farming processes, nutrition facts, sustainability",emoji:"🌱"},{name:"Sell",desc:"What's available, seasonal drops, order CTAs",emoji:"🛒"},{name:"Values",desc:"Why you farm the way you do",emoji:"🌍"},{name:"Community",desc:"Recipes, customer features, local partnerships",emoji:"🤝"}],
    checklist:["Register your farm as a business","Get all required agricultural permits","Set up a record-keeping system for crops","Open a dedicated business bank account","Set up a WhatsApp or order management system","Create social media accounts","Get crop insurance","Set up a delivery or pickup system","Find your first 5 regular customers","Join a local farmers market or co-op"],
    analyticsHints:{ig:"Open Instagram → Profile → Insights → tap any post → see Reach, Saves, Shares",tiktok:"Open TikTok → tap your video → ... → Analytics",linkedin:"Open LinkedIn → tap a post → View analytics"},
  },
  {
    id:"food",label:"Food & Restaurant",color:"#fb923c",bg:"#1a1210",lightBg:"#fff7ed",
    illustration:(<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}><circle cx="60" cy="58" r="32" stroke="#fb923c" strokeWidth="1.5" fill="none" opacity="0.4"/><circle cx="60" cy="58" r="24" fill="#fb923c" opacity="0.08"/><path d="M44 50 Q52 44 60 50 Q68 44 76 50" stroke="#fb923c" strokeWidth="1.5" fill="none"/><path d="M46 62 Q53 70 60 66 Q67 70 74 62" stroke="#fed7aa" strokeWidth="1.2" fill="none" opacity="0.8"/><line x1="60" y1="26" x2="60" y2="20" stroke="#fb923c" strokeWidth="1.5" opacity="0.6"/></svg>),
    expenseCategories:["Ingredients & Food Cost","Kitchen Equipment","Staff Wages","Rent & Utilities","Packaging","Delivery Fees","Marketing","Licences & Permits"],
    incomeCategories:["Dine-in Sales","Takeaway & Delivery","Catering","Private Events","Meal Kits","Cooking Classes"],
    contentIdeas:[{type:"Reel",idea:"Satisfying food prep video — ASMR style",pillar:"Entertain"},{type:"Carousel",idea:"What goes into our [signature dish] — ingredient breakdown",pillar:"Educate"},{type:"Static",idea:"New menu item announcement — beautiful food photography",pillar:"Sell"},{type:"Reel",idea:"Chef's table — watch the dish come together from scratch",pillar:"Behind the scenes"},{type:"Carousel",idea:"Customer reviews — formatted beautifully with food photos",pillar:"Social proof"},{type:"Reel",idea:"A day in our kitchen — the chaos and love behind every plate",pillar:"Relate"},{type:"Static",idea:"Weekly specials + limited time offer",pillar:"Sell"},{type:"Carousel",idea:"The story behind our restaurant — why we started",pillar:"Relate"},{type:"Reel",idea:"Customer reaction to trying our food for the first time",pillar:"Social proof"},{type:"Static",idea:"Sourcing story — where our [ingredient] comes from",pillar:"Values"},{type:"Reel",idea:"Quick recipe using our signature flavours",pillar:"Educate"},{type:"Carousel",idea:"Pairing guide — what to order together",pillar:"Educate"}],
    captions:["Some dishes you make. Some dishes you feel. This is [dish name] 🍽️","Our [dish] has [X] ingredients, [X] hours of prep, and 100% love ❤️","New on the menu: [item]. Here's what's in it and why you need to try it 👇","The kitchen doesn't sleep. We're open [hours] — come hungry 🔥"],
    pillars:[{name:"Food as art",desc:"Beautiful plating, colour-rich, visual-first content",emoji:"🍽️"},{name:"Behind the kitchen",desc:"Prep footage, chef stories, sourcing journeys",emoji:"👨‍🍳"},{name:"Social proof",desc:"Customer reviews, reactions, UGC reposts",emoji:"⭐"},{name:"Sell",desc:"Menu highlights, specials, limited offers",emoji:"🛍️"},{name:"Values",desc:"Where your food comes from, sustainability",emoji:"🌱"}],
    checklist:["Register your food business","Get food handler certification","Apply for food service licence","Set up a POS system","Create your menu with pricing","Set up delivery on Glovo/Jumia Food","Open a business bank account","Get food safety insurance","Create a food photography setup","Set up a reservation/ordering system"],
    analyticsHints:{ig:"Open Instagram → Profile → Insights → tap any post → Reach, Saves, Shares",tiktok:"Open TikTok → tap your video → ... → Analytics",linkedin:"Open LinkedIn → tap a post → View analytics"},
  },
  {
    id:"fashion",label:"Fashion & Style",color:"#e879a0",bg:"#180d1a",lightBg:"#fdf2f8",
    illustration:(<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}><path d="M50 20 L40 35 L25 35 L35 55 L30 95 L60 88 L90 95 L85 55 L95 35 L80 35 L70 20 L60 28 Z" stroke="#e879a0" strokeWidth="1.5" fill="none" opacity="0.5"/><path d="M50 20 L60 28 L70 20" stroke="#f9a8d4" strokeWidth="1.2" fill="none" opacity="0.7"/></svg>),
    expenseCategories:["Inventory & Stock","Packaging & Branding","Shipping & Logistics","Photography","Marketing & Ads","Platform Fees","Storage","Returns & Refunds"],
    incomeCategories:["Online Sales","In-store Sales","Wholesale","Custom Orders","Styling Services","Brand Collaborations"],
    contentIdeas:[{type:"Reel",idea:"Styling the same piece 5 different ways",pillar:"Educate"},{type:"Carousel",idea:"New collection drop — every piece with styling notes",pillar:"Sell"},{type:"Reel",idea:"Get ready with me — wearing our latest piece",pillar:"Showcase"},{type:"Carousel",idea:"How to build a capsule wardrobe on a budget",pillar:"Educate"},{type:"Static",idea:"Customer outfit post — tag + feature them",pillar:"Community"},{type:"Reel",idea:"Behind the scenes of a photoshoot",pillar:"Behind the scenes"},{type:"Carousel",idea:"Trend report — what's in for this season",pillar:"Educate"},{type:"Reel",idea:"Packaging an order — satisfying and branded",pillar:"Entertain"},{type:"Static",idea:"Sold out + restock announcement",pillar:"Sell"},{type:"Carousel",idea:"Body type styling guide — something for everyone",pillar:"Inclusive"},{type:"Reel",idea:"Before the brand: your story as a fashion entrepreneur",pillar:"Relate"},{type:"Static",idea:"Flat lay of new arrivals with shop link",pillar:"Sell"}],
    captions:["New in: [item name]. Here's everything you need to know — and how to style it 🖤","Style isn't about price tags. It's about knowing what works for you 👗","She ordered this on a Tuesday. By Friday she had [X] compliments 🛍️","Limited stock. Unlimited style. [Item] is back — but not for long ⏳"],
    pillars:[{name:"Style & Inspire",desc:"Outfit ideas, lookbooks, trend content",emoji:"✨"},{name:"Showcase",desc:"Product features, new arrivals, collection stories",emoji:"👗"},{name:"Community",desc:"Customer features, reposts, style challenges",emoji:"💬"},{name:"Behind the brand",desc:"Your process, sourcing, business journey",emoji:"🎬"},{name:"Sell",desc:"Limited drops, promotions, restocks",emoji:"🛍️"}],
    checklist:["Register your fashion brand name","Set up an online store (Shopify or Paystack)","Create sizing guides","Set up your returns policy","Get professional product photography","Set up Instagram Shopping","Register for tax collection","Find a reliable shipping partner","Build a supplier/manufacturer relationship","Create a lookbook for each collection"],
    analyticsHints:{ig:"Open Instagram → Profile → Insights → tap any post → Reach, Saves, Shares, Profile visits",tiktok:"Open TikTok → tap your video → ... → Analytics",linkedin:"Open LinkedIn → tap a post → View analytics"},
  },
  {
    id:"health",label:"Health & Fitness",color:"#38bdf8",bg:"#0d1825",lightBg:"#f0f9ff",
    illustration:(<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}><path d="M20 65 L35 45 L45 55 L60 30 L75 50 L85 42 L100 55" stroke="#38bdf8" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round"/><circle cx="60" cy="30" r="4" fill="#38bdf8" opacity="0.5"/><rect x="25" y="78" width="70" height="3" rx="1.5" fill="#38bdf8" opacity="0.2"/><circle cx="88" cy="25" r="8" stroke="#7dd3fc" strokeWidth="1" fill="none" opacity="0.4"/></svg>),
    expenseCategories:["Equipment & Gear","Supplements / Products","Studio / Gym Rent","Staff & Trainers","App / Platform Fees","Marketing","Certifications","Insurance"],
    incomeCategories:["Personal Training","Group Classes","Online Programs","Supplements / Products","Memberships","Consultations"],
    contentIdeas:[{type:"Reel",idea:"Quick 5-minute workout anyone can do at home",pillar:"Educate"},{type:"Carousel",idea:"Client transformation — their story in their words",pillar:"Social proof"},{type:"Reel",idea:"What I eat in a day as a fitness professional",pillar:"Relate"},{type:"Carousel",idea:"Debunking the top 5 fitness myths",pillar:"Educate"},{type:"Static",idea:"New programme or service launch with limited spots",pillar:"Sell"},{type:"Reel",idea:"A day in the life — from morning session to evening client",pillar:"Behind the scenes"},{type:"Carousel",idea:"Meal prep guide for the week — simple and realistic",pillar:"Educate"},{type:"Reel",idea:"Trending exercise — your take on form and safety",pillar:"Thought leadership"},{type:"Static",idea:"Motivational quote + your personal take on it",pillar:"Inspire"},{type:"Carousel",idea:"Beginner's guide to starting their fitness journey",pillar:"Educate"},{type:"Reel",idea:"Behind the scenes of a client session",pillar:"Showcase"},{type:"Carousel",idea:"Why most people fail at fitness goals — honest breakdown",pillar:"Educate"}],
    captions:["You don't need [X hours] at the gym. You need consistency. Here's a realistic plan 💪","[Client] started [X months] ago not being able to [milestone]. Today: [achievement] 🙌","Hot take: [fitness opinion]. Agree or disagree? Drop it below 👇","New programme dropping [date]. [X] spots only 🔥"],
    pillars:[{name:"Educate",desc:"Workouts, nutrition, myth-busting",emoji:"💡"},{name:"Transform",desc:"Client journeys, before/afters, real results",emoji:"💪"},{name:"Inspire",desc:"Motivation, mindset, the mental side of fitness",emoji:"🧠"},{name:"Relate",desc:"Your journey, your struggles, your real life",emoji:"❤️"},{name:"Sell",desc:"Programmes, memberships, consultations",emoji:"🎯"}],
    checklist:["Get your fitness certification","Register your business","Get professional liability insurance","Set up a booking system","Create your service packages & pricing","Set up a payment method","Create a client intake/health form","Build your online presence","Create a free lead magnet (workout PDF)","Set up client progress tracking"],
    analyticsHints:{ig:"Open Instagram → Profile → Insights → tap any post → Reach, Saves, Shares",tiktok:"Open TikTok → tap your video → ... → Analytics",linkedin:"Open LinkedIn → tap a post → View analytics"},
  },
  {
    id:"realestate",label:"Real Estate",color:"#a78bfa",bg:"#100d1f",lightBg:"#faf5ff",
    illustration:(<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}><path d="M60 20 L25 50 L30 50 L30 95 L90 95 L90 50 L95 50 Z" stroke="#a78bfa" strokeWidth="1.5" fill="none" opacity="0.5"/><rect x="48" y="68" width="24" height="27" rx="1" stroke="#c4b5fd" strokeWidth="1" fill="none" opacity="0.4"/><rect x="36" y="58" width="14" height="14" rx="1" stroke="#a78bfa" strokeWidth="1" fill="none" opacity="0.5"/><rect x="70" y="58" width="14" height="14" rx="1" stroke="#a78bfa" strokeWidth="1" fill="none" opacity="0.5"/></svg>),
    expenseCategories:["Marketing & Staging","Photography & Video","Admin & Legal","Commission","Travel","Ads","CRM & Tools","Professional Development"],
    incomeCategories:["Sales Commission","Rental Income","Property Management","Consulting Fees","Referral Fees","Leasing Fees"],
    contentIdeas:[{type:"Reel",idea:"Property tour — walk through like you're the buyer",pillar:"Showcase"},{type:"Carousel",idea:"5 things to look for when buying a home",pillar:"Educate"},{type:"Static",idea:"New listing announcement — beautiful photography",pillar:"Sell"},{type:"Reel",idea:"Just sold! The story behind this property",pillar:"Social proof"},{type:"Carousel",idea:"Market update — what's happening this month",pillar:"Educate"},{type:"Reel",idea:"Day in the life of a real estate agent",pillar:"Relate"},{type:"Carousel",idea:"First-time buyer's checklist — step by step",pillar:"Educate"},{type:"Static",idea:"Client testimonial after closing",pillar:"Social proof"},{type:"Reel",idea:"Neighbourhood spotlight — why [area] is worth buying in",pillar:"Educate"},{type:"Carousel",idea:"Rent vs buy — honest breakdown for your market",pillar:"Thought leadership"},{type:"Static",idea:"Price reduced / open house this weekend",pillar:"Sell"},{type:"Reel",idea:"Before and after — staged vs unstaged property",pillar:"Educate"}],
    captions:["Just listed: [property details]. The details that make this one special 👇","Most first-time buyers make this mistake. Here's what we wish someone told us 🏠","The market in [area] right now — here's what it means 📊","[Client] found their dream home in [X] weeks. Here's how we did it 🔑"],
    pillars:[{name:"Listings",desc:"Property showcases, tours, open house announcements",emoji:"🏡"},{name:"Educate",desc:"Buying/selling guides, market insights, tips",emoji:"📚"},{name:"Social proof",desc:"Client stories, sold announcements, reviews",emoji:"⭐"},{name:"Local expertise",desc:"Neighbourhood content, market updates",emoji:"📍"},{name:"Relate",desc:"Your agent story, behind the scenes",emoji:"❤️"}],
    checklist:["Get your real estate licence","Join a brokerage","Set up your CRM","Create a professional headshot and bio","Build your listing presentation","Set up automated email follow-ups","Create a Google Business Profile","Join local property groups online","Set up a referral system","Create a market report template"],
    analyticsHints:{ig:"Open Instagram → Profile → Insights → tap any post → Reach, Saves, Shares",tiktok:"Open TikTok → tap your video → ... → Analytics",linkedin:"Open LinkedIn → tap a post → View analytics"},
  },
  {
    id:"education",label:"Education & Coaching",color:"#fbbf24",bg:"#181408",lightBg:"#fffbeb",
    illustration:(<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}><path d="M60 22 L95 40 L60 58 L25 40 Z" stroke="#fbbf24" strokeWidth="1.5" fill="none" opacity="0.5"/><path d="M25 40 L25 65 Q60 78 95 65 L95 40" stroke="#fbbf24" strokeWidth="1" fill="none" opacity="0.3"/><line x1="95" y1="40" x2="95" y2="72" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5"/><circle cx="35" cy="88" r="10" stroke="#fde68a" strokeWidth="1" fill="none" opacity="0.4"/><line x1="31" y1="88" x2="39" y2="88" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6"/><line x1="35" y1="84" x2="35" y2="92" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6"/></svg>),
    expenseCategories:["Course Platform Fees","Marketing & Ads","Tools & Software","Content Creation","Mentors & Coaches","Community Platform","Design & Branding","Admin"],
    incomeCategories:["Course Sales","1:1 Coaching","Group Programmes","Memberships","Workshops","Speaking Fees"],
    contentIdeas:[{type:"Carousel",idea:"The #1 mistake my students make (and how to fix it)",pillar:"Educate"},{type:"Reel",idea:"Student success spotlight — their result in 60 seconds",pillar:"Social proof"},{type:"Carousel",idea:"Free lesson: the core framework I teach all my students",pillar:"Educate"},{type:"Static",idea:"Enrolment is open — what's inside the programme",pillar:"Sell"},{type:"Reel",idea:"My story — why I became a [coach/educator]",pillar:"Relate"},{type:"Carousel",idea:"5 questions to ask before hiring a coach in [niche]",pillar:"Educate"},{type:"Reel",idea:"Behind the scenes of creating a course module",pillar:"Behind the scenes"},{type:"Carousel",idea:"Free resource — downloadable guide or checklist",pillar:"Lead magnet"},{type:"Static",idea:"Community win — celebrate a student's milestone",pillar:"Community"},{type:"Reel",idea:"Live Q&A replay highlight — best question of the week",pillar:"Engage"},{type:"Carousel",idea:"The roadmap to [desired outcome] — step by step",pillar:"Educate"},{type:"Reel",idea:"Hot take on a common belief in your coaching niche",pillar:"Thought leadership"}],
    captions:["[Student] came to me struggling with [problem]. [X weeks] later, [result] 👇","I'm opening [X] spots for [programme]. Here's exactly who it's for 🎓","Free guide dropping this week: [topic]. Comment [word] and I'll send it ⬇️","Unpopular opinion: [belief in your niche]. Here's why most people have it backwards 💡"],
    pillars:[{name:"Free value",desc:"Tips, lessons, frameworks — give your best stuff away",emoji:"🎁"},{name:"Student wins",desc:"Transformations, testimonials, community celebrations",emoji:"🏆"},{name:"Your story",desc:"Why you teach, your journey, your credibility",emoji:"📖"},{name:"Sell",desc:"Programme launches, enrolment opens, waitlists",emoji:"🎓"},{name:"Thought leadership",desc:"Hot takes, contrarian views, your unique lens",emoji:"💡"}],
    checklist:["Get certified in your coaching niche","Register your business","Choose your course platform (Teachable, Kajabi)","Create your signature framework","Set up a payment processor","Build your email list from day one","Create a free lead magnet","Set up a community (WhatsApp, Discord, Circle)","Create your first course outline","Get your first 3 testimonials"],
    analyticsHints:{ig:"Open Instagram → Profile → Insights → tap any post → Reach, Saves, Shares",tiktok:"Open TikTok → tap your video → ... → Analytics",linkedin:"Open LinkedIn → tap a post → View analytics"},
  },
];

const PLATFORMS=["Instagram","TikTok","LinkedIn","Facebook","Twitter/X","YouTube"];
const STATUS_OPTIONS=["Idea","In Progress","Scheduled","Posted"];
const STATUS_COLORS={"Idea":"#94a3b8","In Progress":"#fbbf24","Scheduled":"#818cf8","Posted":"#4ade80"};
const TABS=["Home","Brand","Content","Finance","Guide"];
const FINANCE_TABS=["Overview","Transactions","Customers","Vendors","Calculator","Invoice"];

function fmt(n){return "$"+Number(n||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});}
function uid(){return Math.random().toString(36).slice(2);}
function pct(a,b){return b===0?0:Math.min(Math.round((a/b)*100),100);}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
function Onboarding({onSelect}){
  const [hovered,setHovered]=useState(null);
  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px",background:"#0a0a0f"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={{maxWidth:700,width:"100%",textAlign:"center"}}>
        <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:44,fontWeight:700,color:"#f5f0e8",letterSpacing:"-1px",lineHeight:1.1,marginBottom:12}}>Welcome to <span style={{fontStyle:"italic",color:"#c4a882"}}>BizKit Pro</span></div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:16,color:"#6b7280",marginBottom:48,fontWeight:300,lineHeight:1.6}}>Your complete business OS — personalised to your niche.<br/>What kind of business do you run?</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:12}}>
          {NICHES.map(n=>(
            <div key={n.id} onMouseEnter={()=>setHovered(n.id)} onMouseLeave={()=>setHovered(null)} onClick={()=>onSelect(n)}
              style={{background:hovered===n.id?"#1a1a24":"#111116",border:`1px solid ${hovered===n.id?n.color+"66":"#1e1e28"}`,borderRadius:16,padding:"24px 16px",cursor:"pointer",transition:"all 0.25s",transform:hovered===n.id?"translateY(-3px)":"none",boxShadow:hovered===n.id?`0 8px 32px ${n.color}22`:"none"}}>
              <div style={{width:56,height:56,margin:"0 auto 12px",opacity:hovered===n.id?1:0.5,transition:"opacity 0.25s"}}>{n.illustration}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,color:hovered===n.id?n.color:"#6b7280",transition:"color 0.25s",lineHeight:1.3}}>{n.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BRAND SETUP ──────────────────────────────────────────────────────────────
function BrandSetup({niche,onSave}){
  const [form,setForm]=useState({name:"",tagline:"",primaryColor:niche.color,audience:"",mission:""});
  const ready=form.name.trim().length>0;
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:niche.bg,padding:24,fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{background:"rgba(0,0,0,0.5)",border:`1px solid ${niche.color}33`,borderRadius:24,padding:40,width:"100%",maxWidth:520}}>
        <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:28,color:"#f5f0e8",marginBottom:6}}>Set up your brand</div>
        <div style={{fontSize:13,color:"#6b7280",marginBottom:28,fontWeight:300}}>This personalises your entire BizKit experience</div>
        <div style={{display:"grid",gap:16}}>
          {[["Business Name *","text","name","e.g. Glow Studio, FreshFarm Co."],["Tagline","text","tagline","e.g. Helping you glow inside and out"],["Who do you serve?","text","audience","e.g. Women aged 25–40 who want natural beauty results"]].map(([l,t,k,ph])=>(
            <div key={k}>
              <label style={{fontSize:11,fontWeight:700,color:niche.color,textTransform:"uppercase",letterSpacing:"0.08em",display:"block",marginBottom:6}}>{l}</label>
              <input type={t} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={ph} style={{background:"rgba(0,0,0,0.4)",border:`1px solid ${niche.color}33`,color:"#e8e6f0",borderRadius:10,padding:"11px 14px",fontFamily:"'DM Sans',sans-serif",fontSize:14,width:"100%",outline:"none"}}/>
            </div>
          ))}
          <div>
            <label style={{fontSize:11,fontWeight:700,color:niche.color,textTransform:"uppercase",letterSpacing:"0.08em",display:"block",marginBottom:6}}>Brand Colour</label>
            <div style={{display:"flex",gap:12,alignItems:"center"}}>
              <input type="color" value={form.primaryColor} onChange={e=>setForm({...form,primaryColor:e.target.value})} style={{width:48,height:40,border:"none",borderRadius:8,cursor:"pointer",background:"none"}}/>
              <span style={{fontSize:13,color:"#6b7280"}}>Choose your brand's primary colour</span>
            </div>
          </div>
          <button onClick={()=>{if(ready)onSave(form);}} style={{marginTop:8,padding:"13px 24px",borderRadius:10,border:"none",cursor:ready?"pointer":"not-allowed",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:15,background:ready?niche.color:"#2e2e42",color:ready?"#0a0a0f":"#6b7280",transition:"all 0.2s"}}>
            {ready?"Enter BizKit Pro →":"Enter your business name to continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const [niche,setNiche]=useState(null);
  const [brand,setBrand]=useState(null);
  const [darkMode,setDarkMode]=useState(true);
  const [tab,setTab]=useState("Home");
  const [finTab,setFinTab]=useState("Overview");
  const [posts,setPosts]=useState([]);
  const [transactions,setTransactions]=useState([]);
  const [customers,setCustomers]=useState([]);
  const [vendors,setVendors]=useState([]);
  const [monthlyGoal,setMonthlyGoal]=useState(0);
  const [goalSet,setGoalSet]=useState(false);
  const [goalInput,setGoalInput]=useState("");
  const [customChecklist,setCustomChecklist]=useState([]);
  const [checkStates,setCheckStates]=useState({});
  const [newCheckItem,setNewCheckItem]=useState("");
  const [analyticsLogs,setAnalyticsLogs]=useState([]);
  const [showPostForm,setShowPostForm]=useState(false);
  const [showTxForm,setShowTxForm]=useState(false);
  const [showCustForm,setShowCustForm]=useState(false);
  const [showVendorForm,setShowVendorForm]=useState(false);
  const [showAnalyticsForm,setShowAnalyticsForm]=useState(false);
  const [ideaFilter,setIdeaFilter]=useState("All");
  const [filterMonth,setFilterMonth]=useState(new Date().toISOString().slice(0,7));
  const [filterStatus,setFilterStatus]=useState("All");
  const [margin,setMargin]=useState({cost:"",sell:"",qty:1});
  const [invoice,setInvoice]=useState({clientName:"",clientEmail:"",service:"",amount:"",date:"",notes:""});
  const [showInvoicePreview,setShowInvoicePreview]=useState(false);
  const [newPost,setNewPost]=useState({date:"",platform:"Instagram",type:"Reel",caption:"",hashtags:"",status:"Idea",notes:""});
  const [newTx,setNewTx]=useState({date:"",type:"Income",category:"",description:"",amount:""});
  const [newCust,setNewCust]=useState({name:"",phone:"",email:"",address:"",notes:"",totalSpent:"",lastPurchase:""});
  const [newVendor,setNewVendor]=useState({name:"",contact:"",phone:"",email:"",supplies:"",paymentTerms:"",outstanding:""});
  const [newAnalytics,setNewAnalytics]=useState({date:"",platform:"Instagram",caption:"",views:"",reach:"",saves:"",shares:"",comments:"",likes:""});

  useEffect(()=>{
    if(niche){
      setNewTx(t=>({...t,category:niche.incomeCategories[0]}));
      const allItems=[...niche.checklist];
      const states={};
      allItems.forEach((_,i)=>{ states[`pre_${i}`]=false; });
      setCheckStates(states);
      setCustomChecklist([]);
    }
  },[niche]);

  if(!niche)return <Onboarding onSelect={n=>setNiche(n)}/>;
  if(!brand)return <BrandSetup niche={niche} onSave={b=>setBrand(b)}/>;

  const c=brand.primaryColor||niche.color;
  const dm=darkMode;
  const bg=dm?niche.bg:niche.lightBg||"#f8f8f4";
  const surface=dm?"rgba(0,0,0,0.3)":"rgba(255,255,255,0.8)";
  const surfaceSolid=dm?"#111116":"#ffffff";
  const border=dm?`${c}20`:`${c}30`;
  const textPrimary=dm?"#f5f0e8":"#1a1a1a";
  const textSecondary=dm?"#9ca3af":"#6b7280";
  const textMuted=dm?"#4b5563":"#9ca3af";

  const income=transactions.filter(t=>t.type==="Income").reduce((a,b)=>a+Number(b.amount),0);
  const expense=transactions.filter(t=>t.type==="Expense").reduce((a,b)=>a+Number(b.amount),0);
  const profit=income-expense;
  const filteredPosts=posts.filter(p=>(!filterMonth||p.date.startsWith(filterMonth))&&(filterStatus==="All"||p.status===filterStatus));
  const filteredTx=transactions.filter(t=>!filterMonth||t.date.startsWith(filterMonth));
  const pillars=[...new Set(niche.contentIdeas.map(i=>i.pillar))];
  const ideas=ideaFilter==="All"?niche.contentIdeas:niche.contentIdeas.filter(i=>i.pillar===ideaFilter);
  const allCheckItems=[...niche.checklist.map((item,i)=>({key:`pre_${i}`,label:item,custom:false})),...customChecklist.map((item,i)=>({key:`cus_${i}`,label:item,custom:true}))];
  const checkDone=allCheckItems.filter(item=>checkStates[item.key]).length;
  const costNum=parseFloat(margin.cost)||0;
  const sellNum=parseFloat(margin.sell)||0;
  const marginPct=sellNum>0?((sellNum-costNum)/sellNum*100).toFixed(1):0;
  const profitPerUnit=sellNum-costNum;
  const totalProfit=profitPerUnit*(parseInt(margin.qty)||1);
  const markup=costNum>0?((sellNum-costNum)/costNum*100).toFixed(1):0;

  function addPost(){if(!newPost.date||!newPost.caption)return;setPosts([...posts,{...newPost,id:uid()}]);setNewPost({date:"",platform:"Instagram",type:"Reel",caption:"",hashtags:"",status:"Idea",notes:""});setShowPostForm(false);}
  function addTx(){if(!newTx.date||!newTx.description||!newTx.amount)return;setTransactions([...transactions,{...newTx,id:uid(),amount:Number(newTx.amount)}]);setNewTx({date:"",type:"Income",category:niche.incomeCategories[0],description:"",amount:""});setShowTxForm(false);}
  function addCust(){if(!newCust.name)return;setCustomers([...customers,{...newCust,id:uid()}]);setNewCust({name:"",phone:"",email:"",address:"",notes:"",totalSpent:"",lastPurchase:""});setShowCustForm(false);}
  function addVendor(){if(!newVendor.name)return;setVendors([...vendors,{...newVendor,id:uid()}]);setNewVendor({name:"",contact:"",phone:"",email:"",supplies:"",paymentTerms:"",outstanding:""});setShowVendorForm(false);}
  function addAnalytics(){if(!newAnalytics.caption)return;setAnalyticsLogs([...analyticsLogs,{...newAnalytics,id:uid()}]);setNewAnalytics({date:"",platform:"Instagram",caption:"",views:"",reach:"",saves:"",shares:"",comments:"",likes:""});setShowAnalyticsForm(false);}
  function toggleCheck(key){setCheckStates(s=>({...s,[key]:!s[key]}));}
  function addCheckItem(){if(!newCheckItem.trim())return;const i=customChecklist.length;setCustomChecklist([...customChecklist,newCheckItem.trim()]);setCheckStates(s=>({...s,[`cus_${i}`]:false}));setNewCheckItem("");}
  function removeCustomCheck(i){const arr=customChecklist.filter((_,idx)=>idx!==i);setCustomChecklist(arr);const newStates={...checkStates};delete newStates[`cus_${i}`];setCheckStates(newStates);}

  const S={
    root:{minHeight:"100vh",background:bg,fontFamily:"'DM Sans',sans-serif",color:textPrimary,transition:"background 0.3s, color 0.3s"},
    header:{borderBottom:`1px solid ${border}`,padding:"0 24px",background:dm?"rgba(0,0,0,0.5)":"rgba(255,255,255,0.9)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:50},
    inner:{maxWidth:1000,margin:"0 auto"},
    navBtn:(a)=>({padding:"12px 16px",background:"transparent",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:a?600:400,color:a?c:textMuted,borderBottom:a?`2px solid ${c}`:"2px solid transparent",transition:"all 0.2s",whiteSpace:"nowrap"}),
    card:{background:surface,border:`1px solid ${border}`,borderRadius:16,padding:24,backdropFilter:"blur(4px)"},
    label:{fontSize:11,fontWeight:700,color:c,textTransform:"uppercase",letterSpacing:"0.08em",display:"block",marginBottom:6},
    inp:{background:dm?"rgba(0,0,0,0.4)":"rgba(0,0,0,0.05)",border:`1px solid ${border}`,color:textPrimary,borderRadius:10,padding:"10px 14px",fontFamily:"'DM Sans',sans-serif",fontSize:14,width:"100%",outline:"none"},
    primaryBtn:{padding:"10px 22px",borderRadius:10,border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:14,background:c,color:dm?"#0a0a0f":"#ffffff",transition:"all 0.2s"},
    ghostBtn:{padding:"9px 16px",borderRadius:10,border:`1px solid ${border}`,background:"transparent",color:c,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:500,fontSize:13,transition:"all 0.2s"},
    dangerBtn:{padding:"5px 10px",borderRadius:7,border:"1px solid #ef444433",background:"#ef444411",color:"#ef4444",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:11},
    finSubBtn:(a)=>({padding:"7px 14px",borderRadius:8,border:`1px solid ${a?c:border}`,background:a?`${c}18`:"transparent",color:a?c:textSecondary,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:a?600:400,whiteSpace:"nowrap",transition:"all 0.2s"}),
    sectionTitle:{fontFamily:"'Fraunces',Georgia,serif",fontSize:24,fontWeight:700,color:textPrimary,marginBottom:4},
    sectionSub:{fontSize:13,color:textSecondary,marginBottom:24,fontWeight:300},
  };

  return(
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:${c}44;border-radius:4px;}
        input,select,textarea{background:${dm?"rgba(0,0,0,0.4)":"rgba(0,0,0,0.05)"};border:1px solid ${border};color:${textPrimary};border-radius:10px;padding:10px 14px;font-family:'DM Sans',sans-serif;font-size:14px;width:100%;outline:none;transition:border 0.2s;}
        input:focus,select:focus,textarea:focus{border-color:${c}88;}
        textarea{resize:vertical;min-height:72px;}
        select option{background:${dm?"#111116":"#ffffff"};color:${textPrimary};}
        .g2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
        .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        @media(max-width:640px){.g2,.g3,.g4{grid-template-columns:1fr;}}
        .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:100;padding:20px;backdrop-filter:blur(4px);}
        .modal{background:${surfaceSolid};border:1px solid ${border};border-radius:20px;padding:28px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;}
        .tag{background:${dm?"rgba(0,0,0,0.3)":"rgba(0,0,0,0.07)"};border:1px solid ${border};padding:3px 10px;border-radius:6px;font-size:11px;color:${c};display:inline-block;}
        .pill{padding:6px 14px;border-radius:20px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;transition:all 0.2s;}
        .postcard{background:${surface};border:1px solid ${border};border-radius:14px;padding:18px;margin-bottom:10px;transition:border-color 0.2s;}
        .postcard:hover{border-color:${c}55;}
        .ideacard{background:${surface};border:1px solid ${border};border-radius:12px;padding:14px;transition:all 0.2s;cursor:pointer;}
        .ideacard:hover{border-color:${c}66;transform:translateY(-2px);}
        .row-card{background:${surface};border:1px solid ${border};border-radius:12px;padding:16px;margin-bottom:10px;transition:border-color 0.2s;}
        .row-card:hover{border-color:${c}44;}
        .guide-section{background:${surface};border-left:2px solid ${c};border-radius:0 12px 12px 0;padding:20px 24px;margin-bottom:14px;}
        .stat-card{background:${surface};border:1px solid ${border};border-radius:16px;padding:20px;}
      `}</style>

      {/* Header */}
      <div style={S.header}>
        <div style={{...S.inner,display:"flex",alignItems:"center",justifyContent:"space-between",height:54}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:17,fontStyle:"italic",color:c}}>BizKit Pro</div>
            <div style={{width:1,height:14,background:border}}/>
            <div style={{fontSize:13,fontWeight:600,color:textPrimary}}>{brand.name}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button onClick={()=>setDarkMode(!dm)} style={{background:"transparent",border:`1px solid ${border}`,borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:14,color:textSecondary}}>{dm?"☀️":"🌙"}</button>
            <button style={{...S.ghostBtn,fontSize:11,padding:"5px 10px"}} onClick={()=>{setNiche(null);setBrand(null);}}>Switch niche</button>
          </div>
        </div>
        <div style={{...S.inner,display:"flex",overflowX:"auto",gap:0}}>
          {TABS.map(t=><button key={t} style={S.navBtn(tab===t)} onClick={()=>setTab(t)}>{t}</button>)}
        </div>
      </div>

      <div style={{...S.inner,padding:"28px 24px"}}>

        {/* ══ HOME ══ */}
        {tab==="Home"&&(
          <div>
            <div style={{...S.card,marginBottom:24,background:dm?`linear-gradient(135deg,rgba(0,0,0,0.5),${c}0a)`:`linear-gradient(135deg,${c}08,${c}18)`,border:`1px solid ${c}33`}}>
              <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
                <div style={{width:56,height:56,flexShrink:0}}>{niche.illustration}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:30,fontWeight:700,color:textPrimary,lineHeight:1.1,marginBottom:4}}>{brand.name}</div>
                  {brand.tagline&&<div style={{fontSize:14,color:c,fontStyle:"italic",fontWeight:300}}>{brand.tagline}</div>}
                  <div style={{fontSize:12,color:textMuted,marginTop:4}}>{niche.label}</div>
                </div>
                {goalSet&&(
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:11,color:c,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Monthly Goal</div>
                    <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:22,color:income>=monthlyGoal?"#4ade80":c}}>{pct(income,monthlyGoal)}%</div>
                    <div style={{width:120,height:4,background:dm?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)",borderRadius:2,marginTop:6,overflow:"hidden"}}>
                      <div style={{height:"100%",width:pct(income,monthlyGoal)+"%",background:income>=monthlyGoal?"#4ade80":c,borderRadius:2,transition:"width 0.4s"}}/>
                    </div>
                    <div style={{fontSize:11,color:textMuted,marginTop:4}}>{fmt(income)} of {fmt(monthlyGoal)}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="g4" style={{marginBottom:24}}>
              {[{label:"Total Income",value:fmt(income),color:"#4ade80"},{label:"Total Expenses",value:fmt(expense),color:"#f87171"},{label:"Net Profit",value:fmt(profit),color:profit>=0?"#4ade80":"#f87171"},{label:"Content Posts",value:posts.length,color:c,sub:`${posts.filter(p=>p.status==="Posted").length} posted`}].map(item=>(
                <div key={item.label} className="stat-card">
                  <div style={{fontSize:11,color:item.color,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>{item.label}</div>
                  <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:26,fontWeight:700,color:item.color}}>{item.value}</div>
                  {item.sub&&<div style={{fontSize:11,color:textMuted,marginTop:4}}>{item.sub}</div>}
                </div>
              ))}
            </div>

            <div className="g2" style={{marginBottom:24}}>
              <div style={S.card}>
                <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:16,color:textPrimary,marginBottom:16}}>Content Pipeline</div>
                {STATUS_OPTIONS.map(s=>{const count=posts.filter(p=>p.status===s).length;const p=posts.length?Math.round(count/posts.length*100):0;return(<div key={s} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span style={{color:STATUS_COLORS[s],fontWeight:600}}>{s}</span><span style={{color:textMuted}}>{count}</span></div><div style={{height:4,background:dm?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.08)",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:p+"%",background:STATUS_COLORS[s],borderRadius:2}}/></div></div>);})}
                {posts.length===0&&<div style={{fontSize:12,color:textMuted}}>No posts yet — add content to see your pipeline</div>}
              </div>
              <div style={S.card}>
                <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:16,color:textPrimary,marginBottom:16}}>Content Pillars</div>
                {niche.pillars.map(p=>(
                  <div key={p.name} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:`1px solid ${border}`}}>
                    <span style={{fontSize:16}}>{p.emoji}</span>
                    <div><div style={{fontSize:13,fontWeight:600,color:c,marginBottom:2}}>{p.name}</div><div style={{fontSize:11,color:textMuted}}>{p.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <button style={S.primaryBtn} onClick={()=>{setTab("Content");setShowPostForm(true);}}>+ Add Content</button>
              <button style={S.ghostBtn} onClick={()=>{setTab("Finance");setFinTab("Transactions");setShowTxForm(true);}}>+ Add Transaction</button>
              <button style={S.ghostBtn} onClick={()=>{setTab("Finance");setFinTab("Calculator");}}>🧮 Profit Calculator</button>
              <button style={S.ghostBtn} onClick={()=>setTab("Guide")}>Read the Guide →</button>
            </div>
          </div>
        )}

        {/* ══ BRAND ══ */}
        {tab==="Brand"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24,flexWrap:"wrap",gap:12}}>
              <div><div style={S.sectionTitle}>Brand Hub</div><div style={S.sectionSub}>Your identity, pillars, goals, and setup checklist</div></div>
              <button style={S.ghostBtn} onClick={()=>setBrand(null)}>Edit Brand Setup</button>
            </div>

            <div className="g2" style={{marginBottom:20}}>
              <div style={S.card}>
                <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:16,color:c,marginBottom:16}}>Business Identity</div>
                {[["Business Name",brand.name],["Tagline",brand.tagline||"—"],["Niche",niche.label],["Audience",brand.audience||"—"]].map(([l,v])=>(
                  <div key={l} style={{marginBottom:14}}><label style={S.label}>{l}</label><div style={{fontSize:14,color:textPrimary}}>{v}</div></div>
                ))}
                <div style={{marginTop:4}}><label style={S.label}>Brand Colour</label><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:28,height:28,borderRadius:8,background:c,border:`1px solid ${border}`}}/><span style={{fontSize:13,color:textSecondary}}>{c}</span></div></div>
              </div>
              <div style={{display:"grid",gap:16}}>
                <div style={S.card}>
                  <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:15,color:c,marginBottom:12}}>Monthly Income Goal</div>
                  {!goalSet?(
                    <div style={{display:"flex",gap:8}}>
                      <input type="number" value={goalInput} onChange={e=>setGoalInput(e.target.value)} placeholder="e.g. 5000" style={{flex:1}}/>
                      <button style={S.primaryBtn} onClick={()=>{if(goalInput){setMonthlyGoal(Number(goalInput));setGoalSet(true);setGoalInput("");}}}>Set</button>
                    </div>
                  ):(
                    <div>
                      <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:24,color:c,marginBottom:8}}>{fmt(monthlyGoal)}</div>
                      <div style={{height:6,background:dm?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.08)",borderRadius:3,marginBottom:8,overflow:"hidden"}}><div style={{height:"100%",width:pct(income,monthlyGoal)+"%",background:income>=monthlyGoal?"#4ade80":c,borderRadius:3}}/></div>
                      <div style={{fontSize:12,color:textMuted,marginBottom:8}}>{fmt(income)} earned — {pct(income,monthlyGoal)}% of goal</div>
                      <button style={S.dangerBtn} onClick={()=>{setGoalSet(false);setMonthlyGoal(0);}}>Remove goal</button>
                    </div>
                  )}
                </div>
                <div style={S.card}>
                  <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:15,color:c,marginBottom:12}}>Content Pillars</div>
                  {niche.pillars.map(p=>(
                    <div key={p.name} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:`1px solid ${border}`}}>
                      <span>{p.emoji}</span>
                      <div><div style={{fontSize:13,fontWeight:600,color:c}}>{p.name}</div><div style={{fontSize:11,color:textMuted}}>{p.desc}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div style={S.card}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
                <div>
                  <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:16,color:textPrimary}}>{niche.label} — Setup Checklist</div>
                  <div style={{fontSize:12,color:textMuted,marginTop:2}}>{checkDone} of {allCheckItems.length} complete</div>
                </div>
                <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:24,color:checkDone===allCheckItems.length&&allCheckItems.length>0?"#4ade80":c}}>{pct(checkDone,allCheckItems.length)}%</div>
              </div>
              <div style={{height:6,background:dm?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.08)",borderRadius:3,marginBottom:20,overflow:"hidden"}}>
                <div style={{height:"100%",width:pct(checkDone,allCheckItems.length)+"%",background:checkDone===allCheckItems.length&&allCheckItems.length>0?"#4ade80":c,borderRadius:3,transition:"width 0.4s"}}/>
              </div>

              {allCheckItems.map((item,i)=>(
                <div key={item.key} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:`1px solid ${border}`,cursor:"pointer"}} onClick={()=>toggleCheck(item.key)}>
                  <div style={{width:20,height:20,borderRadius:6,border:`1.5px solid ${checkStates[item.key]?c:c+"44"}`,background:checkStates[item.key]?`${c}22`:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s"}}>
                    {checkStates[item.key]&&<span style={{fontSize:12,color:c}}>✓</span>}
                  </div>
                  <div style={{flex:1,fontSize:14,color:checkStates[item.key]?textMuted:textPrimary,textDecoration:checkStates[item.key]?"line-through":"none",transition:"all 0.2s"}}>{item.label}</div>
                  {item.custom&&<button style={S.dangerBtn} onClick={e=>{e.stopPropagation();removeCustomCheck(customChecklist.indexOf(item.label));}}>✕</button>}
                </div>
              ))}

              <div style={{display:"flex",gap:10,marginTop:16}}>
                <input value={newCheckItem} onChange={e=>setNewCheckItem(e.target.value)} placeholder="Add your own checklist item..." onKeyDown={e=>e.key==="Enter"&&addCheckItem()} style={{flex:1}}/>
                <button style={S.primaryBtn} onClick={addCheckItem}>Add</button>
              </div>
              {checkDone===allCheckItems.length&&allCheckItems.length>0&&<div style={{textAlign:"center",padding:"20px 0",color:"#4ade80",fontSize:14,fontFamily:"'Fraunces',Georgia,serif"}}>🎉 Setup complete! Your business is ready.</div>}
            </div>
          </div>
        )}

        {/* ══ CONTENT ══ */}
        {tab==="Content"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24,flexWrap:"wrap",gap:12}}>
              <div><div style={S.sectionTitle}>Content Planner</div><div style={S.sectionSub}>Plan, create, track, and analyse your {niche.label.toLowerCase()} content</div></div>
              <div style={{display:"flex",gap:10}}>
                <button style={S.ghostBtn} onClick={()=>setShowAnalyticsForm(true)}>📊 Log Analytics</button>
                <button style={S.primaryBtn} onClick={()=>setShowPostForm(true)}>+ Add Post</button>
              </div>
            </div>

            {/* Ideas bank */}
            <div style={{...S.card,marginBottom:20,background:dm?`linear-gradient(135deg,rgba(0,0,0,0.4),${c}08)`:`linear-gradient(135deg,${c}06,${c}12)`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:10}}>
                <div><div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:16,color:textPrimary}}>Ideas Bank — {niche.label}</div><div style={{fontSize:12,color:textMuted,marginTop:2}}>Tap any idea to add it instantly</div></div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {["All",...pillars].map(p=>(
                    <button key={p} onClick={()=>setIdeaFilter(p)} className="pill"
                      style={{background:ideaFilter===p?`${c}22`:"transparent",color:ideaFilter===p?c:textMuted,border:`1px solid ${ideaFilter===p?c:border}`}}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
                {ideas.map((idea,i)=>(
                  <div key={i} className="ideacard" onClick={()=>{setNewPost(p=>({...p,caption:idea.idea,type:idea.type}));setShowPostForm(true);}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span className="tag">{idea.type}</span><span style={{fontSize:11,color:`${c}88`,fontWeight:600}}>{idea.pillar}</span></div>
                    <div style={{fontSize:13,color:textSecondary,lineHeight:1.5}}>{idea.idea}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Caption starters */}
            <div style={{...S.card,marginBottom:20}}>
              <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:15,color:textPrimary,marginBottom:12}}>Caption Starters</div>
              <div style={{display:"grid",gap:8}}>
                {niche.captions.map((cap,i)=>(
                  <div key={i} style={{background:dm?"rgba(0,0,0,0.3)":"rgba(0,0,0,0.04)",border:`1px solid ${border}`,borderRadius:10,padding:"12px 16px",fontSize:13,color:textSecondary,lineHeight:1.5,cursor:"pointer"}} onClick={()=>{setNewPost(p=>({...p,caption:cap}));setShowPostForm(true);}}>
                    {cap}
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics section */}
            {analyticsLogs.length>0&&(
              <div style={{...S.card,marginBottom:20}}>
                <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:16,color:textPrimary,marginBottom:16}}>📊 Analytics Overview</div>
                <div className="g3" style={{marginBottom:16}}>
                  {[
                    {label:"Avg Views",value:analyticsLogs.length?Math.round(analyticsLogs.reduce((a,b)=>a+(Number(b.views)||0),0)/analyticsLogs.length).toLocaleString():"—",color:c},
                    {label:"Avg Saves",value:analyticsLogs.length?Math.round(analyticsLogs.reduce((a,b)=>a+(Number(b.saves)||0),0)/analyticsLogs.length).toLocaleString():"—",color:"#4ade80"},
                    {label:"Avg Shares",value:analyticsLogs.length?Math.round(analyticsLogs.reduce((a,b)=>a+(Number(b.shares)||0),0)/analyticsLogs.length).toLocaleString():"—",color:"#fbbf24"},
                  ].map(item=>(
                    <div key={item.label} style={{background:dm?"rgba(0,0,0,0.2)":"rgba(0,0,0,0.04)",borderRadius:12,padding:16,border:`1px solid ${border}`}}>
                      <div style={{fontSize:11,color:item.color,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>{item.label}</div>
                      <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:24,fontWeight:700,color:item.color}}>{item.value}</div>
                    </div>
                  ))}
                </div>
                {analyticsLogs.map(log=>(
                  <div key={log.id} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"10px 0",borderBottom:`1px solid ${border}`,flexWrap:"wrap"}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,color:textPrimary,marginBottom:4,fontWeight:500}}>{log.caption}</div>
                      <div style={{display:"flex",gap:8,flexWrap:"wrap",fontSize:11,color:textMuted}}>
                        <span className="tag">{log.platform}</span>
                        {log.date&&<span>{log.date}</span>}
                        {log.views&&<span>👁 {Number(log.views).toLocaleString()}</span>}
                        {log.reach&&<span>📡 {Number(log.reach).toLocaleString()} reach</span>}
                        {log.saves&&<span>🔖 {Number(log.saves).toLocaleString()}</span>}
                        {log.shares&&<span>↗ {Number(log.shares).toLocaleString()}</span>}
                        {log.likes&&<span>❤️ {Number(log.likes).toLocaleString()}</span>}
                        {log.comments&&<span>💬 {Number(log.comments).toLocaleString()}</span>}
                      </div>
                    </div>
                    <button style={S.dangerBtn} onClick={()=>setAnalyticsLogs(analyticsLogs.filter(l=>l.id!==log.id))}>✕</button>
                  </div>
                ))}
              </div>
            )}

            {/* Filters + posts */}
            <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
              <input type="month" value={filterMonth} onChange={e=>setFilterMonth(e.target.value)} style={{width:"auto",minWidth:160}}/>
              <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{width:"auto",minWidth:130}}>
                <option>All</option>{STATUS_OPTIONS.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            {filteredPosts.length===0&&<div style={{textAlign:"center",color:textMuted,padding:"40px 0",fontSize:14}}>No posts yet — pick an idea above or add one manually</div>}
            {filteredPosts.map(p=>(
              <div key={p.id} className="postcard">
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:10}}>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}><span style={{fontSize:12,color:textMuted}}>{p.date}</span><span className="tag">{p.platform}</span><span className="tag">{p.type}</span></div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <select value={p.status} onChange={e=>setPosts(posts.map(pp=>pp.id===p.id?{...pp,status:e.target.value}:pp))} style={{width:"auto",minWidth:120,fontSize:12,padding:"4px 10px",color:STATUS_COLORS[p.status],background:STATUS_COLORS[p.status]+"18",border:`1px solid ${STATUS_COLORS[p.status]}44`}}>
                      {STATUS_OPTIONS.map(s=><option key={s} style={{color:textPrimary,background:surfaceSolid}}>{s}</option>)}
                    </select>
                    <button style={S.dangerBtn} onClick={()=>setPosts(posts.filter(pp=>pp.id!==p.id))}>✕</button>
                  </div>
                </div>
                <div style={{fontSize:14,color:textPrimary,marginBottom:p.hashtags||p.notes?8:0}}>{p.caption}</div>
                {p.hashtags&&<div style={{fontSize:12,color:`${c}99`}}>{p.hashtags}</div>}
                {p.notes&&<div style={{fontSize:12,color:textMuted,marginTop:4,fontStyle:"italic"}}>📝 {p.notes}</div>}
              </div>
            ))}

            {/* Analytics modal */}
            {showAnalyticsForm&&(
              <div className="modal-bg">
                <div className="modal">
                  <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:20,color:textPrimary,marginBottom:6}}>Log Post Analytics</div>
                  <div style={{fontSize:12,color:textMuted,marginBottom:20,padding:"10px 14px",background:dm?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)",borderRadius:10,border:`1px solid ${border}`}}>
                    <strong style={{color:c}}>How to find your stats:</strong><br/>
                    {niche.analyticsHints.ig&&<><span style={{color:textSecondary}}>📸 Instagram: </span>{niche.analyticsHints.ig}<br/></>}
                    {niche.analyticsHints.tiktok&&<><span style={{color:textSecondary}}>🎵 TikTok: </span>{niche.analyticsHints.tiktok}<br/></>}
                    {niche.analyticsHints.linkedin&&<><span style={{color:textSecondary}}>💼 LinkedIn: </span>{niche.analyticsHints.linkedin}</>}
                  </div>
                  <div style={{display:"grid",gap:14}}>
                    <div className="g2">
                      <div><label style={S.label}>Date</label><input type="date" value={newAnalytics.date} onChange={e=>setNewAnalytics({...newAnalytics,date:e.target.value})}/></div>
                      <div><label style={S.label}>Platform</label><select value={newAnalytics.platform} onChange={e=>setNewAnalytics({...newAnalytics,platform:e.target.value})}>{PLATFORMS.map(p=><option key={p}>{p}</option>)}</select></div>
                    </div>
                    <div><label style={S.label}>Post description / caption</label><input value={newAnalytics.caption} onChange={e=>setNewAnalytics({...newAnalytics,caption:e.target.value})} placeholder="What was this post about?"/></div>
                    <div className="g3">
                      <div><label style={S.label}>Views / Plays</label><input type="number" value={newAnalytics.views} onChange={e=>setNewAnalytics({...newAnalytics,views:e.target.value})} placeholder="0"/></div>
                      <div><label style={S.label}>Reach</label><input type="number" value={newAnalytics.reach} onChange={e=>setNewAnalytics({...newAnalytics,reach:e.target.value})} placeholder="0"/></div>
                      <div><label style={S.label}>Likes</label><input type="number" value={newAnalytics.likes} onChange={e=>setNewAnalytics({...newAnalytics,likes:e.target.value})} placeholder="0"/></div>
                    </div>
                    <div className="g3">
                      <div><label style={S.label}>Saves</label><input type="number" value={newAnalytics.saves} onChange={e=>setNewAnalytics({...newAnalytics,saves:e.target.value})} placeholder="0"/></div>
                      <div><label style={S.label}>Shares</label><input type="number" value={newAnalytics.shares} onChange={e=>setNewAnalytics({...newAnalytics,shares:e.target.value})} placeholder="0"/></div>
                      <div><label style={S.label}>Comments</label><input type="number" value={newAnalytics.comments} onChange={e=>setNewAnalytics({...newAnalytics,comments:e.target.value})} placeholder="0"/></div>
                    </div>
                    <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                      <button style={S.ghostBtn} onClick={()=>setShowAnalyticsForm(false)}>Cancel</button>
                      <button style={S.primaryBtn} onClick={addAnalytics}>Save Analytics</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showPostForm&&(
              <div className="modal-bg">
                <div className="modal">
                  <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:20,color:textPrimary,marginBottom:20}}>Add New Post</div>
                  <div style={{display:"grid",gap:14}}>
                    <div><label style={S.label}>Date</label><input type="date" value={newPost.date} onChange={e=>setNewPost({...newPost,date:e.target.value})}/></div>
                    <div className="g2">
                      <div><label style={S.label}>Platform</label><select value={newPost.platform} onChange={e=>setNewPost({...newPost,platform:e.target.value})}>{PLATFORMS.map(p=><option key={p}>{p}</option>)}</select></div>
                      <div><label style={S.label}>Format</label><select value={newPost.type} onChange={e=>setNewPost({...newPost,type:e.target.value})}>{["Reel","Carousel","Static Post","Story","Video","Thread","Other"].map(t=><option key={t}>{t}</option>)}</select></div>
                    </div>
                    <div><label style={S.label}>Caption / Idea</label><textarea value={newPost.caption} onChange={e=>setNewPost({...newPost,caption:e.target.value})} placeholder="Write your caption or post concept..."/></div>
                    <div><label style={S.label}>Hashtags</label><input value={newPost.hashtags} onChange={e=>setNewPost({...newPost,hashtags:e.target.value})} placeholder="#yourniche #business"/></div>
                    <div><label style={S.label}>Status</label><select value={newPost.status} onChange={e=>setNewPost({...newPost,status:e.target.value})}>{STATUS_OPTIONS.map(s=><option key={s}>{s}</option>)}</select></div>
                    <div><label style={S.label}>Notes</label><input value={newPost.notes} onChange={e=>setNewPost({...newPost,notes:e.target.value})} placeholder="Reminders, visuals needed, etc."/></div>
                    <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><button style={S.ghostBtn} onClick={()=>setShowPostForm(false)}>Cancel</button><button style={S.primaryBtn} onClick={addPost}>Save Post</button></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ FINANCE ══ */}
        {tab==="Finance"&&(
          <div>
            <div style={{marginBottom:20}}>
              <div style={S.sectionTitle}>Finance</div>
              <div style={S.sectionSub}>Track money, customers, vendors, and pricing for {brand.name}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {FINANCE_TABS.map(ft=><button key={ft} style={S.finSubBtn(finTab===ft)} onClick={()=>setFinTab(ft)}>{ft}</button>)}
              </div>
            </div>

            {/* Overview */}
            {finTab==="Overview"&&(
              <div>
                {goalSet&&(
                  <div style={{...S.card,marginBottom:20,border:`1px solid ${income>=monthlyGoal?"#4ade8033":c+"33"}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:8}}>
                      <div style={{fontSize:13,fontWeight:600,color:textPrimary}}>Monthly Income Goal</div>
                      <div style={{fontSize:13,color:income>=monthlyGoal?"#4ade80":c,fontWeight:700}}>{fmt(income)} / {fmt(monthlyGoal)} ({pct(income,monthlyGoal)}%)</div>
                    </div>
                    <div style={{height:8,background:dm?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.08)",borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",width:pct(income,monthlyGoal)+"%",background:income>=monthlyGoal?"#4ade80":c,borderRadius:4,transition:"width 0.5s"}}/></div>
                  </div>
                )}
                <div className="g3" style={{marginBottom:20}}>
                  {[{label:"Total Income",value:fmt(income),color:"#4ade80",border:"#4ade8033"},{label:"Total Expenses",value:fmt(expense),color:"#f87171",border:"#f8717133"},{label:"Net Profit",value:fmt(profit),color:profit>=0?"#4ade80":"#f87171",border:(profit>=0?"#4ade80":"#f87171")+"33"}].map(item=>(
                    <div key={item.label} style={{...S.card,border:`1px solid ${item.border}`}}>
                      <div style={{fontSize:11,color:item.color,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>{item.label}</div>
                      <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:26,fontWeight:700,color:item.color}}>{item.value}</div>
                    </div>
                  ))}
                </div>
                <div className="g2">
                  <div style={S.card}>
                    <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:15,color:"#4ade80",marginBottom:14}}>Income by Category</div>
                    {niche.incomeCategories.map(cat=>{const total=transactions.filter(t=>t.type==="Income"&&t.category===cat).reduce((a,b)=>a+b.amount,0);if(!total)return null;return<div key={cat} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"8px 0",borderBottom:`1px solid ${border}`}}><span style={{color:textSecondary}}>{cat}</span><span style={{color:"#4ade80",fontWeight:600}}>{fmt(total)}</span></div>;})}
                    {transactions.filter(t=>t.type==="Income").length===0&&<div style={{fontSize:12,color:textMuted}}>No income recorded yet</div>}
                  </div>
                  <div style={S.card}>
                    <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:15,color:"#f87171",marginBottom:14}}>Expenses by Category</div>
                    {niche.expenseCategories.map(cat=>{const total=transactions.filter(t=>t.type==="Expense"&&t.category===cat).reduce((a,b)=>a+b.amount,0);if(!total)return null;return<div key={cat} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"8px 0",borderBottom:`1px solid ${border}`}}><span style={{color:textSecondary}}>{cat}</span><span style={{color:"#f87171",fontWeight:600}}>{fmt(total)}</span></div>;})}
                    {transactions.filter(t=>t.type==="Expense").length===0&&<div style={{fontSize:12,color:textMuted}}>No expenses recorded yet</div>}
                  </div>
                </div>
              </div>
            )}

            {/* Transactions */}
            {finTab==="Transactions"&&(
              <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:12}}>
                  <input type="month" value={filterMonth} onChange={e=>setFilterMonth(e.target.value)} style={{width:"auto",minWidth:160}}/>
                  <button style={S.primaryBtn} onClick={()=>setShowTxForm(true)}>+ Add Transaction</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"80px 1fr 110px 90px 50px",gap:12,padding:"6px 16px",fontSize:10,color:c,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>
                  <span>Date</span><span>Description</span><span>Category</span><span>Amount</span><span></span>
                </div>
                {filteredTx.length===0&&<div style={{textAlign:"center",color:textMuted,padding:"32px 0",fontSize:14}}>No transactions for this period</div>}
                {filteredTx.map(t=>(
                  <div key={t.id} style={{display:"grid",gridTemplateColumns:"80px 1fr 110px 90px 50px",gap:12,alignItems:"center",padding:"12px 16px",background:surface,border:`1px solid ${border}`,borderRadius:10,marginBottom:8,fontSize:13}}>
                    <span style={{fontSize:11,color:textMuted}}>{t.date}</span>
                    <div><div style={{fontWeight:500,color:textPrimary}}>{t.description}</div><span style={{fontSize:10,color:textMuted}}>{t.type}</span></div>
                    <span className="tag" style={{fontSize:10}}>{t.category}</span>
                    <span style={{fontWeight:700,color:t.type==="Income"?"#4ade80":"#f87171"}}>{t.type==="Income"?"+":"-"}{fmt(t.amount)}</span>
                    <button style={S.dangerBtn} onClick={()=>setTransactions(transactions.filter(tt=>tt.id!==t.id))}>✕</button>
                  </div>
                ))}
                {showTxForm&&(
                  <div className="modal-bg">
                    <div className="modal">
                      <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:20,color:textPrimary,marginBottom:20}}>Add Transaction</div>
                      <div style={{display:"grid",gap:14}}>
                        <div><label style={S.label}>Date</label><input type="date" value={newTx.date} onChange={e=>setNewTx({...newTx,date:e.target.value})}/></div>
                        <div className="g2">
                          <div><label style={S.label}>Type</label><select value={newTx.type} onChange={e=>setNewTx({...newTx,type:e.target.value,category:(e.target.value==="Income"?niche.incomeCategories:niche.expenseCategories)[0]})}><option>Income</option><option>Expense</option></select></div>
                          <div><label style={S.label}>Category</label><select value={newTx.category} onChange={e=>setNewTx({...newTx,category:e.target.value})}>{(newTx.type==="Income"?niche.incomeCategories:niche.expenseCategories).map(c=><option key={c}>{c}</option>)}</select></div>
                        </div>
                        <div><label style={S.label}>Description</label><input value={newTx.description} onChange={e=>setNewTx({...newTx,description:e.target.value})} placeholder="What was this for?"/></div>
                        <div><label style={S.label}>Amount ($)</label><input type="number" value={newTx.amount} onChange={e=>setNewTx({...newTx,amount:e.target.value})} placeholder="0.00" min="0" step="0.01"/></div>
                        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><button style={S.ghostBtn} onClick={()=>setShowTxForm(false)}>Cancel</button><button style={S.primaryBtn} onClick={addTx}>Save</button></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Customers */}
            {finTab==="Customers"&&(
              <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
                  <div className="g3" style={{flex:1}}>
                    {[{label:"Total Customers",value:customers.length,color:c},{label:"Total Customer Value",value:fmt(customers.reduce((a,b)=>a+(Number(b.totalSpent)||0),0)),color:"#4ade80"},{label:"Avg. Customer Value",value:customers.length?fmt(customers.reduce((a,b)=>a+(Number(b.totalSpent)||0),0)/customers.length):fmt(0),color:"#fbbf24"}].map(item=>(
                      <div key={item.label} className="stat-card">
                        <div style={{fontSize:11,color:item.color,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>{item.label}</div>
                        <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:22,fontWeight:700,color:item.color}}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <button style={S.primaryBtn} onClick={()=>setShowCustForm(true)}>+ Add Customer</button>
                </div>
                {customers.length===0&&<div style={{...S.card,textAlign:"center",padding:"40px 24px"}}><div style={{fontSize:32,marginBottom:10}}>👥</div><div style={{fontSize:15,color:textPrimary,marginBottom:6}}>No customers yet</div><div style={{fontSize:13,color:textMuted}}>Add your first customer to build your client database</div></div>}
                {customers.map(cust=>(
                  <div key={cust.id} className="row-card">
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                      <div style={{display:"flex",gap:14,alignItems:"flex-start",flex:1,flexWrap:"wrap"}}>
                        <div style={{width:40,height:40,borderRadius:"50%",background:`${c}22`,border:`1px solid ${c}44`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"'Fraunces',Georgia,serif",fontSize:16,color:c,fontWeight:700}}>{cust.name.charAt(0).toUpperCase()}</div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:15,fontWeight:600,color:textPrimary,marginBottom:4}}>{cust.name}</div>
                          <div style={{display:"flex",gap:12,flexWrap:"wrap",fontSize:12,color:textMuted}}>
                            {cust.phone&&<span>📞 {cust.phone}</span>}
                            {cust.email&&<span>✉️ {cust.email}</span>}
                            {cust.address&&<span>📍 {cust.address}</span>}
                          </div>
                          {cust.notes&&<div style={{fontSize:12,color:textMuted,marginTop:6,fontStyle:"italic"}}>"{cust.notes}"</div>}
                        </div>
                      </div>
                      <div style={{display:"flex",gap:12,alignItems:"center"}}>
                        <div style={{textAlign:"right"}}>
                          {cust.totalSpent>0&&<div style={{fontSize:14,fontWeight:700,color:"#4ade80"}}>{fmt(cust.totalSpent)}</div>}
                          {cust.lastPurchase&&<div style={{fontSize:11,color:textMuted}}>Last: {cust.lastPurchase}</div>}
                        </div>
                        <button style={S.dangerBtn} onClick={()=>setCustomers(customers.filter(cc=>cc.id!==cust.id))}>✕</button>
                      </div>
                    </div>
                  </div>
                ))}
                {showCustForm&&(
                  <div className="modal-bg">
                    <div className="modal">
                      <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:20,color:textPrimary,marginBottom:20}}>Add Customer</div>
                      <div style={{display:"grid",gap:14}}>
                        <div><label style={S.label}>Full Name *</label><input value={newCust.name} onChange={e=>setNewCust({...newCust,name:e.target.value})} placeholder="Customer full name"/></div>
                        <div className="g2">
                          <div><label style={S.label}>Phone</label><input value={newCust.phone} onChange={e=>setNewCust({...newCust,phone:e.target.value})} placeholder="+234..."/></div>
                          <div><label style={S.label}>Email</label><input value={newCust.email} onChange={e=>setNewCust({...newCust,email:e.target.value})} placeholder="email@example.com"/></div>
                        </div>
                        <div><label style={S.label}>Address / Location</label><input value={newCust.address} onChange={e=>setNewCust({...newCust,address:e.target.value})} placeholder="City, area, or full address"/></div>
                        <div className="g2">
                          <div><label style={S.label}>Total Spent ($)</label><input type="number" value={newCust.totalSpent} onChange={e=>setNewCust({...newCust,totalSpent:e.target.value})} placeholder="0.00"/></div>
                          <div><label style={S.label}>Last Purchase Date</label><input type="date" value={newCust.lastPurchase} onChange={e=>setNewCust({...newCust,lastPurchase:e.target.value})}/></div>
                        </div>
                        <div><label style={S.label}>Notes</label><textarea value={newCust.notes} onChange={e=>setNewCust({...newCust,notes:e.target.value})} placeholder="Preferences, allergies, important details..."/></div>
                        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><button style={S.ghostBtn} onClick={()=>setShowCustForm(false)}>Cancel</button><button style={S.primaryBtn} onClick={addCust}>Save Customer</button></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Vendors */}
            {finTab==="Vendors"&&(
              <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
                  <div className="g2" style={{flex:1}}>
                    {[{label:"Total Vendors",value:vendors.length,color:c},{label:"Total Outstanding",value:fmt(vendors.reduce((a,b)=>a+(Number(b.outstanding)||0),0)),color:"#f87171"}].map(item=>(
                      <div key={item.label} className="stat-card">
                        <div style={{fontSize:11,color:item.color,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>{item.label}</div>
                        <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:22,fontWeight:700,color:item.color}}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <button style={S.primaryBtn} onClick={()=>setShowVendorForm(true)}>+ Add Vendor</button>
                </div>
                {vendors.length===0&&<div style={{...S.card,textAlign:"center",padding:"40px 24px"}}><div style={{fontSize:32,marginBottom:10}}>🏭</div><div style={{fontSize:15,color:textPrimary,marginBottom:6}}>No vendors yet</div><div style={{fontSize:13,color:textMuted}}>Track your suppliers and what you owe them</div></div>}
                {vendors.map(v=>(
                  <div key={v.id} className="row-card">
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:15,fontWeight:600,color:textPrimary,marginBottom:4}}>{v.name}</div>
                        <div style={{display:"flex",gap:12,flexWrap:"wrap",fontSize:12,color:textMuted,marginBottom:v.supplies?6:0}}>
                          {v.contact&&<span>👤 {v.contact}</span>}
                          {v.phone&&<span>📞 {v.phone}</span>}
                          {v.email&&<span>✉️ {v.email}</span>}
                        </div>
                        {v.supplies&&<div style={{fontSize:12,color:textSecondary}}>Supplies: {v.supplies}</div>}
                        {v.paymentTerms&&<div style={{fontSize:12,color:textMuted,marginTop:2}}>Terms: {v.paymentTerms}</div>}
                      </div>
                      <div style={{display:"flex",gap:12,alignItems:"center"}}>
                        {v.outstanding>0&&<div style={{textAlign:"right"}}><div style={{fontSize:12,color:textMuted,marginBottom:2}}>Outstanding</div><div style={{fontSize:15,fontWeight:700,color:"#f87171"}}>{fmt(v.outstanding)}</div></div>}
                        <button style={S.dangerBtn} onClick={()=>setVendors(vendors.filter(vv=>vv.id!==v.id))}>✕</button>
                      </div>
                    </div>
                  </div>
                ))}
                {showVendorForm&&(
                  <div className="modal-bg">
                    <div className="modal">
                      <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:20,color:textPrimary,marginBottom:20}}>Add Vendor / Supplier</div>
                      <div style={{display:"grid",gap:14}}>
                        <div><label style={S.label}>Business / Supplier Name *</label><input value={newVendor.name} onChange={e=>setNewVendor({...newVendor,name:e.target.value})} placeholder="e.g. Lagos Beauty Wholesale"/></div>
                        <div className="g2">
                          <div><label style={S.label}>Contact Person</label><input value={newVendor.contact} onChange={e=>setNewVendor({...newVendor,contact:e.target.value})} placeholder="Name of your contact"/></div>
                          <div><label style={S.label}>Phone</label><input value={newVendor.phone} onChange={e=>setNewVendor({...newVendor,phone:e.target.value})} placeholder="+234..."/></div>
                        </div>
                        <div><label style={S.label}>Email</label><input value={newVendor.email} onChange={e=>setNewVendor({...newVendor,email:e.target.value})} placeholder="vendor@email.com"/></div>
                        <div><label style={S.label}>What do they supply you?</label><input value={newVendor.supplies} onChange={e=>setNewVendor({...newVendor,supplies:e.target.value})} placeholder="e.g. Hair products, packaging materials"/></div>
                        <div className="g2">
                          <div><label style={S.label}>Payment Terms</label><input value={newVendor.paymentTerms} onChange={e=>setNewVendor({...newVendor,paymentTerms:e.target.value})} placeholder="e.g. Net 30, pay on delivery"/></div>
                          <div><label style={S.label}>Outstanding Balance ($)</label><input type="number" value={newVendor.outstanding} onChange={e=>setNewVendor({...newVendor,outstanding:e.target.value})} placeholder="0.00"/></div>
                        </div>
                        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><button style={S.ghostBtn} onClick={()=>setShowVendorForm(false)}>Cancel</button><button style={S.primaryBtn} onClick={addVendor}>Save Vendor</button></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Calculator */}
            {finTab==="Calculator"&&(
              <div className="g2" style={{alignItems:"start"}}>
                <div style={S.card}>
                  <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:18,color:textPrimary,marginBottom:6}}>Profit Margin Calculator</div>
                  <div style={{fontSize:13,color:textMuted,marginBottom:20,fontWeight:300}}>Enter your cost and selling price to see your exact profit margin, markup, and total earnings</div>
                  <div style={{display:"grid",gap:16}}>
                    <div><label style={S.label}>Cost Price — what you pay</label><input type="number" value={margin.cost} onChange={e=>setMargin({...margin,cost:e.target.value})} placeholder="0.00" min="0" step="0.01"/><div style={{fontSize:11,color:textMuted,marginTop:4}}>The price you paid for the product or service</div></div>
                    <div><label style={S.label}>Selling Price — what you charge</label><input type="number" value={margin.sell} onChange={e=>setMargin({...margin,sell:e.target.value})} placeholder="0.00" min="0" step="0.01"/><div style={{fontSize:11,color:textMuted,marginTop:4}}>The price your customer pays</div></div>
                    <div><label style={S.label}>Quantity</label><input type="number" value={margin.qty} onChange={e=>setMargin({...margin,qty:e.target.value})} placeholder="1" min="1"/><div style={{fontSize:11,color:textMuted,marginTop:4}}>How many units you are selling</div></div>
                  </div>
                </div>
                <div style={{display:"grid",gap:14}}>
                  {[{label:"Profit Margin",value:marginPct+"%",desc:"Percentage of selling price that is profit",color:Number(marginPct)>30?"#4ade80":Number(marginPct)>15?c:"#f87171"},{label:"Markup",value:markup+"%",desc:"How much above cost price you are charging",color:c},{label:"Profit Per Unit",value:fmt(profitPerUnit),desc:"How much you make on each item sold",color:profitPerUnit>=0?"#4ade80":"#f87171"},{label:"Total Profit",value:fmt(totalProfit),desc:`For ${margin.qty||1} unit${(margin.qty||1)>1?"s":""}`,color:totalProfit>=0?"#4ade80":"#f87171"}].map(item=>(
                    <div key={item.label} style={{...S.card,padding:18}}>
                      <div style={{fontSize:11,color:item.color,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>{item.label}</div>
                      <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:26,fontWeight:700,color:item.color,marginBottom:4}}>{item.value}</div>
                      <div style={{fontSize:11,color:textMuted}}>{item.desc}</div>
                    </div>
                  ))}
                  <div style={{...S.card,padding:18,background:Number(marginPct)>30?"#4ade8011":Number(marginPct)>15?`${c}11`:"#f8717111",border:`1px solid ${Number(marginPct)>30?"#4ade8033":Number(marginPct)>15?c+"33":"#f8717133"}`}}>
                    <div style={{fontSize:13,fontWeight:600,color:textPrimary,marginBottom:6}}>{Number(marginPct)>30?"🔥 Excellent margin!":Number(marginPct)>15?"👍 Healthy margin":Number(marginPct)>0?"⚠️ Low margin — consider adjusting your price":"Enter your prices above to see the analysis"}</div>
                    <div style={{fontSize:12,color:textMuted,lineHeight:1.6}}>{Number(marginPct)>30?"You are keeping more than 30% of every sale as profit. That is strong.":Number(marginPct)>15?"Your margin is healthy. Most businesses aim for 20–40%.":Number(marginPct)>0?"Below 15% margin leaves little room for business expenses. Consider raising your price.":"A healthy margin is typically 20–40% depending on your industry."}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Invoice */}
            {finTab==="Invoice"&&(
              <div>
                <div style={S.card}>
                  <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:18,color:textPrimary,marginBottom:20}}>Invoice Generator</div>
                  <div className="g2" style={{marginBottom:16}}>
                    <div><label style={S.label}>Your Business Name</label><input value={brand.name} readOnly style={{opacity:0.6}}/></div>
                    <div><label style={S.label}>Invoice Date</label><input type="date" value={invoice.date} onChange={e=>setInvoice({...invoice,date:e.target.value})}/></div>
                  </div>
                  <div className="g2" style={{marginBottom:16}}>
                    <div><label style={S.label}>Client Name</label><input value={invoice.clientName} onChange={e=>setInvoice({...invoice,clientName:e.target.value})} placeholder="Who are you invoicing?"/></div>
                    <div><label style={S.label}>Client Email</label><input value={invoice.clientEmail} onChange={e=>setInvoice({...invoice,clientEmail:e.target.value})} placeholder="client@email.com"/></div>
                  </div>
                  <div style={{marginBottom:16}}><label style={S.label}>Service / Product Description</label><textarea value={invoice.service} onChange={e=>setInvoice({...invoice,service:e.target.value})} placeholder="Describe what you are charging for..."/></div>
                  <div className="g2" style={{marginBottom:16}}>
                    <div><label style={S.label}>Amount ($)</label><input type="number" value={invoice.amount} onChange={e=>setInvoice({...invoice,amount:e.target.value})} placeholder="0.00"/></div>
                    <div><label style={S.label}>Payment Notes</label><input value={invoice.notes} onChange={e=>setInvoice({...invoice,notes:e.target.value})} placeholder="Bank details, due date, etc."/></div>
                  </div>
                  <button style={S.primaryBtn} onClick={()=>setShowInvoicePreview(true)}>Preview Invoice →</button>
                </div>
                {showInvoicePreview&&(
                  <div style={{...S.card,marginTop:20,background:"#ffffff",color:"#111"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32,flexWrap:"wrap",gap:12}}>
                      <div><div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:28,fontWeight:700,color:c,marginBottom:4}}>{brand.name}</div>{brand.tagline&&<div style={{fontSize:13,color:"#6b7280"}}>{brand.tagline}</div>}</div>
                      <div style={{textAlign:"right"}}><div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:22,fontWeight:700,color:"#111"}}>INVOICE</div><div style={{fontSize:12,color:"#6b7280",marginTop:4}}>Date: {invoice.date||new Date().toISOString().slice(0,10)}</div><div style={{fontSize:12,color:"#6b7280"}}>#{Math.floor(Math.random()*9000)+1000}</div></div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:28}}>
                      <div><div style={{fontSize:11,color:"#6b7280",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.08em"}}>Billed To</div><div style={{fontSize:15,fontWeight:600,color:"#111"}}>{invoice.clientName||"Client Name"}</div>{invoice.clientEmail&&<div style={{fontSize:13,color:"#6b7280"}}>{invoice.clientEmail}</div>}</div>
                      <div><div style={{fontSize:11,color:"#6b7280",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.08em"}}>From</div><div style={{fontSize:15,fontWeight:600,color:"#111"}}>{brand.name}</div></div>
                    </div>
                    <div style={{background:"#f8f8f8",borderRadius:10,padding:"16px 20px",marginBottom:20}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:12,color:"#6b7280",textTransform:"uppercase",letterSpacing:"0.08em"}}>Service</span><span style={{fontSize:12,color:"#6b7280",textTransform:"uppercase",letterSpacing:"0.08em"}}>Amount</span></div>
                      <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderTop:"1px solid #e5e7eb"}}><span style={{fontSize:14,color:"#111"}}>{invoice.service||"Service description"}</span><span style={{fontSize:14,fontWeight:700,color:"#111"}}>{fmt(invoice.amount||0)}</span></div>
                    </div>
                    <div style={{display:"flex",justifyContent:"flex-end",marginBottom:20}}><div style={{background:c,color:"#fff",borderRadius:10,padding:"12px 24px"}}><div style={{fontSize:11,marginBottom:2,opacity:0.8}}>Total Due</div><div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:24,fontWeight:700}}>{fmt(invoice.amount||0)}</div></div></div>
                    {invoice.notes&&<div style={{borderTop:"1px solid #e5e7eb",paddingTop:16,fontSize:13,color:"#6b7280"}}><span style={{fontWeight:600,color:"#111"}}>Payment notes: </span>{invoice.notes}</div>}
                    <div style={{display:"flex",gap:10,marginTop:20}}>
                      <button style={S.primaryBtn} onClick={()=>window.print()}>🖨️ Print Invoice</button>
                      <button style={{...S.ghostBtn,color:"#111",border:"1px solid #e5e7eb"}} onClick={()=>setShowInvoicePreview(false)}>Close</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══ GUIDE ══ */}
        {tab==="Guide"&&(
          <div>
            <div style={S.sectionTitle}>How to Use BizKit Pro</div>
            <div style={S.sectionSub}>Plain-English guide to every section — no jargon, no overwhelm</div>
            {[
              {title:"🏠 Home",content:`Your command centre. At a glance you see income, expenses, profit, and your content pipeline.\n\nThe brand hero at the top shows your business name, tagline, and niche — personalised to you. If you have set a monthly goal in Brand Hub, you will see a live progress bar here too.\n\nUse the quick action buttons at the bottom to jump straight into adding content, transactions, or the profit calculator.`},
              {title:"🎨 Brand Hub",content:`Define who you are and what your business stands for.\n\n**Business Identity** — your name, tagline, niche, audience, and brand colour. This is the foundation everything else is built on.\n\n**Monthly Goal** — set an income target and watch a live progress bar fill up as you log income. Incredibly motivating.\n\n**Content Pillars** — the 5 themes your content rotates around. Every post should fall into one of these.\n\n**Setup Checklist** — ${niche.checklist.length} tasks pre-loaded for ${niche.label} businesses. Tick them off as you complete them, and add your own custom items at the bottom. This is your roadmap for getting properly set up.`},
              {title:"📅 Content Planner",content:`Plan every post before it goes live. Never scramble for ideas again.\n\n**Ideas Bank** — ${niche.contentIdeas.length} content ideas written specifically for ${niche.label} businesses. Tap any idea to instantly start a post with it pre-filled. Filter by content pillar to find exactly what you need.\n\n**Caption Starters** — fill-in-the-blank captions designed for your niche. Replace the [brackets] with your own details and you have a ready-to-post caption.\n\n**Status tracking** — move posts from Idea → In Progress → Scheduled → Posted as you work through them.\n\n**Analytics** — click "Log Analytics" to paste in stats from your Instagram, TikTok, or LinkedIn. The app tells you exactly where to find your numbers. Over time you will see which content types perform best for your audience.`},
              {title:"💰 Finance — Overview & Transactions",content:`Track every transaction so you always know exactly where your money stands.\n\n**Overview** shows your total income, expenses, and net profit broken down by category. At a glance you can see which income streams are performing and where expenses are going.\n\n**Transactions** is where you log every payment in and out. Every sale, every expense, every subscription. The categories are tailored to ${niche.label} businesses so everything fits naturally.\n\nLog every transaction — even the small ones. After 3 months the data will show you things about your business you would not have noticed otherwise.`},
              {title:"👥 Finance — Customers",content:`Build and maintain your client database.\n\nAdd each customer's name, phone, email, address, and notes — preferences, allergies, anything important. Track how much they have spent in total and when their last purchase was.\n\nThe three summary cards at the top show your total customers, total customer value (all their spending combined), and average customer value.\n\nThis turns your business from a list of transactions into a real relationship-based operation. You will know your top customers, who to follow up with, and who has gone quiet.`},
              {title:"🏭 Finance — Vendors",content:`Track your suppliers and what you owe them.\n\nAdd each vendor's business name, contact person, phone, email, what they supply you, payment terms, and any outstanding balance.\n\nThe outstanding balance tracker helps you stay on top of what you owe so you are never caught off guard when a supplier calls. This is especially important for product-based businesses where you are buying stock regularly.`},
              {title:"🧮 Finance — Calculator & Invoice",content:`**Profit Margin Calculator** — enter your cost price (what you pay) and your selling price (what you charge) to instantly see your profit margin percentage, markup, profit per unit, and total profit for however many units you sell. The colour-coded rating tells you if your margin is healthy, low, or excellent.\n\nA healthy margin is 20–40%. If yours shows red, your price is too low. Use the calculator before setting any price — most small businesses underprice and wonder why they struggle financially.\n\n**Invoice Generator** — fill in client name, service, and amount to get a clean, professional, printable invoice with your business name and brand colour. Print or screenshot it and send to your client.`},
              {title:"💡 Tips for Success",content:`→ **Post consistently, not perfectly.** An imperfect post published today beats a perfect post that never goes out.\n\n→ **Log every transaction** — even the small ones. Over time the data will show you exactly where to focus.\n\n→ **Use the profit calculator before you set your prices.** Know your numbers before you quote a client.\n\n→ **Add your customers.** The businesses that grow fastest are the ones that know their customers by name.\n\n→ **Use the analytics log.** After every post, paste your numbers in. After 2 months you will know exactly what content your audience responds to.\n\n→ **Review weekly.** 10 minutes every Monday — check your content pipeline, your finances, your goal progress. That is all it takes.`},
            ].map(section=>(
              <div key={section.title} className="guide-section">
                <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:18,color:textPrimary,marginBottom:12}}>{section.title}</div>
                {section.content.split("\n\n").map((para,i)=>(
                  <p key={i} style={{fontSize:14,color:textSecondary,lineHeight:1.8,marginBottom:10,fontWeight:300}}>
                    {para.split(/\*\*(.*?)\*\*/g).map((chunk,j)=>j%2===1?<strong key={j} style={{color:textPrimary,fontWeight:600}}>{chunk}</strong>:chunk)}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
