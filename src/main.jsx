import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronDown, Copy, Menu, X } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import heroVillage from '../assets/v2/hero-village.webp';
import './styles.css';

const navItems = [
  {
    href: '#story',
    label: '品牌故事',
    children: [
      { href: '#story', label: '茗香晓筑生活美学空间', action: 'story' },
      { href: '#ziye', label: '子夜老师', action: 'bio' },
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
      { href: '#products-tea', label: '茶类' },
      { href: '#products-agate', label: '缠丝玛瑙类' },
      { href: '#products-rose', label: '墨红玫瑰类' },
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

function HeaderLogo() {
  return <a className="header-logo" href="#top" aria-label="返回首页">
    <span className="header-logo-symbol" aria-hidden="true"><img src="assets/v2/logo-red.png" alt="" /></span>
    <span className="header-logo-wordmark"><img src="assets/v2/logo-red.png" alt="茗香晓筑生活美学空间" /></span>
  </a>;
}

const services = [
  { title: '茶事雅集', image: 'assets/v2/services/tea-gathering-2026.webp', position: 'center' },
  { title: '花艺', image: 'assets/v2/services/floristry-2026.webp', position: '44% center' },
  { title: '非遗手作', image: 'assets/v2/services/heritage-craft-2026.webp', position: 'center' },
  { title: '空间预约', image: 'assets/v2/services/space-booking-2026.webp', position: '62% center' },
];

const productCategories = [
  { id: 'tea', label: '茶类' },
  { id: 'agate', label: '缠丝玛瑙类' },
  { id: 'rose', label: '墨红玫瑰类' },
];

const makeAgateImages = (slug) => [1, 2, 3].map((index) => `assets/v2/products/agate/gallery/${slug}-0${index}.webp`);

const agateProducts = [
  { title: '双曜之眼', slug: 'double-eye', coverIndex: 2 },
  { title: '暮山层云', slug: 'mountain-cloud', coverIndex: 1 },
  { title: '照暖 缠丝玛瑙佩', slug: 'zhaonuan', coverIndex: 0 },
  { title: '纹心相照 · 缠丝玛瑙佩', slug: 'wenxin-xiangzhao', coverIndex: 2 },
  { title: '稳纹 · 缠丝玛瑙佩', slug: 'wenwen', coverIndex: 0 },
  { title: '澜纹', slug: 'lanwen', coverIndex: 0 },
  { title: '青波 · 缠丝玛瑙佩', slug: 'qingbo', coverIndex: 0 },
  { title: '藏曜 · 缠丝玛瑙佩', slug: 'cangyao', coverIndex: 2 },
  { title: '节序 · 缠丝玛瑙佩', slug: 'jiexu', coverIndex: 0 },
  { title: '叠山 · 缠丝玛瑙佩', slug: 'dieshan', coverIndex: 2 },
  { title: '暖行 · 缠丝玛瑙佩', slug: 'nuanxing', coverIndex: 0 },
  { title: '云脊', slug: 'yunji', coverIndex: 0 },
  { title: '护心眼', slug: 'huxinyan', coverIndex: 0 },
  { title: '一眼定心', slug: 'yiyan-dingxin', coverIndex: 0 },
  { title: '云眼', slug: 'yunyan', coverIndex: 0 },
  { title: '观相环', slug: 'guanxianghuan', coverIndex: 2 },
  { title: '红轮印心', slug: 'honglun-yinxin', coverIndex: 0 },
  { title: '安然瞳', slug: 'anrantong', coverIndex: 0 },
  { title: '玄心映月', slug: 'xuanxin-yingyue', coverIndex: 0 },
  { title: '赤耀眼', slug: 'chiyaoyan', coverIndex: 2 },
].map((product) => ({ ...product, images: makeAgateImages(product.slug) }));

const frameworkSlots = [1, 2, 3];

const teaFrameworkItems = [
  {
    title: '茶叶',
    description: '茗香晓筑所选茶品，涵盖绿茶、红茶、半发酵茶与后发酵茶，因时节、风土与制法而各具气韵。绿茶清鲜，红茶温润，半发酵茶香气层次丰富，后发酵茶醇厚耐泡。我们重视茶叶本身的洁净度、香气、汤感与回味，也关注一款茶在日常中的适饮性。无论独饮、会友或雅集，都希望在合适的水温与冲泡节奏中，让一盏茶呈现自然本味。',
  },
  {
    title: '茶具',
    description: '茗香晓筑陈列与使用的茶具，包括茶杯、茶壶、盖碗、茶则及日常茶席所需器物。器物不只承担冲泡与品饮的功能，也影响水流、温度、香气和手中的感受。我们关注材质、器形、比例与使用之间的关系，选择朴素、耐看且适合日常的器物。茶具可以独立欣赏，也可以与不同茶品相配，在一拿一放、一斟一饮之间，让茶席更从容，也让生活多一分秩序与温度。',
  },
];

const roseScenes = [
  {
    title: '日常饮用',
    description: '一朵冻干花，一杯温水，让日常饮水多一分自然香气与从容。',
    image: 'assets/v2/products/rose/daily-drink.webp',
  },
  {
    title: '点心搭配',
    description: '玫瑰的色泽与清雅花香，也适合进入甜点、下午茶与轻松相聚的时刻。',
    image: 'assets/v2/products/rose/dessert-pairing.webp',
  },
  {
    title: '一席相聚',
    description: '在茶席、雅集与餐叙中，以一朵花为引，让分享更有温度。',
    image: 'assets/v2/products/rose/gathering.webp',
  },
];

const heroSlides = [
  { src: heroVillage, alt: '雨中的港头村古巷', position: 'center 53%' },
  { src: 'assets/v2/hero-village-blue.webp', alt: '蓝天白云下的港头村古建筑', position: 'center center' },
  { src: 'assets/v2/hero-village-sunset.webp', alt: '夕阳映照下的港头村水岸', position: 'center 30%' },
];

const contactChannels = [
  {
    id: 'contact-xiaohongshu',
    title: '小红书',
    account: '小红书号：ziye977271',
    description: '雅集活动 · 空间日常 · 新品分享',
    image: 'assets/v2/contact/xiaohongshu.jpg',
    imageWidth: 891,
    imageHeight: 1908,
    crop: '520 1538 310 310',
  },
  {
    id: 'contact-douyin',
    title: '抖音',
    account: '抖音号：2097801571',
    description: '雅集活动 · 空间日常 · 新品分享',
    image: 'assets/v2/contact/douyin.png',
    imageWidth: 1266,
    imageHeight: 1890,
    crop: '215 250 850 850',
  },
  {
    id: 'contact-official',
    title: '微信公众号',
    account: '微信公众号｜子夜的小院',
    description: '雅集活动 · 空间日常 · 新品分享',
    image: 'assets/v2/contact/wechat-official.jpg',
    imageWidth: 430,
    imageHeight: 430,
    crop: '0 0 430 430',
  },
  {
    id: 'contact-wechat',
    title: '微信',
    account: '微信｜子夜的小院',
    description: '到店预约 · 雅集报名 · 品牌合作',
    image: 'assets/v2/contact/wechat.png',
    imageWidth: 934,
    imageHeight: 1370,
    crop: '112 355 715 715',
  },
];

function ContactCard({ channel, index }) {
  const titleId = `${channel.id}-code-title`;

  return (
    <article
      className="contact-card reveal"
      id={channel.id}
      style={{ '--delay': `${index * 70}ms` }}
    >
      <figure className="contact-card-media">
        <span className="contact-code-frame">
          <svg
            className="contact-code"
            viewBox={channel.crop}
            role="img"
            aria-labelledby={titleId}
          >
            <title id={titleId}>{channel.title}联系码</title>
            <image
              href={channel.image}
              width={channel.imageWidth}
              height={channel.imageHeight}
            />
          </svg>
        </span>
      </figure>
      <div className="contact-card-copy">
        {index > 2 ? <p className="contact-index">0{index + 1}</p> : null}
        <h3>{channel.title}</h3>
        <p>{channel.account}</p>
        <small>{channel.description}</small>
      </div>
    </article>
  );
}

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
        loading={index === 0 ? 'eager' : 'lazy'}
        fetchPriority={index === 0 ? 'high' : 'low'}
        decoding="async"
        style={{ objectPosition: slide.position }}
        aria-hidden={index !== activeSlide}
        key={slide.src}
      />)}
    </div>
    <div className="hero-brand" aria-label="茗香晓筑生活美学空间">
      <div className="hero-brand-logo"><img src="assets/v2/logo-white.png" alt="" /></div>
      <p className="hero-brand-name-pinyin">MINGXIANGXIAOZHU</p>
      <p className="hero-brand-tagline">生活美学空间</p>
    </div>
  </section>;
}

function SiteHeader({ scrolled, visible, menuOpen, onToggle, toggleRef, onOpenStory, onOpenBio }) {
  const dismissPointerMenu = (event) => {
    event.currentTarget.blur();
    event.currentTarget.closest('.nav-item')?.classList.add('is-clicked');
  };

  const handleChildClick = (event, child) => {
    dismissPointerMenu(event);
    if (!child.action) return;
    event.preventDefault();
    if (child.action === 'story') onOpenStory(event);
    if (child.action === 'bio') onOpenBio(event);
  };

  return <header className={`site-header ${visible ? 'is-visible' : ''} ${scrolled ? 'is-scrolled' : 'is-at-top'}`}>
    <HeaderLogo />
    <nav className="desktop-nav" aria-label="主导航">{navItems.map((item) => <div className={`nav-item ${item.children.length ? 'has-children' : ''}`} onPointerLeave={(event) => event.currentTarget.classList.remove('is-clicked')} key={item.label}>
      <a className="nav-link" href={item.href} onPointerUp={dismissPointerMenu}>{item.label}</a>
      {item.children.length ? <div className="nav-submenu" aria-label={`${item.label}子菜单`}>
        {item.children.map((child) => <a href={child.href} onClick={(event) => handleChildClick(event, child)} key={child.label}>{child.label}</a>)}
      </div> : null}
    </div>)}</nav>
    <button ref={toggleRef} className="menu-toggle" onClick={onToggle} aria-expanded={menuOpen} aria-label={menuOpen ? '关闭菜单' : '打开菜单'}>{menuOpen ? <X /> : <Menu />}</button>
  </header>;
}

function MenuOverlay({ open, onClose, onOpenStory, onOpenBio }) {
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    if (!open) setExpandedItem(null);
  }, [open]);

  const handleChildClick = (event, child) => {
    onClose();
    if (!child.action) return;
    event.preventDefault();
    if (child.action === 'story') onOpenStory(event);
    if (child.action === 'bio') onOpenBio(event);
  };

  return <div className={`menu-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
    <div className="menu-mark"><img src="assets/v2/logo-red.png" alt="" /></div>
    <nav aria-label="展开菜单">{navItems.map((item, index) => <div className={`mobile-nav-item ${expandedItem === item.label ? 'is-expanded' : ''}`} key={item.label}>
      {item.children.length ? <button className="mobile-primary" type="button" onClick={() => setExpandedItem((current) => current === item.label ? null : item.label)} aria-expanded={expandedItem === item.label}>
        <small>0{index + 1}</small><span>{item.label}</span><ChevronDown size={18} />
      </button> : <a className="mobile-primary" href={item.href} onClick={onClose}><small>0{index + 1}</small><span>{item.label}</span></a>}
      {item.children.length ? <div className="mobile-submenu">{item.children.map((child) => <a href={child.href} onClick={(event) => handleChildClick(event, child)} key={child.label}>{child.label}</a>)}</div> : null}
    </div>)}</nav>
    <p>广州 · 花都 · 港头村</p>
  </div>;
}

function ContactPanel({ open, onClose }) {
  const [copied, setCopied] = useState(false);
  const closeButtonRef = useRef(null);
  const message = '您好，我想了解茗香晓筑的到店预约、雅集活动或品牌合作。';
  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);
  const copy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };
  return <div className={`contact-panel ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
    <button ref={closeButtonRef} className="panel-close" onClick={onClose} aria-label="关闭联系面板"><X /></button>
    <h2>来小院，<br />坐一坐。</h2>
    <p className="panel-copy">预约到店、报名雅集、了解作品，或与子夜老师沟通品牌与空间合作。</p>
    <div className="copy-message">{message}</div>
    <button className="text-action solid" onClick={copy}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? '已复制' : '复制联系话术'}</button>
    <p className="panel-note">广州 · 花都 · 港头村</p>
  </div>;
}

function BrandStoryPanel({ open, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  return <section className={`story-panel ${open ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="brand-story-title" aria-hidden={!open} inert={!open}>
    <button ref={closeButtonRef} className="panel-close" onClick={onClose} aria-label="关闭品牌故事"><X /></button>
    <h2 id="brand-story-title">茗香晓筑<br />生活美学空间</h2>
    <div className="brand-story-text">
      <p>茗香晓筑生活美学空间，坐落于广州市花都区花东镇港头古村，于2023年10月正式开业。这里以古村的安静为底色，把茶、花、器物与传统手作带回日常。</p>
      <p>空间由子夜老师创办，开展茶事雅集、花艺、香道、非遗手作、器物展示、文化展陈、空间营造与场地预约等项目。大家都亲切地称这里为“子夜的小院”。来访者可以在这里喝茶、赏花、参与课程与雅集，也可以静静坐一会儿。</p>
      <p><span className="brand-story-slogan">“凡是生活，皆可美学。”</span><br />茗香晓筑生活美学空间希望传统文化能够被亲近、被体验，成为今天生活的一部分。</p>
    </div>
  </section>;
}

function ProductFramework({ type }) {
  const isTea = type === 'tea';
  const items = isTea
    ? teaFrameworkItems
    : frameworkSlots.map((slot) => ({
        title: '墨红玫瑰产品待补充',
        description: '这里将结合产品图片与文字，介绍具体门类的特点、用途与相关信息。',
        slot,
      }));

  return <div className={`product-framework product-framework-${type}`}>
    <aside className="product-third-level" aria-label={`${isTea ? '茶类' : '墨红玫瑰类'}三级门类`}>
      {!isTea ? <p>三级门类</p> : null}
      {items.map((item, index) => <button className={isTea ? 'is-unnumbered' : ''} type="button" disabled key={item.title}>
        {!isTea ? <span>{String(index + 1).padStart(2, '0')}</span> : null}
        <strong>{item.title}</strong>
      </button>)}
    </aside>
    <div className="product-framework-content">
      {items.map((item, index) => <article className="product-framework-card" key={item.title}>
        {!isTea && <div className="product-framework-media" aria-hidden="true"><span>图片待补充</span></div>}
        <div className="product-framework-copy">
          {!isTea ? <small>{String(index + 1).padStart(2, '0')}</small> : null}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      </article>)}
    </div>
  </div>;
}

function RoseProductPage() {
  return <div className="rose-product-page">
    <section className="rose-product-hero">
      <figure>
        <img src="assets/v2/products/rose/hero.webp" alt="墨红玫瑰冻干花置于书页之间" loading="lazy" decoding="async" />
      </figure>
      <div className="rose-product-hero-copy">
        <p className="rose-product-kicker">云南高原 · 墨红玫瑰</p>
        <h3>一朵玫瑰，<br />进入日常</h3>
        <p>墨红玫瑰生长于云南高原，色泽深浓，花香清雅。茗香晓筑将它带入日常饮用、茶席与生活美学场景，让一朵花不只被观赏，也在一杯水、一席相聚与一份赠礼中，成为可以亲近的东方生活体验。</p>
      </div>
    </section>

    <section className="rose-product-feature">
      <div className="rose-product-feature-copy">
        <p className="rose-product-kicker">目前在售产品</p>
        <h3>墨红玫瑰冻干花</h3>
        <p>选用墨红玫瑰，经冻干工艺处理，尽量保留花朵原有的形态、色泽与香气。冲泡时花瓣在水中慢慢舒展，既适合日常独饮，也可用于茶席分享、雅集体验与节日赠礼。</p>
        <p>一朵花，一杯水，让平常的饮水时刻多一分自然与从容。</p>
        <a className="text-action rose-product-detail-link" href="#contact-wechat">了解产品详情 <ArrowRight size={17} /></a>
      </div>
      <figure>
        <img src="assets/v2/products/rose/freeze-dried-flower.webp" alt="玻璃瓶中的墨红玫瑰冻干花" loading="lazy" decoding="async" />
      </figure>
    </section>

    <section className="rose-product-scenes">
      <header>
        <p className="rose-product-kicker">饮用与相聚</p>
        <h3>一朵玫瑰，进入日常</h3>
        <p>从一杯温水，到点心与相聚，让玫瑰的色泽与花香自然融入不同的生活片刻。</p>
      </header>
      <div className="rose-product-scene-grid">
        {roseScenes.map((scene) => <article key={scene.title}>
          <figure><img src={scene.image} alt={scene.title} loading="lazy" decoding="async" /></figure>
          <h4>{scene.title}</h4>
          <p>{scene.description}</p>
        </article>)}
      </div>
    </section>

    <section className="rose-product-contact">
      <p>想了解冻干花的冲泡、规格与赠礼方式</p>
      <a className="text-action" href="#contact-wechat">了解产品详情 <ArrowRight size={17} /></a>
    </section>
  </div>;
}

function AgateGalleryModal({ product, activeIndex, onSelect, onClose, onShowWechat }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!product) return undefined;
    document.body.classList.add('no-scroll');
    closeButtonRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return <div className="agate-gallery-backdrop" onClick={onClose}>
    <section className="agate-gallery-modal" role="dialog" aria-modal="true" aria-labelledby="agate-gallery-title" onClick={(event) => event.stopPropagation()}>
      <button ref={closeButtonRef} className="agate-gallery-close" type="button" onClick={onClose} aria-label="关闭产品组图"><X /></button>
      <div className="agate-gallery-main">
        <img src={product.images[activeIndex]} alt={`${product.title}，第 ${activeIndex + 1} 张`} decoding="async" />
      </div>
      <div className="agate-gallery-details">
        <p>缠丝玛瑙 · 三图展示</p>
        <h2 id="agate-gallery-title">{product.title}</h2>
        <div className="agate-gallery-thumbs" aria-label={`${product.title}组图`}>
          {product.images.map((image, index) => <button
            aria-label={`查看第 ${index + 1} 张照片`}
            aria-pressed={activeIndex === index}
            className={activeIndex === index ? 'is-active' : ''}
            key={image}
            onClick={() => onSelect(index)}
            type="button"
          ><img src={image} alt="" loading="lazy" decoding="async" /></button>)}
        </div>
        <small>{String(activeIndex + 1).padStart(2, '0')} / 03</small>
        <a className="text-action agate-gallery-contact" href="#contact-wechat" onClick={onShowWechat}>
          微信联系方式 <ArrowRight size={17} />
        </a>
      </div>
    </section>
  </div>;
}

function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState('agate');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const galleryTriggerRef = useRef(null);

  useEffect(() => {
    const syncCategoryFromHash = () => {
      const match = window.location.hash.match(/^#products-(tea|agate|rose)$/);
      if (match) setActiveCategory(match[1]);
    };
    syncCategoryFromHash();
    window.addEventListener('hashchange', syncCategoryFromHash);
    return () => window.removeEventListener('hashchange', syncCategoryFromHash);
  }, []);

  const selectCategory = (category) => {
    setActiveCategory(category);
    window.history.replaceState(null, '', `#products-${category}`);
  };

  const openGallery = (product, trigger) => {
    galleryTriggerRef.current = trigger;
    setActiveImageIndex(product.coverIndex);
    setSelectedProduct(product);
  };

  const closeGallery = useCallback(() => {
    setSelectedProduct(null);
    window.requestAnimationFrame(() => galleryTriggerRef.current?.focus());
  }, []);

  const showWechatContact = useCallback((event) => {
    event.preventDefault();
    setSelectedProduct(null);
    window.requestAnimationFrame(() => {
      const contactCard = document.getElementById('contact-wechat');
      if (!contactCard) return;
      window.history.replaceState(null, '', '#contact-wechat');
      contactCard.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'center',
      });
    });
  }, []);

  return <section className="products section" id="products">
    <header className="section-heading reveal"><div><h2>产品中心</h2></div><p>不同门类采用适合内容本身的呈现方式，保留器物、文字与图像各自的呼吸。</p></header>
    <div className="product-category-tabs" role="tablist" aria-label="产品分类">
      {productCategories.map((category) => <button
        aria-controls={`product-panel-${category.id}`}
        aria-selected={activeCategory === category.id}
        className={activeCategory === category.id ? 'is-active' : ''}
        id={`products-${category.id}`}
        key={category.id}
        onClick={() => selectCategory(category.id)}
        role="tab"
        type="button"
      >{category.label}</button>)}
    </div>

    <div className="product-category-panel" id={`product-panel-${activeCategory}`} role="tabpanel" aria-labelledby={`products-${activeCategory}`}>
      {activeCategory === 'agate' && <>
        <div className="agate-intro"><p>每一件缠丝玛瑙，都以天然形成的纹理与色彩呈现自己的秩序。点击图片可查看三张组图。</p><span>共 {agateProducts.length} 件</span></div>
        <div className="agate-grid">{agateProducts.map((item) => <article className="agate-item" key={item.title}>
          <button className="agate-item-photo" type="button" onClick={(event) => openGallery(item, event.currentTarget)} aria-label={`查看${item.title}三张组图`}>
            <figure><img src={item.images[item.coverIndex]} alt={item.title} loading="lazy" decoding="async" /></figure>
            <span className="agate-item-hint">查看组图</span>
          </button>
          <div><h3>{item.title}</h3></div>
        </article>)}</div>
      </>}
      {activeCategory === 'tea' && <ProductFramework type="tea" />}
      {activeCategory === 'rose' && <RoseProductPage />}
    </div>
    {activeCategory !== 'rose' && <a className="text-action product-link" href="#contact-wechat">了解产品详情 <ArrowRight size={17} /></a>}
    <AgateGalleryModal product={selectedProduct} activeIndex={activeImageIndex} onSelect={setActiveImageIndex} onClose={closeGallery} onShowWechat={showWechatContact} />
  </section>;
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [bioOpen, setBioOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const menuToggleRef = useRef(null);
  const bioCloseButtonRef = useRef(null);
  const panelTriggerRef = useRef(null);

  const restorePanelFocus = () => {
    window.requestAnimationFrame(() => panelTriggerRef.current?.focus());
  };
  const closePanels = () => {
    setStoryOpen(false);
    setBioOpen(false);
    setContactOpen(false);
    restorePanelFocus();
  };
  const openBio = (event) => {
    panelTriggerRef.current = event.currentTarget;
    setBioOpen(true);
  };
  const openStory = (event) => {
    panelTriggerRef.current = event.currentTarget;
    setStoryOpen(true);
  };
  const openContact = (event) => {
    panelTriggerRef.current = event.currentTarget;
    setContactOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => menuToggleRef.current?.focus());
  };

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
    document.body.classList.toggle('no-scroll', menuOpen || storyOpen || bioOpen || contactOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen, storyOpen, bioOpen, contactOpen]);

  useEffect(() => {
    if (bioOpen) bioCloseButtonRef.current?.focus();
  }, [bioOpen]);

  useEffect(() => {
    if (!menuOpen && !storyOpen && !bioOpen && !contactOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      if (storyOpen || bioOpen || contactOpen) closePanels();
      else closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, storyOpen, bioOpen, contactOpen]);

  return <>
    <SiteHeader scrolled={scrolled} visible={navVisible || menuOpen} menuOpen={menuOpen} toggleRef={menuToggleRef} onToggle={() => menuOpen ? closeMenu() : setMenuOpen(true)} onOpenStory={openStory} onOpenBio={openBio} />
    <MenuOverlay open={menuOpen} onClose={closeMenu} onOpenStory={openStory} onOpenBio={openBio} />
    <main>
      <HeroCarousel onRevealNavigation={() => setNavVisible(true)} />

      <section className="story section" id="story">
        <div className="story-visual reveal">
          <figure><img src="assets/v2/village-water.webp" alt="港头村水岸与古建筑" loading="lazy" decoding="async" /></figure>
          <figure><img src="assets/v2/space-wide.webp" alt="茗香晓筑生活美学空间内景" loading="lazy" decoding="async" /></figure>
        </div>
        <div className="section-copy reveal">
          <h2>品牌故事</h2>
          <p className="lead">在古村里，安放一方生活美学空间。</p>
          <p className="brief">一座小院，以茶、花、器物与传统手作为媒介，让东方生活美学重新回到日常。</p>
          <button className="text-action" type="button" onClick={openStory}>了解茗香晓筑 <ArrowRight size={17} /></button>
        </div>
      </section>

      <section className="about" id="ziye">
        <div className="about-copy reveal">
          <h2>关于子夜老师</h2>
          <ul><li>茗香晓筑生活美学空间创始人</li><li>子夜的小院主理人</li><li>花艺师 · 茶艺师 · 评茶员</li><li>高级非遗技艺传承师</li><li>高级非遗文化讲师</li></ul>
          <button className="text-action" onClick={openBio}>认识子夜 <ArrowRight size={17} /></button>
        </div>
        <figure className="about-photo reveal"><img src="assets/v2/about/ziye-portrait-cleaned-20260828.webp" alt="子夜老师在茗香晓筑" loading="lazy" decoding="async" /></figure>
      </section>

      <section className="services section" id="services">
        <header className="section-heading reveal"><div><h2>服务项目</h2></div><p>在一盏茶、一枝花与一段安静的时间里，重新感受生活。</p></header>
        <div className="service-grid">{services.map((item, index) => <article className="service-item reveal" style={{ '--delay': `${index * 70}ms` }} key={item.title}><figure><img src={item.image} alt={item.title} loading="lazy" decoding="async" style={{ objectPosition: item.position }} /></figure><h3>{item.title}</h3></article>)}</div>
      </section>

      <ProductsSection />

      <section className="space section" id="space">
        <header className="section-heading reveal"><div><h2>空间场景</h2></div><p>港头村 · 茗香晓筑</p></header>
        <figure className="space-panorama reveal"><img src="assets/v2/village-sunset.webp" alt="夕阳下的港头村古巷" loading="lazy" decoding="async" /></figure>
        <div className="space-strip"><figure className="reveal"><img src="assets/v2/space-interior-20240508.webp" alt="茗香晓筑生活美学空间内景" loading="lazy" decoding="async" /></figure><figure className="reveal"><img src="assets/v2/space-wide.webp" alt="茗香晓筑茶空间" loading="lazy" decoding="async" /></figure><figure className="reveal"><img src="assets/v2/space-brick.webp" alt="茗香晓筑砖墙内景" loading="lazy" decoding="async" /></figure></div>
      </section>

      <section className="contacts section" id="contact">
        <header className="section-heading reveal"><div><h2>关于我们</h2></div><p>关注子夜的小院，了解雅集活动、空间日常与新品分享。</p></header>
          <div className="contact-grid contact-grid-primary">
            {contactChannels.slice(0, 3).map((channel, index) => (
              <ContactCard channel={channel} index={index} key={channel.id} />
            ))}
          </div>
          <div className="direct-contact">
            <header className="direct-contact-heading reveal">
              <h3>联系我们</h3>
            </header>
            <div className="contact-grid contact-grid-direct">
              <ContactCard channel={contactChannels[3]} index={3} />
            </div>
          </div>
      </section>

      <section className="closing" id="closing">
        <div className="closing-content">
          <div className="closing-mark"><img src="assets/v2/logo-red.png" alt="茗香晓筑生活美学空间" /></div>
          <p>凡是生活　皆可美学</p>
        </div>
        <a className="text-action closing-contact-link" href="#contact-wechat">预约到店或合作 <ArrowRight size={17} /></a>
      </section>
    </main>
    <footer className="footer">
      <p>茗香晓筑生活美学空间</p>
      <p>广州 · 花都 · 港头村</p>
      <p>子夜的小院</p>
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">粤ICP备2026125683号</a>
    </footer>

    <BrandStoryPanel open={storyOpen} onClose={closePanels} />
    <div className={`bio-panel ${bioOpen ? 'is-open' : ''}`} aria-hidden={!bioOpen} inert={!bioOpen}>
      <button ref={bioCloseButtonRef} className="panel-close" onClick={closePanels} aria-label="关闭人物介绍"><X /></button>
      <h2>子夜老师</h2>
      <div className="bio-text">
        <p>子夜，茗香晓筑生活美学空间创始人、子夜的小院主理人。她曾在老家陕西从事酒店管理近十五年，其中担任酒店总经理近五年。长期的管理与服务经历，让她对空间、细节和人的真实感受有着持续而具体的体会。</p>
        <p>从陕西到广州，再到苏州生活八年，城市与生活方式的变化没有磨灭她的梦想。她持续学习茶、花、器物与传统文化，先后走访武夷山、杭州、云南普洱、潮州、苏州、河南信阳等茶产区，并在北京、深圳、上海、苏州、广州参与近五十场布展活动。</p>
        <p>为了让审美不只停留在想象里，她多次前往景德镇了解陶瓷在茶器、花器中的应用，也参与过茶空间和美学空间的营造。2021年回到广州后，她在花都港头古村找到理想的落脚点；2022年国庆在村中举办个人插花展，随后筹建茗香晓筑，并于2023年10月正式开业。</p>
        <p>作为花艺师、茶艺师、评茶员，以及高级非遗技艺传承师、高级非遗文化讲师，子夜希望把多年积累转化为普通人可以亲近的生活体验。茗香晓筑既是她人生下半场的一次重新出发，也是一份长期实践：让传统文化在一盏茶、一枝花、一次手作和一次相聚中，重新回到今天的生活。</p>
      </div>
      <a className="text-action solid" href="#contact-wechat" onClick={() => setBioOpen(false)}>与子夜老师联系 <ArrowRight size={17} /></a>
    </div>
    <ContactPanel open={contactOpen} onClose={closePanels} />
    {(storyOpen || bioOpen || contactOpen) && <>
      <button className={`panel-backdrop ${storyOpen || bioOpen ? 'is-brand' : ''}`} aria-label="关闭面板" onClick={closePanels}>
        {storyOpen || bioOpen ? <span className="brand-backdrop-mark" aria-hidden="true"><img src="assets/v2/brand/mingxiang-seal-transparent.png" alt="" /></span> : null}
      </button>
    </>}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
