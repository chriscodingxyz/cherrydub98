// const fs = require("fs");

// function createFileList(folderPath, outputFile) {
//   return new Promise((resolve, reject) => {
//     fs.readdir(folderPath, (err, files) => {
//       if (err) {
//         reject(err);
//         console.error("Error reading folder:", err);
//         return;
//       } else resolve(files.slice(1));
//     });

//     // const allFiles = files.slice(1);

//     // finalresult = allFiles;

//     // console.log("all of themm!!!", allFiles);
//     // // test.push(allFiles);

//     // const fileList = allFiles.join("\n");
//     // fs.writeFile(outputFile, fileList, "utf8", (err) => {
//     //   if (err) {
//     //     console.error("Error writing file:", err);
//     //     return;
//     //   }
//     //   console.log(`File list saved to ${outputFile}`);
//     // });

//     // return allFiles;
//   });
// }

// const folderPath = `${__dirname}/memes`;
// const outputFile = `./memeimglist.txt`;

// const finalResultBuddy = createFileList(folderPath, outputFile).then(
//   (result) => {
//     console.log("reuslt here buddy", result);
//   }
// );

// console.log("sdlkfjlsdfjdls", createFileList(folderPath, outputFile));

// console.log("DJKLSFDKSLFKLDSFLDFL", finalResultBuddy);

// // console.log(typeof createFileList());

const fs = require("fs");

function createFileList(folderPath, outputFile) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
        console.error("Error reading folder:", err);
        return;
      }

      const allFiles = files.slice(1);

      const fileList = allFiles.join("\n");
      fs.writeFile(outputFile, fileList, "utf8", (err) => {
        if (err) {
          console.error("Error writing file:", err);
          reject(err);
          return;
        }
        console.log(`File list saved to ${outputFile}`);
        resolve(allFiles);
      });
    });
  });
}

const folderPath = `${__dirname}/memes`;
const outputFile = `./memeimglist.txt`;

const finalResultBuddy = createFileList(folderPath, outputFile).then(
  (result) => {
    return result;
    console.log("result here buddy", result);
  }
);

console.log("finalResultBuddy", finalResultBuddy);
