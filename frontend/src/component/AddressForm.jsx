import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import "./modal.css"
import { UserContext } from "../context/context";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import jwt from "jwt-decode"

import logo from "../Logo/address.jpg"
import * as yup from 'yup';
import { useFormik } from 'formik';
import "yup-phone-lite";
import Cookies from 'universal-cookie';
import { updateCustomer } from "../redux/Post";
import { useSelector,useDispatch } from 'react-redux'

function getModalStyle() {
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
}
  
const useStyles = makeStyles(theme => ({
    paper: {
      position: "absolute",
      width: 1000,
      backgroundColor:"#213246",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      outline: "none",
      color:"#7fa142"
    },
    textfield:{
      width:600,
      borderRadius: 12,
      backgroundColor: "white",
      borderColor:"white",
      position:"relative",
      left:200,
    },
}));

const AddressFormModal = React.memo(({ modal1, SetModal1 }) => {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
 const dispatch=useDispatch();
 const handle = async (address, phone) => {
    try {
      const cookies = new Cookies();
      const storedCustomerId = cookies.get('token');
      const decoded = jwt(storedCustomerId);
      const user_id = decoded.user_id;
  
      const action = await dispatch(updateCustomer({ address, phone, user_id }));
      if (action.payload && action.payload === "successful") {
        SetModal1(false);
      }
    } catch (error) {
      alert("error");
    }
  };

    const validationSchema = yup.object({
        phone: yup.string()
            .phone("PK", true, "Please enter a valid phone number")
            .required("A phone number is required"),
        address: yup
            .string('Enter your address')
            .required('Address is required')
    });

    const formik = useFormik({
        initialValues: {
            address: '',
            phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handle(values.address, values.phone,);
        },
    });

    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={modal1}
            onClose={modal1}
        >
            <div style={modalStyle} className={classes.paper}>
                <Typography style={{textAlign:"center", marginBottom:20}} variant="h4" id="modal-title">
                    Customer Information
                    <img alt="Logo" style={{width:1000, height:300}} src={logo}/>
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <TextField
                            id="address"
                            name="address"
                            label="Address"
                            className={classes.textfield}
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            id="phone"
                            name="phone"
                            label="Phone"
                            className={classes.textfield}
                            margin="normal"
                            variant="outlined"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                    </div>
                    <button type="submit" className="button_address">Upgrade Customers</button>
                </form>
            </div>
        </Modal>
    );
});

function AddressForm() {
    const { customers, modal1, SetModal1 } = useContext(UserContext);

    return (
        <AddressFormModal modal1={modal1} customers={customers} SetModal1={SetModal1} />
    );
}

export default AddressForm;
