 将模块分割进不同文件 - Rust 程序设计语言 中文版  var path\_to\_root = ""; var default\_theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "navy" : "light";  try { var theme = localStorage.getItem('mdbook-theme'); var sidebar = localStorage.getItem('mdbook-sidebar'); if (theme.startsWith('"') && theme.endsWith('"')) { localStorage.setItem('mdbook-theme', theme.slice(1, theme.length - 1)); } if (sidebar.startsWith('"') && sidebar.endsWith('"')) { localStorage.setItem('mdbook-sidebar', sidebar.slice(1, sidebar.length - 1)); } } catch (e) { }  var theme; try { theme = localStorage.getItem('mdbook-theme'); } catch(e) { } if (theme === null || theme === undefined) { theme = default\_theme; } var html = document.querySelector('html'); html.classList.remove('no-js') html.classList.remove('light') html.classList.add(theme); html.classList.add('js');  var html = document.querySelector('html'); var sidebar = 'hidden'; if (document.body.clientWidth \>= 1080) { try { sidebar = localStorage.getItem('mdbook-sidebar'); } catch(e) { } sidebar = sidebar || 'visible'; } html.classList.remove('sidebar-visible'); html.classList.add("sidebar-" + sidebar);

1. [Rust 程序设计语言](title-page.html)
2. [前言](foreword.html)
3. [简介](ch00-00-introduction.html)
4. [**1.** 入门指南](ch01-00-getting-started.html)
5. 1. [**1.1.** 安装](ch01-01-installation.html)
   2. [**1.2.** Hello, World!](ch01-02-hello-world.html)
   3. [**1.3.** Hello, Cargo!](ch01-03-hello-cargo.html)

6. [**2.** 猜数字游戏](ch02-00-guessing-game-tutorial.html)
7. [**3.** 通用编程概念](ch03-00-common-programming-concepts.html)
8. 1. [**3.1.** 变量和可变性](ch03-01-variables-and-mutability.html)
   2. [**3.2.** 数据类型](ch03-02-data-types.html)
   3. [**3.3.** 函数](ch03-03-how-functions-work.html)
   4. [**3.4.** 注释](ch03-04-comments.html)
   5. [**3.5.** 控制流](ch03-05-control-flow.html)

9. [**4.** 认识所有权](ch04-00-understanding-ownership.html)
10. 1. [**4.1.** 什么是所有权？](ch04-01-what-is-ownership.html)
   2. [**4.2.** 引用与借用](ch04-02-references-and-borrowing.html)
   3. [**4.3.** 切片 slice](ch04-03-slices.html)

11. [**5.** 使用结构体组织关联数据](ch05-00-structs.html)
12. 1. [**5.1.** 定义和举例说明结构体](ch05-01-defining-structs.html)
   2. [**5.2.** 使用结构体的代码例子](ch05-02-example-structs.html)
   3. [**5.3.** 方法语法](ch05-03-method-syntax.html)

13. [**6.** 枚举和模式匹配](ch06-00-enums.html)
14. 1. [**6.1.** 定义枚举](ch06-01-defining-an-enum.html)
   2. [**6.2.** match 控制流运算符](ch06-02-match.html)
   3. [**6.3.** if let 简单控制流](ch06-03-if-let.html)

15. [**7.** 使用包、Crate 和模块管理不断增长的项目](ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
16. 1. [**7.1.** 包和 crate](ch07-01-packages-and-crates.html)
   2. [**7.2.** 定义模块来控制作用域与私有性](ch07-02-defining-modules-to-control-scope-and-privacy.html)
   3. [**7.3.** 路径用于引用模块树中的项](ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html)
   4. [**7.4.** 使用 use 关键字将名称引入作用域](ch07-04-bringing-paths-into-scope-with-the-use-keyword.html)
   5. [**7.5.** 将模块分割进不同文件](ch07-05-separating-modules-into-different-files.html)

17. [**8.** 常见集合](ch08-00-common-collections.html)
18. 1. [**8.1.** 使用 vector 存储一列值](ch08-01-vectors.html)
   2. [**8.2.** 使用字符串存储 UTF-8 编码的文本](ch08-02-strings.html)
   3. [**8.3.** 在哈希 map 中存储键和关联值](ch08-03-hash-maps.html)

19. [**9.** 错误处理](ch09-00-error-handling.html)
20. 1. [**9.1.** panic! 与不可恢复的错误](ch09-01-unrecoverable-errors-with-panic.html)
   2. [**9.2.** Result 与可恢复的错误](ch09-02-recoverable-errors-with-result.html)
   3. [**9.3.** panic! 还是不 panic!](ch09-03-to-panic-or-not-to-panic.html)

21. [**10.** 泛型、trait 与生命周期](ch10-00-generics.html)
22. 1. [**10.1.** 泛型数据类型](ch10-01-syntax.html)
   2. [**10.2.** trait：定义共享的行为](ch10-02-traits.html)
   3. [**10.3.** 生命周期与引用有效性](ch10-03-lifetime-syntax.html)

23. [**11.** 编写自动化测试](ch11-00-testing.html)
24. 1. [**11.1.** 如何编写测试](ch11-01-writing-tests.html)
   2. [**11.2.** 控制测试如何运行](ch11-02-running-tests.html)
   3. [**11.3.** 测试的组织结构](ch11-03-test-organization.html)

25. [**12.** 一个 I/O 项目：构建命令行程序](ch12-00-an-io-project.html)
26. 1. [**12.1.** 接受命令行参数](ch12-01-accepting-command-line-arguments.html)
   2. [**12.2.** 读取文件](ch12-02-reading-a-file.html)
   3. [**12.3.** 重构以改进模块化与错误处理](ch12-03-improving-error-handling-and-modularity.html)
   4. [**12.4.** 采用测试驱动开发完善库的功能](ch12-04-testing-the-librarys-functionality.html)
   5. [**12.5.** 处理环境变量](ch12-05-working-with-environment-variables.html)
   6. [**12.6.** 将错误信息输出到标准错误而不是标准输出](ch12-06-writing-to-stderr-instead-of-stdout.html)

27. [**13.** Rust 中的函数式语言功能：迭代器与闭包](ch13-00-functional-features.html)
28. 1. [**13.1.** 闭包：可以捕获其环境的匿名函数](ch13-01-closures.html)
   2. [**13.2.** 使用迭代器处理元素序列](ch13-02-iterators.html)
   3. [**13.3.** 改进之前的 I/O 项目](ch13-03-improving-our-io-project.html)
   4. [**13.4.** 性能比较：循环对迭代器](ch13-04-performance.html)

29. [**14.** 更多关于 Cargo 和 Crates.io 的内容](ch14-00-more-about-cargo.html)
30. 1. [**14.1.** 采用发布配置自定义构建](ch14-01-release-profiles.html)
   2. [**14.2.** 将 crate 发布到 Crates.io](ch14-02-publishing-to-crates-io.html)
   3. [**14.3.** Cargo 工作空间](ch14-03-cargo-workspaces.html)
   4. [**14.4.** 使用 cargo install 从 Crates.io 安装二进制文件](ch14-04-installing-binaries.html)
   5. [**14.5.** Cargo 自定义扩展命令](ch14-05-extending-cargo.html)

31. [**15.** 智能指针](ch15-00-smart-pointers.html)
32. 1. [**15.1.** 使用 Box\<T\> 指向堆上的数据](ch15-01-box.html)
   2. [**15.2.** 使用 Deref trait 将智能指针当作常规引用处理](ch15-02-deref.html)
   3. [**15.3.** 使用 Drop Trait 运行清理代码](ch15-03-drop.html)
   4. [**15.4.** Rc\<T\> 引用计数智能指针](ch15-04-rc.html)
   5. [**15.5.** RefCell\<T\> 与内部可变性模式](ch15-05-interior-mutability.html)
   6. [**15.6.** 引用循环会导致内存泄漏](ch15-06-reference-cycles.html)

33. [**16.** 无畏并发](ch16-00-concurrency.html)
34. 1. [**16.1.** 使用线程同一时间运行代码](ch16-01-threads.html)
   2. [**16.2.** 使用消息传递在线程间通信](ch16-02-message-passing.html)
   3. [**16.3.** 共享状态并发](ch16-03-shared-state.html)
   4. [**16.4.** 使用Sync 与 Send Trait 的可扩展并发](ch16-04-extensible-concurrency-sync-and-send.html)

35. [**17.** Rust 的面向对象编程特性](ch17-00-oop.html)
36. 1. [**17.1.** 面向对象语言的特点](ch17-01-what-is-oo.html)
   2. [**17.2.** 为使用不同类型的值而设计的 trait 对象](ch17-02-trait-objects.html)
   3. [**17.3.** 面向对象设计模式的实现](ch17-03-oo-design-patterns.html)

37. [**18.** 模式和匹配](ch18-00-patterns.html)
38. 1. [**18.1.** 所有可能会用到模式的位置](ch18-01-all-the-places-for-patterns.html)
   2. [**18.2.** Refutability（可反驳性）: 模式是否会匹配失效](ch18-02-refutability.html)
   3. [**18.3.** 模式语法](ch18-03-pattern-syntax.html)

39. [**19.** 高级特征](ch19-00-advanced-features.html)
40. 1. [**19.1.** 不安全的 Rust](ch19-01-unsafe-rust.html)
   2. [**19.2.** 高级 trait](ch19-03-advanced-traits.html)
   3. [**19.3.** 高级类型](ch19-04-advanced-types.html)
   4. [**19.4.** 高级函数与闭包](ch19-05-advanced-functions-and-closures.html)
   5. [**19.5.** 宏](ch19-06-macros.html)

41. [**20.** 最后的项目: 构建多线程 Web 服务器](ch20-00-final-project-a-web-server.html)
42. 1. [**20.1.** 构建单线程 Web 服务器](ch20-01-single-threaded.html)
   2. [**20.2.** 将单线程服务器变为多线程服务器](ch20-02-multithreaded.html)
   3. [**20.3.** 优雅停机与清理](ch20-03-graceful-shutdown-and-cleanup.html)

43. [**21.** 附录](appendix-00.html)
44. 1. [**21.1.** A - 关键字](appendix-01-keywords.html)
   2. [**21.2.** B - 运算符与符号](appendix-02-operators.html)
   3. [**21.3.** C - 可派生的 trait](appendix-03-derivable-traits.html)
   4. [**21.4.** D - 实用开发工具](appendix-04-useful-development-tools.html)
   5. [**21.5.** E - 版本](appendix-05-editions.html)
   6. [**21.6.** F - 本书译本](appendix-06-translation.html)
   7. [**21.7.** G - Rust 是如何开发的与 “Nightly Rust”](appendix-07-nightly-rust.html)

* Light (default)
* Rust
* Coal
* Navy
* Ayu

Rust 程序设计语言 中文版
==========

[](print.html) [](https://github.com/rust-lang-cn/book-cn) [](https://github.com/rust-lang-cn/book-cn/edit/master/src/ch07-05-separating-modules-into-different-files.md)

 document.getElementById('sidebar-toggle').setAttribute('aria-expanded', sidebar === 'visible'); document.getElementById('sidebar').setAttribute('aria-hidden', sidebar !== 'visible'); Array.from(document.querySelectorAll('#sidebar a')).forEach(function(link) { link.setAttribute('tabIndex', sidebar === 'visible' ? 0 : -1); });

[将模块分割进不同文件](#将模块分割进不同文件)
----------

到目前为止，本章所有的例子都在一个文件中定义多个模块。当模块变得更大时，你可能想要将它们的定义移动到单独的文件中，从而使代码更容易阅读。

例如，我们从示例 7-17 开始，将 `front_of_house` 模块移动到属于它自己的文件 *src/front\_of\_house.rs* 中，通过改变 crate 根文件，使其包含示例 7-21 所示的代码。在这个例子中，crate 根文件是 *src/lib.rs*，这也同样适用于以 *src/main.rs* 为 crate 根文件的二进制 crate 项。

文件名: src/lib.rs

```
mod front_of_house;

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}

```

示例 7-21: 声明 `front_of_house` 模块，其内容将位于 *src/front\_of\_house.rs*

*src/front\_of\_house.rs* 会获取 `front_of_house` 模块的定义内容，如示例 7-22 所示。

文件名: src/front\_of\_house.rs

```
pub mod hosting {
    pub fn add_to_waitlist() {}
}

```

示例 7-22: 在 *src/front\_of\_house.rs* 中定义 `front_of_house`模块

在 `mod front_of_house` 后使用分号，而不是代码块，这将告诉 Rust 在另一个与模块同名的文件中加载模块的内容。继续重构我们例子，将 `hosting` 模块也提取到其自己的文件中，仅对 *src/front\_of\_house.rs* 包含 `hosting` 模块的声明进行修改：

文件名: src/front\_of\_house.rs

```
pub mod hosting;

```

接着我们创建一个 *src/front\_of\_house* 目录和一个包含 `hosting` 模块定义的 *src/front\_of\_house/hosting.rs* 文件：

文件名: src/front\_of\_house/hosting.rs

```
pub fn add_to_waitlist() {}

```

模块树依然保持相同，`eat_at_restaurant` 中的函数调用也无需修改继续保持有效，即便其定义存在于不同的文件中。这个技巧让你可以在模块代码增长时，将它们移动到新文件中。

注意，*src/lib.rs* 中的 `pub use crate::front_of_house::hosting` 语句是没有改变的，在文件作为 crate 的一部分而编译时，`use` 不会有任何影响。`mod` 关键字声明了模块，Rust 会在与模块同名的文件中查找模块的代码。

[总结](#总结)
----------

Rust 提供了将包分成多个 crate，将 crate 分成模块，以及通过指定绝对或相对路径从一个模块引用另一个模块中定义的项的方式。你可以通过使用 `use` 语句将路径引入作用域，这样在多次使用时可以使用更短的路径。模块定义的代码默认是私有的，不过可以选择增加 `pub` 关键字使其定义变为公有。

接下来，让我们看看一些标准库提供的集合数据类型，你可以利用它们编写出漂亮整洁的代码。

[](ch07-04-bringing-paths-into-scope-with-the-use-keyword.html) [](ch08-00-common-collections.html)

[](ch07-04-bringing-paths-into-scope-with-the-use-keyword.html) [](ch08-00-common-collections.html)

 window.playground\_copyable = true;