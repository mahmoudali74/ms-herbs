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
    { id: 9, name: 'Hibiscus', category: 'Tea', image: 'data:image/webp;base64,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', featured: false },
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
                    <span>operations@ms-herbs-eg.com</span>
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
  <div className="footer-main">
    <div className="container">
      <div className="footer-grid">
        
  
        <div className="footer-col brand-col">

          <p className="footer-desc">
            Premium Egyptian Herbs & Spices Exporter. Delivering quality and excellence from Egypt to the world.
          </p>
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
            <a href="#" className="social-link instagram" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
              </svg>
            </a>
          </div>
        </div>

 
        <div className="footer-col">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>


        <div className="footer-col">
          <h4 className="footer-title">Our Products</h4>
          <ul className="footer-links">
            <li><a href="#products">Herbs</a></li>
            <li><a href="#products">Spices</a></li>
            <li><a href="#products">Aromatic Plants</a></li>
            <li><a href="#products">Medicinal Herbs</a></li>
            <li><a href="#products">Essential Oils</a></li>
          </ul>
        </div>


        <div className="footer-col">
          <h4 className="footer-title">Contact Us</h4>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div className="contact-details">
                <a href="mailto:operation-manager@ms-herbs.com">operations@ms-herbs-eg.com</a>
                <a href="mailto:info@ms-herbs-eg.com">info@ms-herbs-eg.com</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <div className="contact-details">
                <a href="tel:+201550333069">+20 155 033 3069</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div className="contact-details">
                <p>Sumusta, Beni Suef Governorate, Egypt</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div className="footer-bottom">
    <div className="container">
      <div className="footer-bottom-content">
        <p>&copy; 2026 MS Herbs. All rights reserved.</p>
        <div className="footer-badges">
          <span className="badge">ISO Certified</span>
          <span className="badge">FDA Approved</span>
        </div>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default App;
