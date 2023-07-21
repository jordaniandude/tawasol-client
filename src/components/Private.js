import React, { Fragment } from "react";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";

const Private = ({
  component: Component,
  users: { isAuthenticated, loading },
}) => (
  <Fragment>
    {loading ? (
      <Spinner />
    ) : isAuthenticated ? (
      <Fragment>
        <Sidebar />
        <Component />
      </Fragment>
    ) : (
      <Navigate to="/login"></Navigate>
    )}
  </Fragment>
);

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Private);
