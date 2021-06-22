import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import "./SidebarContent.css"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

import axios from "axios"
//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu" className="dark-theme-bg-color">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Dashboard </li>
            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="bx bx-home-circle"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            <li className="menu-title">Features</li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-archive"></i>
                <span>Admin</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/admin/accounting-year">Accounting Year</Link>
                </li>
                <li>
                  <Link to="/admin/account-name-level-01">
                    Account Name Level-01
                  </Link>
                </li>
                <li>
                  <Link to="/admin/account-name-level-02">
                    Account Name Level-02
                  </Link>
                </li>
                <li>
                  <Link to="/admin/account-name-level-03">
                    Account Name Level-03
                  </Link>
                </li>
                <li>
                  <Link to="/admin/option-types">Option Types</Link>
                </li>
                <li>
                  <Link to="/admin/category-setup">Category Setup</Link>
                </li>
                <li>
                  <Link to="/admin/origin-setup">Origin Setup</Link>
                </li>
                <li>
                  <Link to="/admin/setup-type">Setup Type</Link>
                </li>
                <li>
                  <Link to="/admin/area-setup">Area Setup</Link>
                </li>
                <li>
                  <Link to="/admin/type-setup">Type Setup</Link>
                </li>

                <li>
                  <Link to="/admin/company-setup">Company Setup</Link>
                </li>
                <li>
                  <Link to="/admin/subcompany-setup">Sub Company Setup</Link>
                </li>
                <li>
                  <Link to="/admin/item-setup">Commodity Name Setup</Link>
                </li>
                <li>
                  <Link to="/admin/customer-registration">Customer Registration</Link>
                </li>
                <li>
                  <Link to="/admin/supplier-setup">Vendor Registration</Link>
                </li>
                <li>
                  <Link to="/admin/comission-agent">Commission Agent Setup</Link>
                </li>
                <li>
                  <Link to="/admin/uom-setup">UOM Setup</Link>
                </li>
                {/* <li>
                  <Link to="/">Commodity Name Setup</Link>
                </li> */}
                <li>
                  <Link to="/admin/employee-setup">Employee Registration</Link>
                </li>
                <li>
                  <Link to="/admin/expence-setup">Expense Setup</Link>
                </li>
                <li>
                  <Link to="/admin/godown-setup">Godown Setup</Link>
                </li>
                <li>
                  <Link to="/admin/occupation-setup">Occupation Setup</Link>
                </li>
                <li>
                  <Link to="/admin/vessel-setup">Vessel Setup</Link>
                </li>
                <li>
                  <Link to="/admin/port-setup">Port Setup</Link>
                </li>
                <li>
                  <Link to="/admin/import-and-export">Import / Export</Link>
                </li>
                <li>
                  <Link to="/admin/consignee-setup">Consignee Setup</Link>
                </li>
                <li>
                  <Link to="/admin/contract-employee-setup">Contract Employees</Link>
                </li>
                <li>
                  <Link to="/admin/concentration-setup">Chemical Concentration</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-archive"></i>
                <span>Data Entry</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/" className="has-arrow waves-effect">
                    Application Entries & Fumigation Certificates
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/">P.P.R.O Entry Fumigation Certificate</Link>
                    </li>
                    <li>
                      <Link to="/">IP Application Entry</Link>
                    </li>
                    <li>
                      <Link to="/">
                        Phytosanitry Entry And Fumigation Certificate
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        Other Entries And Fumigation Certificate
                      </Link>
                    </li>
                    <li>
                      <Link to="/">Port Health Certificate</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/" className="has-arrow waves-effect">
                    Accounts Section
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/">Purchage Invoice</Link>
                    </li>
                    <li>
                      <Link to="/">Sales Invoice</Link>
                    </li>
                    <li>
                      <Link to="/">Payment Voucher</Link>
                    </li>
                    <li>
                      <Link to="/">Journal Voucher</Link>
                    </li>
                    <li>
                      <Link to="/">Direct Sale Invoice</Link>
                    </li>
                    <li>
                      <Link to="/">Stock Transfer</Link>
                    </li>
                    <li>
                      <Link to="/">Receipt Voucher</Link>
                    </li>
                    <li>
                      <Link to="/">Petty Cash Voucher</Link>
                    </li>
                    <li>
                      <Link to="/">Salary Sheet</Link>
                    </li>
                    <li>
                      <Link to="/">Contract Payment</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/" className="has-arrow waves-effect">
                <i className="bx bxs-report"></i>
                <span>Reporting</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/">Account List</Link>
                </li>
                <li>
                  <Link to="/">Payment Voucher Report</Link>
                </li>
                <li>
                  <Link to="/">Receipt Voucher Report</Link>
                </li>
                <li>
                  <Link to="/">Journal Voucher Report</Link>
                </li>
                <li>
                  <Link to="/">Petty Cash Voucher Report</Link>
                </li>
                <li>
                  <Link to="/">Sale Invoice Report</Link>
                </li>
                <li>
                  <Link to="/">Summary Sale Report</Link>
                </li>
                <li>
                  <Link to="/">Purchase Invoice Report</Link>
                </li>
                <li>
                  <Link to="/">Account Ledger</Link>
                </li>
                <li>
                  <Link to="/">Commission Ledger</Link>
                </li>
                <li>
                  <Link to="/">Stock Ledger Report</Link>
                </li>
                <li>
                  <Link to="/">Current Stock</Link>
                </li>
                <li>
                  <Link to="/">Expense Summary Report</Link>
                </li>
                <li>
                  <Link to="/">Balance Sheet</Link>
                </li>
                <li>
                  <Link to="/">Trial Balance</Link>
                </li>
                <li>
                  <Link to="/">Net Profit Report</Link>
                </li>
                <li>
                  <Link to="/">Gross Profit Report</Link>
                </li>
                <li>
                  <Link to="/">Income Statement</Link>
                </li>
                <li>
                  <Link to="/">Chemical Conuspmtion Report</Link>
                </li>
                <li>
                  <Link to="/">P.P.R.O Report</Link>
                </li>
                <li>
                  <Link to="/">Export Fumigation Certificate Report</Link>
                </li>
                <li>
                  <Link to="/">Import Fumigation Certificate Report</Link>
                </li>
                <li>
                  <Link to="/">IP Application Report</Link>
                </li>
                <li>
                  <Link to="/">Phylosanitry App Report</Link>
                </li>
                <li>
                  <Link to="/">Other Entry Report</Link>
                </li>
                <li>
                  <Link to="/">Customer Summary Report</Link>
                </li>
                <li>
                  <Link to="/">Port Health Report</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/" className="has-arrow waves-effect">
                <i className="bx bxs-lock"></i>
                <span>Security</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/">Add / Delete User</Link>
                </li>
                <li>
                  <Link to="/">Change Password</Link>
                </li>
                <li>
                  <Link to="/">User Security</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}
export default withRouter(withTranslation()(SidebarContent))
