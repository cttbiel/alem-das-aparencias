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
const IMG_DAVIALE = "/assets/Davi e Alessandra fantasiados.jpg";
const IMG_PALCO1 = "/assets/Alessandra contando histórias 1.jpg";
const IMG_PALCO2 = "/assets/Alessandra contando histórias 2.jpg";

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
const PgNum = ({ n, light }: { n: number; light?: boolean }) => (
  <p
    style={{
      fontFamily: SANS,
      fontSize: 10,
      margin: 0,
      position: "absolute",
      bottom: 20,
      right: 28,
      letterSpacing: "0.18em",
      color: light ? C.wheatPale : C.muted,
      opacity: light ? 0.65 : 0.55,
    }}
  >
    {String(n).padStart(2, "0")} / 07
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

    {/* Coluna direita — imagem full-bleed, base alinhada */}
    <div
      style={{
        margin: 0,
        padding: 0,
        height: "100%",
        width: "100%",
        minHeight: 0,
        backgroundColor: "#130603",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 240,
          height: 240,
          borderRadius: "50%",
          backgroundColor: C.terracotta,
          opacity: 0.07,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: 180,
          height: 180,
          borderRadius: "50%",
          backgroundColor: C.ochre,
          opacity: 0.07,
        }}
      />
      {IMG_CAPA ? (
        <img
          src={IMG_CAPA}
          alt="Alessandra Nogueira"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            margin: 0,
            padding: 0,
            display: "block",
            objectFit: "cover",
            objectPosition: "bottom center",
          }}
        />
      ) : (
        <Slot src={null} alt="" h="100%" w="100%" pos="bottom center" dark radius={0} />
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
          <h3 style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 600, color: C.brick, margin: 0, fontStyle: "italic" }}>
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
          <h3 style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 600, color: C.terracotta, margin: 0, fontStyle: "italic" }}>
            Davi
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
      gridTemplateColumns: "1fr 38%",
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
        padding: "36px 36px 36px 44px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxSizing: "border-box",
        justifyContent: "center",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 640 }}>
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

      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 640 }}>
        {audiences.map(({ t, d }, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: "16px 18px",
              borderTop: `3px solid ${C.terracotta}`,
              backgroundColor: C.mid,
              borderRadius: "0 0 12px 12px",
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
            objectPosition: "center right",
            display: "block",
          }}
        />
      ) : (
        <Slot src={null} alt="" h="100%" w="100%" pos="center right" dark radius={0} />
      )}
    </div>
    <PgNum n={5} />
  </section>
);

/* ── S6 · FORMATOS ───────────────────────────────────────────────────────── */
const fmts: Array<{
  n: string;
  title: string;
  dur: string;
  rec: boolean;
  sub: string;
  desc: string;
  itens: Array<{ variant: CheckVariant; txt: string }>;
}> = [
  {
    n: "01",
    title: "Sensibilização",
    dur: "até 90 minutos",
    rec: false,
    sub: "Inclui",
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
    sub: "Inclui tudo da Sensibilização, mais",
    desc: "Após a palestra show, encontro aprofundado com profissionais da educação ou da saúde para levar o vivido à prática.",
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
    sub: "Inclui tudo da Formação ampliada, mais",
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
    style={{
      height: "100%",
      width: "100%",
      backgroundColor: C.mid,
      display: "flex",
      flexDirection: "column",
      gap: 20,
      alignItems: "center",
      padding: "32px 36px 28px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      <Lbl ch="Formatos de contratação" />
      <h2
        style={{
          fontFamily: SERIF,
          fontSize: "clamp(20px,2.4vw,32px)",
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
      <p style={{ fontFamily: SANS, fontSize: 11, color: C.muted, lineHeight: 1.65, maxWidth: 480, margin: 0 }}>
        Cada formato amplia o anterior. O traço mais claro indica o que é novidade naquele nível; o mais suave reforça o que já veio antes.
      </p>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 14,
        width: "100%",
        maxWidth: 1020,
        alignItems: "stretch",
        flex: 1,
        minHeight: 0,
      }}
    >
      {fmts.map((f, i) => (
        <div
          key={i}
          style={{
            backgroundColor: f.rec ? C.brick : C.card,
            borderRadius: 14,
            padding: "22px 18px",
            border: f.rec ? "none" : `1px solid ${C.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            position: "relative",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -10,
              right: -2,
              fontFamily: SERIF,
              fontSize: 72,
              fontWeight: 700,
              color: f.rec ? "#fff" : C.terracotta,
              opacity: 0.055,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            {f.n}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: f.rec ? C.wheatPale : C.terracotta,
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
                    padding: "2px 8px",
                    borderRadius: 20,
                    letterSpacing: "0.08em",
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
                fontSize: 18,
                fontWeight: 700,
                color: f.rec ? "#FBF8F2" : C.dark,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {f.title}
            </h3>
            <p
              style={{
                fontFamily: SANS,
                fontSize: 10,
                fontWeight: 600,
                color: f.rec ? C.wheat : C.terracotta,
                margin: 0,
                letterSpacing: "0.04em",
              }}
            >
              ⏱ {f.dur}
            </p>
          </div>

          <div style={{ width: 24, height: 2, backgroundColor: f.rec ? C.wheat : C.terracotta }} />

          <p
            style={{
              fontFamily: SANS,
              fontSize: 11.5,
              color: f.rec ? "#E8D0B0" : C.body,
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {f.desc}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              borderTop: `1px solid ${f.rec ? C.wheat + "33" : C.border}`,
              paddingTop: 10,
              marginTop: "auto",
            }}
          >
            <p
              style={{
                fontFamily: SANS,
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: f.rec ? C.wheat : C.muted,
                margin: "0 0 6px",
              }}
            >
              {f.sub}
            </p>
            {f.itens.map(({ variant, txt }, j) => (
              <div
                key={j}
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                  padding: "4px 0",
                  borderBottom: j < f.itens.length - 1 ? `1px solid ${f.rec ? "#ffffff11" : C.border + "88"}` : "none",
                }}
              >
                <IconCheck variant={variant} onDark={f.rec} />
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: 11.5,
                    color: variant === "new" ? (f.rec ? C.wheatPale : C.body) : f.rec ? "#C8A870" : C.muted,
                    lineHeight: 1.5,
                    fontWeight: variant === "new" ? 500 : 400,
                  }}
                >
                  {txt}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <PgNum n={6} />
  </section>
);

/* ── S7 · CONTATO ─────────────────────────────────────────────────────────── */
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

const S7 = () => (
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
        gap: 12,
        alignItems: "center",
        whiteSpace: "nowrap",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: "90%",
      }}
    >
      <div style={{ width: 24, height: 1, backgroundColor: C.wheat, opacity: 0.28 }} />
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 11, color: C.wheat, opacity: 0.5, margin: 0 }}>
        —— Além das Aparências, Alessandra Nogueira ——
      </p>
      <div style={{ width: 24, height: 1, backgroundColor: C.wheat, opacity: 0.28 }} />
    </div>
    <PgNum n={7} light />
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
        html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
        nav { display: none !important; }
        .mk-root { padding: 0 !important; background: #fff !important; }
        .mk-slides { padding: 0 !important; padding-top: 0 !important; }
        .slide-wrap {
          page-break-after: always;
          break-after: page;
          margin: 0 !important;
          padding: 0 !important;
          display: block !important;
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
          page-break-after: always;
          break-after: page;
        }
        .slide-frame section {
          min-height: 0 !important;
          height: 100% !important;
          overflow: hidden !important;
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
  { lbl: "Contato", C: S7 },
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
