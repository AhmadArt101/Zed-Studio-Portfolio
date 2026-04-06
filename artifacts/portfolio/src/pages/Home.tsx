import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Mail, Phone, ExternalLink } from "lucide-react";

// Assets
import logoPath from "@assets/zedstudio_english_no_bg_1775501417725.png";
import brandPath from "@assets/MobileZed-AR-EN_1775500280925.png";
import doorPath from "@assets/Door_1775500371942.png";
import flashlightPath from "@assets/Flashlight_1775500371943.png";
import keyPath from "@assets/Key_1775500371943.png";
import knifePath from "@assets/Knife_1775500371944.png";
import pencilPath from "@assets/Pencil_1775500371944.png";
import photoFramePath from "@assets/Photo-Frame_1775500371945.png";
import scissorsPath from "@assets/Scisors_1775500371945.png";
import screwdriverPath from "@assets/ScrewDriver_1775500371946.png";
import tablePath from "@assets/Table_1775500371947.png";
import bookPath from "@assets/Book_1775500371948.png";
import myKnifePath from "@assets/My_Knife_1775500387524.png";
import robotTexturedPath from "@assets/Textured_Ref_Angle_Shot_1775500575154.png";
import robotWirePath from "@assets/WireFrame_Ref_Angle_Shot_1775500584624.jpeg";

const BASE = import.meta.env.BASE_URL;
const posterPath = `${BASE}poster-gamers.jpg`;
const gravyYardPath = `${BASE}poster-gravyyard.jpg`;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

// Decorative dot grid
function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{
        backgroundImage: "radial-gradient(circle, rgba(141,182,0,0.18) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

// Decorative corner marks
function CornerMarks({ color = "var(--color-primary)" }: { color?: string }) {
  const s = 18;
  return (
    <>
      <span style={{ position: "absolute", top: 0, left: 0, width: s, height: s, borderTop: `3px solid ${color}`, borderLeft: `3px solid ${color}` }} />
      <span style={{ position: "absolute", top: 0, right: 0, width: s, height: s, borderTop: `3px solid ${color}`, borderRight: `3px solid ${color}` }} />
      <span style={{ position: "absolute", bottom: 0, left: 0, width: s, height: s, borderBottom: `3px solid ${color}`, borderLeft: `3px solid ${color}` }} />
      <span style={{ position: "absolute", bottom: 0, right: 0, width: s, height: s, borderBottom: `3px solid ${color}`, borderRight: `3px solid ${color}` }} />
    </>
  );
}

// Scanline overlay
function Scanlines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)",
        backgroundSize: "100% 4px",
      }}
    />
  );
}

// Floating geometry decoration
function FloatingHex({ delay = 0, size = 60, x = 0, y = 0, opacity = 0.12 }: { delay?: number; size?: number; x?: number; y?: number; opacity?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ position: "absolute", left: x, top: y, width: size, height: size, opacity }}
      className="pointer-events-none"
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,2 93,25 93,75 50,98 7,75 7,25" stroke="#8DB600" strokeWidth="4" />
      </svg>
    </motion.div>
  );
}

// Animated pixel cross
function PixelCross({ size = 24, color = "#8DB600", opacity = 0.25 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ opacity }}>
      <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="3" />
      <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="3" />
    </svg>
  );
}

const SkillBar = ({ name, percentage, delay = 0 }: { name: string; percentage: number; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="mb-5" ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="font-bold text-sm text-foreground tracking-wide">{name}</span>
        <span className="text-primary font-mono text-sm font-bold">{percentage}%</span>
      </div>
      <div className="h-2 w-full rounded-none overflow-hidden relative" style={{ background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, #8DB600, #b6e800)" }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.15 + delay }}
        />
        {isInView && (
          <motion.div
            className="absolute top-0 right-0 h-full w-6"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5))" }}
            initial={{ x: `-${100 - percentage}%`, opacity: 1 }}
            animate={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 + delay + 1.4 }}
          />
        )}
      </div>
    </div>
  );
};

const TimelineItem = ({
  date,
  title,
  sub,
  highlight = false,
  index = 0,
}: {
  date: string;
  title: string;
  sub?: string;
  highlight?: boolean;
  index?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="relative pl-6 border-l-2"
    style={{ borderColor: highlight ? "#8DB600" : "rgba(255,255,255,0.15)" }}
  >
    <div
      className="absolute -left-[9px] top-2 w-4 h-4 rotate-45"
      style={{ background: highlight ? "#8DB600" : "rgba(255,255,255,0.2)", border: highlight ? "none" : "2px solid rgba(255,255,255,0.3)" }}
    />
    <span className="text-primary font-mono text-xs tracking-widest">{date}</span>
    <h4 className={`text-lg font-black uppercase mt-1 tracking-tight ${highlight ? "text-primary" : "text-foreground"}`}>{title}</h4>
    {sub && <p className="text-foreground/60 mt-1 text-sm">{sub}</p>}
    {highlight && (
      <span className="inline-block mt-2 text-xs font-bold uppercase tracking-widest px-2 py-0.5" style={{ background: "#8DB600", color: "#0D2B1A" }}>
        Latest
      </span>
    )}
  </motion.div>
);

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 0.4], [0, 160]);
  const rotateKnife = useTransform(scrollYProgress, [0, 0.3], [0, 12]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.015);
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.015);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <div className="bg-background text-foreground min-h-screen font-sans overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 flex justify-between items-center" style={{ background: "rgba(13,43,26,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(141,182,0,0.12)" }}>
        <motion.img
          src={logoPath}
          alt="Zed Studio"
          className="h-10 w-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />
        <motion.a
          href="#contact"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="font-bold text-sm tracking-widest uppercase hover:text-primary transition-colors"
          style={{ letterSpacing: "0.2em" }}
        >
          Get in Touch
        </motion.a>
      </nav>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 sm:px-12 md:px-24 overflow-hidden">
        <DotGrid className="inset-0 w-full h-full" />
        <Scanlines />

        {/* Floating decorative hexagons */}
        <FloatingHex delay={0} size={80} x="5%" y="15%" opacity={0.1} />
        <FloatingHex delay={1.5} size={48} x="85%" y="60%" opacity={0.08} />
        <FloatingHex delay={0.8} size={36} x="70%" y="20%" opacity={0.07} />

        {/* Parallax knife */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ right: "4%", top: "12%", width: "clamp(340px, 44vw, 640px)", y: yHero, rotate: rotateKnife, x: smoothX, translateY: smoothY }}
        >
          <motion.img
            src={myKnifePath}
            alt="Cleaver"
            initial={{ y: 60, opacity: 0, rotate: -20 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-auto"
            style={{ filter: "drop-shadow(0 24px 60px rgba(141,182,0,0.22)) drop-shadow(0 0 40px rgba(141,182,0,0.1))" }}
          />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <PixelCross size={18} opacity={0.6} />
              <span className="text-primary font-mono tracking-widest uppercase text-xs font-bold">Ahmad Akram — Art Studio of One</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="uppercase leading-[0.82] tracking-tighter mb-10 opacity-[0.78] font-black"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
            >
              Crafting<br />
              <span style={{ color: "#8DB600", fontWeight: 900 }}>Worlds.</span><br className="text-[120px]" />
              Shipping<br />
              Pixels.
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
              <a
                href="https://drive.google.com/drive/folders/1XpmqOdGnW6237iTbRY0rvFaEtri6zRzx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold uppercase tracking-widest px-8 py-4 transition-all duration-300 text-sm"
                style={{ background: "#8DB600", color: "#0D2B1A" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#b6e800"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#8DB600"; }}
                data-testid="link-portfolio"
              >
                Full Portfolio <ArrowRight size={18} />
              </a>
              <a href="#contact" className="font-bold uppercase tracking-widest px-8 py-4 text-sm border border-foreground/20 hover:border-primary hover:text-primary transition-all duration-300">
                Contact
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="font-mono text-xs tracking-widest text-foreground/40 uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>
      {/* Marquee divider */}
      <div className="relative overflow-hidden py-3" style={{ background: "#8DB600" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
          style={{ color: "#0D2B1A" }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="text-xs font-black uppercase tracking-[0.3em] mr-10 select-none">
              3D Game Art &nbsp;&bull;&nbsp; Stylized Props &nbsp;&bull;&nbsp; Technical Art &nbsp;&bull;&nbsp; Unreal Engine &nbsp;&bull;&nbsp; Zed Studio &nbsp;&bull;&nbsp;
            </span>
          ))}
        </motion.div>
      </div>
      {/* About Section */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-card relative overflow-hidden">
        <DotGrid className="inset-0 w-full h-full opacity-50" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <PixelCross size={16} opacity={0.5} />
              <span className="font-mono text-xs tracking-widest text-foreground/50 uppercase">About</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8" style={{ color: "#8DB600" }}>Player One<br />Ready.</h2>
            <div className="space-y-5 text-base md:text-lg text-foreground/75 leading-relaxed">
              <p>
                An ambitious and creative 3D game artist with a deep passion for the games field. I stay on top of the latest trends in game art and bring professional, optimized, and organized workflows.
              </p>
              <p>
                I love pushing creative boundaries and crafting characters, props, and environments that feel alive in-game. I freelance, ship games in jams, and treat every model like it needs to survive in production.
              </p>
              <p className="text-foreground font-bold">
                Graduating Summer 2026 with a B.Sc. in Design and Visual Communication from Jordan University of Science and Technology.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-4"
          >
            <CornerMarks />
            <div className="absolute inset-4 border border-primary/20 translate-x-3 translate-y-3 pointer-events-none" />
            <img src={brandPath} alt="Zed Studio Brand" className="relative z-10 w-full h-auto" style={{ filter: "saturate(1.1) contrast(1.05)" }} />
          </motion.div>
        </div>
      </section>
      {/* Portfolio Grid */}
      <section className="py-32 px-6 sm:px-12 md:px-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex items-end justify-between flex-wrap gap-6"
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none">
              The <span style={{ color: "#8DB600" }}>Arsenal</span>.
            </h2>
            <p className="font-mono text-sm text-foreground/50 uppercase tracking-widest">Stylized Game Props</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {[
              { src: knifePath, title: "Stylized Knife" },
              { src: doorPath, title: "Wooden Door" },
              { src: flashlightPath, title: "Flashlight" },
              { src: keyPath, title: "Old Key" },
              { src: pencilPath, title: "Pencil" },
              { src: photoFramePath, title: "Photo Frame" },
              { src: scissorsPath, title: "Scissors" },
              { src: screwdriverPath, title: "Screwdriver" },
              { src: tablePath, title: "Wooden Table" },
              { src: bookPath, title: "Leather Book" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group relative aspect-square overflow-hidden cursor-pointer"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(141,182,0,0.1)" }}
                data-testid={`card-portfolio-${i}`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-115"
                />
                <div className="absolute inset-0 transition-all duration-300 flex items-end p-3"
                  style={{ background: "linear-gradient(to top, rgba(13,43,26,0.92) 0%, transparent 60%)", opacity: 0 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "0"; }}
                >
                  <span className="font-bold text-sm uppercase tracking-widest" style={{ color: "#8DB600" }}>{item.title}</span>
                </div>
                {/* hover glow via CSS */}
                <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: "inset 0 0 0 2px rgba(141,182,0,0.4)" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Environments & Posters — fixed equal height */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-card relative overflow-hidden">
        <DotGrid className="inset-0 w-full h-full opacity-40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none mb-2">
              Scenes &amp; <span style={{ color: "#8DB600" }}>Worlds</span>.
            </h2>
            <p className="font-mono text-sm text-foreground/50 uppercase tracking-widest">Full 3D Environments &amp; Poster Art</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Poster 1 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
                <CornerMarks />
                <img
                  src={posterPath}
                  alt="A Day in Gamers Life"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(13,43,26,0.7) 0%, transparent 50%)" }} />
              </div>
              <div className="mt-4 pl-1">
                <h3 className="text-2xl font-black uppercase" style={{ color: "#8DB600" }}>A Day in Gamers' Life</h3>
                <p className="text-foreground/55 text-sm mt-1 font-mono uppercase tracking-widest">Full 3D Scene Render</p>
              </div>
            </motion.div>

            {/* Poster 2 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="relative group"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
                <CornerMarks />
                <img
                  src={gravyYardPath}
                  alt="Gravy Yard"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(13,43,26,0.7) 0%, transparent 50%)" }} />
              </div>
              <div className="mt-4 pl-1">
                <h3 className="text-2xl font-black uppercase" style={{ color: "#8DB600" }}>Gravy Yard &amp; the Dambala Magic</h3>
                <p className="text-foreground/55 text-sm mt-1 font-mono uppercase tracking-widest">Game Environment Poster</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Process: Robot */}
      <section className="py-32 px-6 sm:px-12 md:px-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <PixelCross size={16} opacity={0.5} />
              <span className="font-mono text-xs tracking-widest text-foreground/50 uppercase">Modeling Process</span>
              <PixelCross size={16} opacity={0.5} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase" style={{ color: "#8DB600" }}>The Process</h2>
            <p className="text-lg text-foreground/50 mt-3 font-mono tracking-widest uppercase">From wireframe to final render</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden"
            >
              <div className="absolute top-4 left-4 z-20 font-mono text-xs px-3 py-1 font-bold uppercase tracking-widest"
                style={{ background: "rgba(13,43,26,0.9)", border: "1px solid rgba(141,182,0,0.5)", color: "#8DB600" }}>
                01 — Wireframe
              </div>
              <img
                src={robotWirePath}
                alt="Robot Wireframe"
                className="w-full h-auto object-cover aspect-square group-hover:scale-105 transition-all duration-700"
                style={{ filter: "grayscale(0.5) brightness(0.9)" }}
              />
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 2px rgba(141,182,0,0.3)" }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden"
            >
              <div className="absolute top-4 left-4 z-20 font-mono text-xs px-3 py-1 font-bold uppercase tracking-widest"
                style={{ background: "#8DB600", color: "#0D2B1A" }}>
                02 — Textured Render
              </div>
              <img
                src={robotTexturedPath}
                alt="Robot Textured"
                className="w-full h-auto object-cover aspect-square group-hover:scale-105 transition-all duration-700"
              />
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 2px rgba(141,182,0,0.4)" }} />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Stylized marquee divider 2 */}
      <div className="relative overflow-hidden py-3" style={{ background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(141,182,0,0.15)", borderBottom: "1px solid rgba(141,182,0,0.15)" }}>
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="text-xs font-bold uppercase tracking-[0.3em] mr-10 select-none text-foreground/25">
              Maya &nbsp;&bull;&nbsp; Blender &nbsp;&bull;&nbsp; ZBrush &nbsp;&bull;&nbsp; Substance Painter &nbsp;&bull;&nbsp; Unreal Engine 5 &nbsp;&bull;&nbsp; Unity &nbsp;&bull;&nbsp;
            </span>
          ))}
        </motion.div>
      </div>
      {/* Skills Section */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-card relative overflow-hidden">
        <DotGrid className="inset-0 w-full h-full opacity-40" />
        <FloatingHex delay={0} size={100} x="88%" y="10%" opacity={0.06} />
        <FloatingHex delay={2} size={60} x="2%" y="70%" opacity={0.07} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none">
              Stats &amp; <span style={{ color: "#8DB600" }}>Skills</span>.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h3 className="text-lg font-black uppercase mb-8 pb-3 tracking-widest" style={{ borderBottom: "2px solid rgba(141,182,0,0.3)", color: "#8DB600" }}>3D art pipeline</h3>
              <SkillBar name="3D Modeling – Maya" percentage={90} delay={0} />
              <SkillBar name="3D Modeling – Blender" percentage={90} delay={0.05} />
              <SkillBar name="Sculpting – ZBrush" percentage={85} delay={0.1} />
              <SkillBar name="UV Mapping" percentage={90} delay={0.15} />
              <SkillBar name="Adobe Substance Painter" percentage={90} delay={0.2} />
              <SkillBar name="Optimization Skills" percentage={90} delay={0.25} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h3 className="text-lg font-black uppercase mb-8 pb-3 tracking-widest" style={{ borderBottom: "2px solid rgba(141,182,0,0.3)", color: "#8DB600" }}>technical art</h3>
              <SkillBar name="Market-Driven Game Design" percentage={85} delay={0} />
              <SkillBar name="Tech Art – Unreal Engine" percentage={75} delay={0.05} />
              <SkillBar name="Tech Art – Unity" percentage={70} delay={0.1} />
              <SkillBar name="Rendering/Lighting – Unreal" percentage={80} delay={0.15} />
              <SkillBar name="Concept Art" percentage={70} delay={0.2} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h3 className="text-lg font-black uppercase mb-8 pb-3 tracking-widest" style={{ borderBottom: "2px solid rgba(141,182,0,0.3)", color: "#8DB600" }}>adobe creative suite</h3>
              <SkillBar name="Photoshop" percentage={90} delay={0} />
              <SkillBar name="Illustrator" percentage={90} delay={0.05} />
              <SkillBar name="After Effects" percentage={90} delay={0.1} />
              <SkillBar name="InDesign" percentage={70} delay={0.15} />
              <SkillBar name="Premiere Pro" percentage={70} delay={0.2} />
              <SkillBar name="DaVinci Resolve Studio" percentage={70} delay={0.25} />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Experience & Education */}
      <section className="py-32 px-6 sm:px-12 md:px-24 relative overflow-hidden" style={{ borderTop: "1px solid rgba(141,182,0,0.1)", borderBottom: "1px solid rgba(141,182,0,0.1)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Experience */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 flex items-center gap-4"
            >
              <div className="w-6 h-6 rotate-45" style={{ background: "#8DB600" }} />
              <h2 className="text-4xl font-black uppercase">Experience</h2>
            </motion.div>

            <div className="space-y-8">
              <TimelineItem date="APR 2026 – JUN 2026" title="Mentor — Global Game Jam" highlight index={0} />
              <TimelineItem date="JAN 2026 – APR 2026" title="3D Game Artist Intern" sub="Dimensions Games Studio, Amman — worked on real mobile game projects." index={1} />
              <TimelineItem date="FEB 2025 – PRESENT" title="3D Game Artist Freelancer" sub="Independent game art projects." index={2} />
              <TimelineItem date="2025" title="Head of Design Team" sub="TEDxASPU 2025" index={3} />
              <TimelineItem date="2022 – 2024" title="Motion Graphics Animator" sub="Freelancer — worked with individuals and YouTube channels." index={4} />
              <TimelineItem date="2022 – PRESENT" title="Game Jam Participant" sub="Global Game Jam (GGJ), Zanga Game Jam, and more." index={5} />
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 flex items-center gap-4"
            >
              <div className="w-6 h-6 rotate-45" style={{ background: "rgba(232,228,204,0.8)" }} />
              <h2 className="text-4xl font-black uppercase">Education</h2>
            </motion.div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative pl-6 border-l-2"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="absolute -left-[9px] top-2 w-4 h-4 rotate-45" style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.3)" }} />
                <span className="text-primary font-mono text-xs tracking-widest">2022 – SUMMER 2026</span>
                <h4 className="text-lg font-black uppercase mt-1 tracking-tight">B.Sc. Design &amp; Visual Communication</h4>
                <p className="text-foreground/60 mt-1 text-sm">Jordan University of Science and Technology, Irbid</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="relative pl-6 border-l-2"
                style={{ borderColor: "rgba(141,182,0,0.4)" }}
              >
                <div className="absolute -left-[9px] top-2 w-4 h-4 rotate-45" style={{ background: "#8DB600" }} />
                <span className="text-primary font-mono text-xs tracking-widest">ONGOING — ENDS MAY 2026</span>
                <h4 className="text-lg font-black uppercase mt-1 tracking-tight" style={{ color: "#8DB600" }}>Game Design Course</h4>
                <p className="text-foreground/60 mt-1 text-sm">edX platform — hosted by HP &amp; AMD</p>
                <span className="inline-block mt-2 text-xs font-bold uppercase tracking-widest px-2 py-0.5" style={{ background: "rgba(141,182,0,0.15)", color: "#8DB600", border: "1px solid rgba(141,182,0,0.3)" }}>
                  In Progress
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="relative pl-6 border-l-2"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="absolute -left-[9px] top-2 w-4 h-4 rotate-45" style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.3)" }} />
                <span className="text-primary font-mono text-xs tracking-widest">JAN 2026 – APR 2026</span>
                <h4 className="text-lg font-black uppercase mt-1 tracking-tight">3D Game Art &amp; Technical Art Internship</h4>
                <p className="text-foreground/60 mt-1 text-sm">Dimensions Games Studio, Amman</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="relative pl-6 border-l-2"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="absolute -left-[9px] top-2 w-4 h-4 rotate-45" style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.3)" }} />
                <span className="text-primary font-mono text-xs tracking-widest">MONTHLY — ONGOING</span>
                <h4 className="text-lg font-black uppercase mt-1 tracking-tight">Game Art Workshops</h4>
                <p className="text-foreground/60 mt-1 text-sm">
                  Monthly workshops with <span className="font-bold text-foreground/80">Jam3et Games</span> community — continuous hands-on learning in game art and design.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 sm:px-12 md:px-24 relative overflow-hidden" style={{ background: "#8DB600" }}>
        <Scanlines />
        <DotGrid className="inset-0 w-full h-full opacity-20" />
        <FloatingHex delay={0.5} size={90} x="5%" y="10%" opacity={0.15} />
        <FloatingHex delay={1.2} size={60} x="85%" y="60%" opacity={0.12} />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase font-bold mb-6 block" style={{ color: "#0D2B1A", opacity: 0.6 }}>Ready to Collaborate?</span>
            <h2
              className="font-black uppercase leading-[0.85] tracking-tighter mb-12"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", color: "#0D2B1A" }}
            >
              Ready to<br />
              Respawn?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 mb-14"
          >
            <a
              href="mailto:Ahmad1amazon2@gmail.com"
              className="flex items-center gap-3 text-lg md:text-xl font-bold transition-opacity hover:opacity-70"
              style={{ color: "#0D2B1A" }}
              data-testid="link-email"
            >
              <Mail size={22} /> Ahmad1amazon2@gmail.com
            </a>
            <span className="hidden sm:block text-2xl opacity-30" style={{ color: "#0D2B1A" }}>/</span>
            <a
              href="tel:+962776507524"
              className="flex items-center gap-3 text-lg md:text-xl font-bold transition-opacity hover:opacity-70"
              style={{ color: "#0D2B1A" }}
              data-testid="link-phone"
            >
              <Phone size={22} /> +962 77 650 7524
            </a>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            href="https://drive.google.com/drive/folders/1XpmqOdGnW6237iTbRY0rvFaEtri6zRzx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 text-base font-black uppercase tracking-widest transition-all duration-300"
            style={{ background: "#0D2B1A", color: "#8DB600" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1A3A2A"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#0D2B1A"; }}
            data-testid="link-drive-portfolio"
          >
            <ExternalLink size={20} /> Access Full Portfolio
          </motion.a>
        </div>
      </section>
      <footer className="py-6 px-6 text-center font-mono text-xs text-foreground/35 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(141,182,0,0.1)" }}>
        <p>&copy; {new Date().getFullYear()} Zed Studio — Art Studio of One.</p>
        <div className="flex items-center gap-2">
          <PixelCross size={12} opacity={0.3} />
          <p>Jordan based. Global reach.</p>
        </div>
      </footer>
    </div>
  );
}
