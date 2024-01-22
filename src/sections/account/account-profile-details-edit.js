import { useCallback, useState, useEffect } from "react";
import { firestore, doc, getDoc, setDoc, updateDoc, addDoc, collection } from "../../config/index";
import { LoadingButton } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";

const shipment_mode = [
  {
    value: "",
    helperText: "",
  },
  {
    value: "Air Freight",
    helperText: "Air Freight",
  },
  {
    value: "Ocean Freight",
    helperText: "Ocean Freight",
  },
  {
    value: "Land Freight",
    helperText: "Land Freight",
  },
];

const status = [
  {
    value: "",
    helperText: "",
  },
  {
    value: "Pending",
    helperText: "Pending",
  },
  {
    value: "In transit",
    helperText: "In Transit",
  },
  {
    value: "Arrived",
    helperText: "arrived",
  },
];

export const AccountProfileDetails = ({ id }) => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to fetch data from Firestore and set it as placeholder
  const fetchData = async () => {
    try {
      const docRef = doc(firestore, "users", id); // Replace with the actual user ID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setValues(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const docRef = doc(firestore, "users", id); // Replace with the actual user ID
      await updateDoc(docRef, {
        updated_date: new Date().toLocaleDateString(),
        updated_time: new Date().toLocaleTimeString(),
        ...values,
      });

      toast.info("new ordered updated successfully");
      setLoading(false);
      router.push("/orders");
    } catch (error) {
      setLoading(false);
      console.error("Error updating data: ", error);
    }
  };
  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <CardHeader subheader="Fill all the input field below" title="Shipper information" />

            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  placeholder={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  placeholder={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  placeholder={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  placeholder={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  placeholder={values.country}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Full Address"
                  name="address"
                  onChange={handleChange}
                  required
                  placeholder={values.address}
                />
              </Grid>
            </Grid>
            <Divider />
            <CardHeader subheader="Fill all the input field below" title="Receiver information" />
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="First name"
                  name="r_firstName"
                  onChange={handleChange}
                  required
                  placeholder={values.r_firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Last name"
                  name="r_lastName"
                  onChange={handleChange}
                  required
                  placeholder={values.r_lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Email Address"
                  name="r_email"
                  onChange={handleChange}
                  required
                  placeholder={values.r_email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Phone Number"
                  name="r_phone"
                  onChange={handleChange}
                  placeholder={values.r_phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Country"
                  name="r_country"
                  onChange={handleChange}
                  required
                  placeholder={values.r_country}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Full Address"
                  name="r_address"
                  onChange={handleChange}
                  required
                  placeholder={values.r_address}
                />
              </Grid>
            </Grid>
            <Divider />

            <CardHeader subheader="Fill all the input field below" title="Shipment information" />
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Weight (KG)"
                  name="weight"
                  onChange={handleChange}
                  required
                  type="number"
                  placeholder={values.weight}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Height (cm)"
                  name="height"
                  onChange={handleChange}
                  required
                  type="number"
                  placeholder={values.height}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Length (cm)"
                  name="length"
                  onChange={handleChange}
                  required
                  type="number"
                  placeholder={values.length}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Width (cm)"
                  name="width"
                  onChange={handleChange}
                  required
                  type="number"
                  placeholder={values.width}
                />
              </Grid>
              {/* <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Product"
                  name="product"
                  onChange={handleChange}
                  required
                  placeholder={values.product}
                />
              </Grid> */}
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Total Freight"
                  name="total_freight"
                  onChange={handleChange}
                  required
                  placeholder={values.total_freight}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  helperText="Pick-up Date"
                  name="pick_up_date"
                  onChange={handleChange}
                  type="date"
                  required
                  placeholder={values.pick_up_date}
                />
              </Grid>
              {/* <Grid xs={12} md={6}>
              <TextField
                id="outlined-basic"
                fullWidth
                helperText="Country"
                name="country"
                onChange={handleChange}
                required
                // value={values.country}
              />
            </Grid> */}
              <Grid xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  helperText="Comment"
                  name="comment"
                  onChange={handleChange}
                  required
                  placeholder={values.comment}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Package"
                  name="package"
                  onChange={handleChange}
                  required
                  type="number"
                  placeholder={values.package}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  helperText="Carrier"
                  name="carrier"
                  onChange={handleChange}
                  required
                  placeholder={values.carrier}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Shipment Mode"
                  name="shipment_mode"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                >
                  {shipment_mode.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.helperText}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Quantity"
                  name="quantity"
                  onChange={handleChange}
                  required
                  type="number"
                  placeholder={values.quantity}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  helperText="Expected Delivery Date"
                  name="expected_delivery_date"
                  onChange={handleChange}
                  type="date"
                  required
                  placeholder={values.expected_delivery_date}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  helperText="Pick-up Time"
                  name="pick_up_time"
                  onChange={handleChange}
                  type="time"
                  required
                  placeholder={values.pick_up_time}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  helperText="Carrier"
                  name="carrier"
                  onChange={handleChange}
                  required
                  placeholder={values.carrier}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Status"
                  name="status"
                  onChange={handleChange}
                  required
                  placeholder={values.status}

                  // select
                  // SelectProps={{ native: true }}
                />
                {/* {status.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.helperText}
                    </option>
                  ))}
                </TextField> */}
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  helperText="Type of Shipment"
                  name="type_of_shipment"
                  onChange={handleChange}
                  required
                  placeholder={values.type_of_shipment}
                />
              </Grid>

              {/* <Grid xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  helperText="Carrier Reference No"
                  name="carrier_reference_no"
                  onChange={handleChange}
                  required
                  type="number"
                  placeholder={values.carrier_reference_no}
                />
              </Grid> */}

              <Grid xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  helperText="Payment Mode:"
                  name="payment_method"
                  onChange={handleChange}
                  required
                  placeholder={values.payment_method}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  // id="outlined-basic"

                  fullWidth
                  helperText="Departure Time"
                  name="departure_time"
                  onChange={handleChange}
                  type="time"
                  required
                  placeholder={values.departure_time}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  // id="outlined-basic"
                  //
                  fullWidth
                  helperText="Piece Type"
                  name="piece_type"
                  onChange={handleChange}
                  required
                  placeholder={values.piece_type}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  // id="outlined-basic"
                  //
                  fullWidth
                  helperText="Description"
                  name="description"
                  onChange={handleChange}
                  required
                  placeholder={values.description}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  // id="outlined-basic"
                  //
                  fullWidth
                  helperText="location"
                  name="location"
                  onChange={handleChange}
                  required
                  placeholder={values.location}
                />
              </Grid>

              {/* <Grid xs={12} md={6}>
                <TextField
                  // id="outlined-basic"
                  //
                  fullWidth
                  helperText="shipment location (latitude)"
                  name="lat"
                  onChange={handleChange}
                  required
                  placeholder={values.lat}

                  // value={values.country}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  // id="outlined-basic"
                  //
                  fullWidth
                  helperText="shipment location (longitude)"
                  name="lng"
                  onChange={handleChange}
                  required
                  placeholder={values.lng}

                  // value={values.country}
                />
              </Grid> */}
            </Grid>
          </Box>
          <ToastContainer />
        </CardContent>

        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {loading ? (
            <LoadingButton variant="contained" loading>
              Update details
            </LoadingButton>
          ) : (
            <Button variant="contained" type="submit">
              Update details
            </Button>
          )}
        </CardActions>
      </Card>
    </form>
  );
};
