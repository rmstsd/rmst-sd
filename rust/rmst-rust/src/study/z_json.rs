use serde::Deserialize;
use std::{
  fs::File,
  io::{self, Read},
  path,
};

static pathStr: &str = r"D:\Desktop\cfg-2.json";

// 定义用户结构体
#[derive(Deserialize, Debug)]
struct User {
  name: String,
  age: Option<u8>,
}

fn readPath(path: Path) -> io::Result<User> {
  // 打开文件
  let mut file = File::open(path)?;
  // 创建一个空的 String 用于存储文件内容
  let mut contents = String::new();
  // 读取文件内容到字符串中
  file.read_to_string(&mut contents)?;

  // 反序列化 JSON 数据到 Rust 数据结构
  let user: User = serde_json::from_str(&contents)?;

  println!("{user:#?}");

  Ok(user)
}

pub fn json() {
  let a = readPath(pathStr);
  dbg!(&a);
  // // The type of `j` is `&str`
  // let j = "
  //       {
  //           \"name\": \"0xF9BA143B95FF6D82\",
  //           \"age\": \"Menlo Park, CA\"
  //       }";

  // let u: User = serde_json::from_str(j).unwrap();
  // println!("{:#?}", u);

  // let u1 = json!({ "name": "aaa", "age": "11", "love": "777" });
  // println!("{u1:#?}");
}
