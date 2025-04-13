pub fn z_vec() {
  let num = 55;
  let list = vec![1, 2, 3, num];
  // list.retain(f);

  // println!("{list:#?}");
  let filtered_list: Vec<_> = list.iter().filter(|x| **x > 3).collect();
  // println!("{filtered_list:#?}");

  let mut c1 = Counter::new(1);

  println!("{:#?}", c1.get_number());
  println!("{:#?}", c1.get_number());
  println!("{:#?}", c1.get_number());

  // c1.add(2);
  println!("{:#?}", c1.get_number());
  println!("{:#?}", c1.get_number());

  // c1.give_up();
  // println!("{:#?}", cc.get_number());

  let c2 = Counter::new(2);

  let ans = Counter::combine(&c1, &c2);
  println!("{ans:#?}");

  println!("{:#?}", c1.get_number());
  println!("{:#?}", c2.get_number());
}

#[derive(Debug)]
struct Counter {
  number: i32,
}

impl Counter {
  fn new(number: i32) -> Self {
    Self { number }
  }

  // 不可变借用
  fn get_number(&self) -> i32 {
    self.number
  }

  // 可变借用
  fn add(&mut self, count: i32) {
    self.number += count;
  }

  // moved
  fn give_up(self) {
    // println!("{:#?}", self.number);
  }

  fn combine(c1: &Counter, c2: &Counter) -> Counter {
    Self {
      number: c1.number + c2.number,
    }
  }
}
