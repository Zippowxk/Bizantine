module.exports = {
    hooks: {
      readPackage(pkg) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        if (pkg.name === 'istanbul-lib-report') {
          pkg.dependencies['istanbul-lib-coverage'] = '@bizantine/istanbul-lib-coverage';
        }
        return pkg;
      },
    },
  };