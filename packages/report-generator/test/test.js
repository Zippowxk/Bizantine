const { genReport } = require("../index.js");
const map = {
    "/Users/wxkmac/Documents/Github/Bizantine/example/app/src/App.vue": {
        "path": "/Users/wxkmac/Documents/Github/Bizantine/example/app/src/App.vue",
        "statementMap": {
            "0": {
                "start": {
                    "line": 12,
                    "column": 4
                },
                "end": {
                    "line": 14,
                    "column": 5
                }
            },
            "1": {
                "start": {
                    "line": 17,
                    "column": 4
                },
                "end": {
                    "line": 19,
                    "column": 5
                }
            },
            "2": {
                "start": {
                    "line": 18,
                    "column": 6
                },
                "end": {
                    "line": 18,
                    "column": 36
                }
            }
        },
        "fnMap": {
            "0": {
                "name": "(anonymous_0)",
                "decl": {
                    "start": {
                        "line": 11,
                        "column": 2
                    },
                    "end": {
                        "line": 11,
                        "column": 3
                    }
                },
                "loc": {
                    "start": {
                        "line": 11,
                        "column": 9
                    },
                    "end": {
                        "line": 15,
                        "column": 3
                    }
                },
                "line": 11
            },
            "1": {
                "name": "(anonymous_1)",
                "decl": {
                    "start": {
                        "line": 16,
                        "column": 2
                    },
                    "end": {
                        "line": 16,
                        "column": 3
                    }
                },
                "loc": {
                    "start": {
                        "line": 16,
                        "column": 12
                    },
                    "end": {
                        "line": 20,
                        "column": 3
                    }
                },
                "line": 16
            }
        },
        "branchMap": {
            "0": {
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
            "0": 1,
            "1": 1,
            "2": 1
        },
        "f": {
            "0": 1,
            "1": 1
        },
        "b": {
            "0": [
                1,
                0
            ]
        },
        "inputSourceMap": {
            "version": 3,
            "sources": [
                "App.vue"
            ],
            "names": [],
            "mappings": ";AASA;AACA;;AAEA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA",
            "file": "App.vue",
            "sourceRoot": "src",
            "sourcesContent": [
                "<template>\n  <div id=\"app\">\n    <img alt=\"Vue logo\" src=\"./assets/logo.png\">\n    <HelloWorld :msg=\"message\"/>\n    <Test :msg=\"message\"/>\n  </div>\n</template>\n\n<script>\nimport HelloWorld from './components/HelloWorld.vue'\nimport Test from './components/Test.vue'\n\nexport default {\n  name: 'App',\n  components: {\n    HelloWorld,\n    Test,\n  },\n  data() {\n    return {\n      message: 'Welcome to Your Vue.js App'\n    }\n  },\n  created() {\n    if (\"DEBUG\") {\n      this.message = 'this is Debug'\n    }\n  }\n}\n</script>\n\n<style>\n#app {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #2c3e50;\n  margin-top: 60px;\n}\n</style>\n"
            ]
        },
        "_coverageSchema": "1a1c01bbd47fc00a2c39e90264f33305004495a9",
        "hash": "0dd25c1ae3f2cce1d3c615775469d92503935be5"
    },
    "/Users/wxkmac/Documents/Github/Bizantine/example/app/src/components/HelloWorld.vue": {
        "path": "/Users/wxkmac/Documents/Github/Bizantine/example/app/src/components/HelloWorld.vue",
        "statementMap": {
            "0": {
                "start": {
                    "line": 9,
                    "column": 25
                },
                "end": {
                    "line": 20,
                    "column": 7
                }
            },
            "1": {
                "start": {
                    "line": 10,
                    "column": 21
                },
                "end": {
                    "line": 10,
                    "column": 80
                }
            },
            "2": {
                "start": {
                    "line": 11,
                    "column": 21
                },
                "end": {
                    "line": 11,
                    "column": 46
                }
            },
            "3": {
                "start": {
                    "line": 12,
                    "column": 22
                },
                "end": {
                    "line": 12,
                    "column": 49
                }
            },
            "4": {
                "start": {
                    "line": 13,
                    "column": 8
                },
                "end": {
                    "line": 13,
                    "column": 36
                }
            },
            "5": {
                "start": {
                    "line": 14,
                    "column": 8
                },
                "end": {
                    "line": 14,
                    "column": 40
                }
            },
            "6": {
                "start": {
                    "line": 15,
                    "column": 8
                },
                "end": {
                    "line": 15,
                    "column": 25
                }
            },
            "7": {
                "start": {
                    "line": 16,
                    "column": 8
                },
                "end": {
                    "line": 16,
                    "column": 40
                }
            },
            "8": {
                "start": {
                    "line": 17,
                    "column": 8
                },
                "end": {
                    "line": 17,
                    "column": 21
                }
            },
            "9": {
                "start": {
                    "line": 18,
                    "column": 8
                },
                "end": {
                    "line": 18,
                    "column": 40
                }
            },
            "10": {
                "start": {
                    "line": 19,
                    "column": 8
                },
                "end": {
                    "line": 19,
                    "column": 33
                }
            },
            "11": {
                "start": {
                    "line": 21,
                    "column": 6
                },
                "end": {
                    "line": 21,
                    "column": 53
                }
            }
        },
        "fnMap": {
            "0": {
                "name": "(anonymous_0)",
                "decl": {
                    "start": {
                        "line": 8,
                        "column": 4
                    },
                    "end": {
                        "line": 8,
                        "column": 5
                    }
                },
                "loc": {
                    "start": {
                        "line": 8,
                        "column": 11
                    },
                    "end": {
                        "line": 22,
                        "column": 5
                    }
                },
                "line": 8
            },
            "1": {
                "name": "(anonymous_1)",
                "decl": {
                    "start": {
                        "line": 9,
                        "column": 25
                    },
                    "end": {
                        "line": 9,
                        "column": 26
                    }
                },
                "loc": {
                    "start": {
                        "line": 9,
                        "column": 34
                    },
                    "end": {
                        "line": 20,
                        "column": 7
                    }
                },
                "line": 9
            }
        },
        "branchMap": {},
        "s": {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0,
            "10": 0,
            "11": 0
        },
        "f": {
            "0": 0,
            "1": 0
        },
        "b": {},
        "inputSourceMap": {
            "version": 3,
            "sources": [
                "HelloWorld.vue"
            ],
            "names": [],
            "mappings": ";AAQA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA",
            "file": "HelloWorld.vue",
            "sourceRoot": "src/components",
            "sourcesContent": [
                "<template>\n  <div class=\"hello\">\n    <h1>{{ msg }}</h1>\n    <button @click='save'> save json </button>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'HelloWorld',\n  props: {\n    msg: String,\n  },\n  methods: {\n    save() {\n      const saveAsJson = (str) => {\n        const blob = new Blob([str], { type: 'application/json;charset=utf-8' })\n        const href = URL.createObjectURL(blob)\n        const alink = document.createElement('a')\n        alink.style.display = 'none'\n        alink.download = 'coverage.json' // 下载后文件名\n        alink.href = href\n        document.body.appendChild(alink)\n        alink.click()\n        document.body.removeChild(alink) // 下载完成移除元素\n        URL.revokeObjectURL(href) // 释放掉blob对象\n      }\n      saveAsJson(JSON.stringify(window.__coverage__))\n    },\n  },\n}\n</script>\n\n<!-- Add \"scoped\" attribute to limit CSS to this component only -->\n<style scoped>\nh3 {\n  margin: 40px 0 0;\n}\nul {\n  list-style-type: none;\n  padding: 0;\n}\nli {\n  display: inline-block;\n  margin: 0 10px;\n}\na {\n  color: #42b983;\n}\n</style>\n"
            ]
        },
        "_coverageSchema": "1a1c01bbd47fc00a2c39e90264f33305004495a9",
        "hash": "9df8b115400e9db5887b1cac884159bc66503828"
    },
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
        "branchMap": {},
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
    },
    "/Users/wxkmac/Documents/Github/Bizantine/example/app/src/main.js": {
        "path": "/Users/wxkmac/Documents/Github/Bizantine/example/app/src/main.js",
        "statementMap": {
            "0": {
                "start": {
                    "line": 4,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 32
                }
            },
            "1": {
                "start": {
                    "line": 6,
                    "column": 0
                },
                "end": {
                    "line": 8,
                    "column": 17
                }
            },
            "2": {
                "start": {
                    "line": 7,
                    "column": 15
                },
                "end": {
                    "line": 7,
                    "column": 21
                }
            }
        },
        "fnMap": {
            "0": {
                "name": "(anonymous_0)",
                "decl": {
                    "start": {
                        "line": 7,
                        "column": 10
                    },
                    "end": {
                        "line": 7,
                        "column": 11
                    }
                },
                "loc": {
                    "start": {
                        "line": 7,
                        "column": 15
                    },
                    "end": {
                        "line": 7,
                        "column": 21
                    }
                },
                "line": 7
            }
        },
        "branchMap": {},
        "s": {
            "0": 1,
            "1": 1,
            "2": 1
        },
        "f": {
            "0": 1
        },
        "b": {},
        "_coverageSchema": "1a1c01bbd47fc00a2c39e90264f33305004495a9",
        "hash": "0ce6d3e13e9f6d3dd3da99803dea14995aaa644e"
    }
}
const diff = `diff --git a/src/components/Test.vue b/src/components/Test.vue
index ad81efc..c57c56c 100644
--- a/src/components/Test.vue
+++ b/src/components/Test.vue
@@ -14,8 +14,11 @@ export default {
       })
     },
     test() {
-      // console.log('test');
+      console.log('test');
       console.log('test1')
+    },
+    testnew() {
+      console.log('testnew');
     }
   },
 }
`
const parseGitDiff = require("parse-git-diff");
const diffObj = parseGitDiff(diff)
// console.log(JSON.stringify(res))


genReport(map, "./report", diff)