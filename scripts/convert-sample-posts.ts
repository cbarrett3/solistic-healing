import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define blog post type (simplified from the one in the blog page)
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  imageSrc: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

// Sample blog posts from the blog page
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Understanding the Mind-Body Connection in Therapy',
    excerpt: 'Explore how mental and physical health are interconnected and how holistic approaches to therapy can lead to more comprehensive healing.',
    content: 'The mind-body connection represents one of the most profound frontiers in modern therapeutic practice. Research consistently demonstrates that our thoughts and emotions directly influence our physical well-being, creating a feedback loop that can either promote healing or exacerbate illness. When we approach therapy with an integrated perspective, acknowledging both psychological and physiological dimensions, we unlock pathways to healing that remain inaccessible through compartmentalized treatment models.',
    category: 'Holistic Therapy',
    date: 'March 15, 2025',
    readTime: '5 min read',
    imageSrc: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    featured: true,
    author: {
      name: 'Eric Peterson',
      role: 'Holistic Therapist',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 2,
    title: 'The Benefits of Energy Healing for Chronic Pain',
    excerpt: 'Learn how energy healing techniques can complement traditional pain management approaches for those suffering from chronic conditions.',
    content: 'Energy healing modalities offer a complementary approach to conventional pain management that addresses the multidimensional nature of chronic pain. Clinical observations suggest that practices like Reiki and therapeutic touch can modulate the nervous system\'s response to pain signals, potentially reducing inflammation and promoting the body\'s natural healing mechanisms. For many patients experiencing persistent discomfort, these approaches provide not only physical relief but also emotional regulation tools that transform their relationship with pain.',
    category: 'Energy Healing',
    date: 'March 8, 2025',
    readTime: '8 min read',
    imageSrc: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Energy Healing Specialist',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 3,
    title: 'Nutritional Approaches to Mental Wellness',
    excerpt: 'Discover the growing evidence for how dietary choices can impact mental health and emotional wellbeing.',
    content: 'The emerging field of nutritional psychiatry has revealed compelling connections between our dietary patterns and mental health outcomes. The gut-brain axis, mediated through our microbiome, serves as a critical communication pathway that influences neurotransmitter production, inflammation levels, and neural function. Strategic nutritional interventions focusing on omega-3 fatty acids, antioxidants, and prebiotic-rich foods can significantly modulate mood disorders and cognitive function, offering a powerful adjunctive approach to conventional mental health treatments.',
    category: 'Nutrition',
    date: 'February 28, 2025',
    readTime: '5 min read',
    imageSrc: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Nutritional Therapist',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 4,
    title: 'Mindfulness Meditation: A Path to Emotional Regulation',
    excerpt: 'Explore how regular mindfulness practice can help develop healthier emotional responses to life\'s challenges.',
    content: 'Mindfulness meditation represents a transformative practice that fundamentally alters our relationship with our emotional landscape. By cultivating present-moment awareness without judgment, we develop the capacity to observe our thoughts and feelings as transient experiences rather than absolute truths. This metacognitive skill creates a crucial space between stimulus and response, allowing for more intentional choices rather than reactive patterns. Neuroimaging studies confirm that consistent practice physically restructures brain regions associated with emotional regulation, attention, and self-awareness.',
    category: 'Mindfulness',
    date: 'February 20, 2025',
    readTime: '7 min read',
    imageSrc: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Mindfulness Instructor',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 5,
    title: 'Trauma-Informed Somatic Practices for Healing',
    excerpt: 'Learn how body-centered approaches can help address and release trauma stored in the physical body.',
    content: 'Somatic approaches to trauma resolution acknowledge the fundamental truth that traumatic experiences are not merely psychological events but are deeply encoded in our physiological systems. The body keeps the score, maintaining patterns of tension, constriction, and dysregulation that persist long after the traumatic event has passed. Through mindful movement, breathwork, and interoceptive awareness practices, we can gently access and release these embodied trauma patterns, restoring the nervous system\'s natural capacity for regulation and resilience.',
    category: 'Trauma Healing',
    date: 'February 12, 2025',
    readTime: '9 min read',
    imageSrc: 'https://images.unsplash.com/photo-1502230831726-fe5549140034?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Trauma Specialist',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 6,
    title: 'The Science Behind Sound Healing Therapy',
    excerpt: 'Discover how sound frequencies can influence brainwave patterns and promote deep relaxation and healing.',
    content: 'Sound healing harnesses the profound physiological effects of acoustic vibrations on our neurological and cellular systems. Research demonstrates that specific sound frequencies can entrain brainwave patterns, shifting consciousness from alert beta states to more therapeutic alpha and theta rhythms associated with deep relaxation and healing. Beyond these neurological effects, the vibrational properties of instruments like singing bowls and tuning forks appear to influence cellular structures and tissue resonance, potentially facilitating physiological repair processes at the most fundamental levels.',
    category: 'Sound Therapy',
    date: 'January 30, 2025',
    readTime: '6 min read',
    imageSrc: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Sound Healing Practitioner',
      avatar: '/eric.jpeg'
    }
  }
];

// Convert date format from "Month DD, YYYY" to "YYYY-MM-DD"
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Ensure content directories exist
const BLOG_DIR = path.join(process.cwd(), 'app', 'content', 'blog');
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// Convert each blog post to MDX file
blogPosts.forEach((post) => {
  const slug = generateSlug(post.title);
  const formattedDate = formatDate(post.date);
  
  // Create frontmatter
  const frontmatter = {
    type: 'original',
    title: post.title,
    slug,
    date: formattedDate,
    excerpt: post.excerpt,
    category: post.category,
    readTime: post.readTime,
    featuredImage: post.imageSrc,
    featured: post.featured || false,
    author: post.author
  };
  
  // Create MDX content with frontmatter
  const mdxContent = matter.stringify(post.content, frontmatter);
  
  // Write to file
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  fs.writeFileSync(filePath, mdxContent);
  
  console.log(`Created ${filePath}`);
});

console.log('All sample posts have been converted to MDX files!');
