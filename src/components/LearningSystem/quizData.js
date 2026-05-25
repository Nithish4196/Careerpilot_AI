export const quizDatabase = {
  DSA: [
    {
      question: "Which data structure is used for Breadth First Traversal of a graph?",
      options: ["Stack", "Queue", "Tree", "Array"],
      correctAnswer: 1
    },
    {
      question: "What is the worst-case time complexity of QuickSort?",
      options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"],
      correctAnswer: 2
    },
    {
      question: "Which algorithmic paradigm is Dijkstra's algorithm based on?",
      options: ["Dynamic Programming", "Greedy Approach", "Divide and Conquer", "Backtracking"],
      correctAnswer: 1
    },
    {
      question: "A balanced binary tree guarantees what time complexity for search?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      correctAnswer: 2
    },
    {
      question: "What is the primary advantage of a hash table over an array?",
      options: ["Maintains sorted order", "Faster average search time", "Less memory usage", "Easier to iterate"],
      correctAnswer: 1
    }
  ],
  SQL: [
    {
      question: "Which SQL clause is used to filter records after aggregation?",
      options: ["WHERE", "ORDER BY", "GROUP BY", "HAVING"],
      correctAnswer: 3
    },
    {
      question: "What does the 'INNER JOIN' keyword return?",
      options: ["All records from the left table", "All records from the right table", "Records that have matching values in both tables", "All records from both tables"],
      correctAnswer: 2
    },
    {
      question: "Which command is used to remove a table's data and structure entirely?",
      options: ["DELETE", "TRUNCATE", "DROP", "REMOVE"],
      correctAnswer: 2
    },
    {
      question: "What is the purpose of the DISTINCT keyword?",
      options: ["To return only unique values", "To sort the result set", "To sum numerical columns", "To join tables"],
      correctAnswer: 0
    },
    {
      question: "Which operator is used to search for a specified pattern in a column?",
      options: ["GET", "LIKE", "SEARCH", "MATCH"],
      correctAnswer: 1
    }
  ],
  C: [
    {
      question: "What is the output of 'sizeof(char)' in C?",
      options: ["1 byte", "2 bytes", "4 bytes", "Depends on compiler"],
      correctAnswer: 0
    },
    {
      question: "Which function is used to dynamically allocate memory in C?",
      options: ["alloc()", "malloc()", "new", "create()"],
      correctAnswer: 1
    },
    {
      question: "What does the '&' operator represent in C?",
      options: ["Pointer", "Address-of", "Value-at", "Reference"],
      correctAnswer: 1
    },
    {
      question: "Which keyword is used to prevent a variable from being modified?",
      options: ["static", "volatile", "const", "final"],
      correctAnswer: 2
    },
    {
      question: "What is the format specifier for a float value?",
      options: ["%d", "%c", "%f", "%lf"],
      correctAnswer: 2
    }
  ],
  "C++": [
    {
      question: "Which operator is used for dynamic memory allocation in C++?",
      options: ["malloc", "alloc", "new", "pointer"],
      correctAnswer: 2
    },
    {
      question: "What feature of OOP allows a class to inherit properties from multiple base classes?",
      options: ["Multilevel Inheritance", "Hierarchical Inheritance", "Multiple Inheritance", "Polymorphism"],
      correctAnswer: 2
    },
    {
      question: "Which keyword is used to access members of the base class from a derived class?",
      options: ["this", "super", "base", "There is no keyword, use scope resolution ::"],
      correctAnswer: 3
    },
    {
      question: "What is a virtual function in C++?",
      options: ["A function that has no body", "A function expected to be redefined in derived classes", "A function that cannot be inherited", "A function that only returns void"],
      correctAnswer: 1
    },
    {
      question: "What does STL stand for in C++?",
      options: ["Standard Template Library", "System Type Language", "Standard Type Library", "System Template Logic"],
      correctAnswer: 0
    }
  ],
  Python: [
    {
      question: "How do you create a function in Python?",
      options: ["function myFunc():", "def myFunc():", "create myFunc():", "fun myFunc():"],
      correctAnswer: 1
    },
    {
      question: "Which of these collections defines a Python Dictionary?",
      options: ["[\"apple\", \"banana\"]", "{\"name\": \"apple\", \"color\": \"green\"}", "(\"apple\", \"banana\")", "{\"apple\", \"banana\"}"],
      correctAnswer: 1
    },
    {
      question: "What is the output of 'print(2 ** 3)'?",
      options: ["6", "8", "9", "Error"],
      correctAnswer: 1
    },
    {
      question: "Which built-in function returns the length of a list?",
      options: ["size()", "length()", "len()", "count()"],
      correctAnswer: 2
    },
    {
      question: "What does the 'self' keyword represent in Python classes?",
      options: ["The parent class", "The current instance of the class", "A static variable", "A private method"],
      correctAnswer: 1
    }
  ],
  Java: [
    {
      question: "Which keyword is used to inherit a class in Java?",
      options: ["implement", "inherit", "extends", "super"],
      correctAnswer: 2
    },
    {
      question: "What is the size of an 'int' variable in Java?",
      options: ["16 bits", "32 bits", "64 bits", "Depends on execution environment"],
      correctAnswer: 1
    },
    {
      question: "Which of these is NOT a primitive data type in Java?",
      options: ["boolean", "byte", "String", "double"],
      correctAnswer: 2
    },
    {
      question: "What does JVM stand for?",
      options: ["Java Variable Machine", "Java Virtual Machine", "Java Visual Machine", "Java Version Manager"],
      correctAnswer: 1
    },
    {
      question: "Which access modifier restricts access the most?",
      options: ["public", "protected", "default", "private"],
      correctAnswer: 3
    }
  ],
  Aptitude: [
    {
      question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
      options: ["120 metres", "180 metres", "150 metres", "324 metres"],
      correctAnswer: 2
    },
    {
      question: "Find the odd man out: 3, 5, 11, 14, 17, 21",
      options: ["21", "17", "14", "3"],
      correctAnswer: 2
    },
    {
      question: "If A is the brother of B; B is the sister of C; and C is the father of D, how D is related to A?",
      options: ["Nephew", "Niece", "Cannot be determined", "Brother"],
      correctAnswer: 2
    },
    {
      question: "The sum of ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?",
      options: ["4 years", "8 years", "10 years", "None of these"],
      correctAnswer: 0
    },
    {
      question: "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?",
      options: ["(1/3)", "(1/8)", "(2/8)", "(1/16)"],
      correctAnswer: 1
    }
  ]
};
