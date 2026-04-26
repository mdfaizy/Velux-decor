// import React from "react";

// interface ShowroomVideo {
//   id: number;
//   src: string;
//   title: string;
//   thumbnail: string;
// }

// interface ShowroomProps {
//   SHOWROOM_VIDEOS: ShowroomVideo[];
// }

// export const Showroom: React.FC<ShowroomProps> = ({ SHOWROOM_VIDEOS }) => {
//   return (
//     <section id="about" style={{ padding: "90px 0", background: "#1A120D" }}>
//       <div className="max-w-7xl mx-auto px-6 sm:px-8">
//         <div style={{ textAlign: "center", marginBottom: 54 }}>
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 8,
//               background: "rgba(201,168,76,0.1)",
//               borderRadius: 30,
//               padding: "6px 18px",
//               marginBottom: 20,
//               border: "1px solid rgba(201,168,76,0.2)",
//             }}
//           >
//             <span
//               style={{
//                 fontSize: 11,
//                 fontWeight: 700,
//                 color: "#C9A84C",
//                 letterSpacing: "0.12em",
//                 textTransform: "uppercase",
//               }}
//             >
//               Experience VeluxDecor
//             </span>
//           </div>
//           <h2
//             style={{
//               fontFamily: "'Playfair Display',serif",
//               fontSize: "clamp(28px,4vw,42px)",
//               fontWeight: 700,
//               color: "#FAF7F2",
//               marginBottom: 16,
//             }}
//           >
//             Step Inside Our Showrooms
//           </h2>
//           <p
//             style={{
//               fontSize: 16,
//               color: "rgba(250,247,242,0.6)",
//               maxWidth: 500,
//               margin: "0 auto",
//             }}
//           >
//             Take a virtual tour of our spaces and see where the magic of
//             interior transformation begins.
//           </p>
//         </div>

//         {/* Responsive video grid */}
//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {SHOWROOM_VIDEOS.map((video) => (
//             <div
//               key={video.id}
//               style={{
//                 background: "#1A120D",
//                 borderRadius: 14,
//                 overflow: "hidden",
//                 border: "1px solid rgba(255,255,255,0.08)",
//                 boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               {/* MacOS Style Window Header */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 8,
//                   padding: "12px 16px",
//                   background: "rgba(255,255,255,0.04)",
//                   borderBottom: "1px solid rgba(255,255,255,0.08)",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 10,
//                     height: 10,
//                     borderRadius: "50%",
//                     background: "#FF5F56",
//                     boxShadow: "0 0 4px rgba(255,95,86,0.3)",
//                   }}
//                 />
//                 <div
//                   style={{
//                     width: 10,
//                     height: 10,
//                     borderRadius: "50%",
//                     background: "#FFBD2E",
//                     boxShadow: "0 0 4px rgba(255,189,46,0.3)",
//                   }}
//                 />
//                 <div
//                   style={{
//                     width: 10,
//                     height: 10,
//                     borderRadius: "50%",
//                     background: "#27C93F",
//                     boxShadow: "0 0 4px rgba(39,201,63,0.3)",
//                   }}
//                 />
//               </div>

//               {/* Native HTML5 Video Container (16:9 Aspect Ratio) */}
//               <div
//                 style={{
//                   position: "relative",
//                   width: "100%",
//                   paddingTop: "56.25%", // 16:9 Aspect Ratio
//                   background: "#1A120D",
//                 }}
//               >
//                 <video
//                   src={video.src}
//                   poster={video.thumbnail}
//                   controls
//                   controlsList="nodownload"
//                   preload="none"
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                   }}
//                 />
//               </div>

//               {/* Video Title */}
//               <div style={{ padding: "20px 20px" }}>
//                 <h3
//                   style={{
//                     fontFamily: "'Playfair Display',serif",
//                     fontSize: 18,
//                     fontWeight: 600,
//                     color: "#FAF7F2",
//                     lineHeight: 1.3,
//                     margin: 0,
//                   }}
//                 >
//                   {video.title}
//                 </h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };



import React, { useEffect, useState } from "react";
import { getShowroomsApi } from "../../services/showroomApi";

interface ShowroomVideo {
  _id: string;
  src: string;
  title: string;
  thumbnail: string;
}

export const Showroom = () => {
  const [SHOWROOM_VIDEOS, setVideos] = useState<ShowroomVideo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getShowroomsApi();
        setVideos(res.data); // backend se data
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="about" style={{ padding: "90px 0", background: "#1A120D" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* SAME HEADER (NO CHANGE) */}

        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(201,168,76,0.1)",
              borderRadius: 30,
              padding: "6px 18px",
              marginBottom: 20,
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
              Experience VeluxDecor
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(28px,4vw,42px)",
              fontWeight: 700,
              color: "#FAF7F2",
              marginBottom: 16,
            }}
          >
            Step Inside Our Showrooms
          </h2>

          <p
            style={{
              fontSize: 16,
              color: "rgba(250,247,242,0.6)",
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            Take a virtual tour of our spaces and see where the magic of
            interior transformation begins.
          </p>
        </div>

        {/* SAME GRID (NO CHANGE) */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SHOWROOM_VIDEOS.map((video) => (
            <div
              key={video._id}
              style={{
                background: "#1A120D",
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header same */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.04)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F56" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F" }} />
              </div>

              {/* Video */}
              <div style={{ position: "relative", paddingTop: "56.25%" }}>
                <video
                  src={video.src}
                  poster={video.thumbnail}
                  controls
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Title */}
              <div style={{ padding: "20px" }}>
                <h3 style={{ color: "#FAF7F2" }}>{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};