// 'let' and 'const'

{
  let number = 100;

  {
    let number = 10;
    console.log('"let" block scope number:', number);
  }

  console.log('"let" outer scope number:', number);
}
{
  const number = 100;

  {
    const number = 10;
    console.log('"const" block scope number:', number);
  }

  console.log('"const" outer scope number:', number);
}
// template expressions
{
  let a = 'good';
  let b = 'morning';
  let c = 'vietnammmmm!!!!';

  console.log(`${a} ${b} ${c}`);
}
// operating and destructuring
{
  let a = [20, 30, 40];
  let b = [10, ...a, 50];

  console.log(b);

  function collect(...a) {
    console.log(a);
  }

  collect(1,2,3,4,5);
  collect(1,2,3,4,5,10,12,20);

  let z = [4,5,6];
  let [four, five] = z;
  console.log(four, five);

  {
    let king = { name: 'Mufasa', kids: 1 };
    let { name, kids } = king;
    console.log(name, kids);
  }
  {
    let son = { name: 'Simba', brothers: 0 };
    let name, brothers;
    ({ name, brothers } = son);
    console.log(name, brothers);
  }
}
