const fs = require('fs');
const path = require('path');

module.exports = (request, options) => {
  if (request.endsWith('.js') && (request.startsWith('./') || request.startsWith('../'))) {
    // Determine the absolute path of the potential .ts file
    const basedir = options.basedir;
    const tsFile = path.resolve(basedir, request.slice(0, -3) + '.ts');
    const tsxFile = path.resolve(basedir, request.slice(0, -3) + '.tsx');

    if (fs.existsSync(tsFile)) {
      try {
        return options.defaultResolver(request.slice(0, -3) + '.ts', options);
      } catch (err) {
        // Fall back to default resolver if resolving the .ts fails
      }
    } else if (fs.existsSync(tsxFile)) {
      try {
        return options.defaultResolver(request.slice(0, -3) + '.tsx', options);
      } catch (err) {
        // Fall back to default resolver if resolving the .tsx fails
      }
    }
  }

  return options.defaultResolver(request, options);
};
