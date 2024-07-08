import { Box } from "@mui/material";

export default function FooterSection() {
    return(
        <Box
            sx={{
                mt: 4,
                width: '100%',
                bgcolor: 'black',
                height: '20px',
                position: 'fixed',
                bottom: 0,
                display: {
                    xs: 'none', 
                    
                    md: 'block', 
                },
            }}
        ></Box>
    )
}