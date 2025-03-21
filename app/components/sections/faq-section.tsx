'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// FAQ data
const faqs = [
  {
    question: "What is Holistic Psychotherapy?",
    answer: "Holistic Psychotherapy is an integrative approach to mental health that considers the whole person—mind, body, and spirit. Unlike traditional therapy that might focus primarily on mental processes, holistic therapy acknowledges the interconnectedness of all aspects of a person's being. This approach combines evidence-based psychological techniques with complementary practices such as mindfulness, somatic experiencing, and energy work to promote comprehensive healing and wellness."
  },
  {
    question: "How is Somatic Experiencing different from talk therapy?",
    answer: "Somatic Experiencing focuses on the body's physical responses to trauma and stress, rather than solely discussing thoughts and emotions as in traditional talk therapy. This approach recognizes that trauma is stored in the body and works to release trapped nervous system energy through body awareness, physical sensations, and gentle guidance. By addressing the physiological aspects of trauma, Somatic Experiencing can help resolve symptoms that talk therapy alone might not fully address, leading to deeper healing and resilience."
  },
  {
    question: "What can I expect in my first session?",
    answer: "Your first session is primarily focused on building rapport and gathering information. We'll discuss what brings you to therapy, your personal history, and your goals for treatment. This is also an opportunity for you to ask questions and get a feel for my therapeutic approach. I'll explain how our sessions will work and collaborate with you to develop an initial treatment plan. The session is conducted in a safe, non-judgmental space where you can share at your own comfort level. Remember, this is just the beginning of our therapeutic relationship, and the process will evolve as we work together."
  },
  {
    question: "How long does therapy typically last?",
    answer: "The duration of therapy varies significantly based on individual needs, goals, and the complexity of the issues being addressed. Some clients find meaningful improvement in 8-12 sessions for specific, focused concerns. Others with more complex or long-standing issues may benefit from longer-term therapy lasting several months to a year or more. We'll regularly assess your progress and adjust our approach accordingly. Ultimately, the length of therapy is a collaborative decision based on your evolving needs and therapeutic goals."
  },
  {
    question: "Do you accept insurance?",
    answer: "Yes, I accept most major insurance plans including Blue Cross Blue Shield, HealthPartners, Medica, and United Healthcare. I'm also an in-network provider for Medicare. If you're unsure about your coverage, I can help verify your benefits before our first session. For clients without insurance coverage or who prefer not to use insurance, I offer competitive self-pay rates and sliding scale options based on financial need. Please contact me directly to discuss payment arrangements that work for your situation."
  },
  {
    question: "What's the difference between a psychiatrist and a psychotherapist?",
    answer: "Psychiatrists are medical doctors (MDs) who specialize in mental health and can prescribe medication. Their training focuses on the biological aspects of mental health conditions and medication management. Psychotherapists, which include psychologists, licensed clinical social workers, and licensed professional counselors, focus on providing talk therapy and behavioral interventions. While I am a licensed psychotherapist and not a psychiatrist, I often collaborate with psychiatrists when medication might be beneficial alongside our therapeutic work. This integrated approach ensures you receive comprehensive care addressing both the psychological and physiological aspects of your well-being."
  }
];

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    setExpandedIndex((prevExpandedIndex) => prevExpandedIndex === index ? null : index);
  };

  return (
    <section id="faq" data-section className="w-full py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-[15%] left-[10%] w-80 h-80 rounded-full bg-primary/5 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4 relative inline-block">
            Frequently Asked Questions
            <motion.span 
              className="absolute -bottom-2 left-0 h-0.5 bg-primary"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </h2>
          <p className="text-foreground/90 mt-4 max-w-2xl mx-auto font-medium">
            Find answers to common questions about our therapeutic approaches, sessions, and services.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              ref={(el) => { accordionRefs.current[index] = el; }}
              className="mb-6"
            >
              <motion.div 
                className={`
                  relative overflow-hidden rounded-xl
                  ${expandedIndex === index 
                    ? 'bg-primary/10 dark:bg-gradient-to-r dark:from-primary/10 dark:to-primary/5' 
                    : 'bg-white dark:bg-white/5'}
                  backdrop-blur-sm 
                  border ${expandedIndex === index 
                    ? 'border-primary/30 shadow-md' 
                    : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'}
                  transition-all duration-500 ease-in-out
                  cursor-pointer
                  group
                `}
                whileHover={{ 
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  y: -2
                }}
                whileTap={{ y: 0 }}
                onClick={() => toggleAccordion(index)}
                layout
              >
                {/* Subtle animated background effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100"
                  animate={{ 
                    x: ['-100%', '100%'],
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                />
                
                <div className="relative z-10 px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Animated icon */}
                    <motion.div 
                      className="relative flex-shrink-0"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div 
                        className="w-10 h-10 flex items-center justify-center"
                        animate={{ 
                          rotateY: expandedIndex === index ? 180 : 0,
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 1, rotateY: 0 }}
                          animate={{ 
                            opacity: expandedIndex === index ? 0 : 1,
                            rotateY: expandedIndex === index ? -180 : 0,
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </motion.div>
                        
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0, rotateY: 180 }}
                          animate={{ 
                            opacity: expandedIndex === index ? 1 : 0,
                            rotateY: expandedIndex === index ? 0 : 180,
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </motion.div>
                      </motion.div>
                      
                      {/* Pulsing ring effect */}
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-primary/20"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                          scale: expandedIndex === index ? [0.8, 1.2, 0.8] : 0.8,
                          opacity: expandedIndex === index ? [0, 0.5, 0] : 0
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: expandedIndex === index ? Infinity : 0,
                          repeatType: "loop"
                        }}
                      />
                    </motion.div>
                    
                    <h3 className="text-base sm:text-lg font-semibold text-foreground pr-8">
                      {faq.question}
                    </h3>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="text-primary flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-white/10">
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          <p className="text-foreground/90 dark:text-foreground/80 leading-relaxed font-medium">
                            {faq.answer}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Custom Scroll Arrow to Contact Section */}
      <div className="flex justify-center items-center mt-8 mb-12">
        <div className="flex flex-col items-center cursor-pointer group">
          <div className="text-[10px] text-primary/80 dark:text-white/60 font-medium tracking-wider mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Contact
          </div>
          <div 
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-black/20 backdrop-blur-sm flex items-center justify-center border border-primary/30 dark:border-white/10 shadow-lg group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                const offsetPosition = contactSection.getBoundingClientRect().top + window.scrollY - 60;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 sm:h-6 sm:w-6 text-primary dark:text-white/70 group-hover:text-primary transition-colors duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Responsive design indicators - visible only in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs px-2 py-1 rounded-md z-50">
          <span className="sm:hidden">xs</span>
          <span className="hidden sm:inline md:hidden">sm</span>
          <span className="hidden md:inline lg:hidden">md</span>
          <span className="hidden lg:inline xl:hidden">lg</span>
          <span className="hidden xl:inline 2xl:hidden">xl</span>
          <span className="hidden 2xl:inline">2xl</span>
        </div>
      )}
    </section>
  );
}
