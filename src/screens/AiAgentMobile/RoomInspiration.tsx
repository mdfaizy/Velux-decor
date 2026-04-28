import React from "react";
import { ROOM_SCENES } from "./data";
import { useState } from "react";
interface RoomScene {
  id: string;
  label: string;
  image: string;
  tag: string;
}

interface RoomInspirationProps {
  // roomRef: (node?: Element | null | undefined) => void;
  // roomInView: boolean;
  // ROOM_SCENES: RoomScene[];
  // activeRoom: string;
  // setActiveRoom: (id: string) => void;
  // scrollTo: (id: string) => void;
  // setBookingOpen: (open: boolean) => void;

  roomRef: (node?: Element | null) => void;
  roomInView: boolean;
  scrollTo: (id: string) => void;
  setBookingOpen: (open: boolean) => void;
}

export const RoomInspiration: React.FC<RoomInspirationProps> = ({
  roomRef,
  roomInView,
  // ROOM_SCENES,
  // activeRoom,
  // setActiveRoom,
  scrollTo,
  setBookingOpen,
}) => {
  const [activeRoom, setActiveRoom] = useState(ROOM_SCENES[0].id);
  console.log("ROOM_SCENES:", ROOM_SCENES);
  const activeRoomScene =
  ROOM_SCENES?.find((r) => r.id === activeRoom) || ROOM_SCENES?.[0];
  return (
    <section
      id="rooms"
      ref={roomRef}
      style={{ padding: "110px 0", background: "#FAF7F2" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          {/* Left: text + tabs */}
          <div
            style={{
              opacity: roomInView ? 1 : 0,
              transform: roomInView ? "translateX(0)" : "translateX(-24px)",
              transition: "all 0.9s ease",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(201,168,76,0.1)",
                borderRadius: 30,
                padding: "6px 18px",
                marginBottom: 24,
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#C9A84C",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Shop by Room
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(28px,3.5vw,50px)",
                fontWeight: 700,
                color: "#3D2B1F",
                marginBottom: 16,
                lineHeight: 1.1,
              }}
            >
              Find the Perfect Look
              <br />
              for Every Space
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: "#6B4C3B",
                marginBottom: 44,
                maxWidth: 420,
              }}
            >
              Browse curated combinations of curtains, blinds, wallpapers and
              flooring — organised by the room you&#39;re styling, not just by
              product type.
            </p>
            {/* Room tabs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {ROOM_SCENES.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background:
                      activeRoom === room.id ? "#3D2B1F" : "transparent",
                    border: `1px solid ${activeRoom === room.id ? "#3D2B1F" : "rgba(61,43,31,0.1)"}`,
                    borderRadius: 10,
                    padding: "16px 22px",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    textAlign: "left",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: activeRoom === room.id ? "#FAF7F2" : "#3D2B1F",
                        transition: "color 0.25s",
                      }}
                    >
                      {room.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color:
                          activeRoom === room.id
                            ? "rgba(201,168,76,0.8)"
                            : "#8A8278",
                        marginTop: 2,
                        transition: "color 0.25s",
                      }}
                    >
                      {room.tag}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 18,
                      color:
                        activeRoom === room.id
                          ? "#C9A84C"
                          : "rgba(61,43,31,0.3)",
                      transition: "color 0.25s",
                    }}
                  >
                    →
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollTo("categories")}
              style={{
                marginTop: 32,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
                color: "#C9A84C",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                transition: "gap 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = "14px")}
              onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}
            >
              View All Collections <span style={{ fontSize: 20 }}>→</span>
            </button>
          </div>

          {/* Right: big room scene image */}
          <div
            style={{
              opacity: roomInView ? 1 : 0,
              transform: roomInView ? "translateX(0)" : "translateX(24px)",
              transition: "all 0.9s ease 0.2s",
              position: "relative",
            }}
          >
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 32px 80px rgba(61,43,31,0.18)",
                aspectRatio: "4/5",
              }}
            >
              <img
                key={activeRoomScene.id}
                src={activeRoomScene.image}
                alt={activeRoomScene.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "opacity 0.6s, transform 0.8s",
                  animation: "roomFadeIn 0.6s ease",
                }}
              />
            </div>
            {/* Room label overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 28,
                left: 28,
                right: 28,
                background: "rgba(250,247,242,0.92)",
                backdropFilter: "blur(12px)",
                borderRadius: 12,
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#C9A84C",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 3,
                  }}
                >
                  {activeRoomScene.tag}
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#3D2B1F",
                  }}
                >
                  {activeRoomScene.label}
                </div>
              </div>
              <button
                onClick={() => setBookingOpen(true)}
                style={{
                  background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 18px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}
              >
                Get Ideas
              </button>
            </div>
            <style>{`@keyframes roomFadeIn { from { opacity:0; transform:scale(1.04) } to { opacity:1; transform:scale(1) } }`}</style>
          </div>
        </div>
      </div>
    </section>
  );
};