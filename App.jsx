import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import "./brand.css";
import "./components.css";

const router = createBrowserRouter([
  { path: "/", element: <Shell />, children: [
    { index: true, element: <Home /> },
    { path: "city/:slug", element: <City /> },
    { path: "gallery", element: <GalleryPage /> },
    { path: "contact", element: <ContactPage /> },
    { path: "book-event", element: <BookEventPage /> },
  ]},
]);

const WEEKLY_HOURS = [
  { day: "Mon", label: "Closed" },
  { day: "Tue", label: "04:00 pm – 02:00 am" },
  { day: "Wed", label: "04:00 pm – 02:00 am" },
  { day: "Thu", label: "04:00 pm – 02:00 am" },
  { day: "Fri", label: "04:00 pm – 02:00 am" },
  { day: "Sat", label: "11:00 am – 02:00 am" },
  { day: "Sun", label: "11:00 am – 02:00 am" },
];

const GALLERY_IMAGES = [
  "moment_8175.jpg",
  "moment_8191.JPG",
  "moment_8195.JPG",
  "moment_8202.jpg",
  "moment_8211.JPG",
  "moment_8224.jpg",
  "moment_8231.JPG",
  "moment_8238.JPG",
  "moment_8243.jpg",
  "moment_8247.jpg",
  "moment_8252.jpg",
  "moment_8257.jpg",
  "moment_8263.JPG",
  "moment_8266.jpg",
  "moment_8270.jpg",
  "moment_8292.jpg",
  "moment_8304.JPG",
  "moment_8316.jpg",
  "moment_8324.jpg",
  "moment_8338.jpg",
  "moment_8343.jpg",
  "moment_8358.jpg",
  "moment_8371.jpg",
  "moment_8376.jpg",
  "moment_8379.JPG",
  "moment_8419.jpg",
];

const GOOGLE_FORM_SRC = "https://docs.google.com/forms/d/e/1FAIpQLScjaI22HzjhwE_LzqbmdIXQx3NoptZ1fnEzgRLBkh0P5W4EpQ/viewform?embedded=true";

function refreshScrollSystems(){
  if(typeof window === "undefined") return;
  if(window.lenis?.resize) window.lenis.resize();
  if(window.ScrollTrigger?.refresh) window.ScrollTrigger.refresh();
}

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
            <Link data-cursor="view-more" to="/gallery">Gallery</Link>
            <Link data-cursor="view-more" to="/contact">Contact</Link>
            <Link data-cursor="view-more" to="/book-event">Book an Event</Link>
          </div>
        </div>
      </nav>
      <HoursLedger />
      <Outlet />
      <footer className="footer">
        <div className="container">© Boxcar Social 2025</div>
      </footer>
    </>
  );
}

function HoursLedger(){
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const todayKey = dayNames[new Date().getDay()];
  return (
    <div className="hours-ledger" aria-label="Weekly hours">
      <div className="hours-ledger__card">
        <div className="hours-ledger__title">Hours</div>
        <div className="hours-ledger__list">
        {WEEKLY_HOURS.map(({day, label})=>{
          const isToday = day === todayKey;
          const className = ["hours-ledger__item", isToday && "hours-ledger__item--active"].filter(Boolean).join(" ");
          return (
            <div key={day} className={className}>
              <div className="hours-ledger__day">{day}</div>
              <div className="hours-ledger__time">{label}</div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
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

function Card({title,img,actions=null,description="Placeholder description for this module."}){
  return (
    <motion.article className="card"
      data-cursor="view-more"
      whileHover={{scale:1.02}} transition={{type:"spring", stiffness:300, damping:20}}>
      <div className="card__media" style={{backgroundImage:`url(${img})`}} />
      <div className="card__body">
        <div className="card__title">{title}</div>
        {description && <p style={{color:"var(--cream-300)"}}>{description}</p>}
        {actions && (
          <div style={{display:"flex", gap:12, marginTop:8}}>
            {actions}
          </div>
        )}
      </div>
    </motion.article>
  );
}

function EventGrid(){
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const queueScrollRefresh = ()=>{
    if(typeof window === "undefined") return;
    window.requestAnimationFrame(()=>refreshScrollSystems());
  };
  useEffect(()=>{
    let cancelled = false;
    async function loadEvents(){
      try{
        setLoading(true);
        setError(null);
        const response = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSMnG-3860OpM29dbE5ZscztMVHcJWcO3Ih_hvI7HSafoox2zlH6MMfJESkOdLKCEDw5XmTXSSaej2z/pub?output=csv");
        if(!response.ok) throw new Error(`Sheets request failed (${response.status})`);
        const text = await response.text();
        const parsed = parseCsv(text);
        if(!parsed.length) throw new Error("Sheet returned no rows");
        const [rawHeader, ...rows] = parsed;
        const header = rawHeader.map((cell)=>cell.trim().toLowerCase().replace(/\s+/g,"_"));
        const normalized = rows.map((row)=>{
          const entry = header.reduce((acc,key,idx)=>{
            acc[key] = (row[idx] ?? "").trim();
            return acc;
          }, {});
          const combinedDate = `${entry.date || ""} ${entry.time || ""}`.trim();
          const dateObj = combinedDate ? new Date(combinedDate) : null;
          return {
            title: entry.title,
            description: entry.description,
            image: entry.image_link || "/logo.png",
            dateObj,
          };
        }).filter((entry)=>entry.title);
        const upcoming = normalized
          .filter((entry)=>entry.dateObj instanceof Date && !isNaN(entry.dateObj) && entry.dateObj >= new Date())
          .sort((a,b)=>a.dateObj - b.dateObj)
          .slice(0,4)
          .map((entry)=>({
            ...entry,
            dateLabel: entry.dateObj.toLocaleString("en-US", {month:"short", day:"numeric", hour:"numeric", minute:"2-digit"}),
          }));
        if(!cancelled){
          setEvents(upcoming);
          setLoading(false);
          queueScrollRefresh();
        }
      }catch(err){
        if(!cancelled){
          console.error(err);
          setError(err);
          setLoading(false);
          queueScrollRefresh();
        }
      }
    }
    loadEvents();
    return ()=>{ cancelled = true; };
  }, []);
  if(loading) return <p style={{color:"var(--cream-200)"}}>Loading events…</p>;
  if(error) return <p role="alert">Unable to load events. Please try again later.</p>;
  if(!events.length) return <p>No upcoming events yet. Check back soon.</p>;
  return (
    <div className="grid cards">
      {events.map((event,idx)=>(
        <Card key={`${event.title}-${idx}`}
          title={event.title}
          img={event.image}
          description={`${event.dateLabel}${event.description ? ` · ${event.description}` : ""}`} />
      ))}
    </div>
  );
}

function parseCsv(text){
  const rows = [];
  let current = [];
  let cell = "";
  let inQuotes = false;
  for(let i=0;i<text.length;i++){
    const char = text[i];
    if(char === '"'){
      if(inQuotes && text[i+1] === '"'){
        cell += '"';
        i++;
      }else{
        inQuotes = !inQuotes;
      }
      continue;
    }
    if(char === "," && !inQuotes){
      current.push(cell);
      cell = "";
      continue;
    }
    if((char === "\n" || char === "\r") && !inQuotes){
      if(char === "\r" && text[i+1] === "\n") i++;
      current.push(cell);
      rows.push(current);
      current = [];
      cell = "";
      continue;
    }
    cell += char;
  }
  if(cell.length || current.length){
    current.push(cell);
    rows.push(current);
  }
  return rows.filter((row)=>row.some((value)=>value.trim().length));
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
          <h3 style={{marginBottom:16}}>Boxcar Social · 116 S Edward Gary St, San Marcos, TX</h3>
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
  useEffect(()=>{
    refreshScrollSystems();
  }, []);
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
          onLoad={refreshScrollSystems}
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
            <p><a href="mailto:hello@boxcarsocial.com">Info@boxcarsocialsmtx.com</a></p>
          </div>
          <div className="contact-card" data-cursor="view-more">
            <h3>Phone</h3>
            <p><a href="tel:+15122166015">(512) 216-6015</a></p>
          </div>
          <div className="contact-card" data-cursor="view-more">
            <h3>Visit</h3>
            <p>116 S Edward Gary St<br/>San Marcos, TX 78666</p>
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
        heading="From watch parties to wild nights out"
        sub="Tell us about your gathering and we’ll tailor the perfect experience."
        videoSrc={null}
      />
      <Section tight title="Request an Experience" overline="Let’s Plan" bgWord="Events" className="section--contact">
        <div className="contact-grid">
          <div className="contact-card contact-card--wide contact-card--event" data-cursor="view-more">
            <h3>Event Inquiry</h3>
            <p>Send us details about your event, and our team will follow up within 24 hours.</p>
            <div className="form-embed">
              <iframe
                src={GOOGLE_FORM_SRC}
                title="Event Inquiry Form"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                allowFullScreen
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function GalleryPage(){
  const photos = GALLERY_IMAGES.map((file, i) => ({
    id: i + 1,
    img: `/${file}`,
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
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
