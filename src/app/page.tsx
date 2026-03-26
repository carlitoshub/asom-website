import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects = await getAllProjects();
  const featured = projects.slice(0, 4);

  return (
    <div className="flex flex-col">

      {/* ── HERO ── */}
      <section className="relative w-full h-screen flex flex-col justify-end pb-20 px-6 md:px-10 overflow-hidden bg-background">
        {/* Big ASOM background */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden
        >
          <span
            style={{
              fontSize: "clamp(160px, 32vw, 480px)",
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 700,
              color: "rgba(255,255,255,0.03)",
              letterSpacing: "0.05em",
              lineHeight: 1,
            }}
          >
            ASOM
          </span>
        </div>

        {/* Hero text */}
        <div className="relative z-10 max-w-3xl">
          <p
            style={{
              fontSize: "clamp(13px, 1vw, 14px)",
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 500,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "24px",
            }}
          >
            Progress Is Inevitable
          </p>
          <h1
            style={{
              fontSize: "clamp(36px, 5.5vw, 80px)",
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              color: "rgb(255,255,255)",
            }}
          >
            Visualize what you'll become.
            <br />
            Chase it, lose it, find it,
            <br />
            chase it again.
          </h1>
          <div style={{ marginTop: "40px" }}>
            <Link
              href="https://forms.asom.space/entertheforge"
              target="_blank"
              style={{
                display: "inline-block",
                fontSize: "13px",
                fontFamily: "Satoshi, sans-serif",
                fontWeight: 500,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "12px 24px",
                color: "white",
                transition: "border-color 0.2s",
              }}
            >
              Be Part of The Forge
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ backgroundColor: "rgb(255,255,255)", color: "rgb(15,14,14)" }}>
        <div
          style={{
            maxWidth: "1800px",
            margin: "0 auto",
            padding: "80px 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* Left card */}
          <div
            style={{
              backgroundColor: "rgb(0,0,0)",
              borderRadius: "20px",
              padding: "48px 40px",
              display: "flex",
              flexDirection: "column",
              gap: "80px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <h2
                style={{
                  fontSize: "clamp(32px, 4vw, 80px)",
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.9,
                  color: "white",
                }}
              >
                We are many, our talents are infectious. We need someone to infect.
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  lineHeight: "1.4",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                  maxWidth: "480px",
                }}
              >
                ASOM is a forge of over 100 polidisciplinary artists that value the progress of modern art forms over anything. The sole purpose of ASOM is to include every niche and branch of creativity possible.
              </p>
              <Link
                href="https://forms.asom.space/entertheforge"
                target="_blank"
                style={{
                  display: "inline-block",
                  fontSize: "13px",
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(255,255,255,0.25)",
                  padding: "12px 24px",
                  color: "white",
                  width: "fit-content",
                }}
              >
                Be Part of The Forge
              </Link>
            </div>
            <div>
              <p
                style={{
                  fontSize: "13px",
                  fontFamily: "Satoshi, sans-serif",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "12px",
                }}
              >
                Creatives In The Forge
              </p>
              <p
                style={{
                  fontSize: "13px",
                  fontFamily: "Satoshi, sans-serif",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: "2",
                }}
              >
                Graphic Design<strong style={{ color: "white" }}>ERS</strong> · Visual Artist · Art Direc<strong style={{ color: "white" }}>TORS</strong> · Fashion Design<strong style={{ color: "white" }}>ERS</strong> · Narrative Design<strong style={{ color: "white" }}>ERS</strong> · Multimedia · Stylist<strong style={{ color: "white" }}>S</strong> · Typograph<strong style={{ color: "white" }}>ERS</strong> · Graffiti Artists · UX/UI Design<strong style={{ color: "white" }}>ERS</strong>
              </p>
            </div>
          </div>

          {/* Right — ASOM large wordmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
            }}
          >
            <span
              style={{
                fontSize: "clamp(80px, 12vw, 180px)",
                fontFamily: "Satoshi, sans-serif",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "rgb(15,14,14)",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
                userSelect: "none",
              }}
            >
              ASOM
            </span>
          </div>
        </div>
      </section>

      {/* ── THE ARTIST FORGE ── */}
      <section
        style={{
          backgroundColor: "rgb(15,14,14)",
          padding: "80px 40px",
          maxWidth: "100%",
        }}
      >
        <div style={{ maxWidth: "1800px", margin: "0 auto" }}>
          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "48px",
              paddingBottom: "40px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(40px, 5vw, 80px)",
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.9,
                  color: "white",
                }}
              >
                The Artist Forge
              </h2>
              <p
                style={{
                  marginTop: "16px",
                  fontSize: "13px",
                  fontFamily: "Satoshi, sans-serif",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                Check the latest entries in the ASOM archive
              </p>
            </div>
            <Link
              href="/theforge"
              style={{
                fontSize: "13px",
                fontFamily: "Satoshi, sans-serif",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "10px 20px",
                color: "white",
                whiteSpace: "nowrap",
              }}
            >
              See Them All
            </Link>
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "40px",
            }}
          >
            {featured.map((project) => (
              <Link
                key={project._id}
                href={`/theforge/${project.slug}`}
                style={{ display: "flex", flexDirection: "column", gap: "16px", textDecoration: "none" }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    borderRadius: "12px",
                    overflow: "hidden",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  {project.profilePic && (
                    <Image
                      src={urlFor(project.profilePic).width(500).height(500).url()}
                      alt={project.artistName}
                      fill
                      style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                    />
                  )}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      fontFamily: "Satoshi, sans-serif",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      textTransform: "uppercase",
                      color: "white",
                    }}
                  >
                    {project.artistName}
                  </p>
                  <p
                    style={{
                      marginTop: "4px",
                      fontSize: "12px",
                      fontFamily: "Satoshi, sans-serif",
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {project.creativeRole}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
