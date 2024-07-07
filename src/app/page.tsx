import { Box } from "@mui/material";


export default function Home() {
  const img = "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/BKKCIRCUSLONGWAY.jpg?alt=media&token=d68d460f-9480-43cc-85c6-11c44afcb447";

  return (
    <main>
      <Box
        sx={{
          width: 375,
          height: 400,
          bgcolor: 'primary.main',
          display: 'flex',
          mx: 1,
          mt:20
        }}
      >
        <img
          src={img}
          alt="image"
          className='object-cover'
        />
      </Box>
    </main>
  );
}
