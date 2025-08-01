#![allow(warnings)]

mod fs_op;

use std::{fs, io};

use crate::fs_op::list_name::list_names;

fn main() {
  // list_names();

  dbg!(&0);
  let ans = aa();

  if let Ok(ans) = ans {
    dbg!(&ans);
  } else {
    dbg!(&"--err");
  }

  dbg!(&1);
}

fn aa() -> Result<(), i32> {
  let a: String = None.ok_or::<i32>(11)?;

  Ok(())
}
