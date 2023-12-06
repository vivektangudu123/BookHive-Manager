// const router = require("express").Router();
// const Book = require("../models/booksModel");
// const authMiddleware = require("../middlewares/authMiddleware");


// // // update a book
// // router.put("/update-book/:id", authMiddleware, async (req, res) => {
// //     try {
// //         await Book.findByIdAndUpdate(req.params.id, req.body);
// //         return res.send({ success: true, message: "Book updated successfully" });
// //     } catch (error) {
// //         return res.send({ success: false, message: error.message });
// //     }
// // });

// // delete a book
// router.put("/delete-book", authMiddleware, async (req, res) => {
//     console.log(req.body);
//     try {
//         await Book.findByIdAndDelete(req.params.id);
//         return res.send({ success: true, message: "Book deleted successfully" });
//     } catch (error) {
//         return res.send({ success: false, message: error.message });
//     }
// });



// module.exports = router;
