import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════════════════════
const LANGS = {
  FR: {
    code: "FR", flag: "🇫🇷", name: "Français",
    splash_sub: "Une enquête criminelle Web3",
    splash_warning: "⚠ Personnages fictifs. Toute ressemblance est volontairement déguisée.",
    splash_cta: "ACCÉDER AUX DOSSIERS",
    accept_mission: "◈ ACCEPTER LA MISSION",
    earn_tokens: "Gagner 50 TRUTH",
    dossier: "DOSSIER #7734 — CONFIDENTIEL",
    intro_text: `Vous êtes journaliste d'investigation.\nUn lanceur d'alerte vous a transmis des fichiers cryptés.\n\nL'affaire : Jeffrey Goldstein, milliardaire mystérieux,\ngérait un réseau criminel impliquant les plus puissants du monde.\n\nIl est mort en prison dans des circonstances suspectes.\n\nSon réseau est toujours actif.\n\nVotre mission : exposer la vérité\navant qu'elle soit effacée à jamais.`,
    nav_network: "RÉSEAU", nav_evidence: "PREUVES", nav_interrogate: "SUSPECT", nav_wallet: "WALLET",
    board_title: "TABLEAU DE CONNEXIONS",
    evidence_title: "SALLE DES PREUVES",
    interrogate_title: "SALLE D'INTERROGATOIRE",
    wallet_title: "WALLET — TRUTH TOKEN",
    threat: "MENACE",
    locked_hint: "Trouvez des preuves pour déverrouiller",
    seize: "[ SAISIR LA PREUVE ]",
    send: "ENVOYER",
    typing_placeholder: "Posez une question...",
    already_found: "Preuve déjà saisie",
    mission: "MISSION",
    exposed: "exposé",
    found: "preuves",
    suspects: "suspects",
    quick_q: ["Où étiez-vous ?", "Connaissez-vous l'île ?", "Qui vous a payé ?", "Avez-vous peur ?"],
    select_suspect: "Sélectionnez un suspect déverrouillé",
    notif_token: "TRUTH gagné",
    notif_unlock: "déverrouillé",
    completion: "Réseau exposé",
    evidence_filter: ["TOUT", "DOCUMENT", "FINANCE", "MÉDIA", "LÉGAL"],
    buy_tokens: "ACHETER $TRUTH",
    leaderboard: "CLASSEMENT",
    contract_title: "SMART CONTRACT — BASE NETWORK",
    stats_found: "PREUVES TROUVÉES",
    stats_suspects: "SUSPECTS DÉVOILÉS",
    stats_complete: "RÉSEAU EXPOSÉ",
    connections: "CONNEXIONS",
    status: "STATUT",
    reveal_anim: "PREUVE SAISIE",
    char_goldstein_bio: "Milliardaire mystérieux. Aucun business légitime connu. Réseau mondial de contacts influents.",
    char_maxwell_bio: "Fille d'un baron de la presse. Intermédiaire entre Goldstein et les élites mondiales.",
    char_duke_bio: "Membre de la famille royale. Photos compromettantes. Nie tout contact.",
    char_senator_bio: "Puissant sénateur. Apparaît 27 fois dans le Black Book. Protégé.",
    char_shadow_bio: "Source gouvernementale non confirmée. Protection du réseau pendant des années.",
  },
  EN: {
    code: "EN", flag: "🇬🇧", name: "English",
    splash_sub: "A Web3 Criminal Investigation",
    splash_warning: "⚠ Fictional characters. Any resemblance is intentionally disguised.",
    splash_cta: "ACCESS FILES",
    accept_mission: "◈ ACCEPT THE MISSION",
    earn_tokens: "Earn 50 TRUTH",
    dossier: "FILE #7734 — CLASSIFIED",
    intro_text: `You are an investigative journalist.\nA whistleblower sent you encrypted files.\n\nThe case: Jeffrey Goldstein, mysterious billionaire,\nran a criminal network involving the world's most powerful.\n\nHe died in prison under suspicious circumstances.\n\nHis network is still active.\n\nYour mission: expose the truth\nbefore it is erased forever.`,
    nav_network: "NETWORK", nav_evidence: "EVIDENCE", nav_interrogate: "SUSPECT", nav_wallet: "WALLET",
    board_title: "CONNECTION BOARD",
    evidence_title: "EVIDENCE ROOM",
    interrogate_title: "INTERROGATION ROOM",
    wallet_title: "WALLET — TRUTH TOKEN",
    threat: "THREAT",
    locked_hint: "Find evidence to unlock",
    seize: "[ SEIZE EVIDENCE ]",
    send: "SEND",
    typing_placeholder: "Ask a question...",
    already_found: "Evidence already seized",
    mission: "MISSION",
    exposed: "exposed",
    found: "evidence",
    suspects: "suspects",
    quick_q: ["Where were you?", "Do you know the island?", "Who paid you?", "Are you afraid?"],
    select_suspect: "Select an unlocked suspect",
    notif_token: "TRUTH earned",
    notif_unlock: "unlocked",
    completion: "Network exposed",
    evidence_filter: ["ALL", "DOCUMENT", "FINANCE", "MEDIA", "LEGAL"],
    buy_tokens: "BUY $TRUTH",
    leaderboard: "LEADERBOARD",
    contract_title: "SMART CONTRACT — BASE NETWORK",
    stats_found: "EVIDENCE FOUND",
    stats_suspects: "SUSPECTS REVEALED",
    stats_complete: "NETWORK EXPOSED",
    connections: "CONNECTIONS",
    status: "STATUS",
    reveal_anim: "EVIDENCE SEIZED",
    char_goldstein_bio: "Mysterious billionaire. No known legitimate business. Global network of influential contacts.",
    char_maxwell_bio: "Daughter of a press baron. Intermediary between Goldstein and world elites.",
    char_duke_bio: "Member of the royal family. Compromising photos. Denies all contact.",
    char_senator_bio: "Powerful senator. Appears 27 times in the Black Book. Protected.",
    char_shadow_bio: "Unconfirmed government source. Protected the network for years.",
  },
  IT: {
    code: "IT", flag: "🇮🇹", name: "Italiano",
    splash_sub: "Un'indagine criminale Web3",
    splash_warning: "⚠ Personaggi fittizi. Qualsiasi somiglianza è volutamente mascherata.",
    splash_cta: "ACCEDI AI DOSSIER",
    accept_mission: "◈ ACCETTA LA MISSIONE",
    earn_tokens: "Guadagna 50 TRUTH",
    dossier: "DOSSIER #7734 — RISERVATO",
    intro_text: `Sei un giornalista investigativo.\nUna fonte ti ha trasmesso file criptati.\n\nIl caso: Jeffrey Goldstein, misterioso miliardario,\ngestiva una rete criminale che coinvolgeva i più potenti del mondo.\n\nÈ morto in prigione in circostanze sospette.\n\nLa sua rete è ancora attiva.\n\nLa tua missione: esporre la verità\nprima che venga cancellata per sempre.`,
    nav_network: "RETE", nav_evidence: "PROVE", nav_interrogate: "SOSPETTO", nav_wallet: "WALLET",
    board_title: "TAVOLA DELLE CONNESSIONI",
    evidence_title: "SALA PROVE",
    interrogate_title: "SALA INTERROGATORI",
    wallet_title: "WALLET — TRUTH TOKEN",
    threat: "MINACCIA",
    locked_hint: "Trova prove per sbloccare",
    seize: "[ SEQUESTRA PROVA ]",
    send: "INVIA",
    typing_placeholder: "Fai una domanda...",
    already_found: "Prova già sequestrata",
    mission: "MISSIONE",
    exposed: "esposta",
    found: "prove",
    suspects: "sospetti",
    quick_q: ["Dov'eri?", "Conosci l'isola?", "Chi ti ha pagato?", "Hai paura?"],
    select_suspect: "Seleziona un sospettato sbloccato",
    notif_token: "TRUTH guadagnato",
    notif_unlock: "sbloccato",
    completion: "Rete esposta",
    evidence_filter: ["TUTTO", "DOCUMENTO", "FINANZA", "MEDIA", "LEGALE"],
    buy_tokens: "COMPRA $TRUTH",
    leaderboard: "CLASSIFICA",
    contract_title: "SMART CONTRACT — BASE NETWORK",
    stats_found: "PROVE TROVATE",
    stats_suspects: "SOSPETTI SVELATI",
    stats_complete: "RETE ESPOSTA",
    connections: "CONNESSIONI",
    status: "STATO",
    reveal_anim: "PROVA SEQUESTRATA",
    char_goldstein_bio: "Miliardario misterioso. Nessun business legittimo noto. Rete mondiale di contatti influenti.",
    char_maxwell_bio: "Figlia di un barone della stampa. Intermediaria tra Goldstein e le élite mondiali.",
    char_duke_bio: "Membro della famiglia reale. Foto compromettenti. Nega ogni contatto.",
    char_senator_bio: "Potente senatore. Appare 27 volte nel Black Book. Protetto.",
    char_shadow_bio: "Fonte governativa non confermata. Ha protetto la rete per anni.",
  },
  ES: {
    code: "ES", flag: "🇪🇸", name: "Español",
    splash_sub: "Una investigación criminal Web3",
    splash_warning: "⚠ Personajes ficticios. Cualquier semejanza está intencionalmente disfrazada.",
    splash_cta: "ACCEDER A LOS ARCHIVOS",
    accept_mission: "◈ ACEPTAR LA MISIÓN",
    earn_tokens: "Ganar 50 TRUTH",
    dossier: "EXPEDIENTE #7734 — CONFIDENCIAL",
    intro_text: `Eres un periodista de investigación.\nUn informante te envió archivos cifrados.\n\nEl caso: Jeffrey Goldstein, misterioso multimillonario,\ndirigía una red criminal que involucraba a los más poderosos del mundo.\n\nMurió en prisión en circunstancias sospechosas.\n\nSu red sigue activa.\n\nTu misión: exponer la verdad\nantes de que sea borrada para siempre.`,
    nav_network: "RED", nav_evidence: "PRUEBAS", nav_interrogate: "SOSPECHO", nav_wallet: "WALLET",
    board_title: "TABLERO DE CONEXIONES",
    evidence_title: "SALA DE PRUEBAS",
    interrogate_title: "SALA DE INTERROGACIÓN",
    wallet_title: "WALLET — TRUTH TOKEN",
    threat: "AMENAZA",
    locked_hint: "Encuentra pruebas para desbloquear",
    seize: "[ INCAUTAR PRUEBA ]",
    send: "ENVIAR",
    typing_placeholder: "Haz una pregunta...",
    already_found: "Prueba ya incautada",
    mission: "MISIÓN",
    exposed: "expuesta",
    found: "pruebas",
    suspects: "sospechosos",
    quick_q: ["¿Dónde estabas?", "¿Conoces la isla?", "¿Quién te pagó?", "¿Tienes miedo?"],
    select_suspect: "Selecciona un sospechoso desbloqueado",
    notif_token: "TRUTH ganado",
    notif_unlock: "desbloqueado",
    completion: "Red expuesta",
    evidence_filter: ["TODO", "DOCUMENTO", "FINANZA", "MEDIA", "LEGAL"],
    buy_tokens: "COMPRAR $TRUTH",
    leaderboard: "CLASIFICACIÓN",
    contract_title: "SMART CONTRACT — BASE NETWORK",
    stats_found: "PRUEBAS ENCONTRADAS",
    stats_suspects: "SOSPECHOSOS REVELADOS",
    stats_complete: "RED EXPUESTA",
    connections: "CONEXIONES",
    status: "ESTADO",
    reveal_anim: "PRUEBA INCAUTADA",
    char_goldstein_bio: "Multimillonario misterioso. Sin negocio legítimo conocido. Red mundial de contactos influyentes.",
    char_maxwell_bio: "Hija de un barón de la prensa. Intermediaria entre Goldstein y las élites mundiales.",
    char_duke_bio: "Miembro de la familia real. Fotos comprometedoras. Niega todo contacto.",
    char_senator_bio: "Poderoso senador. Aparece 27 veces en el Black Book. Protegido.",
    char_shadow_bio: "Fuente gubernamental no confirmada. Protegió la red durante años.",
  }
};

// ═══════════════════════════════════════════════════════════════
// IMAGE PATHS — change these if your filenames differ
// ═══════════════════════════════════════════════════════════════
const ASSETS = {
  splashBg:    "/the-network-game/assets/splash-bg.jpg",
  logo:        "/the-network-game/assets/logo.jpg",
  logoSocial:  "/the-network-game/assets/logo-social.jpg",
  banner:      "/the-network-game/assets/banner.jpg",
};

// ═══════════════════════════════════════════════════════════════
// GAME DATA
// ═══════════════════════════════════════════════════════════════
const getCharacters = (t) => [
  { id:"goldstein",   name:"J. GOLDSTEIN",  title_key:"Le Financier",  role:"Handler",   status:"Décédé en prison",    threat:95, connections:["maxwell","duke","senator"],      clues:["island_deed","flight_log","blackbook"],         avatar:"💀", color:"#ff1a3a", bio:t.char_goldstein_bio, locked:false },
  { id:"maxwell",     name:"G. MAXWELL",    title_key:"La Fixeuse",    role:"Recruteur", status:"En prison",            threat:88, connections:["goldstein","duke","media_mogul"], clues:["recruitment_files","photo_archive"],            avatar:"🕸️", color:"#ff7700", bio:t.char_maxwell_bio,  locked:false },
  { id:"duke",        name:"PRINCE A.",     title_key:"L'Aristocrate", role:"Complice",  status:"Sous enquête",         threat:72, connections:["goldstein","maxwell"],            clues:["photo_archive","flight_log"],                  avatar:"👑", color:"#cc33ff", bio:t.char_duke_bio,     locked:true  },
  { id:"senator",     name:"SÉNATEUR X",    title_key:"Le Politique",  role:"Client",    status:"Non poursuivi",        threat:60, connections:["goldstein","cia_handler"],        clues:["blackbook","offshore_accounts"],               avatar:"🏛️", color:"#0088ff", bio:t.char_senator_bio,  locked:true  },
  { id:"cia_handler", name:"AGENT SHADOW",  title_key:"Le Fantôme",   role:"Protection",status:"Identité inconnue",    threat:99, connections:["goldstein","senator"],            clues:["nda_documents","offshore_accounts"],           avatar:"🕵️", color:"#00ff88", bio:t.char_shadow_bio,   locked:true  },
];

const getEvidence = () => [
  { id:"flight_log",        name:"JOURNAL DE VOL",   type:"document", icon:"✈️", desc:"621 vols sur le 'Lolita Express'. Noms cryptés. Destinations : New York, Paris, Londres, Shadow Isle.", reward:150, found:false, unlocks:["duke"],               category:"document" },
  { id:"blackbook",         name:"LE BLACK BOOK",    type:"document", icon:"📒", desc:"2,000 contacts dont 500 personnalités mondiales. Annoté à la main. Certaines pages manquantes.",       reward:200, found:false, unlocks:["senator"],            category:"document" },
  { id:"photo_archive",     name:"ARCHIVE PHOTOS",   type:"media",    icon:"📸", desc:"Milliers de photos sur Shadow Isle. Certaines compromettantes. Qualité surveillance.",                reward:180, found:false, unlocks:[],                     category:"media"    },
  { id:"island_deed",       name:"ACTE DE L'ÎLE",   type:"document", icon:"🏝️", desc:"Shadow Isle enregistrée sous 14 sociétés offshore. Propriété réelle dissimulée.",                    reward:120, found:false, unlocks:[],                     category:"document" },
  { id:"recruitment_files", name:"FICHIERS RECRUT.", type:"legal",    icon:"📁", desc:"Méthodes de recrutement documentées. Victimes ciblées dans les milieux défavorisés.",                reward:250, found:false, unlocks:[],                     category:"legal"    },
  { id:"offshore_accounts", name:"COMPTES OFFSHORE", type:"finance",  icon:"💰", desc:"Réseau de 47 sociétés-écrans. $2.3 milliards non traçables. Connexions bancaires mondiales.",        reward:300, found:false, unlocks:["senator","cia_handler"],category:"finance"  },
  { id:"nda_documents",     name:"NDA CLASSIFIÉS",   type:"legal",    icon:"🔏", desc:"Accords signés par 23 victimes. Paiements en millions. Clause de silence perpétuelle.",               reward:220, found:false, unlocks:["cia_handler"],        category:"legal"    },
];

// ═══════════════════════════════════════════════════════════════
// GLOBAL CSS
// ═══════════════════════════════════════════════════════════════
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:#050505;}
  ::-webkit-scrollbar-thumb{background:#ff1a3a55;}
  body{background:#050505;overflow-x:hidden;}
  @keyframes scanMove{0%{transform:translateY(-100%);}100%{transform:translateY(100vh);}}
  @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.6;transform:scale(0.97);}}
  @keyframes fadeInUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
  @keyframes glitch1{0%,100%{clip-path:inset(0 0 95% 0);}20%{clip-path:inset(30% 0 50% 0);}40%{clip-path:inset(60% 0 20% 0);}60%{clip-path:inset(10% 0 80% 0);}80%{clip-path:inset(80% 0 5% 0);}}
  @keyframes glitch2{0%,100%{clip-path:inset(5% 0 90% 0);transform:translate(-3px,0);}25%{clip-path:inset(40% 0 40% 0);transform:translate(3px,0);}50%{clip-path:inset(70% 0 15% 0);transform:translate(-2px,0);}75%{clip-path:inset(20% 0 70% 0);transform:translate(2px,0);}}
  @keyframes revealCard{0%{opacity:0;transform:scale(0.8) rotateX(15deg);}100%{opacity:1;transform:scale(1) rotateX(0);}}
  @keyframes shimmer{0%{background-position:200% center;}100%{background-position:-200% center;}}
  @keyframes flicker{0%,100%{opacity:1;}92%{opacity:1;}93%{opacity:0.4;}94%{opacity:1;}96%{opacity:0.6;}97%{opacity:1;}}
  @keyframes radarPing{0%{transform:scale(0.5);opacity:1;}100%{transform:scale(2.5);opacity:0;}}
  @keyframes neonFlicker{0%,19%,21%,23%,25%,54%,56%,100%{text-shadow:0 0 10px #ff1a3a,0 0 20px #ff1a3a,0 0 40px #ff1a3a;}20%,24%,55%{text-shadow:none;}}
  @keyframes borderFlow{0%{border-color:#ff1a3a;}33%{border-color:#ff7700;}66%{border-color:#cc33ff;}100%{border-color:#ff1a3a;}}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
  @keyframes notifSlide{from{opacity:0;transform:translateX(60px);}to{opacity:1;transform:translateX(0);}}
  @keyframes revealFull{0%{clip-path:inset(0 100% 0 0);}100%{clip-path:inset(0 0% 0 0);}}
  @keyframes dangerPulse{0%,100%{box-shadow:0 0 0px #ff1a3a00;}50%{box-shadow:0 0 20px #ff1a3a88;}}
  @keyframes kenburns{0%{transform:scale(1);}100%{transform:scale(1.08);}}
  .nav-btn:hover{background:#ff1a3a22!important;color:#ff1a3a!important;}
  .ev-card:hover{transform:translateY(-2px);border-color:#ff1a3a55!important;}
  .char-card:hover:not([data-locked='true']){transform:translateY(-3px);box-shadow:0 8px 30px rgba(255,26,58,0.2);}
  .send-btn:hover{background:#ff1a3a22;}
  .quick-btn:hover{border-color:#ff1a3a!important;color:#ff1a3a!important;}
  .suspect-pill:hover:not([data-locked='true']){transform:scale(1.05);}
  input:focus{border-color:#ff1a3a66!important;outline:none;}
  @media(max-width:640px){
    .desktop-header-stats{display:none!important;}
    .mobile-stats-bar{display:flex!important;}
    .desktop-nav{display:none!important;}
    .mobile-bottom-nav{display:flex!important;}
  }
  @media(min-width:641px){
    .mobile-stats-bar{display:none!important;}
    .mobile-bottom-nav{display:none!important;}
    .desktop-nav{display:flex!important;}
  }
`;

// ═══════════════════════════════════════════════════════════════
// PARTICLE BACKGROUND
// ═══════════════════════════════════════════════════════════════
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    c.width = window.innerWidth; c.height = window.innerHeight;
    const particles = Array.from({length:60}, () => ({
      x: Math.random()*c.width, y: Math.random()*c.height,
      vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3,
      r: Math.random()*1.5+0.5,
      color: Math.random()>0.7?"#ff1a3a":Math.random()>0.5?"#ff770044":"#ffffff08"
    }));
    let raf;
    const draw = () => {
      ctx.fillStyle="rgba(5,5,5,0.15)"; ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,i) => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=c.width; if(p.x>c.width)p.x=0;
        if(p.y<0)p.y=c.height; if(p.y>c.height)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.color; ctx.fill();
        particles.slice(i+1).forEach(q => {
          const d=Math.hypot(p.x-q.x,p.y-q.y);
          if(d<120){
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
            ctx.strokeStyle=`rgba(255,26,58,${(1-d/120)*0.08})`; ctx.lineWidth=0.5; ctx.stroke();
          }
        });
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    const onResize=()=>{c.width=window.innerWidth;c.height=window.innerHeight;};
    window.addEventListener("resize",onResize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",onResize);};
  },[]);
  return <canvas ref={canvasRef} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}/>;
}

// ═══════════════════════════════════════════════════════════════
// EVIDENCE REVEAL OVERLAY
// ═══════════════════════════════════════════════════════════════
function EvidenceReveal({evidence, onDone, t}) {
  useEffect(()=>{const timer=setTimeout(onDone,2400);return()=>clearTimeout(timer);},[]);
  return (
    <div style={{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.93)",backdropFilter:"blur(10px)"}}>
      <div style={{textAlign:"center",animation:"revealCard 0.4s ease",padding:"0 24px"}}>
        <div style={{fontSize:72,marginBottom:16,animation:"float 2s ease-in-out infinite"}}>{evidence.icon}</div>
        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:11,letterSpacing:12,color:"#ff1a3a",marginBottom:8}}>{t.reveal_anim}</div>
        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"clamp(22px,6vw,36px)",color:"#fff",letterSpacing:4,marginBottom:8}}>{evidence.name}</div>
        <div style={{color:"#ffd700",fontSize:22,fontFamily:"'Share Tech Mono',monospace",marginBottom:16}}>+{evidence.reward} ◈ TRUTH</div>
        <div style={{width:200,height:2,background:"linear-gradient(90deg,transparent,#ff1a3a,transparent)",margin:"0 auto 16px",animation:"revealFull 1.5s ease forwards"}}/>
        <div style={{color:"#555",fontSize:12,fontFamily:"'Share Tech Mono',monospace",maxWidth:300,lineHeight:1.6,margin:"0 auto"}}>{evidence.desc}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LANGUAGE SELECTOR
// ═══════════════════════════════════════════════════════════════
function LangSelector({lang, setLang}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{position:"relative"}}>
      <button onClick={()=>setOpen(!open)} style={{background:"#111",border:"1px solid #333",color:"#aaa",padding:"5px 12px",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"'Share Tech Mono',monospace"}}>
        {LANGS[lang].flag} {lang} ▾
      </button>
      {open && (
        <div style={{position:"absolute",top:"100%",right:0,background:"#0d0d0d",border:"1px solid #333",zIndex:999,minWidth:140}}>
          {Object.values(LANGS).map(l=>(
            <div key={l.code} onClick={()=>{setLang(l.code);setOpen(false);}} style={{padding:"10px 14px",cursor:"pointer",fontSize:12,color:lang===l.code?"#ff1a3a":"#888",background:lang===l.code?"#ff1a3a11":"transparent",fontFamily:"'Share Tech Mono',monospace",display:"flex",gap:8,alignItems:"center"}}>
              {l.flag} {l.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STAT CHIP
// ═══════════════════════════════════════════════════════════════
function StatChip({icon, val, color, onClick}) {
  return (
    <div onClick={onClick} style={{background:"#0d0d0d",border:`1px solid ${color}33`,padding:"4px 12px",fontSize:11,borderRadius:20,cursor:onClick?"pointer":"default",color,fontFamily:"'Share Tech Mono',monospace",display:"flex",gap:5,alignItems:"center"}}>
      <span>{icon}</span><span>{val}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION TITLE
// ═══════════════════════════════════════════════════════════════
function SectionTitle({text}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,marginTop:8}}>
      <div style={{height:1,flex:1,background:"linear-gradient(90deg,#ff1a3a33,transparent)"}}/>
      <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:5,color:"#ff1a3a55"}}>{text}</div>
      <div style={{height:1,flex:1,background:"linear-gradient(90deg,transparent,#ff1a3a33)"}}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SPLASH SCREEN — with real images
// ═══════════════════════════════════════════════════════════════
function SplashScreen({t, lang, setLang, glitch, onStart}) {
  const [phase, setPhase] = useState(0);
  useEffect(()=>{
    [600,1200,1900,2600].forEach((ms,i)=>setTimeout(()=>setPhase(i+1),ms));
  },[]);
  return (
    <div style={{position:"fixed",inset:0,background:"#000",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,overflow:"hidden"}}>

      {/* ── REAL BACKGROUND IMAGE ── */}
      <div style={{
        position:"absolute",inset:0,
        backgroundImage:`url('${ASSETS.splashBg}')`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        opacity:0.35,
        filter:"saturate(1.4) brightness(0.7)",
        animation:"kenburns 20s ease-in-out infinite alternate",
      }}/>

      {/* Dark overlay gradient on top of image */}
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 50% 50%, #1a000566 0%, #000000cc 70%)"}}/>

      {/* Horizontal scan lines */}
      {[...Array(8)].map((_,i)=>(
        <div key={i} style={{position:"absolute",left:0,right:0,height:1,background:"#ff1a3a08",top:`${i*13+5}%`}}/>
      ))}

      {/* Lang selector top right */}
      <div style={{position:"absolute",top:12,right:16,zIndex:10}}>
        <LangSelector lang={lang} setLang={setLang}/>
      </div>

      {/* Content */}
      <div style={{position:"relative",textAlign:"center",zIndex:1,padding:"0 24px"}}>

        {/* CLASSIFIED label */}
        <div style={{opacity:phase>=1?1:0,transition:"opacity 0.8s",fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:14,color:"#ff1a3a",marginBottom:40,animation:phase>=1?"flicker 4s infinite":"none"}}>
          CLASSIFIED
        </div>

        {/* ── REAL LOGO IMAGE ── */}
        <div style={{position:"relative",marginBottom:32}}>
          <img
            src={ASSETS.logo}
            alt="THE NETWORK"
            style={{
              width:"min(500px, 85vw)",
              opacity:phase>=2?1:0,
              transition:"opacity 0.8s",
              display:"block",
              margin:"0 auto",
              filter:glitch
                ?"hue-rotate(90deg) drop-shadow(0 0 24px #ff1a3a)"
                :"drop-shadow(0 0 20px #ff1a3a88)",
            }}
          />
          {/* Glitch colour layers over the logo */}
          {glitch && (
            <>
              <img src={ASSETS.logo} alt="" aria-hidden style={{position:"absolute",inset:0,width:"min(500px,85vw)",margin:"0 auto",left:0,right:0,opacity:0.4,mixBlendMode:"screen",filter:"hue-rotate(180deg)",transform:"translate(-4px,0)",animation:"glitch1 0.3s steps(1)",pointerEvents:"none"}}/>
              <img src={ASSETS.logo} alt="" aria-hidden style={{position:"absolute",inset:0,width:"min(500px,85vw)",margin:"0 auto",left:0,right:0,opacity:0.3,mixBlendMode:"screen",filter:"hue-rotate(270deg)",transform:"translate(4px,0)",animation:"glitch2 0.3s steps(1)",pointerEvents:"none"}}/>
            </>
          )}
        </div>

        {/* Subtitle */}
        <div style={{opacity:phase>=3?1:0,transition:"opacity 0.8s",color:"#555",fontSize:13,letterSpacing:5,marginBottom:48,fontFamily:"'Share Tech Mono',monospace"}}>
          {t.splash_sub}
        </div>

        {/* CTA button */}
        {phase>=4 && (
          <button onClick={onStart} style={{background:"none",border:"1px solid #ff1a3a",color:"#ff1a3a",padding:"16px 48px",fontSize:12,letterSpacing:6,cursor:"pointer",fontFamily:"'Share Tech Mono',monospace",animation:"borderFlow 3s infinite, fadeInUp 0.6s ease",position:"relative",overflow:"hidden",marginBottom:32}}>
            <span style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent,#ff1a3a11,transparent)",backgroundSize:"200% 100%",animation:"shimmer 2s infinite"}}/>
            {t.splash_cta}
          </button>
        )}

        {/* Warning */}
        <div style={{opacity:phase>=4?1:0,transition:"opacity 1.5s",color:"#2a2a2a",fontSize:9,maxWidth:380,lineHeight:1.6,fontFamily:"'Share Tech Mono',monospace",margin:"0 auto"}}>
          {t.splash_warning}
        </div>

        {/* Corner marks */}
        {[{top:20,left:20},{top:20,right:20},{bottom:20,left:20},{bottom:20,right:20}].map((pos,i)=>(
          <div key={i} style={{position:"fixed",...pos,width:20,height:20,opacity:0.3,
            borderTop:i<2?"1px solid #ff1a3a":undefined,
            borderBottom:i>=2?"1px solid #ff1a3a":undefined,
            borderLeft:i%2===0?"1px solid #ff1a3a":undefined,
            borderRight:i%2===1?"1px solid #ff1a3a":undefined}}/>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// INTRO SCREEN
// ═══════════════════════════════════════════════════════════════
function IntroScreen({t, onStart}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const full = t.intro_text;
  useEffect(()=>{
    setDisplayed(""); setDone(false);
    let i=0;
    const timer=setInterval(()=>{
      setDisplayed(full.slice(0,i)); i++;
      if(i>full.length){clearInterval(timer);setDone(true);}
    },22);
    return()=>clearInterval(timer);
  },[full]);
  return (
    <div style={{position:"fixed",inset:0,background:"#000",display:"flex",alignItems:"center",justifyContent:"center",padding:24,zIndex:999}}>
      <ParticleField/>
      <div style={{position:"relative",zIndex:1,border:"1px solid #ff1a3a22",padding:"32px 28px",maxWidth:600,width:"100%",background:"rgba(10,0,0,0.85)"}}>
        <div style={{position:"absolute",top:-1,left:-1,width:16,height:16,borderTop:"2px solid #ff1a3a",borderLeft:"2px solid #ff1a3a"}}/>
        <div style={{position:"absolute",top:-1,right:-1,width:16,height:16,borderTop:"2px solid #ff1a3a",borderRight:"2px solid #ff1a3a"}}/>
        <div style={{position:"absolute",bottom:-1,left:-1,width:16,height:16,borderBottom:"2px solid #ff1a3a",borderLeft:"2px solid #ff1a3a"}}/>
        <div style={{position:"absolute",bottom:-1,right:-1,width:16,height:16,borderBottom:"2px solid #ff1a3a",borderRight:"2px solid #ff1a3a"}}/>
        <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,letterSpacing:8,color:"#ff1a3a",marginBottom:24,borderBottom:"1px solid #ff1a3a22",paddingBottom:12}}>
          {t.dossier}
        </div>
        <pre style={{fontFamily:"'Share Tech Mono',monospace",fontSize:13,lineHeight:2,color:"#ccc",whiteSpace:"pre-wrap",minHeight:200}}>
          {displayed}<span style={{animation:"blink 1s infinite",color:"#ff1a3a"}}>█</span>
        </pre>
        {done && (
          <button onClick={onStart} style={{background:"none",border:"1px solid #ffd700",color:"#ffd700",padding:"14px 32px",fontSize:12,letterSpacing:4,cursor:"pointer",marginTop:24,fontFamily:"'Share Tech Mono',monospace",width:"100%",animation:"fadeInUp 0.5s ease"}}>
            {t.accept_mission} — {t.earn_tokens}
          </button>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHARACTER CARD
// ═══════════════════════════════════════════════════════════════
function CharCard({char, t, onSelect, delay}) {
  const [hovered, setHovered] = useState(false);
  
  const PORTRAITS = {
    goldstein:   "/the-network-game/assets/suspects/goldstein.jpg",
    maxwell:     "/the-network-game/assets/suspects/maxwell.jpg",
    duke:        "/the-network-game/assets/suspects/duke.jpg",
    senator:     "/the-network-game/assets/suspects/senator.jpg",
    cia_handler: "/the-network-game/assets/suspects/shadow.jpg",
  };

  return (
    <div
      className="char-card"
      data-locked={char.locked}
      onClick={()=>!char.locked&&onSelect(char)}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{border:`1px solid ${char.locked?"#1a1a1a":char.color+"55"}`,background:char.locked?"#080808":"#0a0000",padding:0,cursor:char.locked?"not-allowed":"pointer",opacity:char.locked?0.45:1,transition:"all 0.25s",animation:`revealCard 0.5s ease ${delay}ms both`,position:"relative",overflow:"hidden",borderRadius:2,boxShadow:hovered&&!char.locked?`0 0 25px ${char.color}33`:"none"}}>

      {/* Portrait image */}
      <div style={{position:"relative",height:160,overflow:"hidden"}}>
        <img
          src={PORTRAITS[char.id]}
          alt={char.name}
          style={{
            width:"100%", height:"100%", objectFit:"cover",
            filter:char.locked
              ?"grayscale(1) blur(4px) brightness(0.3)"
              :`brightness(0.85) saturate(1.2)`,
            transition:"all 0.3s",
            transform:hovered&&!char.locked?"scale(1.05)":"scale(1)",
          }}
        />
        {/* Color overlay on hover */}
        {!char.locked&&(
          <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg, transparent 40%, ${char.color}44 100%)`}}/>
        )}
        {/* Lock overlay */}
        {char.locked&&(
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.6)"}}>
            <span style={{fontSize:32}}>🔒</span>
          </div>
        )}
        {/* Threat badge */}
        {!char.locked&&(
          <div style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,0.8)",border:`1px solid ${char.color}`,padding:"2px 8px",fontSize:10,color:char.color,fontFamily:"'Share Tech Mono',monospace"}}>
            {char.threat}%
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{padding:"10px 12px"}}>
        {!char.locked&&<div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 120%, ${char.color}11 0%, transparent 70%)`,pointerEvents:"none"}}/>}
        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:14,letterSpacing:2,color:char.locked?"#333":char.color,marginBottom:2}}>{char.name}</div>
        <div style={{fontSize:11,color:"#555",marginBottom:6,fontFamily:"'Rajdhani',sans-serif"}}>{char.title_key}</div>
        {!char.locked&&(
          <>
            <div style={{fontSize:10,fontFamily:"'Share Tech Mono',monospace",marginBottom:6,color:char.status.includes("prison")?"#ff1a3a":char.status.includes("enquête")?"#ff7700":"#666"}}>
              {char.status}
            </div>
            <div style={{height:2,background:"#111",borderRadius:1,overflow:"hidden"}}>
              <div style={{width:`${char.threat}%`,height:"100%",background:char.color,boxShadow:`0 0 6px ${char.color}`,animation:char.threat>90?"dangerPulse 2s infinite":"none"}}/>
            </div>
          </>
        )}
        {char.locked&&<div style={{fontSize:9,color:"#333",fontFamily:"'Share Tech Mono',monospace"}}>{t.locked_hint}</div>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BOARD SCREEN
// ═══════════════════════════════════════════════════════════════
function BoardScreen({t, characters, evidence, onSelectChar, onFindEvidence}) {
  return (
    <div style={{animation:"fadeInUp 0.4s ease"}}>
      <SectionTitle text={t.board_title}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:12,marginBottom:28}}>
        {characters.map((c,i)=><CharCard key={c.id} char={c} t={t} onSelect={onSelectChar} delay={i*80}/>)}
      </div>
      <div style={{border:"1px solid #ff1a3a11",padding:"12px 16px",marginBottom:24,background:"#0a0000",display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
        <span style={{fontSize:11,color:"#333",fontFamily:"'Share Tech Mono',monospace",letterSpacing:2}}>CONNEXIONS :</span>
        {characters.filter(c=>!c.locked).map(c=>(
          <span key={c.id} style={{fontSize:11,color:c.color,fontFamily:"'Share Tech Mono',monospace"}}>{c.avatar} {c.name}</span>
        ))}
      </div>
      <SectionTitle text={`📁 ${t.nav_evidence}`}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10}}>
        {evidence.map(ev=>(
          <div key={ev.id} className="ev-card" onClick={()=>!ev.found&&onFindEvidence(ev.id)} style={{border:`1px solid ${ev.found?"#00ff8844":"#1a1a1a"}`,padding:14,cursor:ev.found?"default":"pointer",background:ev.found?"#001a0a":"#0a0a0a",textAlign:"center",transition:"all 0.25s",borderRadius:2}}>
            <div style={{fontSize:24,marginBottom:6}}>{ev.found?"✅":ev.icon}</div>
            <div style={{fontSize:11,color:ev.found?"#00ff88":"#666",fontFamily:"'Share Tech Mono',monospace",lineHeight:1.3}}>{ev.name}</div>
            {!ev.found&&<div style={{fontSize:10,color:"#ffd700",marginTop:4}}>+{ev.reward} ◈</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// EVIDENCE SCREEN
// ═══════════════════════════════════════════════════════════════
function EvidenceScreen({t, evidence, onFind}) {
  const [filter, setFilter] = useState("all");
  const cats = ["all","document","finance","media","legal"];
  const filtered = filter==="all"?evidence:evidence.filter(e=>e.category===filter);
  return (
    <div style={{animation:"fadeInUp 0.4s ease"}}>
      <SectionTitle text={t.evidence_title}/>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
        {cats.map((c,i)=>(
          <button key={c} onClick={()=>setFilter(c)} style={{background:filter===c?"#ff1a3a11":"none",border:`1px solid ${filter===c?"#ff1a3a":"#222"}`,color:filter===c?"#ff1a3a":"#555",padding:"6px 16px",fontSize:11,letterSpacing:2,cursor:"pointer",borderRadius:20,fontFamily:"'Rajdhani',sans-serif",fontWeight:600,transition:"all 0.2s"}}>
            {t.evidence_filter[i]||c.toUpperCase()}
          </button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        {filtered.map((ev,i)=>(
          <div key={ev.id} className="ev-card" onClick={()=>!ev.found&&onFind(ev.id)} style={{border:`1px solid ${ev.found?"#00ff8833":"#1a1a1a"}`,padding:20,cursor:ev.found?"default":"pointer",background:ev.found?"#001a0a":"#0a0a0a",transition:"all 0.25s",borderRadius:2,animation:`revealCard 0.4s ease ${i*60}ms both`,position:"relative",overflow:"hidden"}}>
            {ev.found&&<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#00ff88,transparent)"}}/>}
            <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:12}}>
              <span style={{fontSize:28}}>{ev.found?"✅":ev.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:16,letterSpacing:2,color:ev.found?"#00ff88":"#eee"}}>{ev.name}</div>
                <div style={{fontSize:10,color:"#444",fontFamily:"'Share Tech Mono',monospace",letterSpacing:2}}>{ev.type.toUpperCase()}</div>
              </div>
              {!ev.found&&<div style={{fontFamily:"'Bebas Neue',cursive",fontSize:18,color:"#ffd700"}}>+{ev.reward}◈</div>}
            </div>
            <div style={{fontSize:12,color:"#666",lineHeight:1.7,fontFamily:"'Rajdhani',sans-serif"}}>{ev.desc}</div>
            {!ev.found&&<div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#ff1a3a",marginTop:14,letterSpacing:2,borderTop:"1px solid #ff1a3a22",paddingTop:10}}>{t.seize}</div>}
            {ev.found&&ev.unlocks.length>0&&<div style={{fontSize:11,color:"#00ff88",marginTop:10,fontFamily:"'Share Tech Mono',monospace"}}>🔓 {ev.unlocks.join(", ")}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// INTERROGATE SCREEN
// ═══════════════════════════════════════════════════════════════
function InterrogateScreen({t, lang, characters, selectedChar, onSelectChar, chatHistory, inputMsg, setInputMsg, isTyping, onSend, chatRef}) {
  return (
    <div style={{animation:"fadeInUp 0.4s ease"}}>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
        {characters.map(c=>(
          <div key={c.id} className="suspect-pill" data-locked={c.locked} onClick={()=>!c.locked&&onSelectChar(c)} style={{border:`1px solid ${selectedChar?.id===c.id?c.color:"#222"}`,padding:"8px 14px",borderRadius:24,cursor:c.locked?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:6,opacity:c.locked?0.35:1,background:selectedChar?.id===c.id?`${c.color}18`:"#0a0a0a",transition:"all 0.2s",fontSize:12,fontFamily:"'Rajdhani',sans-serif",fontWeight:600}}>
            <span>{c.locked?"🔒":c.avatar}</span>
            <span style={{color:selectedChar?.id===c.id?c.color:"#888"}}>{c.name.split(" ")[0]}</span>
          </div>
        ))}
      </div>
      {selectedChar?(
        <div style={{border:"1px solid #1a1a1a",overflow:"hidden",borderRadius:2,background:"#060606"}}>
          <div style={{padding:"16px 20px",background:`linear-gradient(90deg,${selectedChar.color}18 0%,#080808 100%)`,borderBottom:`1px solid ${selectedChar.color}33`,display:"flex",alignItems:"center",gap:14}}>
            <div style={{position:"relative"}}>
              <div style={{fontSize:36}}>{selectedChar.avatar}</div>
              <div style={{position:"absolute",inset:-4,borderRadius:"50%",border:`2px solid ${selectedChar.color}`,animation:"radarPing 2s infinite",pointerEvents:"none"}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:20,letterSpacing:4,color:selectedChar.color}}>{selectedChar.name}</div>
              <div style={{fontSize:12,color:"#666",fontFamily:"'Rajdhani',sans-serif"}}>{selectedChar.title_key} · {selectedChar.status}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#333"}}>{t.threat}</div>
              <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:22,color:selectedChar.threat>80?"#ff1a3a":"#ff7700"}}>{selectedChar.threat}%</div>
            </div>
          </div>
          <div style={{padding:"10px 20px",borderBottom:"1px solid #0f0f0f",background:"#080808"}}>
            <div style={{fontSize:12,color:"#444",fontFamily:"'Rajdhani',sans-serif",lineHeight:1.5}}>{selectedChar.bio}</div>
          </div>
          <div ref={chatRef} style={{height:280,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:12,background:"#050505"}}>
            {chatHistory.length===0&&(
              <div style={{textAlign:"center",padding:"20px 0"}}>
                <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
                  {t.quick_q.map(q=>(
                    <button key={q} className="quick-btn" onClick={()=>setInputMsg(q)} style={{background:"none",border:"1px solid #1a1a1a",color:"#444",padding:"8px 14px",fontSize:11,cursor:"pointer",borderRadius:20,fontFamily:"'Rajdhani',sans-serif",fontWeight:600,transition:"all 0.2s"}}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {chatHistory.map((msg,i)=>(
              <div key={i} style={{maxWidth:"82%",alignSelf:msg.role==="user"?"flex-end":"flex-start",animation:"fadeInUp 0.3s ease"}}>
                {msg.role!=="user"&&<div style={{fontSize:9,color:selectedChar.color,marginBottom:3,fontFamily:"'Share Tech Mono',monospace",letterSpacing:2}}>{msg.char}</div>}
                <div style={{padding:"10px 14px",background:msg.role==="user"?"#1a0005":"#0d0d0d",border:`1px solid ${msg.role==="user"?"#ff1a3a22":"#1a1a1a"}`,fontSize:13,lineHeight:1.7,color:msg.role==="user"?"#ffaaaa":"#bbb",fontFamily:"'Rajdhani',sans-serif"}}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping&&(
              <div style={{alignSelf:"flex-start",maxWidth:"60%"}}>
                <div style={{fontSize:9,color:selectedChar.color,marginBottom:3,fontFamily:"'Share Tech Mono',monospace",letterSpacing:2}}>{selectedChar.name}</div>
                <div style={{padding:"12px 18px",background:"#0d0d0d",border:"1px solid #1a1a1a",display:"flex",gap:6,alignItems:"center"}}>
                  {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:selectedChar.color,animation:`blink 1.2s ${i*0.2}s infinite`}}/>)}
                </div>
              </div>
            )}
          </div>
          <div style={{display:"flex",borderTop:"1px solid #111"}}>
            <input value={inputMsg} onChange={e=>setInputMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&onSend()} placeholder={t.typing_placeholder} style={{flex:1,background:"#080808",border:"none",borderRight:"1px solid #1a1a1a",color:"#ddd",padding:"14px 16px",fontSize:13,fontFamily:"'Rajdhani',sans-serif",outline:"none"}}/>
            <button className="send-btn" onClick={onSend} style={{background:"none",border:"none",color:selectedChar.color,padding:"14px 20px",fontSize:11,letterSpacing:3,cursor:"pointer",fontFamily:"'Share Tech Mono',monospace",transition:"all 0.2s",minWidth:90}}>
              {t.send}
            </button>
          </div>
        </div>
      ):(
        <div style={{border:"1px solid #111",padding:48,textAlign:"center",color:"#333",fontFamily:"'Share Tech Mono',monospace",fontSize:13,letterSpacing:2}}>{t.select_suspect}</div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// WALLET SCREEN
// ═══════════════════════════════════════════════════════════════
function WalletScreen({t, tokens, foundCount, unlockedCount, pct}) {
  return (
    <div style={{animation:"fadeInUp 0.4s ease"}}>
      <SectionTitle text={t.wallet_title}/>
      <div style={{position:"relative",border:"1px solid #ff1a3a22",padding:"32px 24px",textAlign:"center",marginBottom:20,background:"linear-gradient(135deg,#0d0000,#080808)",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 80%, #ff1a3a08 0%, transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#ff1a3a,transparent)"}}/>
        <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,letterSpacing:8,color:"#ff1a3a44",marginBottom:8}}>BASE NETWORK</div>
        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"clamp(40px,10vw,72px)",color:"#ffd700",textShadow:"0 0 40px #ffd70044",lineHeight:1}}>{tokens.toLocaleString()}</div>
        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:16,color:"#ff1a3a",letterSpacing:8,marginTop:4}}>TRUTH</div>
        <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#222",marginTop:12}}>0x7734...DEAD · BASE MAINNET</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
        {[{icon:"📁",val:foundCount,label:t.stats_found,color:"#ffd700"},{icon:"🔓",val:unlockedCount,label:t.stats_suspects,color:"#0088ff"},{icon:"📊",val:`${pct}%`,label:t.stats_complete,color:"#ff1a3a"}].map(s=>(
          <div key={s.label} style={{border:"1px solid #1a1a1a",padding:"18px 8px",textAlign:"center",background:"#0a0a0a"}}>
            <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
            <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:24,color:s.color}}>{s.val}</div>
            <div style={{fontSize:9,color:"#444",fontFamily:"'Share Tech Mono',monospace",letterSpacing:1,lineHeight:1.3,marginTop:4}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{border:"1px solid #1a1a1a",padding:"16px 20px",marginBottom:16,background:"#0a0a0a"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:11,fontFamily:"'Share Tech Mono',monospace",color:"#333"}}>
          <span>{t.mission}</span><span style={{color:pct>60?"#ff1a3a":"#00ff88"}}>{pct}% {t.exposed}</span>
        </div>
        <div style={{height:6,background:"#111",borderRadius:3,overflow:"hidden"}}>
          <div style={{width:`${pct}%`,height:"100%",background:"linear-gradient(90deg,#ff1a3a,#ff7700)",borderRadius:3,transition:"width 0.8s ease",boxShadow:"0 0 10px #ff1a3a44"}}/>
        </div>
      </div>
      <div style={{border:"1px solid #1a1a1a",padding:"18px",background:"#080808"}}>
        <div style={{fontSize:10,letterSpacing:4,color:"#333",marginBottom:14,fontFamily:"'Share Tech Mono',monospace"}}>{t.contract_title}</div>
        <pre style={{background:"#030303",border:"1px solid #0f0f0f",padding:16,fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#00ff88",lineHeight:1.9,borderRadius:2,overflow:"auto",whiteSpace:"pre"}}>
{`// TruthToken.sol — Base Network (8453)
contract TruthToken is ERC20, Ownable {
    string public name = "Truth Token";
    string public symbol = "TRUTH";
    uint256 public MAX = 10_000_000e18;
    
    function claimReward(address player,
        string memory evidenceId,
        uint256 amount) external onlyOwner {
        _transfer(address(this), player, amount);
        emit EvidenceFound(player, evidenceId);
    }
    function buyTokens() external payable {
        uint256 amt = msg.value * 10000;
        _transfer(address(this), msg.sender, amt);
    }
}`}
        </pre>
        <div style={{color:"#222",fontSize:10,textAlign:"center",marginTop:12,fontFamily:"'Share Tech Mono',monospace"}}>
          npx hardhat run scripts/deploy.js --network base-sepolia
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function TheNetworkV2() {
  const [lang, setLang]               = useState("FR");
  const t                             = LANGS[lang];
  const [screen, setScreen]           = useState("splash");
  const [tokens, setTokens]           = useState(0);
  const [evidence, setEvidence]       = useState(getEvidence);
  const [characters, setCharacters]   = useState(()=>getCharacters(LANGS["FR"]));
  const [selectedChar, setSelectedChar] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMsg, setInputMsg]       = useState("");
  const [isTyping, setIsTyping]       = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [revealEv, setRevealEv]       = useState(null);
  const [glitch, setGlitch]           = useState(false);
  const chatRef                       = useRef(null);

  // Inject CSS
  useEffect(()=>{
    const inj=document.createElement("style");
    inj.innerHTML=GLOBAL_CSS;
    document.head.appendChild(inj);
    return()=>document.head.removeChild(inj);
  },[]);

  // Update character bios when language changes
  useEffect(()=>{
    setCharacters(getCharacters(t));
  },[lang]);

  // Glitch effect
  useEffect(()=>{
    const iv=setInterval(()=>{setGlitch(true);setTimeout(()=>setGlitch(false),350);},7000);
    return()=>clearInterval(iv);
  },[]);

  // Scroll chat
  useEffect(()=>{if(chatRef.current)chatRef.current.scrollTop=chatRef.current.scrollHeight;},[chatHistory]);

  const addNotif=(msg,type="success")=>{
    const id=Date.now()+Math.random();
    setNotifications(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setNotifications(p=>p.filter(n=>n.id!==id)),3500);
  };

  const earnTokens=(amt,reason)=>{
    setTokens(p=>p+amt);
    addNotif(`+${amt} ◈  ${reason}`,"token");
  };

  const findEvidence=(evId)=>{
    setEvidence(prev=>prev.map(e=>{
      if(e.id===evId&&!e.found){
        setRevealEv(e);
        e.unlocks.forEach(cid=>{
          setCharacters(p=>p.map(c=>c.id===cid?{...c,locked:false}:c));
          addNotif(`🔓 ${cid.toUpperCase()} ${t.notif_unlock}`,"unlock");
        });
        return{...e,found:true};
      }
      return e;
    }));
  };

  const handleRevealDone=()=>{
    if(revealEv){earnTokens(revealEv.reward,revealEv.name);setRevealEv(null);}
  };

  const interrogate=async(char,msg)=>{
    if(!msg.trim())return;
    setChatHistory(p=>[...p,{role:"user",text:msg}]);
    setInputMsg(""); setIsTyping(true);
    const systemMap={
      FR:`Tu es ${char.name}, ${char.title_key} dans l'affaire Goldstein. Role: ${char.role}. Status: ${char.status}. Bio: ${char.bio}. Réponds de manière immersive, cryptique, dramatique. Max 3 phrases. En français.`,
      EN:`You are ${char.name}, ${char.title_key} in the Goldstein affair. Role: ${char.role}. Status: ${char.status}. Bio: ${char.bio}. Respond immersively, cryptically, dramatically. Max 3 sentences. In English.`,
      IT:`Sei ${char.name}, ${char.title_key} nell'affare Goldstein. Ruolo: ${char.role}. Stato: ${char.status}. Bio: ${char.bio}. Rispondi in modo immersivo, criptico, drammatico. Max 3 frasi. In italiano.`,
      ES:`Eres ${char.name}, ${char.title_key} en el caso Goldstein. Rol: ${char.role}. Estado: ${char.status}. Bio: ${char.bio}. Responde de manera inmersiva, críptica, dramática. Max 3 frases. En español.`,
    };
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:1000,
          system:systemMap[lang],
          messages:[
            ...chatHistory.map(m=>({role:m.role==="user"?"user":"assistant",content:m.text})),
            {role:"user",content:msg}
          ]
        })
      });
      const data=await res.json();
      setChatHistory(p=>[...p,{role:"assistant",text:data.content?.[0]?.text||"...",char:char.name}]);
      if(chatHistory.length%4===0)earnTokens(30,"Interrogatoire");
    }catch{
      setChatHistory(p=>[...p,{role:"assistant",text:"... [Signal perdu]",char:char.name}]);
    }
    setIsTyping(false);
  };

  const foundCount    = evidence.filter(e=>e.found).length;
  const unlockedCount = characters.filter(c=>!c.locked).length;
  const pct           = Math.round(foundCount/evidence.length*100);

  if(screen==="splash") return <><ParticleField/><SplashScreen t={t} lang={lang} setLang={setLang} glitch={glitch} onStart={()=>setScreen("intro")}/></>;
  if(screen==="intro")  return <IntroScreen t={t} onStart={()=>{earnTokens(50,"Mission acceptée");setScreen("board");}}/>;

  return (
    <div style={{background:"#050505",minHeight:"100vh",fontFamily:"'Rajdhani',sans-serif",color:"#ddd",position:"relative",maxWidth:"100vw",overflow:"hidden"}}>

      <ParticleField/>

      {/* Scanline sweep */}
      <div style={{position:"fixed",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,#ff1a3a44,transparent)",animation:"scanMove 6s linear infinite",zIndex:9000,pointerEvents:"none"}}/>

      {/* Notifications */}
      <div style={{position:"fixed",top:70,right:12,zIndex:9999,display:"flex",flexDirection:"column",gap:8,maxWidth:260}}>
        {notifications.map(n=>(
          <div key={n.id} style={{background:n.type==="token"?"#1a0a00":"#001a0a",border:`1px solid ${n.type==="token"?"#ffd70066":"#00ff8866"}`,padding:"8px 14px",fontSize:12,fontFamily:"'Share Tech Mono',monospace",color:n.type==="token"?"#ffd700":"#00ff88",animation:"notifSlide 0.3s ease",borderRadius:2}}>
            {n.msg}
          </div>
        ))}
      </div>

      {/* Evidence reveal overlay */}
      {revealEv&&<EvidenceReveal evidence={revealEv} onDone={handleRevealDone} t={t}/>}

      {/* HEADER */}
      <div style={{position:"sticky",top:0,zIndex:500,background:"rgba(5,5,5,0.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid #ff1a3a22",padding:"10px 16px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{flex:1,display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:8,height:8,background:"#ff1a3a",borderRadius:"50%",animation:"pulse 2s infinite",boxShadow:"0 0 10px #ff1a3a"}}/>
          {/* Small logo in header */}
          <img src={ASSETS.logo} alt="THE NETWORK" style={{height:28,filter:"drop-shadow(0 0 8px #ff1a3a66)",animation:glitch?"neonFlicker 0.5s":"none"}}/>
        </div>
        <div className="desktop-header-stats" style={{display:"flex",gap:8,alignItems:"center"}}>
          <StatChip icon="◈" val={`${tokens} TRUTH`} color="#ffd700" onClick={()=>setScreen("wallet")}/>
          <StatChip icon="📁" val={`${foundCount}/${evidence.length}`} color="#ff7700"/>
          <StatChip icon="🔓" val={`${unlockedCount}/${characters.length}`} color="#0088ff"/>
          <div style={{width:60,height:4,background:"#111",borderRadius:2,overflow:"hidden"}}>
            <div style={{width:`${pct}%`,height:"100%",background:pct>80?"#ff1a3a":pct>50?"#ff7700":"#00ff88",transition:"width 0.5s"}}/>
          </div>
        </div>
        <LangSelector lang={lang} setLang={setLang}/>
      </div>

      {/* Mobile stats bar */}
      <div className="mobile-stats-bar" style={{display:"none",background:"#0a0a0a",borderBottom:"1px solid #1a1a1a",padding:"6px 12px",gap:10,fontSize:11,fontFamily:"'Share Tech Mono',monospace"}}>
        <span style={{color:"#ffd700",cursor:"pointer"}} onClick={()=>setScreen("wallet")}>◈ {tokens}</span>
        <span style={{color:"#666"}}>|</span>
        <span style={{color:"#ff7700"}}>📁 {foundCount}/{evidence.length}</span>
        <span style={{color:"#666"}}>|</span>
        <span style={{color:"#0088ff"}}>🔓 {unlockedCount}/{characters.length}</span>
        <span style={{color:"#666"}}>|</span>
        <span style={{color:pct>60?"#ff1a3a":"#00ff88"}}>{pct}%</span>
      </div>

      {/* Desktop Nav */}
      <div className="desktop-nav" style={{display:"none",borderBottom:"1px solid #111",background:"#070707"}}>
        {[["board",`🕸️ ${t.nav_network}`],["evidence",`📁 ${t.nav_evidence}`],["interrogate",`💬 ${t.nav_interrogate}`],["wallet",`◈ ${t.nav_wallet}`]].map(([id,label])=>(
          <button key={id} className="nav-btn" onClick={()=>setScreen(id)} style={{flex:1,padding:"13px 8px",background:screen===id?"#ff1a3a11":"none",border:"none",color:screen===id?"#ff1a3a":"#555",cursor:"pointer",fontSize:12,letterSpacing:3,borderBottom:screen===id?"2px solid #ff1a3a":"2px solid transparent",transition:"all 0.2s",fontFamily:"'Rajdhani',sans-serif",fontWeight:600}}>
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{padding:"16px",maxWidth:960,margin:"0 auto",paddingBottom:80}}>
        {screen==="board"      && <BoardScreen      t={t} characters={characters} evidence={evidence} onSelectChar={c=>{setSelectedChar(c);setScreen("interrogate");setChatHistory([]);}} onFindEvidence={findEvidence}/>}
        {screen==="evidence"   && <EvidenceScreen   t={t} evidence={evidence} onFind={findEvidence}/>}
        {screen==="interrogate"&& <InterrogateScreen t={t} lang={lang} characters={characters} selectedChar={selectedChar} onSelectChar={c=>{setSelectedChar(c);setChatHistory([]);}} chatHistory={chatHistory} inputMsg={inputMsg} setInputMsg={setInputMsg} isTyping={isTyping} onSend={()=>selectedChar&&interrogate(selectedChar,inputMsg)} chatRef={chatRef}/>}
        {screen==="wallet"     && <WalletScreen     t={t} tokens={tokens} foundCount={foundCount} unlockedCount={unlockedCount} pct={pct}/>}
      </div>

      {/* Mobile bottom nav */}
      <div className="mobile-bottom-nav" style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(7,7,7,0.97)",backdropFilter:"blur(12px)",borderTop:"1px solid #1a1a1a",display:"none",zIndex:800,paddingBottom:"env(safe-area-inset-bottom)"}}>
        {[["board","🕸️",t.nav_network],["evidence","📁",t.nav_evidence],["interrogate","💬",t.nav_interrogate],["wallet","◈",t.nav_wallet]].map(([id,icon,label])=>(
          <button key={id} onClick={()=>setScreen(id)} style={{flex:1,padding:"10px 4px 8px",background:"none",border:"none",color:screen===id?"#ff1a3a":"#444",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,fontSize:10,fontFamily:"'Rajdhani',sans-serif",fontWeight:600,letterSpacing:1,borderTop:screen===id?"2px solid #ff1a3a":"2px solid transparent",transition:"all 0.2s"}}>
            <span style={{fontSize:18}}>{icon}</span>
            <span style={{fontSize:9}}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}