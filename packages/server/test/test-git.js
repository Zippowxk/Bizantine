const { getDiff } = require("../utils/git-helper");

getDiff(
  "https://oauth2:qs8NgZ7V6xFzisFT8hsT@git.haier.net/twb_ehaier/web-c/bizantine-example-app.git",
  [
    "fa5dc686696adfa4111ddb3d737860fcedd6fbfb",
    "d80ace321716b02ecdf12217e11d1248ad607209",
  ]
).then((res) => {
  console.log(res);
});
