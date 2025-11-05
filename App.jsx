import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import "./styles/brand.css";
import "./styles/components.css";

const router = createBrowserRouter([
  { path: "/", element: <Shell />, children: [
    { index: true, element: <Home /> },
    { path: "city/:slug", element: <City /> },
  ]},
]);

export default function App(){ return <RouterProvider router={router} /> }

function Shell(){
  return (
    <>
      <nav className="nav">
        <div className="container nav__inner">
          <Link className="nav__brand" to="/">The Placeholder Rabbit</Link>
          <div style={{marginLeft:"auto", display:"flex", gap:12}}>
            <Link to="/city/nyc">New York</Link>
            <Link to="/city/atx">Austin</Link>
            <Link to="/city/dc">DC</Link>
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
      <Section overline="Locations" title="Choose a Location">
        <div className="grid cards">
          {["New York City, NY","Austin, TX","Washington, D.C."].map((city,i)=>(
            <Card key={city} i={i}
              title={city}
              img="/placeholder-16x9.jpg"
              actions={<Link className="btn btn--ghost" to={`/city/${slugify(city)}`}>View Location</Link>}
            />
          ))}
        </div>
      </Section>

      <Section overline="Events" title="What’s On?">
        <EventGrid />
      </Section>

      <Section overline="Culture" title="Our Culture" tight>
        <div className="grid cards">
          {["Irish Arts & Culture","That’s Deadly","Modern Makers"].map((t,i)=>(
            <Card key={t} i={i} title={t} img="/placeholder-16x9.jpg"
              actions={<button className="btn btn--ghost">Explore</button>} />
          ))}
        </div>
      </Section>

      <CTA title="Reserve a Table" primary={{label:"Reserve", href:"#"}}
           secondary={{label:"Gift Cards", href:"#"}} />
    </>
  );
}

/* ---------- City page ---------- */
function City(){
  return (
    <>
      <HeroVideo cityPoster="/placeholder-21x9.jpg" heading="City Name, ST"
        sub="Traditional ideas, contemporary execution." />
      <Section overline="Opening Times" title="The Taproom & The Parlor" tight>
        <div className="hours">
          <div><strong>The Parlor</strong><br/>Tue–Sat 5pm–1am · Sun 4pm–12am</div>
          <div><strong>The Taproom</strong><br/>Sun–Thu 11am–2am · Fri–Sat 11am–3am</div>
        </div>
      </Section>

      <Section overline="Menus" title="Food, Cocktails, Beer & Wine" tight>
        <div className="grid cards">
          <Card title="Downstairs | Taproom Menu" img="/placeholder-16x9.jpg"
            actions={<a className="btn" href="#">View Menu</a>} />
          <Card title="Upstairs | Parlor Menu" img="/placeholder-16x9.jpg"
            actions={<a className="btn" href="#">View Menu</a>} />
        </div>
      </Section>

      <Section overline="Events" title="What’s On?" />
      <EventGrid />

      <CTA title="Book an Event Space"
           primary={{label:"Book an Event", href:"#"}}
           secondary={{label:"Get Directions", href:"#"}} />
    </>
  );
}

/* ---------- Building blocks ---------- */
function HeroVideo({cityPoster="/placeholder-21x9.jpg", heading="Welcome Home", sub=""}){
  return (
    <section className="section" style={{paddingTop:0}}>
      <div className="container">
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.6, ease:"easeOut"}}>
          <div style={{borderRadius:"16px", overflow:"hidden", border:"1px solid #ffffff24"}}>
            <video playsInline muted loop autoPlay
                   poster={cityPoster} style={{width:"100%", display:"block"}}>
              <source src="/placeholder-video.mp4" type="video/mp4" />
            </video>
          </div>
          <div style={{marginTop:16}}>
            <div className="overline">Welcome Home</div>
            <h1>{heading}</h1>
            {sub && <p style={{maxWidth:720, color:"var(--cream-300)"}}>{sub}</p>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Section({overline, title, children, tight}){
  return (
    <section className={`section ${tight?"section--tight":""}`}>
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
  const sample = Array.from({length:6},(_,i)=>({
    title:`Event Title ${i+1}`,
    date:`Nov ${10+i}, 7:00 PM`,
  }));
  return (
    <div className="grid cards">
      {sample.map((e,i)=>(
        <Card key={i} title={`${e.title}`} img="/placeholder-16x9.jpg"
          actions={<button className="btn btn--ghost">Details</button>} />
      ))}
    </div>
  );
}

function CTA({title, primary, secondary}){
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="card" style={{display:"flex", alignItems:"center", gap:16, padding:24}}>
          <h3 style={{margin:0, flex:1}}>{title}</h3>
          {secondary && <a className="btn btn--ghost" href={secondary.href}>{secondary.label}</a>}
          {primary && <a className="btn" href={primary.href}>{primary.label}</a>}
        </div>
      </div>
    </section>
  );
}

function slugify(s){ return s.toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""); }
