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

function ContractEmployee() {
  const [open, setOpen] = useState(false)
  const [show, setshow] = useState(false)
  const [rows, setRows] = useState([])
  const [options, setOptions] = useState([])
  const [subOption, setSubOption] = useState([])

  const [isEdit, setIsEdit] = useState(false)
  const [EditObject, setEditObject] = useState({})

  const [AC, setAC] = useState(false)
  const [customer, setCustomer] = useState(false)
  const [supplier, setSupplier] = useState(false)
  const [expence, setExpence] = useState(false)

  const [setupId, setSetupId] = useState("")
  const [regDate, setregDate] = useState(new Date())
  const [joiningDate, setjoiningDate] = useState(new Date())

  const [Bank, setBank] = useState("")
  const [Branch, setBranch] = useState("")
  const [Ac, setAc] = useState("")
  const [FatherName, setFatherName] = useState("")
  const [CityName, setCityName] = useState("")
  const [AreaName, setAreaName] = useState("")
  const [Address, setAddress] = useState("")
  const [NIC, setNIC] = useState("")
  const [Phone, setPhone] = useState("")
  const [Mobile, setMobile] = useState("")
  const [Email, setEmail] = useState("")
  const [Fax, setFax] = useState("")
  const [OPBalance, setOPBalance] = useState("")
  const [NTN, setNTN] = useState("")
  const [STN, setSTN] = useState("")

  const [SetupTypeId, setSetupTypeId] = useState("")

  const [TypeName, setTypeName] = useState("")

  const [designation, setDesignation] = useState("")
  const [salary, setSalary] = useState("")
  const [Name, setName] = useState("")
  const [CrLimit, setCrLimit] = useState("")
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
    setCityName("")
    setAreaName("")
    setTypeName("")
    setName("")

    setDesignation("")
    setNTN("")
    setSTN("")
    setEmail("")
    setFax("")
    setNIC("")

    setAddress("")
    setOPBalance("")
    setPhone("")
    setMobile("")

    setFatherName("")
    setAc("")
    setBank("")
    setBranch("")
    setSalary("")

    setCrLimit("")
    setregDate(new Date())
    setjoiningDate(new Date())

    setIsEdit(false)

    setSupplier(false)
    setCustomer(false)
    setExpence(false)
  }

  const handleClose = () => {
    setOpen(false)
    resetVal()
    setIsEdit(false)
  }

  //  ========================= Api Integration Section Starts =========================

  const getCityFillCombo = () => {
    setshow(true)
    GET("/api/Setup/GetCitySetupCombo")
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

  const getAreaSetup = () => {
    setshow(true)
    GET("/api/Setup/GetAreaSetupCombo")
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
      `/api/Setup/GetbySetupTypeMainSetup?SetupTypeId=BBAFD7A1-22E0-40E4-8A84-EEE113BFD42D`
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
        setupTypeId: "BBAFD7A1-22E0-40E4-8A84-EEE113BFD42D",
        customerName: Name,
        regDate: regDate,
        address: Address,
        openingBalance: 45570020.41704482,
        phoneNo: Phone,
        mobileNo: Mobile,
        emailAddress: Email,
        faxNo: Fax,
        remarks: NIC, // remarks = nic number
        ntnNo: NTN,
        gstno: STN,
        radDebitTrans: 0,
        creditDebitTrans: 0,
        radDebit: false,
        radCredit: false,
        actCode1: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        actCode2: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        actCode: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        deliveryAddress: "",

        cityId: comboVal,
        areaId: subcomboVal,
        dob: "1952-07-12T12:41:44.695Z",
        occupationId: "3c0f72bd-4211-47b3-95e3-2ce2a14ddd3a",
        picPath: "aute veniam",
        ms: "",
        opBal: Number(OPBalance),
        opBalDate: "2001-09-21T14:17:54.880Z",
        extnNo: "",
        attn: "ea ",
        contactMobile: "dolor",
        contactEmail: "do Excepteur",

        ppro: 0,
        phyto: 0,
        ip: 0,
        other: 0,
        salary: Number(salary),
        designation: designation,
        accNo: Ac,
        cnic: NIC,
        branchName: Branch,
        bankName: Bank,
        prjectId: "678594e9-2110-bdea-52ba-b1ea2487771d",
        fatherName: FatherName,
        joiningDate: joiningDate,
        commission: Number(CrLimit), // commission = cr limit
        isvalid: true,
        createDate: EditObject.createDate,
        createUser: EditObject.createUser,
      }
      UPDATE(`/api/Setup/UpdateMainSetup`, body)
        .then(res => {
          if (res.status == 200) {
            openNotificationWithIcon(
              "success",
              "Contract Employee",
              "Contract Employee Updated Successfully"
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
        setupTypeId: "BBAFD7A1-22E0-40E4-8A84-EEE113BFD42D",
        customerName: Name,
        regDate: regDate,
        address: Address,
        openingBalance: 45570020.41704482,
        phoneNo: Phone,
        mobileNo: Mobile,
        emailAddress: Email,
        faxNo: Fax,
        remarks: NIC, // remarks = nic number
        ntnNo: NTN,
        gstno: STN,
        radDebitTrans: 0,
        creditDebitTrans: 0,
        radDebit: false,
        radCredit: false,
        actCode1: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        actCode2: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        actCode: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        deliveryAddress: "magna pariatur",

        cityId: comboVal,
        areaId: subcomboVal,
        dob: "1952-07-12T12:41:44.695Z",
        occupationId: "3c0f72bd-4211-47b3-95e3-2ce2a14ddd3a",
        picPath: "aute veniam",
        ms: "",
        opBal: Number(OPBalance),
        opBalDate: "2001-09-21T14:17:54.880Z",
        extnNo: "",
        attn: "ea ",
        contactMobile: "dolor",
        contactEmail: "do Excepteur",

        ppro: 58052124.97956419,
        phyto: -65136181.21169942,
        ip: -54174999.125676624,
        other: -57158909.200703435,
        salary: Number(salary),
        designation: designation,
        accNo: Ac,
        cnic: NIC,
        branchName: Branch,
        bankName: Bank,
        prjectId: "678594e9-2110-bdea-52ba-b1ea2487771d",
        fatherName: FatherName,
        joiningDate: joiningDate,
        commission: Number(CrLimit), // commission = cr limit
        isvalid: true,
      }
      CREATE("/api/Setup/CreateMainSetup", body)
        .then(res => {
          if (res.status == 200) {
            openNotificationWithIcon(
              "success",
              "Contract Employee",
              "Contract Employee Added Successfully"
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

  //  ========================= Api Integration Section Ends =========================

  useEffect(() => {
    getCityFillCombo()
    getAreaSetup()
    getSetups()
  }, [])

  const editSetup = item => {
    setEditObject(item)

    setSetupId(item.id)
    setName(item.customerName)
    setComboVal(item.citySetup ? item.citySetup.id : null)
    setSubComboVal(item.areaSetup ? item.areaSetup.id : null)

    setDesignation(item.designation)
    setNTN(item.ntnNo)
    setSTN(item.gstno)
    setEmail(item.emailAddress)
    setFax(item.faxNo)
    setNIC(item.cnic)

    setAddress(item.address)
    setOPBalance(item.opBal)
    setPhone(item.phoneNo)
    setMobile(item.mobileNo)

    setFatherName(item.fatherName)
    setAc(item.accNo)
    setBank(item.bankName)
    setBranch(item.branchName)
    setSalary(item.salary)

    setOpen(true)

    setCrLimit(item.commission)
    setregDate(item.regDate)
    setjoiningDate(item.joiningDate)

    setCityName(item.citySetup ? item.citySetup.name : null)
    setAreaName(item.areaSetup ? item.areaSetup.name : null)

    setIsEdit(true)
  }

  const handleComboValue = e => {
    let value = e.target.innerText

    if (value) {
      let comboId = options.find(item => item.name === value)
      setCityName(value)
      setComboVal(comboId.id)
    }
  }

  const handleComboValue2 = e => {
    let value = e.target.innerText

    if (value) {
      let comboId = subOption.find(item => item.name === value)
      setAreaName(value)
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
          <Breadcrumbs title="Admin" breadcrumbItem="Contract Employee" />
          <BackDrop open={show} />
          <div className="checkout-tabs">
            <Row>
              <Col md="2"></Col>
              <Col lg="10">
                <Card className={classes.root}>
                  <h4 className="mt-4" style={{ textAlign: "center" }}>
                    Contract Employee
                  </h4>
                  <CardContent>
                    <div>
                      <Button
                        className="float-right mr-3"
                        color="primary"
                        variant="contained"
                        onClick={handleClickOpen}
                      >
                        Add Contract Employee
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
                                <b>Employee Name</b>
                              </TableCell>
                              <TableCell>
                                <b>Address</b>
                              </TableCell>
                              <TableCell>
                                <b>Mobile no</b>
                              </TableCell>
                              <TableCell>
                                <b>Fax no</b>
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
                                <TableCell>{row.faxNo}</TableCell>
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
          <DialogTitle id="max-width-dialog-title">
            Contract Employee
          </DialogTitle>
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
                        value={CityName}
                        id="free-solo-demo"
                        onChange={handleComboValue}
                        options={options.map(option => option.name)}
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
                        value={AreaName}
                        id="free-solo-demo"
                        onChange={handleComboValue2}
                        options={subOption.map(option => option.name)}
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
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Father Name"
                        value={FatherName}
                        onChange={e => setFatherName(e.target.value)}
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
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="A/c #"
                        value={Ac}
                        onChange={e => setAc(e.target.value)}
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
                        placeholder="Bank"
                        value={Bank}
                        onChange={e => setBank(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Branch"
                        value={Branch}
                        onChange={e => setBranch(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Salary"
                        value={salary}
                        onChange={e => setSalary(e.target.value)}
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
                        placeholder="Address"
                        value={Address}
                        onChange={e => setAddress(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="NIC"
                        value={NIC}
                        onChange={e => setNIC(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Phone"
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
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Mobile"
                        value={Mobile}
                        onChange={e => setMobile(e.target.value)}
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
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Fax no"
                        value={Fax}
                        onChange={e => setFax(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="OP Balance"
                        value={OPBalance}
                        onChange={e => setOPBalance(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="NTN"
                        value={NTN}
                        onChange={e => setNTN(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="STN"
                        value={STN}
                        onChange={e => setSTN(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="CR Limit"
                        value={CrLimit}
                        onChange={e => setCrLimit(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">Reg Date.</Label>
                      <Input
                        type="date"
                        value={moment(regDate).format("yy-MM-DD")}
                        onChange={e => setregDate(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">Joining Date.</Label>
                      <Input
                        type="date"
                        value={moment(joiningDate).format("yy-MM-DD")}
                        onChange={e => setjoiningDate(e.target.value)}
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

export default ContractEmployee