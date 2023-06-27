const fs = require("fs");
const path = require("path");
const { Level } = require('level')
const crypto = require("crypto");
const simpleGit = require("simple-git");
const { FILE_TEMP_PATH } = require("./consts.js");
const BASEDIR = path.join(__dirname,FILE_TEMP_PATH);
const GIT_BASEDIR = path.join(BASEDIR,'repos');
const db = new Level(path.join(BASEDIR,'mydb'), { valueEncoding: 'json' })

const generateRandomString = function (length) {
  // 生成随机字节
  const bytes = crypto.randomBytes(length);
  // 将字节转换为十六进制字符串
  const result = bytes.toString("hex");
  // 返回字符串
  return result;
};

const isRepoExsit = async function (url) {
  const dir = await getRepoDir(url);
  if (!dir) return false
  const filePath = path.join(GIT_BASEDIR, dir);
  const res = fs.existsSync(filePath)
  return res
};

const getRepoDir = async function (url) {
  return new Promise((resolve, reject) => {
    db.get(url, function (err, value) {
      if (value && value != "undefined") {
        resolve(value);
      } else {
        resolve(undefined);
      }
    });
  });
};

const genRepoDir = async function (url) {
  return new Promise((resolve, reject) => {
    const dirName = generateRandomString(20); 
    console.log(dirName)
    db.put(url, dirName, function (err, value) {
      console.log(dirName)
      resolve(dirName);
      if (err) {
        console.log(err)
      }
    });
  });
};

const createRepo = async function (
  url = "https://oauth2:qs8NgZ7V6xFzisFT8hsT@git.haier.net/twb_ehaier/web-c/bizantine-example-app.git",
  defaultUser
) {
  // const username = "wangxinkai";
  // const password = "your_password";
  const dirname = await genRepoDir(url);
  const localPath = path.join(GIT_BASEDIR, dirname);

  // Clone remote repository
  return new Promise((resovle, reject) => {
    simpleGit().clone(
      url,
      localPath,
      function (err, repo) {
        console.log('clone')
        if (err) { 
          // console.error("Failed to clone repository: " + err);
          reject()
        } else {
          resovle()
        }
      }
    );
  });
};

const updateRepo = function () {};

const getDiffMessage = async function (repo, hashs) {
  return new Promise( async (resovle,reject) =>{
    const dirname = await getRepoDir(repo);
    const localPath = path.join(GIT_BASEDIR, dirname)
    const git = simpleGit(localPath)
    // git.status({}, (err,log) => {
    //   console.log('status')
    //   console.log(log);
      
    // })
    // git.log({}, function (err,log) {
    //   console.log('----------');
    //   console.log(log)
    // })
  
    git.diff(hashs, (err, diff)=>{
      resovle({'diff':diff,"dirname":dirname})
    })
  })
  // git.show('fa5dc686696adfa4111ddb3d737860fcedd6fbfb',(err,show)=>{
  //   console.log(show);
  // })
};

const getDiff = async function (repo, hashs) {

  // console.log("res: "+ await isRepoExsit(repo))

  if (!await isRepoExsit(repo)) {
    // create
    // console.log("gen")

    await createRepo(repo);
  }

  return await getDiffMessage(repo, hashs);
};

module.exports = {
  getDiff,
};
// const
