// const bcrypt = require("bcrypt");
// //PASSWORD HASHING
// // const hashPassword = async (password) => {
// //   const salt = await bcrypt.genSalt(12);
// //   const hash = await bcrypt.hash(password, salt);
// //   console.log(salt);
// //   console.log(hash);
// // };
// const hashPassword = async (password) => {
//   const hash = await bcrypt.hash(password, 12);
// };
// const login = async (plainPassword, hashPassword) => {
//   const result = await bcrypt.compare(plainPassword, hashPassword);
//   console.log(result);
// };
// const hashed = hashPassword("admin");
// login("admin", "$2b$12$YV4MaD85owQkVcESqN46U.HrlvOZFRhFSNhJTnyr9PTlobQhiKlwa");
