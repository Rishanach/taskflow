def add(a, b): return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def calculate(a, op, b):
    ops = {"+": add, "-": subtract, "*": multiply, "/": divide}
    if op not in ops:
        raise ValueError(f"Unknown operator: {op}")
    return ops[op](a, b)

if __name__ == "__main__":
    print(calculate(10, "+", 5))   # 15
    print(calculate(10, "/", 2))   # 5.0
    print(calculate(9,  "*", 3))   # 27