const libReport = require("@bizantine/istanbul-lib-report");
// const reports = require("istanbul-reports");
const reports = require('@bizantine/istanbul-reports')
const { createCoverageMap } = require("istanbul-lib-coverage");
const parseGitDiff = require("parse-git-diff");
const { remap } = require("./remap") 

const diffRes = parseGitDiff(`
diff --git a/src/components/Test.vue b/src/components/Test.vue
index a50beba..c782f9b 100644
--- a/src/components/Test.vue
+++ b/src/components/Test.vue
@@ -23,6 +23,7 @@ export default {
     },
     test() {
       console.log('test');
+      console.log('test1')
     }
   },
 }
`);

const genGitDiffCoverage = (diffString, coverageMap) => {
 
  const diff = parseGitDiff(diffString)

  const genFileDiffCov = (data, lines) => {
    const { statementMap, s } = data;
    const incrementStatementMap = {}
    const incrementCoveredS = {}
    // 获取新增语句的Map
    Object.entries(statementMap).forEach(([k, location]) => {
      const { start, end } = location;
      const { line: startLine } = start;
      const { line: endLine } = end;
      for (let i = 0; i <= lines.length; i++) {
        // 判断这个语句中是否有新增的行
        if (lines[i] >= startLine && lines[i] <= endLine) {
          // 如果有则装进incrementStatementMap
          incrementStatementMap[k] = location;
          break;
        }
      }
    });

    // 获取新增语句的index
    const incrementStatementNum = Object.keys(incrementStatementMap);

    // 获取被覆盖的新增语句
    Object.entries(s).forEach(([k, v]) => {
      // 判断语句是否被覆盖
      if (v > 0) {
        // 判断被覆盖的语句是否属于新增语句
        if (incrementStatementNum.indexOf(k) > -1) {
          incrementStatementMap[k].covered = true;
          incrementCoveredS[k] = v;
        }
      }
    });

    // 新增语句的Map，包含location信息
    data.incrementStatementMap = incrementStatementMap;

    // 新增被覆盖语句计数器
    data.incrementCoveredS = incrementCoveredS;
    data.incrementPct = Object.keys(incrementCoveredS).length / Object.keys(incrementStatementNum).length * 100
    data.incrementTotal = Object.keys(incrementStatementNum).length
    data.incrementCovered = Object.keys(incrementCoveredS).length
  }

  const changeLines = (changes) => {
    const lines = []
    changes.forEach(item=>{
      if (item.type == 'AddedLine') {
        lines.push(item.lineAfter)
      }
    })
    return lines
  }

  // const root = '/Users/wxkmac/Documents/Github/Bizantine/example/app/'
  diff.files.forEach(difile=>{
     const realPath = difile.path// root + difile.path
     const covfile = coverageMap[realPath]
    //  console.log('=================================');
    //  console.log(coverageMap)
    //  console.log(realPath)
     if (covfile) {
      // console.log("cover file",covfile)
      // console.log('difile.chunks:',difile.chunks.reduce((acc, cur) => acc.concat(cur.changes),[]))
       genFileDiffCov(covfile, changeLines(difile.chunks.reduce((acc, cur) => acc.concat(cur.changes),[])))
     }
  })
  
};

// gen report from coverage object（e.g. window.__coverage__）
const genReport = async (obj, target, diff) => {
  // coverageMap, for instance, obtained from istanbul-lib-coverage

  await remap(obj)

  if (diff) {
    // console.log('difffff')
    genGitDiffCoverage(diff, obj)
    // console.log(obj)
  }
  const coverageMap = createCoverageMap(obj);
  
  const configWatermarks = {
    statements: [50, 80],
    functions: [50, 80],
    branches: [50, 80],
    lines: [50, 80],
    increments: [50,100]
  };

  // create a context for report generation
  const context = libReport.createContext({
    dir: target,
    // The summarizer to default to (may be overridden by some reports)
    // values can be nested/flat/pkg. Defaults to 'pkg'
    defaultSummarizer: "nested",
    watermarks: configWatermarks,
    coverageMap,
  });

  // create an instance of the relevant report class, passing the
  // report name e.g. json/html/html-spa/text
  const report = reports.create("html", {
    skipEmpty: true,
    skipFull: true,
  });

  // call execute to synchronously create and write the report to disk
  report.execute(context);
};

module.exports = {
  genReport,
};
