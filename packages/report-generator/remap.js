const SourceMapConsumer = require('source-map').SourceMapConsumer

const remapItem = function(startandend, consumer) {
    if (startandend['start'].line) {
        startandend.start = consumer.originalPositionFor(startandend['start'])
    }
    if (startandend['end'].line) {
        startandend.end = consumer.originalPositionFor(startandend['end'])
    }
}

const remap = async function(covObj) {
  const targ = ['statementMap', 'fnMap', 'branchMap']
  const covobjEn = Object.entries(covObj)
  for( let i = 0; i < covobjEn.length; i++) {
    let [key,cov] = covobjEn[i]
    const rawSourceMap = cov.inputSourceMap 
    if (!rawSourceMap) return
    const whatever =  await SourceMapConsumer.with(rawSourceMap, null, consumer => {
      targ.forEach(k=>{
        Object.entries(cov[k]).forEach(([id, startandend]) => {
            // console.log(consumer.originalPositionFor(startandend['start']))
             if (k == 'fnMap') {
                remapItem(startandend.decl, consumer)  
                remapItem(startandend.loc, consumer)
             } else if ( k == 'branchMap') {
                remapItem(startandend.loc, consumer)  
                for(let j=0;j<startandend.locations.length;j++) {
                    remapItem(startandend.locations[j], consumer)  
                }
             } else {
                remapItem(startandend, consumer)
             }
        })
      })
    });
  }
//   console.log(covObj['/Users/wxkmac/Documents/Github/Bizantine/example/app/src/components/Test.vue'].branchMap[0].locations)
}



// const SourceMapConsumer = sm.SourceMapConsumer
// console.log(sm.SourceMapConsumer.with)

// const remap = async function(covObj) {
//   const targ = ['statementMap', 'fnMap', 'branchMap']
//   const covobjEn = Object.entries(covObj)
//   for( let i = 0; i < covobjEn.length; i++) {
//     let [key,cov] = covobjEn[i]
//     const rawSourceMap = cov.inputSourceMap 
//     if (!rawSourceMap) return
//     const whatever =  await SourceMapConsumer.with(rawSourceMap, null, consumer => {
//       targ.forEach(k=>{
//         Object.entries(cov[k]).forEach(([id, startandend]) => {
//           startandend.start = consumer.originalPositionFor(startandend['start'])
//           startandend.end = consumer.originalPositionFor(startandend['end'])
//         })
//       })
//     });
//     // console.log(whatever)
//   }
// }


const map = {
  "/Users/wxkmac/Documents/Github/Bizantine/example/app/src/components/Test.vue": {
      "path": "/Users/wxkmac/Documents/Github/Bizantine/example/app/src/components/Test.vue",
      "statementMap": {
          "0": {
              "start": {
                  "line": 10,
                  "column": 6
              },
              "end": {
                  "line": 14,
                  "column": 8
              }
          },
          "1": {
              "start": {
                  "line": 13,
                  "column": 8
              },
              "end": {
                  "line": 13,
                  "column": 25
              }
          },
          "2": {
              "start": {
                  "line": 17,
                  "column": 6
              },
              "end": {
                  "line": 17,
                  "column": 26
              }
          },
          "3": {
              "start": {
                  "line": 18,
                  "column": 6
              },
              "end": {
                  "line": 18,
                  "column": 26
              }
          },
          "4": {
              "start": {
                  "line": 21,
                  "column": 6
              },
              "end": {
                  "line": 21,
                  "column": 29
              }
          }
      },
      "fnMap": {
          "0": {
              "name": "(anonymous_0)",
              "decl": {
                  "start": {
                      "line": 9,
                      "column": 4
                  },
                  "end": {
                      "line": 9,
                      "column": 5
                  }
              },
              "loc": {
                  "start": {
                      "line": 9,
                      "column": 13
                  },
                  "end": {
                      "line": 15,
                      "column": 5
                  }
              },
              "line": 9
          },
          "1": {
              "name": "(anonymous_1)",
              "decl": {
                  "start": {
                      "line": 12,
                      "column": 14
                  },
                  "end": {
                      "line": 12,
                      "column": 15
                  }
              },
              "loc": {
                  "start": {
                      "line": 12,
                      "column": 19
                  },
                  "end": {
                      "line": 14,
                      "column": 7
                  }
              },
              "line": 12
          },
          "2": {
              "name": "(anonymous_2)",
              "decl": {
                  "start": {
                      "line": 16,
                      "column": 4
                  },
                  "end": {
                      "line": 16,
                      "column": 5
                  }
              },
              "loc": {
                  "start": {
                      "line": 16,
                      "column": 11
                  },
                  "end": {
                      "line": 19,
                      "column": 5
                  }
              },
              "line": 16
          },
          "3": {
              "name": "(anonymous_3)",
              "decl": {
                  "start": {
                      "line": 20,
                      "column": 4
                  },
                  "end": {
                      "line": 20,
                      "column": 5
                  }
              },
              "loc": {
                  "start": {
                      "line": 20,
                      "column": 14
                  },
                  "end": {
                      "line": 22,
                      "column": 5
                  }
              },
              "line": 20
          }
      },
      "branchMap": {
        "0":{
            "loc": {
                "start": {
                    "line": 17,
                    "column": 4
                },
                "end": {
                    "line": 19,
                    "column": 5
                }
            },
            "type": "if",
            "locations": [
                {
                    "start": {
                        "line": 17,
                        "column": 4
                    },
                    "end": {
                        "line": 19,
                        "column": 5
                    }
                },
                {
                    "start": {},
                    "end": {}
                }
            ],
            "line": 17
        }
      },
      "s": {
          "0": 0,
          "1": 0,
          "2": 1,
          "3": 1,
          "4": 0
      },
      "f": {
          "0": 0,
          "1": 0,
          "2": 1,
          "3": 0
      },
      "b": {},
      "inputSourceMap": {
          "version": 3,
          "sources": [
              "Test.vue"
          ],
          "names": [],
          "mappings": ";AASA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA",
          "file": "Test.vue",
          "sourceRoot": "src/components",
          "sourcesContent": [
              "<template>\n  <div class=\"test\">\n    <h1>{{ msg }}</h1>\n    <button @click='report'> report </button>    \n    <button @click='test'> Test </button>    \n  </div>\n</template>\n\n<script>\nimport axios from 'axios'\nexport default {\n  name: 'Test',\n  props: {\n    msg: String,\n  },\n  methods: {\n    report() {\n      axios.post('http://localhost:3000/report-cov', {\n        data: window.__coverage__\n      }).then(res=>{\n        console.log(res);\n      })\n    },\n    test() {\n      console.log('test');\n      console.log('test1')\n    },\n    testnew() {\n      console.log('testnew');\n    }\n  },\n}\n</script>\n<!-- Add \"scoped\" attribute to limit CSS to this component only -->\n<style scoped>\nh3 {\n  margin: 40px 0 0;\n}\nul {\n  list-style-type: none;\n  padding: 0;\n}\nli {\n  display: inline-block;\n  margin: 0 10px;\n}\na {\n  color: #42b983;\n}\n</style>"
          ]
      },
      "_coverageSchema": "1a1c01bbd47fc00a2c39e90264f33305004495a9",
      "hash": "922ab298bc8b9ee4e0c4f4078d2ce5a08a5421fa"
  }
}

// remap(map)
module.exports = {
  remap
}