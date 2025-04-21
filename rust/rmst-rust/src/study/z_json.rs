use serde_json::{Result, Value};

pub fn json() {
  // Some JSON input data as a &str. Maybe this comes from the user.
  let data: &str = r#"
    {
       "name": "John Doe",
       "age": 43,
       "phones": [
           "+44 1234567",
           "+44 2345678"
       ],
       "love": {
          "a": "b"
        }
   }"#;

  let v: Value = serde_json::from_str(data).unwrap();

  // println!("{:#?}", v["name"]);
  // dbg!(&v["love"]);
  // dbg!(&v["phones"][0]);

  let mut b = 5;
  let c = &mut b;

  *c += 1;

  //

  let aa = "asdasd".to_string().to_string().to_string();

  dbg!(&aa);

  //
}
