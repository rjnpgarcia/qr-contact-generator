import React, { useState } from "react";
import QRCode from "qrcode";
import vCardsJS from "vcards-js";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper
} from "@mui/material";

const App = () => {
    const [qrCode, setQrCode] = useState(null);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        phoneNumber: "",
        email: "",
        website: "",
        street: "",
        city: "",
        state: "",
        postal: "",
        region: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleGenerateQR = async () => {
        const vCard = vCardsJS();
        vCard.firstName = form.firstName;
        vCard.lastName = form.lastName;
        vCard.organization = form.companyName;
        vCard.cellPhone = form.phoneNumber;
        vCard.workEmail = form.email;
        vCard.workUrl = form.website;
        vCard.workAddress.label = "Work Address";
        vCard.workAddress.street = form.street;
        vCard.workAddress.city = form.city;
        vCard.workAddress.stateProvince = form.state;
        vCard.workAddress.postalCode = form.postal;
        vCard.workAddress.countryRegion = form.region;

        try {
            const qrData = await QRCode.toDataURL(vCard.getFormattedString());
            setQrCode(qrData);
        } catch (err) {
            console.error(err);
        }
    };

    const handleReset = () => {
        setForm({
            firstName: "",
            lastName: "",
            companyName: "",
            phoneNumber: "",
            email: "",
            website: "",
            street: "",
            city: "",
            state: "",
            postal: "",
            region: ""
        });
        setQrCode(null);
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                mt: 4,
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 3,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#ffffff"
                }}
            >
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "#1976d2",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"
                    }}
                >
                    QR Contact Generator
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Company Name"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Website"
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Typography
                        variant="h6"
                        sx={{ mt: 2, fontWeight: "bold", color: "#555" }}
                    >
                        Address
                    </Typography>
                    <TextField
                        label="Street"
                        name="street"
                        value={form.street}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="State"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Postal Code"
                        name="postal"
                        value={form.postal}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Region"
                        name="region"
                        value={form.region}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 3
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleGenerateQR}
                            sx={{ fontWeight: "bold", px: 3 }}
                        >
                            Generate QR Code
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleReset}
                            sx={{ fontWeight: "bold", px: 3 }}
                        >
                            Clear
                        </Button>
                    </Box>
                    {qrCode && (
                        <img
                            src={qrCode}
                            alt="QR Code"
                            style={{
                                marginTop: 20,
                                border: "5px solid #1976d2",
                                borderRadius: 10,
                                padding: 10,
                                backgroundColor: "#ffffff"
                            }}
                        />
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default App;
