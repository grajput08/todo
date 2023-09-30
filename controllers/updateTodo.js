//import th model
const Todo = require("../models/Todo");

//define route handler

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      { _id: id },
      { title, description, updatedAt: Date.now() },
      { new: true } // This option returns the updated document
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
      message: `Updated Successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server Error",
    });
  }
};
