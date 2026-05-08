import React, { useEffect, useRef, useState, type CSSProperties } from "react";

/* ── TOKENS ──────────────────────────────────────────────────────────────── */
const C = {
  brick: "#6E2816",
  terracotta: "#A84929",
  ochre: "#8E6818",
  light: "#FAF7F1",
  mid: "#EDE0CB",
  dark: "#180A05",
  body: "#38200F",
  muted: "#745238",
  border: "#CEB99E",
  card: "#FDFAF4",
  wheat: "#BFA060",
  wheatPale: "#E2CEAA",
};
const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";

/* ── A4 PAISAGEM (protótipo + PDF) ───────────────────────────────────────── */
const A4L_W = "297mm";
const A4L_H = "210mm";

/* ── IMAGENS (/assets/) ─────────────────────────────────────────────────── */
const IMG_CAPA = "/assets/Alessandra centralizada mão no rosto.png";
const IMG_DAVIALE = "/assets/Davi e Alessandra fantasiados.png";
const IMG_PALCO1 = "/assets/Alessandra contando histórias 1.jpg";
const IMG_PALCO2 = "/assets/Alessandra contando histórias 2.jpg";
const IMG_NEURODIVERGENT = "/assets/neurodiverso.png";
const TOTAL_PAGES = 9;

/* ── ÍCONE CHECK (formatos cumulativos) ─────────────────────────────────── */
type CheckVariant = "base" | "new";
const IconCheck = ({ variant, onDark }: { variant: CheckVariant; onDark?: boolean }) => {
  const stroke = variant === "new" ? (onDark ? C.wheatPale : C.terracotta) : C.wheat;
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{
        flexShrink: 0,
        marginTop: 2,
        opacity: variant === "new" ? 1 : onDark ? 0.65 : 0.85,
      }}
    >
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/* ── PHOTO SLOT (slides com moldura) ────────────────────────────────────── */
const Slot = ({
  src,
  alt = "",
  h,
  w,
  pos = "top center",
  style = {},
  dark = false,
  radius = 14,
}: {
  src: string | null;
  alt?: string;
  h: number | string;
  w: number | string;
  pos?: string;
  style?: CSSProperties;
  dark?: boolean;
  radius?: number;
}) => {
  const base: CSSProperties = {
    height: h,
    width: w,
    flexShrink: 0,
    display: "block",
    ...style,
  };
  if (src)
    return (
      <img
        src={src}
        alt={alt}
        style={{
          ...base,
          objectFit: "cover",
          objectPosition: pos,
          borderRadius: radius,
        }}
      />
    );
  return (
    <div
      style={{
        ...base,
        borderRadius: radius,
        position: "relative",
        overflow: "hidden",
        background: dark
          ? `linear-gradient(160deg,#2a0e06 0%,${C.brick}88 60%,#1a0804 100%)`
          : `linear-gradient(145deg,${C.mid} 0%,${C.wheatPale} 50%,${C.mid} 100%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${dark ? "#ffffff" : "#745238"}22 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
        }}
      />
      <svg
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          opacity: 0.18,
        }}
        width="42"
        height="42"
        viewBox="0 0 24 24"
        fill="none"
        stroke={dark ? "#fff" : C.muted}
        strokeWidth="1.1"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21,15 16,10 5,21" />
      </svg>
    </div>
  );
};

/* ── ATOMS ───────────────────────────────────────────────────────────────── */
const Lbl = ({ ch, light }: { ch: string; light?: boolean }) => (
  <p
    style={{
      fontFamily: SANS,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.30em",
      textTransform: "uppercase",
      color: light ? C.wheatPale : C.terracotta,
      margin: 0,
    }}
  >
    {ch}
  </p>
);
const Rule = ({ light, w = 56 }: { light?: boolean; w?: number }) => (
  <div
    style={{
      width: w,
      height: 2.5,
      borderRadius: 2,
      backgroundColor: light ? C.wheat : C.terracotta,
    }}
  />
);
const PgNum = ({ n, light, onPhoto }: { n: number; light?: boolean; onPhoto?: boolean }) => (
  <p
    className="mk-pgnum"
    data-on-photo={onPhoto ? "true" : undefined}
    style={{
      fontFamily: SANS,
      fontSize: 10,
      margin: 0,
      position: "absolute",
      bottom: 20,
      right: 28,
      letterSpacing: "0.18em",
      color: onPhoto ? "#FBF8F2" : light ? C.wheatPale : C.muted,
      opacity: onPhoto ? 0.92 : light ? 0.65 : 0.55,
      textShadow: onPhoto ? "0 1px 2px rgba(0,0,0,0.75), 0 0 14px rgba(0,0,0,0.35)" : undefined,
      backgroundColor: onPhoto ? "rgba(24,10,5,0.52)" : "transparent",
      border: onPhoto ? "1px solid rgba(255,255,255,0.2)" : "none",
      borderRadius: onPhoto ? 999 : 0,
      padding: onPhoto ? "3px 9px" : 0,
      WebkitPrintColorAdjust: onPhoto ? "exact" : undefined,
      printColorAdjust: onPhoto ? "exact" : undefined,
    }}
  >
    {String(n).padStart(2, "0")} / {String(TOTAL_PAGES).padStart(2, "0")}
  </p>
);

/* ── S1 · CAPA ───────────────────────────────────────────────────────────── */
const S1 = () => (
  <section
    style={{
      height: "100%",
      width: "100%",
      backgroundColor: C.light,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
    }}
  >
    <div
      style={{
        padding: "48px 44px 48px 52px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <Lbl ch="Encontro de Sensibilização" />
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <h1
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(36px,4.2vw,72px)",
            fontWeight: 700,
            color: C.dark,
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          ALÉM
          <br />
          DAS
          <br />
          APARÊNCIAS
        </h1>
        <Rule w={72} />
        <p
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: "clamp(12px,1.35vw,16px)",
            color: C.body,
            lineHeight: 1.75,
            maxWidth: 300,
            margin: 0,
          }}
        >
          Vivências de uma mãe atípica e o encontro com o autismo pelo olhar materno
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 600, color: C.brick, margin: 0 }}>
          Alessandra Nogueira
        </p>
        <p style={{ fontFamily: SANS, fontSize: 12, color: C.muted, margin: 0 }}>
          Contadora de Histórias · Mãe Atípica
        </p>
      </div>
    </div>

    {/* Coluna direita — fundo claro editorial + bolinhas; foto apoiada na base */}
    <div
      style={{
        margin: 0,
        padding: 0,
        height: "100%",
        width: "100%",
        minHeight: 0,
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        background: `linear-gradient(165deg, ${C.light} 0%, ${C.wheatPale} 45%, ${C.mid} 100%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${C.muted}26 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-8%",
          right: "-6%",
          width: "min(55%, 280px)",
          height: "min(55%, 280px)",
          borderRadius: "50%",
          backgroundColor: C.terracotta,
          opacity: 0.06,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "-4%",
          width: "min(45%, 220px)",
          height: "min(45%, 220px)",
          borderRadius: "50%",
          backgroundColor: C.ochre,
          opacity: 0.07,
          pointerEvents: "none",
        }}
      />
      {IMG_CAPA ? (
        <img
          src={IMG_CAPA}
          alt="Alessandra Nogueira"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
            margin: 0,
            padding: 0,
            display: "block",
            objectFit: "contain",
            objectPosition: "bottom center",
          }}
        />
      ) : (
        <div style={{ position: "relative", zIndex: 1, height: "100%", width: "100%" }}>
          <Slot src={null} alt="" h="100%" w="100%" pos="bottom center" dark={false} radius={0} />
        </div>
      )}
    </div>
    <PgNum n={1} />
  </section>
);

/* ── S2 · O CONVITE (inalterado) ─────────────────────────────────────────── */
const S2 = () => (
  <section
    style={{
      height: "100%",
      width: "100%",
      backgroundColor: C.mid,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 56px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 36,
        fontFamily: SERIF,
        fontSize: 160,
        color: C.terracotta,
        opacity: 0.045,
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      "
    </div>
    <div
      style={{
        maxWidth: 720,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 28,
        position: "relative",
      }}
    >
      <Lbl ch="O Convite" />
      <h2
        style={{
          fontFamily: SERIF,
          fontSize: "clamp(22px,2.8vw,38px)",
          fontWeight: 700,
          color: C.dark,
          lineHeight: 1.22,
          margin: 0,
        }}
      >
        Uma história que começa onde
        <br />
        as palavras ainda não chegaram
      </h2>
      <Rule />
      <p
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: "clamp(13px,1.5vw,17px)",
          color: C.body,
          lineHeight: 1.95,
          maxWidth: 600,
          margin: 0,
        }}
      >
        "Não vim trazer respostas prontas. Vim trazer o que tenho de mais verdadeiro: a minha história — com tudo que ela carrega de dor, de descoberta e de amor."
      </p>
      <p
        style={{
          fontFamily: SANS,
          fontSize: "clamp(12px,1.2vw,14px)",
          color: C.body,
          lineHeight: 1.9,
          maxWidth: 620,
          margin: 0,
        }}
      >
        O projeto nasce da vivência de Alessandra como mãe atípica e se constrói como um encontro humano — onde narrativas, canções e momentos de leveza contam histórias reais do cotidiano: o processo do diagnóstico, os desafios, as descobertas e, sobretudo, os afetos que atravessam essa jornada.
      </p>
      <p
        style={{
          fontFamily: SANS,
          fontSize: "clamp(11px,1.1vw,13px)",
          color: C.muted,
          lineHeight: 1.85,
          maxWidth: 500,
          margin: 0,
        }}
      >
        Mais do que uma palestra informativa, é uma experiência de sensibilização — um espaço em que teoria e vida se encontram, e onde cada pessoa é convidada a simplesmente sentir.
      </p>
    </div>
    <PgNum n={2} />
  </section>
);

/* ── S3 · A JORNADA ──────────────────────────────────────────────────────── */
const leftBorder = {
  paddingLeft: 18,
  borderLeft: `3px solid ${C.terracotta}`,
  display: "flex" as const,
  flexDirection: "column" as const,
  gap: 8,
};
const S3 = () => (
  <section
    style={{
      height: "100%",
      width: "100%",
      backgroundColor: C.light,
      display: "flex",
      alignItems: "center",
      padding: "44px 48px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 44,
        alignItems: "center",
        width: "100%",
        maxWidth: 1040,
        margin: "0 auto",
      }}
    >
      <Slot
        src={IMG_DAVIALE}
        alt="Davi e Alessandra"
        h={400}
        w={260}
        pos="top center"
        style={{ overflow: "hidden" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Lbl ch="A Narradora e a História" />
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(24px,2.6vw,40px)",
              fontWeight: 700,
              color: C.dark,
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Duas histórias.
            <br />
            Uma só luz.
          </h2>
          <Rule />
        </div>

        <div style={leftBorder}>
          <h3 style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 600, color: C.terracotta, margin: 0, fontStyle: "italic" }}>
            Alessandra
          </h3>
          <p
            style={{
              fontFamily: SANS,
              fontSize: "clamp(12px,1.15vw,13.5px)",
              color: C.body,
              lineHeight: 1.85,
              margin: 0,
            }}
          >
            Há mais de vinte anos ela semeia palavras como quem planta jardins invisíveis. Já atravessou cidades, deixando um pouco de si em cada margem e recolhendo histórias como conchas raras. Quando o diagnóstico do filho chegou, encontrou na narrativa a forma mais honesta de atravessá-lo — e transformou a jornada em missão: compartilhar o que viveu para que outras famílias não se sintam tão sozinhas.
          </p>
        </div>

        <div style={{ width: "100%", height: 1, backgroundColor: C.border }} />

        <div style={leftBorder}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
            <h3 style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 600, color: C.terracotta, margin: 0, fontStyle: "italic" }}>
              Davi
            </h3>
            <img
              src={IMG_NEURODIVERGENT}
              alt=""
              aria-hidden
              style={{
                height: 14,
                width: "auto",
                display: "block",
                flexShrink: 0,
              }}
            />
          </div>
          <p
            style={{
              fontFamily: SANS,
              fontSize: "clamp(12px,1.15vw,13.5px)",
              color: C.body,
              lineHeight: 1.85,
              margin: 0,
            }}
          >
            Aos 12 anos, Davi carrega no peito um coração largo — desses que parecem sempre dizer "sim" para o mundo, mesmo quando o mundo ainda está aprendendo a entendê-lo. Seus pensamentos são como um céu cheio de estrelas: intensos, múltiplos, brilhantes. Ele não cabe em rótulos. É um universo em descoberta, com um jeito único de sentir, perceber e amar.
          </p>
        </div>
      </div>
    </div>
    <PgNum n={3} />
  </section>
);

/* ── S4 · A EXPERIÊNCIA ───────────────────────────────────────────────────── */
const benefits = [
  { t: "Escuta que acolhe", d: "Espaço para desacelerar e reconectar com emoções e vínculos." },
  { t: "Histórias que transformam", d: "Narrativas reais com leveza e poesia — voz, música, cotidiano." },
  { t: "Teoria que vira vida", d: "Conhecimento sobre o autismo encontra a experiência vivida." },
  { t: "Ambiente seguro", d: "Sem julgamento: histórias, pausas e respeito às diferenças." },
  { t: "Uma pausa necessária", d: "Convite a sair do automático e olhar com mais cuidado." },
  { t: "Memória que permanece", d: "O que toca de verdade continua ecoando depois do encontro." },
];
const S4 = () => (
  <section
    style={{
      height: "100%",
      width: "100%",
      backgroundColor: C.mid,
      display: "grid",
      gridTemplateColumns: "40% 60%",
      gap: 0,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
      margin: 0,
      padding: 0,
    }}
  >
    <div
      style={{
        height: "100%",
        minHeight: 0,
        margin: 0,
        padding: 0,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#1a0c08",
      }}
    >
      {IMG_PALCO1 ? (
        <img
          src={IMG_PALCO1}
          alt="Alessandra contando histórias"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            margin: 0,
            padding: 0,
          }}
        />
      ) : (
        <Slot src={null} alt="" h="100%" w="100%" pos="center" dark radius={0} />
      )}
    </div>

    <div
      style={{
        padding: "40px 44px 36px 40px",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        boxSizing: "border-box",
        justifyContent: "center",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Lbl ch="A Experiência" />
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(22px,2.6vw,36px)",
            fontWeight: 700,
            color: C.dark,
            lineHeight: 1.18,
            margin: 0,
          }}
        >
          Não é apenas ouvir. É sentir.
        </h2>
        <Rule />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px 20px",
          width: "100%",
        }}
      >
        {benefits.map(({ t, d }, i) => (
          <div
            key={i}
            style={{
              backgroundColor: C.card,
              borderRadius: 12,
              padding: "16px 16px 18px",
              border: `1px solid ${C.border}`,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              minHeight: 0,
            }}
          >
            <h3 style={{ fontFamily: SERIF, fontSize: 14, fontWeight: 600, color: C.dark, margin: 0, lineHeight: 1.3 }}>
              {t}
            </h3>
            <p style={{ fontFamily: SANS, fontSize: 11.5, color: C.body, lineHeight: 1.65, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </div>
    <PgNum n={4} />
  </section>
);

/* ── S5 · O IMPACTO ───────────────────────────────────────────────────────── */
const audiences = [
  {
    t: "Famílias",
    d: "Acolhimento para quem vive a jornada atípica — menos solidão, mais pertencimento.",
  },
  {
    t: "Educadores",
    d: "Mais sensibilidade ao autismo e práticas mais humanas na escola e no dia a dia.",
  },
  {
    t: "Organizações",
    d: "Cultura de inclusão que nasce de histórias reais, não só de normas e protocolos.",
  },
];
const S5 = () => (
  <section
    style={{
      height: "100%",
      width: "100%",
      backgroundColor: C.light,
      display: "grid",
      gridTemplateColumns: "62% 38%",
      gap: 0,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
      margin: 0,
      padding: 0,
    }}
  >
    <div
      style={{
        padding: "34px 30px 34px 44px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        boxSizing: "border-box",
        justifyContent: "center",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 11, maxWidth: 610 }}>
        <Lbl ch="O Impacto" />
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(22px,2.6vw,36px)",
            fontWeight: 700,
            color: C.dark,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Caminhos mais gentis.
        </h2>
        <Rule />
        <p
          style={{
            fontFamily: SANS,
            fontSize: "clamp(11px,1.1vw,13px)",
            color: C.body,
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          Cada palavra nasce de um lugar real — e convida a ver a diferença como cuidado, não como problema a corrigir.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 11, width: "100%", maxWidth: 610, marginTop: 4 }}>
        {audiences.map(({ t, d }, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 7,
              padding: "14px 16px",
              borderLeft: `4px solid ${C.terracotta}`,
              borderTop: `1px solid ${C.border}`,
              borderRight: `1px solid ${C.border}`,
              borderBottom: `1px solid ${C.border}`,
              backgroundColor: "#F5ECDD",
              borderRadius: 12,
            }}
          >
            <h3 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: C.brick, margin: 0 }}>{t}</h3>
            <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.body, lineHeight: 1.72, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </div>

    <div
      style={{
        height: "100%",
        minHeight: 0,
        margin: 0,
        padding: 0,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#1a0c08",
      }}
    >
      {IMG_PALCO2 ? (
        <img
          src={IMG_PALCO2}
          alt="Alessandra em apresentação"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
          }}
        />
      ) : (
        <Slot src={null} alt="" h="100%" w="100%" pos="center center" dark radius={0} />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(0,0,0,0) 68%, rgba(24,10,5,0.55) 100%)",
        }}
      />
    </div>
    <PgNum n={5} onPhoto />
  </section>
);

/* ── S6 · FORMATOS ───────────────────────────────────────────────────────── */
const fmts: Array<{
  n: string;
  title: string;
  dur: string;
  rec: boolean;
  desc: string;
  itens: Array<{ variant: CheckVariant; txt: string }>;
}> = [
  {
    n: "01",
    title: "Sensibilização",
    dur: "até 90 minutos",
    rec: false,
    desc: "Palestra show em narrativa e canções — solo ou duo com músico. Experiência ao vivo para auditórios e espaços coletivos.",
    itens: [
      { variant: "new", txt: "Palestra show com narrativa e canções" },
      { variant: "new", txt: "Formato solo ou duo com músico ao vivo" },
      { variant: "new", txt: "Até 90 minutos em auditórios e espaços coletivos" },
    ],
  },
  {
    n: "02",
    title: "Formação ampliada",
    dur: "Palestra show + encontro",
    rec: false,
    desc: "Após a palestra show, encontro aprofundado com famílias e profissionais da educação e/ou da saúde para levar o vivido à prática.",
    itens: [
      { variant: "base", txt: "Todo o conteúdo da Sensibilização (formato 01)" },
      { variant: "new", txt: "Encontro com profissionais da educação ou da saúde" },
      { variant: "new", txt: "Reflexão guiada e ferramentas para o cotidiano" },
    ],
  },
  {
    n: "03",
    title: "Projeto completo",
    dur: "Programa personalizado",
    rec: true,
    desc: "Jornada contínua para instituições que buscam mudança real na cultura — além do dia do encontro.",
    itens: [
      { variant: "base", txt: "Todo o conteúdo da Formação ampliada (formatos 01 e 02)" },
      { variant: "new", txt: "Encontro dedicado com educadores" },
      { variant: "new", txt: "Roda de conversa com famílias" },
      { variant: "new", txt: "Apoio à rede e acompanhamento" },
    ],
  },
];

const S6 = () => (
  <section
    className="mk-s6"
    style={{
      height: "100%",
      width: "100%",
      backgroundColor: C.mid,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "38px 36px 34px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -46,
        right: -36,
        width: 210,
        height: 210,
        borderRadius: "50%",
        backgroundColor: C.terracotta,
        opacity: 0.06,
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: -58,
        left: -32,
        width: 180,
        height: 180,
        borderRadius: "50%",
        backgroundColor: C.ochre,
        opacity: 0.06,
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        width: "100%",
        maxWidth: 1040,
        display: "grid",
        gridTemplateRows: "auto auto",
        alignItems: "start",
        gap: 28,
        position: "relative",
        zIndex: 1,
        marginTop: 34,
      }}
    >
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 9,
          alignItems: "center",
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        <Lbl ch="Formatos de contratação" />
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(22px,2.6vw,34px)",
            fontWeight: 700,
            color: C.dark,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          A experiência certa
          <br />
          para cada momento.
        </h2>
        <Rule />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 18,
            width: "100%",
            alignItems: "stretch",
          }}
        >
          {fmts.map((f, i) => {
            const isPro = i === 1;
            const variant = f.rec ? "rec" : isPro ? "pro" : "base";
            return (
              <div
                key={i}
                className="mk-s6-card"
                data-variant={variant}
                style={{
                  background: f.rec
                    ? C.brick
                    : isPro
                      ? "#F8F1E2"
                      : C.card,
                  borderRadius: 18,
                  padding: "22px 20px 18px",
                  border: f.rec ? `1px solid ${C.wheat}28` : isPro ? `1.5px solid ${C.wheat}88` : `1px solid ${C.border}`,
                  boxShadow: f.rec
                    ? "0 10px 32px rgba(24,10,5,0.22)"
                    : isPro
                      ? "0 14px 34px rgba(110,40,22,0.18)"
                      : "0 10px 28px rgba(24,10,5,0.07)",
                  transform: "none",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  className="mk-s6-card-tail"
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -4,
                    fontFamily: SERIF,
                    fontSize: 76,
                    fontWeight: 700,
                    color: f.rec ? "#fff" : isPro ? C.ochre : C.terracotta,
                    opacity: isPro ? 0.1 : 0.055,
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {f.n}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 5, position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <span
                      style={{
                        fontFamily: SANS,
                        fontSize: 9.5,
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: f.rec ? C.wheatPale : isPro ? C.ochre : C.terracotta,
                      }}
                    >
                      {f.n}
                    </span>
                    {f.rec && (
                      <span
                        style={{
                          fontFamily: SANS,
                          fontSize: 8,
                          fontWeight: 700,
                          color: C.brick,
                          backgroundColor: C.wheat,
                          padding: "2px 9px",
                          borderRadius: 20,
                          letterSpacing: "0.07em",
                          textTransform: "uppercase",
                        }}
                      >
                        Recomendado
                      </span>
                    )}
                  </div>
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontSize: 20,
                      fontWeight: 700,
                      color: f.rec ? "#FBF8F2" : isPro ? "#2E1A0B" : C.dark,
                      margin: 0,
                      lineHeight: 1.18,
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: 10.5,
                      fontWeight: 600,
                      color: f.rec ? C.wheat : isPro ? "#7A5522" : C.terracotta,
                      margin: 0,
                      letterSpacing: "0.03em",
                    }}
                  >
                    ⏱ {f.dur}
                  </p>
                </div>

                <div style={{ width: 28, height: 2.5, backgroundColor: f.rec ? C.wheat : isPro ? C.ochre : C.terracotta, borderRadius: 1 }} />

                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: 12,
                    color: f.rec ? "#E8D0B0" : isPro ? "#3A2513" : C.body,
                    lineHeight: 1.62,
                    margin: 0,
                    fontWeight: isPro ? 500 : 400,
                  }}
                >
                  {f.desc}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                    marginTop: 6,
                    paddingTop: 12,
                    borderTop: `1px solid ${f.rec ? C.wheat + "38" : isPro ? "#B58B4A88" : C.border}`,
                    backgroundColor: f.rec ? "rgba(0,0,0,0.14)" : isPro ? "#F8F1E2" : "rgba(253,250,244,0.95)",
                    marginLeft: -20,
                    marginRight: -20,
                    marginBottom: -18,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingBottom: 12,
                    borderRadius: "0 0 16px 16px",
                  }}
                >
                  {f.itens.map(({ variant, txt }, j) => (
                    <div
                      key={j}
                      className="mk-s6-item-row"
                      style={{
                        display: "flex",
                        gap: 9,
                        alignItems: "flex-start",
                        padding: "5px 0",
                        borderBottom: j < f.itens.length - 1 ? `1px solid ${f.rec ? "#ffffff18" : isPro ? "#B58B4A55" : C.border + "99"}` : "none",
                      }}
                    >
                      <IconCheck variant={variant} onDark={f.rec} />
                      <span
                        style={{
                          fontFamily: SANS,
                          fontSize: 11.5,
                          color: variant === "new" ? (f.rec ? C.wheatPale : isPro ? "#2E1A0B" : C.body) : f.rec ? "#C8A870" : isPro ? "#7A5522" : C.muted,
                          lineHeight: 1.5,
                          fontWeight: variant === "new" ? (isPro ? 600 : 500) : 400,
                        }}
                      >
                        {txt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    <PgNum n={6} />
  </section>
);

/* ── S7 · QUEM JÁ CONFIOU ─────────────────────────────────────────────────── */
const trustedBy = [
  "/assets/instituicoes/CCBB.jpg",
  "/assets/instituicoes/Colegio Batista Mineiro.png",
  "/assets/instituicoes/Colegio Loyola.png",
  "/assets/instituicoes/Colegio Magnum.png",
  "/assets/instituicoes/Colegio Marista Dom Silverio.jpg",
  "/assets/instituicoes/Colegio Santa Marcelina Belo Horizonte.png",
  "/assets/instituicoes/Colegio Buritis Agostiniano.png",
  "/assets/instituicoes/Colegio Santo Antonio.png",
  "/assets/instituicoes/Colegio Santo Agostinho Agostinianos.jpg",
  "/assets/instituicoes/Companhia das Letras.jpg",
  "/assets/instituicoes/FTD EDUCACAO.png",
  "/assets/instituicoes/SESI.png",
  "/assets/instituicoes/Santa Doroteia.png",
  "/assets/instituicoes/boni consilii.jpg",
  "/assets/instituicoes/sesc.jpg",
];

const S7 = () => (
  <section
    style={{
      height: "100%",
      width: "100%",
      backgroundColor: C.light,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "34px 42px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div style={{ width: "100%", maxWidth: 1080, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10 }}>
        <Lbl ch="Prova de confiança" />
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(24px,2.9vw,40px)",
            fontWeight: 700,
            color: C.dark,
            lineHeight: 1.18,
            margin: 0,
          }}
        >
          Quem já caminhou com essa história.
        </h2>
        <Rule />
        <p style={{ fontFamily: SANS, fontSize: 12, color: C.body, lineHeight: 1.7, margin: 0, maxWidth: 680 }}>
          Escolas, instituições culturais e organizações que confiaram no trabalho da Alessandra para abrir conversas mais humanas sobre inclusão.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 14,
          width: "100%",
        }}
      >
        {trustedBy.map((src, i) => (
          <div
            key={i}
            className="mk-logo-cell"
            style={{
              backgroundColor: "#fff",
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              height: 78,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 12px",
            }}
          >
            <img
              src={src}
              alt="Instituição parceira"
              className="mk-inst-logo"
              decoding="async"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                filter: "saturate(0.85) contrast(1.02)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
    <PgNum n={7} />
  </section>
);

/* ── S8 · VOZES DE QUEM VIVEU ─────────────────────────────────────────────── */
const socialProof: Array<{ quote: string; author: string; role?: string }> = [
  {
    quote:
      "Simplesmente a melhor contadora de histórias. De uma delicadeza e inteligência que prende a atenção de todos, com tanta cultura e sabedoria em fazer histórias virarem lições.",
    author: "Thais Costa",
  },
  {
    quote:
      "Alessandra, parabéns pelo momento maravilhoso e tão enriquecedor que nos proporcionou. Foi encantador ouvir você contar as histórias e nos fazer viajar através delas.",
    author: "Rosangela",
  },
  {
    quote: "Sempre com uma palavra que fala aos nossos corações. Você é sensacional!",
    author: "EMEI Floramar",
    role: "Instituição de ensino",
  },
];

const S8 = () => (
  <section
    style={{
      height: "100%",
      width: "100%",
      backgroundColor: C.mid,
      display: "grid",
      gridTemplateColumns: "42% 58%",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div style={{ position: "relative", backgroundColor: "#1f0d08", overflow: "hidden" }}>
      <Slot src="/assets/AlessandraVestidoEscada.png" alt="Alessandra sorrindo" h="100%" w="100%" pos="center top" dark radius={0} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.34) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>

    <div
      style={{
        padding: "34px 42px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 580 }}>
        <Lbl ch="Palavras que acolhem" />
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(24px,2.8vw,38px)",
            fontWeight: 700,
            color: C.dark,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Vozes de quem já viveu esse encontro.
        </h2>
        <Rule />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
        {socialProof.map(({ quote, author, role }, i) => (
          <blockquote
            key={i}
            style={{
              margin: 0,
              padding: "14px 18px 13px",
              borderRadius: 12,
              backgroundColor: C.card,
              border: `1px solid ${C.border}`,
              fontFamily: SERIF,
              fontSize: 16.5,
              color: C.body,
              lineHeight: 1.58,
              fontStyle: "italic",
            }}
          >
            <span style={{ display: "block" }}>“{quote}”</span>
            <cite
              style={{
                display: "block",
                marginTop: 10,
                fontFamily: SANS,
                fontStyle: "normal",
                fontSize: 10.5,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: C.muted,
              }}
            >
              {author}
              {role ? ` · ${role}` : ""}
            </cite>
          </blockquote>
        ))}
      </div>
    </div>
    <PgNum n={8} />
  </section>
);

/* ── S9 · CONTATO ─────────────────────────────────────────────────────────── */
const WA_NUMBER = "5531993701428";
const ctaItems = [
  {
    href: `https://wa.me/${WA_NUMBER}`,
    label: "+55 31 99370-1428",
    sub: "WhatsApp",
    color: "#25D366",
    blank: true,
    ico: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    href: "mailto:alessandracontadoradehistorias@gmail.com",
    label: "alessandracontadoradehistorias@gmail.com",
    sub: "E-mail",
    color: C.wheat,
    blank: false,
    ico: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M22 7 12 13 2 7" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/alessandracontadoradehistorias/",
    label: "@alessandracontadoradehistorias",
    sub: "Instagram",
    color: "#E0A0C0",
    blank: true,
    ico: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const S9 = () => (
  <section
    style={{
      height: "100%",
      width: "100%",
      backgroundColor: C.brick,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 28,
      padding: "40px 48px",
      boxSizing: "border-box",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div style={{ position: "absolute", top: -80, left: -80, width: 280, height: 280, borderRadius: "50%", backgroundColor: C.terracotta, opacity: 0.1, pointerEvents: "none" }} />
    <div style={{ position: "absolute", bottom: -60, right: -60, width: 240, height: 240, borderRadius: "50%", backgroundColor: C.ochre, opacity: 0.08, pointerEvents: "none" }} />

    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", position: "relative", maxWidth: 520 }}>
      <Lbl ch="Contato" light />
      <h2
        style={{
          fontFamily: SERIF,
          fontSize: "clamp(26px,3.2vw,48px)",
          fontWeight: 700,
          color: "#FBF8F2",
          lineHeight: 1.12,
          margin: 0,
        }}
      >
        Vamos construir caminhos gentis juntos?
      </h2>
      <Rule light w={48} />
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 420, position: "relative" }}>
      {ctaItems.map(({ href, label, sub, color, blank, ico }, i) => (
        <a
          key={i}
          href={href}
          target={blank ? "_blank" : undefined}
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 20px",
            borderRadius: 12,
            textDecoration: "none",
            backgroundColor: "rgba(255,255,255,0.06)",
            border: `1px solid ${color}44`,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              flexShrink: 0,
              backgroundColor: `${color}1A`,
              border: `1.5px solid ${color}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color,
            }}
          >
            {ico}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2, textAlign: "left" }}>
            <span
              style={{
                fontFamily: SANS,
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: `${color}BB`,
              }}
            >
              {sub}
            </span>
            <span
              style={{
                fontFamily: SANS,
                fontSize: "clamp(11px,1.1vw,13px)",
                color: "#F0E4CC",
                fontWeight: 500,
                wordBreak: "break-word",
                lineHeight: 1.35,
              }}
            >
              {label}
            </span>
          </div>
        </a>
      ))}
    </div>

    <div
      style={{
        position: "absolute",
        bottom: 22,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: 14,
        width: "min(92%, 440px)",
        padding: "0 8px",
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          minWidth: 20,
          backgroundColor: C.wheat,
          opacity: 0.38,
        }}
      />
      <p
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 11,
          color: C.wheat,
          opacity: 0.52,
          margin: 0,
          flexShrink: 0,
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
        }}
      >
        Além das Aparências - Alessandra Nogueira
      </p>
      <div
        style={{
          flex: 1,
          height: 1,
          minWidth: 20,
          backgroundColor: C.wheat,
          opacity: 0.38,
        }}
      />
    </div>
    <PgNum n={9} light />
  </section>
);

/* ── PRINT + FRAME (PDF A4 paisagem) ─────────────────────────────────────── */
const PrintCSS = () => {
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      @media print {
        @page { size: A4 landscape; margin: 0; }
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: #faf7f1 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        nav { display: none !important; }
        .mk-root {
          padding: 0 !important;
          margin: 0 !important;
          background: transparent !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .mk-slides {
          padding: 0 !important;
          padding-top: 0 !important;
          margin: 0 !important;
          background: transparent !important;
        }
        .slide-wrap {
          page-break-after: always;
          break-after: page;
          page-break-inside: avoid;
          break-inside: avoid;
          margin: 0 !important;
          padding: 0 !important;
          display: block !important;
          background: transparent !important;
        }
        .slide-wrap:last-child {
          page-break-after: auto;
          break-after: auto;
        }
        .slide-frame {
          width: ${A4L_W} !important;
          height: ${A4L_H} !important;
          max-width: none !important;
          aspect-ratio: auto !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          border: none !important;
          outline: none !important;
          page-break-inside: avoid;
          break-inside: avoid;
          position: relative;
          vertical-align: top;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        /* Uma única quebra por lâmina: evita “faixa” clara entre frames (Chrome/Chromium PDF). */
        .slide-frame {
          page-break-after: auto !important;
          break-after: auto !important;
        }
        .slide-frame section {
          overflow: hidden !important;
          width: ${A4L_W} !important;
          height: calc(${A4L_H} + 0.8mm) !important;
          min-height: calc(${A4L_H} + 0.8mm) !important;
          max-height: calc(${A4L_H} + 0.8mm) !important;
          box-sizing: border-box !important;
          margin: 0 0 -0.8mm 0 !important;
          padding: 0 !important;
          outline: 1px solid transparent !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        img,
        picture,
        canvas {
          max-width: 100%;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: high-quality;
          filter: none !important;
          backface-visibility: hidden;
        }
        .mk-inst-logo {
          filter: none !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          image-rendering: auto;
        }
        .mk-logo-cell {
          height: 92px !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .mk-pgnum {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        /* iOS PDF renderer hardening (Slide 6 cards only). */
        .mk-s6 .mk-s6-card {
          box-shadow: none !important;
          filter: none !important;
          background-image: none !important;
        }
        .mk-s6 .mk-s6-card[data-variant="base"] {
          background: ${C.card} !important;
          border-color: ${C.border} !important;
        }
        .mk-s6 .mk-s6-card[data-variant="pro"] {
          background: #F8F1E2 !important;
          border-color: #D6B57D !important;
        }
        .mk-s6 .mk-s6-card[data-variant="rec"] {
          background: ${C.brick} !important;
          border-color: ${C.wheat} !important;
        }
        .mk-s6 .mk-s6-card-tail {
          background-image: none !important;
        }
        .mk-s6 .mk-s6-card[data-variant="base"] .mk-s6-card-tail {
          background: ${C.card} !important;
          border-top-color: ${C.border} !important;
        }
        .mk-s6 .mk-s6-card[data-variant="pro"] .mk-s6-card-tail {
          background: #F8F1E2 !important;
          border-top-color: #C49D60 !important;
        }
        .mk-s6 .mk-s6-card[data-variant="rec"] .mk-s6-card-tail {
          background: #5C2617 !important;
          border-top-color: ${C.wheat} !important;
        }
        .mk-s6 .mk-s6-item-row {
          border-bottom-color: currentColor !important;
        }
        .mk-s6 .mk-s6-card[data-variant="base"] .mk-s6-item-row {
          border-bottom-color: ${C.border} !important;
        }
        .mk-s6 .mk-s6-card[data-variant="pro"] .mk-s6-item-row {
          border-bottom-color: #C49D60 !important;
        }
        .mk-s6 .mk-s6-card[data-variant="rec"] .mk-s6-item-row {
          border-bottom-color: #B58B4A !important;
        }
      }
      @media screen {
        .slide-wrap {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          margin: 0 auto 20px;
          padding: 0 12px;
        }
        .slide-frame {
          width: min(96vw, calc((100svh - 120px) * 297 / 210));
          aspect-ratio: 297 / 210;
          height: auto;
          max-width: 1400px;
          margin: 0 auto;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(24,10,5,0.12);
          border-radius: 4px;
          background: ${C.light};
        }
        .slide-frame section {
          min-height: 0 !important;
          height: 100% !important;
        }
      }
    `;
    document.head.appendChild(s);
    return () => {
      try {
        document.head.removeChild(s);
      } catch {
        /* noop */
      }
    };
  }, []);
  return null;
};

const SLIDES = [
  { lbl: "Capa", C: S1 },
  { lbl: "O Convite", C: S2 },
  { lbl: "A Jornada", C: S3 },
  { lbl: "A Experiência", C: S4 },
  { lbl: "O Impacto", C: S5 },
  { lbl: "Formatos", C: S6 },
  { lbl: "Quem já confiou", C: S7 },
  { lbl: "Depoimentos", C: S8 },
  { lbl: "Contato", C: S9 },
];

export default function App() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap";
    document.head.appendChild(l);
    return () => {
      try {
        document.head.removeChild(l);
      } catch {
        /* noop */
      }
    };
  }, []);

  useEffect(() => {
    const obs = refs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setActive(i);
      }, { threshold: 0.35 });
      o.observe(el);
      return o;
    });
    return () => obs.forEach((o) => o?.disconnect());
  }, []);

  const go = (i: number) => refs.current[i]?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="mk-root" style={{ fontFamily: SANS, backgroundColor: "#e8e4dc", minHeight: "100vh" }}>
      <PrintCSS />
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "rgba(250,247,241,0.96)",
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
        }}
      >
        <span style={{ fontFamily: SERIF, fontSize: 13, fontWeight: 600, color: C.brick, letterSpacing: "0.02em" }}>
          Alessandra Nogueira · Além das Aparências
        </span>
        <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {SLIDES.map(({ lbl }, i) => (
            <button
              key={lbl}
              type="button"
              onClick={() => go(i)}
              style={{
                padding: "4px 10px",
                borderRadius: 20,
                cursor: "pointer",
                fontFamily: SANS,
                fontSize: 10,
                fontWeight: active === i ? 600 : 400,
                border: `1px solid ${active === i ? C.brick : C.border}`,
                backgroundColor: active === i ? C.brick : "transparent",
                color: active === i ? "#FAF7F1" : C.muted,
                transition: "all 0.2s ease",
              }}
            >
              {lbl}
            </button>
          ))}
        </div>
      </nav>

      <div className="mk-slides" style={{ paddingTop: 52 }}>
        {SLIDES.map(({ C: Comp, lbl }, i) => (
          <div key={lbl} className="slide-wrap" ref={(el) => { refs.current[i] = el; }}>
            <div className="slide-frame">
              <Comp />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
