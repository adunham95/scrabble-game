const path = require('path');
const fs = require('fs');
var exec = require('child_process').exec;
let IconArray = [];
function execute(command, callback) {
  exec(command, function (error, stdout, stderr) {
    callback(stdout);
  });
}
function getGitUser(callback) {
  console.log('Running builder function');
  execute('npx @svgr/cli --native -d ReactIcons svgs', function (name) {
    callback(console.log('Finished Building ReactIcons'));
  });
  // const iconData = exec('npx @svgr/cli --native -d ReactIcons Icons');
  // return {iconData};
}

function buildIcons() {
  const myPath = '/ReactIcons';
  const directory = path.join(__dirname, myPath);
  
  console.log(directory);

  fs.readdir(directory, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      // console.log(file);

      // console.log(path.extname(file))

      IconArray.push(file.replace('.js', ''));

      const filePath = `.${myPath}/${file}`;
      console.log(`Reading ${filePath}`);

      // eslint-disable-next-line no-shadow
      fs.readFile(filePath, 'utf8', (err, data) => {
        // console.log(data);
        let newData = data;
        if (err) {
          throw err;
        }

        // console.log(typeof newData);

        newData = newData.replace(
          /(className|class)="(([^"]*))"/g,
          'style={{fill: props.color}}'
        );
        newData = newData.replace(/fill="#([^"]*)"/g, 'fill={props.color}');
        newData = newData.replace(/stroke="#([^"]*)"/g, 'stroke={props.color}');

        // console.log(newData);

        // Update the file with the new data
        // eslint-disable-next-line no-shadow
        fs.writeFile(filePath, newData, 'utf8', function (err) {
          if (err) {
            return console.log(err);
          }
          console.log('writing to ' + filePath);
        });
      });
    });
    buildIconFile();
  });
}


function buildIconFile(){
    const IconFile = path.join(__dirname, 'Icon.js');

    const newIconArray = IconArray.filter((i) => i !== 'index');
  
    console.log(newIconArray)
  
    const IconFileData = `import React from react;
  import {${newIconArray.map((i) => {
      return i;
  }).join(',\n')}} from './ReactIcons';

export const Icon = ({
    name = '',
    color = '#626262',
    height = 15,
    width = 15,
}) => { 
    const generateIcons = () => {
        let searchName = name.toLowerCase();
        switch (searchName) {
         ${generateIcons(newIconArray)} 
            default:
            return (
                <p>
                    {name}
                </p>
            ); 
        }
    };

    return (
        <div>
        {generateIcons()}
        </div>
    );
}; 
    `
  
    fs.writeFile(IconFile, IconFileData, 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('writing to ' + IconFile);
    });
}


function generateIcons(icons){
 return icons.map((i) => {
    return `case '${i.toLowerCase()}':
    return <${i} color={color} height={height} width={width} />;`;
    }).join('\n')
}

getGitUser(function () {
  buildIcons();
});
