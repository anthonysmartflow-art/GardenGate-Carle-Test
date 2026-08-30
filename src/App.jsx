import { useEffect, useRef, useState } from 'react'

const DONATE_URL = 'https://www.gardengatemv.org/donate'

const utilityLinks = [
  { label: 'Current Families', href: '/families' },
  { label: 'For Educators', href: '/professional-development' },
  { label: 'Employment', href: '/employment' },
  { label: 'Support', href: '/support' },
  { label: 'Contact', href: '/contact' },
]

const primaryLinks = [
  { label: 'Programs', href: '/programs' },
  { label: 'Our Approach', href: '/approach' },
  { label: 'About', href: '/about', child: { label: 'People', href: '/about/people' } },
  { label: 'News & Resources', href: '/news' },
  { label: 'Enrollment', href: '/enrollment' },
]

const practices = [
  {
    label: 'Observation & documentation',
    title: 'Ideas become visible',
    copy: 'Teachers listen, observe, document, reflect, and prepare invitations that extend children’s questions.',
    image: '/images/asset-254-observation.jpg',
    alt: 'A child draws on white paper while looking toward a photographic reference.',
    className: 'practice-card--observation',
  },
  {
    label: 'Projects, materials & art',
    title: 'Questions develop over time',
    copy: 'Paint, clay, drawing, construction, natural materials, and found objects help children investigate and communicate.',
    image: '/images/asset-006-painting.jpg',
    alt: 'A child uses a brush to mix bright paint on paper beside small containers of color.',
    className: 'practice-card--painting',
  },
  {
    label: 'Play, relationships & place',
    title: 'Learning is connected',
    copy: 'Play and time outdoors support collaboration, negotiation, empathy, problem-solving, and connection to place.',
    image: '/images/asset-003-outdoor.jpg',
    alt: 'Children climb and balance together on the low branches of a large tree.',
    className: 'practice-card--outdoor',
  },
]

const programs = [
  {
    name: 'Studio One',
    label: 'Younger group',
    copy: 'Mostly two- and three-year-olds build relationships through play, studio materials, and time outdoors.',
    image: '/images/asset-201-construction.jpg',
    alt: 'Two children arrange wooden blocks and cardboard tubes in a classroom construction.',
    className: 'program-card--studio-one',
  },
  {
    name: 'Kindergarten',
    label: 'Combined model',
    copy: 'Part of the combined preschool and Kindergarten environment, with individualized learning through inquiry, play, art, and relationships.',
    image: '/images/asset-264-place.jpg',
    alt: 'Two children draw and look at books together on a striped mat on a wooden deck.',
    className: 'program-card--kindergarten',
  },
  {
    name: 'Summer',
    label: 'Nature & creative expression',
    copy: 'Learning connects nature, place, storytelling, building, creative expression, relationships, and reflection.',
    image: '/images/asset-129-meadow.jpg',
    alt: 'Children and an educator walk through tall meadow grasses in a wooded landscape.',
    className: 'program-card--summer',
  },
]

const materials = [
  {
    name: 'Watercolor & natural materials',
    image: '/images/asset-005-watercolor.jpg',
    alt: 'Watercolor pans, brushes, flowers, and a child’s hand surround a painting in progress.',
    className: 'material-item--watercolor',
  },
  {
    name: 'Clay & tools',
    image: '/images/asset-007-clay.jpg',
    alt: 'Hands use a small cutting wheel beside clay, tools, and a constructed vehicle.',
    className: 'material-item--clay',
  },
  {
    name: 'Paint as process',
    image: '/images/asset-149-paint.jpg',
    alt: 'Paint-covered hands and a brush move wet gray-blue paint across a large surface.',
    className: 'material-item--paint',
  },
  {
    name: 'Light & geometry',
    image: '/images/asset-203-translucent.jpg',
    alt: 'A construction of translucent colored geometric tiles glows on a light table.',
    className: 'material-item--light',
  },
  {
    name: 'Collecting & comparing',
    image: '/images/asset-165-investigation.jpg',
    alt: 'A child reaches toward transparent containers holding small materials for investigation.',
    className: 'material-item--collection',
  },
]

const newsItems = [
  {
    date: 'May 15, 2026',
    datetime: '2026-05-15',
    title: 'Re-launching Project Work: Going Deeper',
    context: 'Dated first-party newsletter',
  },
  {
    date: 'July 22, 2026',
    datetime: '2026-07-22',
    title: 'Growing Relationships with Nature',
    context: 'Dated first-party summer newsletter',
  },
  {
    date: 'August 12, 2026',
    datetime: '2026-08-12',
    title: 'Building Bigger Ideas Together',
    context: 'Dated first-party summer newsletter',
  },
]

function Wordmark({ compact = false }) {
  return (
    <span className={`wordmark${compact ? ' wordmark--compact' : ''}`}>
      <span className="wordmark__name">Garden Gate</span>
      <span className="wordmark__descriptor">Child Development Center</span>
    </span>
  )
}

function ArrowLink({ href, children, light = false, className = '' }) {
  return (
    <a className={`arrow-link${light ? ' arrow-link--light' : ''} ${className}`.trim()} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </a>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const menuPanelRef = useRef(null)
  const aboutRef = useRef(null)

  const closeMenu = (restoreFocus = true) => {
    setMenuOpen(false)
    if (restoreFocus) window.requestAnimationFrame(() => menuButtonRef.current?.focus())
  }

  useEffect(() => {
    if (!menuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.requestAnimationFrame(() => menuPanelRef.current?.querySelector('button, a[href]')?.focus())

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }

      if (event.key !== 'Tab' || !menuPanelRef.current) return
      const focusable = [
        ...menuPanelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const onRouteChange = () => closeMenu(false)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('popstate', onRouteChange)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('popstate', onRouteChange)
    }
  }, [menuOpen])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1121px)')
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const onPointerDown = (event) => {
      if (aboutOpen && !aboutRef.current?.contains(event.target)) setAboutOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setAboutOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [aboutOpen])

  return (
    <header className="site-header">
      <div className="desktop-header">
        <nav className="utility-nav" aria-label="Utility navigation">
          <div className="header-frame utility-nav__inner">
            {utilityLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="main-nav-row">
          <div className="header-frame main-nav-row__inner">
            <a className="wordmark-link" href="/" aria-label="Garden Gate home" aria-current="page">
              <Wordmark />
            </a>

            <nav className="primary-nav" aria-label="Primary navigation">
              <a href="/programs">Programs</a>
              <a href="/approach">Our Approach</a>
              <div className="nav-parent" ref={aboutRef}>
                <a href="/about">About</a>
                <button
                  type="button"
                  className="nav-parent__toggle"
                  aria-expanded={aboutOpen}
                  aria-controls="about-submenu"
                  aria-label="Show People under About"
                  onClick={() => setAboutOpen((current) => !current)}
                >
                  <span aria-hidden="true">⌄</span>
                </button>
                <div className="nav-parent__menu" id="about-submenu" hidden={!aboutOpen}>
                  <a href="/about/people" onClick={() => setAboutOpen(false)}>
                    People
                  </a>
                </div>
              </div>
              <a href="/news">News &amp; Resources</a>
              <a href="/enrollment">Enrollment</a>
            </nav>

            <div className="main-actions">
              <a className="button button--donate button--header" href={DONATE_URL}>
                Donate
              </a>
              <button
                className="language-control"
                type="button"
                disabled
                aria-label="Em Português, currently unavailable"
                title="Portuguese content is not currently available"
              >
                <span>Em Português</span>
                <span aria-hidden="true" className="language-control__status">Unavailable</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-header">
        <button
          type="button"
          className="menu-trigger"
          ref={menuButtonRef}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="menu-trigger__bars" aria-hidden="true"><span /><span /><span /></span>
          <span>Menu</span>
        </button>
        <a className="wordmark-link wordmark-link--mobile" href="/" aria-label="Garden Gate home" aria-current="page">
          <Wordmark compact />
        </a>
        <a className="button button--donate button--mobile" href={DONATE_URL}>Donate</a>
      </div>

      {menuOpen ? (
        <div className="mobile-menu-shell">
          <button
            className="mobile-menu-backdrop"
            type="button"
            aria-label="Close navigation menu"
            onClick={() => closeMenu()}
          />
          <div
            className="mobile-menu"
            id="mobile-menu"
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="mobile-menu__top">
              <Wordmark compact />
              <button type="button" className="menu-close" onClick={() => closeMenu()}>Close</button>
            </div>

            <nav className="mobile-menu__primary" aria-label="Mobile primary navigation">
              {primaryLinks.map((link) => (
                <div className="mobile-menu__item" key={link.href}>
                  <a href={link.href} onClick={() => closeMenu(false)}>{link.label}</a>
                  {link.child ? (
                    <a className="mobile-menu__child" href={link.child.href} onClick={() => closeMenu(false)}>
                      {link.child.label}
                    </a>
                  ) : null}
                </div>
              ))}
              <div className="mobile-menu__item mobile-menu__item--donate">
                <a href={DONATE_URL} onClick={() => closeMenu(false)}>Donate</a>
              </div>
              <button
                className="mobile-language-control"
                type="button"
                disabled
                aria-label="Em Português, currently unavailable"
              >
                <span>Em Português</span>
                <span>Unavailable</span>
              </button>
            </nav>

            <nav className="mobile-menu__utility" aria-label="Mobile utility navigation">
              {utilityLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => closeMenu(false)}>{link.label}</a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  )
}

function SectionHeading({ id, title, action, href }) {
  return (
    <div className="section-heading">
      <h2 id={id}>{title}</h2>
      {action && href ? <ArrowLink href={href}>{action}</ArrowLink> : null}
    </div>
  )
}

function FooterGroup({ title, links }) {
  return (
    <nav className="footer-group" aria-label={`${title} footer navigation`}>
      <h2>{title}</h2>
      {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
    </nav>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-frame footer-grid">
        <div className="footer-identity">
          <a className="wordmark-link wordmark-link--footer" href="/" aria-label="Garden Gate home">
            <Wordmark />
          </a>
          <p>Nonprofit early education in Oak Bluffs, Massachusetts.</p>
        </div>

        <FooterGroup title="Explore" links={[
          { label: 'Home', href: '/' },
          { label: 'Programs', href: '/programs' },
          { label: 'Our Approach', href: '/approach' },
          { label: 'About', href: '/about' },
          { label: 'People', href: '/about/people' },
        ]} />
        <FooterGroup title="Families" links={[
          { label: 'Enrollment', href: '/enrollment' },
          { label: 'Current Families', href: '/families' },
          { label: 'News & Resources', href: '/news' },
        ]} />
        <FooterGroup title="Connect" links={[
          { label: 'For Educators', href: '/professional-development' },
          { label: 'Employment', href: '/employment' },
          { label: 'Support', href: '/support' },
          { label: 'Contact', href: '/contact' },
          { label: 'Donate', href: DONATE_URL },
        ]} />
        <FooterGroup title="Policies" links={[
          { label: 'Privacy', href: '/privacy' },
          { label: 'Accessibility', href: '/accessibility' },
        ]} />

        <div className="footer-contact">
          <h2>Contact</h2>
          <address>
            <span>30 Featherstone Lane</span>
            <span>Oak Bluffs, MA 02557</span>
            <span className="footer-contact__mailing">Mail: PO Box 2666, Vineyard Haven, MA 02568</span>
          </address>
          <a href="tel:+17745632435">(774) 563-2435</a>
          <a href="mailto:gardengatecdc@hotmail.com">gardengatecdc@hotmail.com</a>
          <div className="footer-social">
            <a href="https://www.facebook.com/GardenGateCDC/">Facebook</a>
            <a href="https://www.instagram.com/gardengatecdc/">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-frame footer-bottom">
        <span>Garden Gate Child Development Center</span>
        <span>Unapproved Stage 7 comparison prototype</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />

      <main id="main-content">
        <section className="hero-section" aria-labelledby="home-title">
          <div className="outer-frame hero-frame">
            <img
              className="hero-image"
              src="/images/asset-237-clay-collaboration.jpg"
              alt="Children gather around a table to work with clay, small animal figures, and wooden tools."
            />
            <div className="hero-transition">
              <div className="hero-information">
                <p className="micro-label">Garden Gate Child Development Center · Oak Bluffs</p>
                <h1 id="home-title">A nonprofit early-learning community where children’s ideas matter.</h1>
                <p>Reggio-inspired learning through relationships, projects, materials, play, documentation, and time outdoors.</p>
              </div>
              <a className="hero-action" href="/programs">
                <span className="hero-action__label">Explore Programs</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="welcome-section" aria-labelledby="welcome-title">
          <div className="content-frame welcome-inner">
            <p className="museum-label">Welcome to Garden Gate</p>
            <article className="orientation-card">
              <p className="micro-label">For prospective families</p>
              <h2 id="welcome-title">Children are capable thinkers. Their ideas are worth listening to.</h2>
              <p>Garden Gate supports each child’s development and self-worth through creativity, fairness, authentic experiences, relationships, and community.</p>
              <div className="orientation-card__actions">
                <a className="button button--primary" href="/programs">Explore Programs</a>
                <ArrowLink href="/approach">See Our Approach</ArrowLink>
              </div>
            </article>
          </div>
        </section>

        <section className="approach-section content-frame" aria-labelledby="approach-section-title">
          <SectionHeading id="approach-section-title" title="Learning Through Materials & Relationships" action="See Our Approach" href="/approach" />

          <article className="approach-feature">
            <img
              src="/images/asset-253-collaboration.jpg"
              alt="Children and an educator arrange translucent colored tiles together across a table."
            />
            <div className="approach-feature__copy">
              <p className="micro-label">The approach in action</p>
              <h3>Learning is made visible through process.</h3>
              <p>Teachers observe and listen, projects give ideas time to develop, and materials offer children many ways to investigate and communicate.</p>
              <p>Play, relationships, documentation, belonging, and outdoor inquiry are connected parts of the same Reggio-inspired approach.</p>
            </div>
          </article>

          <div className="practice-grid">
            {practices.map((practice) => (
              <article className={`practice-card ${practice.className}`} key={practice.title}>
                <img src={practice.image} alt={practice.alt} />
                <p className="card-label">{practice.label}</p>
                <h3>{practice.title}</h3>
                <p>{practice.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="promo-band promo-band--approach" aria-label="Our Approach action">
          <div className="content-frame promo-band__inner">
            <p>See how observation, projects, materials, play, relationships, belonging, and outdoor inquiry work together.</p>
            <a className="button button--outline-light" href="/approach">See Our Approach</a>
          </div>
        </section>

        <section className="programs-section content-frame" aria-labelledby="programs-section-title">
          <SectionHeading id="programs-section-title" title="Programs at Garden Gate" action="Explore Programs" href="/programs" />

          <article className="program-feature">
            <div className="program-feature__copy">
              <p className="card-label">Primarily four- and five-year-olds</p>
              <h3>Studio Two</h3>
              <p>A combined preschool and Kindergarten environment shaped by projects, collaboration, investigation, relationships, and creative materials.</p>
              <ArrowLink href="/programs">Compare all programs</ArrowLink>
            </div>
            <img
              src="/images/asset-235-group-making.jpg"
              alt="Children work across shared tables with drawing tools and constructed materials in a classroom studio."
            />
          </article>

          <div className="program-grid">
            {programs.map((program) => (
              <article className={`program-card ${program.className}`} key={program.name}>
                <img src={program.image} alt={program.alt} />
                <p className="card-label">{program.label}</p>
                <h3>{program.name}</h3>
                <p>{program.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="promo-band promo-band--enrollment" aria-labelledby="enrollment-title">
          <div className="content-frame promo-band__inner">
            <div>
              <p className="micro-label micro-label--light">Enrollment</p>
              <h2 id="enrollment-title">Consider the fit. Then take the next step.</h2>
            </div>
            <div className="promo-band__action-copy">
              <p>After exploring the programs and approach, review Garden Gate’s current enrollment process.</p>
              <a className="button button--light" href="/enrollment">Begin Enrollment</a>
            </div>
          </div>
        </section>

        <section className="materials-section content-frame" aria-labelledby="materials-title">
          <SectionHeading id="materials-title" title="Materials, Projects & Documentation" />
          <p className="materials-intro">A small display of authentic Garden Gate process: not products, exhibitions, or finished work for sale.</p>
          <div className="material-display">
            {materials.map((material) => (
              <figure className={`material-item ${material.className}`} key={material.name}>
                <img src={material.image} alt={material.alt} />
                <figcaption>{material.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="place-news-section content-frame" aria-labelledby="place-news-title">
          <SectionHeading id="place-news-title" title="Place, Trust & Current Records" action="View News & Resources" href="/news" />

          <article className="place-feature">
            <img
              src="/images/asset-009-place.jpg"
              alt="A small Garden Gate learning building and fenced outdoor area surrounded by mature trees."
            />
            <div className="place-feature__copy">
              <p className="micro-label">Oak Bluffs, Massachusetts</p>
              <h3>Located on the Featherstone Center for the Arts campus.</h3>
              <p>Garden Gate was founded in 1999 and is a 501(c)(3) nonprofit. Its setting supports studio learning, outdoor inquiry, relationships, and connection to place.</p>
              <div className="trust-line" aria-label="Supported Garden Gate trust facts">
                <span><strong>1999</strong> Founded</span>
                <span><strong>Nonprofit</strong> Tax-exempt organization</span>
                <span><strong>Oak Bluffs</strong> Featherstone campus location</span>
              </div>
            </div>
          </article>

          <div className="news-heading-row">
            <div>
              <p className="micro-label">News &amp; Resources</p>
              <h2 id="news-title">Dated records keep the evidence honest.</h2>
            </div>
            <p>These recent first-party examples show project work, relationships, and outdoor learning without presenting a dated record as an evergreen promise.</p>
          </div>

          <div className="news-list">
            {newsItems.map((item) => (
              <article className="news-item" key={item.datetime}>
                <time dateTime={item.datetime}>{item.date}</time>
                <h3>{item.title}</h3>
                <p>{item.context}</p>
              </article>
            ))}
          </div>
          <ArrowLink href="/news">View News & Resources</ArrowLink>
        </section>

        <section className="support-band" aria-labelledby="support-title">
          <div className="content-frame support-band__inner">
            <div>
              <p className="micro-label micro-label--light">Support Garden Gate</p>
              <h2 id="support-title">Support the conditions that let learning unfold.</h2>
              <p>Contributed support can strengthen learning environments, arts and materials, educator development, access and belonging work, and community connection.</p>
            </div>
            <div className="support-band__actions">
              <a className="button button--light" href={DONATE_URL}>Donate</a>
              <ArrowLink href="/support" light>Why Support Matters</ArrowLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
