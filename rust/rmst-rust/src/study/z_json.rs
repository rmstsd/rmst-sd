use serde_json::{Result, Value};

pub fn json() {
  // Some JSON input data as a &str. Maybe this comes from the user.
  let data = r#"
    {
       "name": "John Doe",
       "age": 43,
       "phones": [
           "+44 1234567",
           "+44 2345678"
       ],
       "love": {
          "a": "b"
        }
   }"#;

  let v: Value = serde_json::from_str(data).unwrap();

  // println!("{:#?}", v["name"]);
  // dbg!(&v["love"]);
  // dbg!(&v["phones"][0]);

  dbg!(22);

  let mut b = 5;
  let c = &mut b;

  *c += 1;

  //

  struct Book2<'a> {
    title: &'a str,
    author: &'a str,
    date: &'a str,
  }

  // 声明一个标准字符串类型
  let title = String::from("rust 核心进阶");

  let book = Book2 {
    title: title.as_str(),
    author: "xxx",
    date: "yyy",
  };

  // 按值传递，title 失去值的所有权
  read(title);

  fn read(book: String) {
    println!("xxxxx, {}", book);
  }

  let mut s = String::from("hello");
  let r1 = &s;
  let r2 = &s;

  println!("{r1} and {r2}");

  let r3 = &mut s;
  println!("{r3} ");
  //

  let reference_to_nothing = dangle();

  fn dangle() -> &String {
    let s = String::from("hello");

    &s
  }
}
