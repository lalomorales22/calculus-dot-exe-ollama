import CalculusVisualizer from '../components/CalculusVisualizer';

export const modulesData = [
  {
    title: "CHUNK 1: LIMITS AND CONTINUITY",
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
          "One-sided limits (left and right): These examine what happens as x approaches a value from only one direction. The left-hand limit approaches from values less than a, while the right-hand limit approaches from values greater than a.",
          "Limit laws and properties: Mathematical rules that allow us to break down complex limits into simpler parts. For example, the limit of a sum equals the sum of the limits.",
          "Squeeze theorem: If a function is 'squeezed' between two other functions that have the same limit, then the middle function must have that same limit too."
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
          "Direct substitution method: The simplest approach - just plug in the value. This works when the function is continuous at that point and doesn't create undefined expressions like 0/0.",
          "Factoring and cancellation: When direct substitution gives 0/0, we can often factor the numerator and denominator to cancel common terms and eliminate the problematic factor.",
          "Rationalization technique: Used when dealing with square roots or other radicals. We multiply by the conjugate to eliminate radicals and simplify the expression.",
          "Standard limit forms: Special limits that appear frequently, like sin(x)/x → 1 as x → 0, which are memorized and used as building blocks for more complex limits."
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
          "Horizontal asymptotes: These are horizontal lines that the graph approaches but never quite reaches as x goes to positive or negative infinity. They represent the 'end behavior' of a function.",
          "Vertical asymptotes: These are vertical lines where the function shoots up to infinity or down to negative infinity. They occur where the denominator of a fraction equals zero but the numerator doesn't.",
          "End behavior of rational functions: For fractions of polynomials, the behavior as x → ∞ depends on which polynomial (top or bottom) has the higher degree, determining if the limit is 0, a finite number, or infinity."
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
          "Point continuity: A function is continuous at a specific point if three conditions are met: the function is defined there, the limit exists, and the limit equals the function value. Think of it as being able to draw the graph without lifting your pencil.",
          "Interval continuity: When a function is continuous at every point in an interval. Most common functions like polynomials, sine, cosine, and exponentials are continuous everywhere in their domains.",
          "Types of discontinuities: Jump discontinuities (sudden jumps in value), removable discontinuities (holes that could be 'filled'), and infinite discontinuities (where the function goes to infinity).",
          "Intermediate Value Theorem: If a continuous function takes on two different values, it must take on every value in between. This guarantees that equations have solutions and is used to prove roots exist."
        ]
      }
    ]
  },
  {
    title: "CHUNK 2: DERIVATIVES",
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
          "Instantaneous vs average rate of change: Average rate is like your overall speed on a trip (total distance ÷ total time), while instantaneous rate is your exact speed at one specific moment (what your speedometer shows).",
          "Geometric interpretation as slope: The derivative at a point gives the slope of the tangent line to the curve at that point. A positive derivative means the function is increasing, negative means decreasing.",
          "Physical interpretation as velocity: If position is given as a function of time, the derivative gives velocity. If velocity is given as a function of time, its derivative gives acceleration."
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
          "Power rule: For any power of x, bring the exponent down as a coefficient and reduce the exponent by 1. This works for positive, negative, and fractional exponents.",
          "Constant rule: The derivative of any constant number is zero because constants don't change - they have zero rate of change.",
          "Sum and difference rules: The derivative of a sum is the sum of the derivatives. You can differentiate each term separately and add/subtract the results.",
          "Trigonometric derivatives: These follow specific patterns. Sine becomes cosine, cosine becomes negative sine. These patterns repeat every four derivatives.",
          "Exponential and logarithmic derivatives: The natural exponential function e^x is special because it's its own derivative. The natural logarithm ln(x) has derivative 1/x."
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
          "Product rule derivation: When two functions are multiplied, the rate of change depends on both functions changing. It's like the area of a rectangle - if both length and width are changing, the total rate of area change involves both rates.",
          "Quotient rule derivation: For fractions, we need to account for both the numerator and denominator changing. The rule ensures we handle the interaction between these changes correctly.",
          "When to use each rule: Use the product rule when you have two functions multiplied together. Use the quotient rule when you have one function divided by another. Sometimes rewriting can make the problem easier.",
          "Common mistakes to avoid: Don't just multiply the derivatives for products, and don't just divide the derivatives for quotients. The actual rules are more complex but follow logical patterns."
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
          "Composite function identification: Look for functions inside other functions, like sin(x²) or (3x+1)⁵. The 'inside' function is what you substitute into the 'outside' function.",
          "Outside-inside rule: Differentiate the outside function first (treating the inside as a single variable), then multiply by the derivative of the inside function. Think of it as peeling an onion from outside to inside.",
          "Multiple applications of chain rule: Some functions have multiple layers, like sin(cos(x²)). Apply the chain rule repeatedly, working from outside to inside, multiplying all the derivatives together.",
          "Chain rule with trig functions: Very common in calculus. For example, sin(3x) requires the chain rule: the derivative of sin is cos, and the derivative of 3x is 3, so the answer is 3cos(3x)."
        ]
      }
    ]
  },
  {
    title: "CHUNK 3: ADVANCED DIFFERENTIATION",
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
          "When to use implicit differentiation: Use this when you can't easily solve for y in terms of x, like with circles (x² + y² = 25) or more complex curves. It's also useful when solving for y would be messy or impossible.",
          "Treating y as a function of x: Even though y isn't written as y = f(x), we assume y depends on x. So whenever we differentiate something involving y, we must multiply by dy/dx using the chain rule.",
          "Solving for dy/dx: After differentiating both sides of the equation, collect all terms with dy/dx on one side and everything else on the other side, then solve algebraically for dy/dx.",
          "Applications to circles and curves: Implicit differentiation is essential for finding slopes of tangent lines to circles, ellipses, and other curves that can't be written as simple functions y = f(x)."
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
          "Setting up related rate problems: Identify what quantities are changing with time, what rates you know, and what rate you need to find. Draw a picture and label all variables clearly.",
          "Identifying given and unknown rates: Given rates are usually stated directly (like 'water flows in at 5 ft³/min'). Unknown rates are what the problem asks for (like 'how fast is the water level rising?').",
          "Common geometric formulas: Memorize area and volume formulas for circles, spheres, cones, and cylinders. These appear frequently in related rate problems involving expanding/contracting shapes.",
          "Problem-solving strategy: (1) Draw and label a diagram, (2) Write the geometric relationship, (3) Differentiate both sides with respect to time, (4) Substitute known values, (5) Solve for the unknown rate."
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
          "Tangent line approximation: Near any point, a smooth curve looks almost like a straight line. The tangent line at that point gives the best linear approximation to the function nearby.",
          "Differential notation: dy represents the change in y along the tangent line, while Δy represents the actual change in the function. For small changes in x, these are approximately equal.",
          "Error estimation: The difference between the actual function value and the linear approximation gives us the error. This error gets smaller as we get closer to the point of tangency.",
          "Applications in measurement: Linear approximations help estimate how errors in measurement affect calculated results. For example, if you measure a radius with some error, how does that affect the calculated area?"
        ]
      }
    ]
  },
  {
    title: "CHUNK 4: EXPONENTIAL & LOGARITHMIC FUNCTIONS",
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
          "Properties of exponential functions: These functions grow (or decay) at rates proportional to their current value. They never touch the x-axis and always pass through (0,1). The base determines how fast they grow.",
          "Natural exponential function: e^x is special because its derivative equals itself. The number e ≈ 2.718 arises naturally in many growth and decay processes in nature and mathematics.",
          "Growth and decay models: Exponential functions model population growth, radioactive decay, compound interest, and cooling/heating processes. The general form is A(t) = A₀e^(kt) where k determines growth (k > 0) or decay (k < 0).",
          "Exponential differentiation rules: For general exponentials a^x, the derivative includes ln(a) as a factor. For e^x, this factor is ln(e) = 1, which is why e^x is its own derivative."
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
          "Natural logarithm differentiation: The derivative of ln(x) is 1/x, which is why logarithms are useful for integrating functions like 1/x. This relationship connects logarithms and rational functions.",
          "Logarithmic differentiation technique: For complex products, quotients, or functions raised to variable powers, take the natural log of both sides first, then differentiate. This often simplifies the problem significantly.",
          "Chain rule with logarithms: When differentiating ln(u(x)), use the chain rule: the derivative is u'(x)/u(x). This pattern appears frequently in calculus applications.",
          "Applications to growth problems: Logarithms help solve exponential equations and model situations where we need to find time (like 'when will the population double?'). They're the inverse operation to exponentiation."
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
          "Inverse function theorem: If a function has an inverse, the derivative of the inverse function at a point is the reciprocal of the derivative of the original function at the corresponding point. This creates a beautiful symmetry.",
          "Derivatives of inverse trig functions: These have specific formulas that often involve square roots or rational expressions. They're derived using the inverse function theorem and trigonometric identities.",
          "Finding inverse function derivatives: You can use the formula or implicit differentiation. Both methods give the same result but implicit differentiation is often easier to remember and apply.",
          "Domain and range considerations: Inverse functions swap domain and range. The derivative formulas for inverse trig functions have restricted domains because the original trig functions need to be one-to-one to have inverses."
        ]
      }
    ]
  },
  {
    title: "CHUNK 5: APPLICATIONS OF DERIVATIVES",
    topics: [
      {
        title: "L'Hôpital's Rule",
        explanation: "A method for evaluating limits of indeterminate forms using derivatives.",
        formulas: [
          "\\text{If } \\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{0}{0} \\text{ or } \\frac{\\infty}{\\infty}, \\text{ then } \\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}",
          "\\text{Forms: } \\frac{0}{0}, \\frac{\\infty}{\\infty}, 0 \\cdot \\infty, \\infty - \\infty, 1^\\infty, 0^0, \\infty^0"
        ],
        concepts: [
          "Indeterminate forms: These are expressions that don't have obvious values, like 0/0 or ∞/∞. They require special techniques to evaluate because normal arithmetic rules don't apply directly.",
          "When to apply L'Hôpital's rule: Only use this rule when you get an indeterminate form. Check that both the numerator and denominator approach 0 or both approach ∞. If not, the rule doesn't apply.",
          "Multiple applications: Sometimes you need to apply L'Hôpital's rule several times. Keep differentiating the numerator and denominator separately until you get a determinate form.",
          "Alternative methods: L'Hôpital's rule isn't always the best approach. Sometimes factoring, rationalizing, or using standard limits is easier and more insightful."
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
          "Critical points: These are points where the derivative is zero or undefined. They're 'critical' because extreme values can only occur at these points or at endpoints of the domain.",
          "First derivative test: Look at the sign of f'(x) on either side of a critical point. If f' changes from positive to negative, it's a local maximum. If f' changes from negative to positive, it's a local minimum.",
          "Second derivative test: If f'(c) = 0, then f''(c) tells us about concavity. Positive second derivative means concave up (local minimum), negative means concave down (local maximum).",
          "Absolute vs relative extrema: Relative (local) extrema are highest/lowest points in a small neighborhood. Absolute (global) extrema are highest/lowest points over the entire domain. Always check endpoints!"
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
          "Geometric interpretation: The theorem guarantees that somewhere on a smooth curve, the tangent line is parallel to the secant line connecting the endpoints. This seems obvious but is mathematically profound.",
          "Rolle's theorem as special case: When the function values at the endpoints are equal, the Mean Value Theorem becomes Rolle's Theorem, which guarantees a horizontal tangent line somewhere in between.",
          "Applications to prove theorems: The Mean Value Theorem is used to prove many other important results in calculus, including the relationship between derivatives and increasing/decreasing functions.",
          "Consequences of MVT: If f'(x) = 0 everywhere on an interval, then f is constant. If f'(x) > 0 everywhere, then f is increasing. These fundamental facts follow from the Mean Value Theorem."
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
          "Increasing/decreasing intervals: The first derivative tells us where the function is going up or down. Positive derivative means increasing (rising from left to right), negative means decreasing (falling from left to right).",
          "Concavity and inflection points: The second derivative tells us about the 'bend' of the curve. Concave up looks like a smile (∪), concave down looks like a frown (∩). Inflection points are where concavity changes.",
          "Graph sketching techniques: Use critical points to find peaks and valleys, use inflection points to find where the curve changes its bend, and use the signs of f' and f'' to determine the overall shape.",
          "Relationship between f, f', and f'': The original function f shows the height, f' shows the slope, and f'' shows how the slope is changing. Understanding these relationships helps you read graphs like a story."
        ]
      }
    ]
  },
  {
    title: "CHUNK 6: OPTIMIZATION & ANTIDERIVATIVES",
    topics: [
      {
        title: "Optimization Problems",
        explanation: "Real-world applications of finding maximum and minimum values subject to constraints.",
        concepts: [
          "Setting up optimization problems: Identify what you want to maximize or minimize (the objective function) and what restrictions you have (constraints). Draw a picture and define variables clearly.",
          "Identifying constraints: These are the limitations or conditions in the problem, like 'the perimeter must be 100 feet' or 'you have $500 to spend.' Constraints help you express one variable in terms of another.",
          "Primary and secondary equations: The primary equation is what you want to optimize. The secondary equation comes from the constraint and helps you eliminate variables to get a function of one variable.",
          "Checking endpoints and critical points: In real-world problems, variables often have natural limits (like lengths must be positive). Check both critical points and endpoints of the feasible domain.",
          "Physical and geometric applications: Common problems involve maximizing area with fixed perimeter, minimizing cost with production constraints, or finding optimal dimensions for containers or structures."
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
          "Indefinite integrals: These represent all possible antiderivatives of a function. The integral symbol ∫ means 'find a function whose derivative is...' It's the reverse operation of differentiation.",
          "Constant of integration: Since the derivative of any constant is zero, when we reverse the process, we must add an arbitrary constant C. This represents the infinite family of antiderivatives.",
          "Basic antiderivative formulas: These are the reverse of differentiation rules. For example, since d/dx[x²] = 2x, we know that ∫2x dx = x² + C. Learn these patterns by heart.",
          "Checking by differentiation: You can always verify your antiderivative by taking its derivative. If you get back to the original function, your answer is correct."
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
          "Area under curves: For positive functions, the definite integral gives the exact area between the curve and the x-axis. This connects the algebraic concept of integration with geometric intuition.",
          "Riemann sums: These approximate the area by dividing the region into rectangles. As we use more rectangles (n → ∞), the approximation becomes exact. This is the foundation of integration.",
          "Left, right, and midpoint approximations: Different ways to choose the height of each rectangle. Left uses the left endpoint, right uses the right endpoint, midpoint uses the middle. Each gives a different approximation.",
          "Connection to integrals: The definite integral is defined as the limit of Riemann sums. This connects the geometric idea of area with the algebraic process of antidifferentiation through the Fundamental Theorem of Calculus."
        ]
      }
    ]
  },
  {
    title: "CHUNK 7: DEFINITE INTEGRALS",
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
          "Properties of definite integrals: These are rules that make integration easier, like linearity (integral of sum = sum of integrals) and the fact that reversing limits changes the sign.",
          "Geometric interpretation: For positive functions, the definite integral represents area. For negative functions, it represents negative area. The integral gives the 'signed area' between the curve and x-axis.",
          "Signed area: Areas above the x-axis count as positive, areas below count as negative. The definite integral gives the net area, which could be positive, negative, or zero depending on the function.",
          "Integral as accumulation: Beyond area, integrals represent total accumulation - like total distance traveled, total volume of water, or total work done. The integral 'adds up' all the little contributions."
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
          "Substitution in definite integrals: When using u-substitution, you must change the limits of integration to match the new variable. This often makes the problem much simpler.",
          "Symmetry properties: These are shortcuts that can save lots of work. Even functions are symmetric about the y-axis, odd functions are symmetric about the origin.",
          "Even and odd functions: Even functions satisfy f(-x) = f(x) (like x² or cos x). Odd functions satisfy f(-x) = -f(x) (like x³ or sin x). These symmetries affect their integrals over symmetric intervals.",
          "Change of limits: When substituting u = g(x), the new limits become u = g(a) and u = g(b). This eliminates the need to substitute back to the original variable."
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
          "Connection between derivatives and integrals: The Fundamental Theorem shows that differentiation and integration are inverse operations. Taking the derivative of an integral (under the right conditions) gives you back the original function.",
          "Net change theorem: If F'(x) = f(x), then the integral of f from a to b equals F(b) - F(a). This means the definite integral gives the net change in the antiderivative function.",
          "Average value of a function: The average value of f on [a,b] is (1/(b-a))∫f(x)dx from a to b. This extends the idea of arithmetic average to continuous functions.",
          "Applications to physics and geometry: The FTC connects rates (derivatives) with totals (integrals). Velocity integrates to displacement, acceleration integrates to velocity, and marginal cost integrates to total cost."
        ]
      }
    ]
  },
  {
    title: "CHUNK 8: SAMPLE QUESTIONS",
    topics: [
      {
        title: "Chunk 1: Limits and Continuity Questions",
        explanation: "Practice problems covering limits, one-sided limits, continuity, and limit evaluation techniques.",
        formulas: [
          "\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}",
          "\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}",
          "f(x) = \\begin{cases} x^2 & \\text{if } x < 1 \\\\ 2x & \\text{if } x \\geq 1 \\end{cases}",
          "\\lim_{x \\to \\infty} \\frac{3x^2 + 2x - 1}{x^2 - 5x + 6}",
          "\\lim_{x \\to 0} x^2 \\sin\\left(\\frac{1}{x}\\right)"
        ],
        concepts: [
          "Find the limit using factoring and cancellation: Factor x² - 4 as (x-2)(x+2), cancel the (x-2) terms, then substitute x = 2 to get 4.",
          "Evaluate using the standard trigonometric limit: Use the fact that lim(sin u)/u = 1 as u→0. Here, sin(3x)/x = 3·sin(3x)/(3x), so the answer is 3·1 = 3.",
          "Determine if the piecewise function is continuous at x = 1: Check if lim(x→1⁻) f(x) = lim(x→1⁺) f(x) = f(1). Left limit is 1, right limit is 2, f(1) = 2, so it's not continuous.",
          "Find the limit at infinity using highest degree terms: Divide numerator and denominator by x². The highest degree terms dominate, giving 3x²/x² = 3.",
          "Use the Squeeze Theorem with bounded sine function: Since -1 ≤ sin(1/x) ≤ 1, we have -x² ≤ x²sin(1/x) ≤ x². As x→0, both bounds approach 0, so the limit is 0."
        ]
      },
      {
        title: "Chunk 2: Derivatives Questions",
        explanation: "Practice problems covering basic differentiation rules, product rule, quotient rule, and chain rule.",
        formulas: [
          "f(x) = 3x^4 - 2x^3 + 5x - 7",
          "g(x) = (2x + 1)(x^2 - 3)",
          "y = \\frac{x^2 + 1}{x - 2}",
          "h(x) = \\sin(3x^2 + 1)",
          "y = x^3 - 2x + 1 \\text{ at } x = 2"
        ],
        concepts: [
          "Find the derivative using the power rule: Apply the power rule to each term: f'(x) = 12x³ - 6x² + 5. The constant term disappears.",
          "Differentiate using the product rule: g'(x) = (2)(x² - 3) + (2x + 1)(2x) = 2x² - 6 + 4x² + 2x = 6x² + 2x - 6.",
          "Find dy/dx using the quotient rule: dy/dx = [(2x)(x-2) - (x²+1)(1)]/(x-2)² = (2x² - 4x - x² - 1)/(x-2)² = (x² - 4x - 1)/(x-2)².",
          "Differentiate using the chain rule: h'(x) = cos(3x² + 1) · (6x). The derivative of the outside function times the derivative of the inside function.",
          "Find the equation of the tangent line: At x = 2, y = 8 - 4 + 1 = 5 and y' = 3(4) - 2 = 10. Tangent line: y - 5 = 10(x - 2) or y = 10x - 15."
        ]
      },
      {
        title: "Chunk 3: Advanced Differentiation Questions",
        explanation: "Practice problems covering implicit differentiation, related rates, and linear approximations.",
        formulas: [
          "x^2 + y^2 = 25",
          "V = \\frac{4}{3}\\pi r^3, \\quad \\frac{dV}{dt} = 10 \\text{ cm}^3/\\text{s}",
          "xy + \\sin(y) = x^2",
          "\\sqrt{26} \\approx \\sqrt{25} + \\text{linear approximation}",
          "x^2 + y^2 = 100, \\quad \\frac{dx}{dt} = 2 \\text{ ft/s}"
        ],
        concepts: [
          "Find dy/dx using implicit differentiation: Differentiate both sides: 2x + 2y(dy/dx) = 0, so dy/dx = -x/y. This gives the slope of the circle at any point.",
          "How fast is the radius increasing when r = 5 cm?: From V = (4/3)πr³, we get dV/dt = 4πr²(dr/dt). When r = 5 and dV/dt = 10: 10 = 4π(25)(dr/dt), so dr/dt = 1/(10π) cm/s.",
          "Find dy/dx for the implicit equation: Differentiate: y + x(dy/dx) + cos(y)(dy/dx) = 2x. Solve: dy/dx = (2x - y)/(x + cos(y)).",
          "Use linear approximation to estimate the square root: f(x) = √x, f(25) = 5, f'(25) = 1/(2√25) = 1/10. So √26 ≈ 5 + (1/10)(1) = 5.1.",
          "How fast is the top sliding down when bottom is 6 ft from wall?: This is a ladder problem. When x = 6, y = 8. From x² + y² = 100, we get 2x(dx/dt) + 2y(dy/dt) = 0. So dy/dt = -x(dx/dt)/y = -6(2)/8 = -1.5 ft/s."
        ]
      },
      {
        title: "Chunk 4: Exponential & Logarithmic Questions",
        explanation: "Practice problems covering exponential and logarithmic differentiation, inverse functions, and growth models.",
        formulas: [
          "f(x) = e^{2x} \\ln(x)",
          "y = x^x",
          "e^{2x} - 3e^x + 2 = 0",
          "g(x) = \\arctan(2x + 1)",
          "P(t) = 1000e^{0.05t}"
        ],
        concepts: [
          "Differentiate using product rule with exponential and logarithmic functions: f'(x) = (2e^(2x))ln(x) + e^(2x)(1/x) = e^(2x)[2ln(x) + 1/x].",
          "Find dy/dx using logarithmic differentiation: Take ln of both sides: ln(y) = x ln(x). Differentiate: (1/y)(dy/dx) = ln(x) + 1. So dy/dx = x^x[ln(x) + 1].",
          "Solve the exponential equation by substitution: Let u = e^x. Then u² - 3u + 2 = 0, which factors as (u-1)(u-2) = 0. So u = 1 or u = 2, giving e^x = 1 (x = 0) or e^x = 2 (x = ln 2).",
          "Find the derivative of the inverse tangent function: g'(x) = 1/(1 + (2x + 1)²) · 2 = 2/(1 + (2x + 1)²). Use the chain rule with the arctan derivative formula.",
          "Find the growth rate when t = 10 years: P'(t) = 1000(0.05)e^(0.05t) = 50e^(0.05t). When t = 10: P'(10) = 50e^(0.5) ≈ 82.4 people per year."
        ]
      },
      {
        title: "Chunk 5: Applications of Derivatives Questions",
        explanation: "Practice problems covering L'Hôpital's rule, optimization, mean value theorem, and curve analysis.",
        formulas: [
          "\\lim_{x \\to 0} \\frac{e^x - 1 - x}{x^2}",
          "f(x) = x^3 - 3x^2 + 2 \\text{ on } [0, 3]",
          "f(x) = x^2 - 4x + 3 \\text{ on } [1, 4]",
          "f(x) = x^4 - 4x^3",
          "g(x) = x^3 - 6x^2 + 9x"
        ],
        concepts: [
          "Use L'Hôpital's rule to evaluate the indeterminate form: This gives 0/0, so apply L'Hôpital's rule twice. First: lim(e^x - 1)/(2x) = 0/0. Second: lim(e^x)/(2) = 1/2.",
          "Find the absolute maximum and minimum values: f'(x) = 3x² - 6x = 3x(x - 2). Critical points at x = 0, 2. Check f(0) = 2, f(2) = -2, f(3) = 2. Absolute max is 2, absolute min is -2.",
          "Verify the Mean Value Theorem and find the value c: f'(x) = 2x - 4. Average rate = (f(4) - f(1))/(4 - 1) = (-1 - 0)/3 = -1/3. Set f'(c) = -1/3: 2c - 4 = -1/3, so c = 11/6.",
          "Find the intervals where the function is increasing and decreasing: f'(x) = 4x³ - 12x² = 4x²(x - 3). f'(x) > 0 when x > 3, f'(x) < 0 when x < 3 (x ≠ 0). Decreasing on (-∞, 3), increasing on (3, ∞).",
          "Determine the concavity and inflection points: g''(x) = 6x - 12 = 6(x - 2). Concave down when x < 2, concave up when x > 2. Inflection point at x = 2."
        ]
      },
      {
        title: "Chunk 6: Optimization & Antiderivatives Questions",
        explanation: "Practice problems covering optimization problems, antiderivatives, and area approximations.",
        formulas: [
          "\\text{Perimeter} = 2l + 2w = 20",
          "\\int (3x^2 - 4x + 5) dx",
          "\\text{Area} = lw, \\quad l + w = 100",
          "F'(x) = 2x + \\sin(x), \\quad F(0) = 3",
          "y = x^2 \\text{ from } x = 0 \\text{ to } x = 2"
        ],
        concepts: [
          "Find the dimensions of a rectangle with perimeter 20 that has maximum area: From 2l + 2w = 20, we get w = 10 - l. Area = l(10 - l) = 10l - l². A'(l) = 10 - 2l = 0 gives l = 5, w = 5. Maximum area is 25.",
          "Find the antiderivative of the polynomial: ∫(3x² - 4x + 5)dx = x³ - 2x² + 5x + C. Apply the power rule to each term and add the constant of integration.",
          "What dimensions maximize the area of the field against the barn?: If one side is against the barn, we need fencing for three sides: 2w + l = 100, so l = 100 - 2w. Area = w(100 - 2w). A'(w) = 100 - 4w = 0 gives w = 25, l = 50.",
          "Find F(x) given the derivative and initial condition: F(x) = ∫(2x + sin(x))dx = x² - cos(x) + C. Using F(0) = 3: 0 - 1 + C = 3, so C = 4. Therefore F(x) = x² - cos(x) + 4.",
          "Approximate the area using 4 rectangles with right endpoints: Δx = 2/4 = 0.5. Right endpoints: 0.5, 1, 1.5, 2. Heights: 0.25, 1, 2.25, 4. Area ≈ 0.5(0.25 + 1 + 2.25 + 4) = 3.75."
        ]
      },
      {
        title: "Chunk 7: Definite Integrals Questions",
        explanation: "Practice problems covering definite integral evaluation, Fundamental Theorem of Calculus, and applications.",
        formulas: [
          "\\int_0^2 (x^2 + 3x - 1) dx",
          "\\frac{d}{dx} \\int_1^{x^2} \\sin(t) dt",
          "\\int_0^{\\pi/2} \\sin(x)\\cos(x) dx",
          "y = x^2 \\text{ and } y = 4 \\text{ from } x = -2 \\text{ to } x = 2",
          "\\int_{-1}^1 (x^3 + x) dx"
        ],
        concepts: [
          "Evaluate the definite integral using the Fundamental Theorem: ∫₀²(x² + 3x - 1)dx = [x³/3 + 3x²/2 - x]₀² = 8/3 + 6 - 2 - 0 = 8/3 + 4 = 20/3.",
          "Find the derivative using FTC Part 1 with chain rule: d/dx ∫₁^(x²) sin(t)dt = sin(x²) · 2x = 2x sin(x²). The chain rule applies because the upper limit is a function of x.",
          "Use substitution u = sin(x) to evaluate the integral: du = cos(x)dx. When x = 0, u = 0; when x = π/2, u = 1. ∫₀¹ u du = [u²/2]₀¹ = 1/2.",
          "Find the area between the parabola and horizontal line: The curves intersect when x² = 4, so x = ±2. Area = ∫₋₂²(4 - x²)dx = [4x - x³/3]₋₂² = (8 - 8/3) - (-8 + 8/3) = 32/3.",
          "Evaluate and explain why the answer makes sense (odd function): Both x³ and x are odd functions, so their sum is odd. For odd functions, ∫₋ₐᵃ f(x)dx = 0. The positive and negative areas cancel out."
        ]
      }
    ]
  },
  {
    title: "CHUNK 9: VISUALIZE CALCULUS",
    topics: [
      {
        title: "Interactive Calculus Visualizations",
        explanation: "Explore calculus concepts through interactive animations and real-time parameter adjustments. See derivatives, limits, tangent lines, unit circle, and wave functions come to life!",
        concepts: [
          "Derivative visualization with tangent lines: Watch how the slope of the tangent line changes as you move along different functions. The derivative at each point gives the exact slope of that tangent line.",
          "Limit exploration with approaching values: See how secant lines approach the tangent line as h gets smaller. This visualizes the fundamental definition of the derivative as a limit.",
          "Secant to tangent line transformation: Observe multiple secant lines gradually becoming the tangent line. This shows the limiting process that defines derivatives.",
          "Unit circle and trigonometric functions: Explore how sine, cosine, and tangent are defined using the unit circle. See the relationships between angles, coordinates, and trig ratios.",
          "Sine and cosine wave animations: Watch how circular motion creates wave patterns. Understand amplitude, frequency, and phase shift through interactive controls.",
          "Interactive parameter controls: Adjust function parameters in real-time to see immediate effects on graphs. This builds intuition for how mathematical parameters affect function behavior.",
          "Real-time mathematical feedback: Get instant numerical feedback showing exact values, slopes, and relationships as you interact with the visualizations."
        ],
        component: 'CalculusVisualizer'
      }
    ]
  }
];