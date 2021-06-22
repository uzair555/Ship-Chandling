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

function ItemSetup() {
  const [open, setOpen] = useState(false)
  const [show, setshow] = useState(false)
  const [rows, setRows] = useState([])
  const [Types, setTypes] = useState([])
  const [options, setOptions] = useState([])
  const [subOption, setSubOption] = useState([])

  const [isEdit, setIsEdit] = useState(false)
  const [EditObject, setEditObject] = useState({})

  const [chk1, SetChk1] = useState(false)
  const [chk2, SetChk2] = useState(false)
  const [chk3, SetChk3] = useState(false)
  const [chk4, SetChk4] = useState(false)
  const [chk5, SetChk5] = useState(false)
  const [chk6, SetChk6] = useState(false)
  const [chk7, SetChk7] = useState(false)

  const [setupId, setSetupId] = useState("")

  const [AccountName1, setAccountName1] = useState("")
  const [AccountName2, setAccountName2] = useState("")
  const [TypeName, setTypeName] = useState("")

  const [Name, setName] = useState("")
  const [itemCode, setitemCode] = useState("")
  const [barcode, setbarcode] = useState("")
  const [carret, setcarret] = useState("")
  const [quantity, setquantity] = useState("")
  const [computerNo, setcomputerNo] = useState("")
  const [purchaseRete, setpurchaseRete] = useState("")
  const [saleRate, setsaleRate] = useState("")
  const [vendorName, setvendorName] = useState("")
  const [itemDetail, setitemDetail] = useState("")
  const [packingQty, setpackingQty] = useState("")
  const [pcsRate, setpcsRate] = useState("")
  const [packRate, setpackRate] = useState("")
  const [botanicalName, setbotanicalName] = useState("")
  const [hsCode, sethsCode] = useState("")

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
    SetChk1(false)
    SetChk3(false)
    SetChk2(false)
  }

  const handleClose = () => {
    setOpen(false)
    resetVal()
    setIsEdit(false)
  }

  //  ========================= Api Integration Section Starts =========================

  const GetCategoryCombo = () => {
    setshow(true)
    GET("/api/Setup/GetCategorySetupCombo")
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

  const getUOMSetupCombo = () => {
    setshow(true)
    GET("/api/Setup/GetUOMSetupCombo")
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
    GET("/api/Setup/GetAllItemSetup")
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
        itemCode: Number(itemCode),
        name: Name,
        barcode: barcode,
        categoryId: comboVal,
        carret: Number(carret),
        quantity: Number(quantity),
        chkSold: true,
        computerNo: Number(computerNo),
        typeId: selectedType,
        picPath: "cupidatat in elit et aliquip",
        purchaseRete: Number(purchaseRete),
        saleRate: Number(saleRate),
        unitId: subcomboVal,
        vendorName: vendorName,
        itemDetail: itemDetail,
        packingQty: Number(packingQty),
        pcsRate: Number(pcsRate),
        packRate: Number(packRate),
        botanicalName: botanicalName,
        hsCode: hsCode,
        chk1: chk1,
        chk2: chk2,
        chk3: chk3,
        chk4: chk4,
        chk5: chk5,
        chk6: chk6,
        chk7: chk7,
        isActive: true,
        createDate: EditObject.createDate,
        createUser: EditObject.createUser,
      }
      UPDATE(`/api/Setup/UpdateItemSetup`, body)
        .then(res => {
          if (res.status == 200) {
            openNotificationWithIcon(
              "success",
              "Item Setup",
              "Item Setup Updated Successfully"
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
        itemCode: Number(itemCode),
        name: Name,
        barcode: barcode,
        categoryId: comboVal,
        carret: Number(carret),
        quantity: Number(quantity),
        chkSold: true,
        computerNo: Number(computerNo),
        typeId: selectedType,
        picPath: "cupidatat in elit et aliquip",
        purchaseRete: Number(purchaseRete),
        saleRate: Number(saleRate),
        unitId: subcomboVal,
        vendorName: vendorName,
        itemDetail: itemDetail,
        packingQty: Number(packingQty),
        pcsRate: Number(pcsRate),
        packRate: Number(packRate),
        botanicalName: botanicalName,
        hsCode: hsCode,
        chk1: chk1,
        chk2: chk2,
        chk3: chk3,
        chk4: chk4,
        chk5: chk5,
        chk6: chk6,
        chk7: chk7,
        isActive: true,
      }
      CREATE("/api/Setup/CreateItemSetup", body)
        .then(res => {
          if (res.status == 200) {
            openNotificationWithIcon(
              "success",
              "Item Setup",
              "Item Setup Added Successfully"
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
    GET("/api/Setup/GetTypeSetupCombo")
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
    getUOMSetupCombo()
    GetCategoryCombo()
  }, [])

  const editSetup = item => {
    setEditObject(item)

    setSetupId(item.id)
    setName(item.name)
    setComboVal(item.categorySetup ? item.categorySetup.id : null)
    setSubComboVal(item.uomSetup ? item.uomSetup.id : null)
    setSelectedType(item.typeSetup ? item.typeSetup.id : null)

    SetChk1(item.chkRecAcc)
    SetChk3(item.chkSupplier)
    SetChk2(item.chkCustomer)

    setitemCode(item.itemCode)
    setbarcode(item.barcode)
    setcomputerNo(item.computerNo)
    setpurchaseRete(item.purchaseRete)
    setsaleRate(item.saleRate)
    setvendorName(item.vendorName)
    setquantity(item.quantity)
    setcarret(item.carret)
    setitemDetail(item.itemDetail)
    setpackingQty(item.packingQty)
    setpcsRate(item.pcsRate)
    setpackRate(item.packRate)
    setbotanicalName(item.botanicalName)
    sethsCode(item.hsCode)
    SetChk1(item.chk1)
    SetChk2(item.chk2)
    SetChk3(item.chk3)
    SetChk4(item.chk4)
    SetChk5(item.chk5)
    SetChk6(item.chk6)
    SetChk7(item.chk7)
    
    setOpen(true)

    setAccountName1(item.categorySetup ? item.categorySetup.name : null)
    setAccountName2(item.uomSetup ? item.uomSetup.name : null)
    setTypeName(item.typeSetup ? item.typeSetup.name : null)

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
          <Breadcrumbs title="Admin" breadcrumbItem="Item Setup" />
          <BackDrop open={show} />
          <div className="checkout-tabs">
            <Row>
              <Col md="2"></Col>
              <Col lg="10">
                <Card className={classes.root}>
                  <h4 className="mt-4" style={{ textAlign: "center" }}>
                    Item Setup
                  </h4>
                  <CardContent>
                    <div>
                      <Button
                        className="float-right mr-3"
                        color="primary"
                        variant="contained"
                        onClick={handleClickOpen}
                      >
                        Add Item Setup
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
                                <b>Item Name</b>
                              </TableCell>
                              <TableCell>
                                <b>Item Code</b>
                              </TableCell>
                              <TableCell>
                                <b>Barcode</b>
                              </TableCell>
                              <TableCell>
                                <b>Category</b>
                              </TableCell>
                              <TableCell>
                                <b>Type</b>
                              </TableCell>
                              <TableCell>
                                <b>Unit</b>
                              </TableCell>
                              <TableCell>
                                <b>Carret</b>
                              </TableCell>
                              <TableCell>
                                <b>Quantity</b>
                              </TableCell>
                              <TableCell>
                                <b>Computer no</b>
                              </TableCell>
                              <TableCell>
                                <b>Purchase Rate</b>
                              </TableCell>
                              <TableCell>
                                <b>Sale Rate</b>
                              </TableCell>
                              <TableCell>
                                <b>Vendor Name</b>
                              </TableCell>
                              <TableCell>
                                <b>Item Details</b>
                              </TableCell>
                              <TableCell>
                                <b>Packing Quantity</b>
                              </TableCell>
                              <TableCell>
                                <b>PSC Rate</b>
                              </TableCell>
                              <TableCell>
                                <b>Pack Rate</b>
                              </TableCell>
                              <TableCell>
                                <b>Bontical Name</b>
                              </TableCell>
                              <TableCell>
                                <b>HS Code</b>
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
                                <TableCell>{row.itemCode}</TableCell>
                                <TableCell>{row.barcode}</TableCell>
                                <TableCell>
                                  {row.categorySetup
                                    ? row.categorySetup.name
                                    : "-"}
                                </TableCell>
                                <TableCell>
                                  {row.typeSetup ? row.typeSetup.name : "-"}
                                </TableCell>
                                <TableCell>
                                  {row.uomSetup ? row.uomSetup.name : "-"}
                                </TableCell>
                                <TableCell>{row.carret}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.computerNo}</TableCell>
                                <TableCell>{row.purchaseRete}</TableCell>
                                <TableCell>{row.saleRate}</TableCell>
                                <TableCell>{row.vendorName}</TableCell>
                                <TableCell>{row.itemDetail}</TableCell>
                                <TableCell>{row.packingQty}</TableCell>
                                <TableCell>{row.pcsRate}</TableCell>
                                <TableCell>{row.packRate}</TableCell>
                                <TableCell>{row.botanicalName}</TableCell>
                                <TableCell>{row.hsCode}</TableCell>
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
          <DialogTitle id="max-width-dialog-title">Item Setup</DialogTitle>
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
                        value={AccountName1}
                        id="free-solo-demo"
                        onChange={handleComboValue}
                        options={options.map(option => option.name)}
                        style={{ height: 55 }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select Category"
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
                        value={AccountName2}
                        id="free-solo-demo"
                        onChange={handleComboValue2}
                        options={subOption.map(option => option.name)}
                        style={{ height: 55 }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select UOM"
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
                        value={TypeName}
                        id="free-solo-demo"
                        onChange={handleOptionType}
                        options={Types.map(option => option.name)}
                        style={{ height: 55 }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select Type"
                            margin="normal"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Item Code"
                        value={itemCode}
                        onChange={e => setitemCode(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Barcode"
                        value={barcode}
                        onChange={e => setbarcode(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Carret"
                        value={carret}
                        onChange={e => setcarret(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Quantity"
                        value={quantity}
                        onChange={e => setquantity(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Computer No"
                        value={computerNo}
                        onChange={e => setcomputerNo(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Purchase Rate"
                        value={purchaseRete}
                        onChange={e => setpurchaseRete(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Sale Rate"
                        value={saleRate}
                        onChange={e => setsaleRate(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Vendor Name"
                        value={vendorName}
                        onChange={e => setvendorName(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Item Details"
                        value={itemDetail}
                        onChange={e => setitemDetail(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Packing Quantity"
                        value={packingQty}
                        onChange={e => setpackingQty(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="PCS Rate"
                        value={pcsRate}
                        onChange={e => setpcsRate(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="number"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Pack Rate"
                        value={packRate}
                        onChange={e => setpackRate(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="Botnical Name"
                        value={botanicalName}
                        onChange={e => setbotanicalName(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Input
                        type="text"
                        style={{ height: 55, marginTop: "16px" }}
                        placeholder="HS Code"
                        value={hsCode}
                        onChange={e => sethsCode(e.target.value)}
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
                            checked={chk1}
                            onChange={e => SetChk1(e.target.checked)}
                            name="AC"
                            color="primary"
                          />
                        }
                        label="Samll lots of Seed fruits & Vegetables"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={chk2}
                            onChange={e => SetChk2(e.target.checked)}
                            name="customer"
                            color="primary"
                          />
                        }
                        label="Plant / Part of planting (nurcery stock)"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={chk3}
                            onChange={e => SetChk3(e.target.checked)}
                            name="supplier"
                            color="primary"
                          />
                        }
                        label="Sowing"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={chk4}
                            name="expence"
                            color="primary"
                            onChange={e => SetChk4(e.target.checked)}
                          />
                        }
                        label="Consumption"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={chk5}
                            name="expence"
                            color="primary"
                            onChange={e => SetChk5(e.target.checked)}
                          />
                        }
                        label="For Oil Extraction "
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={chk6}
                            name="expence"
                            onChange={e => SetChk6(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="Fruit and Vegetable"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={chk7}
                            name="expence"
                            onChange={e => SetChk7(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="Others"
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

export default ItemSetup
