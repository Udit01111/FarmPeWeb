import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import { 
  Sprout, 
  Cloud, 
  Calculator, 
  Users, 
  Download, 
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Check,
  Sun,
  Moon,
  Menu,
  Target,
  Heart,
  Award
} from 'lucide-react';
import ParticlesHero from "../components/ParticlesHero";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorOutlinePos, setCursorOutlinePos] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  // Sound effect for theme toggle
  const [playOn] = useSound('/switch-on.mp3', { volume: 0.5 });
  const [playOff] = useSound('/switch-off.mp3', { volume: 0.5 });

  useEffect(() => {
    // Preloader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Cursor animation
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorOutlinePos({ x: e.clientX - 15, y: e.clientY - 15 });
    };

    document.addEventListener('mousemove', moveCursor);

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      controls.start({ y: scrolled * 0.5 });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      playOff();
      document.documentElement.classList.remove('dark');
    } else {
      playOn();
      document.documentElement.classList.add('dark');
    }
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className={`preloader ${!isLoading ? 'fade-out' : ''}`}>
        <div className="tractor" />
        <h2 className="text-white text-2xl mt-8">Welcome to FarmPe</h2>
      </div>
    );
  }

  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?auto=format&fit=crop&q=80",
      bio: "Agricultural expert with 15+ years of experience"
    },
    {
      name: "Priya Singh",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
      bio: "Tech innovator passionate about AgriTech"
    },
    {
      name: "Amit Patel",
      role: "Community Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      bio: "Expert in farmer community engagement"
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gradient-to-b from-green-50 to-white'}`}>
      <div className="cursor-dot" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className="cursor-outline" style={{ left: cursorOutlinePos.x, top: cursorOutlinePos.y }} />

      {/* Navigation Header */}
      <header className="fixed w-full z-50 nav-gradient backdrop-blur-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">FarmPe</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-green-100">Home</a>
              <a href="#about" className="text-white hover:text-green-100">About</a>
              <a href="#features" className="text-white hover:text-green-100">Features</a>
              <a href="#" className="text-white hover:text-green-100">How it Works</a>
              <button className="px-4 py-2 rounded-lg bg-white text-orange-500 hover:bg-orange-50 transition">
                Get Started
              </button>
              <button onClick={toggleTheme} className="theme-toggle">
                {isDark ? <Sun className="text-white" /> : <Moon className="text-white" />}
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu />
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4"
              >
                <div className="flex flex-col space-y-4 text-white">
                  <a href="#" className="hover:text-green-100">Home</a>
                  <a href="#about" className="hover:text-green-100">About</a>
                  <a href="#features" className="hover:text-green-100">Features</a>
                  <a href="#" className="hover:text-green-100">How it Works</a>
                  <button className="px-4 py-2 rounded-lg bg-white text-orange-500 hover:bg-orange-50">
                    Get Started
                  </button>
                  <button onClick={toggleTheme} className="theme-toggle">
                    {isDark ? <Sun /> : <Moon />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center parallax-wrapper pt-20">
            {/* Particle Effect */}
              <ParticlesHero />

        <motion.div 
          animate={controls}
          className={`absolute inset-0 geometric-bg ${isDark ? 'geometric-bg-dark' : 'geometric-bg-light'}`}
        />
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.h1 
                className={`text-5xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} leading-tight`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Empowering Farmers with Smart Solutions
              </motion.h1>
              <motion.p 
                className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Your One-Stop Agri-Tech Solution for Smarter Farming
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button className={`${isDark ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'} text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2`}>
                  <Download className="h-5 w-5" />
                  Download App
                </button>
                <button 
                  onClick={scrollToFeatures}
                  className={`border-2 ${isDark ? 'border-yellow-500 text-yellow-500 hover:bg-yellow-500/10' : 'border-green-600 text-green-600 hover:bg-green-50'} px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2`}
                >
                  Explore Features
                  <ChevronDown className="h-5 w-5" />
                </button>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80"
                alt="Farmer with smartphone"
                className="rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-green-50 to-orange-50'} relative overflow-hidden`}>
        <div className={`absolute inset-0 geometric-bg ${isDark ? 'geometric-bg-dark' : 'geometric-bg-light'}`} />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <motion.h2 
              className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              About FarmPe
            </motion.h2>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg`}
            >
              <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-100 text-green-600'} flex items-center justify-center mb-4`}>
                <Target />
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Our Mission</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                To empower farmers with technology and knowledge, enabling them to make informed decisions and improve their agricultural practices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg`}
            >
              <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-100 text-green-600'} flex items-center justify-center mb-4`}>
                <Heart />
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Our Values</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Community-driven, sustainable agriculture, innovation, and farmer empowerment are at the heart of everything we do.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg`}
            >
              <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-100 text-green-600'} flex items-center justify-center mb-4`}>
                <Award />
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Our Goals</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                To create India's largest digital farming community and revolutionize agricultural practices through technology.
              </p>
            </motion.div>
          </div>

          {/* Team Section */}
          <div className="mt-24">
            <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} text-center mb-12`}>
              Meet Our Team
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg text-center`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {member.name}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-yellow-500' : 'text-green-600'} mb-4`}>
                    {member.role}
                  </p>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className={`py-24 relative overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-green-50 to-orange-50'}`}>
        <div className={`absolute inset-0 geometric-bg ${isDark ? 'geometric-bg-dark' : 'geometric-bg-light'}`} />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <motion.h2 
              className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Smart Features for Modern Farming
            </motion.h2>
            <motion.p 
              className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Everything you need to manage your farm efficiently
            </motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sprout className="h-8 w-8" />,
                title: "Crop Management",
                description: "Monitor and manage crops with real-time insights and AI-powered recommendations"
              },
              {
                icon: <Cloud className="h-8 w-8" />,
                title: "Weather & MSP Updates",
                description: "Stay informed with accurate weather forecasts and latest market prices"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Krishi Pali & Expert Talks",
                description: "Connect with experts and fellow farmers for guidance and knowledge sharing"
              },
              {
                icon: <Calculator className="h-8 w-8" />,
                title: "Smart Calculators",
                description: "Calculate fertilizer needs and predict crop yields with precision"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:shadow-lg'} transition group feature-card relative`}
              >
                <div 
                  className="feature-tractor"
                  style={{
                    backgroundImage: `url('https://api.iconify.design/emojione-monotone:tractor.svg?color=${isDark ? '%23fbbf24' : '%2322c55e'}')`
                  }}
                />
                <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-100 text-green-600'} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {feature.title}
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 to-green-50'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why Choose FarmPe?
            </motion.h2>
            <motion.p 
              className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join thousands of farmers who are already benefiting from our platform
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Vernacular language support",
              "24/7 expert assistance",
              "Real-time market insights",
              "Community-driven knowledge",
              "Smart farming tools",
              "Personalized recommendations"
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-3 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex-shrink-0">
                  <Check className={isDark ? 'text-yellow-500' : 'text-green-600'} />
                </div>
                <span className={isDark ? 'text-white' : 'text-gray-800'}>
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`py-24 ${isDark ? 'bg-yellow-500' : 'bg-green-600'}`}>
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-4xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Farming?
          </motion.h2>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button className="bg-white text-green-600 dark:text-yellow-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition flex items-center gap-2">
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-900'} text-white py-16`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Sprout className={isDark ? 'text-yellow-400' : 'text-green-400'} />
                <span className="text-2xl font-bold">FarmPe</span>
              </div>
              <p className="text-gray-400">
                Empowering farmers with technology and community-driven solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className={isDark ? 'text-yellow-400' : 'text-green-400'} />
                  <span>+91 1234567890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className={isDark ? 'text-yellow-400' : 'text-green-400'} />
                  <span>contact@farmpe.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className={isDark ? 'text-yellow-400' : 'text-green-400'} />
                  <span>Bangalore, India</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className={`hover:text-${isDark ? 'yellow' : 'green'}-400`}>About Us</a></li>
                <li><a href="#" className={`hover:text-${isDark ? 'yellow' : 'green'}-400`}>Features</a></li>
                <li><a href="#" className={`hover:text-${isDark ? 'yellow' : 'green'}-400`}>Blog</a></li>
                <li><a href="#" className={`hover:text-${isDark ? 'yellow' : 'green'}-400`}>Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Download App</h3>
              <div className="space-y-4">
                <button className="w-full bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2">
                  Google Play
                </button>
                <button className="w-full bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2">
                  App Store
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 FarmPe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;