const chalk = require("chalk");

module.exports = {
   name: "err",
   execute(err) {
      console.log(chalk.redBright(`MongoDB Error: ${err}`));
   },
};
