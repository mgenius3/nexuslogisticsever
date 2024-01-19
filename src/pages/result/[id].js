// pages/user/[id].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { firestore, doc, getDoc } from "../../config/index";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GoogleMapComponent from "./map";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Container,
  TextField,
  Unstable_Grid2 as Grid,
  Alert,
  ToggleButton,
} from "@mui/material";

import styles from "./styles.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState(null);
  const [statemessage, setStateMessage] = useState("loading");
  const [mapData, setMapData] = useState();

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming 'users' is your Firestore collection name

        const userDoc = await getDoc(doc(firestore, "users", id));

        if (userDoc.exists()) {
          setUserData(userDoc.data());

          setMapData([
            { position: { lat: userDoc.data().lat, lng: userDoc.data().lng } }, // Example marker data
          ]);
        } else {
          setStateMessage("User not found");
        }
      } catch (error) {
        setStateMessage("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const dividerStyle = {
    height: "5px", // Adjust the height to increase thickness
    backgroundColor: "gray", // Adjust the color as needed
    margin: "16px 0", // Adjust margin as needed
  };

  return (
    <div>
      {userData ? (
        <Container>
          <button
            className={styles.printContent}
            variant="contained"
            type="submit"
            onClick={handlePrint}
          >
            Print Invoice
          </button>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              {/* <TextField
             fullWidth
             helperText="Last name"
             name="lastName"
             required
             // value={values.lastName}
           /> */}

              <Typography variant="h6" component="h6">
                Shipper Information
              </Typography>
              <Divider style={dividerStyle} />
              <p>
                <br />
                {userData?.firstName} {userData?.lastName}
                <br />
                {userData?.address}
                <br />
                {userData?.phone}
                <br />
                {userData?.email}
              </p>
            </Grid>
            <Grid xs={12} md={6}>
              {/* <TextField
             fullWidth
             helperText="Last name"
             name="lastName"
             required
             // value={values.lastName}
           /> */}

              <Typography variant="h6" component="h6">
                Receiver Information
              </Typography>
              <Divider style={dividerStyle} />

              <p>
                <br />
                {userData?.r_firstName} {userData?.r_lastName}
                <br />
                {userData?.r_address}
                <br />
                {userData?.r_phone}
                <br />
                {userData?.r_email}
              </p>
            </Grid>
            <Grid xs={12}>
              <Alert style={{ textAlign: "center" }} icon={null}>
                {userData?.status}
              </Alert>
            </Grid>
            <Grid xs={12}>
              <Typography variant="h6" component="h6">
                Shipment Information
              </Typography>
              <Divider style={dividerStyle} />
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Origin:</Typography>
              <Typography variant="subtitle2">{userData?.country}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Package:</Typography>
              <Typography variant="subtitle2">{userData?.package}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Status:</Typography>
              <Typography variant="subtitle2">{userData?.status}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Destination:</Typography>
              <Typography variant="subtitle2">{userData?.r_country}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Carrier:</Typography>
              <Typography variant="subtitle2">{userData?.carrier}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Type of Shipment:</Typography>
              <Typography variant="subtitle2">{userData?.type_of_shipment}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Weight:</Typography>
              <Typography variant="subtitle2">{userData?.weight}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Shipment Mode:</Typography>
              <Typography variant="subtitle2">{userData?.shipment_mode}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Carrier Reference No.:</Typography>
              <Typography variant="subtitle2">{userData?.carrier_reference_no}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Product:</Typography>
              <Typography variant="subtitle2">{userData?.product}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Quantity:</Typography>
              <Typography variant="subtitle2">{userData?.quantity}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Payment Mode:</Typography>
              <Typography variant="subtitle2">{userData?.payment_method}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Total Freight:</Typography>
              <Typography variant="subtitle2">{userData?.total_freight}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Expected Delivery Date:</Typography>
              <Typography variant="subtitle2">{userData?.expected_delivery_date}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Departure Time:</Typography>
              <Typography variant="subtitle2">{userData?.departure_time}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Pick-up Date:</Typography>
              <Typography variant="subtitle2">{userData?.pick_up_date}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Pick-up Time:</Typography>
              <Typography variant="subtitle2">{userData?.pick_up_time}</Typography>
            </Grid>
            <Grid xs={12} lg={4} md={6}>
              <Typography variant="subtitle1">Comments:</Typography>
              <Typography variant="subtitle2">{userData?.comment}</Typography>
            </Grid>
            <Grid xs={12}>
              <Typography variant="h6" component="h6">
                Packges
              </Typography>
              <Divider style={dividerStyle} />
            </Grid>
            <Grid xs={6} lg={3} md={4}>
              <Typography variant="subtitle1">Quantity</Typography>
              <Typography variant="subtitle2">{userData?.quantity}</Typography>
            </Grid>
            <Grid xs={6} lg={3} md={4}>
              <Typography variant="subtitle1">Piece Type</Typography>
              <Typography variant="subtitle2">{userData?.piece_type}</Typography>
            </Grid>
            <Grid xs={6} lg={3} md={4}>
              <Typography variant="subtitle1">Description</Typography>
              <Typography variant="subtitle2">{userData?.description}</Typography>
            </Grid>
            <Grid xs={6} lg={3} md={4}>
              <Typography variant="subtitle1">Length(cm)</Typography>
              <Typography variant="subtitle2">{userData?.length}</Typography>
            </Grid>
            <Grid xs={6} lg={3} md={4}>
              <Typography variant="subtitle1">Width(cm)</Typography>
              <Typography variant="subtitle2">{userData?.width}</Typography>
            </Grid>{" "}
            <Grid xs={6} lg={3} md={4}>
              <Typography variant="subtitle1">Height(cm)</Typography>
              <Typography variant="subtitle2">{userData?.height}</Typography>
            </Grid>{" "}
            <Grid xs={6} lg={3} md={4}>
              <Typography variant="subtitle1">Weight(kg)</Typography>
              <Typography variant="subtitle2">{userData.weight}</Typography>
            </Grid>{" "}
            <Grid xs={12}>
              <Typography variant="h6" component="h6">
                Shipment History
              </Typography>
              <Divider style={dividerStyle} />
            </Grid>
            <Grid xs={6} lg={3} md={4}>
              <Typography variant="subtitle1">Date</Typography>
              <Typography variant="subtitle2">{userData?.updated_date}</Typography>
            </Grid>
            <Grid xs={6} lg={3} md={4}>
              <Typography variant="subtitle1">Time</Typography>
              <Typography variant="subtitle2">{userData?.updated_time}</Typography>
            </Grid>
            <Grid xs={6} lg={3} md={4}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="subtitle2">{userData?.status}</Typography>
            </Grid>
            <Grid xs={6} lg={3} md={4}>
              <Typography variant="subtitle1">Updated By</Typography>
              <Typography variant="subtitle2">Admin</Typography>
            </Grid>{" "}
            <Grid xs={6} lg={3} md={4}>
              <Typography variant="subtitle1">Remarks</Typography>
              <Typography variant="subtitle2">in progress</Typography>
            </Grid>{" "}
            <Grid xs={6} lg={3} md={4}>
              <Typography variant="subtitle1">Location</Typography>
              <Typography variant="subtitle2">{userData?.location}</Typography>
            </Grid>
          </Grid>
          <br />
          <Grid xs={12}>
            <Typography variant="h6" component="h6">
              Shipment location
            </Typography>
            <Divider style={dividerStyle} />
          </Grid>

          <GoogleMapComponent
            center={{ lat: userData.lat, lng: userData.lng }}
            zoom={10}
            markers={mapData}
          />
          <br />
        </Container>
      ) : (
        <p>{statemessage}</p>
      )}
    </div>
  );
};

export default UserProfile;
