import React from "react";

const Loader = () => <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;

const withLoader = (WrappedComponent) => ({ loading, ...props }) =>
  loading ? <Loader /> : <WrappedComponent {...props} />;

export default withLoader;
