use std::collections::HashMap;

fn hashMap() {
  // hash map

  let mut sc = HashMap::new();
  sc.insert("a", 88);
  sc.insert("b", 10);
  sc.insert("c", 10);

  // println!("-- {sc:?}");

  let ac = sc.get("a").unwrap();
  // println!("{ac:?}");

  let fname = String::from("aa");

  let mut hm = HashMap::new();
  hm.insert(fname, 8);

  let ss = hm.entry(String::from("aa")).or_insert(0);
  let ss = hm.entry(String::from("bb")).or_insert(2);

  let wd = "a";

  let sp = wd.split("");

  let mut mp: HashMap<&str, i32> = HashMap::new();

  for item in wd.split("") {
    if item == "" {
      continue;
    }

    let count = mp.entry(item).or_insert(0);
    *count += 1;
  }
  // println!("{mp:?}");
}
