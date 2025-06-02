#[macro_use]
extern crate lazy_static;
use std::sync::Mutex;

#[derive(Debug)]
struct User {
  uu: i32,
}

lazy_static! {
  static ref GLOBAL_DATA: Mutex<Option<User>> = Mutex::new(None);
}

fn main() {
  // 设置值
  *GLOBAL_DATA.lock().unwrap() = Some(User { uu: 77 });

  // 读取值
  if let Some(data) = &*GLOBAL_DATA.lock().unwrap() {
    dbg!(&data);

    dbg!(&data.uu);
  }
}
