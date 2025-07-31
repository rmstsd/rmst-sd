#![allow(warnings)]

mod fs_op;

use std::{fs, io};

use crate::fs_op::list_name::list_names;

fn main() {
  list_names();
}
