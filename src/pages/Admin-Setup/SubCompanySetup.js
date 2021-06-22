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
import Password from "antd/lib/input/Password"

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

function SubCompanySetup() {
  const [open, setOpen] = useState(false)
  const [show, setshow] = useState(false)
  const [rows, setRows] = useState([])
  const [options, setOptions] = useState([])


  const [isEdit, setIsEdit] = useState(false)
  const [editObject, setEditObject] = useState({})

  const [setupId, setSetupId] = useState("")
  const [comboText, setComboText] = useState("")


  const [Name, setName] = useState("")
  const [comboVal, setComboVal] = useState("")

  
  const [Address, setAddress] = useState("")
  const [Phone, setPhone] = useState("")
  const [Email, setEmail] = useState("")
  const [faxNo, setFaxno] = useState("")
  const [Website, setWebsite] = useState("")
  const [GSTno, setGSTno] = useState("")
  const [NTNno, setNTNno] = useState("")
  const [ShortName, setShortName] = useState("")
  const [password, setPassword] = useState("")

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

  const handleClose = () => {
    setOpen(false)
    setName("")
    setAddress("")
    setPhone("")
    setWebsite("")
    setNTNno("")
    setGSTno("")
    setIsEdit(false)
    setComboText("")
    setFaxno("")
    setShortName("")
    setPassword("")
    setEmail("")
  }

  //  ========================= Api Integration Section Starts =========================

  const getSetupFillCombo = () => {
    setshow(true)
    GET("/api/Setup/GetCompanySetupCombo")
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

  const getSetups = () => {
    setshow(true)
    GET("/api/Setup/GetAllSubCompanySetup")
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

  const upsertSubCompany = () => {
    if (!!isEdit) {
      let body = {
        id: setupId,
        companyId : comboVal,
        subCompanyName: Name,
        address : Address,
        phoneNo : Phone,
        emailAddress : Email,
        faxNo : faxNo,
        gstNo : GSTno,
        ntnNo : NTNno,
        shortName : ShortName,
        password : password,
        webAddress: Website,
        isValid: true,
        createDate: editObject.createDate,
        createUser: editObject.createdUser,
      }
      UPDATE(`/api/Setup/UpdateSubCompanySetup`, body)
        .then(res => {
          if (res.status == 200) {
            openNotificationWithIcon(
              "success",
              "Accounting Name Level 02",
              "Account Level-02 Updated Successfully"
            )
            setOpen(false)
            setName("")
            setComboText("")
            setIsEdit(false)
            getSetups()
          }
        })
        .catch(e => {
          console.log(e.response)
        })
    } else {
      let body = {
        companyId : comboVal,
        subCompanyName: Name,
        address : Address,
        phoneNo : Phone,
        emailAddress : Email,
        faxNo : faxNo,
        gstNo : GSTno,
        ntnNo : NTNno,
        shortName : ShortName,
        password : password,
        webAddress: Website,
        isValid: true,
      }
      CREATE("/api/Setup/CreateSubCompanySetup", body)
        .then(res => {
          if (res.status == 200) {
            openNotificationWithIcon(
              "success",
              "Sub Company",
              "Sub Company Added Successfully"
            )
            setOpen(false)
            setName("")
            setComboText("")
            setIsEdit(false)
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
    getSetupFillCombo()
  }, [])

  const editSetup = item => {
    setEditObject(item)

    setSetupId(item.id)
    setName(item.subCompanyName)
    setAddress(item.address)
    setPhone(item.phoneNo)
    setEmail(item.emailAddress)
    setFaxno(item.faxNo)
    setWebsite(item.webAddress)
    setGSTno(item.gstNo)
    setNTNno(item.ntnNo)
    setShortName(item.shortName)
    setPassword(item.password)
    setComboVal(item.companyId)
    setOpen(true)

    setIsEdit(true)

    setComboText(item.companySetups ? item.companySetups.companyName : null)
  }

  const handleComboValue = e => {
    let value = e.target.innerText

    if (value) {
      let comboId = options.find(item => item.companyName === value)
      setComboText(value)
      setComboVal(comboId.id)
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
          <Breadcrumbs title="Admin" breadcrumbItem="Sub Company Setup" />
          <BackDrop open={show} />
          <div className="checkout-tabs">
            <Row>
              <Col md="2"></Col>
              <Col lg="10">
                <Card className={classes.root}>
                  <h4 className="mt-4" style={{ textAlign: "center" }}>
                    Sub Company Setup
                  </h4>
                  <CardContent>
                    <div>
                      <Button
                        className="float-right mr-3"
                        color="primary"
                        variant="contained"
                        onClick={handleClickOpen}
                      >
                        Add Sub Company
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
                                <b>Parent Company Name</b>
                              </TableCell>
                              <TableCell>
                                <b>Sub Company Name</b>
                              </TableCell>
                              <TableCell>
                                <b>Sub Company Address</b>
                              </TableCell>
                              <TableCell>
                                <b>Phone No</b>
                              </TableCell>
                              <TableCell>
                                <b>Email Address</b>
                              </TableCell>
                              <TableCell>
                                <b>Fax no</b>
                              </TableCell>
                              <TableCell>
                                <b>Web Address</b>
                              </TableCell>
                              <TableCell>
                                <b>GST no</b>
                              </TableCell>
                              <TableCell>
                                <b>NTN no</b>
                              </TableCell>
                              
                              <TableCell>
                                <b>ShortName</b>
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
                                <TableCell>
                                  {row.companySetups
                                    ? row.companySetups.companyName
                                    : "-"}
                                </TableCell> 
                                <TableCell>{row.subCompanyName}</TableCell>
                                
                                

                                <TableCell>{row.address}</TableCell>
                              <TableCell>{row.phoneNo}</TableCell>
                              <TableCell>{row.emailAddress}</TableCell>
                              <TableCell>
                                {row.faxNo ? row.faxNo : "-"}
                              </TableCell>
                              <TableCell>
                                {row.webAddress ? row.webAddress : "-"}
                              </TableCell>
                              <TableCell>{row.gstNo}</TableCell>
                              <TableCell>{row.ntnNo}</TableCell>
                              <TableCell>{row.shortName}</TableCell>
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
          maxWidth={"sm"}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            Sub Company Setup
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Form>
                <Row form>
                  <Col md={6}>
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
                  <Col md={6}>
                    <FormGroup>
                      <Autocomplete
                        value={comboText}
                        id="free-solo-demo"
                        onChange={handleComboValue}
                        options={options.map(option => option.companyName)}
                        style={{ height: 55 }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select Company"
                            margin="normal"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormGroup>
                  </Col>
                  
                  <Col md={6}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Company Address"
                        value={Address}
                        onChange={e => setAddress(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Phone Number"
                        value={Phone}
                        onChange={e => setPhone(e.target.value)}
                      />
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Email Address"
                        value={Email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Fax No"
                        value={faxNo}
                        onChange={e => setFaxno(e.target.value)}
                      />
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Web Address"
                        value={Website}
                        onChange={e => setWebsite(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="GST No"
                        value={GSTno}
                        onChange={e => setGSTno(e.target.value)}
                      />
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="NTN No"
                        value={NTNno}
                        onChange={e => setNTNno(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Short Name"
                        value={ShortName}
                        onChange={e => setShortName(e.target.value)}
                      />
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      {/* <Label for="exampleEmail">Textfeild</Label> */}
                      <Input
                        type="password"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
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
                      onClick={upsertSubCompany}
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

export default SubCompanySetup
