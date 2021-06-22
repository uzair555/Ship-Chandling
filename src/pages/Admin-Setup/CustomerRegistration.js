import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  FormGroup,
  Label,
  CardBody,
  CardTitle,
  Badge,
  CardSubtitle,
  Form,
  Input,
} from "reactstrap"

import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"

import Modal from "@material-ui/core/Modal"

import "./AdminStyling.css"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import Sidebar from "../../components/VerticalLayout/Sidebar"
import Header from "../../components/HorizontalLayout/Header"
import BackDrop from "../../components/utils/backdrop"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"

import PropTypes from "prop-types"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableContainer from "@material-ui/core/TableContainer"
import TableFooter from "@material-ui/core/TableFooter"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import FirstPageIcon from "@material-ui/icons/FirstPage"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import LastPageIcon from "@material-ui/icons/LastPage"

import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

import Button from "@material-ui/core/Button"

import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"

import { CREATE, GET, UPDATE, DELETE } from "../../configuration/API-Instance"
import { notification, DatePicker } from "antd"

import moment from "moment"
import TabGrid from "./TabsTables/TabGrid"

const { RangePicker } = DatePicker

const openNotificationWithIcon = (type, title, details) => {
  notification[type]({
    message: title,
    description: details,
  })
}

const CardStyle = makeStyles({
  root: {
    minWidth: 275,
    // height: 400
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}))

function TablePaginationActions(props) {
  const classes = useStyles1()
  const theme = useTheme()
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

function CustomerRegistration() {
  const [open, setOpen] = useState(false)
  const [show, setshow] = useState(false)
  const [rows, setRows] = useState([])
  const [Types, setTypes] = useState([])
  const [options, setOptions] = useState([])
  const [subOption, setSubOption] = useState([])

  const [isEdit, setIsEdit] = useState(false)
  const [EditObject, setEditObject] = useState({})

  const [AC, setAC] = useState(false)
  const [customer, setCustomer] = useState(false)
  const [supplier, setSupplier] = useState(false)
  const [expence, setExpence] = useState(false)

  const [setupId, setSetupId] = useState("")

  const [AccountName1, setAccountName1] = useState("")
  const [AccountName2, setAccountName2] = useState("")
  const [TypeName, setTypeName] = useState("")

  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Phone, setPhone] = useState("")
  const [BillingAddress, setBillingAddress] = useState("")
  const [DeliveryAddress, setDeliveryAddress] = useState("")
  const [Age, setAge] = useState("")
  const [DOB, setDOB] = useState(new Date())
  const [opBal, setopBal] = useState("")
  const [opBalDate, setopBalDate] = useState(new Date())
  const [gst, setgst] = useState("")
  const [ntn, setntn] = useState("")
  const [CP, setCP] = useState("")
  const [CPmobile, setCPmobile] = useState("")
  const [CPEmail, setCPEmail] = useState("")
  const [designation, setDesignation] = useState("")
  const [AttrMr, setAttrMr] = useState("")
  const [Mobile, setMobile] = useState("")
  const [CPextn, setCPExtn] = useState("")
  const [comboVal, setComboVal] = useState("")
  const [subcomboVal, setSubComboVal] = useState("")
  const [selectedType, setSelectedType] = useState("")

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const resetVal = () => {
    setAccountName1("")
    setAccountName2("")
    setTypeName("")
    setName("")

    setEmail("")
    setPhone("")

    setBillingAddress("")
    setDeliveryAddress("")
    setAge("")

    setDOB(new Date())
    setopBalDate(new Date())
    setopBal("")
    setntn("")
    setgst("")

    setMobile("")
    setCP("")
    setCPEmail("")
    setCPmobile("")
    setCPExtn("")

    setAttrMr("")
    setDesignation("")
    setIsEdit(false)
  }

  const handleClose = () => {
    setOpen(false)
    resetVal()
    setIsEdit(false)
  }

  //  ========================= Api Integration Section Starts =========================

  const getSetupAreaCombo = () => {
    setshow(true)
    GET("/api/Setup/GetAreaSetupCombo")
      .then(setups => {
        if (setups.status == 200) {
          setOptions(setups.data)
          setshow(false)
        }
      })
      .catch(e => {
        setshow(false)
        console.log(e.response)
      })
  }

  const getOccupationSetup = () => {
    setshow(true)
    GET("/api/Setup/GetOccupationSetupCombo")
      .then(setups => {
        if (setups.status == 200) {
          setSubOption(setups.data)
          setshow(false)
        }
      })
      .catch(e => {
        setshow(false)
        console.log(e.response)
      })
  }

  const getSetups = () => {
    setshow(true)
    GET(
      "/api/Setup/GetbySetupTypeMainSetup?SetupTypeId=46795C62-0430-478A-AE49-657558359895"
    )
      .then(setups => {
        if (setups.status == 200) {
          setRows(setups.data)
          setshow(false)
        }
      })
      .catch(e => {
        setshow(false)
        console.log(e.response)
      })
  }

  const upsertSetup = () => {
    if (!!isEdit) {
      let body = {
        id: setupId,
        setupTypeId: "46795C62-0430-478A-AE49-657558359895",
        customerName: Name,
        regDate: new Date(),
        address: BillingAddress,
        openingBalance: 0,
        ntnNo: ntn,
        phoneNo: Phone,
        mobileNo: Mobile,

        radDebitTrans: 0,
        creditDebitTrans: 0,
        radDebit: false,
        radCredit: false,
        actCode1: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        actCode2: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        actCode: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        deliveryAddress: DeliveryAddress,

        areaId: comboVal,
        dob: DOB,
        occupationId: subcomboVal,
        picPath: "",
        ms: "",
        cityId: selectedType,
        opBal: Number(opBal),
        opBalDate: opBalDate,
        extnNo: CPextn,
        attn: AttrMr,
        emailAddress: Email,
        contactPerson: CP,
        contactMobile: CPmobile,
        contactEmail: CPEmail,
        age: Number(Age),
        ppro: 0,
        phyto: 0,
        ip: 0,
        other: 0,
        salary: 0,
        designation: designation,
        accNo: "",
        branchName: "",
        bankName: "",
        prjectId: "678594e9-2110-bdea-52ba-b1ea2487771d",
        fatherName: "",
        joiningDate: "1983-08-20T18:55:14.223Z",
        commission: 0,
        gstno: gst,
        isvalid: true,
        createDate: EditObject.createDate,
        createUser: EditObject.createUser,
      }
      UPDATE(`/api/Setup/UpdateMainSetup`, body)
        .then(res => {
          if (res.status == 200) {
            openNotificationWithIcon(
              "success",
              "Customer Registration",
              "Customer Updated Successfully"
            )
            setOpen(false)
            setIsEdit(false)
            resetVal()
            getSetups()
          }
        })
        .catch(e => {
          console.log(e.response)
        })
    } else {
      let body = {
        setupTypeId: "46795C62-0430-478A-AE49-657558359895",
        customerName: Name,
        regDate: new Date(),
        address: BillingAddress,
        openingBalance: 0,
        ntnNo: ntn,
        phoneNo: Phone,
        mobileNo: Mobile,

        radDebitTrans: 0,
        creditDebitTrans: 0,
        radDebit: false,
        radCredit: false,
        actCode1: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        actCode2: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        actCode: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        deliveryAddress: DeliveryAddress,

        areaId: comboVal,
        dob: DOB,
        occupationId: subcomboVal,
        picPath: "",
        ms: "",
        cityId: selectedType,
        opBal: Number(opBal),
        opBalDate: opBalDate,
        extnNo: CPextn,
        attn: AttrMr,
        emailAddress: Email,
        contactPerson: CP,
        contactMobile: CPmobile,
        contactEmail: CPEmail,
        age: Number(Age),
        ppro: 0,
        phyto: 0,
        ip: 0,
        other: 0,
        gstno: gst,
        salary: 0,
        designation: designation,
        accNo: "",
        branchName: "",
        bankName: "",
        prjectId: "678594e9-2110-bdea-52ba-b1ea2487771d",
        fatherName: "",
        joiningDate: "1983-08-20T18:55:14.223Z",
        commission: 0,
        isvalid: true,
      }
      CREATE("/api/Setup/CreateMainSetup", body)
        .then(res => {
          if (res.status == 200) {
            openNotificationWithIcon(
              "success",
              "Customer Registration",
              "Customer Added Successfully"
            )
            setOpen(false)
            setIsEdit(false)
            resetVal()
            getSetups()
          }
        })
        .catch(e => {
          console.log(e.response)
        })
    }
  }

  const getCitySetup = () => {
    setshow(true)
    GET("/api/Setup/GetCitySetupCombo")
      .then(setups => {
        if (setups.status == 200) {
          setTypes(setups.data)
          setshow(false)
        }
      })
      .catch(e => {
        setshow(false)
        console.log(e.response)
      })
  }

  //  ========================= Api Integration Section Ends =========================

  useEffect(() => {
    getSetups()
    getCitySetup()
    getSetupAreaCombo()
    getOccupationSetup()
  }, [])

  const editSetup = item => {
    setEditObject(item)

    setSetupId(item.id)
    setName(item.customerName)

    setEmail(item.emailAddress)
    setPhone(item.phoneNo)

    setBillingAddress(item.address)
    setDeliveryAddress(item.deliveryAddress)
    setAge(item.age)

    setDOB(item.dob)
    setopBalDate(item.opBalDate)
    setopBal(item.opBal)
    setntn(item.ntnNo)
    setgst(item.gstno)

    setMobile(item.mobileNo)
    setCP(item.contactPerson)
    setCPEmail(item.contactEmail)
    setCPmobile(item.contactMobile)
    setCPExtn(item.extnNo)

    setAttrMr(item.attn)
    setDesignation(item.designation)

    setComboVal(item.areaSetup ? item.areaSetup.id : null)
    setSubComboVal(item.occupationSetup ? item.occupationSetup.id : null)
    setSelectedType(item.citySetup ? item.citySetup.id : null)

    setOpen(true)

    setTypeName(item.citySetup ? item.citySetup.name : null)
    setAccountName1(item.areaSetup ? item.areaSetup.name : null)
    setAccountName2(item.occupationSetup ? item.occupationSetup.name : null)

    setIsEdit(true)
  }

  const handleComboValue = e => {
    let value = e.target.innerText

    if (value) {
      let comboId = options.find(item => item.name === value)
      setAccountName1(value)
      setComboVal(comboId.id)
    }
  }

  const handleOptionType = e => {
    let value = e.target.innerText

    if (value) {
      let type = Types.find(item => item.name === value)
      setTypeName(value)
      setSelectedType(type.id)
    }
  }

  const handleComboValue2 = e => {
    let value = e.target.innerText

    if (value) {
      let comboId = subOption.find(item => item.name === value)
      setAccountName2(value)
      setSubComboVal(comboId.id)
    }
  }

  const classes = CardStyle()
  return (
    <React.Fragment>
      <Header />
      <Sidebar />

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Admin" breadcrumbItem="Customer Setup" />
          <BackDrop open={show} />
          <div className="checkout-tabs">
            <Row>
              <Col md="2"></Col>
              <Col lg="10">
                <Card className={classes.root}>
                  <h4 className="mt-4" style={{ textAlign: "center" }}>
                    Customer Setup
                  </h4>
                  <CardContent>
                    <div>
                      <Button
                        className="float-right mr-3"
                        color="primary"
                        variant="contained"
                        onClick={handleClickOpen}
                      >
                        Add Customer Setup
                      </Button>
                    </div>
                    {rows.length ? (
                      <TableContainer component={Paper}>
                        <Table
                          className={classes.table}
                          aria-label="custom pagination table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <b>Name</b>
                              </TableCell>
                              <TableCell>
                                <b>Address</b>
                              </TableCell>
                              <TableCell>
                                <b>Mobile No</b>
                              </TableCell>
                              <TableCell>
                                <b>Age</b>
                              </TableCell>
                              <TableCell>
                                <b>Actions</b>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {(rowsPerPage > 0
                              ? rows.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                              : rows
                            ).map((row, i) => (
                              <TableRow key={i}>
                                <TableCell>{row.customerName}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>{row.mobileNo}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>
                                  <Button
                                    onClick={() => editSetup(row)}
                                    color="primary"
                                    variant="contained"
                                  >
                                    Edit
                                  </Button>
                                  &nbsp;
                                  <Button color="secondary" variant="contained">
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}

                            {emptyRows > 0 && (
                              <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TablePagination
                                rowsPerPageOptions={[
                                  5,
                                  10,
                                  25,
                                  { label: "All", value: -1 },
                                ]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                  inputProps: {
                                    "aria-label": "rows per page",
                                  },
                                  native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                              />
                            </TableRow>
                          </TableFooter>
                        </Table>
                      </TableContainer>
                    ) : (
                      <h5>No Record Found</h5>
                    )}

                    <div className="container mt-5">
                      <TabGrid />
                    </div>
                  </CardContent>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>

        {/* add / edit dialog form */}
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Customer Setup</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Form>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Name"
                        value={Name}
                        onChange={e => setName(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Autocomplete
                        value={TypeName}
                        id="free-solo-demo"
                        onChange={handleOptionType}
                        options={Types.map(option => option.name)}
                        style={{ height: 55 }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select City"
                            margin="normal"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Autocomplete
                        value={AccountName1}
                        id="free-solo-demo"
                        onChange={handleComboValue}
                        options={options.map(option => option.name)}
                        style={{ height: 55 }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select Area"
                            margin="normal"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Autocomplete
                        value={AccountName2}
                        id="free-solo-demo"
                        onChange={handleComboValue2}
                        options={subOption.map(option => option.name)}
                        style={{ height: 55 }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select Occupation"
                            margin="normal"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Email"
                        value={Email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Phone no"
                        value={Phone}
                        onChange={e => setPhone(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Billing Address"
                        value={BillingAddress}
                        onChange={e => setBillingAddress(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Delivery Address"
                        value={DeliveryAddress}
                        onChange={e => setDeliveryAddress(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Age"
                        value={Age}
                        onChange={e => setAge(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">DOB</Label>
                      <Input
                        type="date"
                        value={moment(DOB).format("yy-MM-DD")}
                        onChange={e => setDOB(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="OP. Bal"
                        value={opBal}
                        onChange={e => setopBal(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <FormGroup>
                        <Label for="exampleEmail">OP. Bal Date</Label>
                        <Input
                          type="date"
                          value={moment(opBalDate).format("yy-MM-DD")}
                          onChange={e => setopBalDate(e.target.value)}
                        />
                      </FormGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="GST No"
                        value={gst}
                        onChange={e => setgst(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="NTN No"
                        value={ntn}
                        onChange={e => setntn(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Mobile no"
                        value={Mobile}
                        onChange={e => setMobile(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Contact Person"
                        value={CP}
                        onChange={e => setCP(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="C Per Extn#"
                        value={CPextn}
                        onChange={e => setCPExtn(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="C Per Email"
                        value={CPEmail}
                        onChange={e => setCPEmail(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Attn Mr"
                        value={AttrMr}
                        onChange={e => setAttrMr(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="C Mobile no"
                        value={CPmobile}
                        onChange={e => setCPmobile(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Designation"
                        value={designation}
                        onChange={e => setDesignation(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={10} />
                  <Col md={2}>
                    <Button
                      style={{ marginTop: "10px" }}
                      className="w-100"
                      color="primary"
                      variant="contained"
                      onClick={upsertSetup}
                    >
                      {isEdit ? "Edit" : "Add"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  )
}

export default CustomerRegistration
