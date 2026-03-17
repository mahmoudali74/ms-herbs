import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) {
          setVisibleSections(prev => new Set([...prev, section.id]));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { id: 1, name: 'Mint (Peppermint)', category: 'Herbs', image: 'https://images.unsplash.com/photo-1648036933917-762235e009c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWludCUyMChQZXBwZXJtaW50KXxlbnwwfHwwfHx8MA%3D%3D', featured: true },
    { id: 2, name: 'Basil', category: 'Herbs', image: 'https://plus.unsplash.com/premium_photo-1725899523683-838307ab1552?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFzaWx8ZW58MHx8MHx8fDA%3D', featured: false },
    { id: 3, name: 'Parsley', category: 'Herbs', image: 'https://images.unsplash.com/photo-1590759485418-90509afec818?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8UGFyc2xleXxlbnwwfHwwfHx8MA%3D%3D', featured: false },
    { id: 4, name: 'Dill', category: 'Herbs', image: 'https://images.unsplash.com/photo-1683295188245-dc46d5c2ffef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlsbHxlbnwwfHwwfHx8MA%3D%3D', featured: false },
    { id: 5, name: 'Coriander', category: 'Spices', image: 'https://images.unsplash.com/photo-1588879460618-9249e7d947d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29yaWFuZGVyfGVufDB8fDB8fHww', featured: false },
    { id: 6, name: 'Fennel', category: 'Spices', image: 'https://plus.unsplash.com/premium_photo-1723773767982-7456ce231368?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RmVubmVsfGVufDB8fDB8fHww', featured: false },
    { id: 7, name: 'Anise', category: 'Spices', image: 'https://plus.unsplash.com/premium_photo-1723917630278-1e2c02ac9516?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8QW5pc2V8ZW58MHx8MHx8fDA%3D', featured: false },
    { id: 8, name: 'Cumin', category: 'Spices', image: 'https://plus.unsplash.com/premium_photo-1726862790171-0d6208559224?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3VtaW4lMjBwb3dkZXJ8ZW58MHx8MHx8fDA%3D', featured: false },
    { id: 9, name: 'Hibiscus', category: 'Tea', image: 'https://images.unsplash.com/photo-1694545357525-624fda048319?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEhpYmlzY3VzJTIwKFRCQyUyMCUyNiUyMEN1dCl8ZW58MHx8MHx8fDA%3D', featured: false },
    { id: 10, name: 'Chamomile', category: 'Tea', image: 'https://images.unsplash.com/photo-1624041755997-393bd6b31f05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2hhbW9taWxlfGVufDB8fDB8fHww', featured: false },
    { id: 11, name: 'Thyme', category: 'Herbs', image: 'https://images.unsplash.com/photo-1589562037508-ae76f4c445e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VGh5bWV8ZW58MHx8MHx8fDA%3D', featured: false },
    { id: 12, name: 'Rosemary', category: 'Herbs', image: 'https://images.unsplash.com/photo-1582745741856-1a5d68158ba3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Um9zZW1hcnl8ZW58MHx8MHx8fDA%3D', featured: false },
    { id: 13, name: 'Sage', category: 'Herbs', image: 'https://images.unsplash.com/photo-1734367607096-9005870e78b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FnZSUyMHBsYW50fGVufDB8fDB8fHww', featured: false },
{ id: 14, name: 'Licorice', category: 'Spices', image: 'https://images.unsplash.com/photo-1495548291205-c2a71a542583?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TGljb3JpY2V8ZW58MHx8MHx8fDA%3D', featured: false },
{ id: 15, name: 'Guava Leaves', category: 'Herbs', image: 'https://images.unsplash.com/photo-1758614256686-2b2e907f5892?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEd1YXZhJTIwTGVhdmVzfGVufDB8fDB8fHww', featured: false },
{ id: 16, name: 'Sesame Seeds', category: 'Seeds', image: 'https://plus.unsplash.com/premium_photo-1674654419404-667fcdd0fe13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2VzYW1lJTIwU2VlZHN8ZW58MHx8MHx8fDA%3D', featured: false },
{ id: 17, name: 'Sunflower Seeds', category: 'Seeds', image: 'https://plus.unsplash.com/premium_photo-1726072386964-62fe47163be7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3VuZmxvd2VyJTIwU2VlZHN8ZW58MHx8MHx8fDA%3D', featured: false },
{ id: 18, name: 'Nigella Seeds', category: 'Seeds', image: 'https://images.unsplash.com/photo-1717878192612-c3984b2b5fc8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmlnZWxsYSUyMFNlZWRzfGVufDB8fDB8fHww', featured: false },
{ id: 19, name: 'Molokhia', category: 'Herbs', image: 'https://th.bing.com/th/id/OIP.jGH4xDf0EXhV9RRy5mHiGQHaEf?w=287&h=180&c=7&r=0&o=7&pid=1.7&rm=3', featured: false },
{ id: 20, name: 'Dried Lemon', category: 'Dried Products', image: 'https://plus.unsplash.com/premium_photo-1675011400590-c0274bf3bfbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RHJpZWQlMjBMZW1vbnxlbnwwfHwwfHx8MA%3D%3D', featured: false },
  ];

  const categories = ['All', 'Herbs', 'Spices', 'Tea'];
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const stats = [
    { number: '2100+', label: 'Tons Exported', icon: '🌍' },
    { number: '2500', label: 'Tons Mint to EU', icon: '🚢' },
    { number: '50+', label: 'Global Partners', icon: '🤝' },
    { number: '20+', label: 'Years Experience', icon: '⏰' }
  ];

  return (
    <div className="App">
      {/* Navigation */}
      <nav className={`navbar ${scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <img src="/assets/17.03.2026_19.00.14_REC.png" alt="MS Herbs" className="logo-img" />
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {['Home', 'About', 'Products', 'Why Us', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(' ', '-')}`}>{item}</a>
              </li>
            ))}
          </ul>
   
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
{/* Hero Section */}
<section id="home" className="hero">
  <div className="hero-bg">
    <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920" alt="Background" />
    <div className="overlay"></div>
  </div>
  
  <div className="hero-content">
    <div className="hero-badge animate-fade-in">
      <span className="pulse">🌱</span>
      Premium Egyptian Herbs & Spices
    </div>
    
    <h1 className="animate-slide-up">
      Nature's Finest
      <span className="highlight">From Egypt to You</span>
    </h1>
    
    <p className="animate-slide-up delay-1">
      Delivering premium quality herbs and spices with purity, consistency, and trust.
    </p>

    {/* ✨ AI Achievement Badge - إضافة مميزة ✨ */}
    <div className="ai-achievement-badge animate-slide-up delay-2">
      <div className="badge-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
          <circle cx="7.5" cy="14.5" r="1.5"/>
          <circle cx="16.5" cy="14.5" r="1.5"/>
        </svg>
        <span className="badge-glow"></span>
      </div>
      <div className="badge-content">
        <span className="badge-label">🏆 World First</span>
        <p className="badge-text">
          MS Herbs - The world's first company to utilize AI technology in drying, packaging, and processing of medicinal, aromatic herbs and spices
        </p>
      </div>
    </div>
    
    <div className="hero-features animate-slide-up delay-3">
      <div className="feature-item">
        <span className="check">✓</span>
        ISO & FDA Certified
      </div>
      <div className="feature-item">
        <span className="check">✓</span>
        Europe & Gulf Export
      </div>
      <div className="feature-item">
        <span className="check">✓</span>
        Best Market Prices
      </div>
    </div>
    
    <div className="hero-buttons animate-slide-up delay-4">
      <a href="#contact" className="btn-primary">
        <span>Get Your Quote</span>
        <span className="arrow">→</span>
      </a>
      <a href="#products" className="btn-outline">
        Explore Products
      </a>
    </div>
  </div>
  
  <div className="scroll-down">
    <div className="mouse">
      <div className="wheel"></div>
    </div>
  </div>
</section>
      {/* Statistics */}
      <section className="stats-section" id="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`stat-card ${visibleSections.has('stats') ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className={`about-images ${visibleSections.has('about') ? 'slide-in-left' : ''}`}>
              <div className="image-main">
                
              </div>
            
            </div>
            
            <div className={`about-content ${visibleSections.has('about') ? 'slide-in-right' : ''}`}>
              <div className="section-tag">Who We Are</div>
              <h2>Great Products Start with Great Origins</h2>
              <p className="about-text">
                We are dedicated to sourcing, processing, and exporting premium Egyptian herbs 
                and spices that meet international standards while supporting sustainable agriculture.
              </p>
              
              <div className="quality-list">
                <div className="quality-item">
                  <div className="quality-icon">✨</div>
                  <div>
                    <h4>High Purity</h4>
                    <p>Carefully selected materials</p>
                  </div>
                </div>
                <div className="quality-item">
                  <div className="quality-icon">🌸</div>
                  <div>
                    <h4>Strong Aroma</h4>
                    <p>Natural freshness preserved</p>
                  </div>
                </div>
                <div className="quality-item">
                  <div className="quality-icon">✓</div>
                  <div>
                    <h4>Consistent Quality</h4>
                    <p>International standards met</p>
                  </div>
                </div>
              </div>
              
              <div className="mission-vision">
                <div className="mv-card">
                  <div className="mv-icon">🎯</div>
                  <div>
                    <h4>Our Mission</h4>
                    <p>Premium quality supporting sustainable agriculture</p>
                  </div>
                </div>
                <div className="mv-card">
                  <div className="mv-icon">👁️</div>
                  <div>
                    <h4>Our Vision</h4>
                    <p>Globally recognized Egyptian exporter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-wrapper">
            <div className="featured-badge">
              <span className="star">⭐</span>
              Featured: Organic Dried Mint
            </div>
            <h2>Our Best Seller</h2>
            <p className="featured-desc">
              Exported to EU • 5-25kg Packaging • ISO & FDA Certified • 2500+ tons exported
            </p>
            <a href="#contact" className="btn-primary">
              Inquire Now
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Our Products</div>
            <h2>Explore Our Range</h2>
            <p>Premium quality herbs and spices from Egypt's finest farms</p>
          </div>

          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className={`product-card ${product.featured ? 'featured' : ''} ${visibleSections.has('products') ? 'fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.featured && <div className="product-badge">★ Featured</div>}
                  <div className="product-overlay">
                    <button className="quick-view">Quick View</button>
                  </div>
                </div>
                <div className="product-info">
                  <span className="category">{product.category}</span>
                  <h3>{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="why-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Why Choose Us</div>
            <h2>The MS-Herbs Advantage</h2>
          </div>
          
          <div className="why-grid">
            {[
              { icon: '✨', title: 'Premium Quality', desc: 'Only the finest selection' },
              { icon: '🔬', title: 'Quality Control', desc: 'Rigorous testing' },
              { icon: '💰', title: 'Best Prices', desc: 'Competitive rates' },
              { icon: '⏱️', title: 'On-Time Delivery', desc: 'Worldwide shipping' },
              { icon: '📦', title: 'Flexible Orders', desc: '5kg to bulk orders' },
              { icon: '🌐', title: 'Global Experience', desc: 'Export expertise' },
            ].map((item, index) => (
              <div 
                key={index} 
                className={`why-card ${visibleSections.has('why-us') ? 'scale-in' : ''}`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Our Services</div>
            <h2>Complete Support</h2>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🌱</div>
              <h3>Sourcing</h3>
              <p>Direct from trusted farmers</p>
            </div>
            <div className="service-card">
              <div className="service-icon">⚙️</div>
              <h3>Processing</h3>
              <p>Modern facilities</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🚢</div>
              <h3>Export</h3>
              <p>Seamless logistics</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔄</div>
              <h3>Supply</h3>
              <p>Year-round availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Export Markets */}
      <section className="markets-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Export Markets</div>
            <h2>Global Reach</h2>
          </div>
          
          <div className="markets-grid">
            <div className="market-card">
              <div className="market-icon">🇪</div>
              <h3>European Union</h3>
            </div>
            <div className="market-card">
              <div className="market-icon">🇬🇨</div>
              <h3>Gulf Countries</h3>
            </div>
            <div className="market-card">
              <div className="market-icon">🌏</div>
              <h3>Middle East</h3>
            </div>
            <div className="market-card">
              <div className="market-icon">🌍</div>
              <h3>North Africa</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <div className="section-tag">Get In Touch</div>
              <h2>Start Your Order Today</h2>
              <p>Ready to partner with us? Contact us for a quote!</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <strong>Location</strong>
                    <span>Egypt</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div>
                    <strong>Email</strong>
                    <span>operation-manager@ms-herbs.com</span>
                    <br></br>
                           <span>info@ms-herbs-eg.com</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📱</div>
                  <div>
                    <strong>Phone</strong>
                    <span>+201550333069</span>
                  </div>
                </div>
              </div>
              
              <div className="certifications">
                <h4>Certifications:</h4>
                <div className="cert-badges">
                  <span className="cert-badge">ISO Certified</span>
                  <span className="cert-badge">FDA Approved</span>
                </div>
              </div>
            </div>
            
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn-primary btn-full">
                Send Message
                <span className="arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </section>
<footer className="footer">
  <div className="container">
    <div className="footer-top">
      
      <div className="footer-brand">
        {/* ✨ اسم الشركة مع أيقونة مميزة ✨ */}
        <div className="footer-logo-text">
          <span className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c4-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 4 8 8 12z"/>
              <path d="M12 22c-2.5-2.5-4.5-5-5.5-8"/>
              <path d="M12 22c2.5-2.5 4.5-5 5.5-8"/>
              <path d="M12 14c-1.5-1.5-3-3-3-5a3 3 0 1 1 6 0c0 2-1.5 3.5-3 5z"/>
            </svg>
          </span>
          <span className="logo-name">
            MS <span className="logo-accent">Herbs</span>
          </span>
        </div>
        
        <p>Premium Egyptian Herbs & Spices Exporter. Delivering quality and excellence from Egypt to the world.</p>
        
        <div className="social-links">
          <a href="https://www.facebook.com/profile.php?id=61565730876093" target="_blank" rel="noopener noreferrer" className="social-link facebook" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://wa.me/201550333069" target="_blank" rel="noopener noreferrer" className="social-link whatsapp" aria-label="WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.52 3.48a11.892 11.892 0 0 0-16.8 16.8l-1.86 6.8 6.94-1.82a11.892 11.892 0 0 0 16.8-16.8zM12 21.5c-1.4 0-2.76-.36-3.96-1.05l-.28-.17-4.12 1.08 1.1-4.03-.18-.28a9.518 9.518 0 1 1 7.44 4.45zm5.4-7.35c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.17.2-.28.3-.47.1-.2.05-.37-.03-.52-.08-.15-.68-1.63-.93-2.23-.25-.59-.5-.51-.68-.52-.17 0-.37-.01-.57-.01s-.52.08-.79.37c-.27.28-1.04 1.02-1.04 2.49s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.1 4.49.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.07-.13-.27-.2-.57-.35z"/>
            </svg>
          </a>
        </div>
      </div>
      
      <div className="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      
      <div className="footer-contact">
        <h4>Contact</h4>
        <div className="footer-contact-item">
          <span className="icon">📧</span>
          <div className="contact-text">
             <p>operation-manager@ms-herbs.com</p>
             <p>info@ms-herbs-eg.com</p>
          </div>
        </div>
        <div className="footer-contact-item">
          <span className="icon">📱</span>
          <p>+201550333069</p>
        </div>
        <div className="footer-contact-item">
          <span className="icon">📍</span>
          <p>Sumusta, Beni Suef Governorate</p>
        </div>
      </div>
    </div>
    
    <div className="footer-bottom">
      <p>&copy; 2026 MS-Herbs. All rights reserved.</p>
    </div>
  </div>
</footer>
    </div>
  );
};

export default App;