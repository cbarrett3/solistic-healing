import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 z-40">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo and brand */}
            <div className="flex items-center">
              <div className="mr-3">
                <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center">
                  {/* Simplified sun/leaf logo */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                    <path d="M12,7 C14.76,7 17,9.24 17,12 C17,14.76 14.76,17 12,17 C9.24,17 7,14.76 7,12
                    C7,9.24 9.24,7 12,7 M12,5 C8.13,5 5,8.13 5,12 C5,15.87 8.13,19 12,19 C15.87,19 19,15.87 19,12
                    C19,8.13 15.87,5 12,5 L12,5 Z M13,1 L11,1 L11,4 L13,4 L13,1 Z M13,20 L11,20 L11,23 L13,23 L13,20 Z
                    M23,11 L20,11 L20,13 L23,13 L23,11 Z M4,11 L1,11 L1,13 L4,13 L4,11 Z M19.07,4.93 L17.66,6.34
                    L19.07,7.76 L20.48,6.34 L19.07,4.93 Z M6.34,17.66 L4.93,19.07 L6.34,20.48 L7.76,19.07 L6.34,17.66 Z
                    M19.07,16.24 L17.66,17.66 L19.07,19.07 L20.48,17.66 L19.07,16.24 Z M6.34,4.93 L4.93,6.34 L6.34,7.76
                    L7.76,6.34 L6.34,4.93 Z"></path>
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-light tracking-wide text-white uppercase">
                ZENLIFT
              </h1>
            </div>

            {/* Main Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-sm uppercase tracking-wider text-white hover:text-primary">
                HOME
              </Link>
              <Link href="/about" className="text-sm uppercase tracking-wider text-white hover:text-primary">
                ABOUT US
              </Link>
              <Link href="/services" className="text-sm uppercase tracking-wider text-white hover:text-primary">
                SERVICES
              </Link>
              <Link href="/page" className="text-sm uppercase tracking-wider text-white hover:text-primary">
                PAGE
              </Link>
              <Link href="/contact" className="text-sm uppercase tracking-wider text-white hover:text-primary">
                CONTACT US
              </Link>
              <span className="text-white/30">|</span>
            </nav>

            {/* Contact Icons */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen w-full overflow-hidden relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1920&auto=format&fit=crop"
            alt="Forest background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
        </div>
        
        <div className="relative h-full w-full px-6 pt-32">
          {/* Subtitle */}
          <div className="mt-24 ml-6 text-white/80 text-sm uppercase tracking-widest">
            ZENLIFT - MENTAL HEALTH
          </div>
          
          {/* Main content */}
          <div className="ml-6 max-w-[600px] mt-4">
            <h2 className="text-5xl lg:text-6xl font-medium leading-[1.2] text-white mb-6">
              Your Path to<br />
              Mental Wellness<br />
              Starts Here
            </h2>
            <div className="w-[100px] h-[1px] bg-white/40 my-6"></div>
            <p className="text-white/80 max-w-[500px] mb-8">
              Odio cras proin proin sit quis fringilla aliquet. Consectetur elementum viverra egestas egestas nulla ullamcorper varius quam.
            </p>
            <button className="bg-primary text-black uppercase font-medium px-8 py-3 rounded-full text-sm tracking-wider hover:opacity-90 transition-colors">
              LEARN MORE
            </button>
            
            <div className="mt-36">
              <div className="text-sm text-white">
                <span className="font-bold">4.9</span>/5 Rating From Our Clients
              </div>
            </div>
          </div>
          
          {/* Watch Story Element */}
          <div className="absolute top-[20%] right-[5%] z-30 flex items-center">
            <div className="mr-2 text-sm text-white text-right">
              Watch Our Story
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                <Image 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop"
                  alt="Profile"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Services Card */}
          <div className="absolute bottom-[15%] right-[5%] z-30 w-[240px]">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-black">Core Services</h3>
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#F2FED7] text-black p-3 rounded-lg text-sm">
                    Therapy Sessions
                  </div>
                  <div className="bg-[#F2FED7] text-black p-3 rounded-lg text-sm">
                    Psychiatric Consultations
                  </div>
                </div>
              </div>
              <div className="w-full h-[120px] overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=240&auto=format&fit=crop"
                  alt="Therapy session"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
