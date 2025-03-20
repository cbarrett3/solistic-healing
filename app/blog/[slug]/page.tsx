'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';

import { Navbar } from '../../components/layout';

// Sample blog data - this would typically come from a CMS or API
// Updated to include slugs for each post
const blogPosts = [
  {
    id: 1,
    slug: 'understanding-mind-body-connection',
    title: 'Understanding the Mind-Body Connection in Therapy',
    excerpt: 'Exploring how our physical sensations influence our mental state and how integrated approaches can lead to more effective healing.',
    content: `
      <p>The mind-body connection is a powerful relationship that forms the foundation of holistic healing approaches. When we understand how our physical sensations influence our mental state—and vice versa—we can develop more effective therapeutic strategies.</p>
      
      <h2>The Science Behind the Connection</h2>
      <p>Research in neuroscience has demonstrated that our thoughts and emotions directly impact our physical health. The nervous system, endocrine system, and immune system all communicate with each other, creating a complex network of interactions.</p>
      
      <p>When we experience stress, our body releases cortisol and adrenaline, preparing us for "fight or flight." This physiological response can manifest as increased heart rate, shallow breathing, muscle tension, and digestive issues. Over time, chronic stress can lead to serious health problems.</p>
      
      <h2>Therapeutic Approaches</h2>
      <p>Integrative therapies that acknowledge the mind-body connection include:</p>
      
      <ul>
        <li><strong>Somatic Experiencing:</strong> Focuses on bodily sensations to resolve trauma</li>
        <li><strong>Mindfulness-Based Cognitive Therapy:</strong> Combines meditation with cognitive techniques</li>
        <li><strong>Yoga Therapy:</strong> Uses movement, breath, and awareness to promote healing</li>
        <li><strong>Biofeedback:</strong> Provides real-time information about physiological processes</li>
      </ul>
      
      <p>By incorporating awareness of physical sensations into therapeutic work, clients can develop greater emotional regulation skills and resilience.</p>
      
      <h2>Practical Applications</h2>
      <p>In our practice, we've found that simple techniques like body scanning, breath awareness, and gentle movement can help clients reconnect with their bodies in a safe, supportive way. This embodied approach is particularly effective for those dealing with anxiety, trauma, and chronic stress.</p>
    `,
    category: 'Holistic Therapy',
    date: 'March 15, 2023',
    readTime: '5 min read',
    imageSrc: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Holistic Therapist',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [2, 3, 4]
  },
  {
    id: 2,
    slug: 'benefits-energy-healing-chronic-pain',
    title: 'The Benefits of Energy Healing for Chronic Pain',
    excerpt: 'Learn how energy healing techniques can complement traditional pain management approaches for those suffering from chronic conditions.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'Energy Healing',
    date: 'March 8, 2023',
    readTime: '8 min read',
    imageSrc: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Energy Healing Specialist',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [1, 3]
  },
  {
    id: 3,
    slug: 'nutritional-approaches-mental-wellness',
    title: 'Nutritional Approaches to Mental Wellness',
    excerpt: 'Discover the growing evidence for how dietary choices can impact mental health and emotional wellbeing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'Nutrition',
    date: 'February 28, 2023',
    readTime: '5 min read',
    imageSrc: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Nutritional Therapist',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [1, 4]
  },
  {
    id: 4,
    slug: 'mindfulness-meditation-emotional-regulation',
    title: 'Mindfulness Meditation: A Path to Emotional Regulation',
    excerpt: 'Explore how regular mindfulness practice can help develop healthier emotional responses to life\'s challenges.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'Mindfulness',
    date: 'February 20, 2023',
    readTime: '7 min read',
    imageSrc: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Mindfulness Instructor',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [1, 5]
  },
  {
    id: 5,
    slug: 'psychedelics-modern-psychotherapy',
    title: 'The Role of Psychedelics in Modern Psychotherapy',
    excerpt: 'An overview of current research and therapeutic applications of psychedelic medicines in mental health treatment.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'Psychedelic Therapy',
    date: 'February 15, 2023',
    readTime: '9 min read',
    imageSrc: 'https://images.unsplash.com/photo-1501389040983-5c22cb186487?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Integration Therapist',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [4]
  },
  {
    id: 6,
    slug: 'trauma-informed-somatic-practices',
    title: 'Trauma-Informed Somatic Practices for Healing',
    excerpt: 'An overview of current research and therapeutic applications of somatic practices in mental health treatment.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'Trauma',
    date: 'February 5, 2023',
    readTime: '8 min read',
    imageSrc: 'https://images.unsplash.com/photo-1502230831726-fe5549140034?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Trauma Specialist',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [1, 4]
  },
  {
    id: 7,
    slug: 'science-behind-sound-healing',
    title: 'The Science Behind Sound Healing Therapy',
    excerpt: 'Discover how sound frequencies can influence brainwave patterns and promote deep relaxation and healing.',
    content: 'Sound healing harnesses the profound physiological effects of acoustic vibrations on our neurological and cellular systems. Research demonstrates that specific sound frequencies can entrain brainwave patterns, shifting consciousness from alert beta states to more therapeutic alpha and theta rhythms associated with deep relaxation and healing. Beyond these neurological effects, the vibrational properties of instruments like singing bowls and tuning forks appear to influence cellular structures and tissue resonance, potentially facilitating physiological repair processes at the most fundamental levels.',
    category: 'Sound Therapy',
    date: 'January 30, 2023',
    readTime: '6 min read',
    imageSrc: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Sound Healing Practitioner',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [1, 8]
  },
  {
    id: 8,
    slug: 'integrating-eastern-western-healing',
    title: 'Integrating Eastern and Western Healing Modalities',
    excerpt: 'Explore how combining traditional Eastern practices with Western medicine can create a more comprehensive approach to wellness.',
    content: 'The integration of Eastern healing traditions with Western medical approaches represents a paradigm shift in healthcare that honors both the scientific rigor of evidence-based medicine and the holistic wisdom of ancient healing systems. This complementary framework recognizes that optimal health emerges from addressing not only physical symptoms but also the energetic, emotional, and spiritual dimensions of wellbeing. By bridging these seemingly disparate approaches, we can develop truly comprehensive treatment protocols that leverage the strengths of each tradition while compensating for their respective limitations.',
    category: 'Integrative Medicine',
    date: 'January 15, 2023',
    readTime: '7 min read',
    imageSrc: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Integrative Health Specialist',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [1, 9]
  },
  {
    id: 9,
    slug: 'role-breathwork-stress-reduction',
    title: 'The Role of Breathwork in Stress Reduction',
    excerpt: 'Learn how conscious breathing techniques can activate the parasympathetic nervous system and reduce chronic stress.',
    content: 'Conscious breathwork represents one of the most accessible yet profound tools for modulating our autonomic nervous system and counteracting the physiological effects of chronic stress. Through specific breathing patterns that emphasize extended exhalation and diaphragmatic engagement, we can directly activate the parasympathetic branch of the nervous system, triggering the body\'s relaxation response. This vagal stimulation cascades through multiple systems, reducing cortisol levels, decreasing inflammation, and restoring homeostatic balance to organs and tissues previously locked in stress-response patterns.',
    category: 'Breathwork',
    date: 'January 5, 2023',
    readTime: '5 min read',
    imageSrc: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Breathwork Facilitator',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [1, 4, 8]
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle mobile menu toggle from Navbar component
  const handleMobileMenuToggle = (isOpen: boolean) => {
    setMobileMenuOpen(isOpen);
  };
  
  useEffect(() => {
    // Simulate fetching post data
    setIsLoading(true);
    const postSlug = params.slug as string;
    const foundPost = blogPosts.find(p => p.slug === postSlug);
    
    if (foundPost) {
      setPost(foundPost);
      
      // Get related posts
      if (foundPost.relatedPosts && foundPost.relatedPosts.length > 0) {
        const related = blogPosts.filter(p => foundPost.relatedPosts.includes(p.id));
        setRelatedPosts(related);
      }
      
      // Scroll to top
      window.scrollTo(0, 0);
    } else {
      // Post not found, redirect to blog listing
      router.push('/blog');
    }
    
    setIsLoading(false);
  }, [params.slug, router]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onMobileMenuToggle={handleMobileMenuToggle} forceDarkMode={true} />
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-card/50 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-card/30 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-card/20 rounded mb-8"></div>
            <div className="h-4 bg-card/30 rounded w-full mb-2"></div>
            <div className="h-4 bg-card/30 rounded w-full mb-2"></div>
            <div className="h-4 bg-card/30 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar onMobileMenuToggle={handleMobileMenuToggle} forceDarkMode={true} />
      
      {/* Compact article layout */}
      <section className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex flex-col">
            {/* Back link */}
            <Link 
              href="/blog"
              className="inline-flex items-center text-xs text-foreground/70 hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Back to Blog
            </Link>
            
            {/* Article header with small image */}
            <div className="flex flex-col md:flex-row gap-5 mb-6">
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="text-foreground/30">•</span>
                  <span className="text-xs text-foreground/60 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.date}
                  </span>
                  <span className="text-foreground/30">•</span>
                  <span className="text-xs text-foreground/60 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                
                <h1 className="text-xl md:text-2xl lg:text-3xl font-medium mb-3 text-foreground leading-tight">
                  {post.title}
                </h1>
                
                <p className="text-foreground/80 text-base mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden relative mr-2">
                    <Image 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium">{post.author.name}</div>
                    <div className="text-xs text-foreground/60">{post.author.role}</div>
                  </div>
                </div>
              </div>
              
              {/* Small image */}
              <div className="md:w-1/3 shrink-0">
                <div className="relative aspect-[4/3] rounded-md overflow-hidden shadow-sm">
                  <Image
                    src={post.imageSrc}
                    alt={post.title}
                    fill
                    className="object-cover opacity-80"
                    sizes="(max-width: 768px) 100vw, 300px"
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* Divider */}
            <div className="border-t border-border/10 my-4"></div>
            
            {/* Article content */}
            <article className="prose prose-sm sm:prose-base dark:prose-invert mx-auto w-full
              prose-headings:font-medium 
              prose-headings:text-foreground 
              prose-p:text-foreground/90 
              prose-p:leading-relaxed
              prose-a:text-primary 
              prose-a:no-underline 
              hover:prose-a:underline 
              prose-img:rounded-md
              prose-strong:text-foreground
              prose-li:text-foreground/90
              prose-li:leading-relaxed
              prose-blockquote:border-primary/30
              prose-blockquote:bg-card/20
              prose-blockquote:py-0.5
              prose-blockquote:px-3
              prose-blockquote:rounded-sm
              prose-blockquote:not-italic
              prose-blockquote:text-foreground/80
              max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
            
            {/* Tags section */}
            <div className="mt-6 pt-4 border-t border-foreground/10">
              <div className="flex flex-wrap gap-1.5 items-center">
                <Tag className="w-3 h-3 text-primary/80" />
                <span className="text-xs text-foreground/70 mr-1">Tags:</span>
                <span className="px-2 py-0.5 bg-card/30 hover:bg-card/50 rounded-full text-xs text-foreground/80 transition-colors">Holistic Therapy</span>
                <span className="px-2 py-0.5 bg-card/30 hover:bg-card/50 rounded-full text-xs text-foreground/80 transition-colors">Mental Health</span>
                <span className="px-2 py-0.5 bg-card/30 hover:bg-card/50 rounded-full text-xs text-foreground/80 transition-colors">Wellness</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related posts section */}
      {relatedPosts.length > 0 && (
        <section className="py-8 mt-6 bg-card/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-base font-medium mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="relative h-24 bg-card/20 hover:bg-card/30 border border-border/10 rounded-md overflow-hidden transition-all duration-300 flex shadow-sm hover:shadow-md">
                    {/* Background image with opacity */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={relatedPost.imageSrc}
                        alt=""
                        fill
                        className="object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    
                    {/* Content overlay */}
                    <div className="relative z-10 p-3 flex-1">
                      <div className="flex items-center mb-1">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">
                          {relatedPost.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                        {relatedPost.title}
                      </h3>
                      <p className="text-xs text-foreground/70 line-clamp-1 leading-relaxed">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
