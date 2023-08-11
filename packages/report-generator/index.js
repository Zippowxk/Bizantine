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

  // console.log('333333333333333333333333333')
  // console.log(coverageMap);

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
        // console.log(lines[i], startLine, endLine)
        if (lines[i] >= startLine && lines[i] <= endLine) {
          // console.log('333333333333333333333333333')
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
    data.incrementPct = Math.floor(Object.keys(incrementCoveredS).length / Object.keys(incrementStatementNum).length * 100)
    data.incrementTotal = Object.keys(incrementStatementNum).length
    data.incrementCovered = Object.keys(incrementCoveredS).length
  }

  const changeLines = (changes) => {
    const lines = []
    changes.forEach(item => {
      if (item.type == 'AddedLine') {
        lines.push(item.lineAfter)
      }
    })
    return lines
  }

  // const root = '/Users/wxkmac/Documents/Github/Bizantine/example/app/'
  diff.files.forEach(difile => {
    const realPath = difile.path// root + difile.path
    const covfile = coverageMap[realPath]
    //  console.log('=================================');
    //  console.log("coverageMap:",coverageMap)
    //  console.log("realPath:",realPath)
    if (covfile) {
      // console.log("cover file", covfile)
      // console.log('difile.chunks:',difile.chunks.reduce((acc, cur) => acc.concat(cur.changes),[]))
      genFileDiffCov(covfile, changeLines(difile.chunks.reduce((acc, cur) => acc.concat(cur.changes), [])))
    }
  })

};

// gen report from coverage object（e.g. window.__coverage__）
const genReport = async (ob, target, diff, oldData) => {
  return new Promise(async (resolve, reject) => {
    // coverageMap, for instance, obtained from istanbul-lib-coverage

    let obj = ob

    await remap(obj)

    if (oldData) {
      const coverageMap = createCoverageMap(oldData);
      coverageMap.mergeByKeys(obj)
      obj = JSON.parse(JSON.stringify(coverageMap.toJSON()))
    }

    if (diff) {
      // console.log('difffff:', obj)
      // console.log(obj)
      genGitDiffCoverage(diff, obj)
    }
    const coverageMap = createCoverageMap(obj);
    // console.log('====================');
    // console.log(coverageMap.toJSON());
    // console.log('--------------------');
    // console.log(oldData)
    // if (oldData) {
    //   coverageMap.mergeByKeys(oldData)
    // }

    const configWatermarks = {
      statements: [50, 80],
      functions: [50, 80],
      branches: [50, 80],
      lines: [50, 80],
      increments: [50, 100]
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

    // return coverageMap.toJSON();
    resolve(coverageMap.getRawJson())
  })
};

module.exports = {
  genReport,
};
