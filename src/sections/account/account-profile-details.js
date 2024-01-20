import { useCallback, useState } from "react";
import { firestore, doc, setDoc, addDoc, collection } from "../../config/index";
import { LoadingButton } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { useRouter } from "next/router";

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

  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    console.log(values);
  };

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    console.log(values);
    setLoading(true);
    try {
      // const uniqueId = firestore.collection("users").doc().id;
      // console.log(uniqueId);
      const result = await addDoc(collection(firestore, "users"), {
        updated_date: new Date().toLocaleDateString(),
        updated_time: new Date().toLocaleTimeString(),
        ...values,
      });

      toast.info("new ordered saved successfully");
      setLoading(false);
      router.push(`/update_order/${result.id}`);
    } catch (error) {
      setLoading(false);
      console.error("Error adding data: ", error);
    }
  }, []);

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
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
                  // value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  // value={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  // value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  // value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  // value={values.country}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Full Address"
                  name="address"
                  onChange={handleChange}
                  required
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
                  // value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Last name"
                  name="r_lastName"
                  onChange={handleChange}
                  required
                  // value={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Email Address"
                  name="r_email"
                  onChange={handleChange}
                  required
                  // value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Phone Number"
                  name="r_phone"
                  onChange={handleChange}
                  // value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Country"
                  name="r_country"
                  onChange={handleChange}
                  required
                  // value={values.country}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Full Address"
                  name="r_address"
                  onChange={handleChange}
                  required
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
                  // value={values.firstName}
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
                  // value={values.firstName}
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
                  // value={values.firstName}
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
                  // value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Product"
                  name="product"
                  onChange={handleChange}
                  required
                  // value={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Total Freight"
                  name="total_freight"
                  onChange={handleChange}
                  required
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
                  // value={new Date().toDateString()}
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
                  // value={values.country}
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
                  // value={values.firstName}
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
                  // value={values.country}
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
                  // value={values.firstName}
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
                  // defaultValue={"2024-12-12"}
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
                  // value={"2024-12-12"}
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
                  // value={values.country}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Status"
                  name="status"
                  onChange={handleChange}
                  required
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
                  // value={values.country}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  helperText="Carrier Reference No"
                  name="carrier_reference_no"
                  onChange={handleChange}
                  required
                  type="number"
                  // value={values.country}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  helperText="Payment Mode:"
                  name="payment_method"
                  onChange={handleChange}
                  required
                  // value={values.country}
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
                  // value={"10:20 AM"}
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
                  // value={values.country}
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
                  // value={values.country}
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
                  // value={values.country}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  // id="outlined-basic"
                  //
                  fullWidth
                  helperText="shipment location (latitude)"
                  name="lat"
                  onChange={handleChange}
                  required

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

                  // value={values.country}
                />
              </Grid>
            </Grid>
          </Box>
          <ToastContainer />
        </CardContent>

        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {loading ? (
            <LoadingButton variant="contained" loading>
              Save details
            </LoadingButton>
          ) : (
            <Button variant="contained" type="submit">
              Save details
            </Button>
          )}
        </CardActions>
      </Card>
    </form>
  );
};
