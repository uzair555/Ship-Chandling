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

//Import Breadcrumb
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

import { CREATE, GET, UPDATE, DELETE } from "../../configuration/API-Instance"
import { notification } from "antd"

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

export default function SetupType() {
  const [show, setshow] = useState(false)
  const [rows, setrows] = useState([])
  const [open, setOpen] = useState(false)

  const [isEdit, setIsEdit] = useState(false)
  const [editObject, seteditObject] = useState({})
  const [setupId, setSetupId] = useState("")

  const [Name, setName] = useState("")
  const [UnitQyt, setUnitQyt] = useState(0)

  const classes = CardStyle()

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
    setUnitQyt("")
    setIsEdit(false)
  }

  //  ========================= Api Integration Section Starts =========================

  const getUOMSetup = () => {
    setshow(true)
    GET("/api/Setup/GetAllUOMSetup")
      .then(setups => {
        if (setups.status == 200) {
          setrows(setups.data)
          setshow(false)
        }
      })
      .catch(e => {
        setshow(false)
        console.log(e.response)
      })
  }

  const upsertUOMSetup = () => {
    if (!!isEdit) {
      let body = {
        id: setupId,
        name: Name,
        unitQty: Number(UnitQyt),
        isValid: true,
        createDate: editObject.createDate,
        createUser: editObject.createUser,
      }
      UPDATE(`/api/Setup/UpdateUOMSetup`, body)
        .then(res => {
          if (res.status == 200) {
            openNotificationWithIcon(
              "success",
              "UOM Setup",
              "UOM Setup Updated Successfully"
            )
            setOpen(false)
            setName("")
            setUnitQyt("")
            setIsEdit(false)
            getUOMSetup()
          }
        })
        .catch(e => {
          console.log(e.response)
        })
    } else {
      let body = {
        name: Name,
        unitQty: Number(UnitQyt),
        isValid: true,
      }
      CREATE("/api/Setup/CreateUOMSetup", body)
        .then(res => {
          if (res.status == 200) {
            openNotificationWithIcon(
              "success",
              "UOM Setup",
              "UOM Setup Added Successfully"
            )
            setOpen(false)
            setName("")
            setUnitQyt("")
            setIsEdit(false)
            getUOMSetup()
          }
        })
        .catch(e => {
          console.log(e.response)
        })
    }
  }

  //  ========================= Api Integration Section Ends =========================

  useEffect(() => {
    getUOMSetup()
  }, [])

  const editSetup = item => {
    seteditObject(item)

    setSetupId(item.id)
    setName(item.name)
    setUnitQyt(item.unitQty)
    setOpen(true)

    setIsEdit(true)
  }

  return (
    <React.Fragment>
      <Header />
      <Sidebar />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Admin" breadcrumbItem="UOM Setup" />
          <BackDrop open={show} />
          <Row>
            <Col md="2"></Col>
            <Col lg="10">
              <Card className={classes.root}>
                <h4 className="mt-4" style={{ textAlign: "center" }}>
                  UOM Setup
                </h4>
                <CardContent>
                  <div>
                    <Button
                      className="float-right mr-3"
                      color="primary"
                      variant="contained"
                      onClick={handleClickOpen}
                    >
                      Add UOM Setup
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
                              <b>Unit Name</b>
                            </TableCell>
                            <TableCell>
                              <b>Unit Qyt</b>
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
                              <TableCell>{row.unitQty}</TableCell>
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
                                inputProps: { "aria-label": "rows per page" },
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
        </Container>

        {/* add / edit dialog form */}
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">UOM Setup</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Form>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">UOM Setup</Label>
                      <Input
                        type="text"
                        value={Name}
                        placeholder="UOM Setup"
                        onChange={e => setName(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Unit Quantity</Label>
                      <Input
                        type="number"
                        value={UnitQyt}
                        placeholder="Unit Quantity"
                        onChange={e => setUnitQyt(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={10} />
                  <Col md={2}>
                    <Button
                      className="w-100"
                      color="primary"
                      variant="contained"
                      onClick={upsertUOMSetup}
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
