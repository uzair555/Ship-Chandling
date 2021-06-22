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

function ConsigneeRegistration() {
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
    setAddress("")
    setregDate(new Date())
    setAC(false)
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

  const getSetups = () => {
    setshow(true)
    GET(
      `/api/Setup/GetbySetupTypeMainSetup?SetupTypeId=FC70701C-9235-4CC4-9CEA-E171A750375D`
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
        setupTypeId: "FC70701C-9235-4CC4-9CEA-E171A750375D",
        customerName: Name,
        regDate: regDate,
        address: Address,
        openingBalance: 0,
        ntnNo: "",
        phoneNo: "",
        mobileNo: "",

        radDebitTrans: 0,
        creditDebitTrans: 0,
        radDebit: false,
        radCredit: false,
        actCode1: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        actCode2: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        actCode: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        deliveryAddress: "",

        areaId: "ba7fb258-eb3f-451b-83ff-7cb83252cc3a",
        dob: "1952-07-12T12:41:44.695Z",
        occupationId: "3c0f72bd-4211-47b3-95e3-2ce2a14ddd3a",
        picPath: "",
        ms: "",
        cityId: "f0311cbd-8b6a-401f-8659-2b49e1d28da5",
        opBal: 0,
        opBalDate: "2001-09-21T14:17:54.880Z",
        extnNo: "",
        attn: "",
        contactMobile: "",
        contactEmail: "",

        ppro: 0,
        phyto: 0,
        ip: 0,
        other: 0,
        salary: 0,
        designation: "",
        accNo: "",
        branchName: "",
        bankName: "",
        prjectId: "678594e9-2110-bdea-52ba-b1ea2487771d",
        fatherName: "",
        joiningDate: "1983-08-20T18:55:14.223Z",
        commission: 0,
        isvalid: true,
        createDate: EditObject.createDate,
        createUser: EditObject.createUser,
      }
      UPDATE(`/api/Setup/UpdateMainSetup`, body)
        .then(res => {
          if (res.status == 200) {
            openNotificationWithIcon(
              "success",
              "Consignee Setup",
              "Consignee Setup Updated Successfully"
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
        setupTypeId: "FC70701C-9235-4CC4-9CEA-E171A750375D",
        customerName: Name,
        regDate: regDate,
        address: Address,
        openingBalance: 0,
        ntnNo: "",
        phoneNo: "",
        mobileNo: "",

        radDebitTrans: 0,
        creditDebitTrans: 0,
        radDebit: false,
        radCredit: false,
        actCode1: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        actCode2: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        actCode: "5c6a0af8-5ccc-4af7-bfbe-ae875e95ebe8",
        deliveryAddress: "",

        areaId: "ba7fb258-eb3f-451b-83ff-7cb83252cc3a",
        dob: "1952-07-12T12:41:44.695Z",
        occupationId: "3c0f72bd-4211-47b3-95e3-2ce2a14ddd3a",
        picPath: "",
        ms: "",
        cityId: "f0311cbd-8b6a-401f-8659-2b49e1d28da5",
        opBal: 0,
        opBalDate: "2001-09-21T14:17:54.880Z",
        extnNo: "",
        attn: "",
        contactMobile: "",
        contactEmail: "",

        ppro: 0,
        phyto: 0,
        ip: 0,
        other: 0,
        salary: 0,
        designation: "",
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
              "Consignee Setup",
              "Consignee Setup Added Successfully"
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
    getSetups()
  }, [])

  const editSetup = item => {
    setEditObject(item)

    setSetupId(item.id)
    setName(item.customerName)

    setAddress(item.address)
    setregDate(item.regDate)

    setOpen(true)

    setIsEdit(true)
  }

  const classes = CardStyle()
  return (
    <React.Fragment>
      <Header />
      <Sidebar />

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Admin" breadcrumbItem="Consignee Setup" />
          <BackDrop open={show} />
          <div className="checkout-tabs">
            <Row>
              <Col md="2"></Col>
              <Col lg="10">
                <Card className={classes.root}>
                  <h4 className="mt-4" style={{ textAlign: "center" }}>
                    Consignee Setup
                  </h4>
                  <CardContent>
                    <div>
                      <Button
                        className="float-right mr-3"
                        color="primary"
                        variant="contained"
                        onClick={handleClickOpen}
                      >
                        Add Consignee Setup
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
          <DialogTitle id="max-width-dialog-title">Consignee Setup</DialogTitle>
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
                      <Label for="exampleEmail">Reg Date.</Label>
                      <Input
                        type="date"
                        value={moment(regDate).format("yy-MM-DD")}
                        onChange={e => setregDate(e.target.value)}
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

export default ConsigneeRegistration
