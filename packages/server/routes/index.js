var express = require('express');
var router = express.Router();
const { genReport } = require('@bizantine/report-generator')
const { getDiff }= require('../utils/git-helper');
const path = require('path')
const { FILE_TEMP_PATH } = require("../utils/consts");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// body 存放report信息
// params.commits hash
// default repo :  repos->
router.post('/report-cov', async function(req, res, next) {
 if (req.body) {

    // if(req.query.commits && req.query.repo) {
    getDiff(
        "https://oauth2:glpat-xoK4hSZrNtH6vxCr51je@git.haier.net/twb_ehaier/web-c/bizantine-example-app.git",
        [
          "d80ace32", // old
          "92f6941a"  // new 
        ]
      ).then((ress) => {
        // console.log(ress);

        // 修正path路径
        const handlePathInCov = (dirname, data) => {
          // data is an Object , not an Array ,iterate it
          Object.keys(data).forEach((key) => {
            const item = data[key]
            // 给item元素的path属性添加hash前缀路径
            // 拼接 .repos/ 目录下的绝对路径
            const itemPath = item.path
            item.path = path.join(__dirname,FILE_TEMP_PATH,'repos', dirname, item.path)
            data[itemPath] = data[key] 
            delete data[key]
          })
        }
        handlePathInCov(ress.dirname, req.body.data)
        genReport(req.body.data, './public/report/', ress.diff)

      });
      
      // diff = await getDiff(req.query.repo, req.query.commits)
      // diff = await getDiff(req.query.repo, req.query.commits)

    // }

    // setTimeout(() => {
    // }, 0);
  }
  res.send({
    'success': true,
  })
})

module.exports = router;