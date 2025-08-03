#![allow(warnings)]

mod fs_op;
mod jksj;

use std::{
  fs::{self, File},
  io,
};

use crate::{fs_op::list_name::list_names, jksj::cli::cli_index};

fn main() {
  // let url = "https://rustwiki.org/zh-CN/book/ch07-05-separating-modules-into-different-files.html";

  // let resp = reqwest::blocking::get(url).unwrap().text().unwrap();

  // let md = html2md::parse_html(&resp);

  // dbg!(123);

  // fs::write("../html.md", md);

  cli_index();
}

#[derive(Debug)]
enum MyError {
  A,
  B,
}

fn divide(a: i32, b: i32) -> Result<bool, MyError> {
  if b == 0 { Err(MyError::A) } else { Ok(true) }
}

fn square_root(x: f64) -> Result<f64, MyError> {
  if x < 0.0 {
    Err(MyError::B)
  } else {
    Ok(x.sqrt())
  }
}

fn aa() -> Result<(), io::Error> {
  let aa: Result<File, io::Error> = File::open("");

  let aa = aa.is_err_and(|x| {
    dbg!(&x);

    let code = x.raw_os_error().unwrap();
    dbg!(&code);
    let kk = x.kind();
    dbg!(&kk);
    println!("-- {}", x.to_string());

    true
  });
  dbg!(&aa);

  dbg!(&2);

  Ok(())
}
