import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  HTTP_AD_SERVICE_BASE_URL, HTTP_AD_SERVICE_PORT, HTTP_AD_SERVICE_URL_AUTHENTICATION, HTTP_PROPERTY_READ_BASE_URL, HTTP_PROPERTY_READ_PORT, HTTP_PROPERTY_READ_URL_GET_SERVERS, HTTP_PROPERTY_READ_URL_GET_APPLICATIONS, HTTP_PROPERTY_READ_URL_GET_PROPERTIES
} from "./Constants";

const headerInfo = {
  headers: {
    "Content-Type": "Application/json",
    TransactionID: uuidv4(),
  },
};

export const httpAuthentication = async (username, password) => {
  const userInfo = {
    username: username,
    password: password,
  };
  try {
    const response = await axios.post(
      HTTP_AD_SERVICE_BASE_URL +
      HTTP_AD_SERVICE_PORT +
      HTTP_AD_SERVICE_URL_AUTHENTICATION,
      userInfo,
      headerInfo
    )
    return response;
  } catch (error) {
    return error;
  }
};

export const httpGetServers = async (userRole) => {
  const userInfo = {
    userRole: userRole
  };
  try {
    const response = await axios.post(
      HTTP_PROPERTY_READ_BASE_URL + HTTP_PROPERTY_READ_PORT + HTTP_PROPERTY_READ_URL_GET_SERVERS,
      userInfo,
      headerInfo
    )
    return response;
  } catch (error) {
    return error;
  }
};

export const httpGetApplications = async (server) => {
  const serverInfo = {
    server: server
  };
  try {
    const response = await axios.post(
      HTTP_PROPERTY_READ_BASE_URL + HTTP_PROPERTY_READ_PORT + HTTP_PROPERTY_READ_URL_GET_APPLICATIONS,
      serverInfo,
      headerInfo
    )
    return response;
  } catch (error) {
    return error;
  }
};

export const httpGetProperties = async (server, application) => {
  const appliactionInfo = {
    server: server,
    applicationName: application
  };
  try {
    const response = await axios.post(
      HTTP_PROPERTY_READ_BASE_URL + HTTP_PROPERTY_READ_PORT + HTTP_PROPERTY_READ_URL_GET_PROPERTIES,
      appliactionInfo,
      headerInfo
    )
    console.log('appliactionInfo',appliactionInfo);
    return response;
  } catch (error) {
    return error;
  }
};
