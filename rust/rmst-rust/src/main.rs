#![allow(warnings)]

mod fs_op;

use std::{
  fs::{self, File},
  io,
};

use crate::fs_op::list_name::list_names;

fn main() {
  // dbg!(&0);
  // let ans = aa().expect("aa");
  // dbg!(&ans);

  let x: Result<i32, ()> = Ok(2);
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
