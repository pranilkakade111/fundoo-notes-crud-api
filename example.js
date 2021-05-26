/* eslint-disable prefer-promise-reject-errors */
// const data = async () => {
//   const msg = await 'Example Of Async Await';
//   console.log(msg);
// };
// console.log('hello');
// data();
// console.log('world');

const promise = new Promise((resolve, reject) => {
  const task = true;
  if (task) {
    resolve('the promise task was performed successfully');
  } else {
    reject('the promise task reject');
  }
});

promise.then((resp) => {
  console.log(resp);
}).catch((rej) => {
  console.log(rej);
});

function message(name, callback) {
  console.log(`Hi..${name}`);
  callback();
}

function call() {
  console.log('This Is callback Function');
}

message('pranil', call);
