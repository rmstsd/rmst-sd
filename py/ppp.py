import random
import math

numbers = [random.randint(1, 100) for _ in range(10)]
print("随机数列表:", numbers)

total = sum(numbers)

average = total / len(numbers)
print("列表元素平均值:", average)

maximum = max(numbers)

sorted_numbers = sorted(numbers, reverse=True)
print("排序后的列表:", sorted_numbers)

minimum = min(numbers)
print("列表中的最小值:", minimum)

print("列表元素总和:", total)
print("列表中的最大值:", maximum)


def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(math.sqrt(num)) + 1):
        if num % i == 0:
            return False
    return True


prime_numbers = [num for num in numbers if is_prime(num)]
print("质数列表:", prime_numbers)

squared_numbers = [num**2 for num in numbers]
print("平方数列表:", squared_numbers)

random.shuffle(numbers)
print("乱序后的列表:", numbers)

for num in numbers:
    if num % 2 == 0:
        print(num, "是偶数")
    else:
        print(num, "是奇数")

print("程序结束")
