const nodemailer = require("nodemailer");
const products = require("../models/productsModel");

const sendOrderConfirmationEmail = async (userEmail, order, orderItems) => {
  try {
    const transporter = nodemailer.createTransport({
      secure: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user:'',
        pass:''
      },
    });

    const productIds = orderItems.map((item) => item.product_id);
    const productDetails = await products.findAll({
      where: { id: productIds },
      attributes: ["id", "name"],
    });

    const productMap = {};
    productDetails.forEach((product) => {
      productMap[product.id] = product.name;
    });

    const orderDetailsHtml = orderItems
      .map(
        (item) =>
          `<li>${item.quantity} x ${productMap[item.product_id]} @ &#8377;${item.price} each</li>`
      )
      .join("");

    const mailOptions = {
      from: "your-email@gmail.com",
      to: userEmail,
      subject: "Order Confirmation",
      html: `
        <p>Hello,</p>
        <p>Thank you for your order. Here are the details:</p>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <ul>${orderDetailsHtml}</ul>
        <p><strong>Total Amount:</strong> &#8377;${order.total_price}</p>
        <br>
        <p>We will notify you once your order is shipped. Thank you for shopping with us!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendOrderConfirmationEmail };
