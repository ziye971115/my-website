import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronDown, Copy, Menu, X } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navItems = [
  {
    href: '#story',
    label: '品牌故事',
    children: [
      { href: '#story', label: '茗香晓筑生活美学空间' },
      { href: '#ziye', label: '子夜老师' },
    ],
  },
  {
    href: '#services',
    label: '服务项目',
    children: [
      { href: '#services', label: '茶事雅集' },
      { href: '#services', label: '花艺' },
      { href: '#services', label: '非遗手作' },
      { href: '#services', label: '空间预约' },
    ],
  },
  {
    href: '#products',
    label: '产品中心',
    children: [
      { href: '#products', label: '茶类' },
      { href: '#products', label: '缠丝玛瑙类' },
      { href: '#products', label: '墨红玫瑰类' },
    ],
  },
  { href: '#space', label: '空间场景', children: [] },
  {
    href: '#contact',
    label: '关于我们',
    children: [
      { href: '#contact-xiaohongshu', label: '小红书' },
      { href: '#contact-douyin', label: '抖音' },
      { href: '#contact-official', label: '微信公众号' },
      { href: '#contact-wechat', label: '微信' },
    ],
  },
];

const services = [
  { title: '茶事雅集', image: 'assets/v2/services/tea-field.jpg', position: '52% center' },
  { title: '花艺', image: 'assets/v2/services/floral.jpg', position: 'center' },
  { title: '非遗手作', image: 'assets/v2/services/calligraphy.jpg', position: 'center' },
  { title: '空间预约', image: 'assets/v2/space-brick.jpg', position: 'center' },
];

const products = [
  { title: '双曜之眼', image: 'assets/v2/products/double-eye.jpg', className: 'product-main' },
  { title: '暮山层云', image: 'assets/v2/products/mountain-cloud.jpg', className: 'product-side' },
  { title: '照暖', image: 'assets/v2/products/warm-light.jpg', className: 'product-side' },
];

const heroSlides = [
  { src: 'assets/v2/hero-village.jpg', alt: '雨中的港头村古巷', position: 'center 53%' },
  { src: 'assets/v2/hero-village-blue.jpg', alt: '蓝天白云下的港头村古建筑', position: 'center center' },
  { src: 'assets/v2/hero-village-sunset.jpg', alt: '夕阳映照下的港头村水岸', position: 'center 30%' },
];

const contactChannels = [
  {
    id: 'contact-xiaohongshu',
    title: '小红书',
    account: '小红书号：ziye977271',
    description: '雅集活动 · 空间日常 · 新品分享',
    image: 'assets/v2/contact/xiaohongshu.jpg',
  },
  {
    id: 'contact-douyin',
    title: '抖音',
    account: '抖音号：2097801571',
    description: '雅集活动 · 空间日常 · 新品分享',
    image: 'assets/v2/contact/douyin.png',
  },
  {
    id: 'contact-official',
    title: '微信公众号',
    account: '微信公众号｜子夜的小院',
    description: '雅集活动 · 空间日常 · 新品分享',
    image: 'assets/v2/contact/wechat-official.jpg',
  },
  {
    id: 'contact-wechat',
    title: '微信',
    account: '微信｜子夜的小院',
    description: '到店预约 · 雅集报名 · 品牌合作',
    image: 'assets/v2/contact/wechat.png',
  },
];

function HeroCarousel({ onRevealNavigation }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  return <section className="hero" id="top" aria-label="茗香晓筑首页" onClick={onRevealNavigation}>
    <div className="hero-slides" aria-live="off">
      {heroSlides.map((slide, index) => <img
        className={`hero-slide ${index === activeSlide ? 'is-active' : ''}`}
        src={slide.src}
        alt={slide.alt}
        style={{ objectPosition: slide.position }}
        aria-hidden={index !== activeSlide}
        key={slide.src}
      />)}
    </div>
    <div className="hero-brand" aria-label="茗香晓筑生活美学空间">
      <div className="hero-brand-logo"><img src="assets/v2/logo-white.png" alt="" /></div>
      <p>生活美学空间</p>
    </div>
  </section>;
}

function SiteHeader({ scrolled, visible, menuOpen, onToggle }) {
  return <header className={`site-header ${visible ? 'is-visible' : ''} ${scrolled ? 'is-scrolled' : 'is-at-top'}`}>
    <a className="header-logo" href="#top" aria-label="返回首页"><img src="assets/v2/logo-red.png" alt="茗香晓筑生活美学空间" /></a>
    <nav className="desktop-nav" aria-label="主导航">{navItems.map((item) => <div className={`nav-item ${item.children.length ? 'has-children' : ''}`} key={item.label}>
      <a className="nav-link" href={item.href}>{item.label}</a>
      {item.children.length ? <div className="nav-submenu" aria-label={`${item.label}子菜单`}>
        {item.children.map((child) => <a href={child.href} key={child.label}>{child.label}</a>)}
      </div> : null}
    </div>)}</nav>
    <button className="menu-toggle" onClick={onToggle} aria-expanded={menuOpen} aria-label={menuOpen ? '关闭菜单' : '打开菜单'}>{menuOpen ? <X /> : <Menu />}</button>
  </header>;
}

function MenuOverlay({ open, onClose }) {
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    if (!open) setExpandedItem(null);
  }, [open]);

  return <div className={`menu-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
    <div className="menu-mark"><img src="assets/v2/logo-red.png" alt="" /></div>
    <nav aria-label="展开菜单">{navItems.map((item, index) => <div className={`mobile-nav-item ${expandedItem === item.label ? 'is-expanded' : ''}`} key={item.label}>
      {item.children.length ? <button className="mobile-primary" type="button" onClick={() => setExpandedItem((current) => current === item.label ? null : item.label)} aria-expanded={expandedItem === item.label}>
        <small>0{index + 1}</small><span>{item.label}</span><ChevronDown size={18} />
      </button> : <a className="mobile-primary" href={item.href} onClick={onClose}><small>0{index + 1}</small><span>{item.label}</span></a>}
      {item.children.length ? <div className="mobile-submenu">{item.children.map((child) => <a href={child.href} onClick={onClose} key={child.label}>{child.label}</a>)}</div> : null}
    </div>)}</nav>
    <p>广州 · 花都 · 港头村</p>
  </div>;
}

function ContactPanel({ open, onClose }) {
  const [copied, setCopied] = useState(false);
  const message = '您好，我想了解茗香晓筑的到店预约、雅集活动或品牌合作。';
  const copy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };
  return <div className={`contact-panel ${open ? 'is-open' : ''}`} aria-hidden={!open}>
    <button className="panel-close" onClick={onClose} aria-label="关闭联系面板"><X /></button>
    <p className="eyebrow">VISIT · COLLABORATE</p>
    <h2>来小院，<br />坐一坐。</h2>
    <p className="panel-copy">预约到店、报名雅集、了解作品，或与子夜老师沟通品牌与空间合作。</p>
    <div className="copy-message">{message}</div>
    <button className="text-action solid" onClick={copy}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? '已复制' : '复制联系话术'}</button>
    <p className="panel-note">广州 · 花都 · 港头村</p>
  </div>;
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bioOpen, setBioOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let hideTimer;
    const revealNavigation = (temporary = false) => {
      window.clearTimeout(hideTimer);
      setNavVisible(true);
      if (temporary && window.scrollY < 12) hideTimer = window.setTimeout(() => setNavVisible(false), 2600);
    };
    const onPointerMove = (event) => {
      if (event.clientY < 115) revealNavigation(true);
    };
    const onWheel = (event) => {
      if (event.deltaY !== 0) revealNavigation(window.scrollY < 12);
    };
    const onScroll = () => {
      const nextScrollY = window.scrollY;
      setScrolled(nextScrollY > 18);
      if (nextScrollY > 18 || nextScrollY < lastScrollY) revealNavigation(false);
      if (nextScrollY < 12 && lastScrollY >= 12) revealNavigation(true);
      lastScrollY = nextScrollY;
    };
    setScrolled(window.scrollY > 18);
    setNavVisible(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.clearTimeout(hideTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .1 });
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen || bioOpen || contactOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen, bioOpen, contactOpen]);

  return <>
    <SiteHeader scrolled={scrolled} visible={navVisible || menuOpen} menuOpen={menuOpen} onToggle={() => setMenuOpen((value) => !value)} />
    <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    <main>
      <HeroCarousel onRevealNavigation={() => setNavVisible(true)} />

      <section className="story section" id="story">
        <div className="story-visual reveal">
          <figure><img src="assets/v2/village-water.jpg" alt="港头村水岸与古建筑" /></figure>
          <figure><img src="assets/v2/space-wide.jpg" alt="茗香晓筑生活美学空间内景" /></figure>
        </div>
        <div className="section-copy reveal">
          <p className="eyebrow">MINGXIANG XIAOZHU</p><h2>品牌故事</h2>
          <p className="lead">在古村里，安放一方生活美学。</p>
          <p className="brief">一座小院，以茶、花、器物与传统手作为媒介，让东方生活美学重新回到日常。</p>
          <a className="text-action" href="#space">了解茗香晓筑 <ArrowRight size={17} /></a>
        </div>
      </section>

      <section className="services section" id="services">
        <header className="section-heading reveal"><div><p className="eyebrow">WHAT WE DO</p><h2>服务项目</h2></div><p>在一盏茶、一枝花与一段安静的时间里，重新感受生活。</p></header>
        <div className="service-grid">{services.map((item, index) => <article className="service-item reveal" style={{ '--delay': `${index * 70}ms` }} key={item.title}><figure><img src={item.image} alt={item.title} style={{ objectPosition: item.position }} /></figure><h3>{item.title}</h3></article>)}</div>
      </section>

      <section className="products section" id="products">
        <header className="section-heading reveal"><div><p className="eyebrow">OBJECTS WITH A STORY</p><h2>产品中心</h2></div><p>选一件有温度的器物，留住自然形成的纹理与时间。</p></header>
        <div className="product-grid">{products.map((item) => <article className={`product-item ${item.className} reveal`} key={item.title}><figure><img src={item.image} alt={item.title} /></figure><h3>{item.title}</h3></article>)}</div>
        <button className="text-action product-link" onClick={() => setContactOpen(true)}>了解作品 <ArrowRight size={17} /></button>
      </section>

      <section className="space section" id="space">
        <header className="section-heading reveal"><div><p className="eyebrow">THE COURTYARD</p><h2>空间场景</h2></div><p>港头村 · 茗香晓筑</p></header>
        <figure className="space-panorama reveal"><img src="assets/v2/village-sunset.jpg" alt="夕阳下的港头村古巷" /></figure>
        <div className="space-strip"><figure className="reveal"><img src="assets/v2/village-arch.jpg" alt="港头村拱廊" /></figure><figure className="reveal"><img src="assets/v2/space-wide.jpg" alt="茗香晓筑茶空间" /></figure><figure className="reveal"><img src="assets/v2/space-brick.jpg" alt="茗香晓筑砖墙内景" /></figure></div>
      </section>

      <section className="about" id="ziye">
        <div className="about-copy reveal">
          <p className="eyebrow">FOUNDER · ZIYE</p><h2>关于子夜老师</h2><h3>子夜</h3>
          <ul><li>近15年酒店管理经验</li><li>茗香晓筑生活美学空间创始人</li><li>子夜的小院主理人</li><li>花艺师 · 茶艺师 · 评茶员</li><li>高级非遗技艺传承师 · 高级非遗文化讲师</li></ul>
          <button className="text-action" onClick={() => setBioOpen(true)}>认识子夜 <ArrowRight size={17} /></button>
        </div>
        <figure className="about-photo reveal"><img src="assets/v2/about/ziye-courtyard.jpg" alt="子夜老师在茗香晓筑" /></figure>
      </section>

      <section className="contacts section" id="contact">
        <header className="section-heading reveal"><div><p className="eyebrow">FOLLOW · CONTACT</p><h2>关于我们</h2></div><p>关注子夜的小院，了解雅集活动、空间日常与新品分享。</p></header>
        <div className="contact-grid">
          {contactChannels.map((channel, index) => <article className="contact-card reveal" id={channel.id} style={{ '--delay': `${index * 70}ms` }} key={channel.id}>
            <figure><img src={channel.image} alt={`${channel.title}联系方式`} /></figure>
            <div className="contact-card-copy"><p className="contact-index">0{index + 1}</p><h3>{channel.title}</h3><p>{channel.account}</p><small>{channel.description}</small></div>
          </article>)}
        </div>
      </section>

      <section className="closing"><div className="closing-mark"><img src="assets/v2/logo-red.png" alt="茗香晓筑生活美学空间" /></div><p>凡是生活，皆可美学。</p><button className="text-action" onClick={() => setContactOpen(true)}>预约到店或合作 <ArrowRight size={17} /></button></section>
    </main>
    <footer className="footer"><p>茗香晓筑生活美学空间</p><p>广州 · 花都 · 港头村</p><p>子夜的小院</p></footer>

    <div className={`bio-panel ${bioOpen ? 'is-open' : ''}`} aria-hidden={!bioOpen}>
      <button className="panel-close" onClick={() => setBioOpen(false)} aria-label="关闭人物介绍"><X /></button>
      <p className="eyebrow">ABOUT ZIYE</p><h2>子夜老师</h2>
      <div className="bio-text">
        <p>子夜，茗香晓筑生活美学空间创始人、子夜的小院主理人。她曾在陕西宝鸡从事酒店管理近十五年，其中担任酒店总经理近五年。长期的管理与服务经历，让她对空间、细节和人的真实感受有着持续而具体的体会。</p>
        <p>从陕西到广州，再到苏州生活八年，城市与生活方式的变化没有磨灭她的梦想。她持续学习茶、花、器物与传统文化，先后走访武夷山、杭州、云南普洱、潮州、苏州、河南信阳等茶产区，并在北京、深圳、上海、苏州、广州参与近五十场布展活动。</p>
        <p>为了让审美不只停留在想象里，她多次前往景德镇了解陶瓷在茶器、花器中的应用，也参与过茶空间和美学空间的营造。2021年回到广州后，她在花都港头古村找到理想的落脚点；2022年国庆在村中举办个人插花展，随后筹建茗香晓筑，并于2023年10月正式开业。</p>
        <p>作为花艺师、茶艺师、评茶员，以及高级非遗技艺传承师、高级非遗文化讲师，子夜希望把多年积累转化为普通人可以亲近的生活体验。茗香晓筑既是她人生下半场的一次重新出发，也是一份长期实践：让传统文化在一盏茶、一枝花、一次手作和一次相聚中，重新回到今天的生活。</p>
      </div>
      <button className="text-action solid" onClick={() => { setBioOpen(false); setContactOpen(true); }}>与子夜老师联系 <ArrowRight size={17} /></button>
    </div>
    <ContactPanel open={contactOpen} onClose={() => setContactOpen(false)} />
    {(bioOpen || contactOpen) && <button className="panel-backdrop" aria-label="关闭面板" onClick={() => { setBioOpen(false); setContactOpen(false); }} />}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
