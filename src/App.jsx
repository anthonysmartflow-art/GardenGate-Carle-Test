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

const programs = [
  {
    name: 'Studio One',
    description:
      'The younger group, mostly two- and three-year-olds, builds relationships through play, studio materials, and time outdoors.',
  },
  {
    name: 'Studio Two',
    description:
      'Primarily four- and five-year-olds learn in a combined preschool and Kindergarten environment shaped by projects, collaboration, and investigation.',
  },
  {
    name: 'Kindergarten',
    description:
      'Part of the combined model, with individualized learning through inquiry, play, art, relationships, and the outdoors.',
  },
  {
    name: 'Summer',
    description:
      'Learning connected to nature, place, creative expression, storytelling, building, relationships, and reflection.',
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

function StudioNote({ label, children, status }) {
  return (
    <figcaption className="studio-note">
      <span className="studio-note__label">{label}</span>
      <p>{children}</p>
      {status ? <span className="studio-note__status">{status}</span> : null}
    </figcaption>
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
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus())
    }
  }

  useEffect(() => {
    if (!menuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.requestAnimationFrame(() => {
      menuPanelRef.current?.querySelector('button, a[href]')?.focus()
    })

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
      if (focusable.length === 0) return
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
    const media = window.matchMedia('(min-width: 1181px)')
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

  const closeOnNavigate = () => closeMenu(false)

  return (
    <header className="site-header">
      <div className="desktop-header">
        <nav className="utility-row" aria-label="Utility navigation">
          <div className="header-inner utility-row__inner">
            {utilityLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="main-row">
          <div className="header-inner main-row__inner">
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
                  <span aria-hidden="true">▾</span>
                </button>
                <div
                  className="nav-parent__menu"
                  id="about-submenu"
                  hidden={!aboutOpen}
                >
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
                Em Português
                <span aria-hidden="true" className="language-control__status">
                  Unavailable
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-header">
        <a className="wordmark-link" href="/" aria-label="Garden Gate home" aria-current="page">
          <Wordmark compact />
        </a>
        <a className="button button--donate button--mobile" href={DONATE_URL}>
          Donate
        </a>
        <button
          type="button"
          className="menu-trigger"
          ref={menuButtonRef}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </button>
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
              <span className="mobile-menu__title">Navigation</span>
              <button type="button" className="menu-close" onClick={() => closeMenu()}>
                Close
              </button>
            </div>

            <nav className="mobile-menu__primary" aria-label="Mobile primary navigation">
              {primaryLinks.map((link) => (
                <div className="mobile-menu__item" key={link.href}>
                  <a href={link.href} onClick={closeOnNavigate}>
                    {link.label}
                  </a>
                  {link.child ? (
                    <a
                      className="mobile-menu__child"
                      href={link.child.href}
                      onClick={closeOnNavigate}
                    >
                      {link.child.label}
                    </a>
                  ) : null}
                </div>
              ))}
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
                <a key={link.href} href={link.href} onClick={closeOnNavigate}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />

      <main id="main-content">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="context-line">Oak Bluffs, Massachusetts · nonprofit early education</p>
              <h1 id="hero-title">An early-learning community where children’s ideas take shape.</h1>
              <p className="hero-copy__intro">
                Garden Gate Child Development Center is a Reggio-inspired community where
                relationships, projects, materials, play, documentation, and time outdoors help
                children investigate and communicate.
              </p>
              <div className="action-row">
                <a className="button button--primary" href="/programs">
                  Explore Programs
                </a>
                <a className="text-action" href="/approach">
                  See Our Approach
                </a>
              </div>
            </div>

            <figure className="evidence-figure evidence-figure--hero">
              <img
                src="/images/asset-005-watercolor.jpg"
                alt="A child paints with watercolors beside jars of flowers and brushes."
              />
              <StudioNote label="Material study" status="Image date not established">
                Watercolor, brushes, and flowers keep the process—not a finished product—at the
                center of the first impression.
              </StudioNote>
            </figure>
          </div>
        </section>

        <section className="view-of-child section-shell" aria-labelledby="view-title">
          <div className="view-grid">
            <div className="view-statement">
              <p className="section-context">Mission and view of the child</p>
              <h2 id="view-title">Children are capable thinkers. Their ideas are worth listening to.</h2>
              <p>
                Garden Gate’s mission centers each child’s development and self-worth, creativity
                as a way to communicate and solve problems, fairness in relationship, and the
                ability to contribute to community.
              </p>
            </div>
            <figure className="evidence-figure evidence-figure--observation">
              <img
                src="/images/asset-254-observation.jpg"
                alt="A child draws while looking closely at a photographic reference."
              />
              <StudioNote label="Observation" status="Publication context needs review">
                Drawing from a reference makes sustained attention visible. The photographic
                source inside this image needs separate publication review.
              </StudioNote>
            </figure>
          </div>
        </section>

        <section className="programs section-shell" aria-labelledby="programs-title">
          <div className="programs-heading">
            <p className="section-context section-context--light">Programs at a glance</p>
            <h2 id="programs-title">Four ways into the same connected approach.</h2>
            <p>
              The homepage keeps the program set complete and comparable while leaving schedules,
              rates, capacity, and availability to verified program information.
            </p>
          </div>
          <dl className="program-list">
            {programs.map((program) => (
              <div className="program-row" key={program.name}>
                <dt>{program.name}</dt>
                <dd>{program.description}</dd>
              </div>
            ))}
          </dl>
          <a className="text-action text-action--light" href="/programs">
            Explore Programs
          </a>
        </section>

        <section className="approach section-shell" aria-labelledby="approach-title">
          <div className="approach-intro">
            <p className="section-context">The approach in action</p>
            <h2 id="approach-title">Learning is made visible through process.</h2>
            <p>
              Teachers observe and listen, document what they notice, reflect with one another,
              and prepare invitations that let children’s questions develop through projects over
              time.
            </p>
          </div>

          <figure className="evidence-figure evidence-figure--collaboration">
            <img
              src="/images/asset-253-collaboration.jpg"
              alt="Children work together with translucent colored tiles at a studio table."
            />
            <StudioNote label="Collaboration" status="Image date not established">
              Shared translucent materials create a reason to compare, negotiate, arrange, and
              revise ideas together.
            </StudioNote>
          </figure>

          <div className="approach-practices">
            <article>
              <h3>Observation and documentation</h3>
              <p>
                Listening includes words, gestures, behavior, art, play, and relationship.
                Documentation gives teachers and children something concrete to revisit.
              </p>
            </article>
            <article>
              <h3>Projects, materials, and art</h3>
              <p>
                Paint, clay, drawing, construction, natural materials, and found objects become
                languages for investigating and communicating—not decoration added after learning.
              </p>
            </article>
            <article>
              <h3>Play, relationships, and place</h3>
              <p>
                Play supports imagination, collaboration, negotiation, empathy, resilience, and
                problem-solving. Outdoor inquiry extends those relationships to weather, movement,
                living things, and familiar places.
              </p>
            </article>
          </div>

          <div className="material-studies">
            <figure className="evidence-figure evidence-figure--material evidence-figure--paint">
              <img
                src="/images/asset-006-painting.jpg"
                alt="A child paints at a studio table surrounded by brushes and color."
              />
              <StudioNote label="Project process" status="Image date not established">
                Tools stay visible and within reach, making choices and revisions part of the
                evidence.
              </StudioNote>
            </figure>
            <figure className="evidence-figure evidence-figure--material evidence-figure--clay">
              <img
                src="/images/asset-007-clay.jpg"
                alt="Hands shape clay around a small wheeled construction beside studio tools."
              />
              <StudioNote label="Material investigation" status="Image date not established">
                Clay, tools, and construction show three-dimensional problem-solving in progress.
              </StudioNote>
            </figure>
          </div>

          <a className="text-action approach__action" href="/approach">
            See Our Approach
          </a>
        </section>

        <section className="belonging section-shell" aria-labelledby="belonging-title">
          <div className="belonging-grid">
            <div className="belonging-copy">
              <p className="section-context">Belonging and family partnership</p>
              <h2 id="belonging-title">Belonging is practiced in daily relationships.</h2>
              <p>
                Inclusive materials, anti-bias learning, family voice, daily communication, and
                connection to outside resources help link children’s experience at Garden Gate
                with the people and communities around them.
              </p>
              <p>
                The homepage holds this commitment at overview level without promising unverified
                services, tuition support, language capacity, or outcomes.
              </p>
            </div>
            <figure className="evidence-figure evidence-figure--belonging">
              <img
                src="/images/asset-264-place.jpg"
                alt="Children read and draw together on a deck overlooking the Featherstone campus."
              />
              <StudioNote label="Relationship + place" status="Image date not established">
                Shared reading and drawing on the deck connect conversation, attention, and the
                campus environment.
              </StudioNote>
            </figure>
          </div>
        </section>

        <section className="place section-shell" aria-labelledby="place-title">
          <figure className="evidence-figure evidence-figure--place">
            <img
              src="/images/asset-129-meadow.jpg"
              alt="Children walk through a sunlit meadow during an outdoor learning experience."
            />
            <StudioNote label="Archived evidence" status="October 2023 newsletter archive">
              A meadow walk shows place as part of inquiry. The dated image is evidence of a
              documented moment, not a promise of current schedule or frequency.
            </StudioNote>
          </figure>

          <div className="place-copy">
            <p className="section-context">Featherstone campus and trust</p>
            <h2 id="place-title">Grounded in a place with room to observe.</h2>
            <p>
              Garden Gate is located at 30 Featherstone Lane on the Featherstone Center for the
              Arts campus in Oak Bluffs. Campus open space and nearby trails support movement,
              observation, inquiry, and connection to place.
            </p>
            <div className="trust-facts" aria-label="Garden Gate trust facts">
              <div>
                <span className="trust-facts__value">1999</span>
                <span className="trust-facts__label">Founded</span>
              </div>
              <div>
                <span className="trust-facts__value">Nonprofit</span>
                <span className="trust-facts__label">Early education organization</span>
              </div>
              <div>
                <span className="trust-facts__value">Oak Bluffs</span>
                <span className="trust-facts__label">Featherstone campus location</span>
              </div>
            </div>
            <div className="inline-links">
              <a className="text-action" href="/about">
                About Garden Gate
              </a>
              <a className="text-action" href="/about/people">
                Meet Our People
              </a>
            </div>
          </div>
        </section>

        <section className="news section-shell" aria-labelledby="news-title">
          <div className="news-heading">
            <p className="section-context">News &amp; Resources</p>
            <h2 id="news-title">Dated records keep the evidence honest.</h2>
            <p>
              These saved first-party examples show recent project, material, relationship, and
              outdoor-learning themes without presenting a dated record as an evergreen promise.
            </p>
          </div>
          <div className="news-list">
            {newsItems.map((item) => (
              <article className="news-row" key={item.datetime}>
                <time dateTime={item.datetime}>{item.date}</time>
                <h3>{item.title}</h3>
                <p>{item.context}</p>
              </article>
            ))}
          </div>
          <a className="text-action" href="/news">
            View News &amp; Resources
          </a>
        </section>

        <section className="enrollment section-shell" aria-labelledby="enrollment-title">
          <div>
            <p className="section-context section-context--light">Enrollment bridge</p>
            <h2 id="enrollment-title">Consider the fit. Then take the next step.</h2>
          </div>
          <div className="enrollment-copy">
            <p>
              After exploring the programs and approach, review Garden Gate’s current enrollment
              process. This prototype does not promise openings, acceptance, timing, or form
              behavior.
            </p>
            <a className="button button--light" href="/enrollment">
              Begin Enrollment
            </a>
          </div>
        </section>

        <section className="support section-shell" aria-labelledby="support-title">
          <div className="support-copy">
            <p className="section-context">Support Garden Gate</p>
            <h2 id="support-title">Support the conditions that let learning unfold.</h2>
            <p>
              Contributed support can strengthen learning environments, arts and materials,
              educator development, access and belonging work, and community connection.
            </p>
          </div>
          <div className="support-actions">
            <a className="button button--donate" href={DONATE_URL}>
              Donate
            </a>
            <a className="text-action" href="/support">
              Why Support Matters
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-identity">
            <a className="wordmark-link wordmark-link--footer" href="/" aria-label="Garden Gate home">
              <Wordmark />
            </a>
            <p>Nonprofit, Reggio-inspired early education in Oak Bluffs, Massachusetts.</p>
          </div>

          <nav className="footer-group" aria-labelledby="footer-explore">
            <h2 id="footer-explore">Explore</h2>
            <a href="/">Home</a>
            <a href="/programs">Programs</a>
            <a href="/approach">Our Approach</a>
            <a href="/about">About Garden Gate</a>
            <a href="/about/people">People</a>
          </nav>

          <nav className="footer-group" aria-labelledby="footer-families">
            <h2 id="footer-families">Families</h2>
            <a href="/enrollment">Enrollment</a>
            <a href="/families">Current Families</a>
            <a href="/news">News &amp; Resources</a>
          </nav>

          <nav className="footer-group" aria-labelledby="footer-connect">
            <h2 id="footer-connect">Connect</h2>
            <a href="/professional-development">Professional Development</a>
            <a href="/employment">Employment</a>
            <a href="/support">Support</a>
            <a href="/contact">Contact</a>
            <a href={DONATE_URL}>Donate</a>
          </nav>

          <nav className="footer-group" aria-labelledby="footer-policies">
            <h2 id="footer-policies">Policies</h2>
            <a href="/privacy">Privacy</a>
            <a href="/accessibility">Accessibility</a>
          </nav>

          <div className="footer-contact">
            <h2>Contact</h2>
            <address>
              <span>30 Featherstone Lane</span>
              <span>Oak Bluffs, MA 02557</span>
              <span>Mail: PO Box 2666, Vineyard Haven, MA 02568</span>
            </address>
            <a href="tel:+17745632435">(774) 563-2435</a>
            <a href="mailto:gardengatecdc@hotmail.com">gardengatecdc@hotmail.com</a>
            <div className="footer-social">
              <a href="https://www.facebook.com/GardenGateCDC/">Facebook</a>
              <a href="https://www.instagram.com/gardengatecdc/">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Garden Gate Child Development Center</span>
          <span>Unapproved Stage 7 comparison prototype</span>
        </div>
      </footer>
    </>
  )
}

export default App
