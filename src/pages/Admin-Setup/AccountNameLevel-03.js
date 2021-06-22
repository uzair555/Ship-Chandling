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

function AccountNameLevel03() {
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

  const getSetupFillCombo = () => {
    setshow(true)
    GET("/api/Setup/GetAccFile1Combo")
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

  const getChildSetup = parentId => {
    setshow(true)
    GET("/api/Setup/GetAccFile2ComboFitler?AccFile1Id=" + parentId)
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
    GET("/api/Setup/GetAllAccFile3")
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
        accFile1Id: comboVal,
        accFile2Id: subcomboVal,
        code: EditObject.code,
        name: Name,
        opBal: EditObject.OpBal,
        opBalDate: EditObject.opBalDate,
        radDebitTrans: EditObject.radDebitTrans,
        radCreditTrans: EditObject.radCreditTrans,
        radDebit: false,
        radCredit: false,
        address: "",
        email: "",
        optType: selectedType,
        chkSupplier: supplier,
        chkCustomer: customer,
        chkExpense: expence,
        chkRecAcc: AC,
        chkComAgent: false,
        chkConsignee: false,
        chkImporter: false,
        chkExporter: false,
        isValid: false,
        createDate: EditObject.createDate,
        createUser: EditObject.createUser,
      }
      UPDATE(`/api/Setup/UpdateAccFile3`, body)
        .then(res => {
          if (res.status == 200) {
            openNotificationWithIcon(
              "success",
              "Account Name Level 03",
              "Account Level-03 Updated Successfully"
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
        accFileID1: comboVal,
        accFileID2: subcomboVal,
        code: "",
        name: Name,
        opBal: 52369278.661360055,
        opBalDate: "2020-02-02T00:04:26.817Z",
        radDebitTrans: -69749839.97272855,
        radCreditTrans: -40756678.75255311,
        radDebit: false,
        radCredit: false,
        address: "",
        email: "",
        optType: selectedType,
        chkSupplier: supplier,
        chkCustomer: customer,
        chkExpense: expence,
        chkRecAcc: AC,
        chkComAgent: false,
        chkConsignee: false,
        chkImporter: false,
        chkExporter: false,
        isValid: false,
      }
      CREATE("/api/Setup/CreateAccFile3", body)
        .then(res => {
          if (res.status == 200) {
            openNotificationWithIcon(
              "success",
              "Accounting Name Level 03",
              "Account Level-03 Added Successfully"
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

  const getOptionTypeSetup = () => {
    setshow(true)
    GET("/api/Setup/GetAllOptTypeSetup")
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
    getOptionTypeSetup()
    getSetupFillCombo()
  }, [])

  const editSetup = item => {
    setEditObject(item)

    setSetupId(item.id)
    setName(item.name)
    setComboVal(item.accFile1Setup ? item.accFile1Setup.id : null)
    setSubComboVal(item.accFile2Setup ? item.accFile2Setup.id : null)
    setSelectedType(item.optType)

    setAC(item.chkRecAcc)
    setSupplier(item.chkSupplier)
    setCustomer(item.chkCustomer)
    setExpence(item.chkExpense)

    setOpen(true)

    setAccountName1(item.accFile1Setup ? item.accFile1Setup.name : null)
    setAccountName2(item.accFile2Setup ? item.accFile2Setup.name : null)
    setTypeName(item.optTypeSetup ? item.optTypeSetup.name : null)

    setIsEdit(true)
  }

  const handleComboValue = e => {
    let value = e.target.innerText

    if (value) {
      let comboId = options.find(item => item.name === value)
      getChildSetup(comboId.id)
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
          <Breadcrumbs title="Admin" breadcrumbItem="Account Name Level-03" />
          <BackDrop open={show} />
          <div className="checkout-tabs">
            <Row>
              <Col md="2"></Col>
              <Col lg="10">
                <Card className={classes.root}>
                  <h4 className="mt-4" style={{ textAlign: "center" }}>
                    Chart of Account Level 03
                  </h4>
                  <CardContent>
                    <div>
                      <Button
                        className="float-right mr-3"
                        color="primary"
                        variant="contained"
                        onClick={handleClickOpen}
                      >
                        Add Account Setup Level-03
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
                                <b>Account Name 1</b>
                              </TableCell>
                              <TableCell>
                                <b>Account Name 2</b>
                              </TableCell>
                              <TableCell>
                                <b>Option Type</b>
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
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                  {row.accFile1Setup
                                    ? row.accFile1Setup.name
                                    : "-"}
                                </TableCell>
                                <TableCell>
                                  {row.accFile2Setup
                                    ? row.accFile2Setup.name
                                    : "-"}
                                </TableCell>
                                <TableCell>
                                  {row.optTypeSetup
                                    ? row.optTypeSetup.name
                                    : "-"}
                                </TableCell>
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
            Accouting Name Level 03
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
                        value={AccountName1}
                        id="free-solo-demo"
                        onChange={handleComboValue}
                        options={options.map(option => option.name)}
                        style={{ height: 55 }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select Account Level-01"
                            margin="normal"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
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
                            label="Select Account Level-02"
                            margin="normal"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
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
                            label="Option Type"
                            margin="normal"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={10}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={AC}
                            onChange={e => setAC(e.target.checked)}
                            name="AC"
                            color="primary"
                          />
                        }
                        label="Reg A/C"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={customer}
                            onChange={e => setCustomer(e.target.checked)}
                            name="customer"
                            color="primary"
                          />
                        }
                        label="Customer"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={supplier}
                            onChange={e => setSupplier(e.target.checked)}
                            name="supplier"
                            color="primary"
                          />
                        }
                        label="Supplier"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={expence}
                            onChange={e => setExpence(e.target.checked)}
                            name="expence"
                            color="primary"
                          />
                        }
                        label="Expense"
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

export default AccountNameLevel03
