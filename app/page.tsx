import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/login");
}

// app/page.tsx
// import { Box, Typography } from "@mui/material";

// export default function HomePage() {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         bgcolor: "#f5f5f5",
//         textAlign: "center",
//       }}
//     >
//       <Typography variant="h3" fontWeight="bold" gutterBottom>
//         Welcome to Money Tracker
//       </Typography>
//       <Typography variant="body1">
//         This is a test page to verify deployment on Vercel.
//       </Typography>
//     </Box>
//   );
// }
