'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
   Star,
   Phone,
   Mail,
   ChevronDown,
   ChevronRight,
   Menu,
   Plus,
   Minus,
   Award,
   Brain,
   ChevronUp,
   MapPin,
   Youtube,
   Calendar,
   FileText,
   X,
   Clock,
} from 'lucide-react';

// TypeScript interfaces for component props
interface ExpandableTextProps {
   children: React.ReactNode;
}

interface FaqItemProps {
   question: string;
   answer: string;
}

interface ServiceCardProps {
   title: string;
   description: string;
   image: string;
   features: string[];
   link: string;
}

export default function Home() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   return (
      <div className='min-h-screen bg-white'>
         {/* Header */}
         <header className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100'>
            <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
               <div className='flex items-center gap-2'>
                  <div className='text-primary w-8 h-8'>
                     <Star className='w-full h-full fill-primary stroke-primary' />
                  </div>
                  <span className='text-xl font-semibold tracking-wider'>
                     ZENLIFT
                  </span>
               </div>

               <nav className='hidden md:flex items-center gap-6'>
                  <Link
                     href='#'
                     className='text-sm font-medium hover:text-primary transition-colors'
                  >
                     HOME
                  </Link>
                  <Link
                     href='#about'
                     className='text-sm font-medium hover:text-primary transition-colors'
                  >
                     ABOUT
                  </Link>
                  <Link
                     href='#services'
                     className='text-sm font-medium hover:text-primary transition-colors'
                  >
                     SERVICES
                  </Link>
                  <Link
                     href='/resources'
                     className='text-sm font-medium hover:text-primary transition-colors'
                  >
                     RESOURCES
                  </Link>
                  <Link
                     href='/blog'
                     className='text-sm font-medium hover:text-primary transition-colors'
                  >
                     BLOG
                  </Link>
                  <Link
                     href='#contact'
                     className='text-sm font-medium hover:text-primary transition-colors'
                  >
                     CONTACT
                  </Link>
               </nav>

               <div className='flex items-center gap-4'>
                  <Link
                     href='tel:+1234567890'
                     className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors'
                  >
                     <Phone className='w-4 h-4' />
                  </Link>
                  <Link
                     href='mailto:info@zenlift.com'
                     className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors'
                  >
                     <Mail className='w-4 h-4' />
                  </Link>
                  <button
                     className='md:hidden w-8 h-8 flex items-center justify-center'
                     onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                     {isMenuOpen ? (
                        <X className='w-5 h-5' />
                     ) : (
                        <Menu className='w-5 h-5' />
                     )}
                  </button>
               </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
               <div className='md:hidden bg-white border-b border-gray-100 py-4'>
                  <div className='container mx-auto px-4'>
                     <nav className='flex flex-col space-y-3'>
                        <Link
                           href='#'
                           className='text-sm font-medium hover:text-primary transition-colors'
                        >
                           HOME
                        </Link>
                        <Link
                           href='#about'
                           className='text-sm font-medium hover:text-primary transition-colors'
                        >
                           ABOUT
                        </Link>
                        <Link
                           href='#services'
                           className='text-sm font-medium hover:text-primary transition-colors'
                        >
                           SERVICES
                        </Link>
                        <Link
                           href='/resources'
                           className='text-sm font-medium hover:text-primary transition-colors'
                        >
                           RESOURCES
                        </Link>
                        <Link
                           href='/blog'
                           className='text-sm font-medium hover:text-primary transition-colors'
                        >
                           BLOG
                        </Link>
                        <Link
                           href='#contact'
                           className='text-sm font-medium hover:text-primary transition-colors'
                        >
                           CONTACT
                        </Link>
                     </nav>
                  </div>
               </div>
            )}
         </header>

         {/* Hero Section */}
         <section className='relative h-[500px] overflow-hidden'>
            <div className='absolute inset-0 z-0'>
               {/* <Image
						src='https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop'
						alt='Serene forest with sunlight filtering through trees'
						fill
						className='object-cover brightness-[0.85]'
						priority
					/> */}
            </div>
            <div className='container relative z-10 mx-auto px-4 h-full flex flex-col justify-center'>
               <div className='max-w-xl'>
                  <div className='flex items-center gap-2 mb-4'>
                     <span className='text-primary font-medium'>
                        ZENLIFT
                     </span>
                     <span className='text-white'>-</span>
                     <span className='text-white'>MENTAL HEALTH</span>
                  </div>
                  <h1 className='text-4xl md:text-5xl font-bold text-white mb-4 leading-tight'>
                     Your Path to
                     <br />
                     Mental Wellness
                     <br />
                     Starts Here
                  </h1>
                  <p className='text-white/90 mb-6 max-w-md leading-relaxed'>
                     Evidence-based therapy in a supportive environment,
                     including specialized Ketamine-Assisted Psychotherapy
                     for treatment-resistant conditions.
                  </p>
                  <div className='flex flex-wrap gap-4'>
                     <Link
                        href='#services'
                        className='bg-primary hover:bg-primary/90 text-black font-medium px-6 py-3 rounded-full transition-colors'
                     >
                        OUR SERVICES
                     </Link>
                     <Link
                        href='#contact'
                        className='bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/40 font-medium px-6 py-3 rounded-full transition-colors'
                     >
                        GET IN TOUCH
                     </Link>
                  </div>
               </div>
            </div>
         </section>

         {/* Quick Links Section */}
         <section className='py-6 bg-white border-b'>
            <div className='container mx-auto px-4'>
               <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  <Link
                     href='#kap'
                     className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'
                  >
                     <div className='w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0'>
                        <Brain className='w-5 h-5 text-primary' />
                     </div>
                     <div>
                        <h3 className='text-sm font-medium'>
                           Ketamine Therapy
                        </h3>
                        <p className='text-xs text-gray-500'>
                           Innovative treatment approach
                        </p>
                     </div>
                  </Link>

                  <Link
                     href='#videos'
                     className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'
                  >
                     <div className='w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0'>
                        <Youtube className='w-5 h-5 text-primary' />
                     </div>
                     <div>
                        <h3 className='text-sm font-medium'>
                           Video Resources
                        </h3>
                        <p className='text-xs text-gray-500'>
                           Educational content
                        </p>
                     </div>
                  </Link>

                  <Link
                     href='/blog'
                     className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'
                  >
                     <div className='w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0'>
                        <FileText className='w-5 h-5 text-primary' />
                     </div>
                     <div>
                        <h3 className='text-sm font-medium'>
                           Latest Articles
                        </h3>
                        <p className='text-xs text-gray-500'>
                           Insights and education
                        </p>
                     </div>
                  </Link>

                  <Link
                     href='#contact'
                     className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'
                  >
                     <div className='w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0'>
                        <Calendar className='w-5 h-5 text-primary' />
                     </div>
                     <div>
                        <h3 className='text-sm font-medium'>
                           Book Consultation
                        </h3>
                        <p className='text-xs text-gray-500'>
                           Start your journey
                        </p>
                     </div>
                  </Link>
               </div>
            </div>
         </section>

         {/* KAP Section */}
         <section
            id='kap'
            className='py-12 bg-white'
         >
            <div className='container mx-auto px-4'>
               <div className='max-w-6xl mx-auto'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
                     <div>
                        <h2 className='text-2xl font-bold mb-4'>
                           Ketamine-Assisted Psychotherapy
                        </h2>
                        <p className='text-gray-700 mb-4 leading-relaxed'>
                           Ketamine-Assisted Psychotherapy (KAP) combines the
                           therapeutic effects of ketamine with psychotherapy
                           to create transformative healing experiences for
                           those struggling with treatment-resistant
                           conditions.
                        </p>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                           <div className='bg-gray-50 p-3 rounded-lg'>
                              <h3 className='font-medium text-sm mb-1'>
                                 Assessment & Screening
                              </h3>
                              <p className='text-xs text-gray-600'>
                                 Comprehensive evaluation to ensure KAP is
                                 appropriate for you.
                              </p>
                           </div>

                           <div className='bg-gray-50 p-3 rounded-lg'>
                              <h3 className='font-medium text-sm mb-1'>
                                 Preparation Sessions
                              </h3>
                              <p className='text-xs text-gray-600'>
                                 Setting intentions and developing skills to
                                 navigate the process.
                              </p>
                           </div>

                           <div className='bg-gray-50 p-3 rounded-lg'>
                              <h3 className='font-medium text-sm mb-1'>
                                 Ketamine Sessions
                              </h3>
                              <p className='text-xs text-gray-600'>
                                 Guided therapeutic sessions in a safe,
                                 supportive environment.
                              </p>
                           </div>

                           <div className='bg-gray-50 p-3 rounded-lg'>
                              <h3 className='font-medium text-sm mb-1'>
                                 Integration Sessions
                              </h3>
                              <p className='text-xs text-gray-600'>
                                 Processing insights and applying them to daily
                                 life.
                              </p>
                           </div>
                        </div>

                        <Link
                           href='/services/kap'
                           className='text-primary font-medium text-sm flex items-center hover:underline'
                        >
                           Learn More About KAP{' '}
                           <ChevronRight className='w-4 h-4 ml-1' />
                        </Link>
                     </div>

                     <div>
                        {/* <Image
									src='https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop'
									alt='Peaceful meditation space'
									width={600}
									height={500}
									className='rounded-lg shadow-md object-cover h-[400px]'
								/> */}
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Video Resources Section */}
         <section
            id='videos'
            className='py-12 bg-gray-50'
         >
            <div className='container mx-auto px-4'>
               <div className='max-w-6xl mx-auto'>
                  <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
                     <div>
                        <h2 className='text-2xl font-bold mb-1'>
                           Video Resources
                        </h2>
                        <p className='text-gray-600'>
                           Educational content to help you understand our
                           approaches
                        </p>
                     </div>
                     <Link
                        href='/videos'
                        className='mt-2 md:mt-0 text-primary font-medium text-sm flex items-center hover:underline'
                     >
                        View All Videos{' '}
                        <ChevronRight className='w-4 h-4 ml-1' />
                     </Link>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
                     <div className='md:col-span-8 bg-white rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300'>
                        <div className='relative'>
                           <div className='aspect-video relative bg-gray-900 overflow-hidden'>
                              {/* <Image
											src='https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop'
											alt='Ketamine therapy session room'
											fill
											className='object-cover opacity-80 transition-transform duration-500 group-hover:scale-105'
										/> */}
                              <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>

                              <div className='absolute inset-0 flex items-center justify-center'>
                                 <div className='w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                                    <div className='w-16 h-16 rounded-full bg-primary flex items-center justify-center'>
                                       <div className='w-0 h-0 border-t-[12px] border-b-[12px] border-l-[20px] border-transparent border-l-black ml-1'></div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className='absolute top-4 left-4 flex items-center space-x-2'>
                              <span className='bg-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-primary-foreground'>
                                 Featured
                              </span>
                              <span className='bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm flex items-center'>
                                 <Clock className='w-3 h-3 mr-1' />
                                 15:37
                              </span>
                           </div>
                        </div>

                        <div className='p-6'>
                           <h3 className='font-bold text-xl mb-2 group-hover:text-primary transition-colors'>
                              Understanding Ketamine-Assisted Psychotherapy: A
                              Comprehensive Guide
                           </h3>
                           <p className='text-gray-700 mb-4'>
                              In this in-depth video, Eric Peterson explains the
                              entire KAP process from initial assessment through
                              integration, including what to expect during
                              sessions, how ketamine works in the brain, and the
                              transformative potential of this innovative
                              treatment approach.
                           </p>
                           <div className='flex items-center justify-between'>
                              <div className='flex items-center space-x-3'>
                                 <div className='w-10 h-10 rounded-full bg-gray-200 overflow-hidden'>
                                    {/* <Image
													src='https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop'
													alt='Eric Peterson'
													width={40}
													height={40}
													className='object-cover'
												/> */}
                                 </div>
                                 <div>
                                    <p className='text-sm font-medium'>
                                       Eric Peterson
                                    </p>
                                    <p className='text-xs text-gray-500'>
                                       Lead Therapist
                                    </p>
                                 </div>
                              </div>

                              <Link
                                 href='/videos/understanding-kap'
                                 className='bg-primary/10 text-primary font-medium text-sm px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition-colors'
                              >
                                 Watch Now{' '}
                                 <ChevronRight className='w-4 h-4 ml-1' />
                              </Link>
                           </div>
                        </div>
                     </div>

                     <div className='md:col-span-4 flex flex-col gap-6'>
                        <div className='bg-white rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300'>
                           <div className='relative'>
                              <div className='aspect-video relative bg-gray-900 overflow-hidden'>
                                 {/* <Image
												src='https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop'
												alt='Person meditating'
												fill
												className='object-cover opacity-80 transition-transform duration-500 group-hover:scale-105'
											/> */}
                                 <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>

                                 <div className='absolute inset-0 flex items-center justify-center'>
                                    <div className='w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                                       <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center'>
                                          <div className='w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-transparent border-l-black ml-1'></div>
                                       </div>
                                    </div>
                                 </div>

                                 <div className='absolute bottom-2 right-2'>
                                    <span className='bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm flex items-center'>
                                       <Clock className='w-3 h-3 mr-1' />
                                       8:24
                                    </span>
                                 </div>
                              </div>
                           </div>

                           <div className='p-4'>
                              <h3 className='font-medium text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2'>
                                 Integration Practices After KAP
                              </h3>
                              <div className='flex items-center justify-between mt-1'>
                                 <span className='text-xs text-gray-500'>
                                    Practical Guide
                                 </span>
                                 <Link
                                    href='/videos/integration-practices'
                                    className='text-primary text-xs flex items-center hover:underline'
                                 >
                                    Watch{' '}
                                    <ChevronRight className='w-3 h-3 ml-1' />
                                 </Link>
                              </div>
                           </div>
                        </div>

                        <div className='bg-white rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300'>
                           <div className='relative'>
                              <div className='aspect-video relative bg-gray-900 overflow-hidden'>
                                 {/* <Image
												src='https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop'
												alt='Client testimonial'
												fill
												className='object-cover opacity-80 transition-transform duration-500 group-hover:scale-105'
											/> */}
                                 <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>

                                 <div className='absolute inset-0 flex items-center justify-center'>
                                    <div className='w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                                       <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center'>
                                          <div className='w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-transparent border-l-black ml-1'></div>
                                       </div>
                                    </div>
                                 </div>

                                 <div className='absolute bottom-2 right-2'>
                                    <span className='bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm flex items-center'>
                                       <Clock className='w-3 h-3 mr-1' />
                                       12:05
                                    </span>
                                 </div>
                              </div>
                           </div>

                           <div className='p-4'>
                              <h3 className='font-medium text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2'>
                                 Client Testimonial: My KAP Journey
                              </h3>
                              <div className='flex items-center justify-between mt-1'>
                                 <span className='text-xs text-gray-500'>
                                    Testimonial
                                 </span>
                                 <Link
                                    href='/videos/client-testimonial'
                                    className='text-primary text-xs flex items-center hover:underline'
                                 >
                                    Watch{' '}
                                    <ChevronRight className='w-3 h-3 ml-1' />
                                 </Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Services Section */}
         <section
            id='services'
            className='py-12 bg-white'
         >
            <div className='container mx-auto px-4'>
               <div className='max-w-6xl mx-auto'>
                  <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
                     <div>
                        <h2 className='text-2xl font-bold mb-1'>
                           Our Services
                        </h2>
                        <p className='text-gray-600'>
                           Comprehensive mental health care tailored to your
                           needs
                        </p>
                     </div>
                     <Link
                        href='/services'
                        className='mt-2 md:mt-0 text-primary font-medium text-sm flex items-center hover:underline'
                     >
                        View All Services{' '}
                        <ChevronRight className='w-4 h-4 ml-1' />
                     </Link>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                     <ServiceCard
                        title='Individual Therapy'
                        description='One-on-one sessions tailored to address your specific mental health concerns. Our evidence-based approaches help you develop coping strategies and achieve your wellness goals.'
                        image='https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop'
                        features={[
                           'Personalized treatment plans',
                           'Evidence-based approaches',
                           'Flexible scheduling options',
                           'In-person and virtual sessions',
                        ]}
                        link='/services/individual-therapy'
                     />

                     <ServiceCard
                        title='Ketamine-Assisted Psychotherapy'
                        description='A powerful combination of ketamine medicine and psychotherapy for treatment-resistant conditions. KAP can create breakthroughs where traditional approaches have been insufficient.'
                        image='https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop'
                        features={[
                           'Comprehensive medical screening',
                           'Guided ketamine sessions',
                           'Integration therapy',
                           'Ongoing support',
                        ]}
                        link='/services/kap'
                     />

                     <ServiceCard
                        title='Psychedelic Integration'
                        description='Support for processing and integrating insights from psychedelic experiences into daily life. Learn to apply the wisdom gained during altered states to create lasting positive change.'
                        image='https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop'
                        features={[
                           'Non-judgmental exploration',
                           'Meaning-making process',
                           'Application to daily life',
                           'Community support options',
                        ]}
                        link='/services/psychedelic-integration'
                     />
                  </div>
               </div>
            </div>
         </section>

         {/* About Section */}
         <section
            id='about'
            className='py-12 bg-gray-50'
         >
            <div className='container mx-auto px-4'>
               <div className='max-w-6xl mx-auto'>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                     <div className='md:col-span-1'>
                        {/* <Image
									src='https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop'
									alt='Eric Peterson, MA, LPCC, LADC, CNA'
									width={400}
									height={500}
									className='rounded-lg shadow-md object-cover w-full h-auto'
								/> */}
                     </div>

                     <div className='md:col-span-2'>
                        <h2 className='text-2xl font-bold mb-4'>
                           Meet Your Therapist
                        </h2>
                        <h3 className='text-xl font-bold mb-2'>
                           Eric Peterson, MA, LPCC, LADC, CNA
                        </h3>
                        <div className='flex items-center gap-2 mb-4'>
                           <div className='flex gap-1'>
                              <Award className='w-5 h-5 text-primary' />
                              <Award className='w-5 h-5 text-primary' />
                              <Award className='w-5 h-5 text-primary' />
                           </div>
                           <span className='text-sm text-gray-600'>
                              Lead Therapist, Ketamine Specialist
                           </span>
                        </div>

                        <div className='prose prose-sm max-w-none mb-4'>
                           <p>
                              I received my M.A in Counseling and Psychological
                              Services from Saint Mary's University of Minnesota
                              with a Graduate Certificate in Addiction Studies.
                              I currently hold a Professional Clinical
                              Counseling license (LPCC) and an alcohol and drug
                              counseling license (LADC) in the state of
                              Minnesota. I also hold a B.A. in Psychology.
                           </p>

                           <p>
                              In addition to the above degrees and licenses, I
                              am a Certified Nursing Assistant (CNA). I am also
                              an adjunct professor teaching courses in
                              Psychology and Addiction Counseling. I have
                              received training in psychedelic integration from
                              Fluence and ketamine-assisted therapy training
                              from Polaris Insight Center.
                           </p>
                        </div>

                        <ExpandableText>
                           <p>
                              My approach to healing and change is informed by
                              cognitive-behavioral therapy (CBT), acceptance and
                              commitment therapy (ACT), somatic therapy, and
                              transpersonal psychology. I take a holistic view
                              at how systems of oppression and control affect
                              the mental, physical, and spiritual well-being of
                              individuals.
                           </p>

                           <p>
                              I view therapy as an experience that can help
                              people learn to accept who they are and to focus
                              their attention on what is most meaningful and
                              important to them. I believe that developing a
                              safe and accepting relationship with each of my
                              patients is essential for them to learn new ways
                              of thinking and behaving, to create meaning and
                              purpose, and to move towards the life they want to
                              live.
                           </p>

                           <p>
                              When I am not in my therapist role, teaching, or
                              giving presentations, you can find me running
                              ultramarathons, downhill skiing, rollerblading, or
                              taking my dog, Harley, for a walk.
                           </p>
                        </ExpandableText>

                        <div className='flex flex-wrap gap-2 mt-4'>
                           <span className='bg-primary/20 text-xs px-3 py-1 rounded-full'>
                              CBT
                           </span>
                           <span className='bg-primary/20 text-xs px-3 py-1 rounded-full'>
                              ACT
                           </span>
                           <span className='bg-primary/20 text-xs px-3 py-1 rounded-full'>
                              Somatic Therapy
                           </span>
                           <span className='bg-primary/20 text-xs px-3 py-1 rounded-full'>
                              Transpersonal Psychology
                           </span>
                           <span className='bg-primary/20 text-xs px-3 py-1 rounded-full'>
                              Ketamine-Assisted Therapy
                           </span>
                           <span className='bg-primary/20 text-xs px-3 py-1 rounded-full'>
                              Psychedelic Integration
                           </span>
                        </div>

                        <div className='mt-6 flex flex-wrap gap-4'>
                           <Link
                              href='/team/eric-peterson'
                              className='bg-primary hover:bg-primary/90 text-black font-medium px-4 py-2 rounded-full text-sm inline-block transition-colors'
                           >
                              Full Profile
                           </Link>
                           <Link
                              href='/contact'
                              className='bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-medium px-4 py-2 rounded-full text-sm inline-block transition-colors'
                           >
                              Schedule Consultation
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* FAQ Section */}
         <section className='py-12 bg-white'>
            <div className='container mx-auto px-4'>
               <div className='max-w-6xl mx-auto'>
                  <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
                     <div>
                        <h2 className='text-2xl font-bold mb-1'>
                           Frequently Asked Questions
                        </h2>
                        <p className='text-gray-600'>
                           Find answers to common questions about our services
                        </p>
                     </div>
                     <Link
                        href='/faq'
                        className='mt-2 md:mt-0 text-primary font-medium text-sm flex items-center hover:underline'
                     >
                        View All FAQs{' '}
                        <ChevronRight className='w-4 h-4 ml-1' />
                     </Link>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                     <FaqItem
                        question='What is ketamine?'
                        answer='Ketamine is a medication that is deemed an essential medicine by the World Health Organization due to its favorable safety profile. It is classified as a dissociative anesthetic. Ketamine was FDA approved for use in humans in 1970 and has been used in surgical settings ever since. It is now being used off-label to treat a variety of conditions such as depression, anxiety, post traumatic stress disorder, substance addiction, disorderd eating behaviors, and other psychiatric conditions.'
                     />

                     <FaqItem
                        question='How does ketamine work?'
                        answer='Ketamine has been shown to help generate new neuronal pathways in the brain, which is one of the reasons why researchers believe it can be helpful to treat certain mental health conditions. New brain connections being formed is what can help lead people to creating new patterns of thinking, feeling, and behaving that move them in a more positive direction in life.'
                     />

                     <FaqItem
                        question='What is Ketamine-Assisted Psychotherapy?'
                        answer='Ketamine-assisted psychotherapy (KAP) is the process of harnessing the healing effects of ketamine to support the psychotherapy process. Ketamine is used as a catalyst for change that helps to change the way we respond to difficult symptoms we are experiencing. KAP is done in three phases; preparation sessions, ketamine sessions, and follow-up integration sessions.'
                     />

                     <FaqItem
                        question='How many sessions will I need?'
                        answer='The amount of ketamine sessions someone does during the course of treatment depends on each individual person. Usually I ask that people commit to a minimum of at least 3-6 ketamine sessions to receive the benefit that can ketamine can bring you. Sometimes people only do one or two sessions, but this is rare. Ketamine has a cumulative effect which is why a series of multiple sessions is most effective for the majority of people.'
                     />
                  </div>
               </div>
            </div>
         </section>

         {/* Blog Preview Section */}
         <section className='py-12 bg-gray-50'>
            <div className='container mx-auto px-4'>
               <div className='max-w-6xl mx-auto'>
                  <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
                     <div>
                        <h2 className='text-2xl font-bold mb-1'>
                           Latest Articles
                        </h2>
                        <p className='text-gray-600'>
                           Insights and education from our blog
                        </p>
                     </div>
                     <Link
                        href='/blog'
                        className='mt-2 md:mt-0 text-primary font-medium text-sm flex items-center hover:underline'
                     >
                        View All Articles{' '}
                        <ChevronRight className='w-4 h-4 ml-1' />
                     </Link>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                     <div className='bg-white rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300 flex flex-col h-full'>
                        <div className='relative'>
                           <div className='h-52 relative overflow-hidden'>
                              {/* <Image
											src='https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=2070&auto=format&fit=crop'
											alt='Person writing in journal'
											fill
											className='object-cover transition-transform duration-500 group-hover:scale-105'
										/> */}
                              <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
                           </div>

                           <div className='absolute top-3 left-3'>
                              <span className='bg-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-primary-foreground'>
                                 Integration
                              </span>
                           </div>
                        </div>

                        <div className='p-5 flex-grow flex flex-col'>
                           <div className='flex items-center text-xs text-gray-500 mb-3 space-x-3'>
                              <span>May 15, 2023</span>
                              <span>•</span>
                              <span className='flex items-center'>
                                 <Clock className='w-3 h-3 mr-1' />5 min read
                              </span>
                           </div>

                           <h3 className='font-bold text-lg mb-3 group-hover:text-primary transition-colors'>
                              Understanding the Integration Process After
                              Ketamine Therapy
                           </h3>

                           <p className='text-gray-600 mb-4 flex-grow'>
                              Learn about the important steps to take after
                              ketamine therapy to maximize the benefits and
                              insights gained during your sessions. Integration
                              is a crucial part of the healing journey.
                           </p>

                           <div className='flex items-center justify-between mt-2'>
                              <div className='flex items-center space-x-2'>
                                 <div className='w-8 h-8 rounded-full bg-gray-200 overflow-hidden'>
                                    {/* <Image
													src='https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop'
													alt='Eric Peterson'
													width={32}
													height={32}
													className='object-cover'
												/> */}
                                 </div>
                                 <span className='text-xs font-medium'>
                                    Eric Peterson
                                 </span>
                              </div>

                              <Link
                                 href='/blog/integration-process'
                                 className='text-primary font-medium text-sm flex items-center hover:underline'
                              >
                                 Read Article{' '}
                                 <ChevronRight className='w-4 h-4 ml-1' />
                              </Link>
                           </div>
                        </div>
                     </div>

                     <div className='bg-white rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300 flex flex-col h-full'>
                        <div className='relative'>
                           <div className='h-52 relative overflow-hidden'>
                              {/* <Image
											src='https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop'
											alt='Person meditating'
											fill
											className='object-cover transition-transform duration-500 group-hover:scale-105'
										/> */}
                              <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
                           </div>

                           <div className='absolute top-3 left-3'>
                              <span className='bg-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-primary-foreground'>
                                 Mindfulness
                              </span>
                           </div>
                        </div>

                        <div className='p-5 flex-grow flex flex-col'>
                           <div className='flex items-center text-xs text-gray-500 mb-3 space-x-3'>
                              <span>April 28, 2023</span>
                              <span>•</span>
                              <span className='flex items-center'>
                                 <Clock className='w-3 h-3 mr-1' />7 min read
                              </span>
                           </div>

                           <h3 className='font-bold text-lg mb-3 group-hover:text-primary transition-colors'>
                              Mindfulness Practices to Support Your Mental
                              Health Journey
                           </h3>

                           <p className='text-gray-600 mb-4 flex-grow'>
                              Discover simple yet effective mindfulness
                              techniques that can enhance your therapy
                              experience and help maintain emotional balance in
                              daily life. Learn how to incorporate these
                              practices into your routine.
                           </p>

                           <div className='flex items-center justify-between mt-2'>
                              <div className='flex items-center space-x-2'>
                                 <div className='w-8 h-8 rounded-full bg-gray-200 overflow-hidden'>
                                    {/* <Image
													src='https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop'
													alt='Eric Peterson'
													width={32}
													height={32}
													className='object-cover'
												/> */}
                                 </div>
                                 <span className='text-xs font-medium'>
                                    Eric Peterson
                                 </span>
                              </div>

                              <Link
                                 href='/blog/mindfulness-practices'
                                 className='text-primary font-medium text-sm flex items-center hover:underline'
                              >
                                 Read Article{' '}
                                 <ChevronRight className='w-4 h-4 ml-1' />
                              </Link>
                           </div>
                        </div>
                     </div>

                     <div className='bg-white rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300 flex flex-col h-full'>
                        <div className='relative'>
                           <div className='h-52 relative overflow-hidden'>
                              {/* <Image
											src='https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=2070&auto=format&fit=crop'
											alt='Family walking together'
											fill
											className='object-cover transition-transform duration-500 group-hover:scale-105'
										/> */}
                              <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
                           </div>

                           <div className='absolute top-3 left-3'>
                              <span className='bg-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-primary-foreground'>
                                 Support
                              </span>
                           </div>
                        </div>

                        <div className='p-5 flex-grow flex flex-col'>
                           <div className='flex items-center text-xs text-gray-500 mb-3 space-x-3'>
                              <span>April 10, 2023</span>
                              <span>•</span>
                              <span className='flex items-center'>
                                 <Clock className='w-3 h-3 mr-1' />6 min read
                              </span>
                           </div>

                           <h3 className='font-bold text-lg mb-3 group-hover:text-primary transition-colors'>
                              Supporting a Loved One Through Their Mental Health
                              Journey
                           </h3>

                           <p className='text-gray-600 mb-4 flex-grow'>
                              Practical advice for family members and friends on
                              how to provide effective support without
                              overstepping boundaries. Learn communication
                              strategies and self-care tips for supporters.
                           </p>

                           <div className='flex items-center justify-between mt-2'>
                              <div className='flex items-center space-x-2'>
                                 <div className='w-8 h-8 rounded-full bg-gray-200 overflow-hidden'>
                                    {/* <Image
													src='https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop'
													alt='Eric Peterson'
													width={32}
													height={32}
													className='object-cover'
												/> */}
                                 </div>
                                 <span className='text-xs font-medium'>
                                    Eric Peterson
                                 </span>
                              </div>

                              <Link
                                 href='/blog/supporting-loved-ones'
                                 className='text-primary font-medium text-sm flex items-center hover:underline'
                              >
                                 Read Article{' '}
                                 <ChevronRight className='w-4 h-4 ml-1' />
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className='py-12 bg-primary/10'>
            <div className='container mx-auto px-4'>
               <div className='max-w-6xl mx-auto'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
                     <div>
                        <h2 className='text-2xl font-bold mb-4'>
                           Begin Your Path to Wellness
                        </h2>
                        <p className='text-gray-700 mb-6'>
                           Taking the first step toward better mental health
                           can be challenging, but you don't have to face it
                           alone. Our team is ready to support your journey
                           with evidence-based approaches tailored to your
                           unique needs.
                        </p>
                        <div className='space-x-4'>
                           <Link
                              href='/consultation'
                              className='bg-primary hover:bg-primary/90 text-black font-medium px-6 py-3 rounded-full transition-colors'
                           >
                              START CONSULTATION
                           </Link>
                           <Link
                              href='/contact'
                              className='bg-white border border-gray-200 text-gray-800 font-medium px-6 py-3 rounded-full transition-colors hover:bg-gray-50'
                           >
                              CONTACT US
                           </Link>
                        </div>
                     </div>

                     <div className='bg-white p-6 rounded-lg shadow-sm'>
                        <h3 className='font-medium mb-4'>
                           Quick Contact Form
                        </h3>
                        <form className='space-y-4'>
                           <div>
                              <label
                                 htmlFor='name'
                                 className='block text-sm font-medium text-gray-700 mb-1'
                              >
                                 Name
                              </label>
                              <input
                                 type='text'
                                 id='name'
                                 className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary'
                                 placeholder='Your name'
                              />
                           </div>

                           <div>
                              <label
                                 htmlFor='email'
                                 className='block text-sm font-medium text-gray-700 mb-1'
                              >
                                 Email
                              </label>
                              <input
                                 type='email'
                                 id='email'
                                 className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary'
                                 placeholder='Your email'
                              />
                           </div>

                           <div>
                              <label
                                 htmlFor='message'
                                 className='block text-sm font-medium text-gray-700 mb-1'
                              >
                                 Message
                              </label>
                              <textarea
                                 id='message'
                                 rows={3}
                                 className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary'
                                 placeholder='How can we help you?'
                              ></textarea>
                           </div>

                           <button
                              type='submit'
                              className='w-full bg-primary hover:bg-primary/90 text-black font-medium py-2 rounded-md transition-colors'
                           >
                              Send Message
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Location Section */}
         <section
            id='contact'
            className='py-12 bg-white'
         >
            <div className='container mx-auto px-4'>
               <div className='max-w-6xl mx-auto'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                     <div>
                        <h2 className='text-2xl font-bold mb-4'>Find Us</h2>
                        <div className='flex items-start gap-3 mb-4'>
                           <MapPin className='w-5 h-5 text-primary shrink-0 mt-0.5' />
                           <address className='not-italic text-gray-700'>
                              <p className='font-medium'>
                                 Zenlift Mental Health Center
                              </p>
                              <p>123 Wellness Way</p>
                              <p>Serenity, CA 90210</p>
                           </address>
                        </div>

                        <div className='flex items-start gap-3 mb-4'>
                           <Phone className='w-5 h-5 text-primary shrink-0 mt-0.5' />
                           <div>
                              <p className='font-medium'>Phone</p>
                              <p className='text-gray-700'>(555) 123-4567</p>
                           </div>
                        </div>

                        <div className='flex items-start gap-3 mb-4'>
                           <Mail className='w-5 h-5 text-primary shrink-0 mt-0.5' />
                           <div>
                              <p className='font-medium'>Email</p>
                              <p className='text-gray-700'>info@zenlift.com</p>
                           </div>
                        </div>

                        <div className='mt-6'>
                           <h3 className='font-medium mb-2'>Office Hours</h3>
                           <div className='grid grid-cols-2 gap-2 text-sm'>
                              <div>
                                 <p className='font-medium'>Monday - Friday</p>
                                 <p className='text-gray-700'>
                                    9:00 AM - 6:00 PM
                                 </p>
                              </div>
                              <div>
                                 <p className='font-medium'>Saturday</p>
                                 <p className='text-gray-700'>
                                    10:00 AM - 2:00 PM
                                 </p>
                              </div>
                              <div>
                                 <p className='font-medium'>Sunday</p>
                                 <p className='text-gray-700'>Closed</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className='h-[300px] bg-gray-200 rounded-lg overflow-hidden relative'>
                        {/* This would be replaced with an actual map component */}
                        <div className='absolute inset-0 flex items-center justify-center'>
                           <div className='text-center'>
                              <MapPin className='w-8 h-8 text-primary mx-auto mb-2' />
                              <p className='font-medium'>
                                 Map would be displayed here
                              </p>
                              <p className='text-sm text-gray-600'>
                                 Interactive Google Maps component
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Footer */}
         <footer className='py-8 bg-gray-50 border-t border-gray-200'>
            <div className='container mx-auto px-4'>
               <div className='max-w-6xl mx-auto'>
                  <div className='flex items-center gap-2 mb-6'>
                     <div className='text-primary w-6 h-6'>
                        <Star className='w-full h-full fill-primary stroke-primary' />
                     </div>
                     <span className='text-lg font-semibold tracking-wider'>
                        ZENLIFT
                     </span>
                  </div>

                  <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-8'>
                     <div>
                        <h3 className='text-sm font-medium mb-3'>
                           Quick Links
                        </h3>
                        <ul className='space-y-2 text-sm text-gray-600'>
                           <li>
                              <Link
                                 href='/about'
                                 className='hover:text-primary transition-colors'
                              >
                                 About Us
                              </Link>
                           </li>
                           <li>
                              <Link
                                 href='/services'
                                 className='hover:text-primary transition-colors'
                              >
                                 Services
                              </Link>
                           </li>
                           <li>
                              <Link
                                 href='/resources'
                                 className='hover:text-primary transition-colors'
                              >
                                 Resources
                              </Link>
                           </li>
                           <li>
                              <Link
                                 href='/blog'
                                 className='hover:text-primary transition-colors'
                              >
                                 Blog
                              </Link>
                           </li>
                           <li>
                              <Link
                                 href='/contact'
                                 className='hover:text-primary transition-colors'
                              >
                                 Contact
                              </Link>
                           </li>
                        </ul>
                     </div>

                     <div>
                        <h3 className='text-sm font-medium mb-3'>Services</h3>
                        <ul className='space-y-2 text-sm text-gray-600'>
                           <li>
                              <Link
                                 href='/services/individual-therapy'
                                 className='hover:text-primary transition-colors'
                              >
                                 Individual Therapy
                              </Link>
                           </li>
                           <li>
                              <Link
                                 href='/services/kap'
                                 className='hover:text-primary transition-colors'
                              >
                                 Ketamine-Assisted Therapy
                              </Link>
                           </li>
                           <li>
                              <Link
                                 href='/services/psychedelic-integration'
                                 className='hover:text-primary transition-colors'
                              >
                                 Psychedelic Integration
                              </Link>
                           </li>
                        </ul>
                     </div>

                     <div>
                        <h3 className='text-sm font-medium mb-3'>
                           Resources
                        </h3>
                        <ul className='space-y-2 text-sm text-gray-600'>
                           <li>
                              <Link
                                 href='/resources/faq'
                                 className='hover:text-primary transition-colors'
                              >
                                 FAQs
                              </Link>
                           </li>
                           <li>
                              <Link
                                 href='/resources/videos'
                                 className='hover:text-primary transition-colors'
                              >
                                 Video Resources
                              </Link>
                           </li>
                           <li>
                              <Link
                                 href='/resources/articles'
                                 className='hover:text-primary transition-colors'
                              >
                                 Articles
                              </Link>
                           </li>
                        </ul>
                     </div>

                     <div>
                        <h3 className='text-sm font-medium mb-3'>Connect</h3>
                        <div className='flex gap-3 mb-4'>
                           <Link
                              href='#'
                              className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors'
                           >
                              <span className='sr-only'>Facebook</span>
                              <div className='w-4 h-4 bg-primary rounded-full'></div>
                           </Link>
                           <Link
                              href='#'
                              className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors'
                           >
                              <span className='sr-only'>Twitter</span>
                              <div className='w-4 h-4 bg-primary rounded-full'></div>
                           </Link>
                           <Link
                              href='#'
                              className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors'
                           >
                              <span className='sr-only'>Instagram</span>
                              <div className='w-4 h-4 bg-primary rounded-full'></div>
                           </Link>
                           <Link
                              href='#'
                              className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors'
                           >
                              <span className='sr-only'>YouTube</span>
                              <div className='w-4 h-4 bg-primary rounded-full'></div>
                           </Link>
                        </div>

                        <p className='text-sm text-gray-600 mb-2'>
                           Subscribe to our newsletter
                        </p>
                        <div className='flex'>
                           <input
                              type='email'
                              placeholder='Your email'
                              className='px-3 py-1 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary'
                           />
                           <button className='bg-primary text-black px-3 py-1 text-sm rounded-r-md'>
                              SIGN UP
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className='pt-4 border-t border-gray-200 text-xs text-gray-500 flex flex-col md:flex-row justify-between'>
                     <p>
                        © 2023 Zenlift Mental Health Center. All rights
                        reserved.
                     </p>
                     <div className='flex gap-4 mt-2 md:mt-0'>
                        <Link
                           href='/terms'
                           className='hover:text-primary transition-colors'
                        >
                           Terms of Service
                        </Link>
                        <Link
                           href='/privacy'
                           className='hover:text-primary transition-colors'
                        >
                           Privacy Policy
                        </Link>
                        <Link
                           href='/accessibility'
                           className='hover:text-primary transition-colors'
                        >
                           Accessibility
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}

// Component for expandable text sections
function ExpandableText({ children }: ExpandableTextProps) {
   const [isExpanded, setIsExpanded] = useState(false);

   return (
      <div>
         <div
            className={`overflow-hidden transition-all duration-300 ${isExpanded ? '' : 'max-h-24'
               }`}
         >
            {children}
         </div>

         {!isExpanded && (
            <div className='bg-gradient-to-t from-white to-transparent h-12 -mt-12 relative'></div>
         )}

         <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='flex items-center gap-2 text-primary font-medium mt-2 hover:underline'
         >
            {isExpanded ? (
               <>
                  Read Less <ChevronUp className='w-4 h-4' />
               </>
            ) : (
               <>
                  Read More <ChevronDown className='w-4 h-4' />
               </>
            )}
         </button>
      </div>
   );
}

// Component for FAQ items
function FaqItem({ question, answer }: FaqItemProps) {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div className='border rounded-lg overflow-hidden'>
         <button
            onClick={() => setIsOpen(!isOpen)}
            className='w-full flex items-center justify-between p-3 text-left font-medium bg-gray-50 hover:bg-gray-100 transition-colors'
         >
            <span className='text-sm'>{question}</span>
            {isOpen ? (
               <Minus className='w-4 h-4 text-primary shrink-0' />
            ) : (
               <Plus className='w-4 h-4 text-primary shrink-0' />
            )}
         </button>

         {isOpen && (
            <div className='p-3 prose prose-sm max-w-none'>
               <p className='text-sm text-gray-600'>{answer}</p>
            </div>
         )}
      </div>
   );
}

// Component for service cards
function ServiceCard({ title, description, image, features, link }: ServiceCardProps) {
   return (
      <div className='group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full'>
         <div className='relative'>
            {/* Image container with overlay gradient */}
            <div className='h-48 relative overflow-hidden'>
               {/* <Image
						src={image || '/placeholder.svg'}
						alt={title}
						fill
						className='object-cover transition-transform duration-500 group-hover:scale-105'
					/> */}
               <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70'></div>
            </div>

            {/* Title overlay on image */}
            <div className='absolute bottom-0 left-0 right-0 p-4'>
               <h3 className='font-bold text-lg text-white mb-1'>
                  {title}
               </h3>
               <div className='w-12 h-1 bg-primary rounded-full mb-2'></div>
            </div>
         </div>

         <div className='p-5 flex-grow flex flex-col'>
            <p className='text-gray-700 mb-4 flex-grow'>{description}</p>

            <div className='mb-4'>
               <h4 className='text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2'>
                  Key Benefits
               </h4>
               <ul className='space-y-2'>
                  {features.map((feature: string, index: number) => (
                     <li
                        key={index}
                        className='flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-md'
                     >
                        <div className='w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5'>
                           <ChevronRight className='w-3 h-3 text-primary' />
                        </div>
                        <span>{feature}</span>
                     </li>
                  ))}
               </ul>
            </div>

            <Link
               href={link}
               className='text-primary font-medium text-sm flex items-center justify-between group-hover:bg-primary/10 p-2 rounded-md transition-colors'
            >
               <span>Learn More About {title}</span>
               <div className='w-6 h-6 rounded-full bg-primary flex items-center justify-center'>
                  <ChevronRight className='w-4 h-4 text-primary-foreground' />
               </div>
            </Link>
         </div>
      </div>
   );
}
