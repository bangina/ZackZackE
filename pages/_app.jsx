import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import wrapper from "../store/configureStore";
import withReduxSaga from "next-redux-saga";

// _app.js : 모든 페이지 공통사항 여기에 때려넣기
const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8"></meta>
        <title>Ina NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(NodeBird));
