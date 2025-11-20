import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// const frontend_url = "http://localhost:5173";
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      status: "order placed",         
      payment: false,             
      paymentMethod: "COD",
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    return res.json({
      success: true,
      cod: true,
      orderId: newOrder._id,
      message: "Order placed with Cash on Delivery. Pay when you receive your order.",
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error while placing COD order" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    // If it’s a COD order, there is nothing to verify
    if (!order.paymentMethod || order.paymentMethod === "COD") {
      return res.json({ success: true, message: "COD order created" });
    }

    // (Fallback path if you later re-enable ONLINE payments)
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error" });
  }
};

// USER ORDERS
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    return res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error" });
  }
};

// LIST ORDERS
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    return res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error" });
  }
};

// UPDATE STATUS — when delivered via COD, also mark payment collected
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await orderModel.findById(orderId);
    if (!order) return res.json({ success: false, message: "Order not found" });

    const update = { status };

    // If order is COD and delivered, flip payment to true (cash collected)
    if ((order.paymentMethod === "COD" || !order.paymentMethod) && status === "delivered") {
      update.payment = true;
    }

    await orderModel.findByIdAndUpdate(orderId, update);
    return res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
