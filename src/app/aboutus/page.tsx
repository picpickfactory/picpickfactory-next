"use client";

import { Box, Typography } from "@mui/material";

export default function Page() {
    return (
        <Box className="mx-6 my-9">
            <Typography>
                 About US
            </Typography>
            <Typography className="mx-5 my-5 text-sm">
                Kasidit Singhares (2001) is a Bangkok-based Photographer. <br /> 
                Graduated from King Mongkut's Institute of Technology Ladkrabang, School of Arts and design with a major in a Photograph.<br /> Most of Kasidit’s work based on Fashion and Advertising Photography
            </Typography>
            <img className="mx-28 my-10 size-2/3" src="https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/aboutus%2FIMG_0415.jpg?alt=media&token=1c053fdb-b41f-4d6e-9b57-e2f2da7a8d8e" alt="image"/>
        </Box>
    );
}