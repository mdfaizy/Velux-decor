// import React, { useEffect, useState } from "react";
// import { Showroom } from "../screens/AiAgentMobile/Showroom";
// import { getShowroomsApi } from "../services/showroomApi";

// export const ShowroomContainer = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getShowroomsApi();
//       setVideos(res.data);
//     };

//     fetchData();
//   }, []);

//   return <Showroom SHOWROOM_VIDEOS={videos} />;
// };