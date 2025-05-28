use icon::download_icon;

mod icon;

#[tokio::main]
async fn main() {
  download_icon("https://chat.deepseek.com/favicon.svg").await;
}
