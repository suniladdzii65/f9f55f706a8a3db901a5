import axios from "axios";
const api = "https://api.nasa.gov/neo/rest/v1/neo/";
const key = "ORuH2559k5awRXIB52Lmll3kUrnSKcsEmCiIwm6N";

const apiList = {
  fetchAllAstroid: function (data, successCall) {
    axios.get(api+'browse', { params: { api_key: key } }).then((res) => {
      successCall && successCall(res.data);
    });
  },
  fetchAstroidData: function (id, successCall) {
    axios.get(api+id, { params: { api_key: key } }).then((res) => {
      successCall && successCall(res.data);
    });
  },
};
export default apiList;
