import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Mail, Phone, ExternalLink, Download } from "lucide-react";

// Assets
import logoPath from "@assets/zedstudio_english_no_bg_1775500272724.png";
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
import posterPath from "@assets/Poster_1775500401106.jpg";
import robotTexturedPath from "@assets/Textured_Ref_Angle_Shot_1775500575154.png";
import robotWirePath from "@assets/WireFrame_Ref_Angle_Shot_1775500584624.jpeg";
import gravyYardPath from "@assets/Poster_1775500600434.png";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const SkillBar = ({ name, percentage }: { name: string; percentage: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="mb-6" ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="font-bold text-foreground">{name}</span>
        <span className="text-primary font-mono">{percentage}%</span>
      </div>
      <div className="h-3 w-full bg-card rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div className="bg-background text-foreground min-h-screen font-sans overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference p-6 flex justify-between items-center">
        <img src={logoPath} alt="Zed Studio" className="h-12 w-auto invert" />
        <a href="#contact" className="font-bold text-lg tracking-widest uppercase hover:text-primary transition-colors">
          Commence
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 sm:px-12 md:px-24">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            style={{ y: yHero }}
            className="absolute top-1/4 right-[10%] w-[40vw] max-w-[600px] opacity-80"
          >
            <motion.img 
              src={myKnifePath} 
              alt="Cleaver"
              initial={{ y: 50, opacity: 0, rotate: -15 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full h-auto drop-shadow-[0_20px_50px_rgba(141,182,0,0.15)]"
            />
          </motion.div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.h2 variants={fadeIn} className="text-primary font-mono tracking-widest uppercase mb-4 text-sm md:text-base">
              Ahmad Akram Abbas — Art Studio of One
            </motion.h2>
            <motion.h1 variants={fadeIn} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-8">
              Crafting<br/>Worlds.<br/>Shipping<br/>Pixels.
            </motion.h1>
            <motion.div variants={fadeIn} className="flex gap-6 items-center">
              <a 
                href="https://drive.google.com/drive/folders/1XpmqOdGnW6237iTbRY0rvFaEtri6zRzx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2"
              >
                Full Portfolio <ArrowRight size={20} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-card relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 text-primary">Player One Ready.</h2>
            <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed">
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
            className="relative"
          >
            <div className="absolute inset-0 border-2 border-primary translate-x-4 translate-y-4" />
            <img src={brandPath} alt="Zed Studio Brand" className="relative z-10 w-full h-auto grayscale-[20%] hover:grayscale-0 transition-all duration-500" />
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-32 px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black uppercase mb-16"
          >
            The <span className="text-primary">Arsenal</span>.
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { src: knifePath, title: "Stylized Knife Prop" },
              { src: doorPath, title: "Stylized Wooden Door" },
              { src: flashlightPath, title: "Toon Shaded Flashlight" },
              { src: keyPath, title: "Sculpted Old Key" },
              { src: pencilPath, title: "Stylized Pencil" },
              { src: photoFramePath, title: "Wooden Photo Frame" },
              { src: scissorsPath, title: "Stylized Scissors" },
              { src: screwdriverPath, title: "Stylized Screwdriver" },
              { src: tablePath, title: "Wooden Bench" },
              { src: bookPath, title: "Leather-bound Book" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative aspect-square bg-card overflow-hidden cursor-pointer"
              >
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-110 group-hover:rotate-2 transition-all duration-700 opacity-80 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="font-bold text-xl uppercase tracking-wider text-primary">{item.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Environments & Posters */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold uppercase text-primary">A Day in Gamers' Life</h3>
              <p className="text-foreground/70">Full 3D Scene Render</p>
              <div className="overflow-hidden border border-border">
                <img src={posterPath} alt="A Day in Gamers Life" className="w-full h-auto hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold uppercase text-primary">Gravy Yard & Dambala Magic</h3>
              <p className="text-foreground/70">Game Environment Poster</p>
              <div className="overflow-hidden border border-border">
                <img src={gravyYardPath} alt="Gravy Yard" className="w-full h-auto hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process: Robot */}
      <section className="py-32 px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 text-primary">The Process</h2>
            <p className="text-xl text-foreground/70 font-mono">From Wireframe to Final Render</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute top-4 left-4 bg-background text-primary font-mono text-sm px-3 py-1 font-bold z-10 border border-primary">WIREFRAME</div>
              <img src={robotWirePath} alt="Robot Wireframe" className="w-full h-auto object-cover aspect-[4/3] grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground font-mono text-sm px-3 py-1 font-bold z-10">TEXTURED RENDER</div>
              <img src={robotTexturedPath} alt="Robot Textured" className="w-full h-auto object-cover aspect-[4/3] opacity-90 group-hover:opacity-100 transition-all duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black uppercase mb-16"
          >
            Stats & <span className="text-primary">Skills</span>.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <h3 className="text-2xl font-bold uppercase mb-8 border-b-2 border-primary/30 pb-4">3D & Sculpting</h3>
              <SkillBar name="3D Modeling – Maya" percentage={90} />
              <SkillBar name="3D Modeling – Blender" percentage={90} />
              <SkillBar name="Sculpting – ZBrush" percentage={85} />
              <SkillBar name="UV Mapping" percentage={90} />
              <SkillBar name="Adobe Substance Painter" percentage={90} />
              <SkillBar name="Optimization Skills" percentage={90} />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold uppercase mb-8 border-b-2 border-primary/30 pb-4">Design & Tech</h3>
              <SkillBar name="Market-Driven Game Design" percentage={85} />
              <SkillBar name="Tech Art – Unreal Engine" percentage={75} />
              <SkillBar name="Tech Art – Unity" percentage={70} />
              <SkillBar name="Rendering/Lighting – Unreal" percentage={80} />
              <SkillBar name="Concept Art" percentage={70} />
            </div>

            <div>
              <h3 className="text-2xl font-bold uppercase mb-8 border-b-2 border-primary/30 pb-4">Software</h3>
              <SkillBar name="Photoshop" percentage={90} />
              <SkillBar name="Illustrator" percentage={90} />
              <SkillBar name="After Effects" percentage={90} />
              <SkillBar name="InDesign" percentage={70} />
              <SkillBar name="Premiere Pro" percentage={70} />
              <SkillBar name="DaVinci Resolve" percentage={70} />
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <section className="py-32 px-6 sm:px-12 md:px-24 border-y border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black uppercase mb-12 flex items-center gap-4"
            >
              <div className="w-8 h-8 bg-primary" /> Experience
            </motion.h2>
            
            <div className="space-y-8 border-l border-border pl-6 ml-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute w-3 h-3 bg-primary -left-[31px] top-2" />
                <span className="text-primary font-mono text-sm tracking-widest">APR 2026 – JUN 2026</span>
                <h4 className="text-2xl font-bold mt-1 uppercase text-foreground">Mentor at Global Game Jam</h4>
                <p className="text-foreground/70 mt-2 font-bold text-primary">LATEST ACTIVITY</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute w-3 h-3 bg-border -left-[31px] top-2" />
                <span className="text-primary font-mono text-sm tracking-widest">FEB 2025 – PRESENT</span>
                <h4 className="text-2xl font-bold mt-1 uppercase">3D Game Artist Freelancer</h4>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute w-3 h-3 bg-border -left-[31px] top-2" />
                <span className="text-primary font-mono text-sm tracking-widest">JAN 2026 – APR 2026</span>
                <h4 className="text-2xl font-bold mt-1 uppercase">3D Game Artist Intern</h4>
                <p className="text-foreground/70 mt-2">Dimensions Games Studio, Amman. Worked on real mobile game projects.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute w-3 h-3 bg-border -left-[31px] top-2" />
                <span className="text-primary font-mono text-sm tracking-widest">2025</span>
                <h4 className="text-2xl font-bold mt-1 uppercase">Head of Design Team</h4>
                <p className="text-foreground/70 mt-2">TEDxASPU 2025</p>
              </motion.div>
            </div>
          </div>

          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black uppercase mb-12 flex items-center gap-4"
            >
              <div className="w-8 h-8 bg-foreground" /> Education
            </motion.h2>
            
            <div className="space-y-8 border-l border-border pl-6 ml-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute w-3 h-3 bg-foreground -left-[31px] top-2" />
                <span className="text-primary font-mono text-sm tracking-widest">2022 – SUMMER 2026</span>
                <h4 className="text-2xl font-bold mt-1 uppercase">B.Sc. Design and Visual Communication</h4>
                <p className="text-foreground/70 mt-2">Jordan University of Science and Technology, Irbid</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 sm:px-12 md:px-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-black uppercase mb-12 tracking-tighter"
          >
            Ready to <br className="md:hidden" />Respawn?
          </motion.h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16">
            <a href="mailto:Ahmad1amazon2@gmail.com" className="flex items-center gap-3 text-xl md:text-2xl font-bold hover:text-white transition-colors">
              <Mail size={28} /> Ahmad1amazon2@gmail.com
            </a>
            <span className="hidden sm:block text-2xl opacity-50">/</span>
            <a href="tel:+962776507524" className="flex items-center gap-3 text-xl md:text-2xl font-bold hover:text-white transition-colors">
              <Phone size={28} /> +962 77 650 7524
            </a>
          </div>

          <a 
            href="https://drive.google.com/drive/folders/1XpmqOdGnW6237iTbRY0rvFaEtri6zRzx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary-foreground text-primary px-10 py-5 text-xl font-bold uppercase tracking-wider hover:bg-white hover:text-primary-foreground transition-all duration-300"
          >
            <ExternalLink size={24} /> Access Google Drive Portfolio
          </a>
        </div>
      </section>

      <footer className="py-8 px-6 text-center text-foreground/50 text-sm font-mono flex flex-col md:flex-row items-center justify-between">
        <p>© {new Date().getFullYear()} Zed Studio. Art Studio of One.</p>
        <p className="mt-4 md:mt-0">Jordan based. Global reach.</p>
      </footer>
    </div>
  );
}
