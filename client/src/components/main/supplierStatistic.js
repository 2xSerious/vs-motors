import axios from "axios";
import { MDBContainer, MDBCard } from "mdbreact";
import { useEffect, useState } from "react";
import { ChartDonut, ChartThemeColor } from "@patternfly/react-charts";
import { host } from "../host";
import { TextField, Box } from "@mui/material";
import AdapterDateFns from "@date-io/date-fns";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import { sumFloat, floatParser } from "../../js/helpers";

export default function SupplierMontly() {
  const [suppliersData, setSuppliersData] = useState([]);
  const [workersData, setWorkersdata] = useState([]);
  const [totalWork, setTotalWork] = useState(0);
  const [totalChart, setTotalChart] = useState(0);
  const [date, setDate] = useState({
    from: new Date(),
    to: new Date(),
  });
  const url = host.url;

  useEffect(() => {
    async function getMonthly() {
      let from = date.from.toISOString().split("T")[0];
      let to = date.to.toISOString().split("T")[0];
      const { data } = await axios.get(
        `${url}/home/monthly/suppliers/${from}&${to}`
      );
      const workers = await axios.get(`${url}/home/monthly/workers`);
      const json = [];
      const jsonWorkers = [];
      data.response.forEach((element) => {
        let total = floatParser(element.total);
        json.push({
          x: element.Supplier,
          y: total,
        });
      });
      workers.data.response.forEach((e) => {
        let total = floatParser(e.total);
        jsonWorkers.push({
          x: e.w_name,
          y: total,
        });
      });
      setSuppliersData(json);
      sumTotalChart(json);
      setWorkersdata(jsonWorkers);
      sumTotalWork(jsonWorkers);
    }
    getMonthly();
  }, [url, date]);

  function sumTotalChart(data) {
    let total = 0.0;
    for (let i = 0; data.length > i; i++) {
      total = sumFloat(total, data[i].y);
    }

    setTotalChart(total.toFixed(2));
  }
  function sumTotalWork(data) {
    let total = 0.0;
    for (let i = 0; data.length > i; i++) {
      total += data[i].y;
    }
    setTotalWork(total);
  }
  if (suppliersData.length > 0 && workersData.length > 0) {
    return (
      <MDBContainer className="mt-5">
        <MDBCard className="cloudy-knoxville-gradient">
          <div className="d-flex justify-content-center mt-2">
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="From"
                  value={date.from}
                  inputFormat="d/M/y"
                  onChange={(newValue) => {
                    setDate((prev) => ({ ...prev, from: newValue }));
                    console.log(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="To"
                  value={date.to}
                  inputFormat="d/M/y"
                  onChange={(newValue) => {
                    setDate((prev) => ({ ...prev, to: newValue }));
                    console.log(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </div>
          <div className="d-flex justify-content-around">
            <div style={{ width: "260px", height: "200px" }}>
              <ChartDonut
                ariaDesc="Average number of pets"
                ariaTitle="Donut chart example"
                constrainToVisibleArea={true}
                data={suppliersData}
                height={190}
                labels={({ datum }) => `${datum.x}: £${datum.y}`}
                legendData={suppliersData.map((e) => {
                  return { name: `${e.x} : £${e.y}` };
                })}
                legendOrientation="vertical"
                legendPosition="right"
                padding={{
                  bottom: 25, // Adjusted to accommodate subTitle
                  left: 20,
                  right: 195, // Adjusted to accommodate legend
                  top: 20,
                }}
                subTitle="Suppliers"
                subTitlePosition="bottom"
                title={`£${totalChart.toString()}`}
                width={345}
                themeColor={ChartThemeColor.multi}
                style={{ subTitle: { color: "#4287f5 " } }}
              />
            </div>
            <div style={{ width: "260px", height: "200px" }}>
              <ChartDonut
                ariaDesc="Average number of pets"
                ariaTitle="Donut chart example"
                constrainToVisibleArea={true}
                data={workersData}
                height={190}
                labels={({ datum }) => `${datum.x}: £${datum.y}`}
                legendData={workersData.map((e) => {
                  return { name: `${e.x} : £${e.y}` };
                })}
                legendOrientation="vertical"
                legendPosition="right"
                padding={{
                  bottom: 25, // Adjusted to accommodate subTitle
                  left: 20,
                  right: 195, // Adjusted to accommodate legend
                  top: 20,
                }}
                subTitle="Workers"
                subTitlePosition="bottom"
                title={`£${totalWork.toString()}`}
                width={345}
                themeColor={ChartThemeColor.multi}
              />
            </div>
          </div>
        </MDBCard>
      </MDBContainer>
    );
  } else {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "300px" }}
      >
        <div className="spinner-border " role="status">
          <span className="sr-only ">Loading...</span>
        </div>
      </div>
    );
  }
}
