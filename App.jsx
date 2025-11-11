import { useState } from "react";
import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import "./brand.css";
import "./components.css";

const router = createBrowserRouter([
  { path: "/", element: <Shell />, children: [
    { index: true, element: <Home /> },
    { path: "city/:slug", element: <City /> },
    { path: "menus", element: <MenuPage /> },
    { path: "gallery", element: <GalleryPage /> },
    { path: "contact", element: <ContactPage /> },
    { path: "book-event", element: <BookEventPage /> },
  ]},
]);

export default function App(){ return <RouterProvider router={router} /> }

function Shell(){
  return (
    <>
      <nav className="nav">
        <div className="container nav__inner">
          <Link className="nav__brand" to="/">
            <img
              src="/logo.png"
              alt="Boxcar Social"
              className="nav__brand-logo"
            />
          </Link>
          <div className="nav__links">
            <Link data-cursor="view-more" to="/">Home</Link>
            <Link data-cursor="view-more" to="/menus">Menus</Link>
            <Link data-cursor="view-more" to="/gallery">Gallery</Link>
            <Link data-cursor="view-more" to="/contact">Contact</Link>
            <Link data-cursor="view-more" to="/book-event">Book an Event</Link>
          </div>
        </div>
      </nav>
      <Outlet />
      <footer className="footer">
        <div className="container">© Placeholder 2025 · Built for demo</div>
      </footer>
    </>
  );
}

/* ---------- Home ---------- */
function Home(){
  return (
    <>
      <HeroVideo />
      <Section overline="Events" title="What’s On?" bgWord="Events" className="section--events">
        <EventGrid />
      </Section>
      <SocialEmbed />
      <LocationMap />
    </>
  );
}

/* ---------- City page ---------- */
function City(){
  return (
    <>
      <HeroVideo
        cityPoster="/placeholder-21x9.jpg"
        overline="Visit Our Cities"
        heading="City Name, ST"
        sub="Traditional ideas, contemporary execution."
        videoSrc={null}
      />
      <Section
        overline="Opening Times"
        title="The Taproom & The Parlor"
        tight
        bgWord="Taproom"
      >
        <div className="hours">
          <div><strong>The Parlor</strong><br/>Tue–Sat 5pm–1am · Sun 4pm–12am</div>
          <div><strong>The Taproom</strong><br/>Sun–Thu 11am–2am · Fri–Sat 11am–3am</div>
        </div>
      </Section>

      <Section
        overline="Menus"
        title="Food, Cocktails, Beer & Wine"
        tight
        bgWord="Menus"
      >
        <div className="grid cards">
          <Card title="Downstairs | Taproom Menu" img="/placeholder-16x9.jpg"
            actions={<a className="btn" data-cursor="view-more" href="#">View Menu</a>} />
          <Card title="Upstairs | Parlor Menu" img="/placeholder-16x9.jpg"
            actions={<a className="btn" data-cursor="view-more" href="#">View Menu</a>} />
        </div>
      </Section>

      <Section overline="Events" title="What’s On?" bgWord="Events" className="section--events">
        <EventGrid />
      </Section>

      <CTA title="Book an Event Space"
           primary={{label:"Book an Event", href:"#"}}
           secondary={{label:"Get Directions", href:"#"}} />
    </>
  );
}

/* ---------- Building blocks ---------- */
function HeroVideo({
  cityPoster="/placeholder-21x9.jpg",
  overline="YOUR NEW FAVORITE SPORTS BAR",
  heading="OFF THE RAILS. ON THE ROCKS.",
  sub="More than just a bar; we're excited to provide a community space for all watch parties, social gatherings, special events, and more!",
  videoSrc="/hero-video.mp4",
}){
  return (
    <section className={`hero ${videoSrc ? "" : "hero--static"}`}>
      {videoSrc ? (
        <>
          <video
            className="hero__video"
            playsInline
            muted
            loop
            autoPlay
            poster={cityPoster}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="hero__overlay" aria-hidden="true" />
        </>
      ) : (
        <div className="hero__static" aria-hidden="true" />
      )}
      <div className="hero__logo" aria-hidden="true">
        <img src="/logo.png" alt="" />
      </div>
      <div className="container hero__content">
        <motion.div className="hero__text"
          initial={{opacity:0, y:10}}
          animate={{opacity:1, y:0}}
          transition={{duration:.6, ease:"easeOut"}}
        >
          {overline && <div className="overline">{overline}</div>}
          {heading && <h1 className="hero__title">{heading}</h1>}
          {sub && <p className="hero__sub">{sub}</p>}
        </motion.div>
      </div>
    </section>
  );
}

function Section({overline, title, children, tight, bgWord, className=""}){
  const backgroundWord = bgWord || title;
  return (
    <section className={`section ${tight?"section--tight":""} ${className}`.trim()}>
      {backgroundWord && <span className="bg-word" aria-hidden="true">{backgroundWord}</span>}
      <div className="container">
        <motion.div initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}}
          viewport={{once:true, amount:.25}} transition={{duration:.45, ease:"easeOut"}}>
          {overline && <div className="overline">{overline}</div>}
          {title && <h2 style={{marginBottom:24}}>{title}</h2>}
        </motion.div>
        <Stagger>{children}</Stagger>
      </div>
    </section>
  );
}

function Stagger({children}){
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{once:true, amount:.2}}
      variants={{hidden:{}, show:{transition:{staggerChildren:.04}}}}>
      {Array.isArray(children)? children.map((c,i)=>(
        <motion.div key={i} variants={{hidden:{opacity:0, y:12}, show:{opacity:1, y:0}}} transition={{duration:.4}}>{c}</motion.div>
      )): children}
    </motion.div>
  );
}

function Card({title,img,actions,i}){
  return (
    <motion.article className="card"
      data-cursor="view-more"
      whileHover={{scale:1.02}} transition={{type:"spring", stiffness:300, damping:20}}>
      <div className="card__media" style={{backgroundImage:`url(${img})`}} />
      <div className="card__body">
        <div className="card__title">{title}</div>
        <p style={{color:"var(--cream-300)"}}>Placeholder description for this module.</p>
        <div style={{display:"flex", gap:12, marginTop:8}}>{actions}</div>
      </div>
    </motion.article>
  );
}

function EventGrid(){
  const sample = Array.from({length:4},(_,i)=>({
    title:`Event Title ${i+1}`,
    date:`Nov ${10+i}, 7:00 PM`,
  }));
  return (
    <div className="grid cards">
      {sample.map((e,i)=>(
        <Card key={i} title={`${e.title}`} img="/placeholder-16x9.jpg"
          actions={<button className="btn btn--ghost" data-cursor="view-more">Details</button>} />
      ))}
    </div>
  );
}

function CTA({title, primary, secondary}){
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="card" data-cursor="view-more"
          style={{display:"flex", alignItems:"center", gap:16, padding:24}}>
          <h3 style={{margin:0, flex:1}}>{title}</h3>
          {secondary && <a className="btn btn--ghost" data-cursor="view-more" href={secondary.href}>{secondary.label}</a>}
          {primary && <a className="btn" data-cursor="view-more" href={primary.href}>{primary.label}</a>}
        </div>
      </div>
    </section>
  );
}

function LocationMap(){
  const [mapActive, setMapActive] = useState(false);
  return (
    <section className="section section--tight section--location">
      <span className="bg-word" aria-hidden="true">Location</span>
      <div className="container location-container" style={{textAlign:"center"}}>
        <div className="location-content">
          <div className="overline">Visit Us</div>
          <h3 style={{marginBottom:16}}>Boxcar Social · 216 N Edward Gary St, San Marcos, TX</h3>
          <div className={`map-frame ${mapActive?"is-active":""}`}
            onClick={()=>setMapActive(true)}
            onMouseLeave={()=>setMapActive(false)}
          >
            {!mapActive && <div className="map-frame__overlay">Click to explore map</div>}
            <iframe
              title="Boxcar Social Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.4066735209744!2d-97.9415932244525!3d29.881380575006055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865ca9eb3a6a47e3%3A0x5b759eaee43abee8!2sBoxcar%20Social%20SMTX!5e0!3m2!1sen!2sus!4v1762725442005!5m2!1sen!2sus"
              width="100%"
              height="420"
              style={{border:0}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={mapActive?"is-live":""}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialEmbed(){
  return (
    <Section tight overline="Social" title="From The Feed" bgWord="Social">
      <div className="embed-frame">
        <iframe
          title="Instagram Feed"
          src="https://emb.fouita.com/widget/0x343ff5/ftu6rc3b1"
          width="100%"
          height="500"
          frameBorder="0"
          loading="lazy"
        />
      </div>
    </Section>
  );
}

function slugify(s){ return s.toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""); }

function ContactPage(){
  return (
    <>
      <HeroVideo
        overline="Get In Touch"
        heading="We’re here for every question"
        sub="Reach out about reservations, events, or anything else."
        videoSrc={null}
      />
      <Section tight title="Contact Us" overline="Say Hello" bgWord="Contact" className="section--contact">
        <div className="contact-grid">
          <div className="contact-card" data-cursor="view-more">
            <h3>Email</h3>
            <p><a href="mailto:hello@boxcarsocial.com">hello@boxcarsocial.com</a></p>
          </div>
          <div className="contact-card" data-cursor="view-more">
            <h3>Phone</h3>
            <p><a href="tel:+15125551234">(512) 555-1234</a></p>
          </div>
          <div className="contact-card" data-cursor="view-more">
            <h3>Visit</h3>
            <p>216 N Edward Gary St<br/>San Marcos, TX 78666</p>
          </div>
        </div>
      </Section>
    </>
  );
}

function BookEventPage(){
  return (
    <>
      <HeroVideo
        overline="Book An Event"
        heading="From watch parties to weddings"
        sub="Tell us about your gathering and we’ll tailor the perfect experience."
        videoSrc={null}
      />
      <Section tight title="Request an Experience" overline="Let’s Plan" bgWord="Events" className="section--contact">
        <div className="contact-grid">
          <div className="contact-card contact-card--wide" data-cursor="view-more">
            <h3>Event Inquiry</h3>
            <p>Send us details about your event, and our team will follow up within 24 hours.</p>
            <a className="btn" href="mailto:events@boxcarsocial.com">Email Events</a>
          </div>
          <div className="contact-card" data-cursor="view-more">
            <h3>Capacity</h3>
            <p>Up to 150 guests · Taproom, Parlor, or whole venue</p>
          </div>
          <div className="contact-card" data-cursor="view-more">
            <h3>Packages</h3>
            <p>Catering · Beverage · A/V support · Game-day screens</p>
          </div>
        </div>
      </Section>
    </>
  );
}

function MenuPage(){
  const menus = [
    { title:"Taproom Menu", desc:"Elevated pub fare, rotating chef features.", link:"#"},
    { title:"Parlor Menu", desc:"Cocktail-forward small plates upstairs.", link:"#"},
    { title:"Brunch", desc:"Weekends 10am-2pm · Classics with a twist.", link:"#"},
    { title:"Late Night", desc:"After 10pm · Shareables & comfort bites.", link:"#"},
  ];
  return (
    <>
      <HeroVideo
        overline="Menus"
        heading="Pouring flavor all day"
        sub="Taproom staples, refined parlor plates, and weekend brunch favorites."
        videoSrc={null}
      />
      <Section tight title="Choose Your Menu" overline="Food & Drink" bgWord="Menus" className="section--contact">
        <div className="contact-grid">
          {menus.map((menu)=>(
            <div key={menu.title} className="contact-card" data-cursor="view-more">
              <h3>{menu.title}</h3>
              <p>{menu.desc}</p>
              <a className="btn btn--ghost" href={menu.link}>View</a>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function GalleryPage(){
  const photos = Array.from({length:12},(_,i)=>({
    id:i+1,
    img:"/placeholder-16x9.jpg",
    caption:`Moment ${i+1}`,
  }));
  return (
    <>
      <HeroVideo
        overline="Gallery"
        heading="Inside Boxcar Social"
        sub="A glimpse at the people, plates, and parties that fill our nights."
        videoSrc={null}
      />
      <Section tight title="Captured Moments" overline="Gallery" bgWord="Gallery">
        <div className="gallery-grid">
          {photos.map((photo)=>(
            <article key={photo.id} className="gallery__item gallery__item--grid">
              <div className="gallery__img" style={{backgroundImage:`url(${photo.img})`}} />
              <div className="gallery__caption">{photo.caption}</div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
