'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  url: string;
}

const videos: Video[] = [
  {
    id: 'Rz3mV67T8g0',
    title: 'Healing Journey Begins',
    description: 'Discover the first steps in your personal healing journey with Eric.',
    thumbnailUrl: `https://img.youtube.com/vi/Rz3mV67T8g0/maxresdefault.jpg`,
    url: 'https://www.youtube.com/watch?v=Rz3mV67T8g0&t=8s'
  },
  {
    id: '2j1q1gmfxEQ',
    title: 'Mind-Body Connection',
    description: 'Explore the powerful connection between mental and physical wellness.',
    thumbnailUrl: `https://img.youtube.com/vi/2j1q1gmfxEQ/maxresdefault.jpg`,
    url: 'https://www.youtube.com/watch?v=2j1q1gmfxEQ'
  },
  {
    id: 'otqrpEVherk',
    title: 'Meditation Techniques',
    description: 'Learn effective meditation practices for daily peace and clarity.',
    thumbnailUrl: `https://img.youtube.com/vi/otqrpEVherk/maxresdefault.jpg`,
    url: 'https://www.youtube.com/watch?v=otqrpEVherk&t=5s'
  },
  {
    id: '_uLNBoyzA8I',
    title: 'Holistic Wellness',
    description: 'Understand the principles of holistic healing for complete wellness.',
    thumbnailUrl: `https://img.youtube.com/vi/_uLNBoyzA8I/maxresdefault.jpg`,
    url: 'https://www.youtube.com/watch?v=_uLNBoyzA8I'
  },
  {
    id: 'F4K51ai1CNY',
    title: 'Energy Healing',
    description: 'Discover how energy healing can transform your life and well-being.',
    thumbnailUrl: `https://img.youtube.com/vi/F4K51ai1CNY/maxresdefault.jpg`,
    url: 'https://www.youtube.com/watch?v=F4K51ai1CNY'
  },
  {
    id: 'qlj7emwWlSs',
    title: 'Spiritual Growth',
    description: 'Embark on a journey of spiritual awakening and personal growth.',
    thumbnailUrl: `https://img.youtube.com/vi/qlj7emwWlSs/maxresdefault.jpg`,
    url: 'https://www.youtube.com/watch?v=qlj7emwWlSs'
  }
];

export default function MediaShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeVideo = videos[activeIndex];

  const handleNext = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    
    if (videoRef.current && videoRef.current.contentWindow) {
      const message = isPlaying 
        ? JSON.stringify({ event: 'command', func: 'pauseVideo' })
        : JSON.stringify({ event: 'command', func: 'playVideo' });
      
      videoRef.current.contentWindow.postMessage(message, '*');
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    if (videoRef.current && videoRef.current.contentWindow) {
      const message = isMuted
        ? JSON.stringify({ event: 'command', func: 'unMute' })
        : JSON.stringify({ event: 'command', func: 'mute' });
      
      videoRef.current.contentWindow.postMessage(message, '*');
    }
  };

  // Reset play state when video changes
  useEffect(() => {
    setIsPlaying(false);
  }, [activeIndex]);

  return (
    <section id="media" className="w-full py-16 md:py-24 bg-gradient-to-b from-background to-background/80" data-section="media">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-foreground">
            Experience Our <span className="text-primary">Healing Journey</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Watch Eric's transformative videos and discover the power of holistic healing through visual stories
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Main Video Player */}
          <div 
            className="w-full lg:w-2/3 relative rounded-xl overflow-hidden aspect-video bg-black shadow-xl"
            ref={containerRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="w-full h-full">
              <iframe
                ref={videoRef}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo.id}?enablejsapi=1&controls=0&modestbranding=1&rel=0&showinfo=0&autoplay=0&mute=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>

            {/* Video Controls Overlay */}
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-between p-4 sm:p-6 transition-opacity duration-300 ${
                isHovering ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="bg-primary/90 text-primary-foreground px-2 py-1 text-xs rounded-full">
                    Eric's Videos
                  </span>
                </div>
                <a 
                  href={activeVideo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white flex items-center gap-1 text-sm"
                >
                  <ExternalLink size={14} />
                  <span>Watch on YouTube</span>
                </a>
              </div>

              <div className="space-y-2">
                <h3 className="text-white text-xl sm:text-2xl font-medium">{activeVideo.title}</h3>
                <p className="text-white/80 text-sm sm:text-base line-clamp-2">{activeVideo.description}</p>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={togglePlay}
                      className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-2 transition-all duration-300"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button 
                      onClick={toggleMute}
                      className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-300"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={handlePrev}
                      className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-300"
                      aria-label="Previous video"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-300"
                      aria-label="Next video"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Thumbnails */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <h3 className="text-xl font-medium text-foreground mb-4">More Videos</h3>
            
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {videos.map((video, index) => (
                <motion.div 
                  key={video.id}
                  onClick={() => setActiveIndex(index)}
                  className={`flex gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-primary/10 border-l-4 border-primary' 
                      : 'hover:bg-card/60'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    {activeIndex === index && isPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="animate-pulse bg-primary/90 rounded-full p-1">
                          <Pause size={14} className="text-primary-foreground" />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium line-clamp-1 ${
                      activeIndex === index ? 'text-primary' : 'text-foreground'
                    }`}>
                      {video.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {video.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: var(--color-primary) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--color-primary);
          border-radius: 20px;
        }
        
        /* Dark mode adjustments */
        :global(.dark) .custom-scrollbar {
          scrollbar-color: var(--color-primary) rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
}
