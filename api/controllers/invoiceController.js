require("dotenv").config();
const inv = require("../models/invoice-components/Index");
const pdf = require("html-pdf-node");
const InvModel = require("../models/Invoice");
const AWS = require("aws-sdk");

exports.saveInvoice = async (req, res, next) => {
  var data;
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.ACCESS_ID,
      secretAccessKey: process.env.SECRET_KEY,
    });
    console.log(req.body);
    const { invoice, parts, details } = req.body;

    let options = {
      format: "A4",
    };
    const html = { content: inv(req.body) };

    pdf.generatePdf(html, options).then((pdfBuffer) => {
      data = pdfBuffer;
      const params = {
        Bucket: "vs-motors",
        Key: `${details.inv_no}.pdf`,
        Body: data,
      };

      s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
      });
    });

    const newInvoice = new InvModel(
      details.inv_no,
      details.date,
      details.total,
      details.service_id
    );
    newInvoice.add();
    res.send("Success");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPdf = async (req, res, next) => {
  try {
    let { id } = req.params;
    res.download(`./public/invoices/${id}.pdf`);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
