import 'dart:async';

void main() {
  final cc = func();

  print(cc);

  Timer(Duration(seconds: 2), () {
    print(23);
  });
}

func() => {'a': 'a', 'b': 'b'};
