// React Components
import { Route, Switch, Redirect } from "react-router-dom";

// Multilingual
import { withNamespaces } from "react-i18next";

// Material-UI
import { Container } from "@material-ui/core";

// ! Screens
// Forms
import RegisterTenant from "./screens/RegisterTenant_RJ2/RegisterTenant";
import RegisterTenantCard from "./screens/RegisterTenantCard_RJ3/StripeHandlerComponent";
// Approved
import ApprovedTenantRimbo from "./screens/approvedTenantRimbo/ApprovedTenantRimbo";
import ApprovedTenantCardRimbo from "./screens/approvedTenantCardRimbo/ApprovedTenantCardRimbo";
import ApprovedTenancyRimbo from "./screens/approvedTenancyRimbo/ApprovedTenancyRimbo";
// Rejected
import RejectedTenantRimbo from "./screens/approvedTenantRimbo/RejectedTenantRimbo";
// General
import Page404 from "./screens/404/404";

const RouterWrapper = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Switch>
          {/* RJ2 */}
          <Route
            exact
            path="/register/tenant/:tenancyID"
            component={RegisterTenant}
          />
          {/* RJ3 */}
          <Route
            exact
            path="/register/card/:randomID"
            component={RegisterTenantCard}
          />

          {/* Approve by Rimo */}
          <Route
            path="/register/tenant/:tenancyID/approved"
            component={ApprovedTenantRimbo}
          />

          {/* Reject by Rimbo */}
          <Route
            path="/register/tenant/:tenancyID/rejected"
            component={RejectedTenantRimbo}
          />

          {/* Approve card by Rimbo */}
          <Route
            path="/register/card/:tenancyID/card/approved"
            component={ApprovedTenantCardRimbo}
          />

          {/* Service start by Rimbo */}
          <Route
            path="/register/contract/:tenancyID/service-start"
            component={ApprovedTenancyRimbo}
          />

          <Route path="/404" component={Page404} />
          <Redirect to="/404" />
        </Switch>
      </Container>
    </>
  );
};

export default withNamespaces()(RouterWrapper);
