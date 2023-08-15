var express = require('express');
var router = express.Router();
const { genReport } = require('@bizantine/report-generator')
const { getDiff, checkoutRepo }= require('../utils/git-helper');
const path = require('path')
const { FILE_TEMP_PATH } = require("../utils/consts");
const Project = require('../dbs/models/projectModel')
const mongoose = require('../dbs/mongo')
// const projects = [
//   { _id: '1', name: 'Project A', gitUrl: 'http://git.url/a', token: 'tokenA' },
// ];

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.render('index', { projects: projects });
    console.log(projects);
  } catch (error) {
    console.log(error)
  }

});

router.post('/project', async (req, res) => {
  // Add project
  const projectData = {
      name: req.body.name,
      gitUrl: req.body.gitUrl,
      token: req.body.token
  };
  const project = new Project(projectData);
  await project.save();
  res.redirect('/');
});

router.post('/project/:id/delete', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/');
});


router.get('/project/:id/features', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.render('addFeature', { projectId: project._id });
    } catch (err) {
        res.status(500).send('Error retrieving project');
    }
});

// Route to handle form submission
router.post('/project/:id/features', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).send('Project not found');
        }
        project.features.push(req.body);  // Add the new feature to the features array
        await project.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error adding feature');
    }
});



// body 存放report信息
// params.commits hash
// default repo :  repos->
router.post('/report-cov', async function(req, res, next) {
 if (req.body) {

    const findProjectByName = async (name, title) => {
      // mongoose find 
      const project = await Project.findOne({name});
      // console.log(title)

      const feature = project.features.find((item)=>{ return item.title==title})
      // console.log(feature)
      return {
        gitRepo: `https://oauth2:${project.token}@${project.gitUrl}`,
        feature,
        project
      }

    } 

    if (!req.body.projectName || !req.body.featureId || !req.body.data) {
      res.send({
        'success': false, 
        'message': 'projectName, data or featureId required'
      })
      return 
    }

    const {gitRepo, feature, project} = await findProjectByName(req.body.projectName, req.body.featureId)

    getDiff(
        gitRepo,
        [
          feature.oldHash, // old
          feature.newHash  // new 
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
            if (!item.inputSourceMap || !item.inputSourceMap.relativePath) {
              delete item['inputSourceMap']
              return
             }
            const itemPath = item.inputSourceMap.relativePath
            // log all path join params
            console.log('path.join:',__dirname,FILE_TEMP_PATH,'repos', dirname, itemPath)
            item.path = path.join(__dirname,FILE_TEMP_PATH,'repos', dirname, itemPath)
            data[itemPath] = data[key]
            // 删掉临时的字段
            if (!item.inputSourceMap.mappings) {
              delete item['inputSourceMap']
            }
            delete data[key]
          })
        }
        // console.log('dirname:',ress.dirname)
        handlePathInCov(ress.dirname, req.body.data) 
        checkoutRepo(gitRepo, feature.newHash)
        genReport(req.body.data, `./public/report/${req.body.projectName}/${req.body.featureId}`, ress.diff, !req.body.cover ? feature.coverRawData ? JSON.parse(feature.coverRawData) : null : null).then((coverRawData)=>{
          try {
            feature.coverRawData = JSON.stringify(coverRawData)
            project.save();
          } catch (error) {
            console.log(error)
          }
        })
        // genReport(req.body.data, `./public/report`, ress.diff)

      }).catch((err) => {
        console.log(err);
        res.send({
          'success': false,
          'message': err
        })
        return
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