import { createTheme } from "@mui/material";

const Theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        textAlign: "right",
                    },
                },
            },
        },
    },
});

export default Theme;