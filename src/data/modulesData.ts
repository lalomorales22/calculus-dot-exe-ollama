export const modulesData = [
  {
    title: "MODULE 1: LIMITS AND CONTINUITY",
    topics: [
      {
        title: "The Limit of a Function",
        explanation: "A limit describes the value that a function approaches as the input approaches some value. Limits are fundamental to defining derivatives and integrals.",
        formulas: [
          "\\lim_{x \\to a} f(x) = L",
          "\\lim_{x \\to a^+} f(x) = \\lim_{x \\to a^-} f(x) = \\lim_{x \\to a} f(x)",
          "\\lim_{x \\to a} [f(x) + g(x)] = \\lim_{x \\to a} f(x) + \\lim_{x \\to a} g(x)"
        ],
        concepts: [
          "One-sided limits (left and right)",
          "Limit laws and properties",
          "Squeeze theorem"
        ]
      },
      {
        title: "Calculating Limits",
        explanation: "Various techniques exist for evaluating limits, including direct substitution, factoring, rationalization, and special limit theorems.",
        formulas: [
          "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1",
          "\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e",
          "\\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h} = f'(a)"
        ],
        concepts: [
          "Direct substitution method",
          "Factoring and cancellation",
          "Rationalization technique",
          "Standard limit forms"
        ]
      },
      {
        title: "Limits Involving Infinity",
        explanation: "When limits approach infinity or negative infinity, we analyze the behavior of functions at their extremes.",
        formulas: [
          "\\lim_{x \\to \\infty} \\frac{1}{x} = 0",
          "\\lim_{x \\to \\infty} \\frac{ax^n + ...}{bx^m + ...} = \\begin{cases} 0 & \\text{if } n < m \\\\ \\frac{a}{b} & \\text{if } n = m \\\\ \\pm\\infty & \\text{if } n > m \\end{cases}",
          "\\lim_{x \\to 0^+} \\frac{1}{x} = +\\infty"
        ],
        concepts: [
          "Horizontal asymptotes",
          "Vertical asymptotes",
          "End behavior of rational functions"
        ]
      },
      {
        title: "Continuity",
        explanation: "A function is continuous at a point if the limit equals the function value at that point. Continuity ensures no breaks or jumps in the graph.",
        formulas: [
          "f \\text{ is continuous at } a \\text{ if } \\lim_{x \\to a} f(x) = f(a)",
          "\\text{If } f \\text{ and } g \\text{ are continuous at } a, \\text{ then } f \\pm g, fg, \\text{ and } \\frac{f}{g} \\text{ are continuous at } a"
        ],
        concepts: [
          "Point continuity",
          "Interval continuity",
          "Types of discontinuities",
          "Intermediate Value Theorem"
        ]
      }
    ]
  },
  {
    title: "MODULE 2: DERIVATIVES",
    topics: [
      {
        title: "Derivatives and Rates of Change",
        explanation: "The derivative measures instantaneous rate of change and represents the slope of the tangent line at any point on a curve.",
        formulas: [
          "f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}",
          "\\frac{dy}{dx} = \\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x}",
          "\\text{Average rate of change} = \\frac{f(b) - f(a)}{b - a}"
        ],
        concepts: [
          "Instantaneous vs average rate of change",
          "Geometric interpretation as slope",
          "Physical interpretation as velocity"
        ]
      },
      {
        title: "Basic Differentiation Formulas",
        explanation: "Fundamental differentiation rules form the foundation for computing derivatives of elementary functions.",
        formulas: [
          "\\frac{d}{dx}[c] = 0",
          "\\frac{d}{dx}[x^n] = nx^{n-1}",
          "\\frac{d}{dx}[\\sin x] = \\cos x",
          "\\frac{d}{dx}[\\cos x] = -\\sin x",
          "\\frac{d}{dx}[e^x] = e^x",
          "\\frac{d}{dx}[\\ln x] = \\frac{1}{x}"
        ],
        concepts: [
          "Power rule",
          "Constant rule",
          "Sum and difference rules",
          "Trigonometric derivatives",
          "Exponential and logarithmic derivatives"
        ]
      },
      {
        title: "Product and Quotient Rules",
        explanation: "Special rules are needed when differentiating products and quotients of functions.",
        formulas: [
          "\\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)",
          "\\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}"
        ],
        concepts: [
          "Product rule derivation",
          "Quotient rule derivation",
          "When to use each rule",
          "Common mistakes to avoid"
        ]
      },
      {
        title: "Chain Rule",
        explanation: "The chain rule is used to differentiate composite functions - functions within functions.",
        formulas: [
          "\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)",
          "\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}",
          "\\frac{d}{dx}[(u(x))^n] = n(u(x))^{n-1} \\cdot u'(x)"
        ],
        concepts: [
          "Composite function identification",
          "Outside-inside rule",
          "Multiple applications of chain rule",
          "Chain rule with trig functions"
        ]
      }
    ]
  },
  {
    title: "MODULE 3: ADVANCED DIFFERENTIATION",
    topics: [
      {
        title: "Implicit Differentiation",
        explanation: "Used when y is not explicitly solved for in terms of x, treating y as an implicit function of x.",
        formulas: [
          "\\frac{d}{dx}[y^n] = ny^{n-1}\\frac{dy}{dx}",
          "\\frac{d}{dx}[xy] = x\\frac{dy}{dx} + y",
          "\\text{For } F(x,y) = 0: \\frac{dy}{dx} = -\\frac{F_x}{F_y}"
        ],
        concepts: [
          "When to use implicit differentiation",
          "Treating y as a function of x",
          "Solving for dy/dx",
          "Applications to circles and curves"
        ]
      },
      {
        title: "Related Rates",
        explanation: "Problems involving rates of change of related quantities, often geometric or physical situations.",
        formulas: [
          "\\frac{dV}{dt} = \\frac{dV}{dr} \\cdot \\frac{dr}{dt}",
          "A = \\pi r^2 \\Rightarrow \\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt}",
          "V = \\frac{4}{3}\\pi r^3 \\Rightarrow \\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt}"
        ],
        concepts: [
          "Setting up related rate problems",
          "Identifying given and unknown rates",
          "Common geometric formulas",
          "Problem-solving strategy"
        ]
      },
      {
        title: "Linear Approximations & Differentials",
        explanation: "Using tangent lines to approximate function values near a point and understanding differentials.",
        formulas: [
          "L(x) = f(a) + f'(a)(x - a)",
          "dy = f'(x)dx",
          "\\Delta y \\approx dy \\text{ when } \\Delta x \\text{ is small}"
        ],
        concepts: [
          "Tangent line approximation",
          "Differential notation",
          "Error estimation",
          "Applications in measurement"
        ]
      }
    ]
  },
  {
    title: "MODULE 4: EXPONENTIAL & LOGARITHMIC FUNCTIONS",
    topics: [
      {
        title: "Exponential Functions",
        explanation: "Functions of the form f(x) = a^x, with special attention to the natural exponential function e^x.",
        formulas: [
          "\\frac{d}{dx}[a^x] = a^x \\ln a",
          "\\frac{d}{dx}[e^x] = e^x",
          "\\frac{d}{dx}[e^{u(x)}] = e^{u(x)} \\cdot u'(x)"
        ],
        concepts: [
          "Properties of exponential functions",
          "Natural exponential function",
          "Growth and decay models",
          "Exponential differentiation rules"
        ]
      },
      {
        title: "Derivatives of Logarithmic Functions",
        explanation: "Differentiation rules for logarithmic functions, including natural and general logarithms.",
        formulas: [
          "\\frac{d}{dx}[\\ln x] = \\frac{1}{x}",
          "\\frac{d}{dx}[\\log_a x] = \\frac{1}{x \\ln a}",
          "\\frac{d}{dx}[\\ln u(x)] = \\frac{u'(x)}{u(x)}"
        ],
        concepts: [
          "Natural logarithm differentiation",
          "Logarithmic differentiation technique",
          "Chain rule with logarithms",
          "Applications to growth problems"
        ]
      },
      {
        title: "Inverse Functions",
        explanation: "Understanding the relationship between functions and their inverses, including their derivatives.",
        formulas: [
          "\\frac{d}{dx}[f^{-1}(x)] = \\frac{1}{f'(f^{-1}(x))}",
          "\\frac{d}{dx}[\\arcsin x] = \\frac{1}{\\sqrt{1-x^2}}",
          "\\frac{d}{dx}[\\arctan x] = \\frac{1}{1+x^2}"
        ],
        concepts: [
          "Inverse function theorem",
          "Derivatives of inverse trig functions",
          "Finding inverse function derivatives",
          "Domain and range considerations"
        ]
      }
    ]
  },
  {
    title: "MODULE 5: APPLICATIONS OF DERIVATIVES",
    topics: [
      {
        title: "L'Hôpital's Rule",
        explanation: "A method for evaluating limits of indeterminate forms using derivatives.",
        formulas: [
          "\\text{If } \\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{0}{0} \\text{ or } \\frac{\\infty}{\\infty}, \\text{ then } \\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}",
          "\\text{Forms: } \\frac{0}{0}, \\frac{\\infty}{\\infty}, 0 \\cdot \\infty, \\infty - \\infty, 1^\\infty, 0^0, \\infty^0"
        ],
        concepts: [
          "Indeterminate forms",
          "When to apply L'Hôpital's rule",
          "Multiple applications",
          "Alternative methods"
        ]
      },
      {
        title: "Maximum and Minimum Values",
        explanation: "Finding extreme values of functions using derivatives and critical point analysis.",
        formulas: [
          "f'(c) = 0 \\text{ or } f'(c) \\text{ undefined for critical points}",
          "f''(c) > 0 \\Rightarrow \\text{local minimum}",
          "f''(c) < 0 \\Rightarrow \\text{local maximum}"
        ],
        concepts: [
          "Critical points",
          "First derivative test",
          "Second derivative test",
          "Absolute vs relative extrema"
        ]
      },
      {
        title: "Mean Value Theorem",
        explanation: "A fundamental theorem connecting average and instantaneous rates of change.",
        formulas: [
          "\\text{If } f \\text{ is continuous on } [a,b] \\text{ and differentiable on } (a,b), \\text{ then } \\exists c \\in (a,b): f'(c) = \\frac{f(b)-f(a)}{b-a}",
          "\\text{Rolle's Theorem: If } f(a) = f(b), \\text{ then } \\exists c: f'(c) = 0"
        ],
        concepts: [
          "Geometric interpretation",
          "Rolle's theorem as special case",
          "Applications to prove theorems",
          "Consequences of MVT"
        ]
      },
      {
        title: "Derivatives and Shapes of Graphs",
        explanation: "Using first and second derivatives to analyze function behavior and graph characteristics.",
        formulas: [
          "f'(x) > 0 \\Rightarrow f \\text{ increasing}",
          "f'(x) < 0 \\Rightarrow f \\text{ decreasing}",
          "f''(x) > 0 \\Rightarrow f \\text{ concave up}",
          "f''(x) < 0 \\Rightarrow f \\text{ concave down}"
        ],
        concepts: [
          "Increasing/decreasing intervals",
          "Concavity and inflection points",
          "Graph sketching techniques",
          "Relationship between f, f', and f''"
        ]
      }
    ]
  },
  {
    title: "MODULE 6: OPTIMIZATION & ANTIDERIVATIVES",
    topics: [
      {
        title: "Optimization Problems",
        explanation: "Real-world applications of finding maximum and minimum values subject to constraints.",
        concepts: [
          "Setting up optimization problems",
          "Identifying constraints",
          "Primary and secondary equations",
          "Checking endpoints and critical points",
          "Physical and geometric applications"
        ]
      },
      {
        title: "Antiderivatives",
        explanation: "Functions whose derivatives give the original function - the reverse process of differentiation.",
        formulas: [
          "\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)",
          "\\int \\frac{1}{x} dx = \\ln|x| + C",
          "\\int e^x dx = e^x + C",
          "\\int \\sin x dx = -\\cos x + C",
          "\\int \\cos x dx = \\sin x + C"
        ],
        concepts: [
          "Indefinite integrals",
          "Constant of integration",
          "Basic antiderivative formulas",
          "Checking by differentiation"
        ]
      },
      {
        title: "Areas and Distances",
        explanation: "Introduction to integration through geometric interpretation as area under curves.",
        formulas: [
          "A = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*) \\Delta x",
          "\\text{Riemann Sum: } R_n = \\sum_{i=1}^{n} f(a + i\\Delta x) \\Delta x"
        ],
        concepts: [
          "Area under curves",
          "Riemann sums",
          "Left, right, and midpoint approximations",
          "Connection to integrals"
        ]
      }
    ]
  },
  {
    title: "MODULE 7: DEFINITE INTEGRALS",
    topics: [
      {
        title: "The Definite Integral",
        explanation: "Formal definition of the definite integral as the limit of Riemann sums.",
        formulas: [
          "\\int_a^b f(x) dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*) \\Delta x",
          "\\int_a^a f(x) dx = 0",
          "\\int_a^b f(x) dx = -\\int_b^a f(x) dx",
          "\\int_a^b [f(x) + g(x)] dx = \\int_a^b f(x) dx + \\int_a^b g(x) dx"
        ],
        concepts: [
          "Properties of definite integrals",
          "Geometric interpretation",
          "Signed area",
          "Integral as accumulation"
        ]
      },
      {
        title: "Evaluating Definite Integrals",
        explanation: "Techniques for computing definite integrals, including substitution methods.",
        formulas: [
          "\\int_a^b f(g(x))g'(x) dx = \\int_{g(a)}^{g(b)} f(u) du",
          "\\text{For even functions: } \\int_{-a}^a f(x) dx = 2\\int_0^a f(x) dx",
          "\\text{For odd functions: } \\int_{-a}^a f(x) dx = 0"
        ],
        concepts: [
          "Substitution in definite integrals",
          "Symmetry properties",
          "Even and odd functions",
          "Change of limits"
        ]
      },
      {
        title: "Fundamental Theorem of Calculus",
        explanation: "The theorem that connects differentiation and integration, showing they are inverse operations.",
        formulas: [
          "\\text{FTC Part 1: } \\frac{d}{dx} \\int_a^x f(t) dt = f(x)",
          "\\text{FTC Part 2: } \\int_a^b f(x) dx = F(b) - F(a) \\text{ where } F'(x) = f(x)",
          "\\frac{d}{dx} \\int_{g(x)}^{h(x)} f(t) dt = f(h(x))h'(x) - f(g(x))g'(x)"
        ],
        concepts: [
          "Connection between derivatives and integrals",
          "Net change theorem",
          "Average value of a function",
          "Applications to physics and geometry"
        ]
      }
    ]
  }
];