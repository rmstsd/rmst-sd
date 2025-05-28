pub fn clo() {
  let u1 = User {
    name: "Alice".to_owned(),
    age: 30,
  };
  let u2 = User {
    name: "Bob".to_owned(),
    age: 25,
  };
  let u3 = User {
    name: "Charlie".to_owned(),
    age: 35,
  };
  let u4 = User {
    name: "Dave".to_owned(),
    age: 28,
  };
  let mut users = vec![u1, u2, u3, u4];
  soot_user(&mut users);

  dbg!(&users);
}

#[derive(Debug)]
struct User {
  name: String,
  age: u8,
}

fn soot_user(users: &mut Vec<User>) {
  users.sort_by_key(sort_helper);
}

fn sort_helper(u: &User) -> u8 {
  u.age
}
