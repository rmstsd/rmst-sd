use std::{fs, io};

pub fn list_names() -> Result<(), io::Error> {
  let path = r"D:\Desktop\rmst-assets";

  let read_dir = fs::read_dir(path)?;

  let list: Vec<String> = read_dir
    .filter_map(|f| {
      let f = f.ok()?;
      let md = f.metadata().ok()?;

      if md.is_file() {
        let nn = f.file_name().into_string().ok();

        nn
      } else if md.is_dir() {
        let nn = f.file_name().into_string().ok();

        nn
      } else {
        None
      }
    })
    .collect();

  dbg!(&"--");
  dbg!(&list);

  // let file = File::open(path)?;

  return Ok(());
}
