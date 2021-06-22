import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import Login from "../pages/AuthenticationInner/Login"
import SignUp from "../pages/AuthenticationInner/SignUp"
import ResetPassword from "../pages/AuthenticationInner/ResetPassword"
import ForgotPassword from "../pages/AuthenticationInner/ForgotPassword"
import OTPPage from "../pages/AuthenticationInner/OTPPage"

// token based routes
import Dashboard from "../pages/Dashboard/index"
import AccountingYear from "../pages/Admin-Setup/AccountingYear"
import AccountNameLevel01 from "../pages/Admin-Setup/AccountNameLevel-01"
import AccountNameLevel02 from "../pages/Admin-Setup/AccountNameLevel-02"
import OPT_Type from "../pages/Admin-Setup/OPT-Type"
import AccountNameLevel03 from "../pages/Admin-Setup/AccountNameLevel-03"
import CategorySetup from "../pages/Admin-Setup/CategorySetup"
import GoDownSetup from "../pages/Admin-Setup/GodownSetup"
import Occupation from "../pages/Admin-Setup/OccupationSetup"
import AreaSetup from "../pages/Admin-Setup/AreaSetup"
import CompanySetup from "../pages/Admin-Setup/CompanySetup"
import ExpenceSetup from "../pages/Admin-Setup/ExpenceSetup"
import PortSetup from "../pages/Admin-Setup/PortSetup"
import SubCompanySetup from "../pages/Admin-Setup/SubCompanySetup"

import SetupType from "../pages/Admin-Setup/SetupType"
import TypeSetup from "../pages/Admin-Setup/TypeSetup"
import VesselSetup from "../pages/Admin-Setup/VesselSetup"
import UOMSetup from "../pages/Admin-Setup/UOMSetup"
import OriginSetup from "../pages/Admin-Setup/OriginSetup"
import SupplierSetup from "../pages/Admin-Setup/SuppplierSetup"
import ItemSetup from "../pages/Admin-Setup/ItemSetup"
import ImportandExport from "../pages/Admin-Setup/Import&Export"
import ComissionAgentSetup from "../pages/Admin-Setup/ComissionAgent"
import ConsigneeRegistration from "../pages/Admin-Setup/ConsigneeRegistration"
import EmployeeRegistration from "../pages/Admin-Setup/EmployeeRegistration"
import ContractEmployee from "../pages/Admin-Setup/ContractEmployee"

import NotFound from "../pages/Utility/pages-404"

import PrivateRoutes from "./Authorization/Route-Authorization"
import PublicRoutes from "./Authorization/Route-Gurad"
import ConcentrationSetup from "../pages/Admin-Setup/ConcentrationSetup"
import CustomerRegistration from "../pages/Admin-Setup/CustomerRegistration"


export default function Routers() {
  return (
    <Router>
      <Switch>
        <PublicRoutes path="/" exact component={Login} />
        <PublicRoutes path="/sign-up" exact component={SignUp} />
        <PublicRoutes
          exact
          path="/forgot-password"
          component={ForgotPassword}
        />
        <PublicRoutes exact path="/otp-code" component={OTPPage} />
        <PublicRoutes path="/reset-password" exact component={ResetPassword} />

        {/* Admin setup */}

        <PrivateRoutes
          path="/admin/accounting-year"
          exact
          component={AccountingYear}
        />
        <PrivateRoutes
          path="/admin/account-name-level-01"
          exact
          component={AccountNameLevel01}
        />
        <PrivateRoutes
          path="/admin/account-name-level-02"
          exact
          component={AccountNameLevel02}
        />
        <PrivateRoutes
          path="/admin/account-name-level-03"
          exact
          component={AccountNameLevel03}
        />
        <PrivateRoutes path="/admin/option-types" exact component={OPT_Type} />
        <PrivateRoutes path="/admin/category-setup" exact component={CategorySetup} />
        <PrivateRoutes path="/admin/origin-setup" exact component={OriginSetup} />
        <PrivateRoutes path="/admin/godown-setup" exact component={GoDownSetup} />
        <PrivateRoutes path="/admin/occupation-setup" exact component={Occupation} />
        <PrivateRoutes path="/admin/area-setup" exact component={AreaSetup} />
        <PrivateRoutes path="/admin/company-setup" exact component={CompanySetup} />
        <PrivateRoutes path="/admin/port-setup" exact component={PortSetup} />
        <PrivateRoutes path="/admin/expence-setup" exact component={ExpenceSetup} />

        <PrivateRoutes path="/admin/subcompany-setup" exact component={SubCompanySetup} />
        <PrivateRoutes path="/admin/supplier-setup" exact component={SupplierSetup} />
        <PrivateRoutes path="/admin/import-and-export" exact component={ImportandExport} />
        <PrivateRoutes path="/admin/comission-agent" exact component={ComissionAgentSetup} />

        <PrivateRoutes path="/admin/setup-type" exact component={SetupType} />
        <PrivateRoutes path="/admin/type-setup" exact component={TypeSetup} />
        <PrivateRoutes path="/admin/vessel-setup" exact component={VesselSetup} />
        <PrivateRoutes path="/admin/uom-setup" exact component={UOMSetup} />
        <PrivateRoutes path="/admin/item-setup" exact component={ItemSetup} />
        <PrivateRoutes path="/admin/consignee-setup" exact component={ConsigneeRegistration} />
        <PrivateRoutes path="/admin/employee-setup" exact component={EmployeeRegistration} />
        <PrivateRoutes path="/admin/contract-employee-setup" exact component={ContractEmployee} />
        <PrivateRoutes path="/admin/concentration-setup" exact component={ConcentrationSetup} />
        <PrivateRoutes path="/admin/customer-registration" exact component={CustomerRegistration} />

        <PrivateRoutes path="/dashboard" exact component={Dashboard} />

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}
