import { CardContent } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

function Title({children}) {
    return (
        <CardContent style={{ backgroundColor: "#ff4c4c",borderRadius: 5, marginBottom:20, padding:5, color:'white' }}>
        <Box
          component="span"
          sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
        >
          {children}
        </Box>
      </CardContent>
    )
}

export default Title