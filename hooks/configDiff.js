module.exports = function() {
    var fs = require('fs');
    var colors = require('colors');

    var directory = './src/exemples/admin/';
    var fileName = 'configuration.ts';
    var fullName = directory + fileName;
    var distName = directory + '{fileName}.dist'.replace('{fileName}', fileName);
    var tmpName = directory + '.{fileName}.tmp'.replace('{fileName}', fileName);

    function createConfig() {
        fs.createReadStream(distName)
            .pipe(fs.createWriteStream(fullName));
        console.log('Configuration file doesn\'t exist.'.bold);
        console.log('Copy dist configuration as default configuration.'.green);
        console.log('Don\'t forget to update configuration file.'.yellow);
    }

    if (!fs.existsSync(fullName)) {
        createConfig();
    } else {
        if (fs.existsSync(tmpName)) {
            var distContent = fs.readFileSync(distName);
            var tmpContent = fs.readFileSync(tmpName);
            if (distContent.toString() !== tmpContent.toString()) {
                console.log('Dist configuration file seems to have changed. Please compare your configuration with it.'.yellow);
            }
        } else {
            console.log('Unable to determine diff in the dist configuration file, please compare your configuration with it.'.yellow);
        }
    }

    // save current dist to tmp file
    fs.createReadStream(distName)
        .pipe(fs.createWriteStream(tmpName));
}
